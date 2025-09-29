import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useReportData } from '@/contexts/ReportDataContext';
import { useUniversalSave } from '@/hooks/useUniversalSave';
import { Camera, Upload, Save } from 'lucide-react';
import { useProperty } from '@/contexts/PropertyContext';
import { apiClient } from '@/lib/api';

interface PropertyPhotosProps {
  propertyAddress: string;
}

const PropertyPhotos = ({ propertyAddress }: PropertyPhotosProps) => {
  const { reportData, updateReportData } = useReportData();
  const { saveData, loadData, isSaving } = useUniversalSave('PropertyPhotos');
  const [localPhotos, setLocalPhotos] = useState<any[]>([]);
  const [jobPropertyPhotos, setJobPropertyPhotos] = useState<any[]>([]);
  
  // Default photos if no uploaded photos
  const defaultPhotos = [
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

  useEffect(() => {
    // Load saved photos on mount
    loadData().then(savedData => {
      if (savedData?.photos) {
        setLocalPhotos(savedData.photos);
      }
    });
  }, [loadData]);

  // Load property photos from job data
  useEffect(() => {
    const loadJobPhotos = async () => {
      try {
        // Get current job ID from URL or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const jobId = urlParams.get('jobId') || localStorage.getItem('currentJobId');
        
        if (jobId) {
          console.log('PropertyPhotos: Loading job photos for jobId:', jobId);
          
          const response = await apiClient.getJob(jobId);
          if (response.success && response.data.job.property?.photos) {
            console.log('PropertyPhotos: Found property photos:', response.data.job.property.photos);
            setJobPropertyPhotos(response.data.job.property.photos);
          } else {
            console.log('PropertyPhotos: No property photos found in job');
            console.log('PropertyPhotos: Job response:', response);
            console.log('PropertyPhotos: Job property:', response.data?.job?.property);
          }
        }
      } catch (error) {
        console.error('PropertyPhotos: Error loading job photos:', error);
      }
    };
    
    loadJobPhotos();
  }, []);

  // Also listen for job loaded events
  useEffect(() => {
    const handleJobLoaded = (event: CustomEvent) => {
      console.log('PropertyPhotos: Job loaded event received:', event.detail);
      // Reload photos when job is loaded
      const loadJobPhotos = async () => {
        try {
          const urlParams = new URLSearchParams(window.location.search);
          const jobId = urlParams.get('jobId') || localStorage.getItem('currentJobId');
          
          if (jobId) {
            console.log('PropertyPhotos: Reloading job photos for jobId:', jobId);
            
            const response = await apiClient.getJob(jobId);
            if (response.success && response.data.job.property?.photos) {
              console.log('PropertyPhotos: Found property photos on reload:', response.data.job.property.photos);
              setJobPropertyPhotos(response.data.job.property.photos);
            }
          }
        } catch (error) {
          console.error('PropertyPhotos: Error reloading job photos:', error);
        }
      };
      
      loadJobPhotos();
    };

    window.addEventListener('jobLoadedIntoSession', handleJobLoaded as EventListener);
    
    return () => {
      window.removeEventListener('jobLoadedIntoSession', handleJobLoaded as EventListener);
    };
  }, []);

  // Use uploaded photos from report data if available, otherwise use defaults
  const uploadedPhotos = reportData.fileAttachments?.propertyPhotos || [];
  const savedPhotos = localPhotos.length > 0 ? localPhotos : uploadedPhotos;
  
  // Combine job property photos with other photos
  const allPhotos = [...jobPropertyPhotos, ...savedPhotos];
  
  console.log('PropertyPhotos: Photo data:', {
    jobPropertyPhotos: jobPropertyPhotos.length,
    savedPhotos: savedPhotos.length,
    allPhotos: allPhotos.length,
    jobPropertyPhotosData: jobPropertyPhotos
  });
  
  const photos = allPhotos.length > 0 
    ? allPhotos.map(photo => ({
        src: photo.url || photo.src,
        alt: photo.caption || photo.description || photo.alt || photo.name,
        title: photo.type || photo.title || (photo.name ? photo.name.split('.')[0].replace(/[_-]/g, ' ') : 'Property Photo'),
        description: photo.caption || photo.description || 'Property photo'
      }))
    : defaultPhotos;

  const handleSavePhotos = async () => {
    const photoData = {
      photos: photos,
      propertyAddress,
      savedAt: new Date().toISOString(),
      photoCount: photos.length
    };
    
    const result = await saveData(photoData);
    if (result.success) {
      // Also update report data
      updateReportData('fileAttachments', {
        ...reportData.fileAttachments,
        propertyPhotos: photos.map(photo => ({
          url: photo.src,
          name: photo.title,
          description: photo.description,
          uploadedAt: new Date().toISOString()
        }))
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl font-semibold">Property Photos</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{photos.length} Photos</Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSavePhotos}
              disabled={isSaving}
              className="flex items-center gap-1"
            >
              <Save className="h-3 w-3" />
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
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