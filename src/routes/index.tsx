import { useEffect, useRef, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  Truck,
  X,
} from "lucide-react";

import heroImg from "@/assets/hero.jpg";
import weddingImg from "@/assets/wedding.jpg";
import cakeChocolate from "@/assets/cake-chocolate.jpg";
import cakeLemon from "@/assets/cake-lemon.jpg";
import cakeBerry from "@/assets/cake-berry.jpg";
import cakeCaramel from "@/assets/cake-caramel.jpg";
import treatsImg from "@/assets/treats.jpg";
import aboutImg from "@/assets/about.jpg";
import gallerySlice from "@/assets/gallery-slice.jpg";
import gallerySugarFlowers from "@/assets/gallery-sugarflowers.jpg";
import galleryWedding2 from "@/assets/gallery-wedding2.jpg";
import galleryStudio from "@/assets/gallery-studio.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Sugarloom Cakes | Handmade Celebration & Wedding Cakes, UK",
      },
      {
        name: "description",
        content:
          "Sugarloom Cakes is a premium UK bakery studio creating handmade cakes and sweet treats for birthdays, weddings and celebrations. Explore our cakes and order your custom cake.",
      },
      {
        property: "og:title",
        content: "Sugarloom Cakes | Made for moments worth celebrating",
      },
      {
        property: "og:description",
        content:
          "Handmade celebration cakes, wedding cakes and sweet treats from our UK bakery studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sugarloom Cakes | Made for moments worth celebrating" },
      {
        name: "twitter:description",
        content:
          "Handmade celebration cakes, wedding cakes and sweet treats from our UK bakery studio.",
      },
    ],
  }),
  component: Index,
});

/* ---------------------------------- utils --------------------------------- */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className="flex items-baseline gap-2">
      <span
        className={`font-serif text-3xl font-semibold tracking-tight ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        Sugarloom
      </span>
      <span
        className={`text-[0.65rem] font-medium uppercase tracking-[0.42em] ${
          light ? "text-blush" : "text-gold"
        }`}
      >
        Cakes
      </span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`mt-4 font-serif text-4xl font-medium leading-[1.1] md:text-5xl ${
          light ? "text-cream" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-5 text-base leading-relaxed ${light ? "text-cream/80" : "text-muted-foreground"}`}>
          {text}
        </p>
      )}
    </Reveal>
  );
}

/* ---------------------------------- navbar --------------------------------- */

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Our Cakes", href: "#cakes" },
  { label: "Wedding Cakes", href: "#wedding" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/95 shadow-[0_10px_40px_-20px_rgba(53,42,45,0.25)] backdrop-blur-md"
          : "bg-cream/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-rose"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#order" className="btn-primary hidden !px-6 !py-3 md:inline-flex">
            Order a Cake
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-cream/95 px-5 pb-6 pt-3 backdrop-blur-md lg:hidden">
          <nav className="flex flex-col">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-ink/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#order"
              onClick={() => setOpen(false)}
              className="btn-primary mt-5 w-full"
            >
              Order a Cake
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

/* ----------------------------------- hero ---------------------------------- */

function Hero() {
  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={heroImg}
        alt="Handcrafted celebration cake with dried roses on a marble stand"
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        width={1920}
        height={1440}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/45 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-36 md:px-8">
        <Reveal>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.4em] text-blush">
            Sugarloom Cakes · Handcrafted Bakery Studio · UK
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl font-medium leading-[1.05] text-cream md:text-7xl">
            Made for moments worth&nbsp;celebrating.
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/85 md:text-lg">
            Handmade cakes and sweet treats, baked to order in our UK studio —
            for birthdays, weddings and the everyday moments that deserve
            something beautiful.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#order" className="btn-primary">
              Order Your Cake <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#cakes" className="btn-outline-light">
              View Our Cakes
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------- about --------------------------------- */

function About() {
  return (
    <section id="about" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-sm">
            <img
              src={aboutImg}
              alt="A baker piping blush buttercream rosettes onto a cake"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              loading="lazy"
              width={1200}
              height={1200}
            />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden rounded-sm bg-card px-8 py-6 shadow-[0_24px_60px_-30px_rgba(53,42,45,0.4)] md:block">
            <p className="font-serif text-4xl font-semibold text-rose">10+</p>
            <p className="mt-1 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Years of baking
            </p>
          </div>
        </Reveal>

        <div>
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="A small UK bakery, devoted to handmade."
          />
          <Reveal delay={120}>
            <p className="mt-6 leading-relaxed text-muted-foreground">
              Sugarloom Cakes is a premium cake and bakery studio creating
              handmade cakes and sweet treats for birthdays, weddings and every
              celebration in between. Everything we make is baked fresh to
              order in small batches, finished by hand and never rushed.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              We believe a cake should taste as considered as it looks — real
              butter, seasonal fruit, single-origin chocolate and buttercream
              piped with patience. From a single showstopping birthday cake to a
              three-tier wedding centrepiece, every Sugarloom cake is made for
              your moment and no one else&rsquo;s.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <ul className="mt-8 space-y-3">
              {[
                "Baked fresh to order — never from a freezer",
                "British, seasonal ingredients wherever possible",
                "Every cake designed and finished by hand",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <span className="text-sm text-ink/80">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={300}>
            <a href="#cakes" className="btn-primary mt-10">
              Explore Our Cakes <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ featured cakes ----------------------------- */

const featuredCakes = [
  {
    name: "Midnight Chocolate Raspberry",
    flavour: "Dark chocolate · Raspberry",
    desc: "Rich dark chocolate sponge with raspberry compote and a glossy ganache finish.",
    img: cakeChocolate,
  },
  {
    name: "Lemon & Thyme Cream",
    flavour: "Lemon sponge · Mascarpone",
    desc: "Bright lemon sponge layered with vanilla mascarpone, candied lemon and fresh thyme.",
    img: cakeLemon,
  },
  {
    name: "Summer Berry Vanilla",
    flavour: "Vanilla bean · Seasonal berries",
    desc: "Light vanilla sponge crowned with British strawberries, blueberries and edible flowers.",
    img: cakeBerry,
  },
  {
    name: "Salted Caramel Honeycomb",
    flavour: "Caramel buttercream · Honeycomb",
    desc: "Brown sugar sponge with salted caramel drip and shards of crunchy honeycomb.",
    img: cakeCaramel,
  },
  {
    name: "Rosewater & Pistachio",
    flavour: "Rosewater · Pistachio · Dried rose",
    desc: "A signature semi-naked cake with rose-pink buttercream and hand-dried roses.",
    img: heroImg,
  },
  {
    name: "Blush Vanilla Rosette",
    flavour: "Vanilla · Blush buttercream",
    desc: "Delicate vanilla cake finished with hand-piped rosettes in soft blush tones.",
    img: aboutImg,
  },
];

function FeaturedCakes() {
  return (
    <section id="cakes" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Our Cakes"
          title="Signature cakes, made to be remembered."
          text="Every cake is baked to order in our studio and finished by hand. Choose a signature flavour or tell us your dream combination."
        />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCakes.map((cake, i) => (
            <Reveal key={cake.name} delay={(i % 3) * 120}>
              <article className="group bg-card shadow-[0_20px_50px_-35px_rgba(53,42,45,0.45)] transition-transform duration-500 hover:-translate-y-1.5">
                <div className="overflow-hidden">
                  <img
                    src={cake.img}
                    alt={cake.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    width={1200}
                    height={1200}
                  />
                </div>
                <div className="p-6">
                  <p className="text-[0.66rem] font-medium uppercase tracking-[0.26em] text-gold">
                    {cake.flavour}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl font-medium text-ink">
                    {cake.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {cake.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- collections ------------------------------ */

const collections = [
  {
    title: "Celebration Cakes",
    desc: "Birthdays, anniversaries & milestones",
    img: gallerySlice,
    href: "#cakes",
  },
  {
    title: "Wedding Cakes",
    desc: "Tiers, tastings & sugar flowers",
    img: weddingImg,
    href: "#wedding",
  },
  {
    title: "Cupcakes & Treats",
    desc: "Cupcakes, macarons & bakes",
    img: treatsImg,
    href: "#order",
  },
  {
    title: "Custom Cakes",
    desc: "Designed entirely around you",
    img: aboutImg,
    href: "#order",
  },
];

function Collections() {
  return (
    <section id="collections" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Collections"
          title="Find your kind of celebration."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 100}>
              <a href={c.href} className="group relative block overflow-hidden rounded-sm">
                <img
                  src={c.img}
                  alt={c.title}
                  className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1200}
                  height={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-serif text-2xl font-medium text-cream">{c.title}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/70">
                    {c.desc}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-blush opacity-0 transition-all duration-500 group-hover:opacity-100">
                    Explore <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- wedding -------------------------------- */

function Wedding() {
  return (
    <section id="wedding" className="bg-rose py-24 text-cream md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            light
            eyebrow="Weddings"
            title="Wedding cakes, designed around your day."
          />
          <Reveal delay={120}>
            <p className="mt-6 leading-relaxed text-cream/85">
              From a single elegant tier to a sculptural centrepiece dressed in
              sugar flowers, we work closely with couples to design a cake that
              belongs at your wedding. Every design begins with a tasting and a
              conversation — about your flowers, your palette, your story.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="mt-8 space-y-3">
              {[
                "Private tasting & design consultation",
                "Tiered, semi-naked and fully iced designs",
                "Handmade sugar flowers and gold-leaf detailing",
                "Delivery and on-site set-up across the UK",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-blush" />
                  <span className="text-sm text-cream/90">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={280}>
            <a
              href="#contact"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-blush"
            >
              Wedding Enquiry <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={150} className="relative">
          <div className="overflow-hidden rounded-sm">
            <img
              src={weddingImg}
              alt="Three-tier white and gold wedding cake with sugar flowers"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              loading="lazy"
              width={1200}
              height={1400}
            />
          </div>
          <div className="absolute -bottom-10 -left-6 hidden w-52 overflow-hidden rounded-sm border-4 border-rose shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] md:block lg:-left-12">
            <img
              src={galleryWedding2}
              alt="Two-tier blush wedding cake with fresh garden roses"
              className="aspect-square w-full object-cover"
              loading="lazy"
              width={1200}
              height={1200}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- custom cakes ------------------------------ */

const processSteps = [
  {
    n: "01",
    title: "Tell us your moment",
    desc: "Share the occasion, the date and the story behind the cake.",
  },
  {
    n: "02",
    title: "Design consultation",
    desc: "We sketch ideas, agree flavours and confirm every detail with you.",
  },
  {
    n: "03",
    title: "Baked & finished by hand",
    desc: "Your cake is baked fresh and decorated in our studio in the days before your date.",
  },
  {
    n: "04",
    title: "Collection or delivery",
    desc: "Collect from the studio, or let us deliver and set up — wedding cakes included.",
  },
];

const inputClass =
  "w-full rounded-sm border border-input bg-background px-4 py-3 text-sm text-ink placeholder:text-muted-foreground/60 focus:border-rose focus:outline-none focus:ring-1 focus:ring-rose";

function CustomCakes() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="order" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Custom Cakes"
            title="A cake designed entirely around you."
            text="Four simple steps take you from an idea to a cake on your table. Send an enquiry and we&rsquo;ll come back within two working days."
          />
          <div className="mt-10 space-y-7">
            {processSteps.map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <div className="flex gap-5">
                  <span className="font-serif text-3xl font-semibold text-gold/80">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl font-medium text-ink">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={150}>
          <div className="bg-card p-7 shadow-[0_30px_70px_-40px_rgba(53,42,45,0.5)] md:p-10">
            {submitted ? (
              <div className="flex min-h-[28rem] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-rose/10">
                  <Check className="h-6 w-6 text-rose" />
                </span>
                <h3 className="mt-6 font-serif text-3xl font-medium text-ink">
                  Thank you — enquiry received.
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  We&rsquo;ve had a lovely idea of a cake already. Our team will
                  reply within two working days with flavours, sketches and a
                  quote.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn-primary mt-8"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <h3 className="font-serif text-2xl font-medium text-ink">Cake enquiry</h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="occasion" className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                      Occasion
                    </label>
                    <select id="occasion" required className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Select occasion
                      </option>
                      <option>Birthday</option>
                      <option>Wedding</option>
                      <option>Anniversary</option>
                      <option>Baby shower</option>
                      <option>Corporate event</option>
                      <option>Something else</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="size" className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                      Cake size
                    </label>
                    <select id="size" required className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Select size
                      </option>
                      <option>6" (serves 10–14)</option>
                      <option>8" (serves 20–26)</option>
                      <option>10" (serves 30–40)</option>
                      <option>12" (serves 50–60)</option>
                      <option>Multi-tier</option>
                    </select>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="flavour" className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                      Flavour
                    </label>
                    <select id="flavour" required className={inputClass} defaultValue="">
                      <option value="" disabled>
                        Select flavour
                      </option>
                      <option>Vanilla bean</option>
                      <option>Dark chocolate</option>
                      <option>Lemon & thyme</option>
                      <option>Salted caramel</option>
                      <option>Summer berry</option>
                      <option>Surprise us</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="date" className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                      Preferred date
                    </label>
                    <input id="date" type="date" required className={inputClass} />
                  </div>
                </div>
                <div>
                  <label htmlFor="design" className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                    Design ideas
                  </label>
                  <textarea
                    id="design"
                    rows={4}
                    placeholder="Colours, flowers, themes, inscriptions, inspiration…"
                    className={inputClass}
                  />
                </div>
                <fieldset>
                  <legend className="mb-1.5 block text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink/70">
                    Collection or delivery
                  </legend>
                  <div className="flex gap-4">
                    {["Collection", "Delivery"].map((option, i) => (
                      <label
                        key={option}
                        className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-sm border border-input bg-background px-4 py-3 text-sm text-ink transition-colors has-[:checked]:border-rose has-[:checked]:bg-rose/5"
                      >
                        <input
                          type="radio"
                          name="fulfilment"
                          value={option}
                          defaultChecked={i === 0}
                          className="h-4 w-4 accent-[#8B5360]"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <button type="submit" className="btn-primary w-full">
                  Send Enquiry <ArrowRight className="h-4 w-4" />
                </button>
                <p className="text-center text-xs text-muted-foreground">
                  We reply to every enquiry within two working days.
                </p>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- gallery -------------------------------- */

const galleryItems = [
  { img: gallerySlice, alt: "A slice lifted from a blush celebration cake", span: "col-span-2 row-span-2" },
  { img: gallerySugarFlowers, alt: "Handmade sugar flowers and gold leaves", span: "row-span-2" },
  { img: galleryWedding2, alt: "Blush two-tier wedding cake at a reception", span: "" },
  { img: treatsImg, alt: "Cupcakes, macarons and shortbread treats", span: "" },
  { img: galleryStudio, alt: "The Sugarloom studio display counter", span: "col-span-2" },
  { img: weddingImg, alt: "Three-tier wedding cake with gold leaf", span: "" },
  { img: aboutImg, alt: "Piping buttercream rosettes in the studio", span: "" },
];

function Gallery() {
  return (
    <section id="gallery" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Gallery"
          title="From our worktop to your table."
          text="Cakes, sugar flowers, quiet studio mornings and the celebrations they end up at."
        />
        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4">
          {galleryItems.map((item, i) => (
            <Reveal key={item.alt} delay={(i % 4) * 90} className={item.span}>
              <figure className="group relative h-full w-full overflow-hidden rounded-sm">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1200}
                  height={1200}
                />
                <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-cream">
                    {item.alt}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- testimonials ------------------------------ */

const testimonials = [
  {
    quote:
      "The wedding cake was the centrepiece of our whole day — guests are still talking about the salted caramel tier. Faultless from tasting to set-up.",
    name: "Ellie & James",
    detail: "Wedding, Cotswolds",
  },
  {
    quote:
      "Ordered a birthday cake for my mum and it honestly stopped the room. Beautiful, not too sweet, and tasted completely homemade.",
    name: "Priya S.",
    detail: "Birthday, Birmingham",
  },
  {
    quote:
      "Sugarloom made 120 cupcakes and a cutting cake for our launch event, delivered on time and styled beautifully. Our go-to bakery now.",
    name: "Marcus T.",
    detail: "Corporate event, London",
  },
  {
    quote:
      "I sent a rough Pinterest board and a date; they sent back a design better than anything I could have imagined. Such a lovely team.",
    name: "Hannah W.",
    detail: "Custom cake, Oxford",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Kind Words"
          title="Moments we&rsquo;ve been part of."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 4) * 100}>
              <figure className="flex h-full flex-col bg-card p-7 shadow-[0_20px_50px_-35px_rgba(53,42,45,0.45)]">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/80">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-serif text-lg font-medium text-ink">{t.name}</p>
                  <p className="text-[0.66rem] uppercase tracking-[0.2em] text-muted-foreground">
                    {t.detail}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- final CTA ------------------------------- */

function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-rose py-24 text-center md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow !text-blush">Sugarloom Cakes</p>
          <h2 className="mt-5 font-serif text-5xl font-medium leading-[1.08] text-cream md:text-6xl">
            A cake made for your moment.
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-cream/85">
            Tell us the date and the story — we&rsquo;ll take care of everything
            else, from the first crumb to the final ribbon.
          </p>
          <a
            href="#order"
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-10 py-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-blush"
          >
            Start Your Order <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------- contact -------------------------------- */

function Contact() {
  return (
    <section id="contact" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          eyebrow="Contact"
          title="Say hello — we&rsquo;d love to hear about your celebration."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <Reveal>
            <div className="h-full bg-card p-8 shadow-[0_20px_50px_-35px_rgba(53,42,45,0.45)]">
              <MapPin className="h-6 w-6 text-rose" />
              <h3 className="mt-4 font-serif text-2xl font-medium text-ink">
                Visit the studio
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Sugarloom Cakes Studio
                <br />
                14 Lavender Row, Harborne
                <br />
                Birmingham B17 0AA
              </p>
              <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Tastings & collections by appointment,
                <br />
                Tue–Sat, 9am–5pm
              </p>
            </div>
          </Reveal>
          <Reveal delay={110}>
            <div className="h-full bg-card p-8 shadow-[0_20px_50px_-35px_rgba(53,42,45,0.45)]">
              <Truck className="h-6 w-6 text-rose" />
              <h3 className="mt-4 font-serif text-2xl font-medium text-ink">
                Collection & delivery
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Collection from our Harborne studio is free on all orders.
                Local delivery across the West Midlands, and UK-wide
                temperature-safe delivery for cupcakes, treats and select
                celebration cakes. Wedding cakes include on-site set-up.
              </p>
            </div>
          </Reveal>
          <Reveal delay={220}>
            <div className="h-full bg-card p-8 shadow-[0_20px_50px_-35px_rgba(53,42,45,0.45)]">
              <Mail className="h-6 w-6 text-rose" />
              <h3 className="mt-4 font-serif text-2xl font-medium text-ink">
                Get in touch
              </h3>
              <ul className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 shrink-0 text-gold" />
                  <a href="mailto:hello@sugarloomcakes.co.uk" className="hover:text-rose">
                    hello@sugarloomcakes.co.uk
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 shrink-0 text-gold" />
                  <a href="tel:+441214960314" className="hover:text-rose">
                    +44 (0)121 496 0314
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex gap-3">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Facebook, label: "Facebook" },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#contact"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-ink/70 transition-colors hover:border-rose hover:bg-rose hover:text-cream"
                  >
                    <Icon className="h-4.5 w-4.5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="bg-ink py-16 text-cream/70">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              A premium UK cake and bakery studio creating handmade cakes and
              sweet treats for birthdays, weddings and celebrations.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#contact"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-blush hover:text-blush"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-blush hover:text-blush"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-blush">
              Explore
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-cream">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#order" className="transition-colors hover:text-cream">
                  Custom Cakes
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[0.68rem] font-medium uppercase tracking-[0.26em] text-blush">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>14 Lavender Row, Harborne</li>
              <li>Birmingham B17 0AA</li>
              <li>
                <a href="mailto:hello@sugarloomcakes.co.uk" className="transition-colors hover:text-cream">
                  hello@sugarloomcakes.co.uk
                </a>
              </li>
              <li>
                <a href="tel:+441214960314" className="transition-colors hover:text-cream">
                  +44 (0)121 496 0314
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 text-xs md:flex-row">
          <p>© {new Date().getFullYear()} Sugarloom Cakes. Baked with love in the UK.</p>
          <div className="flex gap-6">
            <a href="#home" className="transition-colors hover:text-cream">
              Privacy Policy
            </a>
            <a href="#home" className="transition-colors hover:text-cream">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------------- page ---------------------------------- */

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedCakes />
        <Collections />
        <Wedding />
        <CustomCakes />
        <Gallery />
        <Testimonials />
        <FinalCta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
