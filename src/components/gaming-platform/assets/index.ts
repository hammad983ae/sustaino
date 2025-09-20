/**
 * ============================================================================
 * SUSTANO-SPHERE™ GAMING PLATFORM ASSETS
 * Asset exports for Gaming Platform Integration
 * 
 * © 2025 DeLorenzo Property Group Pty Ltd. All rights reserved.
 * ============================================================================
 */

// Re-export existing assets for gaming platform
export { default as sustainoSphereDashboard } from '@/assets/sustano-sphere-dashboard.jpg';
export { default as investmentPlatform } from '@/assets/investment-platform-interface.jpg';
export { default as financialReporting } from '@/assets/financial-reporting-platform.jpg';

// Gaming Platform Asset URLs (for external integration)
export const GAMING_ASSETS = {
  // Dashboard Screenshots
  DASHBOARD_MAIN: '/src/assets/sustano-sphere-dashboard.jpg',
  INVESTMENT_INTERFACE: '/src/assets/investment-platform-interface.jpg',
  FINANCIAL_REPORTING: '/src/assets/financial-reporting-platform.jpg',
  
  // Logo Assets (SVG data URIs for embedding)
  LOGO_PRIMARY: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8xXzEpIi8+CjxwYXRoIGQ9Ik0xMiAxNEwyMCAyNkwyOCAxNEgxMloiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MF9saW5lYXJfMV8xIiB4MT0iMCIgeTE9IjAiIHgyPSI0MCIgeTI9IjQwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiMyMkM1NUUiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMTBCOTgxIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHN2Zz4K',
  
  LOGO_ICON: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuNDEgOC41OUwyMCA5TDEzLjQxIDE1LjQxTDEyIDIyTDEwLjU5IDE1LjQxTDQgMTVMMTAuNTkgOC41OUwxMiAyWiIgZmlsbD0iIzIyQzU1RSIvPgo8L3N2Zz4K',
  
  // Gaming Platform Specific Icons
  GAMING_LOGO: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9InVybCgjZ3JhZGllbnQwX2xpbmVhcl8yXzEpIi8+CjxyZWN0IHg9IjEwIiB5PSIxNSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwIiByeD0iNSIgZmlsbD0id2hpdGUiLz4KPGNpcmNsZSBjeD0iMTUiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzIyQzU1RSIvPgo8Y2lyY2xlIGN4PSIyNSIgY3k9IjIwIiByPSIyIiBmaWxsPSIjMjJDNTVFIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50MF9saW5lYXJfMl8xIiB4MT0iMCIgeTE9IjAiIHgyPSI0MCIgeTI9IjQwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CjxzdG9wIHN0b3AtY29sb3I9IiM4QjVDRjYiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjJDNTVFIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPHN2Zz4K',
  
  // Background patterns
  GRID_PATTERN: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDIwIDAgTCAwIDAgMCAyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDM0LCAxOTcsIDk0LCAwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+CjwvcGF0dGVybj4KPC9kZWZzPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=',
};

// Mock data for gaming platform demos
export const GAMING_DEMO_DATA = {
  // Live auction assets
  demoAssets: [
    {
      id: 1,
      title: "EcoCommerce Platform",
      subtitle: "Sustainable E-commerce Solution • Monthly Revenue $52k",
      image: GAMING_ASSETS.DASHBOARD_MAIN,
      currentBid: 250000,
      esgScore: 92,
      monthlyRevenue: 52000,
      features: ["Carbon Neutral", "ESG Tracking", "Green Supply Chain"],
      category: "E-commerce",
      technology: ["React", "Node.js", "MongoDB"],
      users: 15000,
      location: "Global"
    },
    {
      id: 2,
      title: "FinTech ESG Dashboard",
      subtitle: "Sustainable Investment Platform • 500+ Enterprise Clients",
      image: GAMING_ASSETS.INVESTMENT_INTERFACE,
      currentBid: 180000,
      esgScore: 88,
      monthlyRevenue: 35000,
      features: ["ESG Analytics", "Impact Reporting", "Carbon Credits"],
      category: "FinTech",
      technology: ["Vue.js", "Python", "PostgreSQL"],
      users: 8500,
      location: "APAC"
    },
    {
      id: 3,
      title: "Green Tech Analytics",
      subtitle: "Environmental Impact Platform • AI-Powered Insights",
      image: GAMING_ASSETS.FINANCIAL_REPORTING,
      currentBid: 95000,
      esgScore: 96,
      monthlyRevenue: 28000,
      features: ["Climate Risk", "Sustainability Metrics", "AI Predictions"],
      category: "Analytics",
      technology: ["Angular", "Django", "Redis"],
      users: 5200,
      location: "Europe"
    }
  ],
  
  // Platform statistics
  platformStats: {
    totalAuctions: 156,
    activeUsers: 12500,
    totalVolume: 4200000,
    avgEsgScore: 94,
    categoriesSupported: 12,
    countriesActive: 25,
    dailyTransactions: 450,
    successRate: 97.3
  },
  
  // ESG categories and scoring
  esgCategories: {
    environmental: {
      carbonFootprint: { weight: 25, maxScore: 100 },
      energyEfficiency: { weight: 20, maxScore: 100 },
      wasteManagement: { weight: 15, maxScore: 100 },
      waterUsage: { weight: 10, maxScore: 100 },
      renewableEnergy: { weight: 20, maxScore: 100 },
      sustainablePractices: { weight: 10, maxScore: 100 }
    },
    social: {
      userPrivacy: { weight: 30, maxScore: 100 },
      accessibility: { weight: 25, maxScore: 100 },
      communityImpact: { weight: 20, maxScore: 100 },
      employeePractices: { weight: 15, maxScore: 100 },
      diversityInclusion: { weight: 10, maxScore: 100 }
    },
    governance: {
      dataTransparency: { weight: 30, maxScore: 100 },
      securityCompliance: { weight: 25, maxScore: 100 },
      ethicalPractices: { weight: 20, maxScore: 100 },
      regulatoryCompliance: { weight: 15, maxScore: 100 },
      stakeholderEngagement: { weight: 10, maxScore: 100 }
    }
  },
  
  // Gaming platform integration examples
  gamingIntegration: {
    achievements: [
      { name: "ESG Pioneer", description: "First sustainable auction", icon: "🌱", rarity: "legendary" },
      { name: "Green Bidder", description: "10 ESG auctions won", icon: "💚", rarity: "epic" },
      { name: "Carbon Neutral", description: "Zero carbon footprint", icon: "🍃", rarity: "rare" },
      { name: "Sustainability Expert", description: "95+ ESG score average", icon: "⭐", rarity: "legendary" }
    ],
    
    powerUps: [
      { name: "ESG Boost", effect: "+10% bidding power for green assets", duration: "1 hour", cost: 100 },
      { name: "Carbon Offset", effect: "Neutralize auction carbon footprint", duration: "permanent", cost: 50 },
      { name: "Sustainability Scanner", effect: "Reveal hidden ESG metrics", duration: "5 uses", cost: 200 }
    ],
    
    levels: [
      { level: 1, name: "Eco Novice", requirement: "Complete first ESG auction", rewards: ["ESG Badge", "50 Green Points"] },
      { level: 5, name: "Green Trader", requirement: "5 successful ESG auctions", rewards: ["ESG Boost PowerUp", "200 Green Points"] },
      { level: 10, name: "Sustainability Champion", requirement: "10 auctions with 90+ ESG score", rewards: ["Carbon Neutral Title", "500 Green Points"] },
      { level: 20, name: "ESG Master", requirement: "20 auctions, 95+ average ESG", rewards: ["Legendary ESG Badge", "1000 Green Points"] }
    ]
  }
};

// Color schemes for different gaming themes
export const GAMING_COLOR_SCHEMES = {
  default: {
    primary: 'rgb(34, 197, 94)',
    secondary: 'rgb(16, 185, 129)',
    accent: 'rgb(59, 130, 246)',
    background: 'rgb(15, 23, 42)',
    surface: 'rgb(30, 41, 59)',
    text: 'rgb(248, 250, 252)'
  },
  
  neon: {
    primary: 'rgb(0, 255, 127)',
    secondary: 'rgb(0, 255, 255)',
    accent: 'rgb(255, 0, 255)',
    background: 'rgb(0, 0, 0)',
    surface: 'rgb(20, 20, 20)',
    text: 'rgb(255, 255, 255)'
  },
  
  cyberpunk: {
    primary: 'rgb(255, 215, 0)',
    secondary: 'rgb(255, 105, 180)',
    accent: 'rgb(0, 255, 255)',
    background: 'rgb(10, 10, 30)',
    surface: 'rgb(25, 25, 45)',
    text: 'rgb(240, 240, 240)'
  },
  
  retro: {
    primary: 'rgb(255, 159, 28)',
    secondary: 'rgb(255, 99, 132)',
    accent: 'rgb(54, 162, 235)',
    background: 'rgb(44, 44, 84)',
    surface: 'rgb(64, 64, 104)',
    text: 'rgb(255, 255, 255)'
  }
};

// Export configuration for easy integration
export const INTEGRATION_CONFIG = {
  name: 'Sustano-Sphere™ Gaming Integration',
  version: '1.0.0',
  author: 'DeLorenzo Property Group Pty Ltd',
  license: 'Commercial',
  
  // Required dependencies
  dependencies: {
    react: '^18.3.1',
    'lucide-react': '^0.462.0',
    '@radix-ui/react-card': 'latest',
    '@radix-ui/react-button': 'latest',
    '@radix-ui/react-badge': 'latest',
    '@radix-ui/react-progress': 'latest',
    'tailwindcss': 'latest'
  },
  
  // Integration endpoints
  endpoints: {
    api: 'https://api.sustano-sphere.com/v1',
    websocket: 'wss://live.sustano-sphere.com',
    assets: 'https://cdn.sustano-sphere.com',
    docs: 'https://docs.sustano-sphere.com/gaming'
  },
  
  // Feature flags
  features: {
    liveAuctions: true,
    esgScoring: true,
    gamification: true,
    analytics: true,
    notifications: true,
    mobileOptimized: true,
    darkMode: true,
    customThemes: true
  }
};

export default {
  GAMING_ASSETS,
  GAMING_DEMO_DATA,
  GAMING_COLOR_SCHEMES,
  INTEGRATION_CONFIG
};