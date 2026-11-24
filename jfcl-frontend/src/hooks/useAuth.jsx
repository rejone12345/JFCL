import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jfcl_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Synchronize authentication state on mount with server if token exists
  useEffect(() => {
    const token = localStorage.getItem('jfcl_token');
    if (token) {
      authApi
        .getMe()
        .then((res) => {
          if (res.data) {
            setUser(res.data);
            localStorage.setItem('jfcl_user', JSON.stringify(res.data));
          }
        })
        .catch(() => {
          setUser(null);
          localStorage.removeItem('jfcl_token');
          localStorage.removeItem('jfcl_user');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  /** Real API Login — returns requires2FA flag when Email OTP step is needed */
  const login = async (identifier, password, role) => {
    setLoading(true);
    try {
      const res = await authApi.login({ identifier, password, role });
      if (res.data?.requires2FA) {
        return {
          success: true,
          requires2FA: true,
          tempToken: res.data.tempToken,
          maskedEmail: res.data.maskedEmail,
          message: res.message,
        };
      }
      if (res.data?.token) {
        localStorage.setItem('jfcl_token', res.data.token);
      }
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem('jfcl_user', JSON.stringify(res.data.user));
      }
      return { success: true, requires2FA: false, user: res.data.user };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  /** Complete Two-Factor Authentication by verifying the 6-digit Email OTP */
  const verifyOtp = async (tempToken, otp) => {
    setLoading(true);
    try {
      const res = await authApi.verifyOtp({ tempToken, otp });
      if (res.data?.token) {
        localStorage.setItem('jfcl_token', res.data.token);
      }
      if (res.data?.user) {
        setUser(res.data.user);
        localStorage.setItem('jfcl_user', JSON.stringify(res.data.user));
      }
      return { success: true, user: res.data.user };
    } catch (err) {
      return { success: false, message: err.message || 'OTP verification failed' };
    } finally {
      setLoading(false);
    }
  };

  /** Request a fresh 6-digit Email OTP for the current pending 2FA session */
  const resendOtp = async (tempToken) => {
    try {
      const res = await authApi.resendOtp({ tempToken });
      return {
        success: true,
        message: res.message || 'A new verification code was sent.',
        maskedEmail: res.data?.maskedEmail,
      };
    } catch (err) {
      return { success: false, message: err.message || 'Could not resend verification code' };
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore network errors
    } finally {
      setUser(null);
      localStorage.removeItem('jfcl_token');
      localStorage.removeItem('jfcl_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, verifyOtp, resendOtp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
