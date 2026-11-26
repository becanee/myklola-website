"use client";

import { Input } from "@/components/motion/input";
import { TextReveal } from "@/components/motion/text-reveal";
import { EASE_OUT } from "@/lib/ease";
import { useHoverCapable } from "@/lib/hooks/use-hover-capable";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Building2,
  ChevronDown,
  Clock,
  MapPin,
  Search,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useMemo, useState } from "react";
import {
  careerHero,
  CATEGORIES,
  EMPLOYMENT_TYPES,
  JOBS,
  WORK_MODES,
  type Category,
  type EmploymentType,
  type Job,
  type WorkMode,
} from "./content";

/** A pill filter. Selected state is a filled navy chip, unselected an outline. */
function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-foreground/15 text-muted-foreground hover:border-foreground/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function Meta({ icon: Icon, label }: { icon: typeof MapPin; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon aria-hidden className="size-3.5 shrink-0" />
      {label}
    </span>
  );
}

function JobRow({
  job,
  index,
  open,
  onToggle,
}: {
  job: Job;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);
  const canHover = useHoverCapable();
  const panelId = useId();
  const buttonId = useId();

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: dur(0.5), delay: dur((index % 5) * 0.05), ease: EASE_OUT }}
      className="border-t border-foreground/10"
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start gap-4 py-6 text-left lg:items-center lg:gap-6"
        >
          <span className="mt-0.5 shrink-0 font-mono text-[10px] tabular-nums tracking-[0.2em] text-muted-foreground/60 lg:mt-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="min-w-0 flex-1">
            <span className="block font-display text-xl leading-tight tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary lg:text-2xl">
              {job.title}
            </span>
            <span className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Meta icon={Building2} label={job.department} />
              <Meta icon={MapPin} label={job.location} />
              <Meta icon={Wallet} label={job.salary} />
              <Meta icon={Clock} label={job.type} />
            </span>
          </span>

          <span
            aria-hidden
            className={cn(
              "mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 text-foreground transition-all duration-300 lg:mt-0",
              canHover && "group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground",
            )}
          >
            <ChevronDown
              className={cn(
                "size-4 transition-transform duration-300",
                open && "rotate-180",
              )}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: dur(0.35), ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="grid gap-8 pb-8 pl-0 pt-1 sm:grid-cols-12 sm:gap-10 lg:pl-10">
              <div className="sm:col-span-5">
                <p className="text-[15px] leading-relaxed text-foreground/75">
                  {job.summary}
                </p>
                <dl className="mt-6 space-y-2 border-t border-foreground/10 pt-4 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Lokasi</dt>
                    <dd className="text-foreground">{job.location}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Tipe</dt>
                    <dd className="text-foreground">{job.type}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Perkiraan gaji</dt>
                    <dd className="text-right text-foreground">{job.salary}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Diposting</dt>
                    <dd className="text-foreground">{job.posted}</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-6 sm:col-span-7">
                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Yang akan Anda lakukan
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {job.responsibilities.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/75"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.62em] h-px w-3.5 shrink-0 bg-foreground/30"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Yang kami cari
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {job.requirements.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/75"
                      >
                        <span
                          aria-hidden
                          className="mt-[0.62em] h-px w-3.5 shrink-0 bg-foreground/30"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={`mailto:careers@klola.id?subject=${encodeURIComponent(
                    `Lamaran: ${job.title}`,
                  )}`}
                  className="inline-flex items-center gap-2 border border-primary bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-colors duration-300 hover:bg-primary/90"
                >
                  <Briefcase aria-hidden className="size-4" />
                  Lamar posisi ini
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function CareersModules() {
  const reduce = useReducedMotion();
  const dur = (d: number) => (reduce ? 0 : d);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "Semua">("Semua");
  const [mode, setMode] = useState<WorkMode | null>(null);
  const [type, setType] = useState<EmploymentType | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return JOBS.filter((job) => {
      if (category !== "Semua" && job.category !== category) return false;
      if (mode && job.location !== mode) return false;
      if (type && job.type !== type) return false;
      if (!q) return true;
      return (
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.summary.toLowerCase().includes(q)
      );
    });
  }, [query, category, mode, type]);

  const hasFilters = Boolean(query || mode || type || category !== "Semua");

  function clearAll() {
    setQuery("");
    setCategory("Semua");
    setMode(null);
    setType(null);
  }

  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="mx-auto max-w-[1400px] px-6 pt-32 lg:px-10 lg:pt-44">
        <div className="flex items-center gap-3">
          <motion.span
            aria-hidden
            className="h-px w-12 origin-left bg-foreground/25"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: dur(0.8), ease: EASE_OUT }}
          />
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            {careerHero.eyebrow}
          </span>
        </div>

        <div className="mt-7 grid items-end gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <TextReveal
              as="h1"
              text={careerHero.title}
              split="word"
              stagger={0.05}
              delay={0.18}
              blur={8}
              yOffset="35%"
              className="max-w-[20ch] font-display text-[clamp(2.2rem,5.2vw,3.8rem)] leading-[1.04] tracking-tight text-foreground"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(0.7), delay: dur(0.42), ease: EASE_OUT }}
              className="mt-7 max-w-[58ch] text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              {careerHero.description}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.8), delay: dur(0.3), ease: EASE_OUT }}
            className="lg:col-span-5"
          >
            <img
              src={careerHero.image}
              alt={careerHero.imageAlt}
              width={careerHero.imageWidth}
              height={careerHero.imageHeight}
              className="h-auto w-full max-w-[360px] lg:ml-auto lg:max-w-none"
            />
          </motion.div>
        </div>
      </section>

      {/* Listings */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="flex items-baseline justify-between gap-6 border-b border-foreground/10 pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          <span>01</span>
          <span className="flex-1">Open positions</span>
          <span className="tabular-nums text-muted-foreground/60">
            {String(JOBS.length).padStart(2, "0")}
          </span>
        </div>

        {/* Search + filters */}
        <div className="mt-8 space-y-5">
          <div className="max-w-xl">
            <Input
              type="search"
              placeholder="Cari posisi, tim, atau kata kunci"
              leftIcon={<Search className="h-4 w-4" />}
              value={query}
              onChange={(v: string) => setQuery(v)}
              aria-label="Cari karir atau magang"
            />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                Kategori
              </span>
              <FilterChip
                active={category === "Semua"}
                onClick={() => setCategory("Semua")}
              >
                Semua
              </FilterChip>
              {CATEGORIES.map((option) => (
                <FilterChip
                  key={option}
                  active={category === option}
                  onClick={() => setCategory(option)}
                >
                  {option}
                </FilterChip>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
                Lokasi
              </span>
              {WORK_MODES.map((option) => (
                <FilterChip
                  key={option}
                  active={mode === option}
                  onClick={() => setMode(mode === option ? null : option)}
                >
                  {option}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
              Tipe
            </span>
            {EMPLOYMENT_TYPES.map((option) => (
              <FilterChip
                key={option}
                active={type === option}
                onClick={() => setType(type === option ? null : option)}
              >
                {option}
              </FilterChip>
            ))}

            {hasFilters && (
              <button
                type="button"
                onClick={clearAll}
                className="ml-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                <X aria-hidden className="size-3" />
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Result count — announced, not just shown */}
        <p aria-live="polite" className="mt-6 text-xs text-muted-foreground">
          {results.length} posisi
          {hasFilters ? " sesuai filter" : " tersedia"}
        </p>

        <ul className="mt-2">
          <AnimatePresence initial={false} mode="popLayout">
            {results.map((job, index) => (
              <JobRow
                key={job.id}
                job={job}
                index={index}
                open={openId === job.id}
                onToggle={() => setOpenId(openId === job.id ? null : job.id)}
              />
            ))}
          </AnimatePresence>
        </ul>

        {results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: dur(0.4), ease: EASE_OUT }}
            className="border-t border-foreground/10 py-16 text-center"
          >
            <p className="font-display text-xl tracking-tight text-foreground">
              Belum ada posisi yang cocok.
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Coba hapus sebagian filter, atau kirim lamaran spontan ke{" "}
              <a
                href="mailto:careers@klola.id"
                className="text-foreground underline underline-offset-4"
              >
                careers@klola.id
              </a>
              .
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 border border-foreground/20 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-secondary"
            >
              Reset filter
            </button>
          </motion.div>
        )}
      </section>
    </main>
  );
}
