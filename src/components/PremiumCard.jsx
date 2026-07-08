export function PremiumCard({ children, className = '' }) {
  return (
    <div className={`rounded-3xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}