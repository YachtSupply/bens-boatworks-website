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
      <section>
        <div>
          <h1>Privacy Policy</h1>
          <p>How {siteConfig.name} collects, uses, and protects your information.</p>
        </div>
      </section>

      <section>
        <div>
          <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

          <h2>1. Who We Are</h2>
          <p>
            {siteConfig.name} (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a marine services business located in {siteConfig.city}, {siteConfig.state}.
            This Privacy Policy explains how we handle personal information collected through our website.
          </p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Contact form submissions</strong> — your name, email address, phone number, and message when you reach out to us.</li>
            <li><strong>Usage data</strong> — anonymous analytics data (pages visited, browser type, referring site) collected via Google Analytics to help us improve this website.</li>
            <li><strong>Cookies</strong> — Google Analytics places cookies on your device to distinguish unique visitors. You may disable cookies in your browser settings.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Respond to your inquiries and provide quotes for our services.</li>
            <li>Improve the content and usability of our website.</li>
            <li>Contact you regarding your service request.</li>
          </ul>

          <h2>4. We Do Not Sell Your Data</h2>
          <p>
            We do not sell, rent, or trade your personal information to any third parties. Your contact details are used solely to respond to your inquiry and deliver the services you request.
          </p>

          <h2>5. Third-Party Services</h2>
          <p>
            Our website uses Google Analytics to understand site traffic. Google Analytics may collect anonymized data about your visit. You can opt out via the{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            Contact form submissions are retained for as long as needed to respond to your inquiry or as required by applicable law. Analytics data is retained per Google Analytics default settings.
          </p>

          <h2>7. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of any personal data we hold about you by contacting us at the email below. We will respond within a reasonable timeframe.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            For any privacy-related questions or requests, please contact us at:{' '}
            <a href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </p>

          <div>
            <p>
              This policy applies to the website of {siteConfig.name} and does not govern third-party websites that may be linked from our pages.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
