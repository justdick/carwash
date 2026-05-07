/** Minimum password length for signup. */
const MIN_PASSWORD_LENGTH = 6;

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validate an email address (simple pattern check).
 */
export function validateEmail(email: string): ValidationResult {
  if (!email.trim()) {
    return { valid: false, error: 'Email is required' };
  }
  // Basic email pattern — intentionally permissive for a demo
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  return { valid: true };
}

/**
 * Validate a password.
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { valid: false, error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` };
  }
  return { valid: true };
}

/**
 * Validate a street address field.
 */
export function validateStreet(street: string): ValidationResult {
  if (!street.trim()) {
    return { valid: false, error: 'Street address is required' };
  }
  return { valid: true };
}

/**
 * Validate a city field.
 */
export function validateCity(city: string): ValidationResult {
  if (!city.trim()) {
    return { valid: false, error: 'City is required' };
  }
  return { valid: true };
}

/**
 * Validate a zip code (US 5-digit or 5+4 format).
 */
export function validateZipCode(zipCode: string): ValidationResult {
  if (!zipCode.trim()) {
    return { valid: false, error: 'Zip code is required' };
  }
  const pattern = /^\d{5}(-\d{4})?$/;
  if (!pattern.test(zipCode.trim())) {
    return { valid: false, error: 'Please enter a valid zip code (e.g. 12345)' };
  }
  return { valid: true };
}

/**
 * Validate all address fields at once. Returns the first error found, or valid.
 */
export function validateAddress(street: string, city: string, zipCode: string): ValidationResult {
  const streetResult = validateStreet(street);
  if (!streetResult.valid) return streetResult;

  const cityResult = validateCity(city);
  if (!cityResult.valid) return cityResult;

  const zipResult = validateZipCode(zipCode);
  if (!zipResult.valid) return zipResult;

  return { valid: true };
}

/**
 * Validate a required text field (generic).
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value.trim()) {
    return { valid: false, error: `${fieldName} is required` };
  }
  return { valid: true };
}
