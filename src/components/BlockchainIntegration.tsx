import React, { useState, useEffect } from 'react';
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
  BarChart3,
  Wifi,
  WifiOff
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MetaMaskInstallGuide from "./MetaMaskInstallGuide";
import { BlockchainProvider } from "@/lib/blockchain-provider";

interface BlockchainStats {
  sustainoCoinPrice: string;
  marketCap: string;
  stakingApy: string;
  totalStaked: string;
  activeValidators: number;
  networkStatus: 'connected' | 'disconnected' | 'connecting';
  blockNumber?: number;
  gasPrice?: string;
}

interface BlockchainIntegrationProps {
  variant?: "compact" | "full";
  showWalletConnect?: boolean;
}

interface NetworkInfo {
  chainId: number;
  blockNumber: number;
  gasPrice: string;
  network: string;
}

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const BlockchainIntegration: React.FC<BlockchainIntegrationProps> = ({
  variant = "compact",
  showWalletConnect = true
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo | null>(null);
  const [blockchainStats, setBlockchainStats] = useState<BlockchainStats>({
    sustainoCoinPrice: "$2.47",
    marketCap: "$847M",
    stakingApy: "12.5%",
    totalStaked: "67%",
    activeValidators: 1247,
    networkStatus: 'disconnected'
  });

  // Initialize blockchain provider on component mount
  useEffect(() => {
    initializeBlockchain();
  }, []);

  const initializeBlockchain = async () => {
    try {
      setBlockchainStats(prev => ({ ...prev, networkStatus: 'connecting' }));
      
      const provider = BlockchainProvider.getInstance();
      const initialized = await provider.initialize();
      
      if (initialized) {
        const info = await provider.getNetworkInfo();
        if (info) {
          setNetworkInfo(info);
          setBlockchainStats(prev => ({ 
            ...prev, 
            networkStatus: 'connected',
            blockNumber: info.blockNumber,
            gasPrice: `${parseFloat(info.gasPrice).toFixed(2)} GWEI`
          }));
          
          toast.success("Connected to Polygon network via Infura");
        }
      }
    } catch (error) {
      console.error('Error initializing blockchain:', error);
      setBlockchainStats(prev => ({ ...prev, networkStatus: 'disconnected' }));
      toast.error("Failed to connect to blockchain network");
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      // Don't show install guide automatically, just inform user
      toast.info("MetaMask not detected. You can still use Sustano Sphere features in view-only mode.", {
        duration: 5000,
      });
      return;
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      // Check if connected to Polygon network
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x89') { // 0x89 is Polygon Mainnet
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x89' }],
          });
        } catch (switchError: any) {
          // Chain doesn't exist, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x89',
                chainName: 'Polygon Mainnet',
                nativeCurrency: {
                  name: 'MATIC',
                  symbol: 'MATIC',
                  decimals: 18
                },
                rpcUrls: ['https://polygon-rpc.com/'],
                blockExplorerUrls: ['https://polygonscan.com/']
              }]
            });
          }
        }
      }
      
      if (accounts.length > 0) {
        setIsConnected(true);
        toast.success("Wallet connected successfully to Polygon!");
        
        // Get wallet balance using our provider
        const provider = BlockchainProvider.getInstance();
        const balance = await provider.getBalance(accounts[0]);
        console.log(`Wallet balance: ${balance} MATIC`);
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
              {blockchainStats.networkStatus === 'connected' && (
                <Wifi className="h-4 w-4 text-green-500" />
              )}
              {blockchainStats.networkStatus === 'disconnected' && (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Activity className="w-3 h-3 mr-1" />
                {blockchainStats.networkStatus === 'connected' ? 'Connected' : 
                 blockchainStats.networkStatus === 'connecting' ? 'Connecting...' : 'Offline'}
              </Badge>
              {networkInfo && (
                <Badge variant="outline" className="text-xs">
                  Block: {networkInfo.blockNumber}
                </Badge>
              )}
            </div>
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
          
          {/* Network Status */}
          {networkInfo && (
            <div className="bg-white/60 rounded-lg p-2 text-xs space-y-1">
              <div className="flex justify-between">
                <span>Network:</span>
                <span className="font-medium">{networkInfo.network}</span>
              </div>
              <div className="flex justify-between">
                <span>Gas Price:</span>
                <span className="font-medium">{networkInfo.gasPrice} GWEI</span>
              </div>
            </div>
          )}
          
          {showWalletConnect && (
            <div className="space-y-2">
              {!isConnected ? (
                <div className="space-y-2">
                  <Button onClick={connectWallet} className="w-full" size="sm">
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </Button>
                  <Dialog open={showInstallGuide} onOpenChange={setShowInstallGuide}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setShowInstallGuide(true)} className="w-full" size="sm">
                        Need MetaMask?
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <MetaMaskInstallGuide onClose={() => setShowInstallGuide(false)} />
                    </DialogContent>
                  </Dialog>
                </div>
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
                  Connect your MetaMask wallet to access full blockchain features, or continue using Sustano Sphere in view-only mode.
                </p>
                <div className="flex flex-col gap-2 max-w-md mx-auto">
                  <Button onClick={connectWallet} className="w-full">
                    <Wallet className="w-4 h-4 mr-2" />
                    Connect MetaMask Wallet
                  </Button>
                  <Dialog open={showInstallGuide} onOpenChange={setShowInstallGuide}>
                    <DialogTrigger asChild>
                      <Button variant="outline" onClick={() => setShowInstallGuide(true)} className="w-full">
                        Install MetaMask Guide
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <MetaMaskInstallGuide onClose={() => setShowInstallGuide(false)} />
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" className="w-full text-muted-foreground">
                    Continue Without Wallet
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground">
                  📊 All analytics and reports remain fully accessible • 🔍 Property search and analysis available • 💡 Educational content accessible
                </div>
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