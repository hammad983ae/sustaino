import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Globe, ExternalLink } from "lucide-react";

export default function AdvertisingLinks() {
  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto p-6">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Auction-Sphere</CardTitle>
          <p className="text-muted-foreground">
            Revolutionary auction platform for property sales
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm">
            <li>• FREE Property Valuation (Worth $800)</li>
            <li>• Professional auction marketing</li>
            <li>• Advanced bidder qualification</li>
            <li>• 3D virtual tours available</li>
          </ul>
          <Button 
            className="w-full" 
            onClick={() => window.open('/advertising-platforms?platform=auction', '_blank')}
          >
            View Auction Packages <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Globe className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Sustaino Sphere</CardTitle>
          <p className="text-muted-foreground">
            Sustainable property marketplace for eco-conscious buyers
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-sm">
            <li>• FREE Digital Asset Valuation (Worth $650)</li>
            <li>• ESG assessment and scoring</li>
            <li>• Carbon footprint analysis</li>
            <li>• Green certification support</li>
          </ul>
          <Button 
            className="w-full"
            onClick={() => window.open('/advertising-platforms?platform=sustano', '_blank')}
          >
            View Sustainability Packages <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}