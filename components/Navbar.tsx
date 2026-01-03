
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, Trash2, Mail, Camera, ShieldCheck, ScrollText, Calendar, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BookingService } from '../services/mockBackend';
import { Button } from './ui/Button';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';

const Navbar = () => {
  const { 
    user, 
    isAuthenticated, 
    login, 
    register, 
    updateProfile,
    logout, 
    deleteAccount,
    isAuthModalOpen, 
    setAuthModalOpen
  } = useAuth();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [bookingCount, setBookingCount] = useState(0);
  
  // Cropping State
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [zoom, setZoom] = useState(1);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  // Re-fetch stats/data every time profile is opened to ensure freshness
  useEffect(() => {
    const fetchFreshData = async () => {
      if (user && isProfileModalOpen) {
        try {
          const bookings = await BookingService.getUserBookings(user.id);
          setBookingCount(bookings.length);
        } catch (e) {
          console.error("Failed to refresh user stats", e);
        }
      }
    };
    fetchFreshData();
  }, [isProfileModalOpen, user]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);
    try {
      if (authMode === 'login') {
        await login(emailInput);
      } else {
        await register(nameInput, emailInput);
      }
      setEmailInput('');
      setNameInput('');
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileModalOpen(false);
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    setIsProcessing(true);
    try {
      await deleteAccount();
      setShowDeleteConfirm(false);
      setIsProfileModalOpen(false);
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCropImage(reader.result as string);
        setIsCropping(true);
        setZoom(1);
        dragX.set(0);
        dragY.set(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropSave = () => {
    const canvas = canvasRef.current;
    const img = imageRef.current;
    if (canvas && img) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = 400;
        canvas.height = 400;
        const containerSize = 320;
        const cropSize = Math.min(img.naturalWidth, img.naturalHeight) / zoom;
        const centerX = img.naturalWidth / 2 - (dragX.get() * (img.naturalWidth / containerSize));
        const centerY = img.naturalHeight / 2 - (dragY.get() * (img.naturalHeight / containerSize));
        
        ctx.drawImage(
          img, 
          centerX - cropSize / 2, 
          centerY - cropSize / 2, 
          cropSize, 
          cropSize, 
          0, 0, 400, 400
        );
        
        const croppedBase64 = canvas.toDataURL('image/jpeg', 0.85);
        updateProfile({ profileImageUrl: croppedBase64 });
        setIsCropping(false);
        setCropImage(null);
      }
    }
  };

  return (
    <>
      <nav className="fixed w-full z-50 bg-royal-950/95 backdrop-blur-sm border-b border-royal-800 shadow-sm transition-all duration-300">
        <div className="h-1 w-full bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex flex-col group relative">
              <span className="font-serif text-xl font-bold text-white tracking-tight transition-colors">
                ADAMAS QUARTET <span className="text-saffron-500">ROYAL</span>
              </span>
              <span className="text-[0.55rem] uppercase tracking-widest text-chakra-100 group-hover:text-indiaGreen-500 transition-colors -mt-1 font-bold opacity-70">Luxury Stays • 2026</span>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <NavLink to="/" label="Home" />
              <NavLink to="/rooms" label="Rooms" />
              {isAuthenticated && (
                <NavLink to="/my-bookings" label="My Bookings" />
              )}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div 
                  className="flex items-center gap-3 cursor-pointer group hover:bg-white/5 p-1.5 rounded-full transition-all border border-transparent hover:border-saffron-500/20"
                  onClick={() => setIsProfileModalOpen(true)}
                >
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-[9px] font-black text-saffron-500 uppercase tracking-widest leading-none">Resident Member</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200">{user?.name}</span>
                  </div>
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-saffron-500 group-hover:border-indiaGreen-500 transition-colors bg-chakra-900 flex items-center justify-center">
                    {user?.profileImageUrl ? (
                      <img src={user.profileImageUrl} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserIcon className="w-5 h-5 text-white" />
                    )}
                  </div>
                </div>
              ) : (
                <Button variant="primary" size="sm" onClick={() => setAuthModalOpen(true)}>
                  <UserIcon className="w-4 h-4 mr-2" /> Login
                </Button>
              )}
            </div>

            <div className="md:hidden flex items-center gap-4">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-royal-950 border-t border-royal-800 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-200 hover:bg-royal-900 rounded-md font-serif">Home</Link>
                <Link to="/rooms" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-200 hover:bg-royal-900 rounded-md font-serif">Rooms</Link>
                {isAuthenticated && (
                  <Link to="/my-bookings" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-200 hover:bg-royal-900 rounded-md font-serif">My Bookings</Link>
                )}
                <div className="pt-4 border-t border-royal-800">
                  {isAuthenticated ? (
                    <Button variant="outline" className="w-full justify-center" onClick={() => setIsProfileModalOpen(true)}>
                      <UserIcon className="w-4 h-4 mr-2" /> My Profile
                    </Button>
                  ) : (
                    <Button variant="primary" className="w-full justify-center" onClick={() => { setAuthModalOpen(true); setIsMenuOpen(false); }}>
                      Sign In
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Profile Picture Editor */}
      <AnimatePresence>
        {isCropping && cropImage && (
          <div key="crop-modal" className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-royal-900 max-w-lg w-full rounded-sm shadow-2xl overflow-hidden relative border border-white/10">
              <div className="p-10">
                <h3 className="text-2xl font-serif font-bold text-white mb-2 uppercase tracking-tight">Edit Profile Picture</h3>
                <p className="text-[10px] text-saffron-500 font-bold uppercase tracking-[0.2em] mb-8">Adjust your photo for your profile</p>
                <div className="aspect-square w-full max-w-[320px] mx-auto overflow-hidden rounded-full border-4 border-saffron-500/30 relative bg-black">
                  <motion.div drag style={{ x: dragX, y: dragY, scale: zoom }} className="w-full h-full cursor-move flex items-center justify-center">
                    <img ref={imageRef} src={cropImage} className="max-w-none w-full h-auto pointer-events-none" alt="To Crop" />
                  </motion.div>
                </div>
                <div className="mt-10 space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">
                      <span>Zoom</span>
                      <span>{zoom.toFixed(1)}x</span>
                    </div>
                    <input type="range" min="1" max="5" step="0.1" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} className="w-full h-1.5 bg-royal-800 rounded-full appearance-none accent-saffron-500 cursor-pointer" />
                  </div>
                  <div className="flex gap-4">
                    <Button variant="primary" className="flex-1 h-14" onClick={handleCropSave}><Check className="w-4 h-4 mr-2" /> Save Changes</Button>
                    <Button variant="ghost" className="h-14 px-6 text-gray-400" onClick={() => setIsCropping(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Profile Modal window - Centered Fixed Overlay */}
      <AnimatePresence>
        {isProfileModalOpen && user && (
          <div key="profile-modal" className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
            <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="bg-royal-900 max-w-lg w-full rounded-sm overflow-hidden relative shadow-4xl border border-white/10">
               <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500"></div>
               <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-all hover:rotate-90 z-20"><X className="w-6 h-6" /></button>
               <div className="p-12 text-center">
                  <div className="relative inline-block mb-10 group/avatar">
                    <div className="w-32 h-32 rounded-full border-4 border-saffron-500 overflow-hidden bg-chakra-900 shadow-2xl relative">
                      {user.profileImageUrl ? (
                        <img src={user.profileImageUrl} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-16 h-16 text-white m-auto mt-7" />
                      )}
                    </div>
                    <label className="absolute inset-0 bg-chakra-900/60 flex flex-col items-center justify-center rounded-full opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer text-white">
                      <Camera className="w-8 h-8 mb-1" />
                      <span className="text-[8px] font-black uppercase tracking-widest">Update Portal Photo</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  </div>
                  <h3 className="text-4xl font-serif font-bold text-white mb-2 uppercase tracking-tight">{user.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-10 text-gray-400">
                    <Mail className="w-4 h-4 text-saffron-500" />
                    <span className="text-xs font-bold tracking-widest uppercase">{user.email}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mb-12">
                    <div className="p-6 bg-royal-950 rounded-sm border border-royal-800 border-l-4 border-l-saffron-500 text-left">
                      <span className="flex items-center gap-2 text-[9px] text-gray-400 uppercase font-black tracking-widest mb-2"><ScrollText className="w-3.5 h-3.5" /> Booked Stays</span>
                      <span className="text-2xl font-bold text-white">{bookingCount} <span className="text-xs font-normal text-gray-400">Records</span></span>
                    </div>
                    <div className="p-6 bg-royal-950 rounded-sm border border-royal-800 border-l-4 border-l-indiaGreen-500 text-left">
                      <span className="flex items-center gap-2 text-[9px] text-gray-400 uppercase font-black tracking-widest mb-2"><Calendar className="w-3.5 h-3.5" /> Residency Year</span>
                      <span className="text-2xl font-bold text-white">2026</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                     <Button variant="primary" className="h-14 w-full" onClick={() => { setIsProfileModalOpen(false); navigate('/my-bookings'); }}>View Full Booking History</Button>
                     <div className="flex gap-4">
                        <Button variant="outline" className="flex-1 h-12" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Logout</Button>
                        <Button variant="ghost" className="flex-1 h-12 text-red-500 hover:bg-red-500/10" onClick={() => setShowDeleteConfirm(true)}><Trash2 className="w-4 h-4 mr-2" /> End Residency</Button>
                     </div>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
             <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-royal-900 max-w-md w-full p-10 text-center rounded-sm relative overflow-hidden border border-white/10 shadow-4xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500 absolute top-0 left-0"></div>
                <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-8" />
                <h3 className="text-3xl font-serif font-bold text-white mb-6 uppercase tracking-tight">Delete Account?</h3>
                <p className="text-gray-400 font-serif italic mb-10 leading-relaxed text-sm">Are you sure you want to end your residency? This will permanently erase your profile and all imperial booking history.</p>
                <div className="flex flex-col gap-4">
                   <Button variant="danger" className="w-full h-14" onClick={handleDeleteAccount} isLoading={isProcessing}>Confirm Deletion</Button>
                   <Button variant="ghost" className="w-full h-14" onClick={() => setShowDeleteConfirm(false)} disabled={isProcessing}>Cancel, Stay Member</Button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAuthModalOpen && (
          <div key="auth-modal" className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} className="bg-royal-900 rounded-lg shadow-2xl max-w-md w-full overflow-hidden relative border border-white/10">
               <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500"></div>
               <div className="p-10 relative z-10">
                  <div className="flex justify-between items-start mb-8 text-center sm:text-left flex-col sm:flex-row gap-4">
                    <div>
                      <h2 className="text-3xl font-serif font-bold text-white mb-2 uppercase tracking-tight">Portal Entry</h2>
                      <p className="text-[0.6rem] text-saffron-500 font-bold uppercase tracking-[0.4em]">Establish your imperial connection</p>
                    </div>
                    <button onClick={() => setAuthModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
                  </div>
                  <div className="flex border-b border-royal-800 mb-8">
                    <button onClick={() => setAuthMode('login')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${authMode === 'login' ? 'text-saffron-500 border-b-2 border-saffron-500' : 'text-gray-400'}`}>Sign In</button>
                    <button onClick={() => setAuthMode('signup')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${authMode === 'signup' ? 'text-indiaGreen-500 border-b-2 border-indiaGreen-500' : 'text-gray-400'}`}>New Member</button>
                  </div>
                  {error && <div className="mb-6 p-4 bg-red-900/10 border-l-4 border-red-500 text-red-400 text-xs font-bold">{error}</div>}
                  <form onSubmit={handleAuth} className="space-y-6">
                    {authMode === 'signup' && (
                      <div className="space-y-2">
                        <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                        <input type="text" required className="w-full px-4 py-3 border border-royal-800 bg-royal-950 text-white rounded-sm focus:ring-1 focus:ring-saffron-500 outline-none" placeholder="Maharaja Vikram" value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
                      </div>
                    )}
                    <div className="space-y-2">
                      <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                      <input type="email" required className="w-full px-4 py-3 border border-royal-800 bg-royal-950 text-white rounded-sm focus:ring-1 focus:ring-saffron-500 outline-none" placeholder="resident@adamas.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} />
                    </div>
                    <Button type="submit" variant={authMode === 'login' ? 'primary' : 'secondary'} className="w-full h-14" isLoading={isProcessing}>{authMode === 'login' ? 'Enter Sanctuary' : 'Join Council'}</Button>
                  </form>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

const NavLink = ({ to, label }: { to: string, label: string }) => (
  <Link to={to} className="relative py-2 px-1 text-xs font-bold uppercase tracking-widest text-gray-300 tricolor-hover">{label}</Link>
);

export default Navbar;
