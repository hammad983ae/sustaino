import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, AlertTriangle } from 'lucide-react';
import { useLeasingEvidence, LeasingRecord } from '@/hooks/useLeasingEvidence';
import { usePropertyContext } from '@/contexts/PropertyContext';

export default function LeasingEvidenceForm() {
  const { getFormattedAddress } = usePropertyContext();
  const { 
    leasingRecords, 
    loading, 
    validationStatus, 
    saveLeasingRecord, 
    updateLeasingRecord, 
    deleteLeasingRecord 
  } = useLeasingEvidence(getFormattedAddress());

  const [newRecord, setNewRecord] = useState<Omit<LeasingRecord, 'id'>>({
    property_address: '',
    rent_amount: 0,
    lease_start_date: '',
    lease_end_date: '',
    lease_duration_months: 12,
    lease_status: 'active',
    property_type: 'residential',
    land_area: 0,
    building_area: 0,
    bedrooms: 0,
    bathrooms: 0,
    car_spaces: 0,
    comparison_notes: '',
  });

  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveLeasingRecord({
        ...newRecord,
        property_address: getFormattedAddress() || newRecord.property_address,
      });
      setNewRecord({
        property_address: '',
        rent_amount: 0,
        lease_start_date: '',
        lease_end_date: '',
        lease_duration_months: 12,
        lease_status: 'active',
        property_type: 'residential',
        land_area: 0,
        building_area: 0,
        bedrooms: 0,
        bathrooms: 0,
        car_spaces: 0,
        comparison_notes: '',
      });
      setIsAddingNew(false);
    } catch (error) {
      console.error('Error saving leasing record:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this leasing record?')) {
      await deleteLeasingRecord(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Validation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Validation Status
            {!validationStatus.hasMinimumLeases && (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Active Leases Count</Label>
              <div className="text-2xl font-bold">
                {validationStatus.activeLeasesCount}
              </div>
            </div>
            <div>
              <Label>Minimum Requirement</Label>
              <div className="text-2xl font-bold text-primary">3</div>
            </div>
            <div>
              <Label>Status</Label>
              <Badge variant={validationStatus.hasMinimumLeases ? "default" : "secondary"}>
                {validationStatus.hasMinimumLeases ? "Valid for Rental AVM" : "Needs More Leases"}
              </Badge>
            </div>
          </div>
          {validationStatus.hasMinimumLeases && (
            <div className="mt-4">
              <Label>Selected Comparables</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {validationStatus.selectedComparables.map((lease, index) => (
                  <Badge key={lease.id} variant="outline">
                    Lease #{index + 1}: ${lease.rent_amount.toLocaleString()}/month
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Leasing Records List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Leasing Evidence ({leasingRecords.length})
            <Button onClick={() => setIsAddingNew(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Lease
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {leasingRecords.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No leasing records yet. Add at least 3 active leases for rental AVM calculation.
            </p>
          ) : (
            <div className="space-y-4">
              {leasingRecords.map((record) => (
                <Card key={record.id} className="relative">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Address</Label>
                        <p className="font-medium">{record.property_address}</p>
                      </div>
                      <div>
                        <Label>Rent Amount</Label>
                        <p className="font-medium">${record.rent_amount.toLocaleString()}/month</p>
                      </div>
                      <div>
                        <Label>Lease Start</Label>
                        <p className="font-medium">{record.lease_start_date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={record.lease_status === 'active' ? 'default' : 'secondary'}>
                          {record.lease_status}
                        </Badge>
                        {record.is_comparable && (
                          <Badge variant="outline">Comparable</Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(record.id!)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {record.comparison_notes && (
                      <div className="mt-4">
                        <Label>Comparison Notes</Label>
                        <p className="text-sm text-muted-foreground">{record.comparison_notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add New Record Form */}
      {isAddingNew && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Leasing Record</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="address">Property Address</Label>
                  <Input
                    id="address"
                    value={newRecord.property_address}
                    onChange={(e) => setNewRecord({ ...newRecord, property_address: e.target.value })}
                    placeholder="Enter property address"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="rent">Monthly Rent</Label>
                  <Input
                    id="rent"
                    type="number"
                    value={newRecord.rent_amount}
                    onChange={(e) => setNewRecord({ ...newRecord, rent_amount: Number(e.target.value) })}
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="start-date">Lease Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newRecord.lease_start_date}
                    onChange={(e) => setNewRecord({ ...newRecord, lease_start_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">Lease End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newRecord.lease_end_date}
                    onChange={(e) => setNewRecord({ ...newRecord, lease_end_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Lease Status</Label>
                  <Select
                    value={newRecord.lease_status}
                    onValueChange={(value: 'active' | 'pending' | 'terminated') => 
                      setNewRecord({ ...newRecord, lease_status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="terminated">Terminated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select
                    value={newRecord.property_type}
                    onValueChange={(value) => setNewRecord({ ...newRecord, property_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="agricultural">Agricultural</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration">Lease Duration (months)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={newRecord.lease_duration_months}
                    onChange={(e) => setNewRecord({ ...newRecord, lease_duration_months: Number(e.target.value) })}
                    placeholder="12"
                  />
                </div>
                <div>
                  <Label htmlFor="building-area">Building Area (sqm)</Label>
                  <Input
                    id="building-area"
                    type="number"
                    value={newRecord.building_area}
                    onChange={(e) => setNewRecord({ ...newRecord, building_area: Number(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Comparison Notes</Label>
                <Textarea
                  id="notes"
                  value={newRecord.comparison_notes}
                  onChange={(e) => setNewRecord({ ...newRecord, comparison_notes: e.target.value })}
                  placeholder="Notes about this lease for comparison purposes..."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  Save Leasing Record
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsAddingNew(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}