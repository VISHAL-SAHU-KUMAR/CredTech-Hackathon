import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryNavItems = [
    { label: 'Dashboard', path: '/credit-intelligence-dashboard', icon: 'BarChart3' },
    { label: 'Credit Analysis', path: '/entity-credit-assessment', icon: 'FileText' },
    { label: 'Portfolio Risk', path: '/portfolio-risk-monitoring', icon: 'Shield' },
    { label: 'Data Sources', path: '/data-sources-management', icon: 'Database' },
  ];

  const secondaryNavItems = [
    { label: 'Model Analytics', path: '/model-performance-analytics', icon: 'TrendingUp' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMoreMenuOpen(false);
  };

  const handleMoreMenuToggle = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    // Logout logic here
    console.log('Logout clicked');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Logo and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
          </Button>
          
          <Link to="/credit-intelligence-dashboard" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Icon name="TrendingUp" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-text-primary">CreditLens Pro</span>
          </Link>
        </div>

        {/* Center Section - Primary Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMoreMenuToggle}
              className={`${isMoreMenuOpen ? 'bg-muted' : ''}`}
            >
              <Icon name="MoreHorizontal" size={16} />
              <span className="ml-2">More</span>
            </Button>
            
            {isMoreMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg py-2 z-1100">
                {secondaryNavItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={() => setIsMoreMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-2 text-sm transition-smooth ${
                      isActivePath(item?.path)
                        ? 'bg-accent text-accent-foreground'
                        : 'text-popover-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Section - Status and Profile */}
        <div className="flex items-center space-x-4">
          {/* Real-time Status Indicator */}
          <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
            <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
            <span className="text-xs font-medium text-success">Live</span>
          </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfileToggle}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden sm:block text-sm font-medium text-text-primary">
                John Analyst
              </span>
              <Icon name="ChevronDown" size={16} className="text-text-secondary" />
            </Button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg py-2 z-1100">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-medium text-popover-foreground">John Analyst</p>
                  <p className="text-xs text-muted-foreground">Senior Credit Analyst</p>
                </div>
                
                <div className="py-2">
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help</span>
                  </button>
                </div>
                
                <div className="border-t border-border pt-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-error hover:bg-error/10 transition-smooth"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border">
          <nav className="px-6 py-4 space-y-2">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={onMenuToggle}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-smooth ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;