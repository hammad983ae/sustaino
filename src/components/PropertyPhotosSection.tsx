import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, MapPin } from "lucide-react";

const PropertyPhotosSection = () => {
  const propertyPhotos = [
    {
      url: "/lovable-uploads/8ebd45d3-6a11-4af2-94c8-854a558d049b.png",
      title: "Modern Kitchen with Stone Benchtops",
      description: "Recently renovated kitchen featuring stone benchtops, stainless steel appliances, and breakfast bar",
      category: "Interior"
    },
    {
      url: "/lovable-uploads/71478d74-2947-4353-8706-694d4e5eaa5b.png", 
      title: "Kitchen Island and Gas Cooktop",
      description: "Modern kitchen with gas cooktop, rangehood, and ample storage",
      category: "Interior"
    },
    {
      url: "/lovable-uploads/5085dc76-bbe3-4796-9adb-913e06767619.png",
      title: "Kitchen with Electric Cooking",
      description: "Clean modern kitchen with electric cooktop and quality appliances",
      category: "Interior"
    },
    {
      url: "/lovable-uploads/f07bd0a1-c5e2-4e4c-8950-c5c9f4f9e09f.png",
      title: "Modern Bathroom Renovation",
      description: "Fully renovated bathroom with marble-look tiles, glass shower, and modern fixtures",
      category: "Interior"
    },
    {
      url: "/lovable-uploads/d732a468-e4b0-4cd7-a59f-a8aa55540435.png",
      title: "Property Street Frontage",
      description: "Front view of 320 Deakin Avenue showing established street frontage with secure fencing",
      category: "Exterior"
    },
    {
      url: "/lovable-uploads/553df8ef-36eb-4acb-b33c-0f244d20743a.png",
      title: "Driveway and Front Yard",
      description: "Concrete driveway providing off-street parking with established front gardens",
      category: "Exterior"
    },
    {
      url: "/lovable-uploads/d5e26506-59a0-4dd4-993e-03fd6678c6af.png",
      title: "Outdoor Entertaining Area",
      description: "Paved outdoor entertaining area with brick dwelling and established gardens",
      category: "Exterior"
    },
    {
      url: "/lovable-uploads/6ea9a98f-a6f3-4724-a79e-f9883832bfa0.png",
      title: "Covered Outdoor Area",
      description: "Large covered outdoor entertaining area with dining space",
      category: "Exterior"
    },
    {
      url: "/lovable-uploads/4e1285cd-3805-4d87-919f-5901cc616e3b.png",
      title: "Rear Yard and New Fencing",
      description: "Well-maintained rear yard with new timber fencing and lawn areas",
      category: "Exterior"
    }
  ];

  const interiorPhotos = propertyPhotos.filter(photo => photo.category === "Interior");
  const exteriorPhotos = propertyPhotos.filter(photo => photo.category === "Exterior");

  return (
    <div className="space-y-6">
      {/* Property Photos Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl">Property Photos - 320 Deakin Avenue, Mildura</CardTitle>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              9 Photos Included
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Professional property photography showcasing interior renovations and exterior features
          </p>
        </CardHeader>
      </Card>

      {/* Interior Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Interior Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interiorPhotos.map((photo, index) => (
              <div key={index} className="space-y-3">
                <div className="relative aspect-video overflow-hidden rounded-lg border shadow-sm">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                      {photo.category}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{photo.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exterior Photos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Exterior Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exteriorPhotos.map((photo, index) => (
              <div key={index} className="space-y-3">
                <div className="relative aspect-video overflow-hidden rounded-lg border shadow-sm">
                  <img 
                    src={photo.url} 
                    alt={photo.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                      {photo.category}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{photo.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photo Summary */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h4 className="font-semibold text-primary">Photography Summary</h4>
            <p className="text-sm text-muted-foreground">
              All photos taken during property inspection on valuation date. Images showcase recent renovations 
              including modern kitchen with stone benchtops, updated bathroom facilities, and well-maintained 
              exterior areas with secure fencing and established gardens.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyPhotosSection;