import { UserFeedback } from '../types/feedback';

export interface PersonaScenario {
  id: string;
  personaName: string;
  personaRole: string;
  avatar: string;
  category: 'ui-issue' | 'usability-problem' | 'bug' | 'design-suggestion' | 'accessibility';
  title: string;
  description: string;
  targetPage: string;
  targetComponent: string;
  deviceContext: 'mobile' | 'tablet' | 'desktop';
  rating: number;
  sentiment: 'frustrated' | 'negative' | 'neutral' | 'positive';
}

export const SYNTHETIC_PERSONA_SCENARIOS: PersonaScenario[] = [
  {
    id: 'persona-mobile-login',
    personaName: 'Sarah Jenkins',
    personaRole: 'Mobile Smartphone User',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    category: 'ui-issue',
    title: 'The login button is difficult to see on mobile devices',
    description: 'When accessing the portal on my iPhone 14, the login CTA gets cramped into the bottom edge with tiny text and is nearly impossible to tap accurately.',
    targetPage: 'login',
    targetComponent: 'LoginPage.tsx',
    deviceContext: 'mobile',
    rating: 2,
    sentiment: 'frustrated'
  },
  {
    id: 'persona-pricing-contrast',
    personaName: 'Marcus Vance',
    personaRole: 'Enterprise Procurement Lead',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    category: 'accessibility',
    title: 'Pricing card feature list is hard to read in dark mode',
    description: 'The feature bullets under the Pro Tier are dark grey on dark slate background. It strains my eyes and fails basic accessibility contrast standards.',
    targetPage: 'pricing',
    targetComponent: 'PricingPage.tsx',
    deviceContext: 'desktop',
    rating: 2,
    sentiment: 'negative'
  },
  {
    id: 'persona-hero-cta',
    personaName: 'Elena Rostova',
    personaRole: 'Growth & Conversion Specialist',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    category: 'usability-problem',
    title: 'Main CTA button on hero banner lacks visual dominance',
    description: 'The Get Started button blends in too much with the background mesh gradient. It needs higher visual punch, modern hover state, and clear icon affordance.',
    targetPage: 'hero',
    targetComponent: 'HeroLandingPage.tsx',
    deviceContext: 'desktop',
    rating: 3,
    sentiment: 'neutral'
  },
  {
    id: 'persona-dashboard-density',
    personaName: 'David Chen',
    personaRole: 'Senior Data Analyst',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    category: 'design-suggestion',
    title: 'Telemetry table rows are too cramped for quick review',
    description: 'Would love a comfort density view or better visual status tags for anomaly detection on the telemetry table.',
    targetPage: 'dashboard',
    targetComponent: 'DashboardPage.tsx',
    deviceContext: 'desktop',
    rating: 3,
    sentiment: 'neutral'
  }
];

export function generateSyntheticFeedback(scenario: PersonaScenario): UserFeedback {
  return {
    id: `fb-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    author: {
      name: scenario.personaName,
      role: scenario.personaRole,
      avatarUrl: scenario.avatar,
      isSimulated: true,
      personaType: scenario.personaRole,
    },
    category: scenario.category,
    title: scenario.title,
    description: scenario.description,
    targetPage: scenario.targetPage,
    targetComponent: scenario.targetComponent,
    deviceContext: scenario.deviceContext,
    rating: scenario.rating,
    sentiment: scenario.sentiment,
    status: 'new'
  };
}
