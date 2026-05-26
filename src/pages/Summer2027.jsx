import CTAButton from '../components/CTAButton';

export default function Summer2027() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-4">Early Access</p>
        <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4">Summer 2027</h1>
        <h2 className="font-heading text-xl md:text-2xl text-muted-foreground mb-6">Reserve Your Montenegro Adventure Early</h2>
        <p className="text-muted-foreground mb-14 max-w-xl mx-auto leading-relaxed">
          Summer 2027 departures are now open for early reservations. Experience Montenegro through small-group hosted adventures designed for travellers seeking nature, mountains, authentic hospitality and unforgettable experiences beyond the tourist crowds.
        </p>

        <div className="bg-card rounded-3xl p-8 md:p-10 shadow-sm border border-border max-w-md mx-auto mb-10">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Flexible Payment</p>
          <p className="text-4xl md:text-5xl font-heading font-bold text-primary mb-1">From £100</p>
          <p className="text-muted-foreground text-sm mb-8">per month</p>

          <div className="space-y-4 text-left text-sm mb-8">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Total package</span>
              <span className="font-semibold">£1,199</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Deposit</span>
              <span className="font-semibold">£199</span>
            </div>
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Remaining balance</span>
              <span className="font-semibold">£1,000</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-muted-foreground">Monthly instalments</span>
              <span className="font-semibold">from £100/month</span>
            </div>
          </div>

          <CTAButton className="w-full">Join 2027 Early Access</CTAButton>
        </div>

        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          All bookings must be fully paid before travel confirmation. Flights are not included.
        </p>
      </div>
    </div>
  );
}