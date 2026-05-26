import { useRef, useEffect, useState, type ComponentType } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { MockupCard } from "./MockupCard";

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
const CARD_HEIGHT_PX = 220;
const HEADER_OFFSET   = 80;   // sticky nav height
const STACK_OFFSET    = 28;   // px gap between stacked card tops
const MAX_SCALE_DOWN  = 0.06; // how much each stacked card shrinks (6%)
const MAX_DIM         = 0.18; // brightness dim per stacked layer

// ─── Component ───────────────────────────────────────────────────────────────
export function StackedServices({ services }: StackedServicesProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [progresses, setProgresses] = useState<number[]>(
    () => services.map(() => 0)
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function onScroll() {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const newProgresses = services.map((_, i) => {
        // The card sticks at top = HEADER_OFFSET + i * STACK_OFFSET
        // Progress goes from 0→1 while the next card scrolls over it
        const stickyTop = HEADER_OFFSET + i * STACK_OFFSET;
        // Distance from card's natural position to now
        const cardNaturalTop =
          rect.top + i * (CARD_HEIGHT_PX + 40); // 40 = gap between cards
        // How much the card has been "swallowed" by subsequent cards
        const swallowed = Math.max(
          0,
          stickyTop - cardNaturalTop
        );
        // Normalise 0→1 over the height of one card slot
        return Math.min(1, swallowed / CARD_HEIGHT_PX);
      });
      setProgresses(newProgresses);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initialise
    return () => window.removeEventListener("scroll", onScroll);
  }, [services]);

  // Total height: each card contributes CARD_HEIGHT_PX + 40 extra scroll to let next stack
  const totalSlots = services.length;

  return (
    <div
      ref={containerRef}
      className="stacked-services-container relative"
      style={{
        // Extra scroll room = (n-1) * one full card height, so each card gets time to stack
        paddingBottom: `${(totalSlots - 1) * (CARD_HEIGHT_PX + 40)}px`,
      }}
    >
      {services.map((s, idx) => {
        const p = progresses[idx] ?? 0;
        const scale = 1 - p * MAX_SCALE_DOWN * (totalSlots - idx - 1 > 0 ? 1 : 0);
        const brightness = 1 - p * MAX_DIM * Math.min(idx, totalSlots - 1);

        return (
          <div
            key={s.e}
            className="stacked-card-wrapper"
            style={{
              position: "sticky",
              top: `${HEADER_OFFSET + idx * STACK_OFFSET}px`,
              zIndex: 10 + idx,
              // Push each card so they appear naturally spaced before sticking
              marginBottom: idx < totalSlots - 1 ? `${CARD_HEIGHT_PX + 40}px` : 0,
              transformOrigin: "top center",
              transform: `scale(${scale})`,
              filter: `brightness(${brightness})`,
              transition: "transform 0.12s linear, filter 0.12s linear",
              willChange: "transform, filter",
            }}
          >
            <Link
              to={s.to}
              id={`service-card-${idx}`}
              className="card-base card-interactive group flex flex-col md:flex-row justify-between items-center gap-6 p-6 sm:p-8 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-card border border-border shadow-2xl"
              style={{
                minHeight: `${CARD_HEIGHT_PX}px`,
                borderRadius: "1.25rem",
                // Each card gets a subtle gradient-tinted top border for depth perception
                borderTop: `2px solid oklch(${0.55 + idx * 0.08} 0.14 ${252 - idx * 30} / ${0.25 + idx * 0.07})`,
              }}
            >
              <div className="space-y-4 flex-1 text-left">
                <div className="flex items-start gap-4">
                  {/* Icon bubble */}
                  <div className="w-12 h-12 rounded-xl bg-primary/8 grid place-items-center text-primary group-hover:bg-primary group-hover:text-white transition shrink-0">
                    <s.i className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-display text-xl font-semibold text-ink">
                        {t(s.t, s.e)}
                      </h3>
                      {s.badge && (
                        <span className="text-[10px] font-bold text-primary bg-primary/8 border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                          {s.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xl font-tamil">
                      {t(s.td, s.d)}
                    </p>
                  </div>
                </div>
                <div className="pt-2 pl-16 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  {t("தொடரவும்", "Proceed")}
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>

              {s.isTall && (
                <div className="w-full md:w-[280px] shrink-0 mt-4 md:mt-0">
                  <MockupCard />
                </div>
              )}
            </Link>
          </div>
        );
      })}
    </div>
  );
}
