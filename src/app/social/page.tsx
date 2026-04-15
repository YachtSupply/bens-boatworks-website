import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteData } from '@/lib/siteData';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSiteData();
  return {
    title: 'Social Media',
    description: `Social media marketing strategy and content calendar for ${data.name} — managed by Boatwork.`,
  };
}

const pillars = [
  {
    label: 'The Work',
    pct: '40%',
    description: 'Real job photos and videos. Before/afters, project walkthroughs, and completed work. No stock photos — ever.',
  },
  {
    label: 'Education',
    pct: '25%',
    description: 'Quick tips for yacht owners. Positions us as the expert and builds trust before they call.',
  },
  {
    label: 'Social Proof',
    pct: '20%',
    description: 'Real reviews, client shoutouts, and completed project reveals pulled directly from our Boatwork profile.',
  },
  {
    label: 'Lifestyle',
    pct: '15%',
    description: 'Marina life, sunsets, and the boating lifestyle. Aspirational and authentic.',
  },
];

function buildCalendar(name: string, phone: string, city: string) {
  return [
    {
      day: 'Monday',
      platforms: ['instagram', 'facebook'],
      format: 'Before & After Photo',
      copy: `Another transformation complete. Before and after from a recent project in ${city}. This is what dedication to craft looks like. Worth every minute.`,
      tags: `#${name.replace(/\s+/g, '')} #${city.replace(/\s+/g, '')} #YachtMaintenance #MarineServices`,
    },
    {
      day: 'Tuesday',
      platforms: ['instagram'],
      format: 'Video Reel',
      copy: 'Your yacht deserves this level of attention. See what we do for our clients. Link in bio to request a quote.',
      tags: '#YachtManagement #MarineServices #BoatMaintenance',
    },
    {
      day: 'Wednesday',
      platforms: ['facebook'],
      format: 'Educational Post',
      copy: `3 things every boat owner should check before the season:\n\n1. Through-hulls and seacocks — can you close them?\n2. Zincs — are they depleted?\n3. Running gear — any growth or dings on the prop?\n\nWe handle all of this. Call ${phone}.`,
      tags: `#YachtMaintenance #${city.replace(/\s+/g, '')} #BoatCare`,
    },
    {
      day: 'Thursday',
      platforms: ['instagram'],
      format: 'Detail / Close-Up Photo',
      copy: 'The details matter. Freshly refinished running gear on a recent haulout. Everything below the waterline protected and dialed in.',
      tags: `#YachtDetailing #BottomPaint #${city.replace(/\s+/g, '')}Yachts`,
    },
    {
      day: 'Friday',
      platforms: ['instagram', 'facebook'],
      format: 'Review Spotlight',
      copy: `See what our clients are saying about ${name} on Boatwork. Real reviews from real boat owners. ⭐⭐⭐⭐⭐\n\nThis is why we do what we do.`,
      tags: `#ClientReview #Boatwork #${name.replace(/\s+/g, '')}`,
    },
    {
      day: 'Saturday',
      platforms: ['instagram'],
      format: 'Lifestyle / Marina Shot',
      copy: `Another week on the water. ${city}'s marine community is something special. Proud to keep these vessels running.`,
      tags: `#${city.replace(/\s+/g, '')} #MarineLife #YachtLife #Boating`,
    },
    {
      day: 'Sunday',
      platforms: ['facebook'],
      format: 'Service Spotlight',
      copy: `Did you know ${name} handles full yacht management programs? From routine maintenance to emergency repairs — one call, one team, everything handled.`,
      tags: '#YachtManagement #MarineServices #BoatManagement',
    },
  ];
}

/** Extract Instagram handle from URL, e.g. "https://instagram.com/foo" → "@foo" */
function getInstagramHandle(url: string): string {
  try {
    const pathname = new URL(url).pathname.replace(/\/+$/, '');
    const handle = pathname.split('/').pop();
    return handle ? `@${handle}` : 'Instagram';
  } catch {
    return 'Instagram';
  }
}

const platformLabel = (p: string) =>
  p === 'instagram'
    ? <span key="ig" className="text-[11px] font-semibold uppercase tracking-wider bg-accent/10 text-accent px-2.5 py-1 rounded-full">Instagram</span>
    : <span key="fb" className="text-[11px] font-semibold uppercase tracking-wider bg-brand/10 text-brand px-2.5 py-1 rounded-full">Facebook</span>;

export default async function SocialPage() {
  const siteData = await getSiteData();
  const calendar = buildCalendar(siteData.name, siteData.phone, siteData.city);
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-brand text-white pt-[72px]">
        <div className="max-w-page mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">Social Media</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Social Media</h1>
            <p className="text-white/50 text-base leading-relaxed mb-6">Managed social media marketing for {siteData.name} — powered by Boatwork.</p>
            <div className="flex flex-wrap gap-3">
              {siteData.social.instagram && (
                <a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent text-sm font-semibold transition-colors flex items-center gap-1.5">
                  {getInstagramHandle(siteData.social.instagram)} <ArrowUpRight size={13} strokeWidth={2} />
                </a>
              )}
              {siteData.social.facebook && (
                <a href={siteData.social.facebook} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent text-sm font-semibold transition-colors flex items-center gap-1.5">
                  Facebook <ArrowUpRight size={13} strokeWidth={2} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── STRATEGY ─── */}
      <section className="bg-white py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">Strategy</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight mb-4">Our Strategy</h2>
            <p className="text-ink-muted text-base leading-relaxed">
              Four content pillars, seven posts per week across Instagram and Facebook. Every post uses real photos from our work — no stock, no filler.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            <div className="bg-sand rounded-2xl p-6 text-center">
              <p className="font-heading text-3xl font-extrabold text-accent">4x</p>
              <p className="text-ink-muted text-sm mt-1">Instagram / week</p>
            </div>
            <div className="bg-sand rounded-2xl p-6 text-center">
              <p className="font-heading text-3xl font-extrabold text-accent">3x</p>
              <p className="text-ink-muted text-sm mt-1">Facebook / week</p>
            </div>
            <div className="bg-sand rounded-2xl p-6 text-center">
              <p className="font-heading text-3xl font-extrabold text-accent">7</p>
              <p className="text-ink-muted text-sm mt-1">Total posts / week</p>
            </div>
            <div className="bg-sand rounded-2xl p-6 text-center">
              <p className="font-heading text-3xl font-extrabold text-accent">0</p>
              <p className="text-ink-muted text-sm mt-1">Stock photos used</p>
            </div>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pillars.map((p) => (
              <div key={p.label} className="bg-sand rounded-2xl p-7">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-heading font-extrabold text-brand">{p.label}</p>
                  <span className="text-accent font-heading font-extrabold text-lg">{p.pct}</span>
                </div>
                <p className="text-ink-muted text-sm leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CALENDAR ─── */}
      <section className="bg-sand py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto">
          <div className="max-w-2xl mb-14">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-2">Calendar</p>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-brand tracking-tight mb-4">Weekly Content Calendar</h2>
            <p className="text-ink-muted text-base leading-relaxed">Sample week of content — copy written, platforms assigned, hashtags ready.</p>
          </div>

          <div className="space-y-4">
            {calendar.map((item) => (
              <div key={item.day} className="bg-white rounded-2xl p-6 md:p-7">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                  <p className="font-heading font-extrabold text-brand text-lg">{item.day}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.platforms.map(platformLabel)}
                  </div>
                  <p className="text-ink-light text-[12px] uppercase tracking-wider sm:ml-auto">{item.format}</p>
                </div>
                <div className="border-t border-sand pt-4">
                  <p className="text-ink-muted text-sm leading-relaxed whitespace-pre-line mb-3">{item.copy}</p>
                  <p className="text-accent text-[12px]">{item.tags}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── POWERED BY ─── */}
      <section className="bg-brand py-24 px-5 sm:px-8">
        <div className="max-w-page mx-auto text-center max-w-2xl">
          <p className="text-white/40 text-[11px] font-semibold uppercase tracking-[0.15em] mb-6">Powered by</p>
          <div className="flex justify-center mb-6">
            <Image
              src={siteData.boatwork.logoUrl}
              alt="Boatwork"
              width={160}
              height={40}
              unoptimized
            />
          </div>
          <p className="text-white/50 text-base leading-relaxed mb-8">
            Social media management, website hosting, Boatwork reviews integration, and 24/7 AI support — all in one place.
          </p>
          <Link href="/contact" className="bg-accent hover:bg-accent-dark text-white font-semibold text-[12px] uppercase tracking-wider px-7 py-4 rounded-full transition-colors inline-flex items-center gap-2">
            Get Started with Boatwork <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </>
  );
}
