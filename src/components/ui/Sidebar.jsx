import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const navigationItems = [
    {
      section: 'Analytics',
      items: [
        { label: 'Dashboard', path: '/credit-intelligence-dashboard', icon: 'BarChart3', tooltip: 'Credit Intelligence Dashboard' },
        { label: 'Credit Analysis', path: '/entity-credit-assessment', icon: 'FileText', tooltip: 'Entity Credit Assessment' },
        { label: 'Portfolio Risk', path: '/portfolio-risk-monitoring', icon: 'Shield', tooltip: 'Portfolio Risk Monitoring' },
      ]
    },
    {
      section: 'Operations',
      items: [
        { label: 'Data Sources', path: '/data-sources-management', icon: 'Database', tooltip: 'Data Sources Management' },
        { label: 'Model Analytics', path: '/model-performance-analytics', icon: 'TrendingUp', tooltip: 'Model Performance Analytics' },
      ]
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  const filteredItems = navigationItems?.map(section => ({
    ...section,
    items: section?.items?.filter(item =>
      item?.label?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.tooltip?.toLowerCase()?.includes(searchQuery?.toLowerCase())
    )
  }))?.filter(section => section?.items?.length > 0);

  const handleSearchChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-16 bottom-0 z-1000 bg-surface border-r border-border transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-60'
      }`}>
        <div className="flex flex-col h-full">
          {/* Toggle Button */}
          <div className="flex items-center justify-end p-4 border-b border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={16} />
            </Button>
          </div>

          {/* Search */}
          {!isCollapsed && (
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search navigation..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="pl-10 pr-10"
                />
                <Icon 
                  name="Search" 
                  size={16} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearSearch}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                  >
                    <Icon name="X" size={12} />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {(searchQuery ? filteredItems : navigationItems)?.map((section) => (
                <div key={section?.section}>
                  {!isCollapsed && (
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      {section?.section}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {section?.items?.map((item) => (
                      <div key={item?.path} className="relative group">
                        <Link
                          to={item?.path}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-smooth ${
                            isActivePath(item?.path)
                              ? 'bg-primary text-primary-foreground'
                              : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                          } ${isCollapsed ? 'justify-center' : ''}`}
                        >
                          <Icon name={item?.icon} size={18} />
                          {!isCollapsed && <span>{item?.label}</span>}
                        </Link>
                        
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-1100">
                            {item?.tooltip}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Search Results */}
            {searchQuery && filteredItems?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No results found</p>
                <p className="text-xs text-muted-foreground mt-1">Try a different search term</p>
              </div>
            )}
          </nav>

          {/* Status Section */}
          <div className="p-4 border-t border-border">
            {!isCollapsed ? (
              <div className="space-y-3">
                {/* Connection Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
                    <span className="text-xs font-medium text-success">Connected</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Live</span>
                </div>
                
                {/* Data Freshness */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="RefreshCw" size={12} className="text-accent" />
                    <span className="text-xs text-muted-foreground">Last sync</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2m ago</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-2">
                <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
                <Icon name="RefreshCw" size={12} className="text-accent" />
              </div>
            )}
          </div>
        </div>
      </aside>
      {/* Overlay for mobile */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-999 opacity-0 pointer-events-none"></div>
    </>
  );
};

export default Sidebar;