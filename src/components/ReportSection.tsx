import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportSectionProps {
  title: string;
  subtitle?: string;
}

const ReportSection = ({ title, subtitle }: ReportSectionProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
          <p>Content will be added here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportSection;