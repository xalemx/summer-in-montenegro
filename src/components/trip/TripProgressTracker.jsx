const STAGES = [
  { key: 'received', label: 'Request Received' },
  { key: 'planning', label: 'Planning' },
  { key: 'proposal', label: 'Proposal Sent' },
  { key: 'changes', label: 'Changes Requested' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'completed', label: 'Completed' },
];

const STATUS_INDEX = {
  planning: 1,
  proposal: 2,
  changes_requested: 3,
  accepted: 4,
  confirmed: 5,
  completed: 6,
  closed: 6,
};

export default function TripProgressTracker({ status }) {
  const currentIndex = STATUS_INDEX[status] ?? 1;
  const declined = status === 'declined';

  return (
    <div className="overflow-x-auto pb-2 -mx-1 px-1">
      <div className="flex items-start min-w-[680px]">
        {STAGES.map((s, i) => {
          const done = i < currentIndex;
          const current = i === currentIndex && !declined;
          const Icon = done ? '✓' : i + 1;
          return (
            <div key={s.key} className="flex items-start flex-1 last:flex-none">
              <div className="flex flex-col items-center text-center w-[90px]">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${
                  done ? 'bg-primary border-primary text-primary-foreground' :
                  current ? 'bg-accent border-accent text-accent-foreground ring-4 ring-accent/20' :
                  'bg-card border-border text-muted-foreground'
                }`}>
                  {Icon}
                </div>
                <span className={`text-[10px] mt-1.5 font-medium leading-tight ${
                  current ? 'text-accent-foreground' : done ? 'text-foreground' : 'text-muted-foreground'
                }`}>{s.label}</span>
              </div>
              {i < STAGES.length - 1 && (
                <div className={`h-0.5 flex-1 mt-4 mx-1 rounded-full ${i < currentIndex ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          );
        })}
      </div>
      {declined && (
        <p className="text-xs text-destructive mt-3 font-medium text-center">
          This proposal was declined — let us know if you'd like to revisit your plans.
        </p>
      )}
    </div>
  );
}