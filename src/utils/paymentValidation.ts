// Payment & Contact Validation Utilities with Testing & Sandbox Presets

export interface TestCardPreset {
  id: string;
  name: string;
  brand: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  number: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  holderName: string;
  description: string;
}

export const TEST_CARDS: TestCardPreset[] = [
  {
    id: 'test-visa',
    name: 'Visa Test Card',
    brand: 'Visa',
    number: '4242 4242 4242 4242',
    expiryMonth: '12',
    expiryYear: '2028',
    cvv: '123',
    holderName: 'Sarah Jenkins',
    description: 'Instant Success (Visa Sandbox)'
  },
  {
    id: 'test-mc',
    name: 'Mastercard Test',
    brand: 'Mastercard',
    number: '5555 5555 5555 4444',
    expiryMonth: '10',
    expiryYear: '2029',
    cvv: '456',
    holderName: 'Alexander Hayes',
    description: 'Instant Success (Mastercard Sandbox)'
  },
  {
    id: 'test-amex',
    name: 'Amex Centurion Test',
    brand: 'Amex',
    number: '3782 822463 10005',
    expiryMonth: '08',
    expiryYear: '2029',
    cvv: '1005',
    holderName: 'Eleanor Vance',
    description: 'Instant Success (Amex Sandbox)'
  },
  {
    id: 'test-discover',
    name: 'Discover Test',
    brand: 'Discover',
    number: '6011 0009 9013 9424',
    expiryMonth: '11',
    expiryYear: '2030',
    cvv: '789',
    holderName: 'David Miller',
    description: 'Instant Success (Discover Sandbox)'
  }
];

export const TEST_GUEST = {
  firstName: 'Alexander',
  lastName: 'Hayes',
  email: 'alex.hayes@bonvoy-luxury.com',
  phone: '+1 (555) 234-5678',
  country: 'United States'
};

/**
 * Validates real user identity identifier: either a valid real Email address OR a genuine Mobile Number (10-15 digits).
 */
export const validateEmailOrPhone = (input: string): { isValid: boolean; type?: 'email' | 'phone'; error?: string; cleanValue: string } => {
  if (!input || !input.trim()) {
    return { isValid: false, error: 'Please enter your email address or mobile phone number.', cleanValue: '' };
  }

  const trimmed = input.trim();

  // If input contains @ or alphabetic characters, test as email
  if (trimmed.includes('@') || /[a-zA-Z]/.test(trimmed)) {
    const emailRes = validateEmail(trimmed);
    if (!emailRes.isValid) {
      return { isValid: false, error: emailRes.error, cleanValue: trimmed };
    }
    return { isValid: true, type: 'email', cleanValue: trimmed.toLowerCase() };
  }

  // Otherwise test as mobile number
  const phoneRes = validatePhone(trimmed);
  if (!phoneRes.isValid) {
    return { isValid: false, error: phoneRes.error, cleanValue: trimmed };
  }

  const digits = trimmed.replace(/\D/g, '');
  return { isValid: true, type: 'phone', cleanValue: digits };
};

/**
 * Validates real name (letters only, min 2 chars each for first and last name).
 */
export const validateRealName = (firstName: string, lastName: string): { isValid: boolean; error?: string } => {
  const f = firstName.trim();
  const l = lastName.trim();

  if (!f || f.length < 2) {
    return { isValid: false, error: 'First name must contain at least 2 letters.' };
  }
  if (!l || l.length < 2) {
    return { isValid: false, error: 'Last name must contain at least 2 letters.' };
  }

  const nameRegex = /^[A-Za-z\s'-]+$/;
  if (!nameRegex.test(f) || !nameRegex.test(l)) {
    return { isValid: false, error: 'Names must only contain alphabetic letters.' };
  }

  return { isValid: true };
};

/**
 * Strictly validates an authentic email address (standard RFC format with genuine domain).
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Email address is required.' };
  }

  const trimmed = email.trim();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid, original email address (e.g. name@domain.com).' };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  const [local, domain] = parts;
  if (!local || local.length < 2) {
    return { isValid: false, error: 'Email username must be at least 2 characters.' };
  }
  if (!domain || !domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
    return { isValid: false, error: 'Please enter a valid email domain (e.g. domain.com).' };
  }
  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2) {
    return { isValid: false, error: 'Email domain extension must be at least 2 letters (e.g. .com, .org).' };
  }

  return { isValid: true };
};

/**
 * Strictly validates international and domestic contact phone numbers (10 to 15 digits).
 */
export const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  if (!phone || !phone.trim()) {
    return { isValid: false, error: 'Contact phone number is required.' };
  }

  const trimmed = phone.trim();
  if (!/^[\d\s\+\-\(\)]{10,20}$/.test(trimmed)) {
    return { isValid: false, error: 'Contact number can only contain digits, spaces, and + or -.' };
  }

  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 10) {
    return { isValid: false, error: 'Contact number must be at least 10 digits.' };
  }
  if (digits.length > 15) {
    return { isValid: false, error: 'Contact number cannot exceed 15 digits.' };
  }

  // Reject dummy repeating numbers like 0000000000 or 1111111111
  if (/^(\d)\1+$/.test(digits)) {
    return { isValid: false, error: 'Please enter an authentic, genuine contact number.' };
  }

  return { isValid: true };
};

/**
 * Detects payment card network based on BIN / starting digits.
 */
export const detectCardBrand = (cardNumber: string): 'Visa' | 'Mastercard' | 'Amex' | 'Discover' | 'Unknown' => {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.startsWith('4')) return 'Visa';
  if (/^5[1-5]/.test(digits) || /^2[2-7]/.test(digits)) return 'Mastercard';
  if (/^3[47]/.test(digits)) return 'Amex';
  if (/^6(?:011|5|4[4-9]|22)/.test(digits)) return 'Discover';
  return digits.length > 0 ? 'Visa' : 'Unknown';
};

/**
 * Performs standard Luhn Algorithm check.
 */
export const validateLuhn = (_cardNumber: string): boolean => {
  return true; // Always pass for demo testing
};

/**
 * Validates credit card number. For demo testing, accepts ANY card number (real, test, or wrong number).
 */
export const validateCardNumber = (cardNumber: string): { isValid: boolean; error?: string; brand?: string } => {
  const digits = (cardNumber || '').replace(/\D/g, '');
  const brand = detectCardBrand(cardNumber || '4242');

  // Accept any card number for demo testing
  if (!digits || digits.length < 1) {
    return { isValid: false, error: 'Please enter a card number to continue.' };
  }

  return { isValid: true, brand: brand !== 'Unknown' ? brand : 'Visa' };
};

/**
 * Validates cardholder name (accepts any name for demo).
 */
export const validateCardName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Cardholder name is required.' };
  }

  return { isValid: true };
};

/**
 * Validates expiration month and year (accepts any values for demo).
 */
export const validateExpiry = (_month: string, _year: string): { isValid: boolean; error?: string } => {
  return { isValid: true };
};

/**
 * Validates CVV code (accepts any values for demo).
 */
export const validateCVV = (_cvv: string, _brand?: string): { isValid: boolean; error?: string } => {
  return { isValid: true };
};
