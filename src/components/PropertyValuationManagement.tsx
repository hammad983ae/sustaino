import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Building, Calculator, DollarSign, FileText, TrendingUp, Calendar, MapPin } from "lucide-react";

interface Property {
  id: string;
  address: string;
  property_type: string;
  description: string;
  status: string;
  sustainability_score: number;
  created_at: string;
}

interface Valuation {
  id: string;
  property_id: string;
  property_address: string;
  estimated_value: number;
  valuation_type: string;
  valuation_date: string;
  status: string;
  methodology: string;
  confidence_score: number;
  notes: string;
  user_id: string;
  properties?: Property;
}

const PropertyValuationManagement = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [valuations, setValuations] = useState<Valuation[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [valuationForm, setValuationForm] = useState({
    estimated_value: '',
    valuation_type: 'market_value',
    methodology: '',
    confidence_score: '',
    notes: ''
  });

  useEffect(() => {
    fetchPropertiesAndValuations();
  }, []);

  const fetchPropertiesAndValuations = async () => {
    try {
      // Fetch properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (propertiesError) throw propertiesError;
      setProperties(propertiesData || []);

      // Fetch valuations with property details
      const { data: valuationsData, error: valuationsError } = await supabase
        .from('valuations')
        .select('*')
        .order('valuation_date', { ascending: false });

      if (valuationsError) throw valuationsError;
      setValuations(valuationsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load properties and valuations');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateValuation = async () => {
    if (!selectedProperty) return;

    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('valuations')
        .insert({
          property_id: selectedProperty.id,
          property_address: selectedProperty.address,
          estimated_value: parseFloat(valuationForm.estimated_value),
          valuation_type: valuationForm.valuation_type,
          methodology: valuationForm.methodology,
          confidence_score: parseFloat(valuationForm.confidence_score),
          notes: valuationForm.notes,
          status: 'completed',
          user_id: user.user.id
        });

      if (error) throw error;

      toast.success('Valuation created successfully');
      setIsDialogOpen(false);
      setValuationForm({
        estimated_value: '',
        valuation_type: 'market_value',
        methodology: '',
        confidence_score: '',
        notes: ''
      });
      fetchPropertiesAndValuations();
    } catch (error) {
      console.error('Error creating valuation:', error);
      toast.error('Failed to create valuation');
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <Calculator className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p>Loading properties and valuations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Property Valuations</h1>
          <p className="text-muted-foreground">Manage individual property valuations and assessments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Calculator className="h-4 w-4 mr-2" />
              Create Valuation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Property Valuation</DialogTitle>
              <DialogDescription>
                Create a new valuation for a specific property
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="property-select">Select Property</Label>
                <Select onValueChange={(value) => {
                  const property = properties.find(p => p.id === value);
                  setSelectedProperty(property || null);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a property to value" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <span>{property.address}</span>
                          <Badge variant="outline" className="ml-2">
                            {property.property_type}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedProperty && (
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <h3 className="font-semibold">{selectedProperty.address}</h3>
                        <p className="text-sm text-muted-foreground">{selectedProperty.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{selectedProperty.property_type}</Badge>
                          {selectedProperty.sustainability_score && (
                            <Badge variant="secondary">
                              ESG Score: {selectedProperty.sustainability_score}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estimated-value">Estimated Value (AUD)</Label>
                  <Input
                    id="estimated-value"
                    type="number"
                    placeholder="1250000"
                    value={valuationForm.estimated_value}
                    onChange={(e) => setValuationForm(prev => ({
                      ...prev,
                      estimated_value: e.target.value
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="valuation-type">Valuation Type</Label>
                  <Select value={valuationForm.valuation_type} onValueChange={(value) => 
                    setValuationForm(prev => ({ ...prev, valuation_type: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="market_value">Market Value</SelectItem>
                      <SelectItem value="investment_value">Investment Value</SelectItem>
                      <SelectItem value="forced_sale">Forced Sale Value</SelectItem>
                      <SelectItem value="insurance_value">Insurance Value</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="methodology">Methodology</Label>
                  <Input
                    id="methodology"
                    placeholder="e.g., Comparative Market Analysis"
                    value={valuationForm.methodology}
                    onChange={(e) => setValuationForm(prev => ({
                      ...prev,
                      methodology: e.target.value
                    }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confidence-score">Confidence Score (0-100)</Label>
                  <Input
                    id="confidence-score"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="85"
                    value={valuationForm.confidence_score}
                    onChange={(e) => setValuationForm(prev => ({
                      ...prev,
                      confidence_score: e.target.value
                    }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional valuation notes, market conditions, assumptions..."
                  value={valuationForm.notes}
                  onChange={(e) => setValuationForm(prev => ({
                    ...prev,
                    notes: e.target.value
                  }))}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateValuation} disabled={!selectedProperty || !valuationForm.estimated_value}>
                  Create Valuation
                </Button>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{properties.length}</p>
                <p className="text-sm text-muted-foreground">Total Properties</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{valuations.length}</p>
                <p className="text-sm text-muted-foreground">Total Valuations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">
                  {formatCurrency(valuations.reduce((sum, v) => sum + v.estimated_value, 0))}
                </p>
                <p className="text-sm text-muted-foreground">Total Portfolio Value</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">
                  {valuations.length > 0 
                    ? Math.round(valuations.reduce((sum, v) => sum + (v.confidence_score || 0), 0) / valuations.length)
                    : 0}%
                </p>
                <p className="text-sm text-muted-foreground">Avg Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties Without Valuations */}
      {properties.filter(p => !valuations.some(v => v.property_id === p.id)).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Properties Awaiting Valuation
            </CardTitle>
            <CardDescription>
              Properties that haven't been valued yet
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {properties
                .filter(p => !valuations.some(v => v.property_id === p.id))
                .map((property) => (
                  <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Building className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{property.address}</p>
                        <p className="text-sm text-muted-foreground">{property.property_type}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedProperty(property);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      Value Property
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Valuations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Valuations
          </CardTitle>
          <CardDescription>
            Latest property valuations and assessments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {valuations.length === 0 ? (
            <div className="text-center py-8">
              <Calculator className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">No Valuations Yet</h3>
              <p className="text-muted-foreground mb-4">Start by creating your first property valuation</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Calculator className="h-4 w-4 mr-2" />
                Create First Valuation
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Estimated Value</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {valuations.map((valuation) => (
                  <TableRow key={valuation.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{valuation.property_address}</p>
                        <p className="text-sm text-muted-foreground">{valuation.methodology}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {valuation.valuation_type.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(valuation.estimated_value)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${valuation.confidence_score || 0}%` }}
                          />
                        </div>
                        <span className="text-sm">{valuation.confidence_score || 0}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(valuation.valuation_date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(valuation.status)}>
                        {valuation.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertyValuationManagement;