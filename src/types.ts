export type BrandId =
  | 'the-ritz-carlton'
  | 'jw-marriott'
  | 'st-regis'
  | 'luxury-collection'
  | 'w-hotels'
  | 'edition'
  | string;

export interface Brand {
  id: BrandId;
  name: string;
  slug: string;
  tagline: string;
  category: 'Classic Luxury' | 'Distinctive Luxury' | 'Premium Luxury' | string;
  description: string;
  philosophy: string;
  propertyCount: number;
  coverImage: string;
  logoText?: string;
  logoUrl?: string;
  websiteUrl?: string; // Configured destination URL for official brand discovery
  signaturePerks: string[];
  accentColor: string;
  isFeatured: boolean;
  isActive: boolean;
  displayOrder: number;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface RatePlan {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  originalPricePerNight?: number;
  cancellationPolicy: 'free-cancellation' | 'flexible' | 'non-refundable';
  cancellationDeadlineHours: number;
  includesBreakfast: boolean;
  perks: string[];
}

export interface RoomType {
  id: string;
  name: string;
  category: 'Deluxe' | 'Suite' | 'Villa' | 'Penthouse';
  description: string;
  sizeSqFt: number;
  sizeSqM: number;
  maxAdults: number;
  maxChildren: number;
  bedConfiguration: string;
  view: string;
  images: string[];
  features: string[];
  basePrice: number;
  ratePlans: RatePlan[];
  inventoryRemaining: number;
}

export interface Review {
  id: string;
  guestName: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  roomStayed: string;
}

export interface Property {
  id: string;
  brandId: BrandId;
  name: string;
  slug: string;
  city: string;
  country: string;
  region: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  officialUrl: string;
  verifiedSource: string;
  tagline: string;
  description: string;
  starRating: number;
  guestRating: number;
  reviewCount: number;
  images: string[];
  heroImage: string;
  featured: boolean;
  setting: 'coastal' | 'urban' | 'alpine' | 'island' | 'mountain' | 'nature' | string;
  startingPrice: number;
  currency: string;
  amenities: string[];
  checkInTime: string;
  checkOutTime: string;
  meetingSpaceSqFt?: number;
  meetingRoomsCount?: number;
  verificationTimestamp?: string;
  isReserve?: boolean;
  bookingUrl?: string;
  availabilityIntegrationStatus?: 'verified-live' | 'external-booking' | 'on-request';
  rooms: RoomType[];
  reviews: Review[];
  policies: {
    cancellation: string;
    checkInAge: number;
    pets: string;
    smoking: string;
  };
}

export interface SearchParams {
  destination: string;
  checkIn: string; // YYYY-MM-DD
  checkOut: string; // YYYY-MM-DD
  rooms: number;
  adults: number;
  seniors?: number; // Older Adults (62+)
  children: number;
  childrenAges: number[];
  selectedBrands: BrandId[];
  promoCode: string;
}

export interface ReservationGuest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests?: string;
  estimatedArrival?: string;
  membershipNumber?: string;
}

export interface PaymentDetails {
  paymentMethod: 'credit-card' | 'paypal';
  cardHolderName?: string;
  cardNumber?: string;
  expiryMonth?: string;
  expiryYear?: string;
  cvv?: string;
  billingZip?: string;
  paypalEmail?: string;
  paypalTransactionId?: string;
  paypalFundingSource?: string;
}

export interface Reservation {
  id: string;
  confirmationCode: string;
  createdAt: string;
  propertyId: string;
  propertyName: string;
  propertyCity: string;
  propertyCountry: string;
  propertyImage: string;
  brandId: BrandId;
  brandName: string;
  roomId: string;
  roomName: string;
  ratePlanId: string;
  ratePlanName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomsCount: number;
  adultsCount: number;
  childrenCount: number;
  guest: ReservationGuest;
  roomSubtotal: number;
  taxesAndFees: number;
  resortFee: number;
  discount: number;
  totalAmount: number;
  currency: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  cancellationDeadline: string;
  cancellationPolicy: string;
  paymentMethod: string;
  cardBrand?: string;
  cardLast4?: string;
  paypalTransactionId?: string;
  paypalFundingSource?: string;
}

export type BonvoyTier =
  | 'Member'
  | 'Gold Elite'
  | 'Platinum Elite'
  | 'Titanium Elite'
  | 'Ambassador Elite';

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  tier: BonvoyTier;
  points: number;
  memberSince: string;
  nightsThisYear: number;
}

export interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  code: string;
  discountPercentage?: number;
  creditAmount?: number;
  brandId?: BrandId;
  propertyIds?: string[];
  validUntil: string;
  image: string;
  inclusions: string[];
  terms: string;
  eligibility?: string;
  bookingUrl?: string;
}

export interface VacationItem {
  id: string;
  title: string;
  category:
    | 'Homes & Villas'
    | 'Marriott Vacation Club'
    | 'All-Inclusive'
    | 'Vacation Packages'
    | 'Yacht Collection'
    | 'Tours & Activities';
  destination: string;
  country: string;
  description: string;
  image: string;
  features: string[];
  startingPrice?: number;
  providerNotice: string;
  bookingUrl: string;
}

export interface MeetingEnquiry {
  id: string;
  eventType: 'Business Meeting' | 'Conference' | 'Wedding' | 'Social Gala' | 'Group Room Block';
  destination: string;
  preferredProperty?: string;
  startDate: string;
  endDate: string;
  attendees: number;
  guestRooms: number;
  spaceRequiredSqFt?: number;
  cateringRequired: boolean;
  contactName: string;
  organization?: string;
  businessEmail: string;
  phone: string;
  additionalNotes?: string;
  submittedAt: string;
  referenceNumber: string;
  status: 'received' | 'under_review';
}

export interface CareerPosition {
  id: string;
  title: string;
  department:
    | 'Hotel Operations'
    | 'Culinary & F&B'
    | 'Luxury Concierge'
    | 'Corporate & Management'
    | 'Information Technology';
  location: string;
  country: string;
  brandName: string;
  jobType: 'Full-Time' | 'Part-Time' | 'Internship';
  jobId: string;
  description: string;
  requirements: string[];
  officialApplyUrl: string;
}
