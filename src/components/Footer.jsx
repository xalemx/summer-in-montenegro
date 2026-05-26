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
              <a href="https://www.instagram.com/summerinmontenegro_com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">Instagram</a>
              <a href="https://www.tiktok.com/@summerinmontenegro.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">TikTok</a>
              <a href="https://wa.me/447758162004" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">WhatsApp</a>
            </div>
          <a href="mailto:summerinmontenegro.com@gmail.com" className="block mt-3 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">summerinmontenegro.com@gmail.com</a>
          <a
            href="https://wa.me/447758162004?text=Hi%20%E2%80%94%20I%27d%20love%20to%20know%20more%20about%20Summer%20in%20Montenegro!"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-[#25D366] text-white font-semibold text-sm rounded-full hover:brightness-110 transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.543 4.071 1.49 5.787L0 24l6.385-1.673A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.733.979 1.003-3.627-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
            Chat on WhatsApp
          </a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40">
          © 2026 Summer in Montenegro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}