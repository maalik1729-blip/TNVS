import { useRef, useEffect, useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { MockupCard } from "./MockupCard";

import trader1 from "@/assets/trader1.png";
import trader2 from "@/assets/trader2.png";
import trader3 from "@/assets/trader3.png";

// ─── Types ──────────────────────────────────────────────────────────────────

interface ServiceItem {
  i: ComponentType<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
  t: string;
  e: string;
  d: string;
  td: string;
  to: string;
  badge: string | null;
  isTall?: boolean;
}

interface StackedServicesProps {
  services: ServiceItem[];
}

// ─── Constants ───────────────────────────────────────────────────────────────
const HEADER_OFFSET = 88;   // fixed header height (px)
const STACK_OFFSET  = 28;   // px gap between successive sticky tops

// ─── Component ───────────────────────────────────────────────────────────────
export function StackedServices({ services }: StackedServicesProps) {
  const { t } = useLanguage();
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [scales, setScales]       = useState<number[]>(() => services.map(() => 1));
  const [dims, setDims]           = useState<number[]>(() => services.map(() => 1));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const cards = cardRefs.current;
    if (!cards.length) return;

    const onScroll = () => {
      const newScales: number[] = [];
      const newDims:   number[] = [];

      cards.forEach((card, i) => {
        if (!card) { newScales.push(1); newDims.push(1); return; }
        const cardRect = card.getBoundingClientRect();
        const stickyTop = HEADER_OFFSET + i * STACK_OFFSET;

        // How far past its sticky-top position is the card?
        const pushed = Math.max(0, stickyTop - cardRect.top);
        const cardH  = Math.max(cardRect.height, 1);
        const progress = Math.min(1, pushed / cardH);

        const isLast = i === services.length - 1;
        newScales.push(isLast ? 1 : 1 - progress * 0.05);
        newDims.push(isLast ? 1 : 1 - progress * 0.15);
      });

      setScales(newScales);
      setDims(newDims);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [services, isMobile]);

  // Dynamically assign appropriate illustration or photograph to each service card
  const getCardImage = (idx: number, to: string) => {
    if (to === "/voter-id") return "mockup";
    if (idx === 0) return trader3;
    if (idx === 2) return trader1;
    return trader2;
  };

  return (
    <div ref={wrapperRef} className="relative" style={{ paddingBottom: isMobile ? "0px" : "180px" }}>
      {services.map((s, idx) => (
        <div
          key={s.e}
          ref={(el) => { cardRefs.current[idx] = el; }}
          className="sticky-stack-card"
          style={{
            position: isMobile ? "relative" : "sticky",
            top: isMobile ? "auto" : `${HEADER_OFFSET + idx * STACK_OFFSET}px`,
            zIndex: hoveredIdx === idx ? 100 : 10 + idx,
            marginBottom: idx < services.length - 1 ? (isMobile ? "1.5rem" : "2rem") : 0,
            transform: isMobile 
              ? "none" 
              : `scale(${scales[idx] ?? 1}) translateY(${hoveredIdx === idx ? "-12px" : "0px"}) translateX(${hoveredIdx === idx ? "12px" : "0px"})`,
            filter: isMobile ? "none" : `brightness(${dims[idx] ?? 1})`,
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease",
          }}
        >
          <Link
            to={s.to}
            id={`service-card-${idx}`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className="card-base card-interactive group flex flex-col md:flex-row items-stretch overflow-hidden w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-card border border-border shadow-2xl transition duration-300"
            style={{
              borderRadius: "1.5rem",
              borderTop: `3px solid oklch(${0.55 + idx * 0.08} 0.14 ${252 - idx * 30} / ${0.35 + idx * 0.05})`,
            }}
          >
            {/* Left Side: Crisp, highly readable text layout */}
            <div className="w-full md:w-3/5 p-6 sm:p-8 flex flex-col justify-between text-left space-y-4 md:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                {/* Animated Icon bubble */}
                <div className="w-12 h-12 rounded-2xl bg-primary/8 grid place-items-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 transform group-hover:scale-110 shrink-0">
                  <s.i className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ink leading-snug">
                      {t(s.t, s.e)}
                    </h3>
                    {s.badge && (
                      <span className="text-[10px] font-bold text-primary bg-primary/8 border border-primary/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-tamil">
                    {t(s.td, s.d)}
                  </p>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-2.5 transition-all duration-300">
                {t("தொடரவும்", "Proceed")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>

            {/* Right Side: Photograph blending seamlessly into the card background */}
            <div className="w-full md:w-2/5 relative min-h-[200px] md:min-h-auto overflow-hidden bg-slate-950 flex items-center justify-center">
              {/* Fade mask overlay: blends the photo into the left side clean card bg */}
              <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-card to-transparent z-10" />
              {/* Fade mask overlay for mobile top bleed */}
              <div className="block md:hidden absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-card to-transparent z-10" />

              {getCardImage(idx, s.to) === "mockup" ? (
                <div className="w-full h-full p-6 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950">
                  <div className="w-full max-w-[280px] transform group-hover:scale-105 transition-transform duration-500">
                    <MockupCard />
                  </div>
                </div>
              ) : (
                <img
                  src={getCardImage(idx, s.to) as string}
                  alt={s.e}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
