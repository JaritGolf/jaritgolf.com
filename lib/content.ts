import contentData from '@/content.json';

// TypeScript interfaces matching content.json structure
export interface HeroSection {
  headline: string;
  subheadline: string;
  cta_buttons: string[];
}

export interface Card {
  title: string;
  content: string;
}

export interface ProblemSection {
  header: string;
  cards: Card[];
}

export interface ValueProposition {
  title: string;
  content: string;
}

export interface SolutionSection {
  header: string;
  value_propositions: ValueProposition[];
}

export interface Feature {
  title: string;
  description: string;
}

export interface FeaturesGrid {
  header: string;
  features: Feature[];
}

export interface Stat {
  metric: string;
  description: string;
}

export interface SuccessMetricsSection {
  header: string;
  stats: Stat[];
}

export interface Philosophy {
  title: string;
  content: string;
}

export interface TrainingPhilosophySection {
  header: string;
  philosophies: Philosophy[];
}

export interface CTASection {
  header: string;
  buttons: string[];
}

export interface HomepageContent {
  hero_section: HeroSection;
  problem_section: ProblemSection;
  solution_section: SolutionSection;
  features_grid: FeaturesGrid;
  success_metrics_section: SuccessMetricsSection;
  training_philosophy_section: TrainingPhilosophySection;
  cta_section: CTASection;
}

export interface ProductHeroSection {
  headline: string;
  price: string;
  cta_buttons: string[];
}

export interface Spec {
  title: string;
  description: string;
}

export interface ProductDetailsSection {
  header: string;
  specs: Spec[];
}

export interface Program {
  title: string;
  description: string;
}

export interface TrainingProgramsSection {
  header: string;
  programs: Program[];
}

export interface ProductPageContent {
  hero_section: ProductHeroSection;
  product_details_section: ProductDetailsSection;
  training_programs_section: TrainingProgramsSection;
}

// Export functions to get content
export function getHomepageContent(): HomepageContent {
  return contentData.website.homepage;
}

export function getProductPageContent(): ProductPageContent {
  return contentData.website.product_page;
}


