import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Lock, Unlock, Plus } from 'lucide-react';
import { ProductData } from '../App';

const ManageStores: React.FC = () => {
  const [stores, setStores] = useState<ProductData[]>([]);

  useEffect(() => {
    const storedStores = Object.keys(localStorage)
      .filter(key => key.startsWith('storefront_'))
      .map(key => JSON.parse(localStorage.getItem(key) || ''));
    setStores(storedStores);
  }, []);

  const deleteStore = (id: string) => {
    localStorage.removeItem(`storefront_${id}`);
    setStores(stores.filter(store => store.id !== id));
  };

  const toggleLock = (id: string) => {
    const updatedStores = stores.map(store => {
      if (store.id === id) {
        const updatedStore = { ...store, locked: !store.locked };
        localStorage.setItem(`storefront_${id}`, JSON.stringify(updatedStore));
        return updatedStore;
      }
      return store;
    });
    setStores(updatedStores);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4 sm:mb-0">Manage Stores</h1>
        <Link to="/create" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center">
          <Plus size={20} className="mr-2" />
          Create New Store
        </Link>
      </div>
      <div className="grid gap-6">
        {stores.map(store => (
          <div key={store.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{store.name}</h2>
            <p className="text-gray-600 mb-2">{store.description}</p>
            <p className="text-lg font-bold mb-4">${store.price.toFixed(2)}</p>
            <div className="flex flex-wrap gap-4">
              <Link to={`/edit/${store.id}`} className="text-indigo-600 hover:text-indigo-800 flex items-center">
                <Edit size={20} className="mr-1" />
                Edit
              </Link>
              <button onClick={() => deleteStore(store.id)} className="text-red-600 hover:text-red-800 flex items-center">
                <Trash2 size={20} className="mr-1" />
                Delete
              </button>
              <button onClick={() => toggleLock(store.id)} className={`flex items-center ${store.locked ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-800"}`}>
                {store.locked ? <Lock size={20} className="mr-1" /> : <Unlock size={20} className="mr-1" />}
                {store.locked ? 'Unlock' : 'Lock'}
              </button>
              <Link to={`/storefront/${store.id}`} className="text-blue-600 hover:text-blue-800">
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStores;