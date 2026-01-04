
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
    imageUrl: 'https://images.unsplash.com/photo-1544124499-58912cbddaad?q=80&w=2574&auto=format&fit=crop',
    imageGallery: [
      'data:image/jpeg;base64,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',
      'https://assets.cntraveller.in/photos/60b9fee913fda2fd38ad7f18/1:1/w_768,h_768,c_limit/Backwater-kerala-1366x768.jpg',
      'https://q-xx.bstatic.com/xdata/images/hotel/max500/535857078.jpg?k=f2ea19d5141ec8b90f5219fc9a2d129dd36bcca2848d7625659c29c8d868fcb6&o='
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
