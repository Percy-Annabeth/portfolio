import useLenis from './hooks/useLenis'
import CustomCursor   from './components/CustomCursor'
import Navbar         from './components/Navbar'
import HeroSection    from './components/HeroSection'
import MarqueeStrip   from './components/MarqueeStrip'
import WorksSection   from './components/WorksSection'
import PhotoGallery   from './components/PhotoGallery'
import VideoSection   from './components/VideoSection'
import AboutSection   from './components/AboutSection'
import SkillsSection  from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import Footer         from './components/Footer'

export default function App() {
  // Init smooth scroll globally
  useLenis()

  return (
    <>
      {/* Custom cursor — renders on top of everything */}
      <CustomCursor />

      {/* Fixed navigation */}
      <Navbar />

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

        {/* 6. Photo gallery — masonry grid */}
        <PhotoGallery />

        {/* 7. Film & video showcase */}
        <VideoSection />

        {/* 8. Skills / services accordion */}
        <SkillsSection />

        {/* 9. Contact form */}
        <ContactSection />

      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}