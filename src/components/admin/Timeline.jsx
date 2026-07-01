import { Sparkles, FileText, Plus, Pencil, Trash2, Send, MessageSquare, Check, X, Flag, GitBranch } from 'lucide-react';
import { format } from 'date-fns';

const ICONS = {
  trip_created: Flag,
  summary_created: Sparkles,
  proposal_created: FileText,
  proposal_updated: Pencil,
  proposal_sent: Send,
  version_created: GitBranch,
  item_added: Plus,
  item_updated: Pencil,
  item_removed: Trash2,
  customer_message: MessageSquare,
  change_requested: MessageSquare,
  customer_accepted: Check,
  customer_declined: X,
  note: FileText,
};

const COLORS = {
  summary_created: 'text-violet-600 bg-violet-100',
  trip_created: 'text-blue-600 bg-blue-100',
  proposal_created: 'text-emerald-600 bg-emerald-100',
  proposal_updated: 'text-amber-600 bg-amber-100',
  proposal_sent: 'text-emerald-700 bg-emerald-200',
  version_created: 'text-cyan-600 bg-cyan-100',
  item_added: 'text-sky-600 bg-sky-100',
  item_updated: 'text-amber-600 bg-amber-100',
  item_removed: 'text-rose-600 bg-rose-100',
  customer_message: 'text-slate-600 bg-slate-100',
  change_requested: 'text-orange-600 bg-orange-100',
  customer_accepted: 'text-green-700 bg-green-200',
  customer_declined: 'text-rose-600 bg-rose-100',
};

export default function Timeline({ events }) {
  if (!events || events.length === 0) {
    return <p className="text-sm text-muted-foreground text-center py-4">No activity yet.</p>;
  }
  const sorted = [...events].sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
  return (
    <div className="pl-1">
      {sorted.map((e, idx) => {
        const Icon = ICONS[e.event_type] || FileText;
        const color = COLORS[e.event_type] || 'text-slate-600 bg-slate-100';
        const time = e.created_date ? format(new Date(e.created_date), 'HH:mm') : '';
        const date = e.created_date ? format(new Date(e.created_date), 'd MMM') : '';
        const prevDate = idx > 0 && sorted[idx - 1].created_date ? format(new Date(sorted[idx - 1].created_date), 'd MMM') : '';
        const showDate = date !== prevDate;
        return (
          <div key={e.id} className="relative flex gap-3 pb-4 last:pb-0">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={13} />
              </div>
              {idx < sorted.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              {showDate && <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">{date}</p>}
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-medium leading-tight">{e.message}</span>
                <span className="text-[11px] text-muted-foreground">{time}</span>
              </div>
              {e.actor_name && <p className="text-[11px] text-muted-foreground">by {e.actor_name}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}