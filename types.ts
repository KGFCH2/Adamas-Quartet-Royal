
export interface User {
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  capacity: number;
  imageUrl: string;
  imageGallery: string[];
  amenities: string[];
  featured?: boolean;
}

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}

export enum PaymentStatus {
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',
  PARTIAL_REFUNDED = 'PARTIAL_REFUNDED',
  PENDING = 'PENDING'
}

export type PaymentMethod = 'UPI' | 'GPay' | 'BankTransfer';

export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  roomName: string;
  roomImage: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paymentReference?: string;
  createdAt: string;
  guests: number;
  bedType: 'Single' | 'Double';
  refundAmount?: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface BookingDraft {
  roomId: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  bedType: 'Single' | 'Double';
}
