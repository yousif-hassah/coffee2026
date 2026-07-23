import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, MessageSquare, Compass } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Location & Contact — Maison Noir Baghdad" },
      { name: "description", content: "Visit Maison Noir on Damascus Street, Al-Mansour, Baghdad, Iraq. Direct map navigation, phone, and reservations." },
      { property: "og:title", content: "Location & Contact — Maison Noir Baghdad" },
      { property: "og:description", content: "Visit us in Al-Mansour, Baghdad or get direct directions on mobile." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  const mapUrl = "https://maps.google.com/?q=Al-Mansour+Baghdad+Iraq";
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.25!2d44.354!3d33.315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0a74193%3A0x9deda9d2a3b16f2c!2sAl-Mansour%2C%20Baghdad%2C%20Iraq!5e0!3m2!1sen!2siq!4v1700000000000!5m2!1sen!2siq";

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <p className="eyebrow text-muted-foreground">Find us in Baghdad</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-tight md:text-6xl">
            Come sit with us.
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
            Located on Damascus Street in Al-Mansour, Baghdad. Reservations aren't required,
            but always welcome. For private events or press, write to us directly.
          </p>

          {/* Quick Mobile Action Bar */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-all hover:opacity-90 shadow-md"
            >
              <Compass className="h-4 w-4" />
              <span>Get Directions on Mobile</span>
            </a>
            <a
              href="tel:+9647801234567"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-all hover:bg-accent"
            >
              <Phone className="h-4 w-4 text-primary" />
              <span>Call Café</span>
            </a>
            <a
              href="https://wa.me/9647801234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-xs uppercase tracking-[0.2em] text-foreground transition-all hover:bg-accent"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Location Details & Map Section */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5 space-y-10">
            <div className="rounded-2xl border border-border bg-card/60 p-8 space-y-8">
              <div>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <MapPin className="h-5 w-5" />
                  <p className="eyebrow text-muted-foreground">Address</p>
                </div>
                <p className="font-display text-2xl leading-snug">
                  Damascus Street, Al-Mansour<br />Baghdad, Iraq
                </p>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-xs uppercase tracking-wider text-primary underline underline-offset-4 hover:opacity-80"
                >
                  Open in Google Maps / Apple Maps →
                </a>
              </div>

              <div className="border-t border-border/60 pt-6">
                <p className="eyebrow text-muted-foreground">Hours</p>
                <p className="mt-3 text-base">Mon – Fri · 7:00 – 23:00</p>
                <p className="text-base">Sat – Sun · 8:00 – 00:00</p>
              </div>

              <div className="border-t border-border/60 pt-6">
                <p className="eyebrow text-muted-foreground">Direct Line & WhatsApp</p>
                <p className="mt-3 text-base">
                  <a href="tel:+9647801234567" className="hover:underline">+964 780 123 4567</a>
                </p>
                <p className="text-base">
                  <a href="mailto:info@maisonnoir.iq" className="hover:underline">info@maisonnoir.iq</a>
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Responsive Map Embed */}
          <div className="lg:col-span-7 flex flex-col h-full min-h-[380px] rounded-2xl overflow-hidden border border-border shadow-lg">
            <div className="bg-secondary/80 px-6 py-3 text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center justify-between">
              <span>Baghdad Location Map</span>
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Full Screen Map ↗
              </a>
            </div>
            <iframe
              title="Maison Noir Location in Baghdad, Iraq"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", flexGrow: 1 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[20%] contrast-[105%]"
            />
          </div>
        </div>
      </section>

      {/* Reservation & Message Form */}
      <section className="mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
        <div className="border border-border bg-card p-8 md:p-12">
          <p className="eyebrow text-muted-foreground">Reservations & Inquiries</p>
          <h2 className="mt-2 font-display text-3xl">Send us a note</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-8 space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="eyebrow text-muted-foreground" htmlFor="name">Name</label>
                <input
                  id="name"
                  required
                  className="mt-2 w-full border-b border-border bg-transparent py-3 text-base outline-none transition-colors focus:border-foreground"
                />
              </div>
              <div>
                <label className="eyebrow text-muted-foreground" htmlFor="email">Email or Phone</label>
                <input
                  id="email"
                  type="text"
                  required
                  className="mt-2 w-full border-b border-border bg-transparent py-3 text-base outline-none transition-colors focus:border-foreground"
                />
              </div>
            </div>
            <div>
              <label className="eyebrow text-muted-foreground" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={4}
                required
                className="mt-2 w-full border-b border-border bg-transparent py-3 text-base outline-none transition-colors focus:border-foreground"
              />
            </div>
            <button
              type="submit"
              className="rounded-none bg-primary px-8 py-4 text-xs uppercase tracking-[0.24em] text-primary-foreground transition-opacity hover:opacity-90"
            >
              {sent ? "Thank you — we'll be in touch" : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
