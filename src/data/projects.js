// ─────────────────────────────────────────────────────────────
//  FEATURED VIDEOS — shown in the "Selected Work" section
//
//  Each video lives on Google Drive. To add / swap one:
//   1. In Drive, set the file to  Share → General access → "Anyone with the link"
//   2. Copy the file ID from its link:
//        https://drive.google.com/file/d/ THIS_PART /view
//   3. Paste it as `driveId` below. The thumbnail and the player are built from it.
//
//  Title / category are free text — edit them whenever you like.
//  `year` and `description` are optional: leave them out (or '') to hide them.
// ─────────────────────────────────────────────────────────────

// "See more" button in Selected Work opens this Drive folder
export const MORE_WORK_URL =
  'https://drive.google.com/drive/folders/1sweEMBdNRdT9jccZtFsPsta-YruSApgm'

export const projects = [
  {
    id: 1,
    title: 'Ather Konarc',
    category: 'Film',
    year: '',
    description: '',
    driveId: '14GzS7DgeUIdLnYJg9I-OiFeZHw8jB48c',
    tags: ['Video'],
  },
  {
    id: 2,
    title: 'Faheem — BLR Highlight',
    category: 'Highlight',
    year: '',
    description: '',
    driveId: '15s9pNibFrr9izrypx2UVVwhCIBbLU5yn',
    tags: ['Video'],
  },
  {
    id: 3,
    title: 'Nicleya x VISA — Tap to Pay',
    category: 'Brand',
    year: '',
    description: '',
    driveId: '1BaDOzV5BOqNnOOiT8gpTP4iuK0ofPSdQ',
    tags: ['Video'],
  },
  {
    id: 4,
    title: 'RS Mumbai Aftermovie',
    category: 'Aftermovie',
    year: '',
    description: '',
    driveId: '1TjyaxO7TTlSFV6wjyDQQzshKhlfjTHUC',
    tags: ['Video'],
  },
  {
    id: 5,
    title: 'Hyundai x ICC — BLR Wrap',
    category: 'Event Wrap',
    year: '',
    description: '',
    driveId: '1dofDt7rmykeg_jGBAIHxwvFvT6lxLsrx',
    tags: ['Video'],
  },
  {
    id: 6,
    title: 'HBI Pop-up Park — Wrap Up',
    category: 'Event Wrap',
    year: '',
    description: '',
    driveId: '1iEZc8EOkVpLJcTci9bcUjPUhiQnRvKOh',
    tags: ['Video'],
  },
]

// ─────────────────────────────────────────────────────────────
//  YOUR SKILLS / SERVICES — shown in the skills section
// ─────────────────────────────────────────────────────────────
export const skills = [
  {
    number: '01',
    title: 'Photography',
    description: 'Editorial, commercial, portrait. Every frame is a decision.',
  },
  {
    number: '02',
    title: 'Videography',
    description: 'Reels, documentaries, brand films. Built for attention.',
  },
  {
    number: '03',
    title: 'Creative Direction',
    description: 'Concept to execution. Strategy behind every visual.',
  },
  {
    number: '04',
    title: 'Post Production',
    description: 'Colour grading, editing, motion. The final 20% that matters most.',
  },
]

// ─────────────────────────────────────────────────────────────
//  MARQUEE TEXT — scrolling strip between sections
// ─────────────────────────────────────────────────────────────
export const marqueeItems = [
  'Photography',
  '✦',
  'Videography',
  '✦',
  'Creative Direction',
  '✦',
  'Brand Films',
  '✦',
  'Colour Grading',
  '✦',
  'Storytelling',
  '✦',
  'Post Production',
  '✦',
]