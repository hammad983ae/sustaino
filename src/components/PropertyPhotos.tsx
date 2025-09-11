import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PropertyPhotosProps {
  propertyAddress: string;
}

const PropertyPhotos = ({ propertyAddress }: PropertyPhotosProps) => {
  const photos = [
    {
      src: "/lovable-uploads/b8e317ec-d54a-4985-971b-2286c4ba16b8.png",
      alt: "Front exterior view of 320 Deakin Avenue",
      title: "Front Exterior",
      description: "Single story brick veneer home with security fencing"
    },
    {
      src: "/lovable-uploads/94ed0c55-57c3-4721-bce9-60460195a7ed.png", 
      alt: "Street view with driveway and car",
      title: "Street View",
      description: "Driveway access and street frontage"
    },
    {
      src: "/lovable-uploads/d8f0c168-3f78-4505-944e-650ae39f4b7e.png",
      alt: "Kitchen with island bench and modern appliances",
      title: "Main Kitchen",
      description: "Modern kitchen with island bench, gas cooktop and quality appliances"
    },
    {
      src: "/lovable-uploads/1923715f-e356-49d3-82d7-2d2ea55eab44.png",
      alt: "Kitchen showing gas cooktop and range hood", 
      title: "Kitchen Cooking Area",
      description: "Gas cooktop with modern range hood and stainless steel appliances"
    },
    {
      src: "/lovable-uploads/64776f15-4ac5-4df6-aa9b-49659cfc75ca.png",
      alt: "Alternative kitchen view with electric cooktop",
      title: "Kitchen Alternative View", 
      description: "Electric cooktop configuration with white cabinetry"
    },
    {
      src: "/lovable-uploads/26df2df4-d039-40ea-a3eb-4cba94b29f25.png",
      alt: "Outdoor entertaining area with paved patio",
      title: "Outdoor Entertaining",
      description: "Paved outdoor entertaining area with quality finishes"
    },
    {
      src: "/lovable-uploads/05e097a5-54d8-4dac-a2ab-b617454a6f73.png",
      alt: "Covered outdoor area with seating",
      title: "Covered Outdoor Area",
      description: "Undercover entertaining space with seating"
    },
    {
      src: "/lovable-uploads/63512d3f-82a9-452e-8010-0b78d4c3e40b.png",
      alt: "Backyard with new timber fencing",
      title: "Backyard",
      description: "Well-maintained lawn with new timber fencing"
    },
    {
      src: "/lovable-uploads/afa255b1-2f74-4f08-9a75-dbea69fad1b2.png",
      alt: "Modern bathroom with shower",
      title: "Bathroom",
      description: "Modern bathroom with quality fixtures and finishes"
    }
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Property Photos</CardTitle>
          <Badge variant="secondary">{photos.length} Photos</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{propertyAddress}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="space-y-2">
              <div className="aspect-video relative overflow-hidden rounded-lg border">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{photo.title}</h4>
                <p className="text-xs text-muted-foreground">{photo.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">Property Features Observed:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Modern kitchen with gas and electric cooking facilities</li>
            <li>• Quality stainless steel appliances throughout</li>
            <li>• Secure front fencing and established gardens</li>
            <li>• Paved outdoor entertaining areas</li>
            <li>• Undercover outdoor spaces</li>
            <li>• New timber boundary fencing</li>
            <li>• Modern bathroom with quality fixtures</li>
            <li>• Well-maintained lawned areas</li>
            <li>• Off-street parking via driveway</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyPhotos;