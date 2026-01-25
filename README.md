# Ma Bulle Marutea 🌸

A wellness-focused Progressive Web App (PWA) for the Marutea beauty institute. This "pocket sanctuary" extends the physical experience of the institute into a beautiful, mobile-first digital experience.

## ✨ Features

### 🏠 Dashboard (Home)
- **Personalized Greeting**: Dynamic welcome message based on time of day
- **Thought of the Day**: Daily wellness inspiration
- **Loyalty Points Tracker**: Visual progress bar with reward milestones
- **Next Appointment**: Upcoming booking reminder
- **Beauty Profile Summary**: Skin type and concerns at a glance

### 🧘 La Pause Marutea (Media Hub)
- **Content Library**: Audio meditations and video tutorials
- **Smart Filtering**: Filter by Audio/Video content type
- **Categories**: Meditation, Breathing, Tutorials
- **Breathing Exercise**: Interactive breathing guide

### 📔 Mon Journal (User State)
- **Morning Routine Tracker**: AM skincare checklist
- **Evening Routine Tracker**: PM skincare checklist
- **Progress Indicators**: Visual completion percentage
- **Beauty Profile**: Static profile from assessment data

### 💆 Les Soins (Service Catalog)
- **Service Listings**: Complete catalog with descriptions, durations, prices
- **Booking Integration**: Deep-links to booking system (Planity/Treatwell)
- **Flash Opening Alerts**: Notification system for last-minute availability
- **Contact Options**: Quick access to phone and email

## 🎨 Design System

### Color Palette
- **Primary**: Emerald 900 (`#064e3b`) - Text and depth
- **Secondary**: Emerald 50/100 - Backgrounds and containers
- **Accent**: Rose 100/200 - Feminine sacred elements
- **Base**: Sand (`#FCFBF7`) - Main app background

### Typography
- **Headers**: Dancing Script (Google Font) - Cursive/handwritten style
- **Body**: Quicksand (Google Font) - Rounded sans-serif

### Layout Philosophy
- **Border Radius**: 2rem (32px) for "bubble" or "pebble" feel
- **Navigation**: Fixed bottom navigation with central FAB
- **Spacing**: Generous white space for "douceur" (gentleness)

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router v6
- **State Management**: Zustand
- **Backend/Database**: Firebase (Auth, Firestore, Cloud Messaging)
- **PWA**: Vite PWA Plugin + Workbox

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Firebase project (for backend services)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Marutea
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase**
   - Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
   - Enable Authentication, Firestore, and Cloud Messaging
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in your Firebase credentials in `.env`

4. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🚀 Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to your Vercel project settings
   - Add all `VITE_FIREBASE_*` variables from `.env`

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   ```

3. **Set Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add all `VITE_FIREBASE_*` variables

### Option 3: Manual Build

```bash
npm run build
```

The built files will be in the `dist/` directory. Upload these to any static hosting service.

## 📱 PWA Features

- **Offline Support**: Service worker caches assets for offline use
- **Add to Home Screen**: Install prompt for native-like experience
- **Push Notifications**: Appointment reminders and flash openings
- **Fast Loading**: Optimized bundle with code splitting

## 🔧 Development

### Project Structure
```
Marutea/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/         # Design system components
│   │   └── layout/     # Layout components
│   ├── pages/          # Route pages
│   ├── stores/         # Zustand state management
│   ├── lib/            # Firebase and utilities
│   ├── App.tsx         # Root component
│   └── main.tsx        # Entry point
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🔐 Firebase Setup Guide

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Click "Add project"
   - Follow the setup wizard

2. **Enable Services**
   - **Authentication**: Enable Email/Password provider
   - **Firestore**: Create database in production mode
   - **Cloud Messaging**: Enable and generate VAPID key

3. **Get Configuration**
   - Project Settings > General > Your apps
   - Click "Web" icon to create web app
   - Copy the config object values to `.env`

4. **Set Security Rules** (Firestore)
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /appointments/{appointmentId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## 🎯 Future Enhancements

- [ ] Native app wrappers (Capacitor/Expo) for App Store deployment
- [ ] Biometric authentication (Face ID/Touch ID)
- [ ] Advanced media player with playback controls
- [ ] Social sharing for wellness achievements
- [ ] Integration with wearable devices (Apple Health, Google Fit)
- [ ] Multi-language support (French/English)
- [ ] Dark mode theme option

## 📄 License

This project is proprietary software for Marutea Beauty Institute.

## 🤝 Contributing

This is a private project. For questions or contributions, please contact the development team.

---

Made with 💚 for Marutea