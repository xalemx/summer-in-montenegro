import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { Toaster as SonnerToaster } from "@/components/ui/sonner"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin" />
  </div>
);

const Experience = lazy(() => import('./pages/Experience'));
const DepartureDates = lazy(() => import('./pages/DepartureDates'));
const Accommodation = lazy(() => import('./pages/Accommodation'));
const Activities = lazy(() => import('./pages/Activities'));
const Summer2027 = lazy(() => import('./pages/Summer2027'));
const PartnerOffers = lazy(() => import('./pages/PartnerOffers'));
const PartnerAccess = lazy(() => import('./pages/PartnerAccess'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Contact = lazy(() => import('./pages/Contact'));
const Book = lazy(() => import('./pages/Book'));
const ProposalBuilder = lazy(() => import('./pages/admin/ProposalBuilder'));
const Calendar = lazy(() => import('./pages/admin/Calendar'));
const ProposalRedirect = lazy(() => import('./pages/ProposalRedirect'));
const TripPortal = lazy(() => import('./pages/TripPortal'));
const Suppliers = lazy(() => import('./pages/admin/Suppliers'));
const SupplierForm = lazy(() => import('./pages/admin/SupplierForm'));
const SupplierDetail = lazy(() => import('./pages/admin/SupplierDetail'));
const MediaLibrary = lazy(() => import('./pages/admin/MediaLibrary'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const Pricing = lazy(() => import('./pages/Pricing'));
const AboutMontenegro = lazy(() => import('./pages/AboutMontenegro'));
const Gallery = lazy(() => import('./pages/Gallery'));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'));
const SupplierPortal = lazy(() => import('./pages/supplier/SupplierPortal'));

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/supplier" element={<SupplierPortal />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/dates" element={<DepartureDates />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/summer-2027" element={<Summer2027 />} />
        <Route path="/partners" element={<PartnerAccess />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book" element={<Book />} />
        <Route element={<ProtectedRoute requireAdmin />}>
          <Route path="/admin/proposal-builder" element={<ProposalBuilder />} />
          <Route path="/admin/calendar" element={<Calendar />} />
          <Route path="/admin/suppliers" element={<Suppliers />} />
          <Route path="/admin/suppliers/new" element={<SupplierForm />} />
          <Route path="/admin/suppliers/:id" element={<SupplierDetail />} />
          <Route path="/admin/suppliers/:id/edit" element={<SupplierForm />} />
          <Route path="/admin/media" element={<MediaLibrary />} />
          <Route path="/admin/analytics" element={<Analytics />} />
        </Route>
        <Route path="/proposal/:id" element={<ProposalRedirect />} />
        <Route path="/trip/:reference_number" element={<TripPortal />} />

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about-montenegro" element={<AboutMontenegro />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
    </Suspense>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <SonnerToaster position="top-center" richColors />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App