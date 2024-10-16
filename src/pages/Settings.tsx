import React, { useState, useEffect } from 'react';
import { useStripe } from '../contexts/StripeContext';
import Modal from '../components/Modal';

const Settings: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const { setApiKey: setContextApiKey } = useStripe();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('stripeApiKey');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContextApiKey(apiKey);
    localStorage.setItem('stripeApiKey', apiKey);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="apiKey" className="block text-gray-700 font-bold mb-2">
            Stripe Publishable Key
          </label>
          <input
            type="text"
            id="apiKey"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Save Settings
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3 className="text-xl font-semibold mb-2">Settings Saved</h3>
        <p>Your Stripe API Key has been successfully saved.</p>
      </Modal>
    </div>
  );
};

export default Settings;