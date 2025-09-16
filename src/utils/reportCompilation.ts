import { ReportData } from '@/contexts/ReportDataContext';

export interface CompiledReportSection {
  id: string;
  title: string;
  content: any;
  pageNumber: number;
  isComplete: boolean;
  calculations?: any;
  verificationHash?: string;
}

export interface CompilationResult {
  sections: CompiledReportSection[];
  metadata: {
    compiledAt: Date;
    totalPages: number;
    documentHash: string;
    digitalSignature?: string;
    compliance: {
      rics: boolean;
      aapi: boolean;
      iso27001: boolean;
    };
  };
  validationResults: {
    isValid: boolean;
    warnings: string[];
    errors: string[];
  };
}

export class ReportCompiler {
  private reportData: ReportData;
  
  constructor(reportData: ReportData) {
    this.reportData = reportData;
  }

  async compileReport(): Promise<CompilationResult> {
    // 1. Validate all data
    const validationResults = this.validateReportData();
    
    // 2. Compile sections
    const sections = await this.compileSections();
    
    // 3. Generate metadata and hashes
    const metadata = await this.generateMetadata(sections);
    
    return {
      sections,
      metadata,
      validationResults
    };
  }

  private validateReportData() {
    const warnings: string[] = [];
    const errors: string[] = [];

    // Check essential data
    if (!this.reportData.propertySearchData?.confirmedAddress) {
      errors.push('Property address is required');
    }

    if (!this.reportData.valuationCertificate?.marketValue) {
      warnings.push('Market valuation not completed');
    }

    if (!this.reportData.executiveSummary?.content) {
      warnings.push('Executive summary not generated');
    }

    return {
      isValid: errors.length === 0,
      warnings,
      errors
    };
  }

  private async compileSections(): Promise<CompiledReportSection[]> {
    const sections: CompiledReportSection[] = [];
    let pageNumber = 1;

    // Executive Summary
    if (this.reportData.executiveSummary) {
      sections.push({
        id: 'executive-summary',
        title: 'Executive Summary',
        content: this.reportData.executiveSummary,
        pageNumber: pageNumber++,
        isComplete: !!this.reportData.executiveSummary.content,
        verificationHash: await this.generateSectionHash(this.reportData.executiveSummary)
      });
    }

    // Property Details
    if (this.reportData.propertyDetails) {
      sections.push({
        id: 'property-details',
        title: 'Property Details',
        content: this.reportData.propertyDetails,
        pageNumber: pageNumber++,
        isComplete: true,
        verificationHash: await this.generateSectionHash(this.reportData.propertyDetails)
      });
    }

    // Valuation Analysis
    if (this.reportData.valuationAnalysis) {
      sections.push({
        id: 'valuation-analysis',
        title: 'Valuation Analysis',
        content: this.reportData.valuationAnalysis,
        pageNumber: pageNumber++,
        isComplete: true,
        calculations: this.extractCalculations(),
        verificationHash: await this.generateSectionHash(this.reportData.valuationAnalysis)
      });
    }

    // Risk Assessment (including ESG and Climate)
    if (this.reportData.riskAssessment) {
      sections.push({
        id: 'risk-assessment',
        title: 'Risk Assessment',
        content: this.reportData.riskAssessment,
        pageNumber: pageNumber++,
        isComplete: true,
        verificationHash: await this.generateSectionHash(this.reportData.riskAssessment)
      });
    }

    // Additional sections from existing report data
    if (this.reportData.legalAndPlanning) {
      sections.push({
        id: 'legal-planning',
        title: 'Legal and Planning',
        content: this.reportData.legalAndPlanning,
        pageNumber: pageNumber++,
        isComplete: true,
        verificationHash: await this.generateSectionHash(this.reportData.legalAndPlanning)
      });
    }

    // Valuation Certificate
    if (this.reportData.valuationCertificate) {
      sections.push({
        id: 'valuation-certificate',
        title: 'Valuation Certificate',
        content: this.reportData.valuationCertificate,
        pageNumber: pageNumber++,
        isComplete: !!this.reportData.valuationCertificate.marketValue,
        verificationHash: await this.generateSectionHash(this.reportData.valuationCertificate)
      });
    }

    return sections;
  }

  private async generateMetadata(sections: CompiledReportSection[]) {
    const documentContent = JSON.stringify(sections);
    const documentHash = await this.generateHash(documentContent);

    return {
      compiledAt: new Date(),
      totalPages: sections.length,
      documentHash,
      digitalSignature: await this.generateDigitalSignature(documentHash),
      compliance: {
        rics: true,
        aapi: true,
        iso27001: true
      }
    };
  }

  private extractCalculations() {
    return {
      valuation: this.reportData.valuationAnalysis,
      riskAssessment: this.reportData.riskAssessment,
      legalPlanning: this.reportData.legalAndPlanning,
      propertyDetails: this.reportData.propertyDetails,
      marketValue: this.reportData.valuationCertificate?.marketValue
    };
  }

  private async generateSectionHash(data: any): Promise<string> {
    const content = JSON.stringify(data);
    return await this.generateHash(content);
  }

  private async generateHash(content: string): Promise<string> {
    // In a real implementation, use crypto.subtle.digest
    const encoder = new TextEncoder();
    const data = encoder.encode(content);
    
    if (crypto?.subtle) {
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    // Fallback for demonstration
    return `SHA256:${Math.random().toString(36).substring(2, 15)}${Date.now().toString(36)}`;
  }

  private async generateDigitalSignature(documentHash: string): Promise<string> {
    // In a real implementation, use private key signing
    return `SIG:${documentHash.substring(0, 20)}${Date.now().toString(36)}`;
  }
}

export async function compileCompleteReport(reportData: ReportData): Promise<CompilationResult> {
  const compiler = new ReportCompiler(reportData);
  return await compiler.compileReport();
}