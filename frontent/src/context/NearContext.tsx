import React, { createContext, useContext, useState, useEffect } from 'react';
import { connect, Contract, keyStores, WalletConnection } from 'near-api-js';

interface NearContextType {
  wallet: WalletConnection | null;
  isSignedIn: boolean;
  accountId: string | null;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
  executeAction: (action: string) => Promise<void>;
}

const NearContext = createContext<NearContextType | undefined>(undefined);

export const useNear = () => {
  const context = useContext(NearContext);
  if (!context) {
    throw new Error('useNear must be used within a NearProvider');
  }
  return context;
};

export const NearProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [accountId, setAccountId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initNear();
  }, []);

  const initNear = async () => {
    try {
      const keyStore = new keyStores.BrowserLocalStorageKeyStore();
      const config = {
        networkId: 'testnet',
        keyStore,
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://testnet.mynearwallet.com/',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://testnet.nearblocks.io',
      };

      const near = await connect(config);
      const walletConnection = new WalletConnection(near, 'nearfuel-mvp');

      setWallet(walletConnection);
      setIsSignedIn(walletConnection.isSignedIn());
      setAccountId(walletConnection.getAccountId());
      setLoading(false);
    } catch (error) {
      console.error('Failed to initialize NEAR:', error);
      setLoading(false);
    }
  };

  const signIn = () => {
    if (wallet) {
      wallet.requestSignIn({
        contractId: 'guest-book.testnet',
        methodNames: [],
      });
    }
  };

  const signOut = () => {
    if (wallet) {
      wallet.signOut();
      setIsSignedIn(false);
      setAccountId(null);
      window.location.reload();
    }
  };

  const executeAction = async (action: string) => {
    if (!wallet || !isSignedIn) return;

    try {
      // Mock transaction for demo - in real app, this would call actual contract methods
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log(`Executed action: ${action}`);
    } catch (error) {
      console.error('Transaction failed:', error);
      throw error;
    }
  };

  return (
    <NearContext.Provider
      value={{
        wallet,
        isSignedIn,
        accountId,
        loading,
        signIn,
        signOut,
        executeAction,
      }}
    >
      {children}
    </NearContext.Provider>
  );
};
