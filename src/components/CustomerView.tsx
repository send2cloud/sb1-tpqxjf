import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PaymentRequestButtonElement, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ProductData } from '../App';

interface CustomerViewProps {
  productData: ProductData | null;
}

const CustomerView: React.FC<CustomerViewProps> = ({ productData: initialProductData }) => {
  const { id } = useParams<{ id: string }>();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const [productData, setProductData] = useState<ProductData | null>(initialProductData);

  useEffect(() => {
    if (!productData && id) {
      const storedData = localStorage.getItem(`storefront_${id}`);
      if (storedData) {
        setProductData(JSON.parse(storedData));
      }
    }
  }, [id, productData]);

  useEffect(() => {
    if (!stripe || !productData) return;

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: productData.name,
        amount: Math.round(productData.price * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment().then(result => {
      if (result && result.applePay) {
        setPaymentRequest(pr);
        setIsApplePayAvailable(true);
      }
    }).catch(err => {
      console.error("Error setting up payment request:", err);
      setError("There was an error setting up the payment. Please try again later.");
    });

    pr.on('paymentmethod', async (e) => {
      console.log('Payment successful:', e);
      e.complete('success');
    });
  }, [stripe, productData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        setError(error.message || 'An error occurred');
      } else {
        console.log('Payment successful:', paymentMethod);
        cardElement.clear();
      }
    }

    setIsProcessing(false);
  };

  if (!productData) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
        <p className="text-red-500">Product not found.</p>
      </div>
    );
  }

  if (productData.locked) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{productData.name}</h2>
            <p className="text-xl font-bold text-red-600 mb-4">Sold Out</p>
            <p className="text-gray-600">We apologize, but this item is currently out of stock.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-8">
          {productData.imageUrl && (
            <img src={productData.imageUrl} alt={productData.name} className="w-full h-auto rounded-lg shadow-md mb-6" />
          )}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{productData.name}</h2>
          <p className="text-gray-600 mb-4">{productData.description}</p>
          <p className="text-xl font-bold text-gray-900 mb-6">${productData.price.toFixed(2)}</p>
          
          {isApplePayAvailable && paymentRequest && (
            <div className="mb-6">
              <PaymentRequestButtonElement options={{ paymentRequest }} />
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <button
              type="submit"
              disabled={!stripe || isProcessing}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Pay with Card'}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default CustomerView;