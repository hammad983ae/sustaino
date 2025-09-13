import { useProperty } from "@/contexts/PropertyContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AutofillAddressFieldsProps {
  showLotPlan?: boolean;
  showUnit?: boolean;
  showSuburb?: boolean;
  readonly?: boolean;
  className?: string;
}

export const AutofillAddressFields = ({ 
  showLotPlan = false, 
  showUnit = false, 
  showSuburb = false,
  readonly = false,
  className = ""
}: AutofillAddressFieldsProps) => {
  const { addressData, updateAddressData } = useProperty();

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Full Address */}
      <div>
        <Label htmlFor="auto-property-address" className="text-sm font-medium">Property Address</Label>
        <Input 
          id="auto-property-address"
          value={addressData.propertyAddress}
          onChange={(e) => !readonly && updateAddressData({ propertyAddress: e.target.value })}
          readOnly={readonly}
          className="mt-1"
        />
      </div>

      {/* Lot and Plan Numbers */}
      {showLotPlan && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="auto-lot-number" className="text-sm">Lot Number</Label>
            <Input 
              id="auto-lot-number"
              value={addressData.lotNumber || ''}
              onChange={(e) => !readonly && updateAddressData({ lotNumber: e.target.value })}
              readOnly={readonly}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="auto-plan-number" className="text-sm">Plan Number</Label>
            <Input 
              id="auto-plan-number"
              value={addressData.planNumber || ''}
              onChange={(e) => !readonly && updateAddressData({ planNumber: e.target.value })}
              readOnly={readonly}
              className="mt-1"
            />
          </div>
        </div>
      )}

      {/* Address Components */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {showUnit && (
          <div>
            <Label htmlFor="auto-unit-number" className="text-sm">Unit Number</Label>
            <Input 
              id="auto-unit-number"
              value={addressData.unitNumber || ''}
              onChange={(e) => !readonly && updateAddressData({ unitNumber: e.target.value })}
              readOnly={readonly}
              className="mt-1"
            />
          </div>
        )}
        <div>
          <Label htmlFor="auto-street-number" className="text-sm">Street Number</Label>
          <Input 
            id="auto-street-number"
            value={addressData.streetNumber || ''}
            onChange={(e) => !readonly && updateAddressData({ streetNumber: e.target.value })}
            readOnly={readonly}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="auto-street-name" className="text-sm">Street Name</Label>
          <Input 
            id="auto-street-name"
            value={addressData.streetName || ''}
            onChange={(e) => !readonly && updateAddressData({ streetName: e.target.value })}
            readOnly={readonly}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="auto-street-type" className="text-sm">Street Type</Label>
          <Select 
            value={addressData.streetType || ''} 
            onValueChange={(value) => !readonly && updateAddressData({ streetType: value })}
            disabled={readonly}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select street type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Street">Street</SelectItem>
              <SelectItem value="Avenue">Avenue</SelectItem>
              <SelectItem value="Road">Road</SelectItem>
              <SelectItem value="Lane">Lane</SelectItem>
              <SelectItem value="Drive">Drive</SelectItem>
              <SelectItem value="Court">Court</SelectItem>
              <SelectItem value="Place">Place</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Location Details */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {showSuburb && (
          <div>
            <Label htmlFor="auto-suburb" className="text-sm">Suburb</Label>
            <Input 
              id="auto-suburb"
              value={addressData.suburb || ''}
              onChange={(e) => !readonly && updateAddressData({ suburb: e.target.value })}
              readOnly={readonly}
              className="mt-1"
            />
          </div>
        )}
        <div>
          <Label htmlFor="auto-state" className="text-sm">State</Label>
          <Select 
            value={addressData.state || ''} 
            onValueChange={(value) => !readonly && updateAddressData({ state: value })}
            disabled={readonly}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NSW">NSW</SelectItem>
              <SelectItem value="VIC">VIC</SelectItem>
              <SelectItem value="QLD">QLD</SelectItem>
              <SelectItem value="WA">WA</SelectItem>
              <SelectItem value="SA">SA</SelectItem>
              <SelectItem value="TAS">TAS</SelectItem>
              <SelectItem value="ACT">ACT</SelectItem>
              <SelectItem value="NT">NT</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="auto-postcode" className="text-sm">Postcode</Label>
          <Input 
            id="auto-postcode"
            value={addressData.postcode || ''}
            onChange={(e) => !readonly && updateAddressData({ postcode: e.target.value })}
            readOnly={readonly}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="auto-country" className="text-sm">Country</Label>
          <Input 
            id="auto-country"
            value={addressData.country || ''}
            onChange={(e) => !readonly && updateAddressData({ country: e.target.value })}
            readOnly={readonly}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );
};