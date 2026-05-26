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
  { label: 'Gallery', to: '/gallery' },
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
          <a
            href="https://wa.me/447758162004?text=Hi%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white font-semibold text-sm rounded-full hover:brightness-110 transition-all shadow-sm"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.543 4.071 1.49 5.787L0 24l6.385-1.673A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.733.979 1.003-3.627-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
            WhatsApp Us
          </a>
          <Link
            to="/book"
            className="hidden sm:inline-flex px-5 py-2.5 bg-accent text-accent-foreground font-semibold text-sm rounded-full hover:brightness-105 transition-all shadow-sm"
          >
            Reserve
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
              to="/book"
              onClick={() => setOpen(false)}
              className="block mt-2 text-center px-5 py-3 bg-accent text-accent-foreground font-semibold rounded-full"
            >
              Reserve Your Spot
            </Link>
            <a
              href="https://wa.me/447758162004?text=Hi%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 mt-2 px-5 py-3 bg-[#25D366] text-white font-semibold rounded-full text-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.543 4.071 1.49 5.787L0 24l6.385-1.673A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.733.979 1.003-3.627-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}