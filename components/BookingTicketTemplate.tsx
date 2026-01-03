
import React from 'react';
import { Crown, Landmark, Image as ImageIcon, Verified } from 'lucide-react';
import { Booking } from '../types';

const formatINR = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const WATERMARK_SVG = 'data:image/svg+xml,%3Csvg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M50 0 L61.2 38.8 L100 50 L61.2 61.2 L50 100 L38.8 61.2 L0 50 L38.8 38.8 Z" fill="%23FF9933" fill-opacity="0.03"/%3E%3C/svg%3E';

interface Props {
  booking: Booking;
  userName: string;
  base64Image?: string; 
  isWebPreview?: boolean;
}

export const BookingTicketTemplate = ({ booking, userName, base64Image, isWebPreview = false }: Props) => {
  const total = booking.totalPrice;
  const taxRate = 0.18;
  const serviceRate = 0.05;
  const baseFare = total / (1 + taxRate + serviceRate);
  const taxes = baseFare * taxRate;
  const serviceFee = baseFare * serviceRate;

  const containerStyle: React.CSSProperties = {
    width: isWebPreview ? '100%' : '794px',
    height: isWebPreview ? 'auto' : '1123px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    fontFamily: "'Inter', sans-serif",
    color: '#002147',
    padding: '0',
    boxSizing: 'border-box',
    overflow: 'hidden',
    boxShadow: isWebPreview ? '0 10px 40px rgba(0,0,0,0.1)' : 'none',
  };

  const SignatureItem = ({ name, role }: { name: string, role: string }) => (
    <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ height: '40px', display: 'flex', alignItems: 'flex-end', marginBottom: '4px' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '14px', fontWeight: 'bold', fontStyle: 'italic', margin: 0, color: '#002147' }}>{name}</p>
      </div>
      <div style={{ width: '60px', height: '1px', backgroundColor: '#e5e7eb', marginBottom: '4px' }}></div>
      <p style={{ fontSize: '6px', fontWeight: '900', textTransform: 'uppercase', color: '#9ca3af', letterSpacing: '0.1em', margin: 0 }}>{role}</p>
    </div>
  );

  return (
    <div id="adamas-receipt-template" style={containerStyle}>
      <div style={{ position: 'absolute', inset: '15px', border: '2px solid #002147', pointerEvents: 'none', zIndex: 10 }}></div>
      <div style={{ position: 'absolute', inset: '25px', border: '1px solid #FF9933', pointerEvents: 'none', zIndex: 10 }}></div>
      
      <div style={{ height: '35px', width: '100%', display: 'flex', position: 'relative', zIndex: 20 }}>
        <div style={{ flex: 1, backgroundColor: '#FF9933' }}></div>
        <div style={{ flex: 1, backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Crown style={{ width: '20px', height: '20px', color: '#002147' }} />
        </div>
        <div style={{ flex: 1, backgroundColor: '#138808' }}></div>
      </div>

      <div style={{ padding: isWebPreview ? '30px 25px' : '60px 80px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: '0', opacity: '1', backgroundImage: `url('${WATERMARK_SVG}')`, backgroundSize: '150px', backgroundRepeat: 'repeat', pointerEvents: 'none' }}></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '50px', height: '50px', backgroundColor: '#002147', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
              <Landmark style={{ width: '24px', height: '24px', color: '#FF9933' }} />
            </div>
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: '700', margin: '0', lineHeight: '1', color: '#002147' }}>
                ADAMAS <span style={{ color: '#FF9933' }}>ROYAL</span>
              </h1>
              <p style={{ fontSize: '8px', color: '#6b7280', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.4em', marginTop: '4px' }}>Luxury Stays • 2026</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', border: '1px solid #138808', fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', color: '#138808', letterSpacing: '0.1em', borderRadius: '2px' }}>
              <Verified style={{ width: '10px', height: '10px' }} />
              Verified Stay
            </div>
            <p style={{ fontSize: '16px', fontWeight: '900', margin: '6px 0 0 0', color: '#002147' }}>Ticket #{booking.id}</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '25px', marginBottom: '25px', borderRadius: '2px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '25px' }}>
            <div>
              <p style={{ fontSize: '9px', color: '#9ca3af', fontWeight: '900', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.2em' }}>Guest Name</p>
              <p style={{ fontSize: '20px', fontWeight: '700', margin: '0' }}>{userName}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '9px', color: '#9ca3af', fontWeight: '900', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.2em' }}>Selected Room</p>
              <p style={{ fontSize: '18px', fontWeight: '700', margin: '0' }}>{booking.roomName}</p>
              <p style={{ fontSize: '10px', color: '#FF9933', fontWeight: '700', marginTop: '4px' }}>{booking.bedType} Bed</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
          <div style={{ border: '1px solid #e5e7eb', padding: '15px', borderTop: '3px solid #FF9933', backgroundColor: '#ffffff' }}>
            <p style={{ fontSize: '8px', fontWeight: '900', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>Check-In</p>
            <p style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>{new Date(booking.checkInDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
          <div style={{ border: '1px solid #e5e7eb', padding: '15px', borderTop: '3px solid #138808', backgroundColor: '#ffffff' }}>
            <p style={{ fontSize: '8px', fontWeight: '900', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '4px' }}>Check-Out</p>
            <p style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>{new Date(booking.checkOutDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <div style={{ height: isWebPreview ? '180px' : '220px', width: '100%', position: 'relative', overflow: 'hidden', marginBottom: '25px', borderRadius: '2px', border: '1px solid #e5e7eb' }}>
          {base64Image ? (
            <img src={base64Image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Stay Visual" />
          ) : (
            <div style={{ width: '100%', height: '100%', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              < ImageIcon style={{ width: '32px', height: '32px', color: '#d1d5db' }} />
            </div>
          )}
          <div style={{ position: 'absolute', bottom: '15px', left: '15px', right: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase' }}>Room Visual Confirmed</span>
            <div style={{ padding: '3px 8px', backgroundColor: '#FF9933', color: '#FFFFFF', fontSize: '8px', fontWeight: '900', borderRadius: '1px' }}>{booking.guests} GUESTS</div>
          </div>
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '2px', overflow: 'hidden', marginBottom: '30px' }}>
          <div style={{ padding: '10px 15px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#6b7280' }}>Room Price</span>
            <span style={{ fontSize: '11px', fontWeight: '600' }}>{formatINR(baseFare)}</span>
          </div>
          <div style={{ padding: '10px 15px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#6b7280' }}>Taxes (18%)</span>
            <span style={{ fontSize: '11px', fontWeight: '600' }}>{formatINR(taxes)}</span>
          </div>
          <div style={{ padding: '10px 15px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#6b7280' }}>Service Fee (5%)</span>
            <span style={{ fontSize: '11px', fontWeight: '600' }}>{formatINR(serviceFee)}</span>
          </div>
          <div style={{ padding: '15px', backgroundColor: '#002147', color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
             <div>
               <p style={{ fontSize: '7px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', opacity: 0.7, margin: 0 }}>Total Amount Paid</p>
             </div>
             <span style={{ fontSize: '24px', fontWeight: '700' }}>{formatINR(total)}</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '15px', borderTop: '1px dashed #e5e7eb', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '15px' }}>
            <SignatureItem name="Babin Bid" role="Chief Architect" />
            <SignatureItem name="Debasmita Bose" role="Cultural Curator" />
            <SignatureItem name="Joita Pal" role="Operations Lead" />
            <SignatureItem name="Manisha Debnath" role="Standard Guardian" />
          </div>
          <div style={{ textAlign: 'right', width: '100%' }}>
            <p style={{ fontSize: '8px', color: '#002147', fontWeight: '900', textTransform: 'uppercase', margin: 0 }}>OFFICIAL ADAMAS COUNCIL BOOKING TICKET</p>
          </div>
        </div>
      </div>
    </div>
  );
};
