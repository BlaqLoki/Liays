/**
 * Every price Liays charges, in one place.
 *
 * The homepage ledger, /services and /pricing all read from here. They drifted
 * before — the homepage advertised a marketing retainer at the price of a care
 * plan — and a studio whose entire pitch is published pricing cannot afford a
 * number that contradicts itself two clicks later.
 *
 * `founding` is a real, time-boxed decision, not a fake countdown: the rate
 * goes up after the third client because the portfolio is worth more then.
 * When that happens, change `foundingSlotsLeft` and nothing else.
 */

export const foundingSlotsLeft = 3;

export type Offer = {
  id: string;
  name: string;
  price: string;
  priceAfter?: string;
  unit: string;
  promise: string;
  includes: string[];
  terms?: string;
};

export const website: Offer = {
  id: "website",
  name: "Five-Day Lead-Ready Website",
  price: "$995",
  priceAfter: "$1,295",
  unit: "one-time",
  promise:
    "A one-page site built to do one job: help someone find you, trust you, and call you. Live within five business days of you sending the material.",
  includes: [
    "Mobile-friendly one-page website",
    "Professional copywriting — we write it, you approve it",
    "Services, testimonials and contact details",
    "Click-to-call and click-to-text buttons",
    "Quote or booking-request form",
    "Google Maps and social links",
    "Basic local SEO so you turn up in nearby searches",
    "Your domain connected",
    "Two rounds of revisions",
  ],
  terms:
    "50% to start, 50% before launch. The five days begin when your photos, services and details arrive — not before.",
};

export const carePlan: Offer = {
  id: "care",
  name: "Care plan",
  price: "$99",
  unit: "per month · optional",
  promise:
    "Hosting sorted, backups running, and a real person to email when something needs changing.",
  includes: [
    "Hosting coordination and domain renewal",
    "Automatic backups",
    "Minor changes — hours, services, photos",
    "Support by email",
  ],
};

export const contentPack: Offer = {
  id: "content",
  name: "Launch Content Package",
  price: "$399",
  unit: "one-time · after your site is live",
  promise:
    "The month of content that gets the new site seen, instead of it sitting there.",
  includes: [
    "Eight social posts, written and scheduled",
    "Three promotional scripts",
    "Two narrated short videos",
    "One customer follow-up email",
    "A month of content planned out",
  ],
};

export const aiSprint: Offer = {
  id: "ai-sprint",
  name: "AI Workflow Sprint",
  price: "$1,500",
  unit: "introductory",
  promise:
    "Not another introduction-to-ChatGPT seminar. We build three workflows into how your team actually works, then train them on the ones they'll use.",
  includes: [
    "60-minute workflow discovery session",
    "Three custom AI workflows, built for your business",
    "A reusable prompt library your team owns",
    "Three written SOPs",
    "90-minute staff training session",
    "Three short narrated training videos",
    "30 days of email support",
  ],
  terms: "Best fit for teams of 5–30 — professional services, non-profits, real estate, associations.",
};

export const notion: Offer = {
  id: "notion",
  name: "Notion training",
  price: "$750",
  unit: "half-day session",
  promise:
    "A focused session that leaves your team with a workspace they built and will actually keep using.",
  includes: [
    "Live workspace build",
    "Custom templates for your workflows",
    "Written recap",
    "14 days of async support",
  ],
};

/**
 * Add-on with no published price yet. Deliberately not invented — see the note
 * at the top of this file. Give it a number and it joins the ledger.
 */
export const audioAddOn: Offer = {
  id: "audio",
  name: "Jingle or custom background music",
  price: "Let's talk",
  unit: "add-on",
  promise:
    "An original short jingle or a background bed for your videos and phone hold.",
  includes: ["Original composition", "Two revisions", "Cleared for your commercial use"],
};

/** The homepage ledger — the three a first-time visitor needs to price. */
export const ledger = [
  { service: website.name, price: website.price, note: `then ${website.priceAfter}` },
  { service: aiSprint.name, price: aiSprint.price, note: "introductory" },
  { service: carePlan.name, price: carePlan.price, note: "per month, optional" },
];

/** Who the website offer is actually for. Used on /services. */
export const bestFit = [
  "You have 10–20+ Google reviews and nothing to send people to",
  "You have a Facebook page doing the work a website should do",
  "Your site exists but is broken, slow, or unusable on a phone",
  "One customer is worth several hundred dollars or more to you",
];
