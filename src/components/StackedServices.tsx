import { useState, type ComponentType } from "react";
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
const HEADER_OFFSET = 100;  // clean desktop header offset
const STACK_OFFSET  = 32;   // stack spacing per card

// ─── Component ───────────────────────────────────────────────────────────────
export function StackedServices({ services }: StackedServicesProps) {
  const { t } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Dynamically assign appropriate illustration or photograph to each service card
  const getCardImage = (idx: number, to: string) => {
    if (to === "/voter-id") return "mockup";
    if (idx === 0) return trader3;
    if (idx === 2) return trader1;
    return trader2;
  };

  return (
    <div className="relative space-y-6 md:space-y-0 md:pb-[140px] w-full">
      {services.map((s, idx) => (
        <div
          key={s.e}
          className="md:sticky transition-all duration-300"
          style={{
            top: `${HEADER_OFFSET + idx * STACK_OFFSET}px`,
            zIndex: hoveredIdx === idx ? 100 : 10 + idx,
            // Spacing before cards begin stacking
            paddingBottom: idx < services.length - 1 ? "1.5rem" : 0,
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
              transform: hoveredIdx === idx ? "scale(1.02) translateY(-6px) translateX(6px)" : "none",
              boxShadow: hoveredIdx === idx 
                ? "0 25px 50px -12px oklch(0.20 0.025 252 / 0.25)" 
                : "0 10px 30px -10px oklch(0.20 0.025 252 / 0.15)",
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
            <div className="w-full md:w-2/5 relative min-h-[200px] md:min-h-auto overflow-hidden bg-card flex items-center justify-center">
              {/* Fade mask overlay: blends the photo into the left side clean card bg */}
              <div className="hidden md:block absolute inset-y-0 -left-1 w-24 bg-gradient-to-r from-card via-card to-transparent z-10" />
              {/* Fade mask overlay for mobile top bleed */}
              <div className="block md:hidden absolute inset-x-0 -top-1 h-16 bg-gradient-to-b from-card via-card to-transparent z-10" />

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
