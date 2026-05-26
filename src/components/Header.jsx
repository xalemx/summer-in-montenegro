import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'The Experience', to: '/experience' },
  { label: 'Departure Dates', to: '/dates' },
  { label: 'Accommodation', to: '/accommodation' },
  { label: 'Activities', to: '/activities' },
  { label: 'Summer 2027', to: '/summer-2027' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="font-heading text-xl font-semibold text-primary tracking-tight">
          Summer in Montenegro
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === n.to ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:text-primary'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden sm:inline-flex px-5 py-2.5 bg-accent text-accent-foreground font-semibold text-sm rounded-full hover:brightness-105 transition-all shadow-sm"
          >
            Reserve Your Spot
          </Link>
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
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="block mt-2 text-center px-5 py-3 bg-accent text-accent-foreground font-semibold rounded-full"
            >
              Reserve Your Spot
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}