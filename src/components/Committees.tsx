"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  committeeData,
  type AccentColor,
  type CommitteePatron,
  type CommitteeLead,
  type CommitteePerson,
  type CommitteeCategory,
} from "@/config/committeeData";

/* ═══════════════════════════════════════════════════════════════
   COLOR MAPS — all Tailwind classes spelled out statically
   ═══════════════════════════════════════════════════════════════ */
const colorMap: Record<
  AccentColor,
  {
    border: string;
    ring: string;
    glow: string;
    badge: string;
    badgeText: string;
    text: string;
    avatarBg: string;
    headerBg: string;
    chevron: string;
    divider: string;
  }
> = {
  cyan: { border: "border-cyan-400/30", ring: "ring-cyan-400/40", glow: "0 0 24px rgba(34,211,238,0.15)", badge: "bg-cyan-400/15", badgeText: "text-cyan-300", text: "text-cyan-300", avatarBg: "bg-cyan-900/40", headerBg: "bg-cyan-400/5", chevron: "text-cyan-400", divider: "border-cyan-400/20" },
  gold: { border: "border-yellow-400/30", ring: "ring-yellow-400/40", glow: "0 0 24px rgba(250,204,21,0.15)", badge: "bg-yellow-400/15", badgeText: "text-yellow-300", text: "text-yellow-300", avatarBg: "bg-yellow-900/40", headerBg: "bg-yellow-400/5", chevron: "text-yellow-400", divider: "border-yellow-400/20" },
  pink: { border: "border-pink-400/30", ring: "ring-pink-400/40", glow: "0 0 24px rgba(244,114,182,0.15)", badge: "bg-pink-400/15", badgeText: "text-pink-300", text: "text-pink-300", avatarBg: "bg-pink-900/40", headerBg: "bg-pink-400/5", chevron: "text-pink-400", divider: "border-pink-400/20" },
  violet: { border: "border-violet-400/30", ring: "ring-violet-400/40", glow: "0 0 24px rgba(167,139,250,0.15)", badge: "bg-violet-400/15", badgeText: "text-violet-300", text: "text-violet-300", avatarBg: "bg-violet-900/40", headerBg: "bg-violet-400/5", chevron: "text-violet-400", divider: "border-violet-400/20" },
  orange: { border: "border-orange-400/30", ring: "ring-orange-400/40", glow: "0 0 24px rgba(251,146,60,0.15)", badge: "bg-orange-400/15", badgeText: "text-orange-300", text: "text-orange-300", avatarBg: "bg-orange-900/40", headerBg: "bg-orange-400/5", chevron: "text-orange-400", divider: "border-orange-400/20" },
  emerald: { border: "border-emerald-400/30", ring: "ring-emerald-400/40", glow: "0 0 24px rgba(52,211,153,0.15)", badge: "bg-emerald-400/15", badgeText: "text-emerald-300", text: "text-emerald-300", avatarBg: "bg-emerald-900/40", headerBg: "bg-emerald-400/5", chevron: "text-emerald-400", divider: "border-emerald-400/20" },
  rose: { border: "border-rose-400/30", ring: "ring-rose-400/40", glow: "0 0 24px rgba(251,113,133,0.15)", badge: "bg-rose-400/15", badgeText: "text-rose-300", text: "text-rose-300", avatarBg: "bg-rose-900/40", headerBg: "bg-rose-400/5", chevron: "text-rose-400", divider: "border-rose-400/20" },
  blue: { border: "border-blue-400/30", ring: "ring-blue-400/40", glow: "0 0 24px rgba(96,165,250,0.15)", badge: "bg-blue-400/15", badgeText: "text-blue-300", text: "text-blue-300", avatarBg: "bg-blue-900/40", headerBg: "bg-blue-400/5", chevron: "text-blue-400", divider: "border-blue-400/20" },
  amber: { border: "border-amber-400/30", ring: "ring-amber-400/40", glow: "0 0 24px rgba(251,191,36,0.15)", badge: "bg-amber-400/15", badgeText: "text-amber-300", text: "text-amber-300", avatarBg: "bg-amber-900/40", headerBg: "bg-amber-400/5", chevron: "text-amber-400", divider: "border-amber-400/20" },
  red: { border: "border-red-400/30", ring: "ring-red-400/40", glow: "0 0 24px rgba(248,113,113,0.15)", badge: "bg-red-400/15", badgeText: "text-red-300", text: "text-red-300", avatarBg: "bg-red-900/40", headerBg: "bg-red-400/5", chevron: "text-red-400", divider: "border-red-400/20" },
};

/* ═══════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════ */
function initials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 1 && !["Mr.", "Mrs.", "Ms.", "Dr."].includes(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

/* ═══════════════════════════════════════════════════════════════
   AVATAR — circular, photo-ready with graceful fallback
   ═══════════════════════════════════════════════════════════════ */
type AvatarSize = "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps {
  name: string;
  photoUrl: string | null;
  size?: AvatarSize;
  borderClass?: string;
  textClass?: string;
  bgClass?: string;
}

const sizeMap: Record<AvatarSize, { wrapper: string; text: string }> = {
  sm: { wrapper: "w-10 h-10", text: "text-[11px]" },
  md: { wrapper: "w-12 h-12", text: "text-xs" },
  lg: { wrapper: "w-16 h-16", text: "text-sm" },
  xl: { wrapper: "w-20 h-20", text: "text-lg" },
  "2xl": { wrapper: "w-24 h-24", text: "text-2xl" },
};

function Avatar({
  name,
  photoUrl,
  size = "md",
  borderClass = "border-marigold/30",
  textClass = "text-marigold",
  bgClass = "bg-marigold/10",
}: AvatarProps) {
  const [imgError, setImgError] = useState(false);
  const { wrapper, text } = sizeMap[size];
  const showImg = !!photoUrl && !imgError;

  return (
    <div
      className={`shrink-0 ${wrapper} rounded-full overflow-hidden border ${borderClass} flex items-center justify-center ${showImg ? "" : bgClass}`}
    >
      {showImg ? (
        <img
          src={photoUrl!}
          alt={name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className={`font-display font-bold ${text} ${textClass} select-none`}>
          {initials(name)}
        </span>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PATRON CARD — horizontal, gold-themed
   ═══════════════════════════════════════════════════════════════ */
function PatronCard({ patron, index }: { patron: CommitteePatron; index: number }) {
  return (
    <motion.div
      className="relative glass rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-marigold/20 overflow-hidden flex flex-col items-center text-center gap-2 sm:gap-3 h-full"
      style={{ boxShadow: "0 0 20px rgba(245,166,35,0.07)" }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marigold/40 to-transparent" />

      <Avatar
        name={patron.name}
        photoUrl={patron.photoUrl}
        size="lg"
        borderClass="border-marigold/40"
        textClass="text-marigold"
        bgClass="bg-marigold/10"
      />
      <div className="flex flex-col items-center gap-1 w-full mt-auto">
        <p className="text-cream font-display font-semibold text-[11px] sm:text-sm leading-tight line-clamp-2">{patron.name}</p>
        <p className="text-[8px] sm:text-[10px] text-gold-shimmer/60 font-body tracking-wide uppercase line-clamp-2">{patron.designation}</p>
        <span className="mt-1 px-2 sm:px-3 py-1 rounded-full bg-marigold/10 border border-marigold/25 text-[8px] sm:text-[9px] font-body font-bold tracking-widest text-marigold uppercase">
          {patron.role}
        </span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   CORE CARD — centered profile, gold glow, permanently visible
   ═══════════════════════════════════════════════════════════════ */
function CoreCard({ member, index }: { member: CommitteeLead; index: number }) {
  return (
    <motion.div
      className="relative glass rounded-[1.5rem] sm:rounded-[2rem] p-4 sm:p-6 border border-marigold/35 overflow-hidden flex flex-col items-center text-center gap-3 sm:gap-4 h-full"
      style={{ boxShadow: "0 0 32px rgba(245,166,35,0.12), inset 0 1px 0 rgba(245,166,35,0.08)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-marigold/60 to-transparent" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-marigold/5 blur-2xl pointer-events-none" />

      {/* Large circle avatar */}
      <div className="relative">
        <Avatar
          name={member.name}
          photoUrl={member.photoUrl}
          size="2xl"
          borderClass="border-marigold/50"
          textClass="text-marigold"
          bgClass="bg-marigold/10"
        />
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full ring-2 ring-marigold/20 animate-pulse-gold pointer-events-none" />
      </div>

      <div className="w-full mt-auto">
        <p className="text-cream font-display font-bold text-sm sm:text-lg md:text-xl leading-tight mb-1 line-clamp-2">{member.name}</p>
        <p className="text-[10px] sm:text-xs text-gold-shimmer/60 font-body line-clamp-2">{member.designation}</p>
      </div>

      <span className="px-3 sm:px-4 py-1.5 rounded-full bg-marigold/15 border border-marigold/30 text-[8px] sm:text-[10px] font-body font-bold tracking-[0.15em] text-marigold uppercase">
        {member.role}
      </span>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   LEAD CARD — inside accordion, centered profile, colored accent
   ═══════════════════════════════════════════════════════════════ */
function LeadCard({
  lead,
  colors,
}: {
  lead: CommitteeLead;
  colors: (typeof colorMap)[AccentColor];
}) {
  return (
    <div
      className={`relative rounded-xl sm:rounded-2xl p-3 sm:p-5 bg-black/20 border ${colors.border} ring-1 ${colors.ring} overflow-hidden flex flex-col items-center text-center gap-2 sm:gap-3 h-full`}
      style={{ boxShadow: colors.glow }}
    >
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${colors.text} opacity-50`} />

      {/* Circular avatar */}
      <Avatar
        name={lead.name}
        photoUrl={lead.photoUrl}
        size="md"
        borderClass={colors.border}
        textClass={colors.text}
        bgClass={colors.avatarBg}
      />

      <div className="w-full mt-auto">
        <p className="text-cream font-display font-semibold text-[11px] sm:text-[15px] leading-tight mb-1 line-clamp-2">{lead.name}</p>
        <p className={`text-[9px] sm:text-[11px] font-body ${colors.text} opacity-75 line-clamp-2`}>{lead.designation}</p>
      </div>

      <div className="flex flex-col items-center gap-1 sm:gap-1.5 mt-1">
        <span className={`px-2 sm:px-3 py-1 rounded-full ${colors.badge} border ${colors.border} text-[8px] sm:text-[9px] font-body font-bold tracking-[0.12em] uppercase ${colors.badgeText} animate-pulse`}>
          ◆ Lead
        </span>
        <span className={`text-[9px] sm:text-[11px] font-body font-semibold ${colors.text}`}>{lead.role}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MEMBER CARD — 2-column photo grid inside accordion
   ═══════════════════════════════════════════════════════════════ */
function MemberCard({
  member,
  colors,
  index,
}: {
  member: CommitteePerson;
  colors: (typeof colorMap)[AccentColor];
  index: number;
}) {
  return (
    <motion.div
      className="flex flex-col items-center text-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/10 transition-all duration-200 h-full"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03, ease: "easeOut" }}
    >
      <Avatar
        name={member.name}
        photoUrl={member.photoUrl}
        size="md"
        borderClass={colors.border}
        textClass={colors.text}
        bgClass={colors.avatarBg}
      />
      <div className="w-full mt-auto">
        <p className="text-cream/90 font-body text-[11px] sm:text-sm leading-tight font-medium mb-1 line-clamp-2">{member.name}</p>
        <p className="text-cream/40 font-body text-[9px] sm:text-[11px] line-clamp-2">{member.designation}</p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   ACCORDION COMMITTEE CARD
   ═══════════════════════════════════════════════════════════════ */
function CommitteeCard({
  category,
  isOpen,
  onToggle,
  index,
}: {
  category: CommitteeCategory;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const colors = colorMap[category.color];
  const panelId = `panel-${category.id}`;
  const headerId = `header-${category.id}`;
  const totalPeople = category.leads.length + category.members.length;

  return (
    <motion.div
      className={`relative rounded-2xl border ${colors.border} overflow-hidden bg-black/30 backdrop-blur-md transition-shadow duration-500`}
      style={isOpen ? { boxShadow: colors.glow } : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top accent line */}
      <div className={`absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-current to-transparent ${colors.text} ${isOpen ? "opacity-90" : "opacity-40"} transition-opacity duration-300`} />

      {/* ── Header / Tap target ── */}
      <button
        id={headerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className={`w-full flex items-center gap-3 px-4 text-left min-h-[56px] transition-colors duration-200 ${colors.headerBg} ${isOpen ? `border-b ${colors.border}` : ""}`}
      >
        <div className={`shrink-0 w-2 h-2 rounded-full ${isOpen ? "animate-pulse" : ""} ${colors.text.replace("text-", "bg-").replace("-300", "-400")}`} />
        <div className="flex-1 min-w-0">
          <span className={`font-display font-semibold text-sm sm:text-[15px] leading-tight transition-colors duration-200 ${isOpen ? colors.text : "text-cream"}`}>
            {category.title}
          </span>
          <span className="ml-2 text-[10px] font-body text-cream/35 tracking-wide">
            {totalPeople} {totalPeople === 1 ? "member" : "members"}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`shrink-0 ${colors.chevron}`}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </button>

      {/* ── Expanded Panel ── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-4 pt-4 pb-5 space-y-4">

              {/* Lead photo-cards — dynamic grid based on count */}
              {category.leads.length > 0 && (
                <div className={`grid gap-2 sm:gap-4 ${category.leads.length === 1 ? "grid-cols-1 max-w-[280px] mx-auto" :
                    category.leads.length === 2 ? "grid-cols-2" :
                      category.leads.length === 3 ? "grid-cols-3" :
                        category.leads.length >= 4 ? "grid-cols-2" : "grid-cols-2"
                  }`}>
                  {category.leads.map((lead, i) => (
                    <LeadCard key={i} lead={lead} colors={colors} />
                  ))}
                </div>
              )}

              {/* Members — responsive photo grid */}
              {category.members.length > 0 && (
                <div className={`border-t ${colors.divider} pt-4 mt-4`}>
                  <p className={`text-[10px] font-body uppercase tracking-[0.2em] ${colors.text} opacity-55 mb-4 text-center`}>
                    Committee Members
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
                    {category.members.map((member, i) => (
                      <MemberCard key={i} member={member} colors={colors} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION LABEL DIVIDER
   ═══════════════════════════════════════════════════════════════ */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-marigold/30" />
      <span className="text-[11px] font-body uppercase tracking-[0.25em] text-marigold/55 whitespace-nowrap px-1">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-marigold/30" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════ */
export default function Committees() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggle = (id: string) =>
    setOpenCategory((prev) => (prev === id ? null : id));

  return (
    <section
      id="committees"
      className="relative py-20 sm:py-28 overflow-x-hidden"
      aria-labelledby="committees-heading"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] max-w-2xl h-64 rounded-full bg-marigold/[0.04] blur-[80px]" />
        <div className="absolute bottom-1/3 right-0 w-64 h-64 rounded-full bg-terracotta/[0.05] blur-[60px]" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4">

        {/* ── Section Header ── */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center justify-center gap-4 mb-4">
            <img
              src="/enthuzea-logo-Photoroom.svg"
              alt="Enthuzea Logo"
              className="h-28 sm:h-36 w-auto object-contain drop-shadow-[0_0_20px_rgba(245,166,35,0.4)]"
              loading="lazy"
            />
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-marigold/50" />
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-marigold/50" />
            </div>
          </div>
          <h1 id="committees-heading" className="font-display font-black text-3xl sm:text-4xl text-cream leading-tight">
            Organizing <span className="text-gradient-gold">Committee</span>
          </h1>
          <p className="mt-3 text-sm text-cream/50 font-body max-w-sm mx-auto leading-relaxed">
            The dedicated team behind Enthuzea 2k26 — bringing culture, art, and energy together.
          </p>
        </motion.div>

        {/* ── Patrons & Advisors ── */}
        <SectionLabel>Patrons & Advisors</SectionLabel>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-12">
          {committeeData.patrons.map((patron, i) => (
            <PatronCard key={patron.name} patron={patron} index={i} />
          ))}
        </div>

        {/* ── Core Leadership ── */}
        <SectionLabel>Core Leadership</SectionLabel>
        <div className="grid grid-cols-2 gap-2 sm:gap-6 mb-14">
          {committeeData.core.map((member, i) => (
            <CoreCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* ── Sub-Committees (accordion) ── */}
        <SectionLabel>Sub-Committees</SectionLabel>
        <div className="space-y-3" role="list">
          {committeeData.categories.map((cat, i) => (
            <div key={cat.id} role="listitem">
              <CommitteeCard
                category={cat}
                isOpen={openCategory === cat.id}
                onToggle={() => toggle(cat.id)}
                index={i}
              />
            </div>
          ))}
        </div>

        {/* Footer ornament */}
        <motion.div
          className="mt-16 flex flex-col items-center gap-4 opacity-40"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src="/enthuzea-logo-Photoroom.svg"
            alt="Enthuzea Logo"
            className="h-16 sm:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(245,166,35,0.3)]"
            loading="lazy"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-px h-8 bg-gradient-to-b from-marigold to-transparent" />
            <span className="text-[10px] font-body uppercase tracking-[0.3em] text-marigold">SVIST</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
