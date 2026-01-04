
import { User, Room, Booking, BookingStatus, PaymentStatus, PaymentMethod } from '../types';

export interface ExtendedRoom extends Room {
  category: 'Budget Friendly' | 'Low Cost' | 'Premium' | 'Royal' | 'Luxury';
  rating: number;
}

const ROOMS: ExtendedRoom[] = [
  {
    id: 'r1',
    name: 'Adamas Budget Hub',
    description: 'A modern, tech-enabled sanctuary in Kolkata. Perfect for the professional traveler seeking efficiency and comfort in the City of Joy.',
    pricePerNight: 1999,
    capacity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop',
    imageGallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2670&auto=format&fit=crop'
    ],
    amenities: ['Work Station', 'Wifi', 'Smart TV', 'Air Conditioning'],
    featured: false,
    category: 'Budget Friendly',
    rating: 4.2
  },
  {
    id: 'r2',
    name: 'Sovereign Gateway Mumbai',
    description: 'Overlooking the Arabian Sea, this studio offers a high-octane blend of Mumbais energy and serene luxury.',
    pricePerNight: 2999,
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop',
    imageGallery: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2671&auto=format&fit=crop'
    ],
    amenities: ['Sea View', 'Kitchenette', 'Concierge', 'Soundproof'],
    featured: false,
    category: 'Low Cost',
    rating: 4.5
  },
  {
    id: 'r3',
    name: 'Ganges Heritage Pavilion',
    description: 'Experience the spiritual essence of Varanasi from our hand-crafted suites designed for ultimate peace and reflection.',
    pricePerNight: 6499,
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2670&auto=format&fit=crop',
    imageGallery: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop'
    ],
    amenities: ['River Access', 'Meditation Deck', 'Traditional Cuisine', 'Temple View'],
    featured: false,
    category: 'Premium',
    rating: 4.7
  },
  {
    id: 'r4',
    name: 'The Amber Palace',
    description: 'Step into the era of the Maharajas. This Jaipur suite features intricate frescos and authentic Rajasthani decor.',
    pricePerNight: 12499,
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?q=80&w=2574&auto=format&fit=crop',
    imageGallery: [
      'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop'
    ],
    amenities: ['Royal Bed', 'Private Courtyard', 'Butler', 'Folk Music Access'],
    featured: true,
    category: 'Royal',
    rating: 4.9
  },
  {
    id: 'r5',
    name: 'Mystic Kerala Retreat',
    description: 'Waking up to the mist over tea plantations. Our Munnar retreat is an eco-luxury haven for nature lovers.',
    pricePerNight: 7999,
    capacity: 2,
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/f2/00/4f/c.jpg?w=900&h=500&s=1',
    imageGallery: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/f2/00/4f/c.jpg?w=900&h=500&s=1',
      'https://media.easemytrip.com/media/Hotel/SHL-250115203885053/Hotel/Hotelw9VOaz.png',
      'https://r1imghtlak.ibcdn.com/fd1f1688-8211-4a32-988f-1fe05cd26d65.JPG'
    ],
    amenities: ['Tea Garden View', 'Ayurvedic Spa', 'Private Balcony', 'Yoga Hall'],
    featured: false,
    category: 'Premium',
    rating: 4.6
  },
  {
    id: 'r6',
    name: 'Ganges Breeze Retreat',
    description: 'A tranquility-first suite in Rishikesh, merging the sound of the holy river with modern wellness amenities.',
    pricePerNight: 8499,
    capacity: 2,
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/bc/8f/03/summit-by-the-ganges.jpg?w=2000&h=-1&s=1',
    imageGallery: [
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/bc/8f/03/summit-by-the-ganges.jpg?w=2000&h=-1&s=1',
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/1c/47/19/executive-room.jpg?w=2000&h=-1&s=1',
      'https://assets.simplotel.com/simplotel/image/upload/x_0,y_491,w_4697,h_2642,r_0,c_crop/q_80,w_2000,dpr_1,f_auto,fl_progressive,c_limit/summit-by-the-ganges-beach-resort-spa-rishikesh/Deluxe_Ganges_View_Room_with_Private_Balcony4_09bc9f83',
      'https://cdn.audleytravel.com/700/500/79/363562-hotel-ganges-view-varanasi.jpg'
    ],
    amenities: ['Yoga Deck', 'Organic Cafe', 'Ganges View', 'Heated Pool'],
    featured: true,
    category: 'Premium',
    rating: 4.8
  },
  {
    id: 'r7',
    name: 'Himalayan Crown',
    description: 'A snow-clad luxury sanctuary in Shimla. Experience warmth and majesty in our cedar-inspired suites.',
    pricePerNight: 15999,
    capacity: 3,
    imageUrl: 'https://pix10.agoda.net/hotelImages/275959/0/ffab98ff4b75c269c188191dda03ec38.jpg?ce=3&s=2000x',
    imageGallery: [
      'https://pix10.agoda.net/hotelImages/275959/0/ffab98ff4b75c269c188191dda03ec38.jpg?ce=3&s=2000x',
      'https://altlifestays.com/images/uploads/427/2444_665super_deluxe_room__6_.jpg',
      'https://www.mcleodganjhotels.net/data/Photos/OriginalPhoto/14767/1476774/1476774688.JPEG'
    ],
    amenities: ['Fireplace', 'Snow Lounge', 'Guided Treks', 'Premium Bedding'],
    featured: true,
    category: 'Royal',
    rating: 4.8
  },
  {
    id: 'r8',
    name: 'Desert Rose Pavilion',
    description: 'Golden hour redefined. Live amidst the Thar desert in Jaisalmer with palace-grade comfort and sand views.',
    pricePerNight: 10999,
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2670&auto=format&fit=crop',
    imageGallery: [
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2670&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop'
    ],
    amenities: ['Desert Safari', 'Arabic Lounge', 'Star Deck', 'Plunge Pool'],
    featured: false,
    category: 'Premium',
    rating: 4.7
  },
  {
    id: 'r9',
    name: 'Imperial Council Suites',
    description: 'Located in the diplomatic heart of New Delhi, our suites offer a commanding view of the capital\'s skyline.',
    pricePerNight: 18999,
    capacity: 3,
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2650&auto=format&fit=crop',
    imageGallery: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2650&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2516&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=2574&auto=format&fit=crop'
    ],
    amenities: ['Business Center', 'VIP Entry', 'Gourmet Dining', 'Smart Hub'],
    featured: true,
    category: 'Royal',
    rating: 4.9
  },
  {
    id: 'r10',
    name: 'Lake Palace Sanctuary',
    description: 'Floating in the waters of Udaipur, this is the definitive Indian luxury experience. A palace built for dreams.',
    pricePerNight: 34999,
    capacity: 2,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop',
    imageGallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2680&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2670&auto=format&fit=crop'
    ],
    amenities: ['Lake View', 'Private Jacuzzi', '24/7 Butler', 'Royal Dining'],
    featured: true,
    category: 'Luxury',
    rating: 5.0
  }
];

const STORAGE_KEYS = {
  USERS: 'royal_indus_users',
  BOOKINGS: 'royal_indus_bookings',
  CURRENT_USER: 'royal_indus_session'
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredUsers = (): User[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const getStoredBookings = (): Booking[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const RoomService = {
  getAllRooms: async (): Promise<ExtendedRoom[]> => {
    await delay(500); 
    return ROOMS;
  },
  getRoomById: async (id: string): Promise<ExtendedRoom | undefined> => {
    await delay(300);
    return ROOMS.find(r => r.id === id);
  }
};

export const AuthService = {
  login: async (email: string): Promise<{ user: User, isFirstLogin: boolean }> => {
    await delay(800);
    const users = getStoredUsers();
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return AuthService.register("New Guest", email);
    }
    
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return { user, isFirstLogin: false };
  },
  register: async (name: string, email: string): Promise<{ user: User, isFirstLogin: boolean }> => {
    await delay(1000);
    const users = getStoredUsers();
    
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(existing));
      return { user: existing, isFirstLogin: false };
    }

    const newUser: User = { 
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, 
      name, 
      email: email.toLowerCase() 
    };
    
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    return { user: newUser, isFirstLogin: true };
  },
  updateProfile: async (userId: string, updates: Partial<User>): Promise<User> => {
    await delay(500);
    const users = getStoredUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) throw new Error("User not found");
    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
    return updatedUser;
  },
  deleteAccount: async (userId: string): Promise<void> => {
    await delay(1200);
    const users = getStoredUsers().filter(u => u.id !== userId);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    const bookings = getStoredBookings().filter(b => b.userId !== userId);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  logout: async () => {
    await delay(300);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      return null;
    }
  }
};

export const BookingService = {
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    await delay(600);
    const allBookings = getStoredBookings();
    return allBookings
      .filter(b => b.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  getAllBookingsForRoom: async (roomId: string): Promise<Booking[]> => {
    await delay(300);
    return getStoredBookings().filter(b => b.roomId === roomId && b.status === BookingStatus.CONFIRMED);
  },
  cancelBooking: async (bookingId: string): Promise<void> => {
    await delay(1000);
    const bookings = getStoredBookings();
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: BookingStatus.CANCELLED, paymentStatus: PaymentStatus.REFUNDED } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  },
  syncBookingStatuses: async (userId: string): Promise<Booking[]> => {
    const bookings = getStoredBookings();
    const now = new Date();
    let updated = false;
    const synced = bookings.map(b => {
      if (b.userId === userId && b.status === BookingStatus.CONFIRMED) {
        const checkOut = new Date(b.checkOutDate);
        if (checkOut < now) {
          updated = true;
          return { ...b, status: BookingStatus.COMPLETED };
        }
      }
      return b;
    });
    if (updated) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(synced));
    }
    return synced.filter(b => b.userId === userId);
  },
  createBooking: async (
    userId: string, 
    roomId: string, 
    checkIn: Date, 
    checkOut: Date, 
    totalPrice: number, 
    guests: number, 
    bedType: 'Single' | 'Double',
    paymentMethod: PaymentMethod,
    paymentReference: string
  ): Promise<Booking> => {
    await delay(1500); 
    const room = ROOMS.find(r => r.id === roomId);
    if (!room) throw new Error("Room not found");
    const newBooking: Booking = {
      id: `BK-${Date.now().toString().slice(-6)}`,
      userId,
      roomId,
      roomName: room.name,
      roomImage: room.imageUrl,
      checkInDate: checkIn.toISOString(),
      checkOutDate: checkOut.toISOString(),
      totalPrice,
      guests,
      bedType,
      paymentMethod,
      paymentReference,
      status: BookingStatus.CONFIRMED,
      paymentStatus: PaymentStatus.PAID,
      createdAt: new Date().toISOString()
    };
    const bookings = getStoredBookings();
    bookings.push(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    return newBooking;
  }
};
