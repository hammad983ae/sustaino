import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Wallet, 
  TrendingUp, 
  Coins, 
  PiggyBank, 
  Award, 
  Shield, 
  Activity,
  Zap,
  Lock,
  Globe,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface BlockchainStats {
  sustainoCoinPrice: string;
  marketCap: string;
  stakingApy: string;
  totalStaked: string;
  activeValidators: number;
}

interface BlockchainIntegrationProps {
  variant?: "compact" | "full";
  showWalletConnect?: boolean;
}

export const BlockchainIntegration: React.FC<BlockchainIntegrationProps> = ({
  variant = "compact",
  showWalletConnect = true
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [blockchainStats] = useState<BlockchainStats>({
    sustainoCoinPrice: "$2.47",
    marketCap: "$847M",
    stakingApy: "12.5%",
    totalStaked: "67%",
    activeValidators: 1247
  });

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected. Please install MetaMask to continue.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setIsConnected(true);
        toast.success("Wallet connected successfully!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  if (variant === "compact") {
    return (
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Blockchain Hub
            </CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-blue-700">{blockchainStats.sustainoCoinPrice}</div>
              <div className="text-xs text-blue-600">SustainoCoin</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-700">{blockchainStats.stakingApy}</div>
              <div className="text-xs text-purple-600">Staking APY</div>
            </div>
          </div>
          
          {showWalletConnect && (
            <div className="space-y-2">
              {!isConnected ? (
                <Button onClick={connectWallet} className="w-full" size="sm">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              ) : (
                <div className="text-center text-sm text-green-700">
                  ✅ Wallet Connected
                </div>
              )}
              <Link to="/crypto-trading">
                <Button variant="outline" className="w-full" size="sm">
                  <Coins className="w-4 h-4 mr-2" />
                  Trading Dashboard
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Blockchain Overview */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-6 w-6 text-yellow-500" />
            SustainoCoin Blockchain Network
          </CardTitle>
          <p className="text-muted-foreground">
            ESG-focused blockchain for sustainable property investments
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Network Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{blockchainStats.sustainoCoinPrice}</div>
              <div className="text-sm text-blue-600">Token Price</div>
              <Badge variant="secondary" className="mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +15.3%
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">{blockchainStats.marketCap}</div>
              <div className="text-sm text-purple-600">Market Cap</div>
              <Badge variant="secondary" className="mt-1">
                <Globe className="w-3 h-3 mr-1" />
                Rank #127
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{blockchainStats.stakingApy}</div>
              <div className="text-sm text-green-600">Staking APY</div>
              <Badge variant="secondary" className="mt-1">
                <PiggyBank className="w-3 h-3 mr-1" />
                Earn Rewards
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-white/60 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">{blockchainStats.activeValidators}</div>
              <div className="text-sm text-orange-600">Validators</div>
              <Badge variant="secondary" className="mt-1">
                <Shield className="w-3 h-3 mr-1" />
                Secure
              </Badge>
            </div>
          </div>

          {/* Staking Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Network Staked</span>
              <span className="font-medium">{blockchainStats.totalStaked}</span>
            </div>
            <Progress value={67} className="h-2" />
            <div className="text-xs text-muted-foreground">
              Higher staking percentage = More network security
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/crypto-trading">
              <Button className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Trading Dashboard
              </Button>
            </Link>
            
            <Button variant="outline" className="w-full">
              <PiggyBank className="w-4 h-4 mr-2" />
              Start Staking
            </Button>
            
            <Button variant="outline" className="w-full">
              <Award className="w-4 h-4 mr-2" />
              Governance
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Connection */}
      {showWalletConnect && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Connection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Connect your MetaMask wallet to access blockchain features
                </p>
                <Button onClick={connectWallet} className="w-full max-w-md">
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect MetaMask Wallet
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Wallet Connected</span>
                </div>
                <Button variant="outline" onClick={() => setIsConnected(false)}>
                  Disconnect
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BlockchainIntegration;