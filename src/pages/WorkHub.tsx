import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  Clock, 
  FileText, 
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  DollarSign,
  User,
  Building,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkHub = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock data for demonstration
  const jobs = [
    {
      id: 'VAL-2025-0001',
      propertyAddress: '320 Deakin Avenue, Mildura VIC 3500',
      clientName: 'ABC Property Group',
      clientEmail: 'contact@abcproperty.com.au',
      jobType: 'Commercial Valuation',
      status: 'in-progress',
      priority: 'high',
      dueDate: '2025-01-15',
      progress: 65,
      estimatedHours: 8,
      actualHours: 5.2,
      feeQuoted: 2500,
      lastUpdated: '2025-01-10'
    },
    {
      id: 'VAL-2025-0002',
      propertyAddress: '45 Main Street, Melbourne VIC 3000',
      clientName: 'XYZ Development',
      clientEmail: 'info@xyzdev.com.au',
      jobType: 'Residential Portfolio',
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-01-20',
      progress: 0,
      estimatedHours: 12,
      actualHours: 0,
      feeQuoted: 4200,
      lastUpdated: '2025-01-08'
    },
    {
      id: 'VAL-2025-0003',
      propertyAddress: '120 Collins Street, Melbourne VIC 3000',
      clientName: 'Premium Investments',
      clientEmail: 'team@premiuminvest.com.au',
      jobType: 'ESG Assessment',
      status: 'completed',
      priority: 'low',
      dueDate: '2025-01-05',
      progress: 100,
      estimatedHours: 6,
      actualHours: 5.8,
      feeQuoted: 1800,
      lastUpdated: '2025-01-05'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalValue = jobs.reduce((sum, job) => sum + job.feeQuoted, 0);
  const completedJobs = jobs.filter(job => job.status === 'completed').length;
  const activeJobs = jobs.filter(job => job.status === 'in-progress').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
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
                    <p className="text-2xl font-bold">{jobs.length}</p>
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
                    <p className="text-2xl font-bold text-blue-600">{activeJobs}</p>
                  </div>
                  <Play className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-green-600">{completedJobs}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold text-primary">${totalValue.toLocaleString()}</p>
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
                    onChange={(e) => setFilterStatus(e.target.value)}
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
          <div className="space-y-4">
            {filteredJobs.map((job) => (
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
                            {job.priority}
                          </Badge>
                          <Badge className={getStatusColor(job.status)}>
                            {job.status.replace('-', ' ')}
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
                        <p>Due: {new Date(job.dueDate).toLocaleDateString()}</p>
                        <p>Hours: {job.actualHours}/{job.estimatedHours}</p>
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

          {filteredJobs.length === 0 && (
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