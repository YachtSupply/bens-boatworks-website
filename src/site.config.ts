// ============================================================
// site.config.ts — Static fallback configuration for Marine Pro
//
// This file provides default values used when the Boatwork API
// is unavailable. Replace the placeholder values with real data
// for each deployed site.
// ============================================================

export const TEMPLATE_VERSION = '1.2.8';

export type BoatworkEventType =
  | 'profile.updated'
  | 'review.created'
  | 'reviews.new'
  | 'verification.updated'
  | 'verification.badge'
  | 'photo.added'
  | 'photo.deleted'
  | 'video.added'
  | 'video.deleted'
  | 'badge.awarded'
  | 'badge.revoked'
  | 'social.post.published'
  | 'social.subscription.updated'
  | '*';

export interface OutboundWebhookConfig {
  url: string;
  event: BoatworkEventType;
  enabled: boolean;
  secret?: string;
}

export const siteConfig = {
  // ── Core business info ────────────────────────────────────
  name: 'Ben\'s Boatworks ',
  tagline: 'Born in the water ',
  description: 'Professional yacht management and marine repair services delivered with precision and care.',
  about: 'Marine Pro is a full-service marine contractor specializing in yacht management, repairs, and maintenance. Our experienced team delivers quality workmanship on every job.',
  phone: '(555) 555-5555',
  email: 'jruytenbeek@gmail.com',
  address: '123 Marina Way, Fort Lauderdale, FL 33316',
  location: '123 Marina Way, Fort Lauderdale, FL 33316',
  city: 'Annapolis',
  state: 'MD',
  logoUrl: 'https://boatwork-images.s3.us-east-1.amazonaws.com/52890708-685a-4a15-bd2f-b3847385b8bd.jpg',

  // ── Boatwork integration ──────────────────────────────────
  boatwork: {
    profileSlug: 'bens-boatworks',
    profileId: 'e9bee299-0a52-4ff0-8b2b-55f218bf6c0f', // UUID — set during provisioning, permanent link to profile
    profileUrl: 'https://boatwork.co/pro/template/',
    logoUrl: '/boatwork-logo.svg',
    useLiveReviews: false,
    staticReviews: [
      {
        id: null as string | null,
        author: 'John D.',
        rating: 5,
        text: 'Outstanding service — the team was professional, thorough, and on time.',
        date: '2024-11-01',
        isVerified: false,
        response: null as string | null,
        responseDate: null as string | null,
      },
      {
        id: null as string | null,
        author: 'Sarah M.',
        rating: 5,
        text: 'They handled everything from engine maintenance to detailing. Highly recommend.',
        date: '2024-10-15',
        isVerified: false,
        response: null as string | null,
        responseDate: null as string | null,
      },
    ],
  },

  // ── Services ──────────────────────────────────────────────
  services: [
    {
      name: 'Yacht Management',
      description: 'Comprehensive yacht management including scheduling, crew coordination, and maintenance oversight.',
      icon: 'wheel',
    },
    {
      name: 'General Marine Repair & Maintenance',
      description: 'Full-service repairs and preventive maintenance to keep your vessel in peak condition.',
      icon: 'wrench',
    },
    {
      name: 'Deck & Fiberglass Repair',
      description: 'Expert deck restoration and fiberglass repair using marine-grade materials.',
      icon: 'anchor',
    },
    {
      name: 'Marine Electricians & Electronics',
      description: 'Installation, repair, and troubleshooting of all marine electrical systems and electronics.',
      icon: 'electric',
    },
    {
      name: 'Engine Maintenance & Repair',
      description: 'Diesel and gas engine servicing, overhauls, and emergency repairs.',
      icon: 'engine',
    },
  ],

  // ── Common projects ───────────────────────────────────────
  commonProjects: [
    'Annual engine service',
    'Bottom paint & hull cleaning',
    'Fiberglass restoration',
    'Electrical rewiring',
    'Teak deck repair',
    'Rigging inspection & replacement',
  ],

  // ── Portfolio ─────────────────────────────────────────────
  portfolio: [
    {
      src: '/portfolio/boat-1.jpg',
      caption: 'Full refit — 52ft motor yacht',
    },
    {
      src: '/portfolio/boat-2.jpg',
      caption: 'Fiberglass repair and repaint',
    },
    {
      src: '/portfolio/boat-3.jpg',
      caption: 'Engine overhaul — twin diesels',
    },
  ],

  // ── Videos ───────────────────────────────────────────────
  videos: [] as Array<{ src: string; poster: string; caption: string }>,

  // ── Service area ─────────────────────────────────────────
  serviceArea: [
    'Fort Lauderdale',
    'Miami',
    'Palm Beach',
    'Boca Raton',
    'Broward County',
    'Miami-Dade County',
  ],
  serviceAreaDescription: 'Based in Fort Lauderdale, FL, serving the surrounding marine community from Miami to Palm Beach.',

  // ── SEO ───────────────────────────────────────────────────
  seo: {
    titleTemplate: '%s | Marine Pro',
    defaultTitle: 'Marine Pro — Yacht & Marine Services in Fort Lauderdale',
    description: 'Expert yacht management, marine repair, and maintenance services in Fort Lauderdale, FL. Licensed, insured, and Boatwork-verified.',
    keywords: [
      'marine repair',
      'yacht management',
      'boat maintenance',
      'Fort Lauderdale marine',
      'fiberglass repair',
      'marine electrician',
    ],
  },

  // ── Hours of operation ────────────────────────────────────
  hoursOfOperation: {
    Monday: '8:00 AM – 5:00 PM',
    Tuesday: '8:00 AM – 5:00 PM',
    Wednesday: '8:00 AM – 5:00 PM',
    Thursday: '8:00 AM – 5:00 PM',
    Friday: '8:00 AM – 5:00 PM',
    Saturday: '9:00 AM – 2:00 PM',
    Sunday: 'Closed',
  } as Record<string, string>,

  // ── Social media ─────────────────────────────────────────
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
    youtube: null as string | null,
  },

  // ── Boatwork badge (optional override) ───────────────────
  badge: null as { profileUrl?: string } | null,

  // ── Resend email ─────────────────────────────────────────
  resend: {
    fromEmail: 'noreply@marinepro.example.com',
    toEmail: 'info@marinepro.example.com',
  },

  // ── Outbound webhooks (optional) ─────────────────────────
  outboundWebhooks: [] as OutboundWebhookConfig[],
};
