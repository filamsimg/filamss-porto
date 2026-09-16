'use client';

import SmoothScroll from '@/components/site/smooth-scroll';
import TopBar from '@/components/site/top-bar';
import FloatingNav from '@/components/site/floating-nav';
import QuickInfoTab from '@/components/site/quick-info-tab';
import ScrollIndicator from '@/components/site/scroll-indicator';
import ScrollProgressBar from '@/components/site/scroll-progress-bar';
import SocialIcons from '@/components/site/social-icons';

import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import PlayReelSection from '@/components/sections/play-reel';
import RecentWorksSection from '@/components/sections/recent-works';
import ContactFooter from '@/components/sections/contact-footer';

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative w-full bg-[#e8e8e4] text-[#111111]">
        <TopBar />
        <FloatingNav />
        <QuickInfoTab />
        <ScrollIndicator />
        <ScrollProgressBar />
        <SocialIcons />
        <HeroSection />
        <PlayReelSection />
        <AboutSection />
        <RecentWorksSection />
        <ContactFooter />
      </main>
    </SmoothScroll>
  );
}

