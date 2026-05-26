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
        Summer 2026 now open — only 8 guests per departure · weekly from London · spaces filling fast
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}