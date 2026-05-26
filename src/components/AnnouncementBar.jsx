import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <Link
      to="/summer-2027"
      className="block bg-primary text-primary-foreground text-center py-2.5 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      <span className="inline-flex items-center gap-2">
        🔥 Limited spots remaining — only 8 guests per departure · Summer 2026 now booking · fly from London
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}