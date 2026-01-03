
import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Check, X, Crown, 
  ChevronLeft, ChevronRight, 
  ScrollText, Maximize2, Info, Download, ImageIcon, ArrowLeft, CreditCard, Landmark as BankIcon, Sparkles, Globe, Filter, Star, Calendar as CalendarIcon, History, Coffee, Wifi, Shield, Wind, Tv, Trash2
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { RoomService, BookingService, ExtendedRoom } from '../services/mockBackend';
import { Booking, PaymentMethod } from '../types';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { BookingLoader } from '../components/ui/BookingLoader';
import { SectionLoader } from '../components/ui/SectionLoader';
import { DocumentLoader } from '../components/ui/DocumentLoader';
import { BookingTicketTemplate } from '../components/BookingTicketTemplate';
import ReactDOM from 'react-dom/client';

const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const formatDateLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const CATEGORIES = [
  { label: 'All', subtitle: 'Everything' },
  { label: 'Budget Friendly', subtitle: 'Affordable' },
  { label: 'Low Cost', subtitle: 'Simple' },
  { label: 'Premium', subtitle: 'Classic' },
  { label: 'Royal', subtitle: 'Excellent' },
  { label: 'Luxury', subtitle: 'Best' }
];

const SanctuaryCalendar = ({ 
  selectedCheckIn, 
  selectedCheckOut, 
  onSelectDate, 
  roomBookings 
}: { 
  selectedCheckIn: string, 
  selectedCheckOut: string, 
  onSelectDate: (date: string) => void,
  roomBookings: Booking[]
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth]);

  const isDateBooked = (date: Date) => {
    const dStr = formatDateLocal(date);
    return roomBookings.some(b => {
      const start = b.checkInDate.split('T')[0];
      const end = b.checkOutDate.split('T')[0];
      return dStr >= start && dStr < end;
    });
  };

  const isSelected = (date: Date) => {
    const dStr = formatDateLocal(date);
    return dStr === selectedCheckIn || dStr === selectedCheckOut;
  };

  const isInRange = (date: Date) => {
    if (!selectedCheckIn || !selectedCheckOut) return false;
    const dStr = formatDateLocal(date);
    return dStr > selectedCheckIn && dStr < selectedCheckOut;
  };

  const changeMonth = (offset: number) => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    setCurrentMonth(next);
  };

  return (
    <div className="bg-royal-950/80 border border-royal-800 p-4 rounded-sm shadow-xl backdrop-blur-xl">
      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={() => changeMonth(-1)} className="p-1.5 hover:bg-white/5 rounded-full text-saffron-500 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
        <span className="text-xs font-bold uppercase tracking-widest text-white font-serif">
          {currentMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </span>
        <button type="button" onClick={() => changeMonth(1)} className="p-1.5 hover:bg-white/5 rounded-full text-saffron-500 transition-colors"><ChevronRight className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-[8px] font-black text-gray-500 text-center uppercase tracking-widest">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: daysInMonth[0].getDay() }).map((_, i) => (
          <div key={`fill-${i}`} />
        ))}
        {daysInMonth.map(date => {
          const booked = isDateBooked(date);
          const selected = isSelected(date);
          const inRange = isInRange(date);
          const dStr = formatDateLocal(date);
          const today = formatDateLocal(new Date());
          const isPast = dStr < today;

          return (
            <button
              key={dStr}
              type="button"
              disabled={booked || isPast}
              onClick={() => onSelectDate(dStr)}
              className={`
                aspect-square flex items-center justify-center text-[10px] font-bold rounded-sm transition-all relative border
                ${selected ? 'bg-saffron-500 border-saffron-400 text-white shadow-lg z-10 scale-105' : 'border-transparent'}
                ${inRange ? 'bg-saffron-500/20 text-saffron-400' : ''}
                ${booked ? 'bg-red-950/30 text-red-800 border-red-900/20 cursor-not-allowed opacity-50' : 'hover:border-saffron-500/50'}
                ${isPast ? 'text-gray-700 cursor-not-allowed opacity-20' : 'text-slate-200'}
                ${!selected && !booked && !inRange && !isPast ? 'bg-royal-900/50' : ''}
              `}
            >
              {date.getDate()}
              {booked && (
                <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const RoomGallery = ({ images, onImageClick }: { images: string[], onImageClick?: (idx: number) => void }) => {
  const [index, setIndex] = useState(0);
  const dragX = useMotionValue(0);

  const next = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const onDragEnd = () => {
    const x = dragX.get();
    if (x <= -50) next();
    else if (x >= 50) prev();
  };

  return (
    <div className="relative h-64 md:h-[420px] w-full overflow-hidden group/gallery bg-gray-100 dark:bg-royal-950 cursor-grab active:cursor-grabbing">
      <motion.div
        style={{ x: dragX }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
        className="h-full w-full"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover pointer-events-none"
          />
        </AnimatePresence>
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-chakra-900/60 via-transparent to-transparent opacity-0 group-hover/gallery:opacity-100 transition-opacity pointer-events-none" />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-xl rounded-full text-white opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-saffron-500 border border-white/10 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-xl rounded-full text-white opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-saffron-500 border border-white/10 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-700 ${i === index ? 'w-6 bg-saffron-500' : 'w-1 bg-white/40'}`}
              />
            ))}
          </div>
        </>
      )}

      {onImageClick && (
        <button 
          onClick={(e) => { e.stopPropagation(); onImageClick(index); }}
          className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-xl rounded-full text-white opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-white/20 z-10"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

const Rooms = () => {
  const [rooms, setRooms] = useState<ExtendedRoom[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<ExtendedRoom | null>(null);
  const [detailedRoom, setDetailedRoom] = useState<ExtendedRoom | null>(null);
  const [roomBookings, setRoomBookings] = useState<Booking[]>([]);
  const [lastStayConfig, setLastStayConfig] = useState<Booking | null>(null);
  const [upiError, setUpiError] = useState('');
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(60000);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('rating');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { isAuthenticated, user, setAuthModalOpen } = useAuth();
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [bedType, setBedType] = useState<'Single' | 'Double'>('Double');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | 'OnlinePayment'>('OnlinePayment');
  const [mobileNumber, setMobileNumber] = useState('');
  const [upiIdInput, setUpiIdInput] = useState('');
  const [bankName, setBankName] = useState('');
  
  const [isBooking, setIsBooking] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<Booking | null>(null);
  const [base64SuccessImage, setBase64SuccessImage] = useState<string>('');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await RoomService.getAllRooms();
        setRooms(data);
      } catch (err) {
        console.error("Room retrieval failed:", err);
      } finally {
        setLoading(false);
        setTimeout(() => setIsNavigating(false), 800);
      }
    };
    fetchRooms();
  }, []);

  const allAmenities = useMemo(() => {
    const ams = new Set<string>();
    rooms.forEach(r => r.amenities.forEach(a => ams.add(a)));
    return Array.from(ams);
  }, [rooms]);

  const filteredRooms = useMemo(() => {
    let result = activeCategory === 'All' ? [...rooms] : rooms.filter(r => r.category === activeCategory);
    if (selectedAmenities.length > 0) {
      result = result.filter(r => selectedAmenities.every(a => r.amenities.includes(a)));
    }
    result = result.filter(r => r.pricePerNight <= priceMax);
    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'price-desc') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
    return result;
  }, [activeCategory, rooms, selectedAmenities, priceMax, sortBy]);

  const handleBookClick = async (room: ExtendedRoom) => {
    if (!isAuthenticated) {
      setAuthModalOpen(true);
      return; 
    }
    setDetailedRoom(null);
    setSelectedRoom(room);
    setBookingSuccess(null);
    setUpiError('');
    try {
      const bks = await BookingService.getAllBookingsForRoom(room.id);
      setRoomBookings(bks);
      if (user) {
        const myBks = await BookingService.getUserBookings(user.id);
        const lastStay = myBks.find(b => b.roomId === room.id && b.status === 'COMPLETED');
        setLastStayConfig(lastStay || null);
      }
    } catch (e) { console.error(e); }
  };

  const handleDateSelect = (date: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut('');
    } else {
      if (date < checkIn) {
        setCheckIn(date);
        setCheckOut('');
      } else if (date === checkIn) {
        setCheckIn('');
        setCheckOut('');
      } else {
        setCheckOut(date);
      }
    }
  };

  const applyLastStay = () => {
    if (lastStayConfig) {
      setGuests(lastStayConfig.guests);
      setBedType(lastStayConfig.bedType);
      setCheckIn('');
      setCheckOut('');
    }
  };

  const calculateTotal = () => {
    if (!selectedRoom || !checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const timeDiff = end.getTime() - start.getTime();
    if (isNaN(timeDiff)) return 0;
    const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    const basePrice = nights * selectedRoom.pricePerNight;
    const bedSurcharge = bedType === 'Double' ? 500 : 0;
    return basePrice + bedSurcharge;
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || !user) return;
    
    if (paymentMethod === 'UPI') {
      const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
      if (!upiIdInput || !upiRegex.test(upiIdInput)) {
        setUpiError('Enter valid UPI ID (e.g. name@bank)');
        return;
      }
    }

    setIsBooking(true);
    try {
      const total = calculateTotal();
      let ref = "";
      if (paymentMethod === 'OnlinePayment') ref = `Mobile: ${mobileNumber}`;
      else if (paymentMethod === 'UPI') ref = `UPI: ${upiIdInput}`;
      else ref = `Bank: ${bankName}`;
      const booking = await BookingService.createBooking(
        user.id, selectedRoom.id, new Date(checkIn), new Date(checkOut),
        total, guests, bedType, paymentMethod === 'OnlinePayment' ? 'GPay' as any : paymentMethod as any, ref
      );
      const b64 = await fetchImageAsBase64(booking.roomImage);
      setBase64SuccessImage(b64);
      setBookingSuccess(booking);
      setSelectedRoom(null);
    } catch (err) { console.error("Error:", err); } finally { setIsBooking(false); }
  };

  const fetchImageAsBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url, { mode: 'cors', cache: 'no-cache' });
      if (!response.ok) throw new Error("Proxy failed");
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject("Conversion failed");
        reader.readAsDataURL(blob);
      });
    } catch (e) { return url; }
  };

  const captureArtifact = async (): Promise<string | null> => {
    const captureRoot = document.getElementById('pdf-capture-root');
    if (!captureRoot || !bookingSuccess || !user) return null;
    setIsDownloading(true);
    captureRoot.style.visibility = 'visible';
    captureRoot.style.opacity = '1';
    captureRoot.style.zIndex = '-9999';
    captureRoot.innerHTML = '';
    const root = ReactDOM.createRoot(captureRoot);
    try {
      root.render(<BookingTicketTemplate booking={bookingSuccess} userName={user.name} base64Image={base64SuccessImage} isWebPreview={false} />);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const elementToCapture = captureRoot.querySelector('#adamas-receipt-template') as HTMLElement;
      if (!elementToCapture) throw new Error("Template missing");
      const dataUrl = await toPng(elementToCapture, { pixelRatio: 2, backgroundColor: '#ffffff', quality: 1, cacheBust: true });
      captureRoot.style.visibility = 'hidden';
      root.unmount();
      setIsDownloading(false);
      return dataUrl;
    } catch (err: any) {
      setIsDownloading(false);
      try { root.unmount(); } catch(e) {}
      return null;
    }
  };

  const handleDownloadPDF = async () => {
    const dataUrl = await captureArtifact();
    if (!dataUrl) return;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const imgHeight = (img.height * pdfWidth) / img.width;
      const y = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;
      pdf.addImage(dataUrl, 'PNG', 0, y, pdfWidth, imgHeight, undefined, 'FAST');
      pdf.save(`Booking-${bookingSuccess?.id}.pdf`);
    };
  };

  const handleDownloadPNG = async () => {
    const dataUrl = await captureArtifact();
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `Booking-${bookingSuccess?.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  const toggleAmenity = (a: string) => {
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  if (isNavigating) return <SectionLoader />;

  return (
    <div className="relative min-h-screen bg-royal-950 text-slate-100 py-24 overflow-hidden">
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DocumentLoader isVisible={isDownloading} />
        <AnimatePresence>{isBooking && <BookingLoader />}</AnimatePresence>

        <div className="mb-20 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
              <Crown className="w-10 h-10 text-saffron-500 mb-6 animate-float" />
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 tracking-tight uppercase">Available Rooms</h1>
              <p className="text-slate-400 font-serif italic text-base md:text-lg mb-10 max-w-2xl text-center leading-relaxed">
                "Verified sanctuaries of the Adamas Council."
              </p>
          </motion.div>
          
          <div className="flex overflow-x-auto no-scrollbar justify-start md:justify-center gap-2 mb-10 pb-4 px-4">
            {CATEGORIES.map(cat => (
              <button key={cat.label} onClick={() => setActiveCategory(cat.label)} className={`group flex items-center whitespace-nowrap gap-2 px-5 py-2 rounded-sm border transition-all duration-500 relative overflow-hidden ${activeCategory === cat.label ? 'bg-royal-800 text-white border-saffron-500 shadow-lg scale-105' : 'bg-royal-900 text-gray-400 border-royal-800 hover:border-saffron-500/50'}`}>
                <div className="flex flex-col items-start">
                  <span className={`text-[0.6rem] font-black uppercase tracking-widest ${activeCategory === cat.label ? 'text-saffron-500' : 'text-gray-400'}`}>{cat.label}</span>
                </div>
                {activeCategory === cat.label && <motion.div layoutId="activeCatLine" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500" />}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-10 bg-royal-900/40 p-4 rounded-full border border-royal-800 backdrop-blur-md max-w-fit mx-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)} 
              className={`flex items-center gap-2 px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${isFilterOpen ? 'bg-saffron-500 border-saffron-500 text-white shadow-lg' : 'bg-royal-950 border-royal-800 text-gray-400 hover:border-saffron-500'}`}
            >
              <Filter className="w-3.5 h-3.5" /> {isFilterOpen ? 'Close Filters' : 'Advanced Filters'}
            </button>
            
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Sort:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-royal-950 border border-royal-800 text-gray-300 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full outline-none focus:border-saffron-500 transition-all cursor-pointer"
              >
                <option value="rating">Rating</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
              </select>
            </div>
          </div>

          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mb-16 max-w-4xl mx-auto overflow-hidden"
              >
                <div className="bg-royal-900/60 p-8 rounded-sm border border-royal-800 backdrop-blur-xl text-left">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-saffron-500 mb-6">Price Range (per night)</h4>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-bold text-gray-400">₹0</span>
                        <input 
                          type="range" 
                          min="0" 
                          max="60000" 
                          step="1000" 
                          value={priceMax} 
                          onChange={(e) => setPriceMax(parseInt(e.target.value))}
                          className="flex-1 h-1.5 bg-royal-800 rounded-full appearance-none accent-saffron-500 cursor-pointer"
                        />
                        <span className="text-xs font-bold text-saffron-500">₹{priceMax.toLocaleString()}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indiaGreen-500 mb-6">Imperial Amenities</h4>
                      <div className="flex flex-wrap gap-2">
                        {allAmenities.map(a => (
                          <button 
                            key={a}
                            onClick={() => toggleAmenity(a)}
                            className={`px-3 py-1.5 rounded-sm border text-[8px] font-black uppercase tracking-widest transition-all ${selectedAmenities.includes(a) ? 'bg-indiaGreen-500 border-indiaGreen-500 text-white' : 'bg-royal-950 border-royal-800 text-gray-400 hover:border-indiaGreen-500/50'}`}
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-royal-800 flex justify-end">
                     <Button variant="ghost" className="h-10 text-[8px]" onClick={() => { setSelectedAmenities([]); setPriceMax(60000); }}>Reset All</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <motion.div key={room.id} layout initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="group relative flex flex-col h-full bg-royal-900/40 rounded-sm border border-royal-800 hover:border-royal-700 transition-all duration-500 backdrop-blur-md overflow-hidden">
              <div className="cursor-pointer" onClick={() => setDetailedRoom(room)}>
                 <RoomGallery images={room.imageGallery} onImageClick={() => setDetailedRoom(room)} />
              </div>
              <div className="p-8 flex flex-col flex-grow relative">
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-chakra-900/95 backdrop-blur-md text-white px-3 py-1 rounded-sm text-[7px] font-black uppercase tracking-widest border-l-2 border-saffron-500 shadow-md">{room.category}</span>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-royal-900/90 backdrop-blur-md px-2 py-1 border border-saffron-500/30 rounded-sm flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 text-saffron-500 fill-saffron-500" />
                      <p className="text-[9px] font-bold text-white">{room.rating.toFixed(1)}</p>
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2 leading-tight uppercase group-hover:text-saffron-500 transition-colors cursor-pointer" onClick={() => setDetailedRoom(room)}>{room.name}</h3>
                <p className="text-slate-400 text-xs mb-6 flex-grow leading-relaxed font-serif italic line-clamp-2">"{room.description}"</p>
                <div className="space-y-4 pt-4 border-t border-royal-800/30">
                  <div className="flex flex-wrap gap-2">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="text-[8px] font-black uppercase tracking-widest px-2 py-1 bg-royal-950/60 border border-royal-800 text-gray-500">{amenity}</span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center gap-4">
                     <p className="text-sm font-black text-saffron-400 font-serif">{formatINR(room.pricePerNight)}<span className="text-[8px] font-black opacity-40 ml-1 uppercase">/Night</span></p>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="px-3 py-1 h-8" onClick={() => setDetailedRoom(room)}><Info className="w-4 h-4" /></Button>
                        <Button variant="primary" size="sm" className="px-4 py-1 h-8 text-[8px]" onClick={() => handleBookClick(room)}>Book Now</Button>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          {filteredRooms.length === 0 && (
            <div className="col-span-full py-24 text-center border border-dashed border-royal-800 rounded-sm">
               <Filter className="w-12 h-12 text-gray-700 mx-auto mb-6" />
               <p className="text-gray-500 font-serif italic text-lg">No sanctuaries matching your criteria were found.</p>
               <Button variant="ghost" className="mt-4" onClick={() => { setActiveCategory('All'); setPriceMax(60000); setSelectedAmenities([]); }}>Reset Search</Button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {detailedRoom && (
          <div key="details-modal" className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-hidden">
             <motion.div initial={{ scale: 0.98, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0 }} className="bg-royal-900 rounded-sm max-w-6xl w-full max-h-[95vh] flex flex-col md:flex-row relative shadow-4xl border border-white/10 overflow-hidden">
                <button onClick={() => setDetailedRoom(null)} className="absolute top-6 right-6 text-gray-500 hover:text-red-500 transition-all z-[160]"><X className="w-8 h-8" /></button>
                <div className="md:w-3/5 h-[300px] md:h-auto shrink-0 relative">
                   <RoomGallery images={detailedRoom.imageGallery} />
                   <div className="absolute top-8 left-8 z-10">
                      <div className="bg-royal-950/80 backdrop-blur-md border border-saffron-500/30 px-4 py-2 rounded-sm">
                         <h4 className="text-[10px] font-black uppercase tracking-widest text-saffron-500">Imperial Tier</h4>
                         <p className="text-lg font-serif font-bold text-white">{detailedRoom.category}</p>
                      </div>
                   </div>
                </div>
                <div className="md:w-2/5 p-12 flex flex-col overflow-y-auto custom-scrollbar bg-royal-950/20">
                   <div className="mb-10">
                      <div className="flex items-center gap-1 text-saffron-500 mb-2">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} className={`w-3.5 h-3.5 ${i < Math.floor(detailedRoom.rating) ? 'fill-saffron-500' : 'opacity-20'}`} />
                         ))}
                         <span className="text-[10px] font-black ml-2 text-white">{detailedRoom.rating.toFixed(1)}</span>
                      </div>
                      <h2 className="text-4xl font-serif font-bold text-white uppercase tracking-tighter mb-4">{detailedRoom.name}</h2>
                      <div className="h-1 w-20 bg-gradient-to-r from-saffron-500 to-indiaGreen-500 rounded-full mb-8"></div>
                      <p className="text-slate-300 font-serif italic text-lg leading-relaxed">"{detailedRoom.description}"</p>
                   </div>

                   <div className="mb-10">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6">Council Verified Amenities</h4>
                      <div className="grid grid-cols-2 gap-4">
                         {detailedRoom.amenities.map(a => (
                           <div key={a} className="flex items-center gap-3 p-3 bg-royal-900/50 border border-royal-800 rounded-sm group hover:border-saffron-500/30 transition-colors">
                              <div className="text-saffron-500">
                                {a.includes('Wifi') && <Wifi className="w-4 h-4" />}
                                {a.includes('Work') && <Tv className="w-4 h-4" />}
                                {a.includes('View') && <Sparkles className="w-4 h-4" />}
                                {a.includes('Butler') && <Shield className="w-4 h-4" />}
                                {(!a.includes('Wifi') && !a.includes('Work') && !a.includes('View') && !a.includes('Butler')) && <Coffee className="w-4 h-4" />}
                              </div>
                              <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{a}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="mt-auto pt-8 border-t border-royal-800 flex items-center justify-between gap-8">
                      <div>
                         <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest block mb-1">Standard Rate</span>
                         <span className="text-2xl font-serif font-bold text-saffron-400">{formatINR(detailedRoom.pricePerNight)}<span className="text-[10px] text-gray-600 font-black ml-1">/NIGHT</span></span>
                      </div>
                      <Button variant="primary" size="lg" className="flex-1" onClick={() => handleBookClick(detailedRoom)}>Secure Stay</Button>
                   </div>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedRoom && (
          <div key="booking-modal" className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md overflow-hidden">
            <motion.div initial={{ scale: 0.98, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.98, opacity: 0 }} className="bg-royal-900 rounded-sm max-w-5xl w-full max-h-[90vh] flex flex-col md:flex-row relative shadow-4xl border border-white/10 overflow-hidden">
               <button onClick={() => setSelectedRoom(null)} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-all z-[160]"><X className="w-6 h-6" /></button>
               
               <div className="md:w-1/2 p-6 border-r border-royal-800 flex flex-col bg-royal-950/30 overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">Stay Dates</h2>
                      <p className="text-[8px] text-saffron-500 uppercase font-black tracking-[0.3em]">Arrival & Departure</p>
                    </div>
                    {lastStayConfig && (
                      <button onClick={applyLastStay} className="flex items-center gap-1.5 px-3 py-1.5 bg-saffron-500/10 border border-saffron-500/30 text-saffron-500 rounded-sm text-[8px] font-black uppercase tracking-widest hover:bg-saffron-500/20">
                        <History className="w-3 h-3" /> Rebook
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <SanctuaryCalendar selectedCheckIn={checkIn} selectedCheckOut={checkOut} onSelectDate={handleDateSelect} roomBookings={roomBookings} />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-royal-950/50 p-3 border border-royal-800 rounded-sm">
                        <label className="text-[8px] font-black uppercase text-gray-500 mb-1 block tracking-widest">Check-In</label>
                        <div className="flex items-center gap-2 text-white">
                          <CalendarIcon className="w-4 h-4 text-saffron-500" />
                          <span className="text-xs font-bold">{checkIn ? new Date(checkIn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Arrival'}</span>
                        </div>
                      </div>
                      <div className="bg-royal-950/50 p-3 border border-royal-800 rounded-sm">
                        <label className="text-[8px] font-black uppercase text-gray-500 mb-1 block tracking-widest">Check-Out</label>
                        <div className="flex items-center gap-2 text-white">
                          <CalendarIcon className="w-4 h-4 text-indiaGreen-500" />
                          <span className="text-xs font-bold">{checkOut ? new Date(checkOut).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : 'Departure'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="md:w-1/2 p-6 flex flex-col overflow-y-auto custom-scrollbar">
                  <div className="mb-6">
                    <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-tight">Stay Details</h2>
                    <p className="text-[8px] text-indiaGreen-500 uppercase font-black tracking-[0.3em]">Configure Preferences</p>
                  </div>
                  
                  <form onSubmit={handleConfirmBooking} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[9px] font-black uppercase text-gray-500 mb-2 block tracking-widest">Guests</label>
                        <select className="w-full bg-royal-950 p-2 rounded-sm border border-royal-800 text-white outline-none focus:border-saffron-500 text-[10px] font-bold" value={guests} onChange={e => setGuests(parseInt(e.target.value))}>
                          {[1, 2, 3, 4].map(num => (<option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[9px] font-black uppercase text-gray-500 mb-2 block tracking-widest">Bed Type</label>
                        <select className="w-full bg-royal-950 p-2 rounded-sm border border-royal-800 text-white outline-none focus:border-saffron-500 text-[10px] font-bold" value={bedType} onChange={e => setBedType(e.target.value as any)}>
                          <option value="Single">Single</option>
                          <option value="Double">Double (+₹500)</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-royal-800">
                      <label className="text-[9px] font-black uppercase text-gray-500 mb-3 block tracking-widest">Payment Gateway</label>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <button type="button" onClick={() => setPaymentMethod('OnlinePayment')} className={`flex flex-col items-center justify-center p-2 border rounded-sm transition-all ${paymentMethod === 'OnlinePayment' ? 'border-saffron-500 bg-saffron-500/10 text-saffron-500 shadow-md' : 'border-royal-800 text-gray-500 hover:border-saffron-500/30'}`}>
                          <Globe className="w-4 h-4 mb-1" /><span className="text-[7px] font-black uppercase text-center">NetBank</span>
                        </button>
                        <button type="button" onClick={() => setPaymentMethod('UPI')} className={`flex flex-col items-center justify-center p-2 border rounded-sm transition-all ${paymentMethod === 'UPI' ? 'border-white bg-white/10 text-white shadow-md' : 'border-royal-800 text-gray-500 hover:border-white/30'}`}>
                          <CreditCard className="w-4 h-4 mb-1" /><span className="text-[7px] font-black uppercase text-center">UPI</span>
                        </button>
                        <button type="button" onClick={() => setPaymentMethod('BankTransfer')} className={`flex flex-col items-center justify-center p-2 border rounded-sm transition-all ${paymentMethod === 'BankTransfer' ? 'border-indiaGreen-500 bg-indiaGreen-500/10 text-indiaGreen-500 shadow-md' : 'border-royal-800 text-gray-500 hover:border-indiaGreen-500/30'}`}>
                          <BankIcon className="w-4 h-4 mb-1" /><span className="text-[7px] font-black uppercase text-center">Transfer</span>
                        </button>
                      </div>
                      
                      <div className="min-h-[50px]">
                        <AnimatePresence mode="wait">
                          {paymentMethod === 'OnlinePayment' && (
                            <motion.div key="online" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}>
                               <input type="tel" required className="w-full px-3 py-2 bg-royal-950 rounded-sm border border-royal-800 text-white outline-none focus:border-saffron-500 text-[10px] font-bold" placeholder="Mobile No." value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
                            </motion.div>
                          )}
                          {paymentMethod === 'UPI' && (
                            <motion.div key="upi" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}>
                               <input type="text" required className={`w-full px-3 py-2 bg-royal-950 rounded-sm border ${upiError ? 'border-red-500' : 'border-royal-800'} text-white outline-none focus:border-white text-[10px] font-bold`} placeholder="yourname@bank" value={upiIdInput} onChange={e => {setUpiIdInput(e.target.value); setUpiError('');}} />
                               {upiError && <p className="text-[8px] text-red-500 mt-1 font-bold">{upiError}</p>}
                            </motion.div>
                          )}
                          {paymentMethod === 'BankTransfer' && (
                            <motion.div key="bank" initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 5 }}>
                               <input type="text" required className="w-full px-3 py-2 bg-royal-950 rounded-sm border border-royal-800 text-white outline-none focus:border-indiaGreen-500 text-[10px] font-bold" placeholder="Bank Name" value={bankName} onChange={e => setBankName(e.target.value)} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="p-4 bg-royal-950 border-l-4 border-saffron-500 shadow-xl rounded-sm">
                        <div className="flex justify-between items-center text-white">
                          <span className="text-[8px] font-black uppercase tracking-widest opacity-60">Total</span>
                          <span className="text-xl font-serif font-bold">{formatINR(calculateTotal())}</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button type="submit" className="flex-1 h-12 text-xs" disabled={!checkIn || !checkOut}>Confirm Booking</Button>
                      <Button type="button" variant="outline" className="h-12 px-5 text-xs" onClick={() => { setCheckIn(''); setCheckOut(''); }}>Clear</Button>
                    </div>
                  </form>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {bookingSuccess && (
          <div key="success-modal" className="fixed inset-0 z-[200] flex flex-col items-center justify-start p-4 bg-chakra-900/98 backdrop-blur-3xl overflow-y-auto custom-scrollbar">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="max-w-4xl w-full py-12 text-center">
              <Sparkles className="w-12 h-12 text-saffron-500 mx-auto mb-6 animate-pulse" />
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 uppercase tracking-tighter">Stay Secured</h2>
              <p className="text-saffron-400 font-serif italic text-xl mb-10 opacity-90">"Your royal sanctuary is confirmed."</p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                 <Button variant="primary" size="md" onClick={handleDownloadPDF} className="h-12"><Download className="w-4 h-4 mr-2" /> PDF Ticket</Button>
                 <Button variant="outline" size="md" onClick={handleDownloadPNG} className="h-12 border-white/20 text-white"><ImageIcon className="w-4 h-4 mr-2" /> PNG Receipt</Button>
                 <Button variant="ghost" size="md" className="text-white/60 hover:text-white h-12" onClick={() => navigate('/my-bookings')}><ScrollText className="w-4 h-4 mr-2" /> History</Button>
              </div>

              <div className="bg-white rounded-sm shadow-2xl overflow-hidden border border-white/10 mx-auto max-w-[794px] mb-8">
                 <BookingTicketTemplate booking={bookingSuccess} userName={user?.name || 'Guest'} base64Image={base64SuccessImage} isWebPreview={true} />
              </div>
              <Button variant="ghost" className="text-white/40 hover:text-white group" onClick={() => setBookingSuccess(null)}>
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Another Stay
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div id="pdf-capture-root" />
    </div>
  );
};

export default Rooms;
