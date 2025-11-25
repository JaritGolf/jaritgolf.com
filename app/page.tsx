import ParallaxHero from './components/ParallaxHero';
import HorizontalScrollGallery from './components/HorizontalScrollGallery';
import HorizontalScrollGallery2 from './components/HorizontalScrollGallery2';
import ModesScrollSection from './components/ModesScrollSection';
import ProductPinSection from './components/ProductPinSection';
import RefinedStatsSection from './components/RefinedStatsSection';
import RefinedFeaturesGrid from './components/RefinedFeaturesGrid';
import RefinedTrainingPhilosophy from './components/RefinedTrainingPhilosophy';
import RefinedCTA from './components/RefinedCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ParallaxHero />
      <HorizontalScrollGallery />
      <HorizontalScrollGallery2 />
      <ProductPinSection />
      <ModesScrollSection />
      <RefinedStatsSection />
      <RefinedFeaturesGrid />
      <RefinedTrainingPhilosophy />
      <RefinedCTA />
    </main>
  );
}

