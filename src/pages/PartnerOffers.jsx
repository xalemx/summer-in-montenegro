import { ExternalLink } from 'lucide-react';

export default function PartnerOffers() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">Partner With Summer in Montenegro</h1>
        <p className="text-center text-muted-foreground mb-14">Partnerski program za lokalne pružaoce usluga</p>

        <div className="bg-card rounded-2xl p-8 shadow-sm border border-border mb-10">
          <p className="text-foreground leading-relaxed mb-6">
            Tražimo pouzdane partnere za organizaciju turističkih grupa kroz južni i sjeverni dio Crne Gore tokom ljetnje sezone.
          </p>

          <h3 className="font-heading text-lg font-semibold mb-3">Ture uključuju:</h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
            <li>Crnogorsko primorje</li>
            <li>Prokletije</li>
            <li>Plav i Gusinje</li>
            <li>Aktivnosti i autentična lokalna iskustva</li>
          </ul>

          <div className="grid sm:grid-cols-2 gap-4 mb-6 text-sm">
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-muted-foreground">Dolazak gostiju planiran je:</p>
              <p className="font-semibold">utorkom, srijedom, petkom ili nedeljom</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-muted-foreground">Polasci su organizovani:</p>
              <p className="font-semibold">svake nedelje</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-muted-foreground">Grupe su planirane za:</p>
              <p className="font-semibold">4, 8, 12 ili više gostiju</p>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4">
              <p className="text-muted-foreground">Svaka tura traje:</p>
              <p className="font-semibold">7 dana</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="https://forms.cloud.microsoft/r/jXfB0r0bBy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-accent text-accent-foreground font-semibold text-sm rounded-full hover:brightness-105 transition-all shadow-md"
          >
            Pošalji Ponudu <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}