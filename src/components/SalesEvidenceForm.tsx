import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Trash2, Plus, AlertTriangle } from 'lucide-react';
import { useSalesEvidence, SalesRecord } from '@/hooks/useSalesEvidence';
import { usePropertyContext } from '@/contexts/PropertyContext';

export default function SalesEvidenceForm() {
  const { getFormattedAddress } = usePropertyContext();
  const { 
    salesRecords, 
    loading, 
    validationStatus, 
    saveSalesRecord, 
    updateSalesRecord, 
    deleteSalesRecord 
  } = useSalesEvidence(getFormattedAddress());

  const [newRecord, setNewRecord] = useState<Omit<SalesRecord, 'id'>>({
    property_address: '',
    sale_price: 0,
    sale_date: '',
    sale_status: 'settled',
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
      await saveSalesRecord({
        ...newRecord,
        property_address: getFormattedAddress() || newRecord.property_address,
      });
      setNewRecord({
        property_address: '',
        sale_price: 0,
        sale_date: '',
        sale_status: 'settled',
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
      console.error('Error saving sales record:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this sales record?')) {
      await deleteSalesRecord(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Validation Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Validation Status
            {!validationStatus.hasMinimumSales && (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Settled Sales Count</Label>
              <div className="text-2xl font-bold">
                {validationStatus.settledSalesCount}
              </div>
            </div>
            <div>
              <Label>Minimum Requirement</Label>
              <div className="text-2xl font-bold text-primary">3</div>
            </div>
            <div>
              <Label>Status</Label>
              <Badge variant={validationStatus.hasMinimumSales ? "default" : "secondary"}>
                {validationStatus.hasMinimumSales ? "Valid for AVM" : "Needs More Sales"}
              </Badge>
            </div>
          </div>
          {validationStatus.hasMinimumSales && (
            <div className="mt-4">
              <Label>Selected Comparables</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {validationStatus.selectedComparables.map((sale, index) => (
                  <Badge key={sale.id} variant="outline">
                    Sale #{index + 1}: ${sale.sale_price.toLocaleString()}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sales Records List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Sales Evidence ({salesRecords.length})
            <Button onClick={() => setIsAddingNew(true)} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Sale
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {salesRecords.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No sales records yet. Add at least 3 settled sales for AVM calculation.
            </p>
          ) : (
            <div className="space-y-4">
              {salesRecords.map((record) => (
                <Card key={record.id} className="relative">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Address</Label>
                        <p className="font-medium">{record.property_address}</p>
                      </div>
                      <div>
                        <Label>Sale Price</Label>
                        <p className="font-medium">${record.sale_price.toLocaleString()}</p>
                      </div>
                      <div>
                        <Label>Sale Date</Label>
                        <p className="font-medium">{record.sale_date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={record.sale_status === 'settled' ? 'default' : 'secondary'}>
                          {record.sale_status}
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
            <CardTitle>Add New Sales Record</CardTitle>
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
                  <Label htmlFor="price">Sale Price</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newRecord.sale_price}
                    onChange={(e) => setNewRecord({ ...newRecord, sale_price: Number(e.target.value) })}
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Sale Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newRecord.sale_date}
                    onChange={(e) => setNewRecord({ ...newRecord, sale_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="status">Sale Status</Label>
                  <Select
                    value={newRecord.sale_status}
                    onValueChange={(value: 'settled' | 'pending' | 'cancelled') => 
                      setNewRecord({ ...newRecord, sale_status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="settled">Settled</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
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
                  placeholder="Notes about this sale for comparison purposes..."
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={loading}>
                  Save Sales Record
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