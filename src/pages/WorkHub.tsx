import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Briefcase, 
  MapPin, 
  FileText, 
  Plus,
  Search,
  MoreHorizontal,
  Play,
  CheckCircle,
  DollarSign,
  User,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useJobs } from '@/hooks/useJobs';
import { getStatusColor, getPriorityColor, getStatusDisplayName, getPriorityDisplayName } from '@/lib/status-helpers';
import { formatDate, formatWorkHours } from '@/lib/formatting';
import type { JobStatus } from '@/types';

const WorkHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<JobStatus | 'all'>('all');

  // Use custom hook for data fetching
  const { jobs, loading, error, stats } = useJobs({
    searchTerm,
    statusFilter: filterStatus
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <ArrowRight className="h-4 w-4 rotate-180" />
                  Back to Main Dashboard
                </Link>
              </div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Briefcase className="h-8 w-8 text-primary" />
                Work Hub
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage valuation jobs, track progress, and monitor deadlines
              </p>
            </div>
            <Link to="/property-valuations">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                New Valuation Job
              </Button>
            </Link>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Jobs</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <Briefcase className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                    <p className="text-2xl font-bold text-primary">{stats.active}</p>
                  </div>
                  <Play className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-success">{stats.completed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold text-primary">${stats.totalValue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search jobs by address, client, or job number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as JobStatus | 'all')}
                    className="border border-input bg-background px-3 py-2 text-sm rounded-md"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jobs List */}
          {loading && (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <div className="text-muted-foreground">Loading jobs...</div>
              </CardContent>
            </Card>
          )}
          
          {error && (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <div className="text-destructive">Error: {error}</div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Job Info */}
                    <div className="lg:col-span-2 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{job.id}</h3>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.propertyAddress}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {job.clientName}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(job.priority)}>
                            {getPriorityDisplayName(job.priority)}
                          </Badge>
                          <Badge className={getStatusColor(job.status)}>
                            {getStatusDisplayName(job.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Progress & Details */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <div className="w-full bg-secondary h-2 rounded-full">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Due: {formatDate(job.dueDate)}</p>
                        <p>Hours: {formatWorkHours(job.actualHours)}/{formatWorkHours(job.estimatedHours)}</p>
                        <p>Fee: ${job.feeQuoted.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {job.status === 'in-progress' && (
                        <Link to="/report">
                          <Button size="sm" className="w-full">
                            <Play className="h-4 w-4 mr-2" />
                            Continue Report
                          </Button>
                        </Link>
                      )}
                      {job.status === 'pending' && (
                        <Link to="/property-valuations">
                          <Button size="sm" variant="outline" className="w-full">
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Start Job
                          </Button>
                        </Link>
                      )}
                      {job.status === 'completed' && (
                        <Button size="sm" variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          View Report
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="w-full">
                        <MoreHorizontal className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {!loading && !error && jobs.length === 0 && (
            <Card>
              <CardContent className="pt-12 pb-12 text-center">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterStatus !== 'all' 
                    ? 'Try adjusting your search criteria'
                    : 'Start by creating your first valuation job'
                  }
                </p>
                <Link to="/property-valuations">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Valuation Job
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkHub;