import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Users, Building, FileText, Calendar, TrendingUp, Star } from "lucide-react";

const UserDashboard = () => {
  const user = {
    name: "John Smith",
    email: "john@delorenzoproperty.com",
    role: "Senior Valuer",
    avatar: "/api/placeholder/150/150",
    company: "DeLorenzo Property Group",
    joinedDate: "2023-03-15",
    reportsCompleted: 87,
    accuracyScore: 94.2,
    specializations: ["Commercial", "Industrial", "Agricultural"]
  };

  const recentActivity = [
    { id: 1, type: "report", title: "520 Deakin Avenue Assessment", status: "completed", date: "2024-01-15" },
    { id: 2, type: "analysis", title: "Market Analysis - Mildura Region", status: "in_progress", date: "2024-01-14" },
    { id: 3, type: "review", title: "Heritage Property Review", status: "pending", date: "2024-01-13" }
  ];

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
            <p className="text-muted-foreground">Here's your activity overview</p>
          </div>
          <Button className="animate-scale-in">
            <FileText className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reports Completed</p>
                  <p className="text-2xl font-bold">{user.reportsCompleted}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Accuracy Score</p>
                  <p className="text-2xl font-bold">{user.accuracyScore}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Projects</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Building className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Team Rating</p>
                  <p className="text-2xl font-bold">4.8/5</p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Profile */}
          <Card className="animate-scale-in">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.role}</p>
                  <p className="text-sm text-muted-foreground">{user.company}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Specializations</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {user.specializations.map((spec, index) => (
                      <Badge key={index} variant="secondary">{spec}</Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">Performance Score</p>
                  <Progress value={user.accuracyScore} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-1">{user.accuracyScore}% accuracy rating</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 animate-fade-in">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-blue-100">
                        <FileText className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    </div>
                    <Badge variant={
                      activity.status === 'completed' ? 'default' :
                      activity.status === 'in_progress' ? 'secondary' : 'outline'
                    }>
                      {activity.status.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col hover-scale">
                <FileText className="h-6 w-6 mb-2" />
                <span>Start New Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col hover-scale">
                <Users className="h-6 w-6 mb-2" />
                <span>Team Collaboration</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col hover-scale">
                <Calendar className="h-6 w-6 mb-2" />
                <span>Schedule Review</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;