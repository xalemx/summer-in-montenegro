export default function TermsAndConditions() {
  return (
    <div className="py-16 md:py-24 px-6">
      <div className="max-w-2xl mx-auto">

        <p className="text-primary/70 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Legal</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
          Booking, Cancellation &amp; Refund Policy
        </h1>
        <p className="text-muted-foreground mb-12">Summer in Montenegro</p>

        <div className="space-y-10 text-foreground">

          <section>
            <h2 className="font-heading text-xl font-bold mb-2">1. Booking Confirmation</h2>
            <p className="text-muted-foreground leading-relaxed">
              A booking is confirmed once full payment has been received.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold mb-2">2. Cooling-Off Period</h2>
            <p className="text-muted-foreground leading-relaxed">
              Customers may cancel within 14 days of booking and receive a full refund, provided departure is more than 30 days away.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold mb-2">3. Customer Cancellations</h2>
            <div className="space-y-3 mt-3">
              {[
                { timing: 'More than 60 days before departure', policy: 'Full refund.' },
                { timing: '30–60 days before departure', policy: '50% refund.' },
                { timing: 'Less than 30 days before departure', policy: 'No refund.' },
              ].map((row, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{row.timing}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{row.policy}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Customers may transfer their booking to another person subject to availability and approval.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold mb-2">4. Third-Party Payment Options</h2>
            <p className="text-muted-foreground leading-relaxed">
              Summer in Montenegro does not provide finance or instalment plans directly. Payment options such as Klarna may be available at checkout subject to eligibility and availability. Any payment arrangements through third-party providers are subject to those providers' own terms and conditions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold mb-2">5. Changes by Summer in Montenegro</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to change accommodation, activities or itinerary where necessary due to weather, safety, availability or operational reasons.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold mb-2">6. Trip Cancellation by Summer in Montenegro</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              If we cancel a departure, customers may choose:
            </p>
            <ul className="space-y-2">
              {['A full refund', 'Transfer to another available departure date.'].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span className="text-primary font-bold mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold mb-2">7. Flights and Travel Insurance</h2>
            <p className="text-muted-foreground leading-relaxed">
              Flights are booked separately and are not included in the trip price. Customers are responsible for their own flight arrangements and travel insurance.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-bold mb-2">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For booking enquiries, cancellations or changes, please contact:{' '}
              <a href="mailto:summerinmontenegro.com@gmail.com" className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">
                summerinmontenegro.com@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}