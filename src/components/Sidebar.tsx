import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Plus, Settings, List, LogOut, X } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-30 w-64 bg-indigo-800 dark:bg-gray-800 text-white transition duration-300 ease-in-out transform md:relative md:translate-x-0`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-8 h-8" />
          <span className="text-2xl font-extrabold">QuickStore</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden">
          <X size={24} />
        </button>
      </div>
      <nav className="mt-5 px-2">
        <NavLink to="/" className={({ isActive }) =>
          `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            isActive ? 'bg-indigo-700 dark:bg-gray-700' : 'hover:bg-indigo-700 dark:hover:bg-gray-700'
          }`
        }>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/manage" className={({ isActive }) =>
          `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            isActive ? 'bg-indigo-700 dark:bg-gray-700' : 'hover:bg-indigo-700 dark:hover:bg-gray-700'
          }`
        }>
          <List size={20} />
          <span>Manage Stores</span>
        </NavLink>
        <NavLink to="/create" className={({ isActive }) =>
          `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            isActive ? 'bg-indigo-700 dark:bg-gray-700' : 'hover:bg-indigo-700 dark:hover:bg-gray-700'
          }`
        }>
          <Plus size={20} />
          <span>Create Store</span>
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) =>
          `flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 ${
            isActive ? 'bg-indigo-700 dark:bg-gray-700' : 'hover:bg-indigo-700 dark:hover:bg-gray-700'
          }`
        }>
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 dark:hover:bg-gray-700 w-full text-left"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
      <div className="absolute bottom-4 left-4">
        <DarkModeToggle />
      </div>
    </div>
  );
};

export default Sidebar;