import useLenis from './hooks/useLenis'
import Navbar         from './components/Navbar'
import HeroSection    from './components/HeroSection'
import MarqueeStrip   from './components/MarqueeStrip'
import WorksSection   from './components/WorksSection'
import AboutSection   from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Footer         from './components/Footer'
import AllWorkPage    from './components/AllWorkPage'

export default function App() {
  // Init smooth scroll globally
  useLenis()

  return (
    <>
      {/* Fixed navigation */}
      <Navbar />

      {/* "See more" page — slides over the site, under the navbar. Opens at  #/work */}
      <AllWorkPage />

      {/* ── Page sections in order ─────────────────────── */}
      <main>

        {/* 1. Full-screen hero with animated text */}
        <HeroSection />

        {/* 2. Scrolling ticker strip */}
        <MarqueeStrip bordered />

        {/* 3. Featured work — horizontal scroll */}
        <WorksSection />

        {/* 4. Marquee between sections (reversed direction) */}
        <MarqueeStrip direction="right" bg="var(--surface)" bordered />

        {/* 5. About me */}
        <AboutSection />

        {/* Photo gallery (Still Frames) is hidden for now.
            To bring it back: add
              import PhotoGallery from './components/PhotoGallery'
            at the top and put <PhotoGallery /> right here. */}

        {/* 6. Contact form */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}