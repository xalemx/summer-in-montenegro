export default function PrivateRoomBadge({ size = 'md', className = '' }) {
  const styles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <div className={`inline-flex items-center ${styles[size]} bg-primary text-primary-foreground font-semibold rounded-full shadow-md ${className}`}>
      <span className="text-green-300 font-bold">✓</span>
      <span>Private Room Included</span>
    </div>
  );
}