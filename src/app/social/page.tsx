import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getSiteData } from '@/lib/siteData';

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
    ? <span key="ig">Instagram</span>
    : <span key="fb">Facebook</span>;

export default async function SocialPage() {
  const siteData = await getSiteData();
  const calendar = buildCalendar(siteData.name, siteData.phone, siteData.city);
  return (
    <>
      <section>
        <div>
          <h1>Social Media</h1>
          <p>Managed social media marketing for {siteData.name} — powered by Boatwork.</p>
          <div>
            {siteData.social.instagram && (
              <a href={siteData.social.instagram} target="_blank" rel="noopener noreferrer">
                {getInstagramHandle(siteData.social.instagram)}
              </a>
            )}
            {siteData.social.facebook && (
              <a href={siteData.social.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
          </div>
        </div>
      </section>

      <section>
        <div>
          <h2>Our Strategy</h2>
          <p>
            Four content pillars, seven posts per week across Instagram and Facebook. Every post uses real photos from our work — no stock, no filler.
          </p>
        </div>

        <div>
          <div>
            <p>4x</p>
            <p>Instagram / week</p>
          </div>
          <div>
            <p>3x</p>
            <p>Facebook / week</p>
          </div>
          <div>
            <p>7</p>
            <p>Total posts / week</p>
          </div>
          <div>
            <p>0</p>
            <p>Stock photos used</p>
          </div>
        </div>

        <div>
          {pillars.map((p) => (
            <div key={p.label}>
              <div>
                <p>{p.label}</p>
                <span>{p.pct}</span>
              </div>
              <p>{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div>
          <h2>Weekly Content Calendar</h2>
          <p>Sample week of content — copy written, platforms assigned, hashtags ready.</p>
        </div>

        <div>
          {calendar.map((item) => (
            <div key={item.day}>
              <div>
                <p>{item.day}</p>
                <div>
                  {item.platforms.map(platformLabel)}
                </div>
                <p>{item.format}</p>
              </div>
              <div>
                <p>{item.copy}</p>
                <p>{item.tags}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div>
          <p>Powered by</p>
          <div>
            <Image
              src={siteData.boatwork.logoUrl}
              alt="Boatwork"
              width={160}
              height={40}
              unoptimized
            />
          </div>
          <p>
            Social media management, website hosting, Boatwork reviews integration, and 24/7 AI support — all in one place.
          </p>
          <Link href="/contact">
            Get Started with Boatwork
          </Link>
        </div>
      </section>
    </>
  );
}
