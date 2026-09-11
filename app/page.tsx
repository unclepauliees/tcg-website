"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll } from "framer-motion";
import { basePath } from "@/lib/basePath";
import { clients } from "@/lib/clients";
import { founders } from "@/lib/founders";
import { cn } from "@/lib/utils";
import { TextWordCarousel } from "@/components/ui/text-word-carousel";

type Chapter = {
  index: string;
  label: string;
  mediaType: "video" | "image";
  mediaUrl: string;
  eyebrow?: string;
  headline: string;
  rotatingWords?: string[];
  body?: string[];
  expertise?: string[];
  proofPoints?: { title: string; body: string }[];
};

const chapters: Chapter[] = [
  {
    index: "01",
    label: "Hero",
    mediaType: "video",
    mediaUrl: `${basePath}/media/hero-loop.mp4`,
    headline: "We",
    rotatingWords: ["Are Solid.", "Don't Chase Noise.", "Are Concrete Group."],
    body: ["A strategic communications and brand advisory for category-defining brands."],
  },
  {
    index: "02",
    label: "About Us",
    mediaType: "image",
    mediaUrl: `${basePath}/media/section-2-about.webp`,
    eyebrow: "WE ARE SOLID",
    headline: "Built as an extension of your team.",
    body: [
      "The Concrete Group is a strategic communications and brand advisory firm helping category-defining brands navigate transformation.",
      "We assemble bespoke teams of senior strategists and publicists to execute culturally resonant, high-impact work, tailored to what each client actually needs.",
      "We don't operate at arm's length. We become an extension of your leadership, deploying the right senior people exactly when and where you need them, and coordinating seamlessly across your agency partners and internal team.",
      "We understand business strategy at a deeper level, staying plugged into what's happening now and what moves markets.",
    ],
    expertise: ["TECHNOLOGY", "MOBILITY", "SPIRITS & BEVERAGE", "LIFESTYLE", "LUXURY", "CULTURE"],
  },
  {
    index: "03",
    label: "Our Mindset",
    mediaType: "image",
    mediaUrl: `${basePath}/media/section-3-mindset.webp`,
    eyebrow: "COMMUNICATIONS 4.0",
    headline: "We don't chase the cultural current. We give your brand the authority to guide it.",
    body: [
      "Audiences don't want brands that copy-paste the latest trend. They want brands that take a stand and lead the conversation. That requires a different posture than the one communications was built on.",
    ],
    proofPoints: [
      {
        title: "Trust is earned, not bought.",
        body: "The large majority of Millennial and Gen Z consumers say brand trust is shaped by earned media.",
      },
      {
        title: "Discovery is algorithmic.",
        body: "Most content discovery now runs through algorithms and social sharing rather than direct search.",
      },
      {
        title: "Attention is scarce.",
        body: "Brands have only seconds before audiences move on.",
      },
    ],
  },
];

const services = [
  {
    number: "001",
    title: "Always-On Press Engine",
    body: "We find fresh angles that let you enter the conversations already happening, surface the brand assets you're under-using as story hooks, and monitor media and social for the moments that turn your brand into the hero of the story.",
  },
  {
    number: "002",
    title: "Social & Influence",
    body: "Vetting and managing high-impact talent who genuinely embody your values. Defining how you show up in the feed with narrative consistency across platforms. Intercepting trends fast enough to lead them. Building engagement frameworks that turn passive followers into advocates.",
  },
  {
    number: "003",
    title: "Brand & Narrative Strategy",
    body: "Positioning for market entry and category creation. Rebrands, pivots and narrative resets. Founder and C-suite visibility. And when a reputational threat hits, crisis communications that stabilize the situation, protect your community and make sure your truth is heard.",
  },
  {
    number: "004",
    title: "Measurement & Accountability",
    body: "Best-in-class measurement so you know the work is working: reach, engagement, sentiment, share of voice, ad value and SEO. We set benchmarks at the outset and report against them.",
  },
];

const moments = [
  "Market entry and category creation",
  "Product launches and platform debuts",
  "High-profile events",
  "Rebrands, pivots and narrative resets",
  "Executive visibility",
  "Crisis communications",
];

const CONTACT_EMAIL = "YourAgency@theconcretegrp.com";

const menuLinks = [
  { number: "01", label: "Our Services", href: "#services" },
  { number: "02", label: "Our Founders", href: "#founders" },
  { number: "03", label: "Our Clients", href: "#clients" },
  { number: "04", label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
];

type RailStop =
  | { index: string; label: string; kind: "chapter"; chapterIndex: number }
  | { index: string; label: string; kind: "section"; targetId: string };

const railStops: RailStop[] = [
  { index: "01", label: "Hero", kind: "chapter", chapterIndex: 0 },
  { index: "02", label: "About Us", kind: "chapter", chapterIndex: 1 },
  { index: "03", label: "Our Mindset", kind: "chapter", chapterIndex: 2 },
  { index: "04", label: "Our Services", kind: "section", targetId: "services" },
  { index: "05", label: "Our Founders", kind: "section", targetId: "founders" },
  { index: "06", label: "Our Clients", kind: "section", targetId: "clients" },
];

export default function Home() {
  const narrativeRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [railActiveIndex, setRailActiveIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroCleared = activeIndex >= 1;

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const narrative = narrativeRef.current;
      const founders = document.getElementById("founders");
      const clients = document.getElementById("clients");
      if (!narrative || !founders || !clients) return;

      const scrollMark = window.scrollY + window.innerHeight * 0.4;
      const narrativeBottom = narrative.offsetTop + narrative.offsetHeight;

      if (scrollMark < narrativeBottom) {
        setRailActiveIndex(activeIndex);
      } else if (scrollMark < founders.offsetTop) {
        setRailActiveIndex(3);
      } else if (scrollMark < clients.offsetTop) {
        setRailActiveIndex(4);
      } else {
        setRailActiveIndex(5);
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [activeIndex]);

  return (
    <div className="solid-site">
      <a className="solid-skip" href="#main">
        Skip to content
      </a>
      <header className={cn("solid-header", heroCleared && "is-visible")}>
        <a href="#main" aria-label="The Concrete Group home">
          <Image src={`${basePath}/brand-assets/tcg-mark-reverse.svg`} alt="" width={40} height={40} priority />
        </a>
      </header>
      <SiteMenu open={menuOpen} onOpenChange={setMenuOpen} />
      <NumberedRail
        stops={railStops}
        activeIndex={railActiveIndex}
        narrativeRef={narrativeRef}
        chapterCount={chapters.length}
        shouldReduceMotion={shouldReduceMotion}
      />
      <main id="main">
        <ScrollNarrative
          chapters={chapters}
          activeIndex={activeIndex}
          onActiveIndexChange={setActiveIndex}
          narrativeRef={narrativeRef}
        />
        <ServicesSection />
        <FoundersSection />
        <ClientsSection />
      </main>
      <SolidFooter />
    </div>
  );
}

function SiteMenu({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const shouldReduceMotion = useReducedMotion();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    firstLinkRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menu-trigger"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls="site-menu"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div id="site-menu" className={cn("site-menu", open && "is-open")} aria-hidden={!open}>
        <nav aria-label="Site" className="site-menu-links">
          {menuLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              tabIndex={open ? 0 : -1}
              ref={index === 0 ? firstLinkRef : undefined}
              onClick={(event) => {
                if (link.href.startsWith("#")) {
                  event.preventDefault();
                  const target = document.querySelector(link.href);
                  onOpenChange(false);
                  setTimeout(() => target?.scrollIntoView(), 50);
                } else {
                  onOpenChange(false);
                }
              }}
              animate={{
                opacity: open ? 1 : 0,
                y: shouldReduceMotion || open ? 0 : 16,
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion || !open ? 0 : index * 0.06,
                ease: [0, 0, 0.2, 1],
              }}
            >
              <span>( {link.number} )</span>
              {link.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </>
  );
}

function ScrollNarrative({
  chapters,
  activeIndex,
  onActiveIndexChange,
  narrativeRef: ref,
}: {
  chapters: Chapter[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  narrativeRef: React.RefObject<HTMLElement | null>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [canUseVideo, setCanUseVideo] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (value) => {
      onActiveIndexChange(Math.min(chapters.length - 1, Math.floor(value * chapters.length)));
    });
  }, [chapters.length, scrollYProgress, onActiveIndexChange]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 768px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const update = () => setCanUseVideo(wide.matches && !reduced.matches && !connection?.saveData);

    update();
    wide.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      wide.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, []);

  return (
    <section ref={ref} className="scroll-narrative" aria-label="The Concrete Group narrative">
      <div className="narrative-sticky">
        <div className="narrative-media" aria-hidden="true">
          {chapters.map((chapter, index) => (
            <motion.div
              className={cn("narrative-layer", index === activeIndex && "is-active")}
              key={chapter.index}
              animate={{ opacity: index === activeIndex ? 1 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0, 0, 0.2, 1] }}
            >
              {chapter.mediaType === "video" && canUseVideo ? (
                <video autoPlay muted playsInline preload="none" poster={`${basePath}/media/hero-poster.webp`} className="narrative-video">
                  <source src={chapter.mediaUrl} type="video/mp4" />
                </video>
              ) : (
                <div
                  className="narrative-image"
                  style={{
                    backgroundImage: `url(${chapter.mediaType === "video" ? `${basePath}/media/hero-resolved.webp` : chapter.mediaUrl})`,
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>
        <div className="narrative-scrim" />
        <div className="film-grain" />
        <div className="narrative-copy">
          {chapters.map((chapter, index) => (
            <motion.article
              className={cn(
                "chapter-copy",
                index === 0 && "chapter-copy--hero",
                index === activeIndex && "is-active",
              )}
              id={`chapter-${chapter.index}`}
              key={chapter.index}
              animate={{
                opacity: index === activeIndex ? 1 : 0,
                y: shouldReduceMotion || index === activeIndex ? 0 : 24,
              }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0, 0, 0.2, 1] }}
            >
              {chapter.eyebrow ? <Eyebrow>{chapter.eyebrow}</Eyebrow> : null}
              <div className="mask-title">
                <motion.h1
                  animate={{ y: shouldReduceMotion || index === activeIndex ? "0%" : "100%" }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5, ease: [0, 0, 0.2, 1] }}
                >
                  {chapter.rotatingWords ? (
                    <span className="headline-static">{chapter.headline}</span>
                  ) : (
                    chapter.headline
                  )}
                  {chapter.rotatingWords ? (
                    <>
                      <br />
                      <TextWordCarousel words={chapter.rotatingWords} className="headline-rotator" />
                    </>
                  ) : null}
                </motion.h1>
              </div>
              {chapter.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {chapter.expertise ? <p className="expertise-row">{chapter.expertise.join(" · ")}</p> : null}
              {chapter.proofPoints ? (
                <div className="proof-grid">
                  {chapter.proofPoints.map((point) => (
                    <div key={point.title}>
                      <h2>{point.title}</h2>
                      <p>{point.body}</p>
                    </div>
                  ))}
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>
        <div className="scroll-cue" aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}

function NumberedRail({
  stops,
  activeIndex,
  narrativeRef,
  chapterCount,
  shouldReduceMotion,
}: {
  stops: RailStop[];
  activeIndex: number;
  narrativeRef: React.RefObject<HTMLElement | null>;
  chapterCount: number;
  shouldReduceMotion: boolean | null;
}) {
  const goToStop = (event: React.MouseEvent<HTMLAnchorElement>, stop: RailStop) => {
    event.preventDefault();
    const behavior = shouldReduceMotion ? "auto" : "smooth";

    if (stop.kind === "section") {
      document.getElementById(stop.targetId)?.scrollIntoView({ behavior });
      return;
    }

    const section = narrativeRef.current;
    if (!section) return;
    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const target = sectionTop + (section.offsetHeight * stop.chapterIndex) / chapterCount;
    window.scrollTo({ top: target, behavior });
  };

  return (
    <nav className="solid-rail" aria-label="Site sections">
      {stops.map((stop, index) => {
        const href = stop.kind === "section" ? `#${stop.targetId}` : `#chapter-0${stop.chapterIndex + 1}`;
        return (
          <a
            className={cn(index === activeIndex && "is-active")}
            href={href}
            key={stop.index}
            onClick={(event) => goToStop(event, stop)}
          >
            <span>{stop.index}</span>
            <em>{stop.label}</em>
          </a>
        );
      })}
    </nav>
  );
}

function ServicesSection() {
  const stickyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotion();
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  // Cards stack via CSS position:sticky (each with its own top offset), not a
  // JS-driven crossfade, so "which card is on top" has to be read from the
  // actual rendered geometry, not estimated from an aggregate scroll fraction.
  useEffect(() => {
    let raf = 0;

    const update = () => {
      let active = 0;
      stickyRefs.current.forEach((el, index) => {
        if (el && el.getBoundingClientRect().top <= 140) {
          active = index;
        }
      });
      setActiveServiceIndex(active);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="solid-section services-section" id="services" aria-labelledby="services-title">
      <div
        className="services-bg"
        aria-hidden="true"
        style={{
          backgroundImage: `linear-gradient(color-mix(in srgb, var(--concrete-black) 62%, transparent), color-mix(in srgb, var(--concrete-black) 62%, transparent)), url(${basePath}/media/section-4-services.webp)`,
        }}
      />
      <div className="section-inner">
        <SectionHeading eyebrow="OUR SERVICES" title="Senior people, deployed on the work." id="services-title" />
        <div className="services-stack">
          {services.map((service, index) => (
            <div
              className="service-sticky"
              key={service.number}
              ref={(el) => {
                stickyRefs.current[index] = el;
              }}
              style={{ "--stack-index": index } as React.CSSProperties}
            >
              <motion.article
                className="service-card"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
              >
                <motion.div
                  className="service-card-copy"
                  animate={{ opacity: index < activeServiceIndex ? 0 : 1 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0, 0, 0.2, 1] }}
                >
                  <span>( {service.number} )</span>
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </motion.div>
              </motion.article>
            </div>
          ))}
        </div>
        <div className="moment-band">
          <span>WHEN WE SHOW UP</span>
          <p>{moments.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}

function FoundersSection() {
  return (
    <section className="solid-section founders-section" id="founders" aria-labelledby="founders-title">
      <div className="section-inner">
        <SectionHeading eyebrow="LEADERSHIP" title="The people you meet are the people who do the work." id="founders-title" />
        <div className="founder-stack">
          {founders.map((founder) => (
            <motion.article
              className={cn("founder-card", founder.position === "right" && "founder-card--right")}
              key={founder.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
            >
              <div className="founder-image">
                <Image src={`${basePath}${founder.image}`} alt={`${founder.name}, ${founder.role}`} width={480} height={600} />
              </div>
              <div className="founder-copy">
                <span>{founder.role}</span>
                <h3>
                  <em>{founder.name.split(" ")[0]}</em>
                  <strong>{founder.name.split(" ").slice(1).join(" ")}</strong>
                </h3>
                <p>{founder.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  const doubledClients = useMemo(() => [...clients, ...clients], []);

  return (
    <section className="solid-section clients-section" id="clients" aria-labelledby="clients-title">
      <div className="section-inner">
        <SectionHeading eyebrow="SELECTED CLIENT EXPERIENCE" title="The work speaks at this level." id="clients-title" />
      </div>
      <div className="client-mask">
        <div className="client-track">
          {doubledClients.map((client, index) => (
            <div className="client-mark" role="img" aria-label={client.name} key={`${client.slug}-${index}`}>
              <Image src={`${basePath}/clients/${client.slug}.svg`} alt="" width={220} height={44} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolidFooter() {
  return (
    <footer className="solid-footer">
      <div className="footer-rule" aria-hidden="true">
        <span />
      </div>
      <Image src={`${basePath}/brand-assets/tcg-mark-reverse.svg`} alt="" width={40} height={40} />
      <p>WE ARE SOLID</p>
      <h2>THE CONCRETE GROUP</h2>
      <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      <small>theconcretegrp.com · © 2026 The Concrete Group</small>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <div className="solid-section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id}>{title}</h2>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="solid-eyebrow">{children}</span>;
}
