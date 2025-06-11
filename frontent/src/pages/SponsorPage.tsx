import React, { useState } from 'react';
import { Heart, Users, Zap, TrendingUp, Gift, Wallet, ArrowRight } from 'lucide-react';
import { useNear } from '../context/NearContext';

const SponsorPage = () => {
  const { isSignedIn, accountId, signIn } = useNear();
  const [depositAmount, setDepositAmount] = useState('');
  const [isDepositing, setIsDepositing] = useState(false);

  const sponsorStats = {
    totalSponsored: '147.32 NEAR',
    usersHelped: 432,
    actionsSponsored: 1247,
    estimatedRewards: '12.8 NEAR',
  };

  const recentActivity = [
    { user: 'alice.near', action: 'Mint NFT', amount: '0.003 NEAR', time: '2 minutes ago' },
    { user: 'bob.near', action: 'Send Transaction', amount: '0.001 NEAR', time: '5 minutes ago' },
    { user: 'charlie.near', action: 'Stake Tokens', amount: '0.005 NEAR', time: '8 minutes ago' },
    { user: 'dave.near', action: 'Mint NFT', amount: '0.003 NEAR', time: '12 minutes ago' },
  ];

  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    
    setIsDepositing(true);
    try {
      // Mock deposit process
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert(`Successfully deposited ${depositAmount} NEAR for gas sponsorship!`);
      setDepositAmount('');
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsDepositing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Become a Gas Sponsor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Help onboard new users to NEAR by sponsoring their gas fees. 
            Support the ecosystem while earning rewards and building community.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Sponsored</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sponsorStats.totalSponsored}
                </p>
              </div>
              <Heart className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Users Helped</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sponsorStats.usersHelped}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Actions Sponsored</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {sponsorStats.actionsSponsored}
                </p>
              </div>
              <Zap className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Estimated Rewards</p>
                <p className="text-2xl font-bold text-green-500">
                  {sponsorStats.estimatedRewards}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Deposit Section */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Start Sponsoring
            </h2>
            
            {!isSignedIn ? (
              <div className="text-center py-8">
                <Wallet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Connect your wallet to start sponsoring gas fees
                </p>
                <button
                  onClick={signIn}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105"
                >
                  <Wallet className="mr-2 w-5 h-5" />
                  Connect Wallet
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Deposit Amount (NEAR)
                  </label>
                  <input
                    type="number"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    placeholder="Enter amount to sponsor"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Sponsorship Impact
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex justify-between">
                      <span>NFT Mints (0.003 NEAR each):</span>
                      <span className="font-medium">
                        ~{depositAmount ? Math.floor(parseFloat(depositAmount) / 0.003) : 0} actions
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transactions (0.001 NEAR each):</span>
                      <span className="font-medium">
                        ~{depositAmount ? Math.floor(parseFloat(depositAmount) / 0.001) : 0} actions
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated users helped:</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">
                        ~{depositAmount ? Math.floor(parseFloat(depositAmount) / 0.01) : 0} users
                      </span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleDeposit}
                  disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isDepositing}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isDepositing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Gift className="mr-2 w-5 h-5" />
                      Deposit & Start Sponsoring
                    </div>
                  )}
                </button>
                
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Connected as: {accountId}
                </div>
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Recent Sponsored Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {activity.user.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.user}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {activity.amount}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                View All Activity
                <ArrowRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-2xl text-white">
          <h2 className="text-2xl font-bold mb-6">Why Become a Sponsor?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-blue-100" />
              <h3 className="font-semibold mb-2">Build Community</h3>
              <p className="text-blue-100 text-sm">
                Help onboard new users to NEAR and grow the ecosystem
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-blue-100" />
              <h3 className="font-semibold mb-2">Earn Rewards</h3>
              <p className="text-blue-100 text-sm">
                Get protocol rewards and governance tokens for your contribution
              </p>
            </div>
            <div className="text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-blue-100" />
              <h3 className="font-semibold mb-2">Make Impact</h3>
              <p className="text-blue-100 text-sm">
                Remove barriers and make blockchain accessible to everyone
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorPage;