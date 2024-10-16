import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Zap, Share2 } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to PopStores</h1>
      <p className="text-xl mb-8">Create disposable storefronts in minutes</p>
      <Link
        to="/create"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300"
      >
        Create Your PopStore
      </Link>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ShoppingBag className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Setup</h3>
          <p>Create your storefront in just a few clicks</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Zap className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Fast Payments</h3>
          <p>Accept payments quickly with Apple Pay</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Share2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Easy Sharing</h3>
          <p>Share your storefront link with customers</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
