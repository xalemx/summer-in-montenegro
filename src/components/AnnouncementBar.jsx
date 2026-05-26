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
        This is not a package holiday · Summer in Montenegro 2026 · 8 people, 7 days, one summer you’ll actually remember
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}