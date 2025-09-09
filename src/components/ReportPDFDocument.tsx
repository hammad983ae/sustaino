import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1f2937',
  },
  subHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 20,
    color: '#374151',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 5,
  },
  section: {
    marginBottom: 15,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 3,
  },
  label: {
    fontWeight: 'bold',
    width: '40%',
    color: '#4b5563',
  },
  value: {
    width: '60%',
    color: '#1f2937',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
  },
  executiveSummary: {
    backgroundColor: '#f8fafc',
    padding: 15,
    marginBottom: 20,
    border: '1px solid #e2e8f0',
  },
  financialSection: {
    backgroundColor: '#fef7ed',
    padding: 15,
    marginBottom: 15,
    border: '1px solid #fed7aa',
  },
  riskSection: {
    backgroundColor: '#fef2f2',
    padding: 15,
    marginBottom: 15,
    border: '1px solid #fecaca',
  },
  successSection: {
    backgroundColor: '#f0fdf4',
    padding: 15,
    marginBottom: 15,
    border: '1px solid #bbf7d0',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 9,
    color: '#6b7280',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 15,
    right: 30,
    fontSize: 9,
    color: '#6b7280',
  },
});

interface ReportPDFDocumentProps {
  reportData: any;
}

const ReportPDFDocument: React.FC<ReportPDFDocumentProps> = ({ reportData }) => {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('en-AU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (value: number | string) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD'
    }).format(num || 0);
  };

  return (
    <Document>
      {/* Title Page */}
      <Page size="A4" style={styles.page}>
        <View style={{ textAlign: 'center', marginTop: 100 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
            COMPREHENSIVE PROPERTY REPORT
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 40 }}>
            {reportData?.propertyAddress || reportData?.address || 'Property Address'}
          </Text>
          <Text style={{ fontSize: 14, marginBottom: 20 }}>
            Prepared: {getCurrentDate()}
          </Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>
            Professional Property Valuation & Analysis
          </Text>
        </View>
        
        <View style={styles.footer}>
          <Text>CONFIDENTIAL PROPERTY VALUATION REPORT</Text>
        </View>
      </Page>

      {/* Executive Summary */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>EXECUTIVE SUMMARY</Text>
        
        <View style={styles.executiveSummary}>
          <Text style={styles.subHeader}>Property Overview</Text>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Property Address:</Text>
            <Text style={styles.value}>{reportData?.propertyAddress || reportData?.address || 'N/A'}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Report Date:</Text>
            <Text style={styles.value}>{getCurrentDate()}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Property Type:</Text>
            <Text style={styles.value}>{reportData?.propertyType || 'Commercial/Residential'}</Text>
          </View>
        </View>

        {/* Financial Summary */}
        {(reportData?.financialAnalysis || reportData?.ebitda || reportData?.estimatedValue) && (
          <View style={styles.financialSection}>
            <Text style={styles.subHeader}>Financial Summary</Text>
            {reportData?.estimatedValue && (
              <View style={styles.dataRow}>
                <Text style={styles.label}>Estimated Value:</Text>
                <Text style={styles.value}>{formatCurrency(reportData.estimatedValue)}</Text>
              </View>
            )}
            {reportData?.ebitda && (
              <View style={styles.dataRow}>
                <Text style={styles.label}>EBITDA:</Text>
                <Text style={styles.value}>{formatCurrency(reportData.ebitda)}</Text>
              </View>
            )}
            {reportData?.annualRental && (
              <View style={styles.dataRow}>
                <Text style={styles.label}>Annual Rental:</Text>
                <Text style={styles.value}>{formatCurrency(reportData.annualRental)}</Text>
              </View>
            )}
          </View>
        )}

        {/* Key Features */}
        {reportData?.keyFeatures && (
          <View style={styles.successSection}>
            <Text style={styles.subHeader}>Key Property Features</Text>
            <Text>{reportData.keyFeatures}</Text>
          </View>
        )}

        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} />
      </Page>

      {/* Property Details */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>PROPERTY DETAILS</Text>

        <Text style={styles.subHeader}>Location & Description</Text>
        <View style={styles.section}>
          <View style={styles.dataRow}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{reportData?.propertyAddress || reportData?.address || 'N/A'}</Text>
          </View>
          {reportData?.zoning && (
            <View style={styles.dataRow}>
              <Text style={styles.label}>Zoning:</Text>
              <Text style={styles.value}>{reportData.zoning}</Text>
            </View>
          )}
          {reportData?.landArea && (
            <View style={styles.dataRow}>
              <Text style={styles.label}>Land Area:</Text>
              <Text style={styles.value}>{reportData.landArea}</Text>
            </View>
          )}
          {reportData?.buildingArea && (
            <View style={styles.dataRow}>
              <Text style={styles.label}>Building Area:</Text>
              <Text style={styles.value}>{reportData.buildingArea}</Text>
            </View>
          )}
        </View>

        {reportData?.descriptions?.generalDescription && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>General Description</Text>
            <Text>{reportData.descriptions.generalDescription}</Text>
          </View>
        )}

        {reportData?.descriptions?.buildingDetails && (
          <View style={styles.section}>
            <Text style={styles.subHeader}>Building Details</Text>
            <Text>{reportData.descriptions.buildingDetails}</Text>
          </View>
        )}

        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} />
      </Page>

      {/* Financial Analysis */}
      {(reportData?.ebitdaAnalysis || reportData?.financialAnalysis) && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>FINANCIAL ANALYSIS</Text>

          <View style={styles.financialSection}>
            <Text style={styles.subHeader}>Income Analysis</Text>
            
            {/* Financial table */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Item</Text>
              <Text style={[styles.tableCell, { fontWeight: 'bold' }]}>Amount</Text>
            </View>

            {reportData?.grossRental && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Gross Annual Rental</Text>
                <Text style={styles.tableCell}>{formatCurrency(reportData.grossRental)}</Text>
              </View>
            )}

            {reportData?.operatingExpenses && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Operating Expenses</Text>
                <Text style={styles.tableCell}>{formatCurrency(reportData.operatingExpenses)}</Text>
              </View>
            )}

            {reportData?.ebitda && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>EBITDA</Text>
                <Text style={styles.tableCell}>{formatCurrency(reportData.ebitda)}</Text>
              </View>
            )}

            {reportData?.estimatedValue && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Estimated Market Value</Text>
                <Text style={styles.tableCell}>{formatCurrency(reportData.estimatedValue)}</Text>
              </View>
            )}
          </View>

          <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} />
        </Page>
      )}

      {/* Risk Assessment */}
      {reportData?.riskAssessment && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>RISK ASSESSMENT</Text>

          <View style={styles.riskSection}>
            <Text style={styles.subHeader}>Market Risk Factors</Text>
            <Text>{reportData.riskAssessment}</Text>
          </View>

          {reportData?.swotAnalysis && (
            <View style={styles.section}>
              <Text style={styles.subHeader}>SWOT Analysis</Text>
              <Text>{reportData.swotAnalysis}</Text>
            </View>
          )}

          <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} />
        </Page>
      )}

      {/* ESG Assessment */}
      {reportData?.esgAssessment && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.header}>ESG ASSESSMENT</Text>

          <View style={styles.successSection}>
            <Text style={styles.subHeader}>Environmental, Social & Governance</Text>
            
            {reportData.esgAssessment.environmentalScore && (
              <View style={styles.dataRow}>
                <Text style={styles.label}>Environmental Score:</Text>
                <Text style={styles.value}>{reportData.esgAssessment.environmentalScore}/100</Text>
              </View>
            )}

            {reportData.esgAssessment.socialScore && (
              <View style={styles.dataRow}>
                <Text style={styles.label}>Social Score:</Text>
                <Text style={styles.value}>{reportData.esgAssessment.socialScore}/100</Text>
              </View>
            )}

            {reportData.esgAssessment.governanceScore && (
              <View style={styles.dataRow}>
                <Text style={styles.label}>Governance Score:</Text>
                <Text style={styles.value}>{reportData.esgAssessment.governanceScore}/100</Text>
              </View>
            )}
          </View>

          <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} />
        </Page>
      )}

      {/* Valuation Certificate */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>VALUATION CERTIFICATE</Text>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Valuation Summary</Text>
          <Text>
            Based on our comprehensive analysis incorporating market data, financial performance, 
            and risk assessment, we determine the market value of the subject property to be:
          </Text>
        </View>

        <View style={[styles.financialSection, { textAlign: 'center', marginTop: 30 }]}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Market Value: {formatCurrency(reportData?.estimatedValue || 0)}
          </Text>
          <Text style={{ marginTop: 10, fontSize: 12 }}>
            As at {getCurrentDate()}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subHeader}>Methodology</Text>
          <Text>
            This valuation has been prepared using accepted valuation principles and methodologies 
            including income approach, market comparison, and financial analysis.
          </Text>
        </View>

        <Text style={styles.pageNumber} render={({ pageNumber }) => `Page ${pageNumber}`} />
      </Page>
    </Document>
  );
};

export default ReportPDFDocument;