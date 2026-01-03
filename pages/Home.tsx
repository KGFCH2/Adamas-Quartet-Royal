
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Coffee, Heart, GraduationCap, Sparkles, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import L from 'leaflet';

const PARTNER_LOCATIONS = [
  { city: 'Kolkata (Main)', coords: [22.5726, 88.3639], name: 'Adamas Budget Hub' },
  { city: 'Udaipur', coords: [24.5854, 73.7125], name: 'Lake Palace Sanctuary' },
  { city: 'Mumbai', coords: [19.0760, 72.8777], name: 'Sovereign Gateway Mumbai' },
  { city: 'New Delhi', coords: [28.6139, 77.2090], name: 'Imperial Council Suites' },
  { city: 'Varanasi', coords: [25.3176, 82.9739], name: 'Ganges Heritage Pavilion' },
  { city: 'Jaipur', coords: [26.9124, 75.7873], name: 'The Amber Palace' },
  { city: 'Munnar', coords: [10.0889, 77.0595], name: 'Mystic Kerala Retreat' },
  { city: 'Shimla', coords: [31.1048, 77.1734], name: 'Himalayan Crown' },
  { city: 'Jaisalmer', coords: [26.9157, 70.9160], name: 'Desert Rose Pavilion' },
  { city: 'Rishikesh', coords: [30.0869, 78.2676], name: 'Ganges Breeze Retreat' },
];

const Home = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current, {
        center: [20.5937, 78.9629],
        zoom: 5,
        scrollWheelZoom: false,
        attributionControl: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(leafletMap.current);

      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="w-4 h-4 bg-saffron-500 rounded-full border-2 border-white shadow-[0_0_10px_rgba(255,153,51,0.8)] animate-pulse"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      PARTNER_LOCATIONS.forEach(loc => {
        L.marker(loc.coords as L.LatLngExpression, { icon: customIcon })
          .addTo(leafletMap.current!)
          .bindPopup(`
            <div class="p-2 text-chakra-900">
              <strong class="text-sm font-serif">${loc.name}</strong><br/>
              <span class="text-xs uppercase tracking-widest text-gray-500">${loc.city}</span>
            </div>
          `);
      });
    }

    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, []);

  return (
    <div className="flex flex-col bg-royal-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative h-[95vh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop" 
            alt="Adamas Quartet Royal Architecture" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-chakra-900/60 to-royal-950"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="flex flex-col items-center mb-10">
              <span className="text-[0.7rem] font-bold tracking-[0.6em] text-saffron-400 uppercase mb-4">
                স্বাগতম • Welcome
              </span>
              <div className="h-[2.5px] w-40 bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500"></div>
            </div>

            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-6 leading-[0.85] drop-shadow-2xl">
              The <span className="adamas-gradient">Adamas</span>
              <br/>Quartet Royal
            </h1>
            
            <p className="text-lg md:text-2xl text-gray-100 font-serif italic mb-12 tracking-widest max-w-2xl mx-auto opacity-95 leading-relaxed drop-shadow-md">
              "Experience Sovereign Hospitality"<br/>
              A 2026 Sanctuary by the Adamas Founding Council.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/rooms">
                <Button variant="primary" size="lg" className="shadow-2xl px-14 group">
                  Explore Collections
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-royal-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 text-saffron-500 mb-4 font-black tracking-[0.4em] uppercase text-[10px]">
                <MapPin className="w-4 h-4" />
                Our Sovereign Footprint
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 uppercase tracking-tighter">Imperial Locations</h2>
              <p className="text-gray-400 font-serif italic text-lg max-w-2xl mx-auto">Explore our exclusive partner sanctuaries meticulously positioned across the Indian subcontinent.</p>
           </div>
           
           <div className="h-[500px] w-full border border-royal-800 rounded-sm overflow-hidden relative shadow-2xl">
             <div ref={mapRef} className="absolute inset-0"></div>
             <div className="absolute top-6 left-6 z-[1000] bg-royal-900/90 p-6 border border-royal-800 backdrop-blur-md max-w-xs">
                <h4 className="text-saffron-500 font-black uppercase tracking-widest text-[9px] mb-3">Council Registry</h4>
                <p className="text-xs text-white leading-relaxed font-serif italic">"Each marker represents a sanctuary verified by the Adamas AU4 Council for 2026 Elite Stays."</p>
             </div>
           </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-32 bg-royal-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] opacity-[0.05] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-2/5 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-saffron-500 mb-8 font-bold tracking-[0.5em] uppercase text-xs">
                  <GraduationCap className="w-6 h-6" />
                  AU4 Founding Council
                </div>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-10 leading-tight">
                  Crafting a <br/><span className="italic text-saffron-500">Sovereign</span> Legacy.
                </h2>
                <p className="text-slate-300 text-xl leading-relaxed mb-10 font-serif italic">
                  "The Adamas Quartet Royal is the culmination of the AU4's vision—a synergy of modern architectural brilliance and the ancient grace of Atithi Devo Bhava."
                </p>
                <div className="flex flex-col items-center lg:items-start gap-5 mb-10">
                   <p className="text-saffron-400 font-serif italic text-3xl">
                    "ঐশ্বর্য এবং ঐতিহ্যের মেলবন্ধন"
                   </p>
                   <div className="h-0.5 w-24 bg-indiaGreen-500"></div>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-10">
              <FoundersCard 
                name="Babin Bid" 
                role="Chief Architect" 
                image="https://4kwallpapers.com/images/wallpapers/marvels-spider-man-2880x1800-11990.jpeg"
                description="B.Tech CSE 3rd Year Student • Frontend Developer • Researcher • Programmer • Midnight Debugger"
              />
              <FoundersCard 
                name="Debasmita Bose" 
                role="Cultural Curator" 
                image="https://i.pinimg.com/736x/a8/a8/d4/a8a8d4d9c568c419532bde455c29dc90.jpg"
                description="B.Tech CSE 3rd Year Student • Frontend Developer • Programmer"
              />
              <FoundersCard 
                name="Joita Pal" 
                role="Operations Lead" 
                image="https://i.pinimg.com/736x/57/55/d2/5755d2ef66014913a37b475d06df4707.jpg"
                description="B.Tech CSE 3rd Year Student • Frontend Developer • Programmer"
              />
              <FoundersCard 
                name="Manisha Debnath" 
                role="Standard Guardian" 
                image="https://images.wallpapersden.com/image/download/black-widow-marvel-scarlett-johansson_bGpnaWmUmZqaraWkpJRobWllrWdma2U.jpg"
                description="B.Tech CSE 3rd Year Student • Frontend Developer • Programmer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Imperial Standards Section */}
      <section className="py-32 bg-royal-900 relative border-y border-royal-800">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 uppercase tracking-tight">Imperial Standards</h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-saffron-500 via-white to-indiaGreen-500 mx-auto mb-24 rounded-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
             <FeatureCard icon={<ShieldCheck className="w-10 h-10" />} title="Absolute Security" desc="Fortress-grade protection for your royal sanctuary, handled by the Adamas Elite." />
             <FeatureCard icon={<Heart className="w-10 h-10" />} title="Heartfelt Service" desc="Purest Indian Grace in every interaction, guided by the AU4 principles." />
             <FeatureCard icon={<Coffee className="w-10 h-10" />} title="Indus Flavors" desc="A gastronomic voyage through the rich spices and heritage of the subcontinent." />
          </div>
        </div>
      </section>

      {/* Cultural CTA */}
      <section className="py-24 bg-chakra-900 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/mandala.png')] bg-repeat"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
           <Sparkles className="w-16 h-16 text-saffron-500 mx-auto mb-10 animate-float" />
           <h2 className="text-5xl font-serif mb-8 italic drop-shadow-md">"A Guest is a God—Welcome to the Sovereign Sanctuary."</h2>
           <Link to="/rooms">
             <Button variant="tricolor" size="lg" className="px-16">Enter The Halls</Button>
           </Link>
        </div>
      </section>
    </div>
  );
};

const FoundersCard = ({ name, role, image, description }: { name: string, role: string, image: string, description: string }) => (
  <motion.div whileHover={{ y: -15 }} className="bg-royal-800 rounded-lg shadow-xl relative group overflow-hidden border border-royal-700 paisley-motif-hover cursor-pointer h-[500px]">
    <div className="relative h-full overflow-hidden">
       <img src={image} alt={name} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
       
       <div className="absolute inset-0 bg-chakra-900/0 group-hover:bg-chakra-900/85 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500 z-10 flex items-center justify-center p-8 text-center">
         <div className="opacity-0 group-hover:opacity-100 translate-y-10 group-hover:translate-y-0 transition-all duration-500 delay-100">
           <div className="h-0.5 w-12 bg-saffron-500 mx-auto mb-6"></div>
           <p className="font-serif italic text-lg leading-relaxed drop-shadow-md text-white font-bold">{description}</p>
         </div>
       </div>

       <div className="absolute inset-0 bg-gradient-to-t from-chakra-900/90 via-chakra-900/20 to-transparent z-5"></div>
       
       <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
         <h4 className="font-serif font-bold text-3xl text-white mb-2">{name}</h4>
         <p className="text-[0.7rem] font-bold uppercase tracking-[0.5em] text-saffron-400">{role}</p>
       </div>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex flex-col items-center group cursor-default paisley-motif-hover p-6 rounded-lg transition-all hover:bg-royal-950">
    <div className="w-24 h-24 rounded-full bg-royal-950 flex items-center justify-center mb-10 text-saffron-500 border border-royal-800 group-hover:bg-saffron-500 group-hover:text-white transition-all duration-700 shadow-inner overflow-hidden relative">
      <div className="relative z-10">{icon}</div>
    </div>
    <h3 className="text-3xl font-serif font-bold text-white mb-5 transition-colors tracking-tight">{title}</h3>
    <p className="text-slate-300 text-base leading-relaxed max-w-[300px] transition-colors font-serif italic">{desc}</p>
  </div>
);

export default Home;
