
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, X, ArrowLeft, Trash2, AlertCircle, Clock, Download, ImageIcon, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BookingService } from '../services/mockBackend';
import { Booking, BookingStatus } from '../types';
import { Button } from '../components/ui/Button';
import { BookingTicketTemplate } from '../components/BookingTicketTemplate';
import { SectionLoader } from '../components/ui/SectionLoader';
import { DocumentLoader } from '../components/ui/DocumentLoader';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import ReactDOM from 'react-dom/client';

const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const MyBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [viewingBooking, setViewingBooking] = useState<Booking | null>(null);
  const [base64ViewingImage, setBase64ViewingImage] = useState<string>('');
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);

  const fetchBookings = useCallback(async (showSync = true) => {
    if (user) {
      if (showSync) setIsSyncing(true);
      try {
        const data = await BookingService.syncBookingStatuses(user.id);
        setBookings(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
        if (showSync) setTimeout(() => setIsSyncing(false), 1000);
      } catch (error) {
        setIsSyncing(false);
      } finally {
        setLoading(false);
        setIsNavigating(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      setIsNavigating(false);
      return;
    }
    fetchBookings();
    const interval = setInterval(() => fetchBookings(false), 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated, user, fetchBookings]);

  const handleCancelBooking = async () => {
    if (!cancellingBooking) return;
    setIsSyncing(true);
    try {
      await BookingService.cancelBooking(cancellingBooking.id);
      await fetchBookings();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSyncing(false);
      setCancellingBooking(null);
    }
  };

  const handleViewVoucher = async (booking: Booking) => {
    setViewingBooking(booking);
    try {
      const response = await fetch(booking.roomImage, { mode: 'cors' });
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => setBase64ViewingImage(reader.result as string);
      reader.readAsDataURL(blob);
    } catch (e) { setBase64ViewingImage(booking.roomImage); }
  };

  const captureArtifact = async (booking: Booking, base64: string): Promise<string | null> => {
    const captureRoot = document.getElementById('pdf-capture-root');
    if (!captureRoot || !user) return null;
    setIsDownloading(true);
    captureRoot.style.visibility = 'visible';
    captureRoot.style.opacity = '1';
    captureRoot.style.zIndex = '-9999';
    captureRoot.innerHTML = '';
    const root = ReactDOM.createRoot(captureRoot);
    try {
      root.render(<BookingTicketTemplate booking={booking} userName={user.name} base64Image={base64} isWebPreview={false} />);
      await new Promise(resolve => setTimeout(resolve, 3000));
      const elementToCapture = captureRoot.querySelector('#adamas-receipt-template') as HTMLElement;
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

  const downloadPNG = async (booking: Booking) => {
    let b64 = base64ViewingImage;
    if (!b64) {
      try {
        const response = await fetch(booking.roomImage, { mode: 'cors' });
        const blob = await response.blob();
        b64 = await new Promise((res) => {
          const r = new FileReader();
          r.onloadend = () => res(r.result as string);
          r.readAsDataURL(blob);
        });
      } catch(e) { b64 = booking.roomImage; }
    }
    const dataUrl = await captureArtifact(booking, b64);
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.download = `Voucher-${booking.id}.png`;
    link.href = dataUrl;
    link.click();
  };

  const downloadPDF = async (booking: Booking) => {
    let b64 = base64ViewingImage;
    if (!b64) {
      try {
        const response = await fetch(booking.roomImage, { mode: 'cors' });
        const blob = await response.blob();
        b64 = await new Promise((res) => {
          const r = new FileReader();
          r.onloadend = () => res(r.result as string);
          r.readAsDataURL(blob);
        });
      } catch(e) { b64 = booking.roomImage; }
    }
    const dataUrl = await captureArtifact(booking, b64);
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
      pdf.save(`Voucher-${booking.id}.pdf`);
    };
  };

  const getStatusStyles = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.CONFIRMED: return 'bg-indiaGreen-500/10 text-indiaGreen-500 border-indiaGreen-500/20';
      case BookingStatus.CANCELLED: return 'bg-red-500/10 text-red-500 border-red-500/20';
      case BookingStatus.COMPLETED: return 'bg-saffron-500/10 text-saffron-500 border-saffron-500/20';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isNavigating) return <SectionLoader />;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-royal-950 min-h-screen text-slate-100">
      <DocumentLoader isVisible={isDownloading} />
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-white tracking-tight uppercase">My Registry</h1>
          <p className="text-gray-500 mt-1 font-serif italic text-sm">Imperial stay history.</p>
        </div>
        <div className="bg-royal-900/40 border border-royal-800 px-4 py-2 rounded-sm flex items-center gap-3">
           <Activity className={`w-4 h-4 text-saffron-500 ${isSyncing ? 'animate-pulse' : 'opacity-40'}`} />
           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{isSyncing ? 'Syncing...' : 'Records Active'}</span>
        </div>
      </div>

      <div className="grid gap-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <motion.div key={booking.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
              className={`bg-royal-900/20 backdrop-blur-sm rounded-sm border border-royal-800 flex flex-col sm:flex-row overflow-hidden group h-auto sm:h-44 hover:bg-royal-900/40 transition-colors ${booking.status === BookingStatus.CANCELLED ? 'opacity-50 grayscale' : ''}`}
            >
              <div className="sm:w-56 h-32 sm:h-full shrink-0 overflow-hidden">
                <img src={booking.roomImage} alt={booking.roomName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>

              <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-saffron-500 transition-colors uppercase leading-tight">{booking.roomName}</h3>
                    <p className="text-[10px] text-gray-500 font-black uppercase mt-1">ID: {booking.id}</p>
                  </div>
                  <span className={`px-3 py-1 border rounded-sm text-[8px] font-black uppercase tracking-widest ${getStatusStyles(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-royal-800/50">
                  <div className="flex gap-8">
                    <div>
                      <span className="text-[8px] text-gray-500 uppercase font-black block mb-1">Check-In</span>
                      <span className="text-xs font-bold">{new Date(booking.checkInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-gray-500 uppercase font-black block mb-1">Check-Out</span>
                      <span className="text-xs font-bold">{new Date(booking.checkOutDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-gray-500 uppercase font-black block mb-1">Amount</span>
                      <span className="text-xs font-bold text-saffron-500">{formatINR(booking.totalPrice)}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 px-3 text-[8px] border border-royal-800" onClick={() => handleViewVoucher(booking)}>View</Button>
                    {booking.status === BookingStatus.CONFIRMED && (
                      <Button variant="outline" size="sm" className="h-8 px-3 text-[8px] text-red-500 border-red-500/20" onClick={() => setCancellingBooking(booking)}>Cancel</Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-24 border border-dashed border-royal-800 rounded-sm">
             <p className="text-gray-500 font-serif text-lg italic mb-6">No imperial stays found.</p>
             <Button variant="primary" size="sm" onClick={() => navigate('/rooms')}>Book a Room</Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {viewingBooking && (
          <div className="fixed inset-0 z-[150] flex flex-col items-center justify-start p-4 bg-black/95 backdrop-blur-3xl overflow-y-auto custom-scrollbar">
             <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl w-full py-8">
                <div className="flex justify-between items-center mb-6">
                  <Button variant="ghost" className="text-white" onClick={() => { setViewingBooking(null); setBase64ViewingImage(''); }}><ArrowLeft className="w-4 h-4 mr-2" /> Return</Button>
                  <div className="flex gap-3">
                    <Button variant="primary" size="sm" onClick={() => downloadPDF(viewingBooking)} className="h-10 text-[8px]"><FileText className="w-3.5 h-3.5 mr-2" /> Download PDF</Button>
                    <Button variant="outline" size="sm" onClick={() => downloadPNG(viewingBooking)} className="h-10 text-[8px] border-white/20 text-white"><ImageIcon className="w-3.5 h-3.5 mr-2" /> Save PNG</Button>
                  </div>
                </div>
                <div className="bg-white rounded-sm overflow-hidden shadow-4xl">
                   <BookingTicketTemplate booking={viewingBooking} userName={user?.name || 'Guest'} base64Image={base64ViewingImage} isWebPreview={true} />
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cancellingBooking && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-royal-900 max-w-md w-full p-10 text-center rounded-sm relative overflow-hidden border border-white/10 shadow-4xl">
               <div className="h-1.5 w-full bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500 absolute top-0 left-0"></div>
               <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-8" />
               <h3 className="text-3xl font-serif font-bold text-white mb-6 uppercase tracking-tight">Void Booking?</h3>
               <p className="text-gray-400 font-serif italic mb-8 leading-relaxed text-sm">Are you sure you want to void your stay for <span className="text-white font-bold">{cancellingBooking.roomName}</span>?</p>
               
               <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-sm mb-10 text-left">
                  <div className="flex items-center gap-3 text-red-500 mb-2">
                     <Clock className="w-4 h-4" />
                     <span className="text-[10px] font-black uppercase tracking-widest">Restitution Notice</span>
                  </div>
                  <p className="text-[11px] text-gray-300 leading-relaxed italic">"Refunds are processed within <span className="text-red-400 font-bold">24 working hours</span>. A 50% voidance fee applies if cancelled within 24 hours of check-in."</p>
               </div>

               <div className="flex flex-col gap-4">
                  <Button variant="danger" className="w-full h-14" onClick={handleCancelBooking}>Confirm Voidance</Button>
                  <Button variant="ghost" className="w-full h-14" onClick={() => setCancellingBooking(null)}>Retain Sanctuary</Button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div id="pdf-capture-root" />
    </div>
  );
};

export default MyBookings;
