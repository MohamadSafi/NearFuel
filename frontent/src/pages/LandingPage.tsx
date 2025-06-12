import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Wallet,
  Zap,
  Users,
  Github,
  FileText,
  Star,
} from 'lucide-react';
import { useNear } from '../context/NearContext';

const LandingPage = () => {
  const { isSignedIn, signIn } = useNear();

  const features = [
    {
      icon: <Wallet className="w-8 h-8 text-blue-500" />,
      title: 'Connect Wallet',
      description:
        'Link your NEAR wallet to get started with zero setup hassle.',
    },
    {
      icon: <Zap className="w-8 h-8 text-cyan-500" />,
      title: 'Click & Interact',
      description: 'Use apps naturally without worrying about gas fees.',
    },
    {
      icon: <Users className="w-8 h-8 text-purple-500" />,
      title: 'Sponsor Pays Gas',
      description:
        'Community sponsors cover your transaction costs automatically.',
    },
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'DeFi Enthusiast',
      content:
        'Finally, I can try new dApps without risking my NEAR balance. Game changer!',
      rating: 5,
    },
    {
      name: 'Sarah Kim',
      role: 'NFT Creator',
      content:
        'NearFuel helped me onboard new users who were hesitant about gas fees.',
      rating: 5,
    },
    {
      name: 'Mike Johnson',
      role: 'Developer',
      content:
        'Perfect for user acquisition. My app usage increased 300% after integration.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Use NEAR apps with{' '}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 gradient-text inline-block">
                zero gas fees
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              NearFuel lets you try apps without paying gas. Sponsors cover it.
              You just click. Experience the future of frictionless blockchain
              interaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isSignedIn ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              ) : (
                <button
                  onClick={signIn}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Connect Wallet
                  <ArrowRight className="ml-2 w-5 h-5" />
                </button>
              )}
              <Link
                to="/sponsor"
                className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 border-2 border-gray-200 dark:border-gray-600"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Three simple steps to start using NEAR apps without gas fees
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-gray-800 rounded-full mb-6 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Users Are Saying
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of users who are already experiencing gas-free NEAR
              interactions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Experience Gas-Free NEAR?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our community and start using NEAR apps without worrying about
            transaction costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/nearfuel/nearfuel-mvp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
            >
              <Github className="mr-2 w-5 h-5" />
              View on GitHub
            </a>
            <a
              href="/docs"
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              <FileText className="mr-2 w-5 h-5" />
              Read Documentation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
