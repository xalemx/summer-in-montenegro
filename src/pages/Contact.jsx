import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold mb-3">
          Contact
        </p>

        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-5">
          Ready to plan Montenegro?
        </h1>

        <p className="text-muted-foreground mb-10">
          Send us your travel wishes and we’ll prepare a personalised offer.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          <a
            href="https://wa.me/447758162004"
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 rounded-2xl border bg-card shadow-sm flex flex-col items-center gap-3"
          >
            <MessageCircle className="text-primary" />
            <strong>WhatsApp</strong>
            <span className="text-sm text-muted-foreground">Message us directly</span>
          </a>

          <div className="p-7 rounded-2xl border bg-card shadow-sm flex flex-col items-center gap-3">
            <Mail className="text-primary" />
            <strong>Email</strong>
            <span className="text-sm text-muted-foreground">Use the enquiry form</span>
          </div>
        </div>

        <Link to="/book" className="inline-block px-9 py-4 rounded-full bg-accent text-accent-foreground font-bold">
          Ask for a Personalised Offer
        </Link>
      </div>
    </div>
  );
}