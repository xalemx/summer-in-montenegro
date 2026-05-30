import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Layout from './components/Layout';
import Home from './pages/Home';
import Experience from './pages/Experience';
import DepartureDates from './pages/DepartureDates';
import Accommodation from './pages/Accommodation';
import Activities from './pages/Activities';
import Summer2027 from './pages/Summer2027';
import PartnerOffers from './pages/PartnerOffers';
import PartnerAccess from './pages/PartnerAccess';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Book from './pages/Book';

import Pricing from './pages/Pricing';
import AboutMontenegro from './pages/AboutMontenegro';
import Gallery from './pages/Gallery';
import TermsAndConditions from './pages/TermsAndConditions';

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
    <Routes>
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

        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about-montenegro" element={<AboutMontenegro />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
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
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App