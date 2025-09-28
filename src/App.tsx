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
import { AuthProvider } from "@/contexts/AuthContext";
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
import Auth from "./pages/Auth";

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
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalHeader from "./components/GlobalHeader";
import { TBEProgressPaymentDashboard } from "./components/progress-payments/TBEProgressPaymentDashboard";
import { IntegrationPlatformDashboard } from "./components/integration-platform/IntegrationPlatformDashboard";
import PlatformComparison from "./components/analysis/PlatformComparison";
import ISFVTestReport from "./pages/ISFVTestReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrandingProvider>
        <PropertyProvider>
          <ReportDataProvider>
            <ValuationProvider>
              <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <GlobalHeader />
                <Routes>
                <Route path="/auth" element={
                  <ProtectedRoute requireAuth={false}>
                    <Auth />
                  </ProtectedRoute>
                } />
                <Route path="/" element={<Index />} />
                <Route path="/automated-valuation" element={<AutomatedValuation />} />
                <Route path="/index" element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/report" element={
                  <ProtectedRoute>
                    <Report />
                  </ProtectedRoute>
                } />
                <Route path="/renewable-energy" element={
                  <ProtectedRoute>
                    <RenewableEnergyValuations />
                  </ProtectedRoute>
                } />
                <Route path="/property-assessment" element={
                  <ProtectedRoute>
                    <PropertyAssessment />
                  </ProtectedRoute>
                } />
        <Route path="/automated-report" element={<AutomatedReport propertyType="commercial" />} />
                <Route path="/property-valuations" element={
                  <ProtectedRoute>
                    <PropertyValuations />
                  </ProtectedRoute>
                } />
                <Route path="/work-hub" element={
                  <ProtectedRoute>
                    <WorkHubPage />
                  </ProtectedRoute>
                } />
                <Route path="/white-label" element={
                  <ProtectedRoute>
                    <WhiteLabelConfig />
                  </ProtectedRoute>
                } />
                <Route path="/client-demo" element={<ClientDemo />} />
                
                <Route path="/comprehensive-valuation" element={
                  <ProtectedRoute>
                    <ComprehensivePropertyValuation />
                  </ProtectedRoute>
                } />
                <Route path="/comprehensive-valuation-analysis" element={
                  <ProtectedRoute>
                    <ComprehensiveValuationAnalysis />
                  </ProtectedRoute>
                } />
                <Route path="/crypto-trading" element={
                  <ProtectedRoute>
                    <CryptoTradingDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/costa-group-valuations" element={
                  <ProtectedRoute>
                    <CostaGroupValuationsPage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/folder-manager" element={
                  <ProtectedRoute>
                    <AutomaticFolderManager />
                  </ProtectedRoute>
                } />
                <Route path="/esg-climate-assessment" element={
                  <ProtectedRoute>
                    <ESGClimateAssessment />
                  </ProtectedRoute>
                } />
                <Route path="/insurance-valuations" element={
                  <ProtectedRoute>
                    <InsuranceValuationsPage />
                  </ProtectedRoute>
                } />
                <Route path="/fullscreen-demo" element={<FullScreenDemo />} />
                <Route path="/social-demo" element={<SocialDemo />} />
                <Route path="/financial-reporting" element={
                  <ProtectedRoute>
                    <FinancialReporting />
                  </ProtectedRoute>
                } />
                <Route path="/rent-revision" element={
                  <ProtectedRoute>
                    <RentRevisionPage />
                  </ProtectedRoute>
                } />
                <Route path="/rent-determination" element={
                  <ProtectedRoute>
                    <RentDeterminationPage />
                  </ProtectedRoute>
                } />
                <Route path="/plant-equipment" element={
                  <ProtectedRoute>
                    <PlantAndEquipmentPage />
                  </ProtectedRoute>
                } />
                <Route path="/information-memorandum" element={
                  <ProtectedRoute>
                    <InformationMemorandum />
                  </ProtectedRoute>
                } />
                <Route path="/investment-platform" element={
                  <ProtectedRoute>
                    <InvestmentPlatformPage />
                  </ProtectedRoute>
                } />
                <Route path="/brick-by-brick" element={
                  <ProtectedRoute>
                    <BrickByBrickPage />
                  </ProtectedRoute>
                } />
                <Route path="/esg-strategy-analysis" element={
                  <ProtectedRoute>
                    <ESGStrategyAnalysis />
                  </ProtectedRoute>
                } />
                <Route path="/sam-platform" element={
                  <ProtectedRoute>
                    <SAMPlatform />
                  </ProtectedRoute>
                } />
                <Route path="/databases" element={
                  <ProtectedRoute>
                    <DataBases />
                  </ProtectedRoute>
                } />
                <Route path="/reality-sales" element={
                  <ProtectedRoute>
                    <RealitySales />
                  </ProtectedRoute>
                } />
                <Route path="/auction-sphere-pos" element={
                  <ProtectedRoute>
                    <AuctionSpherePOSPage />
                  </ProtectedRoute>
                } />
                <Route path="/advertising-platforms" element={
                  <ProtectedRoute>
                    <AdvertisingPlatforms />
                  </ProtectedRoute>
                } />
                <Route path="/digital-contracts" element={
                  <ProtectedRoute>
                    <DigitalContracts />
                  </ProtectedRoute>
                } />
                <Route path="/nasdaq-analysis" element={
                  <ProtectedRoute>
                    <NASDAQCompetitorAnalysis />
                  </ProtectedRoute>
                } />
                <Route path="/digital-valuation" element={
                  <ProtectedRoute>
                    <DigitalAssetValuationEngine />
                  </ProtectedRoute>
                } />
                <Route path="/platform-valuation" element={
                  <ProtectedRoute>
                    <ComprehensivePlatformValuation />
                  </ProtectedRoute>
                } />
                <Route path="/market-strategy" element={
                  <ProtectedRoute>
                    <SustanoSphereMarketStrategy />
                  </ProtectedRoute>
                } />
                <Route path="/sustano-sphere-digital-assets" element={
                  <ProtectedRoute>
                    <SustanoSphereDigitalAssetValuation />
                  </ProtectedRoute>
                } />
                <Route path="/lovable-partnership" element={
                  <ProtectedRoute>
                    <LovablePartnershipProposal />
                  </ProtectedRoute>
                } />
                <Route path="/brochures" element={<BrochureViewer />} />
                <Route path="/development-site-valuation" element={
                  <ProtectedRoute>
                    <DevelopmentSiteValuation />
                  </ProtectedRoute>
                } />
        <Route path="/mildura-valuation" element={
          <ProtectedRoute>
            <MilduraPropertyValuation />
          </ProtectedRoute>
        } />
        <Route path="/mildura-report" element={
          <ProtectedRoute>
            <MilduraValuationReport />
          </ProtectedRoute>
        } />
                 <Route path="/social-media-assets" element={<SocialMediaAssets />} />
                 <Route path="/concepts-and-plans" element={<ConceptsAndPlans />} />
                 <Route path="/marketing" element={<Marketing />} />
                 <Route path="/epat" element={
                   <ProtectedRoute>
                     <EPAT onBackToDashboard={() => window.location.href = '/dashboard'} />
                   </ProtectedRoute>
                 } />
                 <Route path="/tbe-progress-payments" element={
                   <ProtectedRoute>
                     <TBEProgressPaymentDashboard />
                   </ProtectedRoute>
                 } />
        <Route path="/integration-platform" element={<IntegrationPlatformDashboard />} />
        <Route path="/platform-comparison" element={<PlatformComparison />} />
        <Route path="/isfv-test" element={
          <ProtectedRoute>
            <ISFVTestReport />
          </ProtectedRoute>
        } />
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
