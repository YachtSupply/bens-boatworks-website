export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';

import { getSiteData } from '@/lib/siteData';

export async function generateMetadata(): Promise<Metadata> {
  const siteConfig = await getSiteData();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
  return {
    title: 'Privacy Policy',
    description: `Privacy Policy for ${siteConfig.name}.`,
    alternates: {
      canonical: siteUrl ? `${siteUrl}/privacy` : '/privacy',
    },
  };
}

export default async function PrivacyPage() {
  const siteConfig = await getSiteData();
  const contactEmail = siteConfig.email || 'info@example.com';

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-brand text-white pt-[72px]">
        <div className="max-w-page mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-2xl">
            <p className="text-accent text-[11px] font-semibold uppercase tracking-[0.15em] mb-3">Legal</p>
            <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-white/50 text-base leading-relaxed">How {siteConfig.name} collects, uses, and protects your information.</p>
          </div>
        </div>
      </section>

      {/* ─── CONTENT ─── */}
      <section className="bg-sand py-24 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-10">
            <p className="text-ink-light text-sm mb-10">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2 className="font-heading text-xl font-extrabold text-brand tracking-tight mb-3">1. Who We Are</h2>
            <p className="text-ink-muted text-base leading-relaxed mb-10">
              {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a marine services business located in {siteConfig.city}, {siteConfig.state}.
              This Privacy Policy explains how we handle personal information collected through our website.
            </p>

            <h2 className="font-heading text-xl font-extrabold text-brand tracking-tight mb-3">2. Information We Collect</h2>
            <p className="text-ink-muted text-base leading-relaxed mb-3">We may collect the following types of information:</p>
            <ul className="space-y-2 mb-10">
              <li className="text-ink-muted text-base leading-relaxed pl-4 border-l-2 border-accent/30"><strong className="text-brand">Contact form submissions</strong> — your name, email address, phone number, and message when you reach out to us.</li>
              <li className="text-ink-muted text-base leading-relaxed pl-4 border-l-2 border-accent/30"><strong className="text-brand">Usage data</strong> — anonymous analytics data (pages visited, browser type, referring site) collected via Google Analytics to help us improve this website.</li>
              <li className="text-ink-muted text-base leading-relaxed pl-4 border-l-2 border-accent/30"><strong className="text-brand">Cookies</strong> — Google Analytics places cookies on your device to distinguish unique visitors. You may disable cookies in your browser settings.</li>
            </ul>

            <h2 className="font-heading text-xl font-extrabold text-brand tracking-tight mb-3">3. How We Use Your Information</h2>
            <p className="text-ink-muted text-base leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="space-y-2 mb-10">
              <li className="text-ink-muted text-base leading-relaxed pl-4 border-l-2 border-accent/30">Respond to your inquiries and provide quotes for our services.</li>
              <li className="text-ink-muted text-base leading-relaxed pl-4 border-l-2 border-accent/30">Improve the content and usability of our website.</li>
              <li className="text-ink-muted text-base leading-relaxed pl-4 border-l-2 border-accent/30">Contact you regarding your service request.</li>
            </ul>

            <h2 className="font-heading text-xl font-extrabold text-brand tracking-tight mb-3">4. We Do Not Sell Your Data</h2>
            <p className="text-ink-muted text-base leading-relaxed mb-10">
              We do not sell, rent, or trade your personal information to any third parties. Your contact details are used solely to respond to your inquiry and deliver the services you request.
            </p>

            <h2 className="font-heading text-xl font-extrabold text-brand tracking-tight mb-3">5. Third-Party Services</h2>
            <p className="text-ink-muted text-base leading-relaxed mb-10">
              Our website uses Google Analytics to understand site traffic. Google Analytics may collect anonymized data about your visit. You can opt out via the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-dark transition-colors underline">
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>

            <h2 className="font-heading text-xl font-extrabold text-brand tracking-tight mb-3">6. Data Retention</h2>
            <p className="text-ink-muted text-base leading-relaxed mb-10">
              Contact form submissions are retained for as long as needed to respond to your inquiry or as required by applicable law. Analytics data is retained per Google Analytics default settings.
            </p>

            <h2 className="font-heading text-xl font-extrabold text-brand tracking-tight mb-3">7. Your Rights</h2>
            <p className="text-ink-muted text-base leading-relaxed mb-10">
              You may request access to, correction of, or deletion of any personal data we hold about you by contacting us at the email below. We will respond within a reasonable timeframe.
            </p>

            <h2 className="font-heading text-xl font-extrabold text-brand tracking-tight mb-3">8. Contact Us</h2>
            <p className="text-ink-muted text-base leading-relaxed mb-10">
              For any privacy-related questions or requests, please contact us at:{' '}
              <a href={`mailto:${contactEmail}`} className="text-accent hover:text-accent-dark transition-colors underline">
                {contactEmail}
              </a>
            </p>

            <div className="border-t border-sand-dark pt-6">
              <p className="text-ink-light text-sm">
                This policy applies to the website of {siteConfig.name} and does not govern third-party websites that may be linked from our pages.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
