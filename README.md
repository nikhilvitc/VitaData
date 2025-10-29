# VitaData - Integrated Healthcare Platform

<div align="center">

**Healthcare Simplified**

A comprehensive digital healthcare platform connecting patients, doctors, guardians, and pharmacies in a unified ecosystem.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.2.1-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.8-38bdf8.svg)](https://tailwindcss.com/)

</div>

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [Portals & Dashboards](#portals--dashboards)
- [Documentation](#documentation)
- [Contributing](#contributing)

---

## 🎯 About

VitaData is an integrated healthcare platform designed to revolutionize healthcare delivery in India by making quality healthcare accessible, affordable, and efficient. The platform streamlines healthcare delivery through:

- **Smart Appointment Booking** - Seamless scheduling system
- **Digital Health Records** - Comprehensive patient data management
- **Medication Tracking** - Real-time adherence monitoring
- **Instant Medicine Delivery** - Integrated pharmacy services
- **Multi-Stakeholder Platform** - Connecting patients, doctors, guardians, and pharmacies

### Vision

To create a seamless healthcare ecosystem where patients can easily manage their health, doctors can provide better care, and pharmacies can deliver medications efficiently - all on one intelligent platform.

---

## ✨ Features

### 🌟 Core Features

- **Four Specialized Dashboards**
  - Patient Portal - Personal health management
  - Doctor Dashboard - Clinical workflow optimization
  - Guardian Access - Family health monitoring
  - Pharmacy Hub - Prescription and delivery management

- **Health Records Management**
  - Digital health records storage
  - Vitals tracking (BP, blood sugar, temperature)
  - Lab reports management
  - 7-day health trends visualization

- **Appointment System**
  - Online appointment booking
  - Doctor availability calendar
  - Appointment history tracking
  - Quick-book functionality

- **Prescription & Medication**
  - Digital prescription management
  - Medication adherence tracking
  - Automated reminders
  - Refill notifications

- **Pharmacy Integration**
  - Prescription to pharmacy ordering
  - Delivery management
  - Inventory tracking
  - Order status updates

- **Guardian Features**
  - Link multiple patient profiles
  - Real-time health monitoring
  - Medication adherence tracking
  - Notifications and alerts

### 🔐 Security & Privacy

- End-to-end encryption for sensitive data
- Role-based access control
- Secure authentication system
- HIPAA-compliant data handling

---

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **TypeScript 5.4.2** - Type safety
- **Vite 5.2.1** - Build tool and dev server
- **Tailwind CSS 3.4.8** - Utility-first CSS framework
- **Framer Motion 10.12.6** - Animation library
- **Lucide React** - Icon library

### Backend & Database
- **MongoDB 6.20.0** - Primary database (via MongoDB Atlas)
- **Supabase** - Backend-as-a-Service (optional)
- **Firebase** - Authentication and real-time features (optional)

### Development Tools
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting (configure as needed)

---

## 📁 Project Structure

```
vitaapp/
├── assets/                 # Static assets
│   └── logo.jpeg
├── dist/                   # Build output
├── scripts/                # Utility scripts
│   └── seedDatabase.js    # Database seeding script
├── src/
│   ├── assets/            # Source assets
│   ├── components/        # React components
│   │   ├── Hero.tsx
│   │   ├── Problems.tsx
│   │   ├── Solutions.tsx
│   │   ├── Patients.tsx
│   │   ├── USP.tsx
│   │   ├── Market.tsx
│   │   ├── Roadmap.tsx
│   │   ├── Chatbot.tsx
│   │   ├── Contact.tsx
│   │   ├── Footer.tsx
│   │   └── VitaBot.tsx
│   ├── examples/          # Example components
│   ├── lib/               # Utility libraries
│   │   ├── mongoClient.ts    # MongoDB connection
│   │   ├── mongoApi.ts       # MongoDB API functions
│   │   ├── mongoSchemas.ts   # Database schemas
│   │   ├── supabaseClient.ts # Supabase client
│   │   ├── firebaseClient.ts # Firebase client
│   │   ├── dataFetcher.ts    # Data fetching utilities
│   │   ├── mockData.ts       # Mock data fallback
│   │   └── seedData.ts       # Seed data
│   ├── pages/             # Page components
│   │   ├── Admin.tsx
│   │   ├── PatientDashboard.tsx
│   │   ├── PatientLogin.tsx
│   │   ├── DoctorDashboard.tsx
│   │   ├── DoctorLogin.tsx
│   │   ├── GuardianDashboard.tsx
│   │   ├── GuardianLogin.tsx
│   │   ├── PharmacyDashboard.tsx
│   │   ├── PharmacyLogin.tsx
│   │   ├── Login.tsx
│   │   └── DatabaseTest.tsx
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables (create this)
├── index.html             # HTML template
├── package.json          # Dependencies
├── tailwind.config.cjs    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── vercel.json           # Vercel deployment config
├── supabase_schema.sql    # Supabase database schema
└── README.md             # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** or **yarn** package manager
- **MongoDB Atlas** account (for database) or local MongoDB instance
- **Supabase** account (optional, for additional backend features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vitaapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   # MongoDB Configuration
   VITE_MONGODB_URI=your_mongodb_connection_string
   VITE_MONGODB_DB_NAME=vitadata
   
   # Supabase Configuration (optional)
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   
   # Firebase Configuration (optional)
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in terminal)

---

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net` |
| `VITE_MONGODB_DB_NAME` | Database name | `vitadata` |

### Optional Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGciOiJIUzI1NiIs...` |
| `VITE_FIREBASE_API_KEY` | Firebase API key | `AIzaSy...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | `my-project-id` |

**Note:** Never commit your `.env` file or expose sensitive credentials. The `.env` file should be added to `.gitignore`.

---

## 💾 Database Setup

### MongoDB Setup

1. **Create MongoDB Atlas Account**
   - Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a free cluster
   - Get your connection string

2. **Configure Environment Variables**
   - Add your MongoDB connection string to `.env`
   - Set `VITE_MONGODB_DB_NAME=vitadata`

3. **Seed the Database** (Optional)
   ```bash
   npm run seed
   ```
   
   This will populate the database with test data including:
   - User accounts (patients, doctors, guardians, pharmacy, admin)
   - Patient records
   - Appointments
   - Prescriptions
   - Lab reports
   - And more...

4. **Database Collections**
   The following collections are automatically created:
   - `users` - System users
   - `patients` - Patient records
   - `doctors` - Doctor profiles
   - `guardians` - Guardian accounts
   - `pharmacies` - Pharmacy information
   - `appointments` - Appointment records
   - `prescriptions` - Prescription data
   - `orders` - Pharmacy orders
   - `vitals_history` - Patient vitals tracking
   - `lab_reports` - Lab test results
   - `notifications` - System notifications

### Supabase Setup (Optional)

1. **Create Supabase Project**
   - Sign up at [Supabase](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key

2. **Run Database Schema**
   - Copy the SQL from `supabase_schema.sql`
   - Execute in Supabase SQL Editor

3. **Configure Environment Variables**
   - Add Supabase URL and anon key to `.env`

For detailed setup instructions, see:
- [MONGODB_SETUP.md](./MONGODB_SETUP.md)
- [DATABASE_README.md](./DATABASE_README.md)

---

## 📜 Available Scripts

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database

```bash
# Seed database with test data
npm run seed
```

### Production Deployment

The project includes a `vercel.json` configuration for easy deployment on Vercel:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel
```

---

## 🏥 Portals & Dashboards

### 1. Patient Portal
**Route:** `/patient` or `/login/patient`

**Features:**
- Health overview dashboard
- Vitals history tracking
- Appointment booking and management
- Prescription viewing
- Lab reports access
- Medication adherence tracking

**Test Credentials:**
- Email: `john.doe@patient.com`
- Password: `patient123`

### 2. Doctor Dashboard
**Route:** `/doctor` or `/login/doctor`

**Features:**
- Patient management
- Appointment calendar
- Prescription creation
- Patient health records access
- Performance metrics

**Test Credentials:**
- Email: `dr.wilson@hospital.com`
- Password: `doctor123`

### 3. Guardian Portal
**Route:** `/guardian` or `/login/guardian`

**Features:**
- Link multiple patient profiles
- Real-time health monitoring
- Medication adherence tracking
- Notifications and alerts
- Care overview dashboard

**Test Credentials:**
- Email: `mary.johnson@guardian.com`
- Password: `guardian123`

### 4. Pharmacy Hub
**Route:** `/pharmacy` or `/login/pharmacy`

**Features:**
- Order management
- Inventory tracking
- Delivery coordination
- Prescription processing
- Business metrics

**Test Credentials:**
- Email: `pharmacy@citypharmacy.com`
- Password: `pharmacy123`

### 5. Admin Dashboard
**Route:** `/admin`

**Features:**
- System administration
- User management
- Data analytics
- System monitoring

**Test Credentials:**
- Email: `admin@vitadata.com`
- Password: `admin123`

---

## 📚 Documentation

### Additional Documentation Files

- **[MVP_DOCUMENT.md](./MVP_DOCUMENT.md)** - Comprehensive MVP specification
- **[MONGODB_SETUP.md](./MONGODB_SETUP.md)** - MongoDB setup instructions
- **[DATABASE_README.md](./DATABASE_README.md)** - Database information and test accounts
- **[UI_IMPROVEMENTS_SUMMARY.md](./UI_IMPROVEMENTS_SUMMARY.md)** - UI improvements log

### Key Features Documentation

- **Browser-Safe MongoDB**: The application includes browser-safe MongoDB API wrappers that gracefully fall back to mock data when MongoDB is not available in the browser environment.

- **Data Fetching**: Centralized data fetching utilities in `src/lib/dataFetcher.ts` handle MongoDB API calls with automatic fallback to mock data.

- **Mock Data System**: Comprehensive mock data system ensures the application works even without database connectivity.

---

## 🎨 Design & UI

The application features:

- **Modern Gradient Backgrounds** - Beautiful, light gradients for each portal
- **Responsive Design** - Mobile-first approach
- **Accessible UI** - ARIA labels and keyboard navigation
- **Smooth Animations** - Powered by Framer Motion
- **Clean Typography** - Easy-to-read fonts and spacing

### Color Scheme

- **Patient Portal**: Sky blue to purple gradients
- **Doctor Dashboard**: Purple to indigo gradients
- **Guardian Portal**: Emerald to green gradients
- **Pharmacy Hub**: Orange to amber gradients

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add comments for complex logic
- Write clean, readable code

---

## 🔒 Security Notes

1. **Never commit sensitive data** - Always use environment variables
2. **Use anon keys in client** - Never expose service role keys
3. **Implement proper authentication** - Use secure authentication methods
4. **Validate all inputs** - Sanitize user inputs
5. **Use HTTPS** - Always use secure connections in production

---

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Errors**
- Verify your connection string in `.env`
- Check network firewall settings
- Ensure IP whitelist in MongoDB Atlas

**Build Errors**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

**TypeScript Errors**
- Run `npm run build` to see all type errors
- Check `tsconfig.json` configuration

**Environment Variables Not Loading**
- Ensure `.env` is in root directory
- Restart dev server after changing `.env`
- Variables must start with `VITE_` to be accessible in client code

---

## 📝 License

This project is private and proprietary. All rights reserved.

---

## 👥 Contact & Support

For questions, issues, or support:
- Create an issue in the repository
- Contact the development team

---

## 🗺 Roadmap

See [MVP_DOCUMENT.md](./MVP_DOCUMENT.md) for detailed feature roadmap and upcoming enhancements.

### Upcoming Features

- [ ] Real-time notifications
- [ ] Video consultation integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered health insights
- [ ] Multi-language support
- [ ] Integration with wearable devices

---

<div align="center">

**Built with ❤️ for better healthcare**

*VitaData - Healthcare Simplified*

</div>