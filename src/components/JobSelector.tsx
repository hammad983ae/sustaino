import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useJobManager } from '@/hooks/useJobManager';
import JobCreationModal from '@/components/JobCreationModal';
import { Plus, FileText, Calendar, MapPin, Trash2, Users, Building } from 'lucide-react';

interface JobSelectorProps {
  onStartFresh: () => void;
  onLoadJob: (jobId: string) => void;
  onCreateNewJob: (jobId: string) => void;
  onClose?: () => void;
}

const JobSelector: React.FC<JobSelectorProps> = ({ onStartFresh, onLoadJob, onCreateNewJob, onClose }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [showJobCreation, setShowJobCreation] = useState(false);
  const { getAllJobs, deleteJob, isLoading } = useJobManager();

  useEffect(() => {
    const loadJobs = async () => {
      const allJobs = await getAllJobs();
      setJobs(allJobs.sort((a, b) => new Date(b.updatedAt || b.createdAt || '').getTime() - new Date(a.updatedAt || a.createdAt || '').getTime()));
    };
    
    loadJobs();
  }, [getAllJobs]);

  const handleDeleteJob = async (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      const success = await deleteJob(jobId);
      if (success) {
        const updatedJobs = await getAllJobs();
        setJobs(updatedJobs.sort((a, b) => new Date(b.updatedAt || b.createdAt || '').getTime() - new Date(a.updatedAt || a.createdAt || '').getTime()));
      }
    }
  };

  const handleJobCreated = (jobId: string, propertyId?: string) => {
    setShowJobCreation(false);
    onCreateNewJob(jobId, propertyId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Property Assessment Manager</h1>
          <p className="text-muted-foreground">
            The world's most comprehensive property valuation system
          </p>
        </div>

        {/* Professional Assessment */}
        <div className="flex justify-center">
          <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">New Professional Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Start with client intake, create comprehensive job file, and conduct full property assessment
                  </p>
                </div>
                <Button onClick={() => setShowJobCreation(true)} size="lg" className="w-full">
                  Create New Job
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

      {/* Existing Jobs */}
      {jobs.length > 0 && (
        <>
          <Separator />
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Previous Jobs</h2>
            <div className="grid gap-4">
              {jobs.map((job) => (
                <Card 
                  key={job.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onLoadJob(job.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {job.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <MapPin className="h-3 w-3" />
                          {job.propertyAddress}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.replace('_', ' ')}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDeleteJob(job.id, e)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Created: {new Date(job.createdAt || '').toLocaleDateString()}
                        </span>
                        {job.updatedAt && job.updatedAt !== job.createdAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Updated: {new Date(job.updatedAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="capitalize">{job.type}</span>
                        {job.dueDate && (
                          <span className="text-orange-600">
                            Due: {new Date(job.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    {job.notes && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                        {job.notes}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No previous jobs</h3>
          <p className="text-gray-500">Start your first property assessment to get started</p>
        </div>
      )}

        {onClose && (
          <div className="flex justify-center pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        )}
      </div>
      
      <JobCreationModal
        isOpen={showJobCreation}
        onClose={() => setShowJobCreation(false)}
        onJobCreated={handleJobCreated}
      />
    </>
  );
};

export default JobSelector;
