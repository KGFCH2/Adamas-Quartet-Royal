# Technical Instructions & System Architecture

## 📂 File Functionality Registry

### 🏗 Core & Routing
- 🌐 `index.html`: Foundational HTML with Tailwind, Google Fonts, Leaflet CSS, and multi-size favicon (16x16, 32x32, 180x180). Includes the `#pdf-capture-root` for voucher generation.
- ⚛️ `index.tsx`: Main React mounting script.
- 🎯 `App.tsx`: Root controller. Manages the `WelcomeLoader` phase and `HashRouter` navigation. Restores standard system cursor for better accessibility.
- 📝 `types.ts`: Central source of truth for TypeScript interfaces (User, Room, Booking) and Enums.

### 🧠 Context & State Management
- 🔐 `context/AuthContext.tsx`: Handles complex user sessions, registration, and profile sync with `localStorage`.
- 🌙 `context/ThemeContext.tsx`: Forces a "Royal Dark" UI consistency across the entire ecosystem.

### 🛠 Backend Logic
- 💾 `services/mockBackend.ts`: The data core. Manages the 10 synchronized imperial properties, booking validation, and status synchronization (Completed/Confirmed/Cancelled).

### 🖼 Components (The UI System)
- 🧭 `components/Navbar.tsx`: Feature-rich navigation with an integrated Profile Editor and a base64 image-cropping system.
- 🎫 `components/BookingTicketTemplate.tsx`: A pixel-perfect 794px-wide ticket layout for high-fidelity PDF exports.
- 🎨 `components/ui/`: A comprehensive library including `BookingLoader`, `DocumentLoader`, and `Button` with tricolor variants.

### 📄 Pages
- 🏠 `pages/Home.tsx`: Cinematic landing page with founders' spotlights and the interactive Leaflet Partner Map.
- 🏨 `pages/Rooms.tsx`: Marketplace featuring "Lengthy Cards" and a screen-optimized 90vh vertical booking modal.
- 📋 `pages/MyBookings.tsx`: Compact history registry for voucher retrieval and stay management.

### 📋 Additional Files
- 📜 `LICENSE`: MIT License for the Adamas Quartet Royal project
- 📖 `README.md`: Project overview, features, and setup instructions
- 📚 `INSTRUCTIONS.md`: Technical documentation and system architecture
- 📋 `metadata.json`: Project metadata and configuration
- 📋 `tsconfig.json`: TypeScript compiler configuration
- ⚙️ `vite.config.ts`: Vite build configuration with React plugin

---

## 🚀 Development Workflow

### Scripts
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Create optimized production build
npm run preview      # Preview production build locally
```

### Build Output
- Production-ready files are generated in the `dist/` directory
- All assets are optimized and minified
- Source maps are available for debugging

---

## 🤖 AI Ready Prompt (Full Master Reconstruction)

To replicate this entire sovereign platform, use the following prompt:

> "Build a high-end luxury hospitality platform called 'Adamas Quartet Royal' using React 19, Tailwind CSS, and Framer Motion. 
>
> **Brand Identity:** Dark mode only. Palette: Saffron (#FF9933), India Green (#138808), Chakra Blue (#002147), and Royal Black (#01040a). Aesthetics: Modern Sovereign India. Headings in 'Cormorant Garamond'. Body in 'Inter'.
>
> **Key Functional Modules:**
> 1. **Cinematic Entry:** A 'WelcomeLoader' with multilingual phrases (English/Bengali/Hindi) before entering the site.
> 2. **Interactive Map:** Use Leaflet JS with a dark tile layer to show 10 council-verified locations (Kolkata, Udaipur, Mumbai, Delhi, Varanasi, Jaipur, Munnar, Shimla, Jaisalmer, Rishikesh).
> 3. **Vertical Rooms UI:** Lengthy (tall) room cards on the /rooms page. Each must link to a vertically-compact booking modal (max 90vh) that works perfectly on 100% zoom screens.
> 4. **Complex Booking:** Sanctuary calendar for date ranges, guest counts, bed-type surcharges, and a simulated 3-option payment gateway (UPI/NetBank/Transfer).
> 5. **Imperial Artifacts:** Use html-to-image and jsPDF to generate a high-resolution 794px-wide 'Booking Ticket' with branding, taxes, and watermarks.
> 6. **Registry System:** 'My Bookings' page with a compact card layout for easy multi-record viewing.
> 7. **Sovereign Profile:** A Navbar with a User Profile modal that features a base64 image-cropping tool for avatars.
> 8. **UX Polish:** Standard system cursor for accessibility. Simulated backend delays to trigger specialized 'Booking' and 'Document' loaders.
>
> **Persistence:** Use a mock service layer that stores all Users and Bookings in localStorage."

---
