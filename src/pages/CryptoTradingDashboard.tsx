import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, TrendingUp, Coins, PiggyBank, Award, ArrowLeft, Shield, Activity, Zap } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletData {
  address: string;
  sustainoCoinBalance: string;
  greeniumBalance: string;
  stakingRewards: string;
  governanceTokens: string;
}

export default function CryptoTradingDashboard() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error("MetaMask not detected. Please install MetaMask to continue.");
      return;
    }

    setIsLoading(true);
    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        setIsConnected(true);
        // Simulate fetching blockchain data for SustainoCoin ecosystem
        setWalletData({
          address: accounts[0],
          sustainoCoinBalance: "1,250.50",
          greeniumBalance: "847.25",
          stakingRewards: "95.75",
          governanceTokens: "12"
        });
        toast.success("Wallet connected successfully!");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletData(null);
    toast.success("Wallet disconnected");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link to="/">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-purple-200 text-purple-700 hover:bg-purple-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Activity className="w-3 h-3 mr-1" />
              Live Network
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Shield className="w-3 h-3 mr-1" />
              Secure Trading
            </Badge>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="h-10 w-10 text-yellow-500 animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              SustainoCoin Trading Platform
            </h1>
            <Zap className="h-10 w-10 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-xl text-muted-foreground">
            Trade ESG-focused tokens and manage your sustainable investment portfolio
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Blockchain Network Active</span>
          </div>
        </div>

        {/* Wallet Connection */}
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
                  Connect your MetaMask wallet to access your SustainoCoin portfolio
                </p>
                <Button 
                  onClick={connectWallet} 
                  disabled={isLoading}
                  className="w-full max-w-md"
                >
                  {isLoading ? "Connecting..." : "Connect MetaMask Wallet"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Connected Wallet</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {walletData?.address}
                    </p>
                  </div>
                  <Button variant="outline" onClick={disconnectWallet}>
                    Disconnect
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Portfolio Overview */}
        {isConnected && walletData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Coins className="h-4 w-4 text-green-600" />
                  SustainoCoin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{walletData.sustainoCoinBalance}</div>
                <Badge variant="secondary" className="mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +5.2%
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Coins className="h-4 w-4 text-blue-600" />
                  Greenium Tokens
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{walletData.greeniumBalance}</div>
                <Badge variant="secondary" className="mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +3.8%
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <PiggyBank className="h-4 w-4 text-purple-600" />
                  Staking Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{walletData.stakingRewards}</div>
                <Badge variant="secondary" className="mt-2">
                  APY: 12.5%
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Award className="h-4 w-4 text-orange-600" />
                  Governance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{walletData.governanceTokens}</div>
                <Badge variant="secondary" className="mt-2">
                  Voting Power
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Trading Interface */}
        {isConnected && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SustainoCoin Trading</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Trading interface connected to your smart contracts
                  </div>
                  <Button className="w-full">
                    Access Trading Terminal
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Staking & Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Manage your staking positions and governance participation
                  </div>
                  <Button className="w-full" variant="outline">
                    View Staking Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}