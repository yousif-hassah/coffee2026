import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maison Noir — Specialty Coffee in Baghdad" },
      { name: "description", content: "A quiet corner in Baghdad, Iraq for exceptional coffee, thoughtfully sourced and carefully brewed." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}

function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroIsDark, setHeroIsDark] = useState(true);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // On non-home pages (menu, about, contact), always use dark text
  const isHomePage = pathname === "/";
  const isDark = isHomePage ? heroIsDark : false;

  useEffect(() => {
    if (!isHomePage) return; // Skip scroll detection on non-home pages
    const detectSection = () => {
      const heroSection = document.querySelector("[data-section='hero']") as HTMLElement | null;
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom;
        setHeroIsDark(heroBottom > 0);
      } else {
        const threshold = window.innerHeight * 3.6;
        setHeroIsDark(window.scrollY < threshold);
      }
    };

    window.addEventListener("scroll", detectSection, { passive: true });
    window.addEventListener("resize", detectSection, { passive: true });
    detectSection();
    return () => {
      window.removeEventListener("scroll", detectSection);
      window.removeEventListener("resize", detectSection);
    };
  }, [isHomePage]);

  // isDark = true means navbar is over dark bg → white text
  // isDark = false means navbar is over light bg → dark/black text
  const textColor = isDark ? "text-white" : "text-foreground";
  const subtleColor = isDark ? "text-white/60" : "text-muted-foreground";
  const underlineColor = isDark ? "after:bg-white" : "after:bg-foreground";

  const linkClass = `relative pb-1 text-xs uppercase tracking-[0.24em] transition-colors duration-500 ${
    isDark ? "text-white/80 hover:text-white" : "text-foreground/70 hover:text-foreground"
  } after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:scale-x-0 ${underlineColor} after:transition-transform after:duration-300 hover:after:scale-x-100`;

  const activeClass = `${textColor} after:scale-x-100`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      {/* Full-width bar — no max-width, edge-to-edge with padding only */}
      <div className="flex h-20 w-full items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-baseline gap-2 group">
          <span className={`font-display text-2xl tracking-wide transition-colors duration-500 ${textColor}`}>
            Maison Noir
          </span>
          <span className={`hidden text-[10px] uppercase tracking-[0.3em] transition-colors duration-500 sm:inline ${subtleColor}`}>
            Café · Baghdad
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link to="/" className={linkClass} activeOptions={{ exact: true }} activeProps={{ className: activeClass }}>Home</Link>
          <Link to="/menu" className={linkClass} activeProps={{ className: activeClass }}>Menu</Link>
          <Link to="/about" className={linkClass} activeProps={{ className: activeClass }}>About</Link>
          <Link to="/contact" className={linkClass} activeProps={{ className: activeClass }}>Location & Contact</Link>
        </nav>

        <Link
          to="/contact"
          className={`hidden rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all duration-500 md:inline-block ${
            isDark
              ? "border-white/40 text-white hover:bg-white hover:text-black"
              : "border-foreground/50 text-foreground hover:bg-foreground hover:text-background"
          }`}
        >
          Reserve
        </Link>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`flex h-10 w-10 items-center justify-center rounded-full p-2 transition-colors duration-500 md:hidden ${
            isDark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-foreground/10"
          }`}
          aria-label="Toggle Navigation Menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`px-6 py-6 backdrop-blur-xl md:hidden ${isDark ? "bg-black/80" : "bg-background/90"}`}>
          <nav className="flex flex-col gap-5">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className={`text-sm uppercase tracking-[0.24em] ${textColor}`} activeOptions={{ exact: true }}>Home</Link>
            <Link to="/menu" onClick={() => setMobileMenuOpen(false)} className={`text-sm uppercase tracking-[0.24em] ${subtleColor}`}>Menu</Link>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className={`text-sm uppercase tracking-[0.24em] ${subtleColor}`}>About</Link>
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className={`text-sm uppercase tracking-[0.24em] ${subtleColor}`}>Location & Contact</Link>
            <div className="pt-2 flex flex-col gap-2">
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={`inline-block text-center rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium ${isDark ? "bg-white text-black" : "bg-foreground text-background"}`}
              >
                Reserve Table
              </Link>
              <a
                href="https://maps.google.com/?q=Al-Mansour+Baghdad+Iraq"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center gap-2 rounded-full border border-current px-6 py-2 text-[11px] uppercase tracking-[0.2em] ${subtleColor}`}
              >
                <span>📍 Baghdad Map</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-3 md:px-10">
        <div>
          <p className="font-display text-2xl">Maison Noir</p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Slow coffee, considered space. A quiet sanctuary in Al-Mansour, Baghdad.
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow text-muted-foreground">Visit Us</p>
          <a
            href="https://maps.google.com/?q=Al-Mansour+Baghdad+Iraq"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block font-medium hover:underline hover:text-foreground"
          >
            Damascus Street, Al-Mansour<br />Baghdad, Iraq
          </a>
          <p className="mt-2 text-xs text-muted-foreground">
            <a href="tel:+9647801234567" className="hover:underline">+964 780 123 4567</a>
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow text-muted-foreground">Hours</p>
          <p className="mt-3">Mon – Fri · 7:00 – 23:00</p>
          <p>Sat – Sun · 8:00 – 00:00</p>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs uppercase tracking-[0.2em] text-muted-foreground md:px-10 flex flex-wrap justify-between gap-4">
          <span>© {new Date().getFullYear()} Maison Noir Café · Baghdad, Iraq. All rights reserved.</span>
          <a
            href="https://maps.google.com/?q=Al-Mansour+Baghdad+Iraq"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-1"
          >
            <span>📍 Open in Maps</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
