import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Shield, 
  Globe, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  Smartphone,
  Monitor,
  Wallet
} from "lucide-react";
import { toast } from "sonner";

interface MetaMaskInstallGuideProps {
  onClose?: () => void;
  onConnect?: () => void;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const MetaMaskInstallGuide: React.FC<MetaMaskInstallGuideProps> = ({ onClose, onConnect }) => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check if MetaMask is installed
    setIsMetaMaskInstalled(!!window.ethereum);
  }, []);

  const handleConnectMetaMask = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected");
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        toast.success("Wallet connected successfully!");
        onConnect?.();
        onClose?.();
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };
  const handleInstallClick = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  const handleMobileInstallClick = () => {
    // Detect mobile platform
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) {
      window.open('https://play.google.com/store/apps/details?id=io.metamask', '_blank');
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      window.open('https://apps.apple.com/us/app/metamask/id1438144202', '_blank');
    } else {
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* MetaMask Status Check */}
      {isMetaMaskInstalled ? (
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle className="h-6 w-6 text-green-500" />
                MetaMask Detected
              </CardTitle>
              <Badge className="bg-green-500">
                Ready to Connect
              </Badge>
            </div>
            <p className="text-muted-foreground">
              MetaMask is installed and ready to connect to Sustano Sphere
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Button 
                onClick={handleConnectMetaMask}
                disabled={isConnecting}
                className="w-full max-w-md h-12"
                size="lg"
              >
                <Wallet className="w-5 h-5 mr-2" />
                {isConnecting ? "Connecting..." : "Connect MetaMask Now"}
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Click above to connect your MetaMask wallet and access all blockchain features
              </p>
            </div>
            
            <div className="bg-white/60 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Once Connected You Can:</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Trade SustainoCoin tokens securely</li>
                <li>• Participate in property auctions with crypto payments</li>
                <li>• Stake tokens for rewards and governance voting</li>
                <li>• Access exclusive blockchain-verified property data</li>
                <li>• Secure, immutable transaction records</li>
              </ul>
            </div>
            
            {onClose && (
              <div className="text-center">
                <Button variant="outline" onClick={onClose}>
                  Maybe Later
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                MetaMask Required
              </CardTitle>
              <Badge variant="destructive">
                Not Installed
              </Badge>
            </div>
            <p className="text-muted-foreground">
              MetaMask wallet is required to access blockchain features on Sustano Sphere
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* What is MetaMask */}
            <div className="bg-white/60 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-500" />
                What is MetaMask?
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                MetaMask is a secure crypto wallet and gateway to blockchain applications. 
                It allows you to manage your SustainoCoin tokens and interact with our 
                blockchain-powered property platform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="text-center">
                  <Shield className="h-8 w-8 text-green-500 mx-auto mb-1" />
                  <div className="text-xs font-medium">Secure</div>
                </div>
                <div className="text-center">
                  <Globe className="h-8 w-8 text-blue-500 mx-auto mb-1" />
                  <div className="text-xs font-medium">Web3 Ready</div>
                </div>
                <div className="text-center">
                  <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-1" />
                  <div className="text-xs font-medium">Easy to Use</div>
                </div>
              </div>
            </div>

            {/* Installation Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Installation Steps:</h3>
              
              <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <div className="font-medium">Choose Your Platform</div>
                  <div className="text-sm text-muted-foreground">
                    MetaMask is available for desktop browsers and mobile devices
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <div className="font-medium">Download & Install</div>
                  <div className="text-sm text-muted-foreground">
                    Click the installation button below for your platform
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <div className="font-medium">Create or Import Wallet</div>
                  <div className="text-sm text-muted-foreground">
                    Follow MetaMask setup to create a new wallet or import existing one
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg">
                <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <div className="font-medium">Return & Connect</div>
                  <div className="text-sm text-muted-foreground">
                    Come back to Sustano Sphere and click "Connect Wallet"
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Installation Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={handleInstallClick}
              className="w-full h-12"
              size="lg"
            >
              <Monitor className="w-5 h-5 mr-2" />
              Install for Desktop
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              onClick={handleMobileInstallClick}
              variant="outline"
              className="w-full h-12"
              size="lg"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Install for Mobile
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Why We Need MetaMask */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Why MetaMask for Sustano Sphere?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Trade SustainoCoin tokens securely</li>
              <li>• Participate in property auctions with crypto payments</li>
              <li>• Stake tokens for rewards and governance voting</li>
              <li>• Access exclusive blockchain-verified property data</li>
              <li>• Secure, immutable transaction records</li>
            </ul>
          </div>

            {/* Alternative Options */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium text-yellow-900 mb-2">Don't want to install MetaMask?</h4>
              <p className="text-sm text-yellow-800 mb-3">
                You can still use most Sustano Sphere features without MetaMask. 
                Blockchain features will be limited to view-only mode.
              </p>
              {onClose && (
                <Button variant="outline" size="sm" onClick={onClose}>
                  Continue Without MetaMask
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MetaMaskInstallGuide;