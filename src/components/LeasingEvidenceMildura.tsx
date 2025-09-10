import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export default function LeasingEvidenceMildura() {
  const leasingData = [
    {
      property: "Worker Accommodation, Mildura",
      leaseRatePerRoom: "$1,200 – $1,800",
      leaseTerm: "5-10 years",
      typeOfLease: "CPI-linked",
      comments: "Recent regional leases"
    },
    {
      property: "Regional Motel, Mildura",
      leaseRatePerRoom: "$1,500 – $2,000",
      leaseTerm: "5-10 years",
      typeOfLease: "Fixed / CPI",
      comments: "Well-established properties"
    },
    {
      property: "Motel, Gippsland",
      leaseRatePerRoom: "$1,300 – $1,900",
      leaseTerm: "5-10 years",
      typeOfLease: "CPI escalation",
      comments: "Properties near tourist attractions"
    },
    {
      property: "Motel, Murray Valley",
      leaseRatePerRoom: "$1,200 – $2,000",
      leaseTerm: "5-10 years",
      typeOfLease: "Fixed",
      comments: "Mostly long-term occupancy"
    },
    {
      property: "Caravan Park / Short-stay",
      leaseRatePerRoom: "$800 – $1,300",
      leaseTerm: "3-5 years",
      typeOfLease: "Fixed / CPI",
      comments: "Growing sector, seasonal peaks"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Leasing Evidence - 320 Deakin Avenue, Mildura
              <Lock className="h-4 w-4 text-primary" />
            </CardTitle>
            <Badge variant="secondary">Data Locked</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-muted">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-muted p-3 text-left font-semibold">Property / Location</th>
                  <th className="border border-muted p-3 text-left font-semibold">Lease Rate per Room per Annum</th>
                  <th className="border border-muted p-3 text-left font-semibold">Lease Term</th>
                  <th className="border border-muted p-3 text-left font-semibold">Type of Lease</th>
                  <th className="border border-muted p-3 text-left font-semibold">Comments</th>
                </tr>
              </thead>
              <tbody>
                {leasingData.map((lease, index) => (
                  <tr key={index} className="hover:bg-muted/20">
                    <td className="border border-muted p-3">{lease.property}</td>
                    <td className="border border-muted p-3 font-semibold text-primary">{lease.leaseRatePerRoom}</td>
                    <td className="border border-muted p-3">{lease.leaseTerm}</td>
                    <td className="border border-muted p-3">{lease.typeOfLease}</td>
                    <td className="border border-muted p-3 text-sm">{lease.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}