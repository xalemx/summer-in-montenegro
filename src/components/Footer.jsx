import { Link } from 'react-router-dom';

const LINKS = [
  { label: 'Home', to: '/' },
  { label: 'The Experience', to: '/experience' },
  { label: 'Departure Dates', to: '/dates' },
  { label: 'Summer 2027', to: '/summer-2027' },
  { label: 'Partner Offers', to: '/partners' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-heading text-2xl font-semibold mb-3">Summer in Montenegro</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Small-group hosted adventures through Montenegro's coast, mountains, lakes and hidden landscapes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">Navigate</h4>
            <div className="grid grid-cols-2 gap-2">
              {LINKS.map(l => (
                <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors py-1">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-primary-foreground/50">Connect</h4>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Instagram</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">TikTok</a>
              <a href="https://wa.me/447758162004" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">WhatsApp</a>
            </div>
          <a href="mailto:summerinmontenegro.com@gmail.com" className="block mt-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">summerinmontenegro.com@gmail.com</a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40">
          © 2026 Summer in Montenegro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}