import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Explore Montenegro', to: '/about-montenegro' },
  { label: 'How It Works', to: '/experience' },
  { label: 'Accommodation Ideas', to: '/accommodation' },
  { label: 'Activities', to: '/activities' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Start Planning', to: '/book' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const { pathname } = useLocation();

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${
      scrolled
        ? 'bg-background/90 backdrop-blur-2xl border-border/60 shadow-md h-16'
        : 'bg-background/85 backdrop-blur-xl border-border/30 h-[72px]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        <Link to="/" className="font-heading text-lg font-medium text-primary tracking-[0.04em] hover:opacity-75 transition-opacity">
          Summer in Montenegro
        </Link>

        <nav className="hidden lg:flex items-center gap-0">
          {NAV.map(n => (
            n.label === 'Start Planning' ? (
              <Link
                key={n.to}
                to={n.to}
                className="ml-3 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-[0.08em] shadow-sm hover:brightness-105 transition"
              >
                {n.label}
              </Link>
            ) : (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3.5 py-2 text-xs font-medium tracking-[0.07em] uppercase transition-colors ${pathname === n.to ? 'text-primary' : 'text-foreground/50 hover:text-foreground'}`}
              >
                {n.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-foreground">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 space-y-1">
            {NAV.map(n => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  pathname === n.to ? 'text-primary bg-primary/5' : 'text-foreground/70'
                }`}
              >
                {n.label}
              </Link>
            ))}

          </div>
        </div>
      )}
    </header>
  );
}