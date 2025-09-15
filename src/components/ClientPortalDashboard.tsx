/**
 * ============================================================================
 * CLIENT PORTAL DASHBOARD
 * Enhanced client experience with progress tracking and report delivery
 * 
 * PROFESSIONAL COMPLIANCE:
 * - All reports require licensed professional approval before client access
 * - Digital signatures integrated for formal report acceptance
 * - Progress tracking enhances client communication
 * ============================================================================
 */
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  FileText, 
  Download, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  MessageSquare,
  Calendar,
  PenTool,
  Bell
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClientProject {
  id: string;
  title: string;
  propertyAddress: string;
  type: "valuation" | "assessment" | "analysis";
  status: "initiated" | "in_progress" | "review" | "complete" | "delivered";
  progress: number;
  startDate: string;
  estimatedCompletion: string;
  currentStage: string;
  assignedValuer: {
    name: string;
    license: string;
    photo?: string;
  };
}

interface ReportDocument {
  id: string;
  projectId: string;
  name: string;
  type: "draft" | "final" | "supplementary";
  status: "pending" | "ready" | "signed";
  uploadDate: string;
  size: string;
  requiresSignature: boolean;
}

interface ClientNotification {
  id: string;
  type: "progress" | "document" | "meeting" | "reminder";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function ClientPortalDashboard() {
  const [projects, setProjects] = useState<ClientProject[]>([]);
  const [documents, setDocuments] = useState<ReportDocument[]>([]);
  const [notifications, setNotifications] = useState<ClientNotification[]>([]);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Load mock data - replace with actual API calls
    const mockProjects: ClientProject[] = [
      {
        id: "1",
        title: "Residential Property Valuation",
        propertyAddress: "123 Market Street, Sydney NSW 2000",
        type: "valuation",
        status: "in_progress",
        progress: 75,
        startDate: "2024-01-15",
        estimatedCompletion: "2024-01-25",
        currentStage: "Sales Evidence Analysis",
        assignedValuer: {
          name: "Sarah Mitchell",
          license: "CPV 12345",
          photo: undefined
        }
      },
      {
        id: "2", 
        title: "Commercial Property Assessment",
        propertyAddress: "456 Business Plaza, Melbourne VIC 3000",
        type: "assessment",
        status: "review",
        progress: 90,
        startDate: "2024-01-10",
        estimatedCompletion: "2024-01-22",
        currentStage: "Final Review & Quality Assurance",
        assignedValuer: {
          name: "Michael Chen",
          license: "CPV 67890"
        }
      }
    ];

    const mockDocuments: ReportDocument[] = [
      {
        id: "1",
        projectId: "1",
        name: "Property Valuation Report - Draft.pdf",
        type: "draft",
        status: "ready",
        uploadDate: "2024-01-20",
        size: "2.3 MB",
        requiresSignature: false
      },
      {
        id: "2",
        projectId: "2", 
        name: "Commercial Assessment - Final Report.pdf",
        type: "final",
        status: "pending",
        uploadDate: "2024-01-21",
        size: "4.1 MB",
        requiresSignature: true
      }
    ];

    const mockNotifications: ClientNotification[] = [
      {
        id: "1",
        type: "progress",
        title: "Project Update",
        message: "Sales evidence analysis has been completed for your residential valuation.",
        timestamp: "2024-01-21T10:30:00Z",
        read: false
      },
      {
        id: "2",
        type: "document", 
        title: "Document Ready",
        message: "Draft valuation report is now available for review.",
        timestamp: "2024-01-20T15:45:00Z",
        read: false
      }
    ];

    setProjects(mockProjects);
    setDocuments(mockDocuments);
    setNotifications(mockNotifications);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      initiated: { color: "bg-blue-100 text-blue-800", label: "Initiated" },
      in_progress: { color: "bg-yellow-100 text-yellow-800", label: "In Progress" },
      review: { color: "bg-purple-100 text-purple-800", label: "Under Review" },
      complete: { color: "bg-green-100 text-green-800", label: "Complete" },
      delivered: { color: "bg-gray-100 text-gray-800", label: "Delivered" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.initiated;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
      case "review":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getDocumentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending Review" },
      ready: { color: "bg-green-100 text-green-800", label: "Ready" },
      signed: { color: "bg-blue-100 text-blue-800", label: "Signed" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU');
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString('en-AU');
  };

  const handleDownloadDocument = (document: ReportDocument) => {
    toast({
      title: "Download Started",
      description: `Downloading ${document.name}...`,
    });
  };

  const handleSignDocument = (document: ReportDocument) => {
    toast({
      title: "Digital Signature Required",
      description: "You will be redirected to the secure signing platform.",
    });
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Welcome to Your Property Portal</CardTitle>
              <p className="text-muted-foreground">Track your valuation projects and access reports</p>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <Badge className="bg-red-100 text-red-800">
                {notifications.filter(n => !n.read).length} new
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(project.status)}
                      <div>
                        <CardTitle className="text-base">{project.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{project.propertyAddress}</p>
                      </div>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Progress */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}% complete</span>
                      </div>
                      <Progress value={project.progress} className="w-full" />
                      <p className="text-xs text-muted-foreground mt-1">
                        Current stage: {project.currentStage}
                      </p>
                    </div>

                    {/* Project Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Started</p>
                        <p className="font-medium">{formatDate(project.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Est. Completion</p>
                        <p className="font-medium">{formatDate(project.estimatedCompletion)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Assigned Valuer</p>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>
                              {project.assignedValuer.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{project.assignedValuer.name}</p>
                            <p className="text-xs text-muted-foreground">{project.assignedValuer.license}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Contact Valuer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="grid gap-4">
            {documents.map((document) => (
              <Card key={document.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-blue-500" />
                      <div>
                        <h4 className="font-semibold">{document.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Uploaded: {formatDate(document.uploadDate)}</span>
                          <span>Size: {document.size}</span>
                          <span className="capitalize">{document.type} Report</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getDocumentStatusBadge(document.status)}
                      <div className="flex gap-2">
                        {document.status === "ready" && (
                          <Button size="sm" onClick={() => handleDownloadDocument(document)}>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                        {document.requiresSignature && document.status === "ready" && (
                          <Button size="sm" variant="outline" onClick={() => handleSignDocument(document)}>
                            <PenTool className="h-4 w-4 mr-2" />
                            Sign
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {document.requiresSignature && (
                    <Alert className="mt-3">
                      <PenTool className="h-4 w-4" />
                      <AlertDescription>
                        This document requires your digital signature before final delivery.
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`cursor-pointer transition-all ${!notification.read ? 'border-blue-200 bg-blue-50/50' : ''}`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {notification.type === "progress" && <Clock className="h-4 w-4 text-blue-500" />}
                      {notification.type === "document" && <FileText className="h-4 w-4 text-green-500" />}
                      {notification.type === "meeting" && <Calendar className="h-4 w-4 text-purple-500" />}
                      {notification.type === "reminder" && <Bell className="h-4 w-4 text-orange-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(notification.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Contact Details</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Name</p>
                      <p className="font-medium">John Smith</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Email</p>
                      <p className="font-medium">john.smith@email.com</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium">+61 2 9999 8888</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Preferences</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Notification Method</p>
                      <p className="font-medium">Email + SMS</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Report Format</p>
                      <p className="font-medium">PDF + Digital Summary</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Communication Frequency</p>
                      <p className="font-medium">Key Milestones</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Button variant="outline">
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}