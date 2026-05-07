import { Toaster } from "./components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { ResumeSection } from "./components/ResumeSection";
import { TimelineSection } from "./components/TimelineSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { GallerySection } from "./components/GallerySection";
import { CertificatesSection } from "./components/CertificatesSection";
import { BlogSection } from "./components/BlogSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ResumeSection />
        <TimelineSection />
        <AchievementsSection />
        <GallerySection />
        <CertificatesSection />
        <BlogSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}