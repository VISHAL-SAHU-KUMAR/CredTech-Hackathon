import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PerformanceMetrics from './components/PerformanceMetrics';
import ModelVersionControl from './components/ModelVersionControl';
import ModelMonitoring from './components/ModelMonitoring';
import RetrainingProgress from './components/RetrainingProgress';
import ModelEvaluation from './components/ModelEvaluation';

const ModelPerformanceAnalytics = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const tabs = [
    { id: 'overview', label: 'Performance Overview', icon: 'BarChart3' },
    { id: 'evaluation', label: 'Model Evaluation', icon: 'Target' },
    { id: 'monitoring', label: 'Real-time Monitoring', icon: 'Activity' },
    { id: 'retraining', label: 'Retraining Progress', icon: 'RefreshCw' },
    { id: 'versions', label: 'Version Control', icon: 'GitBranch' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <PerformanceMetrics />;
      case 'evaluation':
        return <ModelEvaluation />;
      case 'monitoring':
        return <ModelMonitoring />;
      case 'retraining':
        return <RetrainingProgress />;
      case 'versions':
        return <ModelVersionControl />;
      default:
        return <PerformanceMetrics />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Model Performance Analytics - CreditLens Pro</title>
        <meta name="description" content="Comprehensive ML model performance analytics, monitoring, and evaluation dashboard for credit intelligence systems." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header 
          onMenuToggle={handleMobileMenuToggle}
          isMenuOpen={isMobileMenuOpen}
        />

        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
        />

        {/* Main Content */}
        <main className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Model Performance Analytics</h1>
                  <p className="text-muted-foreground mt-2">
                    Comprehensive insights into ML model accuracy, performance metrics, and retraining requirements
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
                    <span className="text-sm font-medium text-success">Model Active</span>
                  </div>
                  <Button variant="outline" iconName="Download" iconPosition="left">
                    Export Report
                  </Button>
                  <Button variant="default" iconName="Settings" iconPosition="left">
                    Configure
                  </Button>
                </div>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Model</p>
                      <p className="text-xl font-bold text-card-foreground">v2.1.3</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="Cpu" size={20} className="text-primary" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="TrendingUp" size={14} className="text-success" />
                    <span className="text-xs text-success">+0.4% accuracy</span>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Predictions Today</p>
                      <p className="text-xl font-bold text-card-foreground">12,847</p>
                    </div>
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Icon name="Activity" size={20} className="text-accent" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">145ms avg latency</span>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Data Drift Score</p>
                      <p className="text-xl font-bold text-card-foreground">0.12</p>
                    </div>
                    <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Icon name="TrendingUp" size={20} className="text-warning" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="AlertTriangle" size={14} className="text-warning" />
                    <span className="text-xs text-warning">Monitor threshold</span>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Last Retrained</p>
                      <p className="text-xl font-bold text-card-foreground">2 days</p>
                    </div>
                    <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                      <Icon name="RefreshCw" size={20} className="text-success" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs text-success">Completed successfully</span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-border">
                <nav className="flex space-x-8 overflow-x-auto">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-text-primary hover:border-border'
                      }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span>{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tab Content */}
            <div className="space-y-6">
              {renderTabContent()}
            </div>
          </div>
        </main>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={handleMobileMenuToggle}
          ></div>
        )}
      </div>
    </>
  );
};

export default ModelPerformanceAnalytics;