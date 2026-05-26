import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <Link
      to="/summer-2027"
      className="block bg-primary text-primary-foreground text-center py-2.5 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
    >
      <span className="inline-flex items-center gap-2">
        Summer 2027 early access now open — reserve your Montenegro adventure from £100/month
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}