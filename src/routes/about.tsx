import { createFileRoute } from "@tanstack/react-router";
import aboutImg from "@/assets/about.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Maison Noir Baghdad" },
      { name: "description", content: "The story behind Maison Noir: a specialty coffee sanctuary in Al-Mansour, Baghdad, Iraq." },
      { property: "og:title", content: "About — Maison Noir Baghdad" },
      { property: "og:description", content: "The story behind Maison Noir in Baghdad, Iraq." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="eyebrow text-muted-foreground">Our story</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight md:text-6xl">
            A small room, an old ritual.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-12 md:px-10 md:py-32">
        <img
          src={aboutImg}
          alt="Close-up of freshly roasted coffee beans"
          className="aspect-[4/5] w-full rounded-sm object-cover md:col-span-5"
          loading="lazy"
          width={1024}
          height={1024}
        />
        <div className="space-y-6 md:col-span-7">
          <p className="text-lg leading-relaxed text-foreground/80">
            Maison Noir opened in the winter of 2014 in a historic courtyard in Al-Mansour, Baghdad.
            We wanted a place that felt closer to a sanctuary than a typical café — quiet, unhurried, and
            devoted to one thing done exceptionally well.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Our beans come from a handful of specialty farms we collaborate with each year in Ethiopia, Colombia,
            and Guatemala. We roast them in small batches at our Baghdad workshop and pour them at our bar — slowly and by hand.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            The room is warm and considered. So is the menu. Everything we serve, we serve because
            we love it.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-3 md:px-10">
          {[
            { n: "01", t: "Source", d: "Direct trade with high-altitude micro-lot growers." },
            { n: "02", t: "Roast", d: "Small batches, weekly, at our local workshop." },
            { n: "03", t: "Pour", d: "By hand, at the bar, without shortcuts." },
          ].map((s) => (
            <div key={s.n}>
              <p className="font-display text-4xl text-muted-foreground">{s.n}</p>
              <p className="mt-4 font-display text-2xl">{s.t}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
