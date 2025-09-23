import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useJobManager } from '@/hooks/useJobManager';
import { Calendar, User, FileText, DollarSign } from 'lucide-react';

interface JobCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (jobId: string) => void;
  initialData?: {
    propertyAddress?: string;
    assessmentData?: any;
  };
}

const JobCreationModal: React.FC<JobCreationModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
  initialData
}) => {
  const [activeTab, setActiveTab] = useState('basic');
  const [formData, setFormData] = useState({
    title: '',
    propertyAddress: initialData?.propertyAddress || '',
    type: 'valuation' as const,
    priority: 'medium' as const,
    dueDate: '',
    notes: '',
    client: {
      name: '',
      email: '',
      phone: '',
      company: '',
      address: '',
      contactPreference: 'email' as const
    },
    fee: '',
    invoiceNumber: ''
  });

  const { createJob, isLoading } = useJobManager();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClientChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      client: {
        ...prev.client,
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.propertyAddress || !formData.client.name) {
      return;
    }

    const jobData = {
      title: formData.title,
      propertyAddress: formData.propertyAddress,
      type: formData.type,
      priority: formData.priority,
      status: 'draft' as const,
      dueDate: formData.dueDate || undefined,
      notes: formData.notes || undefined,
      client: {
        name: formData.client.name,
        email: formData.client.email || undefined,
        phone: formData.client.phone || undefined,
        company: formData.client.company || undefined,
        address: formData.client.address || undefined,
        contactPreference: formData.client.contactPreference
      },
      data: {
        reportData: initialData?.assessmentData?.reportData || {},
        addressData: initialData?.assessmentData?.addressData || {},
        assessmentProgress: initialData?.assessmentData?.assessmentProgress || {},
        componentData: initialData?.assessmentData?.componentData || {}
      },
      tasks: [
        {
          id: crypto.randomUUID(),
          title: 'Initial Site Inspection',
          description: 'Conduct preliminary property inspection',
          status: 'pending' as const,
          priority: 'high' as const,
          createdAt: new Date().toISOString()
        },
        {
          id: crypto.randomUUID(),
          title: 'Research Comparable Sales',
          description: 'Analyze recent comparable property sales',
          status: 'pending' as const,
          priority: 'medium' as const,
          createdAt: new Date().toISOString()
        }
      ],
      files: [],
      fee: formData.fee ? parseFloat(formData.fee) : undefined,
      paid: false,
      invoiceNumber: formData.invoiceNumber || undefined
    };

    const jobId = await createJob(jobData);
    if (jobId) {
      onJobCreated(jobId);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Valuation Job</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="client">Client Details</TabsTrigger>
            <TabsTrigger value="workflow">Workflow</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Job Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Property Valuation - [Address]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="valuation">Valuation</SelectItem>
                        <SelectItem value="assessment">Assessment</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    value={formData.propertyAddress}
                    onChange={(e) => handleInputChange('propertyAddress', e.target.value)}
                    placeholder="123 Main Street, Suburb, State, Postcode"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Additional job details, special requirements, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Client Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input
                      id="clientName"
                      value={formData.client.name}
                      onChange={(e) => handleClientChange('name', e.target.value)}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.client.company}
                      onChange={(e) => handleClientChange('company', e.target.value)}
                      placeholder="ABC Real Estate"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.client.email}
                      onChange={(e) => handleClientChange('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.client.phone}
                      onChange={(e) => handleClientChange('phone', e.target.value)}
                      placeholder="+61 xxx xxx xxx"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clientAddress">Client Address</Label>
                  <Textarea
                    id="clientAddress"
                    value={formData.client.address}
                    onChange={(e) => handleClientChange('address', e.target.value)}
                    placeholder="Client's business or postal address"
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPreference">Contact Preference</Label>
                  <Select 
                    value={formData.client.contactPreference} 
                    onValueChange={(value) => handleClientChange('contactPreference', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Default Workflow Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Initial Site Inspection</h4>
                    <p className="text-sm text-muted-foreground">Conduct preliminary property inspection</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">High Priority</span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Pending</span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Research Comparable Sales</h4>
                    <p className="text-sm text-muted-foreground">Analyze recent comparable property sales</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Medium Priority</span>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Pending</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Additional tasks can be added after job creation
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Financial Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fee">Fee (AUD)</Label>
                    <Input
                      id="fee"
                      type="number"
                      value={formData.fee}
                      onChange={(e) => handleInputChange('fee', e.target.value)}
                      placeholder="2500.00"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                      placeholder="INV-2024-001"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {activeTab !== 'financial' && (
              <Button
                variant="outline"
                onClick={() => {
                  const tabs = ['basic', 'client', 'workflow', 'financial'];
                  const currentIndex = tabs.indexOf(activeTab);
                  if (currentIndex < tabs.length - 1) {
                    setActiveTab(tabs[currentIndex + 1]);
                  }
                }}
              >
                Next
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !formData.title || !formData.propertyAddress || !formData.client.name}
            >
              {isLoading ? 'Creating...' : 'Create Job'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default JobCreationModal;