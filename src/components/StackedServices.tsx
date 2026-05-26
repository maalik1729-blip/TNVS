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
// Sticky top offset per card — each card stacks 30px below the previous
const HEADER_OFFSET = 88;   // fixed header height (px)
const STACK_OFFSET  = 28;   // px gap between successive sticky tops

// ─── Component ───────────────────────────────────────────────────────────────
export function StackedServices({ services }: StackedServicesProps) {
  const { t } = useLanguage();
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const cardRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const [scales, setScales]       = useState<number[]>(() => services.map(() => 1));
  const [dims, setDims]           = useState<number[]>(() => services.map(() => 1));

  useEffect(() => {
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
        // (i.e. how much has it been "pushed up" behind the next card)
        const pushed = Math.max(0, stickyTop - cardRect.top);
        const cardH  = Math.max(cardRect.height, 1);
        // Progress 0→1 as card gets fully swallowed
        const progress = Math.min(1, pushed / cardH);

        // Only apply shrink/dim to cards that are not the last
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
  }, [services]);

  return (
    // The outer wrapper provides the total scroll height needed
    // Each card gets a spacer equal to its natural height so the sticky effect has room
    <div ref={wrapperRef} className="relative" style={{ paddingBottom: "180px" }}>
      {services.map((s, idx) => (
        <div
          key={s.e}
          ref={(el) => { cardRefs.current[idx] = el; }}
          className="stacked-card-wrapper"
          style={{
            position: "sticky",
            top: `${HEADER_OFFSET + idx * STACK_OFFSET}px`,
            zIndex: 10 + idx,
            // Push down so each card has natural vertical space before sticking
            marginBottom: idx < services.length - 1 ? "1.5rem" : 0,
            transform: `scale(${scales[idx] ?? 1})`,
            filter: `brightness(${dims[idx] ?? 1})`,
            transition: "transform 0.1s linear, filter 0.1s linear",
          }}
        >
          <Link
            to={s.to}
            id={`service-card-${idx}`}
            className="card-base card-interactive group flex flex-col md:flex-row justify-between items-start md:items-center gap-5 md:gap-6 p-5 sm:p-6 md:p-8 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-card border border-border shadow-2xl"
            style={{
              borderRadius: "1.25rem",
              borderTop: `2px solid oklch(${0.55 + idx * 0.08} 0.14 ${252 - idx * 30} / ${0.25 + idx * 0.07})`,
            }}
          >
            <div className="space-y-3 sm:space-y-4 flex-1 text-left w-full">
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Icon bubble */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-primary/8 grid place-items-center text-primary group-hover:bg-primary group-hover:text-white transition shrink-0">
                  <s.i className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-ink leading-snug">
                      {t(s.t, s.e)}
                    </h3>
                    {s.badge && (
                      <span className="text-[10px] font-bold text-primary bg-primary/8 border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 sm:mt-2 text-sm text-muted-foreground leading-relaxed font-tamil">
                    {t(s.td, s.d)}
                  </p>
                </div>
              </div>
              <div className="pl-14 sm:pl-16 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                {t("தொடரவும்", "Proceed")}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>

            {s.isTall && (
              <div className="w-full sm:w-[240px] md:w-[280px] shrink-0 mt-2 md:mt-0">
                <MockupCard />
              </div>
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}
