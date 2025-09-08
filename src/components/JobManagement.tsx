/**
 * ============================================================================
 * JOB MANAGEMENT DASHBOARD
 * Copyright © 2025 Delderenzo Property Group Pty Ltd. All Rights Reserved.
 * ============================================================================
 */
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  Plus, 
  Building, 
  Factory, 
  Droplets, 
  Wheat, 
  Wind,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
  User,
  FileText,
  Search,
  Filter
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Job {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  client_name: string;
  property_address: string;
  job_type: string;
  estimated_value: number;
  due_date: string;
  assigned_to: string;
  includes_properties: boolean;
  includes_plant_equipment: boolean;
  includes_water_permanent: boolean;
  includes_crop: boolean;
  includes_renewable_energy: boolean;
  created_at: string;
  updated_at: string;
}

const jobTypes = [
  'Property Valuation',
  'Portfolio Assessment', 
  'Agricultural Valuation',
  'Commercial Assessment',
  'Industrial Valuation',
  'Development Feasibility',
  'Insurance Valuation',
  'Mortgage Security Assessment'
];

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800', 
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800'
};

const statusColors = {
  pending: 'bg-gray-100 text-gray-800',
  active: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

export default function JobManagement() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [newJob, setNewJob] = useState({
    title: '',
    description: '',
    client_name: '',
    property_address: '',
    job_type: '',
    estimated_value: 0,
    due_date: '',
    assigned_to: '',
    priority: 'medium' as const,
    includes_properties: true,
    includes_plant_equipment: false,
    includes_water_permanent: false,
    includes_crop: false,
    includes_renewable_energy: false
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('valuation_jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      toast.error('Failed to load jobs');
    }
  };

  const createJob = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('You must be logged in to create jobs');
        return;
      }

      const { error } = await supabase
        .from('valuation_jobs')
        .insert([{
          ...newJob,
          user_id: user.id,
          status: 'pending'
        }]);

      if (error) throw error;

      toast.success('Job created successfully');
      setIsCreateDialogOpen(false);
      setNewJob({
        title: '',
        description: '',
        client_name: '',
        property_address: '',
        job_type: '',
        estimated_value: 0,
        due_date: '',
        assigned_to: '',
        priority: 'medium',
        includes_properties: true,
        includes_plant_equipment: false,
        includes_water_permanent: false,
        includes_crop: false,
        includes_renewable_energy: false
      });
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to create job');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.property_address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getIncludedAssets = (job: Job) => {
    const assets = [];
    if (job.includes_properties) assets.push('Properties');
    if (job.includes_plant_equipment) assets.push('P&E');
    if (job.includes_water_permanent) assets.push('Water (Permanent)');
    if (job.includes_crop) assets.push('Crop');
    if (job.includes_renewable_energy) assets.push('Renewable Energy');
    return assets;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Job Management Dashboard</h1>
          <p className="text-muted-foreground">Manage valuation jobs and assignments</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Valuation Job</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({...newJob, title: e.target.value})}
                    placeholder="Enter job title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({...newJob, description: e.target.value})}
                    placeholder="Job description and requirements"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client_name">Client Name</Label>
                    <Input
                      id="client_name"
                      value={newJob.client_name}
                      onChange={(e) => setNewJob({...newJob, client_name: e.target.value})}
                      placeholder="Client name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="job_type">Job Type</Label>
                    <Select value={newJob.job_type} onValueChange={(value) => setNewJob({...newJob, job_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="property_address">Property Address</Label>
                  <Input
                    id="property_address"
                    value={newJob.property_address}
                    onChange={(e) => setNewJob({...newJob, property_address: e.target.value})}
                    placeholder="Full property address"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="estimated_value">Estimated Value ($)</Label>
                    <Input
                      id="estimated_value"
                      type="number"
                      value={newJob.estimated_value}
                      onChange={(e) => setNewJob({...newJob, estimated_value: parseFloat(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="due_date">Due Date</Label>
                    <Input
                      id="due_date"
                      type="date"
                      value={newJob.due_date}
                      onChange={(e) => setNewJob({...newJob, due_date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newJob.priority} onValueChange={(value: any) => setNewJob({...newJob, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="assigned_to">Assigned To</Label>
                  <Input
                    id="assigned_to"
                    value={newJob.assigned_to}
                    onChange={(e) => setNewJob({...newJob, assigned_to: e.target.value})}
                    placeholder="Valuator name or team"
                  />
                </div>
              </div>

              {/* Asset Inclusions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Assets to Include</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="properties"
                      checked={newJob.includes_properties}
                      onCheckedChange={(checked) => setNewJob({...newJob, includes_properties: !!checked})}
                    />
                    <Label htmlFor="properties" className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Properties
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="plant_equipment"
                      checked={newJob.includes_plant_equipment}
                      onCheckedChange={(checked) => setNewJob({...newJob, includes_plant_equipment: !!checked})}
                    />
                    <Label htmlFor="plant_equipment" className="flex items-center gap-2">
                      <Factory className="h-4 w-4" />
                      Plant & Equipment
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="water_permanent"
                      checked={newJob.includes_water_permanent}
                      onCheckedChange={(checked) => setNewJob({...newJob, includes_water_permanent: !!checked})}
                    />
                    <Label htmlFor="water_permanent" className="flex items-center gap-2">
                      <Droplets className="h-4 w-4" />
                      Water (Permanent)
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="crop"
                      checked={newJob.includes_crop}
                      onCheckedChange={(checked) => setNewJob({...newJob, includes_crop: !!checked})}
                    />
                    <Label htmlFor="crop" className="flex items-center gap-2">
                      <Wheat className="h-4 w-4" />
                      Crop
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="renewable_energy"
                      checked={newJob.includes_renewable_energy}
                      onCheckedChange={(checked) => setNewJob({...newJob, includes_renewable_energy: !!checked})}
                    />
                    <Label htmlFor="renewable_energy" className="flex items-center gap-2">
                      <Wind className="h-4 w-4" />
                      Renewable Energy Farms
                    </Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={createJob}>
                  Create Job
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, client, or address..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs Grid */}
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {job.client_name}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.property_address}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {job.job_type}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={statusColors[job.status]}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                  <Badge className={priorityColors[job.priority]}>
                    {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)} Priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">{job.description}</p>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span>Est. Value: ${job.estimated_value?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span>Due: {new Date(job.due_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>Assigned: {job.assigned_to}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Included Assets:</h4>
                  <div className="flex flex-wrap gap-2">
                    {getIncludedAssets(job).map((asset) => (
                      <Badge key={asset} variant="secondary" className="text-xs">
                        {asset}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filters' 
                  : 'Create your first valuation job to get started'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}