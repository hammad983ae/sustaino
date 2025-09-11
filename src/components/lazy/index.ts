import React, { Suspense, lazy } from 'react';

const LoadingSpinner = () => (
  React.createElement('div', { 
    className: 'flex items-center justify-center p-8' 
  }, React.createElement('div', { 
    className: 'animate-spin rounded-full h-8 w-8 border-b-2 border-primary' 
  }))
);

// Lazy loaded components
export const LazyLeasingEvidence = lazy(() => import('@/components/LeasingEvidence'));
export const LazyValuationAnalysis = lazy(() => import('@/components/ValuationAnalysis'));
export const LazySalesEvidence = lazy(() => import('@/components/SalesEvidenceUnified'));
export const LazyReportGenerator = lazy(() => import('@/components/ReportGenerator'));
export const LazyMultiStepForm = lazy(() => import('@/components/MultiStepForm'));

// Wrapper components with Suspense
export const LazyLeasingEvidenceWithSuspense = (props: any) => 
  React.createElement(Suspense, { fallback: React.createElement(LoadingSpinner) }, 
    React.createElement(LazyLeasingEvidence, props)
  );

export const LazyValuationAnalysisWithSuspense = (props: any) => 
  React.createElement(Suspense, { fallback: React.createElement(LoadingSpinner) }, 
    React.createElement(LazyValuationAnalysis, props)
  );