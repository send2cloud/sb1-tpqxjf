import React, { createContext, useState, useContext, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';

interface StripeContextType {
  stripe: Stripe | null;
  setApiKey: (key: string) => void;
}

const StripeContext = createContext<StripeContextType>({
  stripe: null,
  setApiKey: () => {},
});

export const useStripe = () => useContext(StripeContext);

export const StripeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('stripeApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  useEffect(() => {
    if (apiKey) {
      loadStripe(apiKey).then(stripeInstance => {
        if (stripeInstance) {
          setStripe(stripeInstance);
        }
      });
    }
  }, [apiKey]);

  const handleSetApiKey = (key: string) => {
    setApiKey(key);
    localStorage.setItem('stripeApiKey', key);
  };

  return (
    <StripeContext.Provider value={{ stripe, setApiKey: handleSetApiKey }}>
      {children}
    </StripeContext.Provider>
  );
};