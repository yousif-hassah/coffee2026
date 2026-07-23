import { createFileRoute } from "@tanstack/react-router";
import { ScrollVideoTrigger } from "@/components/ScrollVideoTrigger";
import { MenuVideoSection } from "@/components/MenuVideoSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Noir — Specialty Coffee in Baghdad" },
      { name: "description", content: "A quiet corner in Al-Mansour, Baghdad devoted to slow, expertly brewed coffee." },
      { property: "og:title", content: "Maison Noir — Specialty Coffee in Baghdad" },
      { property: "og:description", content: "A quiet corner in Al-Mansour, Baghdad devoted to slow, expertly brewed coffee." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero Section with Video Frame Sequence Background (Coffee Bean to Ice Cream) */}
      <ScrollVideoTrigger />

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-muted-foreground">The house · Baghdad</p>
            <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
              Coffee, considered.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-lg leading-relaxed text-foreground/80">
              Every cup begins months before it reaches you — with a farm, a harvest, a slow
              roast. We work directly with a handful of producers we trust, and pour with the
              care those relationships deserve.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Come for an espresso at the bar, or stay for a long morning by the window.
              Either way, you're welcome in Al-Mansour, Baghdad.
            </p>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-px bg-border md:grid-cols-3">
          {[
            { k: "Sourcing", v: "Direct-trade beans from Ethiopia, Colombia and Guatemala." },
            { k: "Roasting", v: "Small-batch roasted weekly in our Baghdad workshop." },
            { k: "Craft", v: "Every drink pulled by a trained barista — no automation." },
          ].map((f) => (
            <div key={f.k} className="bg-background p-10">
              <p className="eyebrow text-muted-foreground">{f.k}</p>
              <p className="mt-5 font-display text-2xl leading-snug">{f.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Menu Section with Video replacing static image */}
      <MenuVideoSection />
    </>
  );
}
