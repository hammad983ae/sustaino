import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { FileText, Scale, Users, AlertTriangle, CheckCircle, XCircle, Clock } from "lucide-react";

export default function RentDetermination() {
  const [includeSection, setIncludeSection] = useState(true);
  const [memberRole, setMemberRole] = useState("");
  const [conflictOfInterest, setConflictOfInterest] = useState("");
  const [feeArrangement, setFeeArrangement] = useState("");
  const [activeTab, setActiveTab] = useState("role-definition");

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-semibold">Rent Determination</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="include-rent-determination" className="text-sm">Include</Label>
          <Switch 
            id="include-rent-determination" 
            checked={includeSection}
            onCheckedChange={setIncludeSection}
          />
        </div>
      </div>

      {includeSection && (
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="role-definition">Role & Instructions</TabsTrigger>
              <TabsTrigger value="lease-analysis">Lease Analysis</TabsTrigger>
              <TabsTrigger value="submissions">Submissions</TabsTrigger>
              <TabsTrigger value="determination">Determination</TabsTrigger>
            </TabsList>

            {/* Role Definition and Instructions */}
            <TabsContent value="role-definition" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-500" />
                    <CardTitle>Member Role Definition</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">GP Compliance Required</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="member-role">Member Role in Rent Determination</Label>
                    <Select value={memberRole} onValueChange={setMemberRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role in this matter" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border z-50">
                        <SelectItem value="expert-opinion">Expert Opinion Provider (to one party)</SelectItem>
                        <SelectItem value="advocate">Advocate for Client (Submission)</SelectItem>
                        <SelectItem value="determining-valuer">Expert Valuer (Determining Valuer)</SelectItem>
                        <SelectItem value="arbitrator">Arbitrator</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {memberRole && (
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        {memberRole === "expert-opinion" && "Acting as expert opinion provider: You must provide independent, objective opinion in relation to rent. This excludes advocating a client's position."}
                        {memberRole === "advocate" && "Acting as advocate: You are advocating your client's opinion/position that may differ from an expert valuer opinion. Clearly identify this role to all parties."}
                        {memberRole === "determining-valuer" && "Acting as determining valuer: You must provide independent expert opinion and cannot delegate this task. Ensure proper appointment process and indemnity arrangements."}
                        {memberRole === "arbitrator" && "Acting as arbitrator: You must have requisite training, knowledge and experience. The determination is limited to submissions without independent market investigation."}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="instruction-date">Instruction Date</Label>
                      <Input id="instruction-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="lease-parties">Parties to Lease</Label>
                      <Input id="lease-parties" placeholder="Landlord and Tenant names" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="written-instructions">Written Instructions Received</Label>
                    <Textarea 
                      id="written-instructions" 
                      placeholder="Detail the written instructions received, including scope of work as per IVS 101..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Conflict of Interest Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>Conflict of Interest Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="conflict-assessment">Conflict of Interest Declaration</Label>
                    <Select value={conflictOfInterest} onValueChange={setConflictOfInterest}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select conflict status" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border z-50">
                        <SelectItem value="no-conflict">No real, perceived or potential conflict</SelectItem>
                        <SelectItem value="potential-conflict">Potential conflict identified</SelectItem>
                        <SelectItem value="conflict-exists">Conflict exists - cannot proceed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {conflictOfInterest === "potential-conflict" && (
                    <Alert className="border-orange-200">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <AlertDescription className="text-orange-700">
                        Potential conflict identified. Provide full disclosure to all parties and obtain written consent before proceeding.
                      </AlertDescription>
                    </Alert>
                  )}

                  {conflictOfInterest === "conflict-exists" && (
                    <Alert className="border-red-200">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <AlertDescription className="text-red-700">
                        Conflict of interest exists. You cannot proceed with this instruction.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div>
                    <Label htmlFor="conflict-details">Conflict Assessment Details</Label>
                    <Textarea 
                      id="conflict-details" 
                      placeholder="Detail any relationships, previous instructions, or other factors that could create conflicts..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="capacity-assessment">Capacity to Complete</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Assess capacity" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="sufficient">Sufficient capacity within timeframe</SelectItem>
                          <SelectItem value="tight">Tight timeframe but manageable</SelectItem>
                          <SelectItem value="insufficient">Insufficient capacity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="competence-level">Required Competence</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Assess competence" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="fully-competent">Fully competent in property type</SelectItem>
                          <SelectItem value="need-assistance">Require assistance from another member</SelectItem>
                          <SelectItem value="not-competent">Not competent - cannot proceed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Appointment Terms (for Determining Valuers) */}
              {memberRole === "determining-valuer" && (
                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle>Letter of Appointment Terms</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="border-blue-300 text-blue-700">Determining Valuer Only</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="fee-arrangement">Fee Payment Arrangement</Label>
                      <Select value={feeArrangement} onValueChange={setFeeArrangement}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fee arrangement" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="full-advance">Full payment before commencement</SelectItem>
                          <SelectItem value="release-on-payment">Release determination on full payment</SelectItem>
                            <SelectItem value="other">Other arrangement</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="submission-deadline">Submission Deadline</Label>
                        <Input id="submission-deadline" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="response-deadline">Response Submission Deadline</Label>
                        <Input id="response-deadline" type="date" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="indemnity-terms">Indemnity and Cross-Indemnity</Label>
                      <Textarea 
                        id="indemnity-terms" 
                        placeholder="Detail indemnity arrangements from both parties..."
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label htmlFor="dispute-resolution">Non-Valuation Dispute Resolution</Label>
                      <Textarea 
                        id="dispute-resolution" 
                        placeholder="Mechanism for resolving lease term disagreements or legal matters outside valuation scope..."
                        rows={2}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch id="third-party-disclaimer" />
                      <Label htmlFor="third-party-disclaimer">Third Party Disclaimer Included</Label>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Lease Analysis */}
            <TabsContent value="lease-analysis" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-500" />
                    <CardTitle>Lease Analysis and Rent Review Provisions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="lease-commencement">Lease Commencement Date</Label>
                      <Input id="lease-commencement" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="lease-expiry">Lease Expiry Date</Label>
                      <Input id="lease-expiry" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="review-date">Current Review Date</Label>
                      <Input id="review-date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="review-frequency">Review Frequency</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select review frequency" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="annual">Annual</SelectItem>
                          <SelectItem value="biennial">Every 2 Years</SelectItem>
                          <SelectItem value="triennial">Every 3 Years</SelectItem>
                          <SelectItem value="quinquennial">Every 5 Years</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="rent-definition">Lease Definition of Rent</Label>
                    <Textarea 
                      id="rent-definition" 
                      placeholder="Extract and detail the lease definition of rent, including what is included/excluded..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="review-provisions">Rent Review Provisions</Label>
                    <Textarea 
                      id="review-provisions" 
                      placeholder="Detail the rent review methodology specified in the lease (market rent, CPI, fixed increase, etc.)..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="current-rent">Current Passing Rent</Label>
                      <Input id="current-rent" placeholder="$0 per annum" />
                    </div>
                    <div>
                      <Label htmlFor="rent-payment-terms">Rent Payment Terms</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Payment frequency" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="monthly">Monthly in Advance</SelectItem>
                          <SelectItem value="quarterly">Quarterly in Advance</SelectItem>
                          <SelectItem value="annually">Annually in Advance</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="lease-terms-interpretation">Lease Terms Requiring Legal Interpretation</Label>
                    <Textarea 
                      id="lease-terms-interpretation" 
                      placeholder="Identify any lease terms that may require legal advice for proper interpretation..."
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="outgoings-responsibility">Outgoings Responsibility</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select responsibility" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="gross">Gross Lease (Landlord pays)</SelectItem>
                          <SelectItem value="net">Net Lease (Tenant pays all)</SelectItem>
                          <SelectItem value="semi-gross">Semi-Gross (Shared)</SelectItem>
                          <SelectItem value="specific">Specific Allocation</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="rental-gst-treatment">Rental GST Treatment</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Rental GST treatment" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="inclusive">Inclusive of GST</SelectItem>
                          <SelectItem value="exclusive">Exclusive of GST</SelectItem>
                          <SelectItem value="as-specified">As specified in lease</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="value-gst-treatment">Value GST Treatment</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Value GST treatment" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="inclusive">GST Inclusive</SelectItem>
                          <SelectItem value="exclusive">GST Exclusive</SelectItem>
                          <SelectItem value="going-concern">Going Concern (GST Inclusive)</SelectItem>
                          <SelectItem value="vacant-possession">Vacant Possession (GST Free)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="special-conditions">Special Conditions</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select conditions" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="sale-leaseback">Sale & Leaseback</SelectItem>
                          <SelectItem value="forced-sale">Forced Sale</SelectItem>
                          <SelectItem value="bulk-discount">Bulk Discount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Submissions Management */}
            <TabsContent value="submissions" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    <CardTitle>Submission Management</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Landlord Submission */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      <Badge variant="outline">Landlord Submission</Badge>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="landlord-submission-date">Submission Date</Label>
                        <Input id="landlord-submission-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="landlord-rent-assessment">Landlord's Rent Assessment</Label>
                        <Input id="landlord-rent-assessment" placeholder="$0 per annum" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="landlord-submission-summary">Submission Summary</Label>
                      <Textarea 
                        id="landlord-submission-summary" 
                        placeholder="Summarize key contentions, evidence, and methodology from landlord's submission..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="landlord-evidence">Supporting Evidence</Label>
                      <Textarea 
                        id="landlord-evidence" 
                        placeholder="Detail comparable evidence, market data, and supporting documentation provided..."
                        rows={2}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Tenant Submission */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base flex items-center gap-2">
                      <Badge variant="outline">Tenant Submission</Badge>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="tenant-submission-date">Submission Date</Label>
                        <Input id="tenant-submission-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="tenant-rent-assessment">Tenant's Rent Assessment</Label>
                        <Input id="tenant-rent-assessment" placeholder="$0 per annum" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="tenant-submission-summary">Submission Summary</Label>
                      <Textarea 
                        id="tenant-submission-summary" 
                        placeholder="Summarize key contentions, evidence, and methodology from tenant's submission..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tenant-evidence">Supporting Evidence</Label>
                      <Textarea 
                        id="tenant-evidence" 
                        placeholder="Detail comparable evidence, market data, and supporting documentation provided..."
                        rows={2}
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Submission Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base">Submission Analysis</h4>
                    <div>
                      <Label htmlFor="areas-of-agreement">Areas of Agreement</Label>
                      <Textarea 
                        id="areas-of-agreement" 
                        placeholder="Identify areas where both parties agree (property description, lease terms, market conditions, etc.)..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="areas-of-disagreement">Areas of Disagreement</Label>
                      <Textarea 
                        id="areas-of-disagreement" 
                        placeholder="Identify key areas of disagreement between the parties and their respective positions..."
                        rows={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="without-prejudice-offers">Without Prejudice Offers</Label>
                      <Textarea 
                        id="without-prejudice-offers" 
                        placeholder="Note any 'without prejudice' offers (these should NOT be considered in the determination)..."
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Response Submissions */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base">Response Submissions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="landlord-response-date">Landlord Response Date</Label>
                        <Input id="landlord-response-date" type="date" />
                      </div>
                      <div>
                        <Label htmlFor="tenant-response-date">Tenant Response Date</Label>
                        <Input id="tenant-response-date" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="response-analysis">Response Submission Analysis</Label>
                      <Textarea 
                        id="response-analysis" 
                        placeholder="Analyze response submissions - note these should only address matters in original submissions, not introduce new evidence..."
                        rows={3}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Determination */}
            <TabsContent value="determination" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-primary" />
                    <CardTitle>Rent Determination</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* Independent Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base">Independent Market Analysis</h4>
                    <Alert>
                      <CheckCircle className="h-4 w-4" />
                      <AlertDescription>
                        As determining valuer, you must conduct your own independent analysis and not rely solely on submissions.
                      </AlertDescription>
                    </Alert>
                    <div>
                      <Label htmlFor="market-evidence-sourced">Market Evidence Sourced</Label>
                      <Textarea 
                        id="market-evidence-sourced" 
                        placeholder="Detail independent market evidence sourced and analysed for the determination..."
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="valuation-methodology">Valuation Methodology Applied</Label>
                      <Textarea 
                        id="valuation-methodology" 
                        placeholder="Describe the valuation approach and methods used in forming your opinion..."
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Market Analysis */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base">Market Analysis</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="market-conditions">Market Conditions</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Assess market" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border z-50">
                            <SelectItem value="strong">Strong Market</SelectItem>
                            <SelectItem value="stable">Stable Market</SelectItem>
                            <SelectItem value="weak">Weak Market</SelectItem>
                            <SelectItem value="volatile">Volatile Market</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="supply-demand">Supply/Demand Balance</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Assess balance" />
                          </SelectTrigger>
                          <SelectContent className="bg-background border border-border z-50">
                            <SelectItem value="undersupply">Undersupply</SelectItem>
                            <SelectItem value="balanced">Balanced</SelectItem>
                            <SelectItem value="oversupply">Oversupply</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="rental-growth">Rental Growth Trend</Label>
                        <Input id="rental-growth" placeholder="% per annum" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="market-commentary">Market Commentary</Label>
                      <Textarea 
                        id="market-commentary" 
                        placeholder="Provide commentary on current market conditions, trends, and factors affecting rental values..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Determination Outcome */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base">Determination Outcome</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="determined-rent">Determined Market Rent</Label>
                        <Input id="determined-rent" placeholder="$0 per annum" className="text-lg font-bold" />
                      </div>
                      <div>
                        <Label htmlFor="effective-date">Effective Date</Label>
                        <Input id="effective-date" type="date" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="determination-rationale">Determination Rationale</Label>
                      <Textarea 
                        id="determination-rationale" 
                        placeholder="Provide comprehensive rationale for the rent determined, including key factors considered and weight given to evidence..."
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="submissions-weight">Weight Given to Submissions</Label>
                      <Textarea 
                        id="submissions-weight" 
                        placeholder="Explain the extent to which you agreed or disagreed with each party's submission and rationale..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Report Requirements */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-base">Report Compliance</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Instructions referenced",
                        "Asset details provided",
                        "Purpose limitations stated",
                        "Parties identified",
                        "Third party disclaimer included",
                        "Valuation/inspection dates stated",
                        "Lease precis included",
                        "Submissions discussed",
                        "Valuation approach detailed",
                        "Supporting evidence provided",
                        "Determination rationale explained",
                        "GST treatment addressed",
                        "Limitations/qualifications stated"
                      ].map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Switch id={`requirement-${index}`} />
                          <Label htmlFor={`requirement-${index}`} className="text-sm">{requirement}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Certification */}
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="pt-6">
                      <h5 className="font-semibold mb-3">Determination Certification</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Switch id="independent-determination" />
                          <Label htmlFor="independent-determination">I certify this determination is my independent expert opinion</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="proper-investigation" />
                          <Label htmlFor="proper-investigation">I have conducted proper investigation and analysis</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="lease-compliance" />
                          <Label htmlFor="lease-compliance">The determination complies with lease provisions</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="ivs-compliance" />
                          <Label htmlFor="ivs-compliance">The determination complies with IVS 103 Reporting</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}