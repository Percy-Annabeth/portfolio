// ─────────────────────────────────────────────────────────────
//  SITE IMAGES — change a picture in ONE place, here.
// ─────────────────────────────────────────────────────────────

// Profile photo (Google Drive). Used in the hero (small pill) and the About section.
// The Drive file must be shared as "Anyone with the link".
// For the most reliable loading, you can instead save the photo into public/images/
// as profile.jpg and set this to '/images/profile.jpg'.
export const PROFILE_PHOTO =
  'https://drive.google.com/thumbnail?id=181OIZXZeXGZYy4esppFTccg12vTzOd4a&sz=w1200'

// Hero background — a file from your laptop.
// Put it in  public/images/  and name it  hero-bg  (jpg, jpeg, png or webp all work).
// The site tries each of these in order until one loads.
export const HERO_BG_CANDIDATES = [
  '/images/hero-bg.jpg',
  '/images/hero-bg.jpeg',
  '/images/hero-bg.png',
  '/images/hero-bg.webp',
  '/images/hero-bg.JPG',
  '/images/hero-bg.JPEG',
  '/images/hero-bg.PNG',
  '/images/hero-bg.jpg.jpg',
  '/images/hero-bg.png.png',
]

// Shown only if the file above is missing, so the hero is never empty.
export const HERO_BG_FALLBACK =
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&q=85'
