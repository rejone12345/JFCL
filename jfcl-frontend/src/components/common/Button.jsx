import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  icon: Icon,
  ...props
}) => {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-900",
    secondary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-600",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-400 bg-white",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500",
    success: "bg-emerald-600 text-white hover:bg-emerald-700 focus:ring-emerald-500",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  };

  const sizes = {
    sm: "text-xs px-2.5 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-5 py-2.5 gap-2.5"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      {children}
    </button>
  );
};
