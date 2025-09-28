import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Building, FileText, Calendar, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useProgressPaymentIntegration } from "@/hooks/useProgressPaymentIntegration";

interface ValuationSelectorProps {
  onSelectValuation: (jobId: string, propertyAddress: string, workflowType: 'PAF' | 'ISFV') => void;
  onSkip: () => void;
}

export const ValuationSelector: React.FC<ValuationSelectorProps> = ({ onSelectValuation, onSkip }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [valuations, setValuations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getAvailableValuations } = useProgressPaymentIntegration();

  useEffect(() => {
    loadValuations();
  }, []);

  const loadValuations = async () => {
    setLoading(true);
    try {
      const data = await getAvailableValuations();
      setValuations(data);
    } catch (error) {
      console.error('Failed to load valuations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredValuations = valuations.filter(val => 
    val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    val.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    val.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Link to Existing Valuation
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Select an existing PAF or ISFV valuation to create a progress payment inspection, 
            or skip to create a standalone progress payment.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by property address, job title, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Skip Option */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={onSkip}>
              Skip - Create Standalone Progress Payment
            </Button>
          </div>

          {/* Valuations List */}
          {loading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading available valuations...</p>
            </div>
          ) : filteredValuations.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Valuations Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No valuations match your search criteria.' : 'No existing valuations found.'}
              </p>
              <Button onClick={onSkip} variant="outline">
                Create Standalone Progress Payment
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Found {filteredValuations.length} valuation{filteredValuations.length !== 1 ? 's' : ''}
              </h4>
              
              <div className="grid gap-4">
                {filteredValuations.map((valuation) => (
                  <Card key={valuation.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={valuation.type === 'PAF' ? 'default' : 'secondary'}>
                              {valuation.type}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              ID: {valuation.id.slice(-8)}
                            </span>
                          </div>
                          
                          <h3 className="font-semibold mb-1">{valuation.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {valuation.address}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(valuation.created)}
                            </div>
                            {valuation.estimatedValue && (
                              <div>
                                Est. Value: ${valuation.estimatedValue.toLocaleString()}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => onSelectValuation(
                            valuation.id, 
                            valuation.address, 
                            valuation.type
                          )}
                          size="sm"
                          className="ml-4"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Use This Valuation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};