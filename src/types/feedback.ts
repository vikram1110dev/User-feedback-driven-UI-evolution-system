export type FeedbackCategory = 
  | 'ui-issue' 
  | 'usability-problem' 
  | 'bug' 
  | 'design-suggestion' 
  | 'feature-request' 
  | 'accessibility';

export type FeedbackSeverity = 'critical' | 'high' | 'medium' | 'low';

export type FeedbackStatus = 
  | 'new' 
  | 'analyzed' 
  | 'proposal-created' 
  | 'approved' 
  | 'rejected' 
  | 'modifying'
  | 'deployed';

export type DeviceContext = 'mobile' | 'tablet' | 'desktop';

export interface PinLocation {
  x: number; // percentage of viewport width
  y: number; // percentage of viewport height
}

export interface UserFeedback {
  id: string;
  timestamp: string;
  author: {
    name: string;
    role: string;
    avatarUrl?: string;
    isSimulated?: boolean;
    personaType?: string;
  };
  category: FeedbackCategory;
  title: string;
  description: string;
  targetPage: string; // e.g. 'login', 'pricing', 'hero', 'dashboard', 'settings'
  targetComponent?: string; // e.g. 'LoginForm.tsx', 'PricingCard.tsx'
  targetElementSelector?: string; // CSS selector of highlighted element
  elementBoundingRect?: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  pinLocation?: PinLocation;
  deviceContext: DeviceContext;
  rating: number; // 1-5 stars
  sentiment: 'positive' | 'neutral' | 'negative' | 'frustrated';
  status: FeedbackStatus;
  proposalId?: string;
}
