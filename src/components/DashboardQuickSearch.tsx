import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import QuickPropertySearch from "@/components/QuickPropertySearch";
import { Search } from "lucide-react";

const DashboardQuickSearch = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Quick Property Search
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Alternative quick search method for simple property lookups
        </p>
      </CardHeader>
      <CardContent>
        <QuickPropertySearch />
      </CardContent>
    </Card>
  );
};

export default DashboardQuickSearch;