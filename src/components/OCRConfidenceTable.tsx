import React from 'react';

interface OCRResult {
  text: string;
  confidence: number;
}

interface OCRConfidenceTableProps {
  ocr: Record<string, OCRResult>;
  labels?: Record<string, string>;
}

const DEFAULT_SECTIONS = {
  rpdAndLocation: "Section 2: RPD and Location",
  legalAndPlanning: "Section 3: Legal and Planning", 
  marketCommentary: "Section 6: Market Commentary",
  propertyDetails: "Section 7: Property Details (Pre-Inspection)",
  environmental: "Section 8: Environmental & Sustainability Assessment",
  riskAssessment: "Section 10: Risk Assessment (Pre-Physical Inspection)",
};

export function OCRConfidenceTable({ ocr, labels = {} }: OCRConfidenceTableProps) {
  if (!ocr || Object.keys(ocr).length === 0) {
    return (
      <div className="text-center py-4 text-muted-foreground">
        No OCR data available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-border">
        <thead className="bg-muted">
          <tr>
            <th className="border border-border px-3 py-2 text-left font-medium">Section</th>
            <th className="border border-border px-3 py-2 text-left font-medium">Confidence</th>
            <th className="border border-border px-3 py-2 text-left font-medium">Status</th>
            <th className="border border-border px-3 py-2 text-left font-medium">Preview</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(ocr).map(([key, result]) => {
            const confidence = typeof result === 'object' ? result.confidence || 0 : 0;
            const text = typeof result === 'object' ? result.text || '' : result || '';
            const sectionName = labels[key] || DEFAULT_SECTIONS[key as keyof typeof DEFAULT_SECTIONS] || key;
            
            return (
              <tr key={key} className="hover:bg-muted/50">
                <td className="border border-border px-3 py-2 font-medium">
                  {sectionName}
                </td>
                <td className="border border-border px-3 py-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${confidence < 0.75 ? 'text-destructive' : 'text-primary'}`}>
                      {(confidence * 100).toFixed(0)}%
                    </span>
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${confidence < 0.75 ? 'bg-destructive' : 'bg-primary'}`}
                        style={{ width: `${confidence * 100}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="border border-border px-3 py-2">
                  {confidence < 0.75 ? (
                    <span className="text-destructive font-medium">⚠ Review Required</span>
                  ) : (
                    <span className="text-primary font-medium">✓ Looks Good</span>
                  )}
                </td>
                <td className="border border-border px-3 py-2 max-w-xs">
                  <p className="text-sm text-muted-foreground truncate" title={text}>
                    {text || 'No text extracted'}
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}