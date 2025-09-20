import { supabase } from "@/integrations/supabase/client";

// Web3 provider configuration
export class BlockchainProvider {
  private static instance: BlockchainProvider;
  private web3: any = null;
  private infuraUrl: string = '';

  private constructor() {}

  public static getInstance(): BlockchainProvider {
    if (!BlockchainProvider.instance) {
      BlockchainProvider.instance = new BlockchainProvider();
    }
    return BlockchainProvider.instance;
  }

  async initialize() {
    try {
      // Get the blockchain API key from Supabase secrets
      const { data, error } = await supabase.functions.invoke('get-blockchain-config');
      
      if (error) {
        console.error('Error getting blockchain config:', error);
        return false;
      }

      // Dynamic import of Web3
      const Web3 = (await import('web3')).default;
      
      this.infuraUrl = data.blockchain_url || 'https://polygon-mainnet.infura.io/v3/9ba231d60bed4b5eb630c393b3ef9a19';
      this.web3 = new Web3(this.infuraUrl);
      
      console.log('Blockchain provider initialized with Infura');
      return true;
    } catch (error) {
      console.error('Failed to initialize blockchain provider:', error);
      return false;
    }
  }

  async getWeb3() {
    if (!this.web3) {
      await this.initialize();
    }
    return this.web3;
  }

  async getNetworkInfo() {
    try {
      const web3 = await this.getWeb3();
      if (!web3) return null;

      const chainId = await web3.eth.getChainId();
      const blockNumber = await web3.eth.getBlockNumber();
      const gasPrice = await web3.eth.getGasPrice();

      return {
        chainId,
        blockNumber: Number(blockNumber),
        gasPrice: web3.utils.fromWei(gasPrice, 'gwei'),
        network: chainId === 137 ? 'Polygon Mainnet' : `Chain ${chainId}`
      };
    } catch (error) {
      console.error('Error getting network info:', error);
      return null;
    }
  }

  async getBalance(address: string) {
    try {
      const web3 = await this.getWeb3();
      if (!web3) return '0';

      const balance = await web3.eth.getBalance(address);
      return web3.utils.fromWei(balance, 'ether');
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }

  async getTokenBalance(tokenAddress: string, walletAddress: string) {
    try {
      const web3 = await this.getWeb3();
      if (!web3) return '0';

      // ERC-20 balanceOf function ABI
      const minABI = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function"
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [{ name: "", type: "uint8" }],
          type: "function"
        }
      ];

      const contract = new web3.eth.Contract(minABI, tokenAddress);
      const balance = await contract.methods.balanceOf(walletAddress).call();
      const decimals = await contract.methods.decimals().call();
      
      return (Number(balance) / Math.pow(10, Number(decimals))).toString();
    } catch (error) {
      console.error('Error getting token balance:', error);
      return '0';
    }
  }

  async getTransactionHistory(address: string, limit: number = 10) {
    try {
      const web3 = await this.getWeb3();
      if (!web3) return [];

      const latestBlock = await web3.eth.getBlockNumber();
      const transactions = [];

      // Get recent blocks and filter transactions for the address
      for (let i = 0; i < Math.min(100, Number(latestBlock)); i++) {
        const block = await web3.eth.getBlock(Number(latestBlock) - i, true);
        if (block && block.transactions) {
          for (const tx of block.transactions) {
            if (tx.from?.toLowerCase() === address.toLowerCase() || 
                tx.to?.toLowerCase() === address.toLowerCase()) {
              transactions.push({
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: web3.utils.fromWei(tx.value || '0', 'ether'),
                timestamp: new Date(Number(block.timestamp) * 1000),
                blockNumber: block.number
              });
              
              if (transactions.length >= limit) break;
            }
          }
        }
        if (transactions.length >= limit) break;
      }

      return transactions;
    } catch (error) {
      console.error('Error getting transaction history:', error);
      return [];
    }
  }

  // SustainoCoin contract interactions (placeholder - replace with actual contract)
  async getSustainoCoinPrice() {
    // This would interact with your actual SustainoCoin contract
    // For now, return mock data
    return {
      price: '$2.47',
      change24h: '+15.3%',
      marketCap: '$847M'
    };
  }

  async getStakingInfo(address: string) {
    // This would interact with your staking contract
    return {
      stakedAmount: '1,250',
      rewards: '45.7',
      apy: '12.5%'
    };
  }
}