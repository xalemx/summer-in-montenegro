import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <Link
      to="/book"
      className="block bg-primary text-primary-foreground text-center py-3 px-4 text-sm font-semibold hover:bg-primary/90 transition-colors"
    >
      <span className="inline-flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block"></span>
        <span className="hidden sm:inline">Tell us what you want — get a personalised Montenegro offer within 24 hours</span>
        <span className="sm:hidden">Get a personalised Montenegro offer</span>
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}