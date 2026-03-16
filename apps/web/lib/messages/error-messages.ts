/**
 * Centralized error messages. Kept in sync with API error-messages for consistency.
 */
export const ERROR_MESSAGES = {
  AUTH: {
    EMAIL_ALREADY_EXISTS: 'An account with this email already exists.',
    USER_NOT_FOUND: 'No account found with this email address.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
    EMAIL_MISSING: 'Email is missing. Please go back and complete signup.',
    SAVE_FAILED: 'Failed to save. Please try again.',
    SIGNUP_NOT_PENDING:
      'No pending signup for this email, or password was already set.',
    COMPLETE_SIGNUP:
      'Please complete your signup by setting your password.',
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
    PASSWORD_MUST_BE_STRING: 'Password must be a valid string.',
    REQUIRED_FIELD: '{FIELD} is required.',
    FIELD_REQUIRED: 'This field is required and cannot be empty.',
    CANNOT_BE_EMPTY_WHEN_PROVIDED: '{FIELD} cannot be empty when provided.',
    INTERESTS_REQUIRED: 'interests is required and must contain at least one item.',
    INTERESTS_MIN_ONE: 'interests must contain at least one item.',
    CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password.',
    PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
    INVALID: 'Invalid.',
  },

  GENERAL: {
    INTERNAL_SERVER_ERROR: 'Something went wrong. Please try again later.',
    REQUEST_FAILED: 'Something went wrong. Please try again.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    FORBIDDEN: 'You do not have permission to access this resource.',
    NOT_FOUND: 'The requested resource was not found.',
    CONFLICT: 'This action could not be completed due to a conflict.',
  },

  USER: {
    PROFILE_NOT_FOUND: 'User profile not found.',
    USER_NOT_FOUND: 'User not found.',
    UPDATE_FAILED: 'Failed to update user profile. Please try again.',
  },

  PHOTOS: {
    UPLOAD_FAILED: 'Upload failed. Please try again.',
    PHOTO_NOT_FOUND: 'Photo not found.',
    INVALID_FILE_TYPE: 'Invalid file type. Only JPEG, PNG and WebP are allowed.',
    FILE_TOO_LARGE: 'File size must not exceed 5MB.',
    MIN_PHOTOS_REQUIRED: 'Minimum 3 photos are required.',
  },

  JOB: {
    NOT_FOUND: 'Job posting not found.',
    ALREADY_APPLIED: 'You have already applied for this job.',
  },
} as const;
