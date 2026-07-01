import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';


export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">

      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />

      {/* Sticky mobile CTA — hidden on /book (has its own nav) */}
      {useLocation().pathname !== '/book' && (
        <div className="fixed bottom-0 inset-x-0 z-50 md:hidden px-4 pb-4 pt-3 bg-background/95 backdrop-blur-lg border-t border-border shadow-2xl">
          <div className="flex gap-3">
            <Link
              to="/book"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-accent text-accent-foreground font-bold rounded-2xl text-sm shadow-lg"
            >
              Start Planning →
            </Link>
            <a
              href="https://wa.me/447758162004"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 flex items-center justify-center rounded-2xl bg-[#25D366] text-white shadow-lg"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.099.543 4.071 1.49 5.787L0 24l6.385-1.673A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.374l-.36-.213-3.733.979 1.003-3.627-.235-.374A9.818 9.818 0 1112 21.818z"/></svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}