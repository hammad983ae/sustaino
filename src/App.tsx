/**
 * ============================================================================
 * PROPRIETARY AND CONFIDENTIAL
 * Copyright © 2025 DeLorenzo Property Group Pty Ltd. All Rights Reserved.
 * 
 * This software contains valuable trade secrets and proprietary information.
 * Unauthorized reproduction, distribution, or reverse engineering is strictly
 * prohibited and will be prosecuted to the full extent of the law.
 * 
 * PATENT PENDING: Multiple patent applications protect core algorithms
 * TRADEMARK: Sustaino-Sphere™, Auction-Sphere™, POWERED™ are registered trademarks
 * ============================================================================
 */

import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReportDataProvider } from "@/contexts/ReportDataContext";
import { BrandingProvider } from "@/contexts/BrandingContext";
import { PropertyProvider } from "@/contexts/PropertyContext";
import { ValuationProvider } from "@/contexts/ValuationContext";
import Index from "./pages/Index";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
import AutomatedValuation from "./pages/AutomatedValuation";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancelled from "./pages/PaymentCancelled";
import IPLicensingAgreement from "./components/IPLicensingAgreement";
import LegalComplianceDashboard from "./components/LegalComplianceDashboard";
import TermsOfService from "./components/TermsOfService";
import PrivacyPolicy from "./components/PrivacyPolicy";
import RenewableEnergyValuations from "./components/RenewableEnergyValuations";
import PropertyValuations from "./pages/PropertyValuations";
import PropertyAssessment from "./pages/PropertyAssessment";
import WorkHubPage from "./pages/WorkHub";
import WhiteLabelConfig from "./pages/WhiteLabelConfig";
import ClientDemo from "./pages/ClientDemo";
import AuthPage from "./pages/Auth";
import AutomatedReport from "./pages/AutomatedReport";
import ComprehensivePropertyValuation from "./components/ComprehensivePropertyValuation";
import CryptoTradingDashboard from "./pages/CryptoTradingDashboard";
import Dashboard from "./pages/Dashboard";
import AutomaticFolderManager from "./components/AutomaticFolderManager";
import CostaGroupValuationsPage from "./pages/CostaGroupValuations";
import ComprehensiveValuationAnalysis from "./pages/ComprehensiveValuationAnalysis";
import ESGClimateAssessment from "./pages/ESGClimateAssessment";
import FullScreenDemo from "./pages/FullScreenDemo";
import SocialDemo from "./pages/SocialDemo";
import InsuranceValuationsPage from "./pages/InsuranceValuations";
import FinancialReporting from "./pages/FinancialReporting";
import RentRevisionPage from "./pages/RentRevision";
import RentDeterminationPage from "./pages/RentDeterminationPage";
import PlantAndEquipmentPage from "./pages/PlantAndEquipmentPage";
import InformationMemorandum from "./pages/InformationMemorandum";
import InvestmentPlatformPage from "./pages/InvestmentPlatform";
import BrickByBrickPage from "./pages/BrickByBrick";
import ESGStrategyAnalysis from "./pages/ESGStrategyAnalysis";
import SAMPlatform from "./pages/SAMPlatform";
import DataBases from "./pages/DataBases";
import RealitySales from "./pages/RealitySales";
import AuctionSpherePOSPage from "./pages/AuctionSpherePOS";
import AdvertisingPlatforms from "./pages/AdvertisingPlatforms";
import BrochureViewer from "./pages/BrochureViewer";
import DevelopmentSiteValuation from "./pages/DevelopmentSiteValuation";
import NASDAQCompetitorAnalysis from "./components/NASDAQCompetitorAnalysis";
import DigitalAssetValuationEngine from "./components/DigitalAssetValuationEngine";
import ComprehensivePlatformValuation from "./components/ComprehensivePlatformValuation";
import SustanoSphereMarketStrategy from "./components/SustanoSphereMarketStrategy";
import SustanoSphereDigitalAssetValuation from "./components/SustanoSphereDigitalAssetValuation";
import MilduraPropertyValuation from "./components/MilduraPropertyValuation";
import MilduraValuationReport from "./components/MilduraValuationReport";
import LovablePartnershipProposal from "./components/LovablePartnershipProposal";
import SocialMediaAssets from "./pages/SocialMediaAssets";
import ConceptsAndPlans from "./pages/ConceptsAndPlans";
import DigitalContracts from "./pages/DigitalContracts";
import Marketing from "./pages/Marketing";
import { EPAT } from "./components/EPAT";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrandingProvider>
      <PropertyProvider>
        <ReportDataProvider>
          <ValuationProvider>
            <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/automated-valuation" element={<AutomatedValuation />} />
                <Route path="/index" element={<Index />} />
                <Route path="/report" element={<Report />} />
                <Route path="/renewable-energy" element={<RenewableEnergyValuations />} />
                <Route path="/property-assessment" element={<PropertyAssessment />} />
        <Route path="/automated-report" element={<AutomatedReport propertyType="commercial" />} />
                <Route path="/property-valuations" element={<PropertyValuations />} />
                <Route path="/work-hub" element={<WorkHubPage />} />
                <Route path="/white-label" element={<WhiteLabelConfig />} />
                <Route path="/client-demo" element={<ClientDemo />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/comprehensive-valuation" element={<ComprehensivePropertyValuation />} />
                <Route path="/comprehensive-valuation-analysis" element={<ComprehensiveValuationAnalysis />} />
                <Route path="/crypto-trading" element={<CryptoTradingDashboard />} />
                <Route path="/costa-group-valuations" element={<CostaGroupValuationsPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/folder-manager" element={<AutomaticFolderManager />} />
                <Route path="/esg-climate-assessment" element={<ESGClimateAssessment />} />
                <Route path="/insurance-valuations" element={<InsuranceValuationsPage />} />
                <Route path="/fullscreen-demo" element={<FullScreenDemo />} />
                <Route path="/social-demo" element={<SocialDemo />} />
                <Route path="/financial-reporting" element={<FinancialReporting />} />
                <Route path="/rent-revision" element={<RentRevisionPage />} />
                <Route path="/rent-determination" element={<RentDeterminationPage />} />
                <Route path="/plant-equipment" element={<PlantAndEquipmentPage />} />
                <Route path="/information-memorandum" element={<InformationMemorandum />} />
                <Route path="/investment-platform" element={<InvestmentPlatformPage />} />
                <Route path="/brick-by-brick" element={<BrickByBrickPage />} />
                <Route path="/esg-strategy-analysis" element={<ESGStrategyAnalysis />} />
                <Route path="/sam-platform" element={<SAMPlatform />} />
                <Route path="/databases" element={<DataBases />} />
                <Route path="/reality-sales" element={<RealitySales />} />
                <Route path="/auction-sphere-pos" element={<AuctionSpherePOSPage />} />
                <Route path="/advertising-platforms" element={<AdvertisingPlatforms />} />
                <Route path="/digital-contracts" element={<DigitalContracts />} />
                <Route path="/nasdaq-analysis" element={<NASDAQCompetitorAnalysis />} />
                <Route path="/digital-valuation" element={<DigitalAssetValuationEngine />} />
                <Route path="/platform-valuation" element={<ComprehensivePlatformValuation />} />
                <Route path="/market-strategy" element={<SustanoSphereMarketStrategy />} />
                <Route path="/sustano-sphere-digital-assets" element={<SustanoSphereDigitalAssetValuation />} />
                <Route path="/lovable-partnership" element={<LovablePartnershipProposal />} />
                <Route path="/brochures" element={<BrochureViewer />} />
                <Route path="/development-site-valuation" element={<DevelopmentSiteValuation />} />
        <Route path="/mildura-valuation" element={<MilduraPropertyValuation />} />
        <Route path="/mildura-report" element={<MilduraValuationReport />} />
                 <Route path="/social-media-assets" element={<SocialMediaAssets />} />
                 <Route path="/concepts-and-plans" element={<ConceptsAndPlans />} />
                 <Route path="/marketing" element={<Marketing />} />
                 <Route path="/epat" element={<EPAT onBackToDashboard={() => window.location.href = '/dashboard'} />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancelled" element={<PaymentCancelled />} />
        <Route path="/ip-licensing" element={<IPLicensingAgreement />} />
        <Route path="/legal-compliance" element={<LegalComplianceDashboard />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
      </ValuationProvider>
    </ReportDataProvider>
  </PropertyProvider>
</BrandingProvider>
</QueryClientProvider>
);

export default App;
