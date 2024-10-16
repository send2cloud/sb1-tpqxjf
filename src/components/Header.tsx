import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingBag className="w-8 h-8 text-primary-light dark:text-primary-dark" />
          <span className="text-xl font-bold text-gray-800 dark:text-gray-200">QuickStore</span>
        </Link>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/admin-login" className="text-gray-600 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark transition duration-300">Admin Login</Link>
            </li>
          </ul>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;