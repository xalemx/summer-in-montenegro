import CTAButton from '../components/CTAButton';

const DAYS = [
  { day: 1, title: 'Arrival & South Montenegro', text: 'Arrival at Podgorica Airport. Meet your host and group. Begin with a South Montenegro experience depending on arrival time, such as coastal views, Lake Skadar, Budva/Kotor area or a scenic welcome dinner.' },
  { day: 2, title: 'Scenic Transfer to the North', text: 'Travel towards Plav and Gusinje with scenic stops. Settle into mountain accommodation and enjoy a traditional dinner.' },
  { day: 3, title: 'Prokletije National Park', text: 'Guided nature experience in Prokletije. Hiking, viewpoints, mountain air and photography stops.' },
  { day: 4, title: 'Plav Lake & Relaxation', text: 'Lake day with swimming, kayaking or slow scenic relaxation. Coffee by the water and local food.' },
  { day: 5, title: 'Adventure Day', text: 'Optional activities depending on availability: horse riding, rafting, 4x4 tour, guided hiking or scenic exploration.' },
  { day: 6, title: 'Authentic Montenegro', text: 'Local village atmosphere, traditional food experience, hidden viewpoints and farewell dinner.' },
  { day: 7, title: 'South Montenegro / Departure', text: 'Return towards Podgorica with optional southern stop depending on flight time. Airport drop-off included.' },
];

export default function Experience() {
  return (
    <div className="py-16 md:py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-center mb-4">
          7 Days in Montenegro
        </h1>
        <p className="font-heading text-xl md:text-2xl text-center text-muted-foreground mb-4">{"Coast, Mountains & Hidden Places"}</p>
        <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
          A hosted journey combining Montenegro{"'"}s southern charm with the wild beauty of the north.
        </p>

        <div className="space-y-0">
          {DAYS.map((d, i) => (
            <div key={d.day} className="relative pl-12 pb-12 last:pb-0">
              {i < DAYS.length - 1 && <div className="absolute left-5 top-10 w-px h-full bg-border" />}
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {d.day}
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
                <h3 className="font-heading text-xl font-semibold mb-2">Day {d.day} — {d.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{d.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <CTAButton to="/dates">Check Departure Dates</CTAButton>
        </div>
      </div>
    </div>
  );
}