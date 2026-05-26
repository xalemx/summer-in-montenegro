import { Link } from 'react-router-dom';

export default function CTAButton({ to = '/contact', children = 'Reserve Your Spot', variant = 'primary', className = '' }) {
  const styles = variant === 'primary'
    ? 'bg-accent text-accent-foreground hover:brightness-105 shadow-md'
    : 'bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm';

  return (
    <Link
      to={to}
      className={`inline-flex items-center justify-center px-8 py-3.5 font-semibold text-sm rounded-full transition-all ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}