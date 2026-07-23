import React, { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

const TOTAL_FRAMES = 240;
const FRAME_PATH = (idx: number) => `/frames/frame_${String(idx).padStart(3, "0")}.webp`;

export function ScrollVideoTrigger() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const [scrollProgress, setScrollProgress] = useState(0);

  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // 1. Preload frames
  useEffect(() => {
    let active = true;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        if (!active) return;
        if (i === 0) {
          drawFrame(0);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      active = false;
    };
  }, []);

  // 2. Draw frame onto canvas with cover object-fit
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(frameIndex)))];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const targetWidth = Math.round(rect.width * dpr);
    const targetHeight = Math.round(rect.height * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    const canvasAspect = canvas.width / canvas.height;
    const imgAspect = imgWidth / imgHeight;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > imgAspect) {
      drawHeight = canvas.width / imgAspect;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgAspect;
      offsetX = (canvas.width - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  // 3. Smooth animation loop (lerp) — lower factor = smoother/slower catch-up
  useEffect(() => {
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;

      const diff = target - current;
      if (Math.abs(diff) > 0.01) {
        currentFrameRef.current = current + diff * 0.07;
        drawFrame(currentFrameRef.current);
      } else if (current !== target) {
        currentFrameRef.current = target;
        drawFrame(target);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  // 4. Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollable = container.offsetHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;
      const progress = Math.min(1, Math.max(0, rawProgress));

      setScrollProgress(progress);
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Helper function to calculate smooth opacity & translateY for each stage
  const getStageStyle = (start: number, peakStart: number, peakEnd: number, end: number) => {
    let opacity = 0;
    if (scrollProgress >= start && scrollProgress <= end) {
      if (scrollProgress < peakStart) {
        opacity = (scrollProgress - start) / (peakStart - start);
      } else if (scrollProgress <= peakEnd) {
        opacity = 1;
      } else {
        opacity = 1 - (scrollProgress - peakEnd) / (end - peakEnd);
      }
    }
    const translateY = (1 - opacity) * 30; // 30px slide up effect
    return {
      opacity,
      transform: `translateY(${translateY}px)`,
      pointerEvents: opacity > 0.5 ? ("auto" as const) : ("none" as const),
    };
  };

  // Stage 0: Initial Hero Text (Visible at top / first frames)
  const heroStyle = {
    opacity: scrollProgress < 0.15 ? 1 : Math.max(0, 1 - (scrollProgress - 0.15) / 0.1),
    transform: `translateY(${scrollProgress < 0.15 ? 0 : (scrollProgress - 0.15) * -150}px)`,
    pointerEvents: scrollProgress < 0.2 ? ("auto" as const) : ("none" as const),
  };

  // Stage 1: The Best Harvest
  const stage1Style = getStageStyle(0.22, 0.28, 0.42, 0.48);

  // Stage 2: Highest Quality Coffee
  const stage2Style = getStageStyle(0.48, 0.54, 0.68, 0.74);

  // Stage 3: Professional Work & Artisan Creation
  const stage3Style = getStageStyle(0.74, 0.80, 0.95, 1.0);

  return (
    <div ref={containerRef} data-section="hero" className="relative h-[380vh] sm:h-[420vh] w-full bg-black">
      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas background playing video frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Responsive dark gradient overlay for mobile & desktop legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />

        {/* ======================================================== */}
        {/* STAGE 0: Initial Hero Text (Visible on load & top scroll) */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28 transition-all duration-300 ease-out"
          style={heroStyle}
        >
          <p className="eyebrow text-primary-foreground/80 text-[10px] sm:text-xs">Est. 2014 · Baghdad, Iraq</p>
          <h1 className="mt-4 sm:mt-6 max-w-4xl font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] text-primary-foreground">
            A quiet ritual, poured slowly.
          </h1>
          <p className="mt-4 sm:mt-8 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-primary-foreground/80">
            Single-origin beans, patient hands, and a room that lets the coffee speak.
            Maison Noir is a small café built for people who take their mornings seriously.
          </p>
          <div className="mt-6 sm:mt-10 flex flex-wrap gap-3">
            <Link
              to="/menu"
              className="rounded-full bg-primary-foreground px-6 py-2.5 sm:px-7 sm:py-3 text-[11px] sm:text-xs uppercase tracking-[0.24em] text-primary transition-colors hover:bg-primary-foreground/90"
            >
              View the menu
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-primary-foreground/60 px-6 py-2.5 sm:px-7 sm:py-3 text-[11px] sm:text-xs uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              Find us
            </Link>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STAGE 1: The Best Harvest                                 */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 md:px-10 transition-all duration-300 ease-out"
          style={stage1Style}
        >
          <p className="eyebrow text-primary-foreground/70 text-[10px] sm:text-xs">Selection & Sourcing</p>
          <h2 className="mt-4 sm:mt-6 max-w-3xl font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] text-primary-foreground">
            The best harvest.
          </h2>
          <p className="mt-4 sm:mt-6 max-w-lg text-sm sm:text-base md:text-xl leading-relaxed text-primary-foreground/80">
            Hand-selected single-origin beans from high-altitude micro-lots, harvested at peak ripeness for rich, nuanced flavor.
          </p>
        </div>

        {/* ======================================================== */}
        {/* STAGE 2: Highest Quality Coffee                          */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 z-10 mx-auto flex h-full max-w-7xl flex-col justify-center items-start text-left sm:items-end sm:text-right px-5 py-16 sm:px-8 sm:py-20 md:px-10 transition-all duration-300 ease-out"
          style={stage2Style}
        >
          <div className="max-w-2xl">
            <p className="eyebrow text-primary-foreground/70 text-[10px] sm:text-xs">Roasting & Extraction</p>
            <h2 className="mt-4 sm:mt-6 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] text-primary-foreground">
              Highest quality coffee.
            </h2>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-xl leading-relaxed text-primary-foreground/80">
              Roasted weekly in small batches and extracted with exacting precision to unlock deep caramel and aromatic cacao notes.
            </p>
          </div>
        </div>

        {/* ======================================================== */}
        {/* STAGE 3: Professional Work                               */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 z-10 mx-auto flex h-full max-w-7xl flex-col justify-center items-center text-center px-5 py-16 sm:px-8 sm:py-20 md:px-10 transition-all duration-300 ease-out"
          style={stage3Style}
        >
          <p className="eyebrow text-primary-foreground/70 text-[10px] sm:text-xs">Craft & Excellence</p>
          <h2 className="mt-4 sm:mt-6 max-w-4xl font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.08] text-primary-foreground">
            Professional work.
          </h2>
          <p className="mt-4 sm:mt-6 max-w-xl text-sm sm:text-base md:text-xl leading-relaxed text-primary-foreground/80">
            Crafted into silk-smooth espresso gelato by dedicated baristas who treat every step as an art.
          </p>
          <div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/menu"
              className="rounded-full bg-primary-foreground px-7 py-3 sm:px-8 sm:py-3.5 text-[11px] sm:text-xs uppercase tracking-[0.24em] text-primary transition-colors hover:bg-primary-foreground/90"
            >
              Explore our menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
