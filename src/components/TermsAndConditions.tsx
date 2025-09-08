import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, Scale, AlertTriangle, Leaf, MapPin, Home, Building2, TrendingDown, Users } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border bg-muted/50">
          <CardTitle className="text-foreground text-xl font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Section 18: Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-6 pr-4">
              
              {/* Environmental and Contamination Assessment */}
              <Card className="border-green-200 dark:border-green-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-300">
                    <Leaf className="h-5 w-5" />
                    Environmental and Contamination Assessment Qualifications
                  </CardTitle>
                  <Badge variant="outline" className="w-fit">Environmental Disclaimer</Badge>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p className="font-medium">
                    The valuer is not an environmental specialist or expert in contamination assessment. This valuation does not constitute an environmental audit or contamination assessment. Any environmental observations are based on visual inspection only and are general in nature.
                  </p>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Recommended Professional Consultation:</p>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      Where potential contamination risks have been identified, it is strongly recommended that the client engage qualified environmental consultants to conduct detailed environmental investigations including soil testing, air quality monitoring, and specialist assessment of hazardous substances.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">This valuation excludes consideration of:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Hidden or non-apparent contamination</li>
                      <li>• Subsurface contamination requiring specialist testing</li>
                      <li>• Asbestos content (unless visible and obvious)</li>
                      <li>• Lead paint or other hazardous building materials (unless obvious)</li>
                      <li>• PFAS or other chemical contamination</li>
                      <li>• Illegal drug activity residues</li>
                      <li>• Underground storage tanks or buried materials</li>
                      <li>• Radioactive materials or electromagnetic radiation impacts</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="font-medium text-red-800 dark:text-red-200">Liability Exclusion:</p>
                    <p className="text-red-700 dark:text-red-300">
                      The valuer excludes all liability for environmental contamination, hazardous substances, or environmental conditions that are not readily apparent during inspection or that require specialist knowledge to identify.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Contamination Impact on Value */}
              <Card className="border-orange-200 dark:border-orange-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-300">
                    <TrendingDown className="h-5 w-5" />
                    Contamination Impact on Value Disclaimer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium mb-2">The presence of contamination may significantly impact property value through:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Direct remediation and clean-up costs</li>
                      <li>• Ongoing monitoring and compliance costs</li>
                      <li>• Legal and regulatory compliance expenses</li>
                      <li>• Reduced marketability and longer selling periods</li>
                      <li>• Financing difficulties or restrictions</li>
                      <li>• Potential liability for past and future contamination</li>
                      <li>• Market stigma that may persist beyond remediation</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/30 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                    <p className="font-medium text-orange-800 dark:text-orange-200">Value Assessment Basis:</p>
                    <p className="text-orange-700 dark:text-orange-300">
                      Where contamination is suspected or identified, the assessed value assumes no contamination unless specifically stated. Any contamination discovered subsequent to this valuation may materially affect the property value and this valuation should be reviewed accordingly.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Native Title Assessment */}
              <Card className="border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700 dark:text-purple-300">
                    <MapPin className="h-5 w-5" />
                    Native Title Assessment Qualifications
                  </CardTitle>
                  <Badge variant="destructive" className="w-fit">CRITICAL DISCLAIMER</Badge>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
                    <p className="font-medium text-red-800 dark:text-red-200 mb-2">Critical Disclaimer:</p>
                    <p className="text-red-700 dark:text-red-300">
                      The valuer is not a native title specialist or expert in native title law. This assessment does not constitute legal advice regarding native title matters.
                    </p>
                  </div>

                  <p>
                    Native title is an extremely complex area of law governed by the Native Title Act 1993 (Cth) and extensive Federal Court jurisprudence. Any native title observations in this report are preliminary only and based on publicly available information.
                  </p>

                  <div>
                    <p className="font-medium mb-2">This valuation excludes consideration of:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Detailed native title due diligence investigations</li>
                      <li>• Unregistered or potential native title claims</li>
                      <li>• Complex co-existence arrangements with other tenure</li>
                      <li>• ILUA (Indigenous Land Use Agreement) requirements</li>
                      <li>• Future act implications under the Native Title Act</li>
                      <li>• Compensation obligations to native title holders</li>
                      <li>• Cultural heritage implications beyond basic observations</li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Limitation:</p>
                    <p className="text-amber-700 dark:text-amber-300">
                      Native title determinations cover approximately 50% of Australia's landmass. The absence of obvious native title does not guarantee no native title interests exist.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* SDA Assessment */}
              <Card className="border-indigo-200 dark:border-indigo-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                    <Home className="h-5 w-5" />
                    Specialist Disability Accommodation (SDA) Assessment Qualifications
                  </CardTitle>
                  <Badge variant="outline" className="w-fit">Important Disclaimer</Badge>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="font-medium text-amber-800 dark:text-amber-200 mb-2">Important Disclaimer:</p>
                    <p className="text-amber-700 dark:text-amber-300">
                      The valuer has limited specialist knowledge of SDA legislation, NDIS regulations, and SDA-specific valuation requirements. This assessment should not be relied upon as comprehensive SDA advice.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">SDA is subject to complex and frequently changing legislation including:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• National Disability Insurance Scheme Act 2013</li>
                      <li>• NDIS (Specialist Disability Accommodation) Rules 2020</li>
                      <li>• SDA Design Standards published by NDIA</li>
                      <li>• NDIS Quality and Safeguards Commission requirements</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium mb-2">This valuation excludes detailed consideration of:</p>
                    <ul className="space-y-1 text-muted-foreground text-xs">
                      <li>• SDA provider registration requirements and compliance</li>
                      <li>• SDA dwelling enrollment status and ongoing compliance</li>
                      <li>• Design category certification accuracy</li>
                      <li>• Building type compliance</li>
                      <li>• SDA payment calculation accuracy and sustainability</li>
                      <li>• MRRC arrangements and OOA payment structures</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Market Transaction Shortage */}
              <Card className="border-gray-200 dark:border-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Market Transaction Shortage Considerations
                  </CardTitle>
                  <Badge variant="outline" className="w-fit">Important Limitation</Badge>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-950/30 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                    <p className="font-medium mb-2">Important Limitation:</p>
                    <p>This valuation was prepared during a period of limited market transaction data. Additional professional judgment has been exercised in forming this opinion of value.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-2">Conditions Affecting Market Analysis:</p>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>• Reduced volume of comparable transactions</li>
                        <li>• Increased reliance on alternative data sources</li>
                        <li>• Enhanced consideration of prior transactions</li>
                        <li>• Reliance on unsettled transactions</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Recommendations:</p>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>• Shorter review periods (3-6 months)</li>
                        <li>• Additional market research before decisions</li>
                        <li>• Consider sensitivity analysis ranges</li>
                        <li>• Monitor market recovery indicators</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mortgage and Loan Security */}
              <Card className="border-teal-200 dark:border-teal-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-teal-700 dark:text-teal-300">
                    <Building2 className="h-5 w-5" />
                    Mortgage and Loan Security Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="bg-teal-50 dark:bg-teal-950/30 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                    <p className="font-medium text-teal-800 dark:text-teal-200 mb-2">Mortgage Security Purpose Disclaimer:</p>
                    <p className="text-teal-700 dark:text-teal-300">
                      This valuation has been prepared specifically for mortgage and loan security purposes. The valuation must be read in conjunction with all qualifications, assumptions, and limitations contained herein.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-2">Risk Factors for Mortgage Security:</p>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>• Market volatility and potential for value decline</li>
                        <li>• Property condition issues not apparent during inspection</li>
                        <li>• Environmental or contamination risks</li>
                        <li>• Legal or planning restrictions affecting marketability</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-2">Mandatory Exclusions:</p>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>• Market value changes after valuation date</li>
                        <li>• Hidden defects or conditions not apparent</li>
                        <li>• Contamination requiring specialist assessment</li>
                        <li>• Title defects or legal issues not disclosed</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Cost Estimates */}
              <Card className="border-pink-200 dark:border-pink-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-pink-700 dark:text-pink-300">
                    <Shield className="h-5 w-5" />
                    Insurance Cost Estimates Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="bg-pink-50 dark:bg-pink-950/30 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                    <p className="font-medium text-pink-800 dark:text-pink-200 mb-2">Insurance Cost Estimate Disclaimer:</p>
                    <p className="text-pink-700 dark:text-pink-300">
                      This insurance cost estimate is prepared for insurance purposes only and should not be relied upon for any other purpose. The estimate reflects costs at the date of assessment and may require updating as costs change.
                    </p>
                  </div>

                  <div>
                    <p className="font-medium mb-2">Important Limitations:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Estimate based on visual inspection only, not detailed structural assessment</li>
                      <li>• Does not constitute quantity surveying or detailed cost estimation</li>
                      <li>• Asbestos or hazardous materials may significantly increase costs</li>
                      <li>• Site access difficulties may affect construction costs</li>
                      <li>• Planning approvals and building code changes may affect costs</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">Valuer's Expertise:</p>
                    <p className="text-blue-700 dark:text-blue-300">
                      The valuer is not a quantity surveyor, construction cost consultant, or building contractor. This estimate is based on general market knowledge of construction costs and should be supplemented by specialist advice where detailed cost analysis is required.
                    </p>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-950/30 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Update Requirements:</p>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      Insurance cost estimates should be reviewed regularly (typically annually) or when significant cost changes occur in construction markets, building codes, or heritage requirements.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Separator />

              {/* Original Terms and Conditions content */}
              <div className="space-y-8">
                {/* Terms and Conditions Explanation */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Terms and Conditions: Explanation</h3>
                  
                  <div className="space-y-3 text-sm text-foreground">
                    <p>1. The following terms and conditions are the standard terms and conditions that apply to all Valuations, or the Valuation Services or consultancy services and Services provided by [White Label Firm Name].</p>
                    
                    <p>2. These terms and conditions form part of the appointment of [White Label Firm Name] by the Client to provide the Services.</p>
                    
                    <p>3. [White Label Firm Name] and its valuers are members of a Limited Liability Scheme in the meaning of the Professional Standards Act 1994.</p>
                    
                    <p>4. The Valuation and all Valuation Services are provided by [White Label Firm Name] subject to these Terms and Conditions.</p>
                  </div>
                </div>

                {/* Additional Banking and Insurance Provisions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Additional Banking and Insurance Provisions</h3>
                  <div className="space-y-3 text-sm text-foreground">
                    <p>Specifically, the Lender's Customer should not rely upon the Valuation Report for the purpose of:</p>
                    
                    <div className="pl-4 space-y-2">
                      <p>(a) deciding whether to enter a transaction or alter their financial position; or</p>
                      <p>(b) seeking finance from a third party and should seek their own advice and valuation in such circumstances.</p>
                    </div>
                    
                    <p>The Lender's Customer acknowledges that the Valuation Report is being provided by Us to the Lender for its security assessment purposes only.</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsAndConditions;