export const ERROR_MESSAGES = {
  AUTH: {
    EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
    USER_NOT_FOUND: 'No account found with this email address.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    INVALID_ROLE: 'Invalid role selected. Please choose Admin, Employer, or Individual.',
    ACCOUNT_INACTIVE: 'Your account is currently inactive. Please contact support.',
    EMAIL_NOT_VERIFIED: 'Please verify your email address before signing in.',
    TOKEN_INVALID: 'The token is invalid or has expired.',
    TOKEN_MISSING: 'Authentication token is required.',
    REFRESH_TOKEN_INVALID: 'The refresh token is invalid or has expired.',
    INVALID_OR_EXPIRED_OTP: 'Invalid or expired OTP.'
  },

  VALIDATION: {
    EMAIL_INVALID: 'Please enter a valid email address.',
    EMAIL_REQUIRED: 'Email is required.',
    PASSWORD_REQUIRED: 'Password is required.',
    PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long.',
    REQUIRED_FIELD: '{FIELD} is required.',
  },

  GENERAL: {
    INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again later.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'You do not have permission to access this resource.',
    NOT_FOUND: 'The requested resource was not found.',
    CONFLICT: 'This action could not be completed due to a conflict.',
  },

  USER: {
    PROFILE_NOT_FOUND: 'User profile not found.',
    UPDATE_FAILED: 'Failed to update user profile. Please try again.',
  },

  JOB: {
    NOT_FOUND: 'Job posting not found.',
    ALREADY_APPLIED: 'You have already applied for this job.',
  },
} as const;