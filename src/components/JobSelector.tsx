import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useJobManager } from '@/hooks/useJobManager';
import { Plus, FileText, Calendar, MapPin, Trash2 } from 'lucide-react';

interface JobSelectorProps {
  onStartFresh: () => void;
  onLoadJob: (jobId: string) => void;
  onClose?: () => void;
}

const JobSelector: React.FC<JobSelectorProps> = ({ onStartFresh, onLoadJob, onClose }) => {
  const [jobs, setJobs] = useState<any[]>([]);
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
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Property Assessment Jobs</h1>
        <p className="text-muted-foreground">
          Start a new assessment or continue working on an existing job
        </p>
      </div>

      {/* Start Fresh Button */}
      <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Start New Assessment
              </h3>
              <p className="text-sm text-muted-foreground">
                Begin a fresh property assessment session
              </p>
            </div>
            <Button onClick={onStartFresh} size="lg" className="ml-4">
              Start Fresh
            </Button>
          </div>
        </CardContent>
      </Card>

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
  );
};

export default JobSelector;
