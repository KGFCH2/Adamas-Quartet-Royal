$files = @(
    "package.json",
    "tsconfig.json",
    "vite.config.ts",
    "README.md",
    "LICENSE",
    "INSTRUCTIONS.md",
    "metadata.json",
    "types.ts",
    "index.html",
    "index.tsx",
    "App.tsx",
    "components/BookingTicketTemplate.tsx",
    "components/CustomCursor.tsx",
    "components/Footer.tsx",
    "components/Navbar.tsx",
    "components/WelcomeLoader.tsx",
    "components/ui/BookingLoader.tsx",
    "components/ui/Button.tsx",
    "components/ui/DocumentLoader.tsx",
    "components/ui/HotelLoader.tsx",
    "components/ui/SectionLoader.tsx",
    "context/AuthContext.tsx",
    "context/ThemeContext.tsx",
    "pages/Home.tsx",
    "pages/Legal.tsx",
    "pages/MyBookings.tsx",
    "pages/PrivacyPolicy.tsx",
    "pages/RefundPolicy.tsx",
    "pages/Rooms.tsx",
    "pages/TermsOfService.tsx",
    "public/manifest.json",
    "services/mockBackend.ts"
)

$messages = @{
    "package.json" = "Initialize project dependencies and scripts"
    "tsconfig.json" = "Configure TypeScript compiler options"
    "vite.config.ts" = "Set up Vite build tool configuration"
    "README.md" = "Add project README with overview and setup instructions"
    "LICENSE" = "Include project license file"
    "INSTRUCTIONS.md" = "Provide development and contribution guidelines"
    "metadata.json" = "Add application metadata configuration"
    "types.ts" = "Define shared TypeScript interfaces and types"
    "index.html" = "Create main HTML entry point for the application"
    "index.tsx" = "Set up React application entry point"
    "App.tsx" = "Implement main App component with routing"
    "components/BookingTicketTemplate.tsx" = "Add booking ticket template component"
    "components/CustomCursor.tsx" = "Implement custom cursor component for UI"
    "components/Footer.tsx" = "Create footer component for the website"
    "components/Navbar.tsx" = "Add navigation bar component"
    "components/WelcomeLoader.tsx" = "Implement welcome screen loader component"
    "components/ui/BookingLoader.tsx" = "Add booking loader UI component"
    "components/ui/Button.tsx" = "Create reusable button UI component"
    "components/ui/DocumentLoader.tsx" = "Implement document loader UI component"
    "components/ui/HotelLoader.tsx" = "Add hotel loader UI component"
    "components/ui/SectionLoader.tsx" = "Create section loader UI component"
    "context/AuthContext.tsx" = "Set up authentication context for user management"
    "context/ThemeContext.tsx" = "Implement theme context for dark/light mode"
    "pages/Home.tsx" = "Create home page component"
    "pages/Legal.tsx" = "Add legal information page"
    "pages/MyBookings.tsx" = "Implement my bookings page"
    "pages/PrivacyPolicy.tsx" = "Create privacy policy page"
    "pages/RefundPolicy.tsx" = "Add refund policy page"
    "pages/Rooms.tsx" = "Implement rooms listing page"
    "pages/TermsOfService.tsx" = "Create terms of service page"
    "public/manifest.json" = "Add web app manifest for PWA support"
    "services/mockBackend.ts" = "Implement mock backend service for development"
}

foreach ($file in $files) {
    git add $file
    git commit -m $messages[$file]
}