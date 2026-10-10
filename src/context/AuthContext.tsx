import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Reservation, BonvoyTier } from '../types';
import { validateEmail, validatePhone } from '../utils/paymentValidation';

export interface RegisteredAccount {
  id: string;
  email: string;
  phone: string;
  cleanPhone: string;
  password?: string;
  firstName: string;
  lastName: string;
  tier: BonvoyTier;
  points: number;
  memberSince: string;
  nightsThisYear: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  reservations: Reservation[];
  authError: string | null;
  clearAuthError: () => void;
  signIn: (identifier: string, password?: string) => boolean;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    phoneOrPassword?: string,
    password?: string
  ) => boolean;
  signOut: () => void;
  addReservation: (reservation: Reservation) => void;
  cancelReservation: (id: string) => boolean;
  findReservationByCode: (code: string, lastName?: string) => Reservation | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const INITIAL_REGISTERED_USERS: RegisteredAccount[] = [
  {
    id: 'MB-782914',
    email: 'alex.hayes@bonvoy-luxury.com',
    phone: '+1 (555) 234-5678',
    cleanPhone: '15552345678',
    password: 'Marriott2026!',
    firstName: 'Alexander',
    lastName: 'Hayes',
    tier: 'Member',
    points: 25000,
    memberSince: '2024',
    nightsThisYear: 12
  },
  {
    id: 'MB-109284',
    email: 'member@marriott.com',
    phone: '+1 (555) 392-8819',
    cleanPhone: '15553928819',
    password: 'Marriott2026!',
    firstName: 'Marriott',
    lastName: 'Member',
    tier: 'Member',
    points: 15400,
    memberSince: '2025',
    nightsThisYear: 8
  }
];

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-init-1',
    confirmationCode: 'MB-892401',
    createdAt: '2026-09-15',
    propertyId: 'ritz-carlton-kyoto',
    propertyName: 'The Ritz-Carlton, Kyoto',
    propertyCity: 'Kyoto',
    propertyCountry: 'Japan',
    propertyImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    brandId: 'the-ritz-carlton',
    brandName: 'The Ritz-Carlton',
    roomId: 'rc-kyoto-deluxe-kamogawa',
    roomName: 'Grand Deluxe Kamogawa River View',
    ratePlanId: 'rc-kyoto-flex',
    ratePlanName: 'Marriott Bonvoy Flexible Luxury Rate',
    checkIn: '2026-11-12',
    checkOut: '2026-11-16',
    nights: 4,
    roomsCount: 1,
    adultsCount: 2,
    childrenCount: 0,
    guest: {
      firstName: 'Marriott',
      lastName: 'Member',
      email: 'member@marriott.com',
      phone: '+1 (555) 392-8819',
      country: 'United States',
      specialRequests: 'High floor Kamogawa view preferred, arriving approx 14:00.'
    },
    roomSubtotal: 5400,
    taxesAndFees: 648,
    resortFee: 200,
    discount: 0,
    totalAmount: 6248,
    currency: 'USD',
    status: 'confirmed',
    cancellationDeadline: '2026-11-10T15:00:00',
    cancellationPolicy: 'Complimentary cancellation until 48 hours prior to arrival.',
    paymentMethod: 'PayPal Express (Marriott Bonvoy Premier Card •••• 8842)',
    paypalTransactionId: 'PAYID-MB94018293',
    paypalFundingSource: 'Marriott Bonvoy Premier Card (•••• 8842)'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authError, setAuthError] = useState<string | null>(null);

  const [registeredUsers, setRegisteredUsers] = useState<RegisteredAccount[]>(() => {
    try {
      const saved = localStorage.getItem('marriott_registered_users');
      if (saved) {
        const parsed: RegisteredAccount[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(acc => (!['Member', 'Gold Elite', 'Platinum Elite', 'Titanium Elite', 'Ambassador Elite'].includes(acc.tier) ? { ...acc, tier: 'Member' as BonvoyTier } : acc));
        }
      }
      return INITIAL_REGISTERED_USERS;
    } catch {
      return INITIAL_REGISTERED_USERS;
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      localStorage.removeItem('aurelia_user');
      const saved = localStorage.getItem('marriott_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          !parsed ||
          parsed.firstName?.toLowerCase().includes('elena') ||
          parsed.email?.toLowerCase().includes('elena') ||
          parsed.lastName?.toLowerCase().includes('rostova')
        ) {
          localStorage.removeItem('marriott_user');
          return null;
        }
        if (!['Member', 'Gold Elite', 'Platinum Elite', 'Titanium Elite', 'Ambassador Elite'].includes(parsed.tier)) {
          parsed.tier = 'Member';
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem('marriott_reservations') || localStorage.getItem('aurelia_reservations');
      return saved ? JSON.parse(saved) : INITIAL_RESERVATIONS;
    } catch {
      return INITIAL_RESERVATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('marriott_registered_users', JSON.stringify(registeredUsers));
    } catch {
      // Ignore storage errors
    }
  }, [registeredUsers]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('marriott_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('marriott_user');
      }
    } catch {
      // Ignore storage errors
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('marriott_reservations', JSON.stringify(reservations));
    } catch {
      // Ignore storage errors
    }
  }, [reservations]);

  const clearAuthError = () => setAuthError(null);

  const signIn = (identifier: string, password?: string): boolean => {
    setAuthError(null);
    if (!identifier || !identifier.trim()) {
      setAuthError('Please enter your original registered email or contact number.');
      return false;
    }

    const trimmed = identifier.trim();
    const isEmail = trimmed.includes('@') || /[a-zA-Z]/.test(trimmed);

    // 1. Strict format check for original email or contact number
    if (isEmail) {
      const emailCheck = validateEmail(trimmed);
      if (!emailCheck.isValid) {
        setAuthError(emailCheck.error || 'Please enter a valid, original email address (e.g. name@domain.com).');
        return false;
      }
    } else {
      const phoneCheck = validatePhone(trimmed);
      if (!phoneCheck.isValid) {
        setAuthError(phoneCheck.error || 'Please enter a valid, original contact number (10 to 15 digits).');
        return false;
      }
    }

    // 2. Account verification against registered users
    const cleanDigits = trimmed.replace(/\D/g, '');
    const account = registeredUsers.find(acc => {
      if (isEmail) {
        return acc.email.toLowerCase() === trimmed.toLowerCase();
      }
      return acc.cleanPhone === cleanDigits || acc.phone.replace(/\D/g, '') === cleanDigits;
    });

    if (!account) {
      setAuthError('Account not found for this email or contact number. Please check your credentials or Join Marriott Bonvoy.');
      return false;
    }

    // 3. Password check (if user entered password)
    if (password && account.password && password !== account.password) {
      setAuthError('Incorrect password. Please verify and try again.');
      return false;
    }

    const activeUser: User = {
      id: account.id,
      email: account.email,
      phone: account.phone,
      firstName: account.firstName,
      lastName: account.lastName,
      tier: account.tier || 'Member',
      points: account.points,
      memberSince: account.memberSince,
      nightsThisYear: account.nightsThisYear
    };

    setUser(activeUser);
    setAuthError(null);
    return true;
  };

  const signUp = (
    firstName: string,
    lastName: string,
    email: string,
    phoneOrPassword?: string,
    password?: string
  ): boolean => {
    setAuthError(null);

    let finalEmail = email.trim();
    let finalPhone = '';
    let finalPassword = '';

    if (password !== undefined) {
      // 5 arguments: (firstName, lastName, email, phone, password)
      finalPhone = (phoneOrPassword || '').trim();
      finalPassword = password.trim();
    } else {
      // 4 arguments: (firstName, lastName, emailOrPhone, password)
      finalPassword = (phoneOrPassword || '').trim();
      if (finalEmail.includes('@') || /[a-zA-Z]/.test(finalEmail)) {
        finalPhone = '+1 (555) 234-5678';
      } else {
        finalPhone = finalEmail;
        finalEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@bonvoy-member.com`;
      }
    }

    // 1. Strict Name validation
    if (!firstName.trim() || firstName.trim().length < 2) {
      setAuthError('First name must contain at least 2 letters.');
      return false;
    }
    if (!lastName.trim() || lastName.trim().length < 2) {
      setAuthError('Last name must contain at least 2 letters.');
      return false;
    }

    // 2. Strict Email validation
    const emailCheck = validateEmail(finalEmail);
    if (!emailCheck.isValid) {
      setAuthError(emailCheck.error || 'Please enter a valid, original email address (e.g. name@domain.com).');
      return false;
    }

    // 3. Strict Phone validation if provided
    if (finalPhone) {
      const phoneCheck = validatePhone(finalPhone);
      if (!phoneCheck.isValid) {
        setAuthError(phoneCheck.error || 'Please enter a valid, original contact number (10 to 15 digits).');
        return false;
      }
    } else {
      finalPhone = '+1 (555) 234-5678';
    }

    // 4. Password validation
    if (!finalPassword || finalPassword.length < 6) {
      setAuthError('Password must contain at least 6 characters.');
      return false;
    }

    const cleanPhone = finalPhone.replace(/\D/g, '');
    const newAccount: RegisteredAccount = {
      id: `MB-${Math.floor(100000 + Math.random() * 900000)}`,
      email: finalEmail.toLowerCase(),
      phone: finalPhone,
      cleanPhone: cleanPhone,
      password: finalPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      tier: 'Member',
      points: 5000,
      memberSince: '2026',
      nightsThisYear: 0
    };

    setRegisteredUsers(prev => {
      const filtered = prev.filter(
        u => u.email.toLowerCase() !== newAccount.email && u.cleanPhone !== newAccount.cleanPhone
      );
      return [newAccount, ...filtered];
    });

    setUser({
      id: newAccount.id,
      email: newAccount.email,
      phone: newAccount.phone,
      firstName: newAccount.firstName,
      lastName: newAccount.lastName,
      tier: 'Member',
      points: newAccount.points,
      memberSince: newAccount.memberSince,
      nightsThisYear: newAccount.nightsThisYear
    });

    setAuthError(null);
    return true;
  };

  const signOut = () => {
    setUser(null);
    try {
      localStorage.removeItem('marriott_user');
      localStorage.removeItem('aurelia_user');
    } catch {
      // ignore
    }
  };

  const addReservation = (reservation: Reservation) => {
    setReservations(prev => [reservation, ...prev]);
  };

  const cancelReservation = (id: string) => {
    setReservations(prev =>
      prev.map(res => (res.id === id ? { ...res, status: 'cancelled' } : res))
    );
    return true;
  };

  const findReservationByCode = (code: string, lastName?: string) => {
    const cleanCode = code.trim().toUpperCase();
    return (
      reservations.find(res => {
        const codeMatch = res.confirmationCode.toUpperCase() === cleanCode;
        if (!lastName) return codeMatch;
        const nameMatch = res.guest.lastName.toLowerCase() === lastName.trim().toLowerCase();
        return codeMatch && nameMatch;
      }) || null
    );
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        reservations,
        authError,
        clearAuthError,
        signIn,
        signUp,
        signOut,
        addReservation,
        cancelReservation,
        findReservationByCode
      }}
    >
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
