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

// Import the type from Supabase
import type { Database } from '@/integrations/supabase/types';

type Job = Database['public']['Tables']['valuation_jobs']['Row'];

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
  in_progress: 'bg-blue-100 text-blue-800',
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
    property_type: '',
    address: '',
    estimated_value: 0,
    due_date: '',
    assigned_to: '',
    priority: 'medium' as const,
    notes: '',
    property_details: {},
    plant_equipment: {},
    water_permanent: {},
    crop_details: {},
    renewable_energy: {}
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
          title: newJob.title,
          description: newJob.description,
          property_type: newJob.property_type,
          address: newJob.address,
          estimated_value: newJob.estimated_value,
          due_date: newJob.due_date,
          assigned_to: newJob.assigned_to,
          priority: newJob.priority,
          notes: newJob.notes,
          property_details: newJob.property_details,
          plant_equipment: newJob.plant_equipment,
          water_permanent: newJob.water_permanent,
          crop_details: newJob.crop_details,
          renewable_energy: newJob.renewable_energy,
          user_id: user.id,
          status: 'pending'
        }]);

      if (error) throw error;

      toast.success('Job created successfully');
      setIsCreateDialogOpen(false);
      setNewJob({
        title: '',
        description: '',
        property_type: '',
        address: '',
        estimated_value: 0,
        due_date: '',
        assigned_to: '',
        priority: 'medium',
        notes: '',
        property_details: {},
        plant_equipment: {},
        water_permanent: {},
        crop_details: {},
        renewable_energy: {}
      });
      fetchJobs();
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to create job');
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

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
                    <Label htmlFor="property_type">Property Type</Label>
                    <Select value={newJob.property_type} onValueChange={(value) => setNewJob({...newJob, property_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="address">Property Address</Label>
                    <Input
                      id="address"
                      value={newJob.address}
                      onChange={(e) => setNewJob({...newJob, address: e.target.value})}
                      placeholder="Full property address"
                    />
                  </div>
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

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newJob.notes}
                    onChange={(e) => setNewJob({...newJob, notes: e.target.value})}
                    placeholder="Additional notes and requirements"
                    rows={3}
                  />
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
              placeholder="Search jobs by title or address..."
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
            <SelectItem value="in_progress">In Progress</SelectItem>
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
                      <MapPin className="h-4 w-4" />
                      {job.address}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {job.property_type}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className={statusColors[job.status]}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1).replace('_', ' ')}
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

                {job.notes && (
                  <div>
                    <h4 className="font-medium mb-2">Notes:</h4>
                    <p className="text-sm text-muted-foreground">{job.notes}</p>
                  </div>
                )}
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
