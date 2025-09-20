import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FileUp, Database } from 'lucide-react';

interface ParsedSalesData {
  address: string;
  suburb: string;
  postcode: string;
  landArea: number;
  salePrice: number;
  contractDate: string;
  settlementDate: string;
  zoning: string;
  propertyType: string;
  saleMethod: string;
  lotDetails: string;
}

const AltDataParser: React.FC = () => {
  const [rawData, setRawData] = useState('');
  const [parsedData, setParsedData] = useState<ParsedSalesData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const parseAltData = (data: string): ParsedSalesData[] => {
    const lines = data.trim().split('\n');
    const salesData: ParsedSalesData[] = [];
    let currentSale: Partial<ParsedSalesData> = {};
    
    for (const line of lines) {
      const fields = line.split(';');
      const recordType = fields[0];
      
      if (recordType === 'B') {
        // Property sale record
        const streetNumber = fields[6] || '';
        const streetName = fields[7] || '';
        const suburb = fields[8] || '';
        const postcode = fields[9] || '';
        const landArea = parseFloat(fields[10]) || 0;
        const landAreaUnit = fields[11] || '';
        const contractDate = formatDate(fields[12]);
        const settlementDate = formatDate(fields[13]);
        const salePrice = parseFloat(fields[14]) || 0;
        const zoning = fields[15] || '';
        const propertyType = fields[16] || '';
        const saleMethod = fields[18] || '';
        
        const address = `${streetNumber} ${streetName}`.trim();
        
        currentSale = {
          address,
          suburb,
          postcode,
          landArea: landAreaUnit === 'H' ? landArea * 10000 : landArea, // Convert hectares to sqm
          salePrice,
          contractDate,
          settlementDate,
          zoning,
          propertyType,
          saleMethod,
          lotDetails: ''
        };
      } else if (recordType === 'C' && currentSale.address) {
        // Title/lot details
        currentSale.lotDetails = fields[4] || '';
        salesData.push(currentSale as ParsedSalesData);
        currentSale = {};
      }
    }
    
    return salesData;
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr || dateStr.length !== 8) return '';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return `${year}-${month}-${day}`;
  };

  const handleParse = () => {
    try {
      const parsed = parseAltData(rawData);
      setParsedData(parsed);
      toast({
        title: "Data Parsed Successfully",
        description: `Found ${parsed.length} sales records`,
      });
    } catch (error) {
      toast({
        title: "Parse Error",
        description: "Failed to parse the data. Please check the format.",
        variant: "destructive",
      });
    }
  };

  const handleImport = async () => {
    if (parsedData.length === 0) {
      toast({
        title: "No Data",
        description: "Please parse data first before importing.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const salesRecords = parsedData.map(sale => ({
        user_id: user.id,
        comparable_address: sale.address,
        suburb: sale.suburb,
        postcode: sale.postcode,
        land_area: sale.landArea,
        sale_price: sale.salePrice,
        sale_date: sale.settlementDate || sale.contractDate || null,
        contract_date: sale.contractDate || null,
        settlement_date: sale.settlementDate || null,
        zoning: sale.zoning,
        property_type: sale.propertyType,
        sale_type: sale.saleMethod,
        lot_number: sale.lotDetails,
        source: 'ALT_IMPORT',
        data_source_verified: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabase
        .from('sales_evidence')
        .insert(salesRecords);

      if (error) throw error;

      toast({
        title: "Import Successful",
        description: `Successfully imported ${salesRecords.length} sales records`,
      });
      
      setRawData('');
      setParsedData([]);
    } catch (error) {
      console.error('Import error:', error);
      toast({
        title: "Import Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileUp className="h-5 w-5" />
            ALT Sales Data Parser
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Paste ALT Sales Data:
            </label>
            <Textarea
              value={rawData}
              onChange={(e) => setRawData(e.target.value)}
              placeholder="Paste your ALT format sales data here..."
              rows={10}
              className="font-mono text-xs"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={handleParse}
              disabled={!rawData.trim()}
              variant="outline"
            >
              <FileUp className="h-4 w-4 mr-2" />
              Parse Data
            </Button>
            
            <Button 
              onClick={handleImport}
              disabled={parsedData.length === 0 || isLoading}
            >
              <Database className="h-4 w-4 mr-2" />
              {isLoading ? 'Importing...' : `Import ${parsedData.length} Records`}
            </Button>
          </div>
        </CardContent>
      </Card>

      {parsedData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Parsed Sales Data ({parsedData.length} records)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {parsedData.map((sale, index) => (
                <div key={index} className="p-3 border rounded-lg bg-muted/30">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Address:</span> {sale.address}
                    </div>
                    <div>
                      <span className="font-medium">Suburb:</span> {sale.suburb} {sale.postcode}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> {formatPrice(sale.salePrice)}
                    </div>
                    <div>
                      <span className="font-medium">Land Area:</span> {sale.landArea.toLocaleString()} m²
                    </div>
                    <div>
                      <span className="font-medium">Settlement:</span> {sale.settlementDate}
                    </div>
                    <div>
                      <span className="font-medium">Zoning:</span> {sale.zoning}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AltDataParser;