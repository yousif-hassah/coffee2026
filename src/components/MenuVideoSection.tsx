import React, { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight } from "lucide-react";

export function MenuVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for smooth scroll entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={sectionRef}
      className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:grid-cols-2 md:items-center md:px-10 md:py-32 overflow-hidden"
    >
      {/* Video Container with Animations */}
      <div
        className={`relative group overflow-hidden rounded-2xl shadow-2xl transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
        }`}
      >
        <video
          ref={videoRef}
          src="/menu-video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Ambient Dark Gradient Edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-black/50 px-3.5 py-1.5 text-[11px] uppercase tracking-wider text-amber-200 backdrop-blur-md border border-amber-500/20 shadow-lg">
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Freshly Brewed</span>
        </div>

        {/* Interactive Video Controls Overlay */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white hover:text-black hover:scale-110"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>

          <button
            onClick={togglePlay}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white hover:text-black hover:scale-110"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Text & Content Column */}
      <div
        className={`transition-all duration-1000 delay-200 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <p className="eyebrow text-muted-foreground">The Menu</p>
        <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl lg:text-6xl text-foreground">
          A short list, <span className="italic font-normal">done well.</span>
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Espresso, filter, and a few honest pastries. Nothing more than what we can make properly.
        </p>

        {/* Feature List */}
        <div className="mt-8 space-y-4 border-t border-border/60 pt-6">
          <div className="flex items-center gap-3 text-sm text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Single-Origin Espresso & Filter Pourovers</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span>Artisanal House-baked Pastries</span>
          </div>
        </div>

        {/* CTA Link */}
        <div className="mt-10">
          <Link
            to="/menu"
            className="group inline-flex items-center gap-3 border-b border-foreground pb-1 text-xs uppercase tracking-[0.24em] text-foreground transition-all hover:opacity-75"
          >
            <span>See the full menu</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
