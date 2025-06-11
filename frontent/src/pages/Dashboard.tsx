import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Zap, Gift, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useNear } from '../context/NearContext';

const Dashboard = () => {
  const { isSignedIn, accountId, executeAction } = useNear();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  const sponsoredActions = [
    {
      id: 'mint_nft',
      title: 'Mint Test NFT',
      description: 'Create a unique NFT on NEAR testnet at zero cost',
      icon: <Gift className="w-6 h-6" />,
      gasCost: '0.003 NEAR',
      sponsor: 'community.nearfuel.near',
      category: 'NFT',
    },
    {
      id: 'send_test_tx',
      title: 'Send Test Transaction',
      description: 'Try sending a transaction without paying gas fees',
      icon: <Send className="w-6 h-6" />,
      gasCost: '0.001 NEAR',
      sponsor: 'dev.nearfuel.near',
      category: 'Transaction',
    },
    {
      id: 'stake_tokens',
      title: 'Stake Test Tokens',
      description: 'Experience staking without upfront gas costs',
      icon: <Zap className="w-6 h-6" />,
      gasCost: '0.005 NEAR',
      sponsor: 'validator.nearfuel.near',
      category: 'DeFi',
    },
  ];

  const handleAction = async (actionId: string) => {
    setLoadingAction(actionId);
    try {
      await executeAction(actionId);
      setCompletedActions([...completedActions, actionId]);
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setLoadingAction(null);
    }
  };

  const getActionStatus = (actionId: string) => {
    if (loadingAction === actionId) {
      return 'loading';
    }
    if (completedActions.includes(actionId)) {
      return 'completed';
    }
    return 'available';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              Hey, {accountId} 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Welcome to your gas-free NEAR experience. All actions below are sponsored by the community.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Actions Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedActions.length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gas Saved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {(completedActions.length * 0.003).toFixed(3)} NEAR
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">You Paid</p>
                <p className="text-2xl font-bold text-green-500">0 NEAR</p>
              </div>
              <Gift className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Available Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Available Sponsored Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sponsoredActions.map((action) => {
              const status = getActionStatus(action.id);
              return (
                <div
                  key={action.id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        {action.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {action.title}
                        </h3>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-gray-600 dark:text-gray-300">
                          {action.category}
                        </span>
                      </div>
                    </div>
                    {status === 'completed' && (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {action.description}
                  </p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Gas Cost:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {action.gasCost}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Sponsored by:</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        {action.sponsor}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">You pay:</span>
                      <span className="font-bold text-green-500">0 NEAR</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleAction(action.id)}
                    disabled={status === 'loading' || status === 'completed'}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : status === 'loading'
                        ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105'
                    }`}
                  >
                    {status === 'loading' ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Processing...
                      </div>
                    ) : status === 'completed' ? (
                      'Completed'
                    ) : (
                      'Use for Free'
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-6 h-6 text-blue-500 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                How Gas Sponsorship Works
              </h3>
              <p className="text-blue-700 dark:text-blue-200 text-sm">
                Each action is sponsored by community members who have deposited NEAR tokens to cover gas costs. 
                When you perform an action, the gas is automatically deducted from the sponsor's balance, 
                not your wallet. This allows you to experience NEAR apps without any upfront costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;