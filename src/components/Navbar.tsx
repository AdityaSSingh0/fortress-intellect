
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ActivitySquare, 
  ShieldAlert, 
  Lock, 
  FileDigit, 
  Menu, 
  X, 
  Bell, 
  BarChart, 
  User
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const closeMenu = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };
  
  const links = [
    {
      to: '/',
      icon: <ActivitySquare className="w-5 h-5" />,
      label: 'Dashboard'
    },
    {
      to: '/threats',
      icon: <ShieldAlert className="w-5 h-5" />,
      label: 'Threats'
    },
    {
      to: '/identity',
      icon: <FileDigit className="w-5 h-5" />,
      label: 'Identity'
    },
    {
      to: '/zero-trust',
      icon: <Lock className="w-5 h-5" />,
      label: 'Zero Trust'
    },
  ];
  
  return (
    <nav className="w-full bg-cyber-blue-light/40 backdrop-blur-md border-b border-cyber-blue-accent/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 rounded-full bg-cyber-blue-accent/20 flex items-center justify-center mr-2">
                <ShieldAlert className="w-5 h-5 text-cyber-blue-accent" />
              </div>
              <span className="text-lg font-semibold cyber-gradient-text">AI-CSF</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 text-sm rounded-md transition duration-300
                  ${isActive 
                    ? 'bg-cyber-blue-accent/20 text-cyber-blue-highlight' 
                    : 'text-gray-300 hover:bg-cyber-blue-accent/10 hover:text-cyber-blue-highlight'
                  }`
                }
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </NavLink>
            ))}
          </div>
          
          <div className="hidden md:flex md:items-center md:space-x-4">
            <button className="p-2 rounded-full hover:bg-cyber-blue-accent/10 transition duration-300 relative">
              <Bell className="w-5 h-5 text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyber-red rounded-full"></span>
            </button>
            <button className="p-2 rounded-full hover:bg-cyber-blue-accent/10 transition duration-300">
              <BarChart className="w-5 h-5 text-gray-300" />
            </button>
            <div className="ml-2 pl-2 border-l border-cyber-blue-accent/20">
              <button className="p-1 rounded-full bg-cyber-blue-accent/10 hover:bg-cyber-blue-accent/20 transition duration-300">
                <User className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md bg-cyber-blue-accent/10 hover:bg-cyber-blue-accent/20 transition duration-300"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-cyber-blue-light/80 backdrop-blur-md animate-slide-up border-b border-cyber-blue-accent/20">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 rounded-md transition duration-300
                  ${isActive 
                    ? 'bg-cyber-blue-accent/30 text-white' 
                    : 'text-gray-300 hover:bg-cyber-blue-accent/10 hover:text-white'
                  }`
                }
              >
                {link.icon}
                <span className="ml-2">{link.label}</span>
              </NavLink>
            ))}
            <div className="flex justify-between mt-3 pt-3 border-t border-cyber-blue-accent/20">
              <button className="p-2 rounded-full hover:bg-cyber-blue-accent/10 transition duration-300 relative">
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyber-red rounded-full"></span>
              </button>
              <button className="p-2 rounded-full hover:bg-cyber-blue-accent/10 transition duration-300">
                <BarChart className="w-5 h-5 text-gray-300" />
              </button>
              <button className="p-2 rounded-full hover:bg-cyber-blue-accent/10 transition duration-300">
                <User className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
