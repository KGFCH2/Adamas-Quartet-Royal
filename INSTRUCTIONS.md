# 📚 Technical Instructions & System Architecture

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
- 🖱️ `components/CustomCursor.tsx`: Custom cursor component for enhanced UX.
- 🦶 `components/Footer.tsx`: Footer component for the application.
- 🎬 `components/WelcomeLoader.tsx`: Welcome loader with multilingual phrases.
- 🎨 `components/ui/`: A comprehensive library including `BookingLoader`, `Button`, `DocumentLoader`, `HotelLoader`, and `SectionLoader` with tricolor variants.

### 📄 Pages
- 🏠 `pages/Home.tsx`: Cinematic landing page with founders' spotlights and the interactive Leaflet Partner Map.
- 📜 `pages/Legal.tsx`: Legal information page.
- 📋 `pages/MyBookings.tsx`: Compact history registry for voucher retrieval and stay management.
- 🔒 `pages/PrivacyPolicy.tsx`: Privacy policy page.
- 💰 `pages/RefundPolicy.tsx`: Refund policy page.
- 🏨 `pages/Rooms.tsx`: Marketplace featuring "Lengthy Cards" and a screen-optimized 90vh vertical booking modal.
- 📋 `pages/TermsOfService.tsx`: Terms of service page.

### 📋 Additional Files
- 📜 `LICENSE`: MIT License for the Adamas Quartet Royal project
- 📖 `README.md`: Project overview, features, and setup instructions
- 📚 `INSTRUCTIONS.md`: Technical documentation and system architecture
- 📋 `metadata.json`: Project metadata and configuration
- 📱 `public/manifest.json`: PWA manifest for installable app.
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