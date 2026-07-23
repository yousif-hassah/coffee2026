import { createFileRoute } from "@tanstack/react-router";

import espresso from "@/assets/menu/espresso.jpg";
import macchiato from "@/assets/menu/macchiato.jpg";
import cortado from "@/assets/menu/cortado.jpg";
import flatWhite from "@/assets/menu/flat-white.jpg";
import cappuccino from "@/assets/menu/cappuccino.jpg";
import latte from "@/assets/menu/latte.jpg";
import pourOver from "@/assets/menu/pour-over.jpg";
import chemex from "@/assets/menu/chemex.jpg";
import coldBrew from "@/assets/menu/cold-brew.jpg";
import batchFilter from "@/assets/menu/batch-filter.jpg";
import croissant from "@/assets/menu/croissant.jpg";
import financier from "@/assets/menu/financier.jpg";
import cookie from "@/assets/menu/cookie.jpg";
import toast from "@/assets/menu/toast.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Maison Noir Baghdad" },
      { name: "description", content: "Espresso, filter coffee, and pastries at Maison Noir in Baghdad, Iraq. Prices in Iraqi Dinars (IQD)." },
      { property: "og:title", content: "Menu — Maison Noir Baghdad" },
      { property: "og:description", content: "Espresso, filter, and pastries at Maison Noir, Baghdad. Prices in IQD." },
    ],
  }),
  component: Menu,
});

type Item = { name: string; desc: string; price: string; img: string };

const espressoItems: Item[] = [
  { name: "Espresso", desc: "Our house blend, pulled short and syrupy.", price: "4,000 IQD", img: espresso },
  { name: "Macchiato", desc: "Double espresso, a spoon of foam.", price: "4,500 IQD", img: macchiato },
  { name: "Cortado", desc: "Equal parts espresso and warm milk.", price: "5,000 IQD", img: cortado },
  { name: "Flat White", desc: "Ristretto with silky steamed milk.", price: "5,500 IQD", img: flatWhite },
  { name: "Cappuccino", desc: "Espresso, textured milk, a fine cap of foam.", price: "5,500 IQD", img: cappuccino },
  { name: "Latte", desc: "For long, slow mornings.", price: "6,000 IQD", img: latte },
];

const filterItems: Item[] = [
  { name: "Pour Over", desc: "Rotating single origin, brewed on a V60.", price: "6,000 IQD", img: pourOver },
  { name: "Chemex", desc: "Clean, bright, shared for two.", price: "11,000 IQD", img: chemex },
  { name: "Cold Brew", desc: "Steeped overnight, served on ice.", price: "6,500 IQD", img: coldBrew },
  { name: "Batch Filter", desc: "Fresh every half hour at the bar.", price: "4,500 IQD", img: batchFilter },
];

const pastryItems: Item[] = [
  { name: "Butter Croissant", desc: "Freshly baked each morning.", price: "4,500 IQD", img: croissant },
  { name: "Almond Financier", desc: "Brown butter, toasted almond.", price: "4,000 IQD", img: financier },
  { name: "Dark Chocolate Cookie", desc: "70% Valrhona, sea salt.", price: "4,500 IQD", img: cookie },
  { name: "Sourdough Toast", desc: "Cultured butter, orange marmalade.", price: "6,000 IQD", img: toast },
];

function Card({ item }: { item: Item }) {
  return (
    <article className="group flex flex-col">
      <div className="aspect-square w-full overflow-hidden rounded-sm bg-secondary/60">
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-border pb-3">
        <h3 className="font-display text-xl">{item.name}</h3>
        <span className="font-display text-base tabular-nums text-muted-foreground font-medium">{item.price}</span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
    </article>
  );
}

function Section({ title, items }: { title: string; items: Item[] }) {
  return (
    <section>
      <div className="flex items-baseline justify-between border-b border-border pb-4">
        <h2 className="font-display text-3xl md:text-4xl">{title}</h2>
        <span className="eyebrow text-muted-foreground">IQD (د.ع)</span>
      </div>
      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((i) => (
          <Card key={i.name} item={i} />
        ))}
      </div>
    </section>
  );
}

function Menu() {
  return (
    <>
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="eyebrow text-muted-foreground">The menu · Baghdad</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight md:text-6xl">
            A short card, changed with the seasons.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            Everything is made à la minute at our Al-Mansour bar. Prices listed in Iraqi Dinars (IQD).
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-24 px-6 py-24 md:px-10 md:py-32">
        <Section title="Espresso" items={espressoItems} />
        <Section title="Filter" items={filterItems} />
        <Section title="Pastries" items={pastryItems} />
      </div>
    </>
  );
}
