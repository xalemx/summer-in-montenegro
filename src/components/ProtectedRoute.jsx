import { useEffect } from 'react';
import { useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const DefaultFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

const Forbidden = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center gap-2">
    <p className="font-heading text-2xl font-bold">Access denied</p>
    <p className="text-muted-foreground text-sm">You need admin privileges to view this page.</p>
  </div>
);

export default function ProtectedRoute({ children, fallback = <DefaultFallback />, unauthenticatedElement, requireAdmin = false }) {
  const { user, isAuthenticated, isLoadingAuth, authChecked, authError, checkUserAuth } = useAuth();

  useEffect(() => {
    if (!authChecked && !isLoadingAuth) {
      checkUserAuth();
    }
  }, [authChecked, isLoadingAuth, checkUserAuth]);

  if (isLoadingAuth || !authChecked) {
    return fallback;
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    }
    return unauthenticatedElement;
  }

  if (!isAuthenticated) {
    return unauthenticatedElement;
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Forbidden />;
  }

  return children;
}