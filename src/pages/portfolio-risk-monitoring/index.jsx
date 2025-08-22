import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import EntityListPanel from './components/EntityListPanel';
import RiskAnalyticsPanel from './components/RiskAnalyticsPanel';
import AlertsPanel from './components/AlertsPanel';
import ModelPerformanceCard from './components/ModelPerformanceCard';
import DataSourcesStatus from './components/DataSourcesStatus';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PortfolioRiskMonitoring = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedEntities, setSelectedEntities] = useState([]);
  const [activeTab, setActiveTab] = useState('analytics');

  // Mock data for portfolio entities
  const portfolioEntities = [
    {
      id: 'tech-001',
      name: 'TechCorp Inc',
      ticker: 'TECH',
      currentScore: 742,
      scoreChange: -8,
      riskCategory: 'medium',
      industry: 'technology',
      region: 'north-america',
      hasAlerts: true,
      exposure: 2500000
    },
    {
      id: 'health-002',
      name: 'HealthPlus Ltd',
      ticker: 'HLTH',
      currentScore: 689,
      scoreChange: -15,
      riskCategory: 'high',
      industry: 'healthcare',
      region: 'europe',
      hasAlerts: true,
      exposure: 1800000
    },
    {
      id: 'bank-003',
      name: 'SafeBank Corp',
      ticker: 'SAFE',
      currentScore: 798,
      scoreChange: 3,
      riskCategory: 'low',
      industry: 'finance',
      region: 'north-america',
      hasAlerts: false,
      exposure: 5000000
    },
    {
      id: 'growth-004',
      name: 'GrowthCo',
      ticker: 'GROW',
      currentScore: 625,
      scoreChange: -22,
      riskCategory: 'critical',
      industry: 'technology',
      region: 'asia-pacific',
      hasAlerts: true,
      exposure: 1200000
    },
    {
      id: 'stable-005',
      name: 'StableFirm',
      ticker: 'STBL',
      currentScore: 756,
      scoreChange: 1,
      riskCategory: 'low',
      industry: 'manufacturing',
      region: 'north-america',
      hasAlerts: false,
      exposure: 3200000
    },
    {
      id: 'risky-006',
      name: 'RiskyCorp',
      ticker: 'RISK',
      currentScore: 598,
      scoreChange: -35,
      riskCategory: 'critical',
      industry: 'energy',
      region: 'latin-america',
      hasAlerts: true,
      exposure: 800000
    },
    {
      id: 'conservative-007',
      name: 'ConservativeCo',
      ticker: 'CONS',
      currentScore: 812,
      scoreChange: 5,
      riskCategory: 'low',
      industry: 'finance',
      region: 'europe',
      hasAlerts: false,
      exposure: 4500000
    },
    {
      id: 'mid-008',
      name: 'MidRiskInc',
      ticker: 'MIDR',
      currentScore: 701,
      scoreChange: -3,
      riskCategory: 'medium',
      industry: 'retail',
      region: 'north-america',
      hasAlerts: false,
      exposure: 2100000
    }
  ];

  // Mock data for alerts
  const alertsData = [
    {
      id: 'alert-001',
      entityName: 'GrowthCo',
      severity: 'critical',
      type: 'score-change',
      message: 'Credit score dropped by 22 points in the last 24 hours',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      details: {
        previousScore: 647,
        currentScore: 625,
        changePercent: -3.4,
        trigger: 'Threshold breach'
      }
    },
    {
      id: 'alert-002',
      entityName: 'RiskyCorp',
      severity: 'critical',
      type: 'threshold-breach',
      message: 'Credit score fell below critical threshold of 600',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      details: {
        threshold: 600,
        currentScore: 598,
        breach: -2,
        duration: '15 minutes'
      }
    },
    {
      id: 'alert-003',
      entityName: 'HealthPlus Ltd',
      severity: 'high',
      type: 'news-event',
      message: 'Negative news sentiment detected affecting credit profile',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      details: {
        sentimentScore: -0.7,
        newsCount: 5,
        impactScore: 8.2,
        category: 'Regulatory'
      }
    },
    {
      id: 'alert-004',
      entityName: 'TechCorp Inc',
      severity: 'medium',
      type: 'data-quality',
      message: 'Missing financial data for Q3 2024 reporting',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      details: {
        missingFields: 3,
        completeness: 85,
        expectedDate: '2024-08-20',
        source: 'SEC Filings'
      }
    },
    {
      id: 'alert-005',
      entityName: 'Portfolio Model',
      severity: 'medium',
      type: 'model-drift',
      message: 'Model performance drift detected in technology sector',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      details: {
        driftScore: 0.15,
        affectedEntities: 12,
        sector: 'Technology',
        recommendation: 'Retrain model'
      }
    }
  ];

  // Mock data for model performance
  const modelPerformanceData = {
    status: 'good',
    accuracy: 0.924,
    precision: 0.918,
    recall: 0.931,
    f1Score: 0.924,
    version: 'v2.3.1',
    lastTraining: '2024-08-15T10:30:00Z',
    dataFreshness: '2m ago',
    predictionsToday: 1247,
    driftStatus: 'minor',
    performanceTrend: [
      { day: 1, accuracy: 0.928 },
      { day: 2, accuracy: 0.925 },
      { day: 3, accuracy: 0.922 },
      { day: 4, accuracy: 0.926 },
      { day: 5, accuracy: 0.923 },
      { day: 6, accuracy: 0.921 },
      { day: 7, accuracy: 0.924 }
    ]
  };

  // Mock data for data sources
  const dataSourcesData = [
    {
      id: 'yahoo-finance',
      name: 'Yahoo Finance API',
      type: 'financial',
      status: 'connected',
      lastSync: new Date(Date.now() - 120000), // 2 minutes ago
      recordCount: 15420,
      latency: 145
    },
    {
      id: 'news-api',
      name: 'News Intelligence',
      type: 'news',
      status: 'syncing',
      lastSync: new Date(Date.now() - 300000), // 5 minutes ago
      recordCount: 8932,
      latency: 89
    },
    {
      id: 'sec-filings',
      name: 'SEC Filings',
      type: 'regulatory',
      status: 'warning',
      lastSync: new Date(Date.now() - 1800000), // 30 minutes ago
      recordCount: 2156,
      latency: 234
    },
    {
      id: 'market-data',
      name: 'Market Data Feed',
      type: 'market',
      status: 'connected',
      lastSync: new Date(Date.now() - 60000), // 1 minute ago
      recordCount: 45678,
      latency: 67
    },
    {
      id: 'social-sentiment',
      name: 'Social Sentiment',
      type: 'social',
      status: 'error',
      lastSync: new Date(Date.now() - 3600000), // 1 hour ago
      recordCount: 0,
      latency: 0
    }
  ];

  const handleEntitySelect = (entityIds) => {
    setSelectedEntities(entityIds);
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} for entities:`, selectedEntities);
    // Implement bulk action logic here
  };

  const handleAlertAction = (alertId, action) => {
    console.log(`Alert action: ${action} for alert: ${alertId}`);
    // Implement alert action logic here
  };

  const handleModelAction = (action) => {
    console.log(`Model action: ${action}`);
    // Implement model action logic here
  };

  const handleDataSourceRefresh = (sourceId, action = 'refresh') => {
    console.log(`Data source action: ${action} for source: ${sourceId}`);
    // Implement data source refresh logic here
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event?.target?.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuToggle={toggleMobileMenu} isMenuOpen={isMobileMenuOpen} />
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      </div>
      {/* Main Content */}
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
      }`}>
        <div className="h-[calc(100vh-4rem)]">
          {/* Desktop Layout */}
          <div className="hidden lg:flex h-full">
            {/* Left Panel - Entity List */}
            <div className="w-1/3 border-r border-border">
              <EntityListPanel
                entities={portfolioEntities}
                selectedEntities={selectedEntities}
                onEntitySelect={handleEntitySelect}
                onBulkAction={handleBulkAction}
              />
            </div>

            {/* Right Panel - Analytics */}
            <div className="flex-1 flex flex-col">
              <RiskAnalyticsPanel
                selectedEntities={selectedEntities}
                portfolioData={portfolioEntities}
              />
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden h-full">
            {/* Tab Navigation */}
            <div className="bg-surface border-b border-border">
              <div className="flex overflow-x-auto">
                {[
                  { id: 'entities', label: 'Entities', icon: 'Building2' },
                  { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
                  { id: 'alerts', label: 'Alerts', icon: 'Bell' },
                  { id: 'performance', label: 'Performance', icon: 'TrendingUp' }
                ]?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab?.id
                        ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-text-primary'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="h-[calc(100%-4rem)] overflow-hidden">
              {activeTab === 'entities' && (
                <EntityListPanel
                  entities={portfolioEntities}
                  selectedEntities={selectedEntities}
                  onEntitySelect={handleEntitySelect}
                  onBulkAction={handleBulkAction}
                />
              )}
              {activeTab === 'analytics' && (
                <RiskAnalyticsPanel
                  selectedEntities={selectedEntities}
                  portfolioData={portfolioEntities}
                />
              )}
              {activeTab === 'alerts' && (
                <div className="h-full overflow-y-auto p-4">
                  <AlertsPanel
                    alerts={alertsData}
                    onAlertAction={handleAlertAction}
                  />
                </div>
              )}
              {activeTab === 'performance' && (
                <div className="h-full overflow-y-auto p-4 space-y-6">
                  <ModelPerformanceCard
                    modelData={modelPerformanceData}
                    onViewDetails={handleModelAction}
                  />
                  <DataSourcesStatus
                    dataSources={dataSourcesData}
                    onRefreshSource={handleDataSourceRefresh}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Button for Mobile */}
        <div className="lg:hidden fixed bottom-6 right-6 z-50">
          <Button
            variant="default"
            size="icon"
            className="w-14 h-14 rounded-full shadow-lg"
            onClick={() => setActiveTab('alerts')}
          >
            <Icon name="Bell" size={20} />
            {alertsData?.filter(alert => alert?.severity === 'critical')?.length > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-error rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {alertsData?.filter(alert => alert?.severity === 'critical')?.length}
                </span>
              </div>
            )}
          </Button>
        </div>

        {/* Desktop Right Panel - Alerts and Performance */}
        <div className="hidden xl:block fixed top-16 right-0 w-80 h-[calc(100vh-4rem)] bg-surface border-l border-border overflow-y-auto">
          <div className="p-4 space-y-6">
            <AlertsPanel
              alerts={alertsData}
              onAlertAction={handleAlertAction}
            />
            <ModelPerformanceCard
              modelData={modelPerformanceData}
              onViewDetails={handleModelAction}
            />
            <DataSourcesStatus
              dataSources={dataSourcesData}
              onRefreshSource={handleDataSourceRefresh}
            />
          </div>
        </div>

        {/* Adjust main content for right panel on XL screens */}
        <style jsx>{`
          @media (min-width: 1280px) {
            main {
              padding-right: 20rem;
            }
          }
        `}</style>
      </main>
    </div>
  );
};

export default PortfolioRiskMonitoring;