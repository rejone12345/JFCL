import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
      unique: true,
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      sparse: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
    // Admin & Teacher specific
    designation: { type: String, trim: true },
    department: { type: String, trim: true },
    teacherId: { type: String, unique: true, sparse: true, trim: true },
    qualification: { type: String, trim: true },
    phone: { type: String, trim: true },

    // Student specific
    studentId: { type: String, unique: true, sparse: true, trim: true },
    roll: { type: String, trim: true },
    class: { type: String, trim: true },
    section: { type: String, trim: true },
    group: { type: String, trim: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    contact: { type: String, trim: true },
    guardian: { type: String, trim: true },
    dob: { type: String, trim: true },
    isActivated: { type: Boolean, default: true },
    activationCode: { type: String, default: null },
    twoFactorOtpHash:       { type: String, default: null },
    twoFactorOtpExpires:    { type: Date, default: null },
    twoFactorOtpAttempts:   { type: Number, default: 0 },
    twoFactorOtpLastSentAt: { type: Date, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.activationCode;
        delete ret.twoFactorOtpHash;
        delete ret.twoFactorOtpExpires;
        delete ret.twoFactorOtpAttempts;
        delete ret.twoFactorOtpLastSentAt;
        return ret;
      },
    },
  }
);

export const User = mongoose.model('User', userSchema);
