import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, AlertTriangle, Eye, Ban, Activity, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ThreatEvent {
  id: string;
  timestamp: string;
  threat_type: string;
  ip_address: string;
  user_agent: string;
  endpoint: string;
  risk_score: number;
  action_taken: string;
  details: any;
}

interface HoneypotAccess {
  id: string;
  timestamp: string;
  ip_address: string;
  endpoint: string;
  organization: string;
  details: any;
}

export default function CompetitiveProtectionSystem() {
  const [threats, setThreats] = useState<ThreatEvent[]>([]);
  const [honeypotAccesses, setHoneypotAccesses] = useState<HoneypotAccess[]>([]);
  const [blockedIPs, setBlockedIPs] = useState<string[]>([]);
  const [protectionStatus, setProtectionStatus] = useState({
    honeypots_active: true,
    rate_limiting: true,
    ip_blocking: true,
    watermarking: true,
    decoy_endpoints: true
  });

  useEffect(() => {
    fetchSecurityData();
    const interval = setInterval(fetchSecurityData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchSecurityData = async () => {
    try {
      // Fetch threat events
      const { data: threatData } = await supabase
        .from('competitive_threats')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      // Fetch honeypot accesses
      const { data: honeypotData } = await supabase
        .from('honeypot_accesses')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      // Fetch blocked IPs
      const { data: blockedData } = await supabase
        .from('blocked_ips')
        .select('ip_address')
        .eq('status', 'active');

      if (threatData) setThreats(threatData);
      if (honeypotData) setHoneypotAccesses(honeypotData);
      if (blockedData) setBlockedIPs(blockedData.map(item => item.ip_address));
    } catch (error) {
      console.error('Error fetching security data:', error);
    }
  };

  const activateHoneypots = async () => {
    try {
      const { error } = await supabase.functions.invoke('activate-honeypots', {
        body: { action: 'deploy_all' }
      });

      if (error) throw error;
      toast.success('Honeypot traps activated successfully');
      setProtectionStatus(prev => ({ ...prev, honeypots_active: true }));
    } catch (error) {
      toast.error('Failed to activate honeypots');
    }
  };

  const blockSuspiciousIPs = async () => {
    try {
      const { error } = await supabase.functions.invoke('block-competitive-ips', {
        body: { 
          action: 'block_known_competitors',
          ip_ranges: [
            '203.111.0.0/16', // RP Data known ranges
            '140.238.0.0/16', // Government ranges
            '165.225.0.0/16'  // Known scraper ranges
          ]
        }
      });

      if (error) throw error;
      toast.success('Competitive IP ranges blocked');
    } catch (error) {
      toast.error('Failed to block IP ranges');
    }
  };

  const deployDecoyData = async () => {
    try {
      const { error } = await supabase.functions.invoke('deploy-decoy-data', {
        body: { 
          action: 'create_fake_properties',
          count: 1000,
          watermark_id: `TRAP_${Date.now()}`
        }
      });

      if (error) throw error;
      toast.success('Decoy property data deployed');
    } catch (error) {
      toast.error('Failed to deploy decoy data');
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 8) return 'bg-red-500';
    if (score >= 6) return 'bg-orange-500';
    if (score >= 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getOrganizationBadge = (userAgent: string, ip: string) => {
    const ua = userAgent.toLowerCase();
    
    if (ua.includes('rpdata') || ua.includes('corelogic')) {
      return <Badge variant="destructive">RP Data/CoreLogic</Badge>;
    }
    if (ua.includes('government') || ip.startsWith('140.238')) {
      return <Badge variant="destructive">Government</Badge>;
    }
    if (ua.includes('python') || ua.includes('scraper') || ua.includes('bot')) {
      return <Badge variant="outline">Automated Scraper</Badge>;
    }
    if (ua.includes('valuation') || ua.includes('property')) {
      return <Badge variant="secondary">Valuation Firm</Badge>;
    }
    return <Badge variant="default">Unknown</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Competitive Protection Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${protectionStatus.honeypots_active ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-sm">Honeypots</p>
            </div>
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${protectionStatus.rate_limiting ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-sm">Rate Limiting</p>
            </div>
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${protectionStatus.ip_blocking ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-sm">IP Blocking</p>
            </div>
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${protectionStatus.watermarking ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-sm">Watermarking</p>
            </div>
            <div className="text-center">
              <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${protectionStatus.decoy_endpoints ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <p className="text-sm">Decoy Endpoints</p>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Button onClick={activateHoneypots} className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Activate Honeypots
            </Button>
            <Button onClick={blockSuspiciousIPs} variant="destructive" className="flex items-center gap-2">
              <Ban className="w-4 h-4" />
              Block Competitors
            </Button>
            <Button onClick={deployDecoyData} variant="outline" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Deploy Decoy Data
            </Button>
          </div>

          <Tabs defaultValue="threats" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="threats">Threat Events</TabsTrigger>
              <TabsTrigger value="honeypots">Honeypot Catches</TabsTrigger>
              <TabsTrigger value="blocked">Blocked IPs</TabsTrigger>
            </TabsList>

            <TabsContent value="threats" className="space-y-4">
              <div className="space-y-3">
                {threats.map((threat) => (
                  <Card key={threat.id} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="font-medium">{threat.threat_type}</span>
                          <div className={`w-2 h-2 rounded-full ${getRiskColor(threat.risk_score)}`}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(threat.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <strong>IP:</strong> {threat.ip_address}
                        </div>
                        <div>
                          <strong>Endpoint:</strong> {threat.endpoint}
                        </div>
                        <div>
                          <strong>Risk Score:</strong> {threat.risk_score}/10
                        </div>
                        <div>
                          <strong>Action:</strong> {threat.action_taken}
                        </div>
                      </div>
                      <div className="mt-2">
                        {getOrganizationBadge(threat.user_agent, threat.ip_address)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="honeypots" className="space-y-4">
              <div className="space-y-3">
                {honeypotAccesses.map((access) => (
                  <Card key={access.id} className="border-l-4 border-l-orange-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-orange-500" />
                          <span className="font-medium">Honeypot Triggered</span>
                          <Badge variant="destructive">CAUGHT</Badge>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(access.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <strong>IP:</strong> {access.ip_address}
                        </div>
                        <div>
                          <strong>Endpoint:</strong> {access.endpoint}
                        </div>
                        <div>
                          <strong>Organization:</strong> {access.organization || 'Unknown'}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="blocked" className="space-y-4">
              <div className="grid gap-2">
                {blockedIPs.map((ip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-2">
                      <Ban className="w-4 h-4 text-red-500" />
                      <span className="font-mono">{ip}</span>
                    </div>
                    <Badge variant="destructive">Blocked</Badge>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}