/**
 * Booking links.
 *
 * One place to change them. If the Cal.com username or event slugs ever move,
 * this is the only file that needs editing.
 *
 * Which link goes where:
 *   FREE_CONSULT  — low-commitment first conversation. Anything phrased as
 *                   "book", "talk", or "consult".
 *   PROJECT_CALL  — someone who already wants to buy. "Start a project",
 *                   "get a quote", the pricing page.
 *
 * The contact form stays as the async path for people who would rather write
 * than talk. Both routes matter — don't collapse them into one.
 */

export const BOOKING = {
  freeConsult: "https://cal.com/liays/free-consult",
  projectCall: "https://cal.com/liays/project-call",
} as const;
