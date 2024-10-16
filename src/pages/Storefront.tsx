import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useStripe as useStripeContext } from '../contexts/StripeContext';
import { PaymentRequestButtonElement, Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ProductData } from '../App';
import { Copy, Check } from 'lucide-react';
import CustomerView from '../components/CustomerView';

interface StorefrontProps {
  productData: ProductData | null;
}

const StorefrontContent: React.FC<StorefrontProps> = ({ productData: initialProductData }) => {
  const { id } = useParams<{ id: string }>();
  const { stripe } = useStripeContext();
  const [productData, setProductData] = useState<ProductData | null>(initialProductData);
  const [copied, setCopied] = useState(false);
  const shareUrlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!productData && id) {
      const storedData = localStorage.getItem(`storefront_${id}`);
      if (storedData) {
        setProductData(JSON.parse(storedData));
      }
    }
  }, [id, productData]);

  if (!productData) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <p className="text-red-500">No product data available. Please create a storefront first.</p>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/store/${productData.id}`;

  const copyToClipboard = () => {
    if (shareUrlRef.current) {
      shareUrlRef.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-6 md:mb-0 md:mr-6">
          {productData.imageUrl ? (
            <img src={productData.imageUrl} alt={productData.name} className="w-full h-auto rounded-lg shadow-md" />
          ) : (
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">{productData.name}</h2>
          <p className="text-gray-600 mb-4">{productData.description}</p>
          <p className="text-xl font-bold mb-6">${productData.price.toFixed(2)}</p>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Share your storefront</h3>
            <div className="flex items-center">
              <input
                ref={shareUrlRef}
                type="text"
                value={shareUrl}
                readOnly
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={copyToClipboard}
                className="bg-indigo-600 text-white p-2 rounded-r-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Storefront: React.FC<StorefrontProps> = ({ productData: initialProductData }) => {
  const { stripe } = useStripeContext();
  const { id } = useParams<{ id: string }>();
  const [productData, setProductData] = useState<ProductData | null>(initialProductData);

  useEffect(() => {
    if (!productData && id) {
      const storedData = localStorage.getItem(`storefront_${id}`);
      if (storedData) {
        setProductData(JSON.parse(storedData));
      }
    }
  }, [id, productData]);

  if (!stripe) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <p className="text-red-500">Please set your Stripe API key in the settings page.</p>
      </div>
    );
  }

  // If the URL contains '/store/', render the CustomerView
  if (window.location.pathname.includes('/store/')) {
    return (
      <Elements stripe={stripe}>
        <CustomerView productData={productData} />
      </Elements>
    );
  }

  // Otherwise, render the StorefrontContent (for the store owner)
  return (
    <Elements stripe={stripe}>
      <StorefrontContent productData={productData} />
    </Elements>
  );
};

export default Storefront;