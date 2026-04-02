/**
 * Centralized success messages. Kept in sync with API success-messages for consistency.
 */
export const SUCCESS_MESSAGES = {
  AUTH: {
    REGISTER_SUCCESS: 'User registered successfully.',
    EMAIL_REGISTERED:
      'Email registered. Please set your password to complete signup.',
    PASSWORD_SET_SUCCESS: 'Password set successfully. You can now sign in.',
    LOGIN_SUCCESS: 'Login successful.',
    LOGOUT_SUCCESS: 'Logged out successfully.',
    OTP_SENT: 'OTP sent successfully.',
    OTP_VERIFIED: 'OTP verified successfully.',
    PASSWORD_RESET_SUCCESS: 'Password updated successfully.',
    FORGOT_PASSWORD_GENERIC:
      'If this email exists, an OTP has been sent.',
    ACCOUNT_DELETED: "Account deleted successfully."
  },
  ONBOARDING: {
    IDENTITY_SAVED: 'Identity saved successfully.',
    LOCATION: 'Location saved successfully.',
    STORY: 'Story saved successfully.',
    FAITH_LIFESTYLE: 'Faith & lifestyle saved successfully.',
    ATTRIBUTES: 'Attributes saved successfully.',
    ONBOARDING_COMPLETED: 'Onboarding completed successfully.',
    REVIEW_DATA: 'Onboarding review data fetched.',
  },
  PROFILE: {
    PROFILE_RETRIEVED: 'Profile retrieved.',
    PROFILE_UPDATED: 'Basic profile updated.',
    FAITH_LIFESTYLE_UPDATED: 'Faith & lifestyle updated.',
    LIFESTYLE_UPDATED: 'Lifestyle updated.',
    EVERYDAY_LIFE_UPDATED: 'Everyday life data updated.',
    FAITH_UPDATED: 'Faith values updated.',
    PHOTO_SAVED: 'Photo saved successfully.',
    PHOTO_DELETED: 'Photo deleted successfully.',
    PHOTOS_RETRIEVED: 'Photos retrieved successfully.',
  }
} as const;
