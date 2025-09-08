import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-card border-border">
        <CardHeader className="border-b border-border bg-muted/50">
          <CardTitle className="text-foreground text-xl font-semibold">
            Section 18: Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ScrollArea className="h-[800px] w-full pr-4">
            <div className="space-y-8">
              
              {/* Professional Compliance & Certification Section - Moved from Section 17 */}
              <div className="space-y-6 border-b border-border pb-8">
                <h2 className="text-xl font-semibold text-foreground">Professional Compliance & Certification</h2>
                
                {/* Definitions Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Key Definitions</h3>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {/* Market Value Definition */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                      <div className="font-medium text-foreground">Market Value Definition</div>
                      <div className="text-foreground text-sm">
                        The estimated amount for which an asset or liability should exchange on the valuation date between a willing buyer and a willing seller in an arm's length transaction, after proper marketing, where the parties had each acted knowledgeably, prudently, and without compulsion.
                      </div>
                    </div>
                    
                    {/* Market Rent Definition */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                      <div className="font-medium text-foreground">Market Rent Definition</div>
                      <div className="text-foreground text-sm">
                        The estimated amount for which an interest in real property should be leased on the valuation date between a willing lessor and a willing lessee on appropriate lease terms in an arm's length transaction, after proper marketing and where the parties had each acted knowledgeably, prudently and without compulsion.
                      </div>
                    </div>

                    {/* Market Movement Clause */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                      <div className="font-medium text-foreground">Market Movement Clause</div>
                      <div className="text-foreground text-sm">
                        "This valuation is current at the date of valuation only. The value assessed herein may change significantly and unexpectedly over a relatively short period of time (including as a result of general market movements or factors specific to the particular property). Liability for losses arising from such subsequent changes in value is excluded as is liability where the"
                      </div>
                    </div>

                    {/* Prudent Lender Clause */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/20">
                      <div className="font-medium text-foreground">Prudent Lender Clause</div>
                      <div className="text-foreground text-sm">
                        Text for prudent lender compliance requirements and limitations.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Compliance Data Collection */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Professional Compliance Data</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="valuation-date" className="text-sm font-medium">Date of Valuation</Label>
                      <Input 
                        id="valuation-date"
                        type="date" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="inspection-date" className="text-sm font-medium">Date of Inspection</Label>
                      <Input 
                        id="inspection-date"
                        type="date" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="report-date" className="text-sm font-medium">Date of Report</Label>
                      <Input 
                        id="report-date"
                        type="date" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="valuer-name" className="text-sm font-medium">Valuer Name</Label>
                      <Input 
                        id="valuer-name"
                        placeholder="Enter valuer name" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="valuer-qualification" className="text-sm font-medium">Valuer Qualification</Label>
                      <Input 
                        id="valuer-qualification"
                        placeholder="e.g., CPV, AAPI" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="registration-number" className="text-sm font-medium">Registration Number</Label>
                      <Input 
                        id="registration-number"
                        placeholder="Enter registration number" 
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="compliance-statement" className="text-sm font-medium">Compliance Statement</Label>
                    <Textarea 
                      id="compliance-statement"
                      placeholder="Enter compliance statement and professional certifications..."
                      className="w-full min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Valuation Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Valuation Details</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="interest-valued" className="text-sm font-medium">Interest Valued</Label>
                      <Input 
                        id="interest-valued"
                        placeholder="e.g., Freehold, Leasehold" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="value-component" className="text-sm font-medium">Value Component</Label>
                      <Input 
                        id="value-component"
                        placeholder="e.g., Land and Buildings" 
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="market-value" className="text-sm font-medium">Market Value ($)</Label>
                      <Input 
                        id="market-value"
                        type="number" 
                        placeholder="0"
                        className="w-full"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gst-inclusive" className="text-sm font-medium">GST Treatment</Label>
                      <Input 
                        id="gst-inclusive"
                        placeholder="e.g., Exclusive, Inclusive" 
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Environmental and Contamination Assessment Qualifications */}
                <div className="space-y-4 p-4 border border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/30 rounded-lg">
                  <h4 className="font-semibold text-foreground">Environmental and Contamination Assessment Qualifications</h4>
                  <div className="text-sm text-foreground space-y-2">
                    <p>The valuer is not an environmental specialist or expert in contamination assessment. This valuation does not constitute an environmental audit or contamination assessment. Any environmental observations are based on visual inspection only and are general in nature.</p>
                    <p>Where contamination risks have been identified, it is strongly recommended that the client engage qualified environmental consultants to conduct detailed environmental investigations including soil testing and specialist assessment of hazardous substances.</p>
                  </div>
                </div>

                {/* Native Title Assessment Qualifications */}
                <div className="space-y-4 p-4 border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/30 rounded-lg">
                  <h4 className="font-semibold text-foreground">Native Title Assessment Qualifications</h4>
                  <div className="text-sm text-foreground space-y-2">
                    <p><strong>CRITICAL DISCLAIMER:</strong> The valuer is not a native title specialist or expert in native title law. This assessment does not constitute legal advice regarding native title matters.</p>
                    <p>Where potential native title issues are identified, immediate specialist legal advice should be obtained from qualified native title practitioners prior to any property transaction or development activities.</p>
                  </div>
                </div>

                {/* Market Transaction Shortage Considerations */}
                <div className="space-y-4 p-4 border border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/30 rounded-lg">
                  <h4 className="font-semibold text-foreground">Market Transaction Shortage Considerations</h4>
                  <div className="text-sm text-foreground space-y-2">
                    <p><strong>IMPORTANT LIMITATION:</strong> This valuation was prepared during a period of limited market transaction data. Additional professional judgement has been exercised in forming this opinion of value.</p>
                    <p>Enhanced consideration of prior transactions with time and market adjustments, reliance on unsettled transactions and market participant feedback, consideration of RBA data, market research, and economic indicators.</p>
                  </div>
                </div>

                {/* Insurance Cost Estimates Qualifications */}
                <div className="space-y-4 p-4 border border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950/30 rounded-lg">
                  <h4 className="font-semibold text-foreground">Insurance Cost Estimates Qualifications</h4>
                  <div className="text-sm text-foreground space-y-2">
                    <p><strong>INSURANCE COST ESTIMATE DISCLAIMER:</strong> This insurance cost estimate is prepared for insurance purposes only and should not be relied upon for any other purpose. Estimates should be updated annually and will require updating as costs change.</p>
                    <p>Professional fees excluded. Reconstruction period cost escalation allowances specified if included. GST treatment specified as inclusive or exclusive.</p>
                  </div>
                </div>
              </div>
              
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

          {/* Definitions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Definitions</h3>
            
            <div className="space-y-4 text-sm text-foreground">
              <p>5. The following definitions apply to these Terms and Conditions and the provision of our Valuations, Valuation Services and Services: -</p>
              
              <div className="space-y-3 pl-4">
                <p><strong>'Client'</strong> shall mean [RELIANT PARTY - Auto-populated from platform].</p>
                
                <p><strong>'Confidential information'</strong> means information that:</p>
                <div className="pl-4 space-y-1">
                  <p>(a) Is by its nature confidential.</p>
                  <p>(b) Is designated by Us as confidential.</p>
                  <p>(c) You know or ought to know is confidential; and</p>
                  <p>(d) Includes, without limitation:</p>
                  <div className="pl-4 space-y-1">
                    <p>(i) Information comprised in or relating to any of Our intellectual property in the Services or any reports or certificates provided as part of the Services; and</p>
                    <p>(ii) The Quotation which We have provided to You.</p>
                  </div>
                </div>
                
                <p><strong>'Date Of Valuation'</strong> means, in relation to any Valuation, Valuation Services, Services or consultancy services or advice, the date of preparation of our report or the specific date as at which our opinions are stated to apply (the Relevant Date).</p>
                
                <p><strong>'Director'</strong> means a director noted on the Australian Securities and Investment Companies (ASIC's) records for [White Label Firm Name].</p>
                
                <p><strong>'Fee'</strong> means the amount agreed to be paid for the Services by You as set out in the Quotation.</p>
                
                <p><strong>'Limited Liability Scheme'</strong> means a scheme pursuant to the Professional Standards Legislation in the State of Victoria.</p>
                
                <p><strong>'Parties'</strong> means You and/or Us as the context dictates.</p>
                
                <p><strong>'Quotation'</strong> means the written quote provided by Us in relation to the Services.</p>
                
                <p><strong>'Relevant Date'</strong> means the specific date that our opinion is stated to apply where we are instructed to value at a specific date other than the date of inspection.</p>
                
                <p><strong>'Services'</strong> means the Valuation, Valuation Services, asset management, property management, facilities management or consultancy services or advice provided by Us pursuant to these Terms and Conditions and the Quotation.</p>
                
                <p><strong>'Valuation'</strong> shall include a Valuation, Valuation services, or feasibility study, made or given in relation to any real or personal property, freehold or leasehold property, asset, liability or item or items of plant and machinery, proposed development, infrastructure, carbon, water or native title property right, business, fixtures, fittings, or other property.</p>
                
                <p><strong>'Valuation Services'</strong> shall include any oral or written advice, opinion, recommendation, or statement communicated to the Client by Us consequent upon or incidental to the request for a Valuation.</p>
                
                <p><strong>'Valuer'</strong> means the individual valuer that has undertaken the valuation or valuation services.</p>
                
                <p><strong>'We', 'Us', 'Our'</strong> means [White Label Firm Name], our employees, contractors, servants, and agents;</p>
                
                <p><strong>'You', 'Your'</strong> means the Client engaging Us to perform the Valuation, Services or Valuation Services.</p>
              </div>
            </div>
          </div>

          {/* Quotation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quotation</h3>
            
            <div className="space-y-3 text-sm text-foreground">
              <p>6. Prior to commencing work We will provide you with a Quotation that sets out who the report is for; the purpose for which the report is being prepared and the fee to be charged. You agree that:</p>
              
              <div className="pl-4 space-y-2">
                <p>(a) you will not use any advice we provide for any purpose other than as stated in the Quotation.</p>
                <p>(b) you will not pursue any claim against Us for any loss you suffer because you have used Our advice for any other purpose.</p>
                <p>(c) you will keep this report confidential, unless otherwise agreed by Us in writing; and</p>
                <p>(d) you will indemnify Us in relation to any loss suffered by a third party that relies on Our advice without first receiving our written consent to do so.</p>
              </div>
            </div>
          </div>

          {/* Your Obligations */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your Obligations</h3>
            
            <div className="space-y-3 text-sm text-foreground">
              <p>7. You agree that:</p>
              
              <div className="pl-4 space-y-2">
                <p>(a) You will not use any advice We provide for any purpose other than as stated in the Quotation.</p>
                <p>(b) You will not pursue any claim against Us for any loss You suffer because You have used Our advice for any other purpose.</p>
                <p>(c) You will keep this report confidential, unless otherwise agreed by Us in writing; and</p>
                <p>(d) You will indemnify Us in relation to any loss suffered by a third party that relies on our advice without first receiving Our written consent to do so.</p>
              </div>
              
              <p>8. You warrant that the instructions and subsequent information supplied by You contain a full and frank disclosure of all information that is relevant to Our provision of the Valuation, Valuation Services or Services. You also accept all risk and any loss that might occur should you withhold any relevant information from Us.</p>
              
              <p>9. You warrant that all third-party expert or specialist reports provided to Us by You for the purpose of Us providing the Valuation, Valuation Services or Services are provided with the authority of the authors of those reports.</p>
              
              <p>10. You authorise and license Us to incorporate Your intellectual property within Our report(s).</p>
              
              <p>11. The Valuation and all Valuation Services are provided by Us solely for the use of the Client. You will not release any part of Our valuation or consultancy report or its substance to any third party without the written consent of one of Our Directors. Such consent will be provided at Our absolute discretion and on such conditions as We may require including that a copy of these Terms and Conditions must be provided to such third party. This clause shall not apply to persons noted as recipients in Your prior instruction to Us or in the Quotation provided. You are obligated to provide any such recipient with a copy of these Terms and Conditions.</p>
              
              <p>12. If You release any part of the valuation or consultancy advice or its substance with Our written consent, you agree to a) inform the other person of the terms of our consent; and b) to compensate Us if You do not do so. We have no responsibility to any other person even if that person suffers damage because of any other person receiving this Valuation, Valuation Services, Services, or consultancy advice.</p>
              
              <p>13. You are agree that We do not and will not assume any responsibility to any person other than the Client for any reason whatsoever including, without limiting the generality of the foregoing, for breach of contract, negligence (including negligent mis-statement) or wilful act or default of itself or other by reason of or arising out of the provision of the Valuation, Valuation Services or Services and notwithstanding that any damages have been suffered or incurred by that person as a result of the provision of this Valuation or those Valuation Services to the Client or the use of either of them (or any part of either of them) by the Client for any purpose whatsoever;</p>
              
              <p>14. You must pay our Fees within 14 days of the date of a correctly rendered invoice, unless otherwise dealt with in the Quotation. Fees that remain unpaid for a period of 30 days or more will attract an administration charge of 2% of the total of the invoice calculated per month or part thereof.</p>
              
              <p>15. You agree that We reserve the right to reconsider or amend the Valuation, Valuation Services, Services or consultancy advice, or the Fee set out in Our Quotation to You, if we identify information or facts that were not provided to Us at the time of quoting that reveal that the task is much greater than we initially anticipated from the information you provided. In such circumstances, once We have identified additional issues that necessitate additional work, we will advise you of the additional fees for additional time required to complete the task.</p>
              
              <p>16. You agree that neither the whole nor any part of Our Valuation or the substance of any of Our Valuation Services or Services may be communicated to any third party (whether by way of inclusion in a document, circular, statement, prospectus, Product Disclosure Statement (PDS), public offer document or otherwise) without first obtaining the written consent of one of Our Directors. Neither the whole nor any part of Our valuation report or Valuation Services report or any reference to it may be included in any published document, circular or statement, prospectus, Product Disclosure Statement (PDS), public offer document, nor published in any way, without written approval by one of Our Directors as to the form and context in which our Valuation or Valuation Services may appear. Notwithstanding the foregoing, the Client agrees that if it does communicate to a third party the whole or any part of this Valuation or the Valuation Services it shall also communicate to that third party these Terms and Conditions. Furthermore, you agree to indemnify Us in the event of any failure so to do.</p>
              
              <p>17. You agree that every right, immunity, exemption and limitation or liability in these terms and conditions shall continue to have its full force and effect in all circumstances</p>
            </div>
          </div>

          {/* Supporting Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Supporting Documents</h3>
            <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg">
              <h4 className="font-medium mb-2 text-foreground">Uploaded Documents & OCR Content:</h4>
              <p className="text-sm text-muted-foreground mb-3">
                The following documents and extracted content from OCR processing are included as part of this valuation report:
              </p>
              
              <div className="space-y-2">
                <div className="text-sm text-foreground">
                  <strong>Property Photos & Documents:</strong> All uploaded property images and documents from the Document and Photo Upload section
                </div>
                <div className="text-sm text-foreground">
                  <strong>OCR Extracted Text:</strong> Any text content extracted from uploaded documents through optical character recognition
                </div>
                <div className="text-sm text-foreground">
                  <strong>Tenant Documents:</strong> Tenant summaries, lease documents, and supporting legal documents uploaded in the Tenancy Schedule section
                </div>
                <div className="text-sm text-foreground">
                  <strong>Planning Documents:</strong> Any planning-related documents and certificates uploaded during the assessment process
                </div>
              </div>
              
              <div className="mt-3 p-2 bg-white dark:bg-gray-800 rounded text-xs text-muted-foreground">
                Note: All uploaded documents are retained as part of the permanent record for this valuation and may be referenced 
                for verification purposes. Document authenticity and accuracy remain the responsibility of the client.
              </div>
            </div>
          </div>

          {/* Environmental and Contamination Disclaimers */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Environmental and Contamination Disclaimers</h3>
            <div className="space-y-3 text-sm text-foreground">
              <p><strong>18. Environmental Assessment Limitations:</strong></p>
              
              <div className="pl-4 space-y-2">
                <p>(a) We are not environmental specialists or experts in contamination assessment. Any environmental observations or assessments provided are general in nature and should not be relied upon as a comprehensive environmental investigation.</p>
                
                <p>(b) We recommend that You engage qualified environmental consultants to conduct detailed environmental investigations where there is any indication of potential contamination or environmental risk.</p>
                
                <p>(c) Our assessment of environmental factors is limited to visual inspection and readily apparent conditions. We do not conduct soil testing, air quality monitoring, or other specialist environmental testing unless specifically engaged and qualified to do so.</p>
                
                <p>(d) We exclude all liability for environmental contamination, hazardous substances, or other environmental conditions that are not readily apparent during inspection or that require specialist knowledge or testing to identify.</p>
              </div>
              
              <p><strong>19. Contamination and Hazardous Substances:</strong></p>
              
              <div className="pl-4 space-y-2">
                <p>(a) We do not warrant that the property is free from contamination by hazardous substances including but not limited to asbestos, lead paint, PFAS, petroleum products, chemicals, or residues from illegal drug activities.</p>
                
                <p>(b) The presence of contamination may significantly impact property value, marketability, financing options, and ongoing costs. You should seek specialist advice regarding potential contamination risks.</p>
                
                <p>(c) Where we identify potential contamination risks, this should be treated as preliminary only and professional environmental assessment is strongly recommended before making any property-related decisions.</p>
                
                <p>(d) We exclude liability for any costs associated with environmental remediation, ongoing monitoring, legal compliance, or health impacts related to environmental contamination.</p>
              </div>
              
              <p><strong>20. Professional Indemnity Exclusions:</strong></p>
              
              <div className="pl-4 space-y-2">
                <p>(a) Our Professional Indemnity Insurance may exclude or limit coverage for claims related to environmental contamination, hazardous substances, or specialist environmental advice.</p>
                
                <p>(b) You acknowledge that environmental risks may require separate specialist advice and insurance coverage.</p>
              </div>
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
              
              <p>The insurance value set out in the Valuation Report is an estimate of the cost to replace the property new and is based on construction costs at the date of valuation. The value includes some, but not all, ancillary costs that may be encountered when rebuilding the property as detailed in the Valuation Report. The insurance value should not be relied on as a full and accurate estimation of the insurance value for the purposes of deciding at to the level of insurance coverage you should maintain.</p>
              
              <p>The contents of the Valuation Report are confidential and [White Label Firm Name] does not authorise the disclosure of the Valuation Report by the Lender's Customer to any third party.</p>
              
              <p>The Lender's Customer should take note of the date of valuation of the subject property and be aware that the Valuation Report is current at the date of valuation only. The market value of the property may change significantly over a short period of time.</p>
              
              <p>The Lender's Customer should direct any questions relating to the Valuation Report to the Lender. [White Label Firm Name] is unable to speak to you directly due to privacy and confidentiality obligations owed to the Lender.</p>
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