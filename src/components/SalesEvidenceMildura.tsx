import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock } from "lucide-react";

export default function SalesEvidenceMildura() {
  const salesData = [
    {
      property: "Worker Accommodation, Mildura",
      salePrice: "$1,200,000",
      yield: "7.5%",
      numberOfRooms: 20,
      pricePerRoom: "$60,000",
      dateOfSale: "Q2 2024",
      comments: "Purpose-built, strong demand"
    },
    {
      property: "Regional Motel, Mildura",
      salePrice: "$2,500,000",
      yield: "8%",
      numberOfRooms: 20,
      pricePerRoom: "$125,000",
      dateOfSale: "Q4 2023",
      comments: "Well-established, modern amenities"
    },
    {
      property: "Motel, Gippsland",
      salePrice: "$1,800,000",
      yield: "8%",
      numberOfRooms: 15,
      pricePerRoom: "$120,000",
      dateOfSale: "Q3 2023",
      comments: "Strategic location, high occupancy"
    },
    {
      property: "Motel, Murray Valley",
      salePrice: "$2,200,000",
      yield: "7.5%",
      numberOfRooms: 25,
      pricePerRoom: "$88,000",
      dateOfSale: "Q2 2023",
      comments: "Recent upgrade, good access"
    },
    {
      property: "Worker Accommodation, Riverina",
      salePrice: "$950,000",
      yield: "7.8%",
      numberOfRooms: 15,
      pricePerRoom: "$63,333",
      dateOfSale: "Q1 2024",
      comments: "New build, high occupancy expectations"
    },
    {
      property: "Small Regional Motel, Gippsland",
      salePrice: "$1,200,000",
      yield: "7.9%",
      numberOfRooms: 12,
      pricePerRoom: "$100,000",
      dateOfSale: "Q4 2023",
      comments: "Niche market, stable income"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              Recent Sales Data - 320 Deakin Avenue, Mildura
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
                  <th className="border border-muted p-3 text-left font-semibold">Sale Price</th>
                  <th className="border border-muted p-3 text-left font-semibold">Yield</th>
                  <th className="border border-muted p-3 text-left font-semibold">No. of Rooms</th>
                  <th className="border border-muted p-3 text-left font-semibold">Price per Room</th>
                  <th className="border border-muted p-3 text-left font-semibold">Date of Sale</th>
                  <th className="border border-muted p-3 text-left font-semibold">Comments</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale, index) => (
                  <tr key={index} className="hover:bg-muted/20">
                    <td className="border border-muted p-3">{sale.property}</td>
                    <td className="border border-muted p-3 font-semibold text-primary">{sale.salePrice}</td>
                    <td className="border border-muted p-3">{sale.yield}</td>
                    <td className="border border-muted p-3">{sale.numberOfRooms}</td>
                    <td className="border border-muted p-3">{sale.pricePerRoom}</td>
                    <td className="border border-muted p-3">{sale.dateOfSale}</td>
                    <td className="border border-muted p-3 text-sm">{sale.comments}</td>
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