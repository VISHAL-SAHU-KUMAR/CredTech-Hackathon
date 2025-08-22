import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MetricCard from './components/MetricCard';
import ScoreDistributionChart from './components/ScoreDistributionChart';
import TrendChart from './components/TrendChart';
import AlertsPanel from './components/AlertsPanel';
import FilterControls from './components/FilterControls';
import QuickActions from './components/QuickActions';
import RiskCategoryChart from './components/RiskCategoryChart';
import RecentScoreChanges from './components/RecentScoreChanges';

const CreditIntelligenceDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFiltersCollapsed, setIsFiltersCollapsed] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: '30d',
    industry: 'all',
    scoreRange: 'all',
    riskCategory: 'all'
  });

  // Mock data for metrics
  const metricsData = [
    {
      title: "Portfolio Health Score",
      value: "742",
      change: "+12",
      changeType: "positive",
      icon: "TrendingUp",
      trend: true,
      subtitle: "Average across all entities"
    },
    {
      title: "Total Entities",
      value: "1,247",
      change: "+23",
      changeType: "positive",
      icon: "Building",
      trend: true,
      subtitle: "Active assessments"
    },
    {
      title: "Critical Alerts",
      value: "8",
      change: "-3",
      changeType: "positive",
      icon: "AlertTriangle",
      trend: true,
      subtitle: "Requiring immediate attention"
    },
    {
      title: "Model Accuracy",
      value: "94.2%",
      change: "+0.8%",
      changeType: "positive",
      icon: "Target",
      trend: true,
      subtitle: "Current model performance"
    }
  ];

  // Mock data for score distribution
  const scoreDistributionData = [
    { range: "300-549", count: 89, minScore: 300 },
    { range: "550-649", count: 156, minScore: 550 },
    { range: "650-749", count: 423, minScore: 650 },
    { range: "750-850", count: 579, minScore: 750 }
  ];

  // Mock data for trend chart
  const trendData = [
    { date: "Jan 15", score: 728 },
    { date: "Jan 22", score: 735 },
    { date: "Jan 29", score: 731 },
    { date: "Feb 05", score: 738 },
    { date: "Feb 12", score: 742 },
    { date: "Feb 19", score: 745 },
    { date: "Feb 26", score: 742 }
  ];

  // Mock data for alerts
  const alertsData = [
    {
      id: 1,
      entity: "TechCorp Industries",
      type: "critical",
      message: "Credit score dropped below threshold",
      timestamp: new Date(Date.now() - 300000),
      scoreChange: -45,
      oldScore: 720,
      newScore: 675
    },
    {
      id: 2,
      entity: "Global Manufacturing Ltd",
      type: "warning",
      message: "Negative news sentiment detected",
      timestamp: new Date(Date.now() - 900000),
      scoreChange: null,
      oldScore: null,
      newScore: null
    },
    {
      id: 3,
      entity: "RetailMax Corporation",
      type: "info",
      message: "New financial data available",
      timestamp: new Date(Date.now() - 1800000),
      scoreChange: 12,
      oldScore: 698,
      newScore: 710
    },
    {
      id: 4,
      entity: "HealthTech Solutions",
      type: "warning",
      message: "Payment delay reported",
      timestamp: new Date(Date.now() - 3600000),
      scoreChange: -8,
      oldScore: 755,
      newScore: 747
    }
  ];

  // Mock data for risk categories
  const riskCategoryData = [
    { name: "Low", value: 579 },
    { name: "Medium", value: 423 },
    { name: "High", value: 156 },
    { name: "Critical", value: 89 }
  ];

  // Mock data for recent score changes
  const recentChangesData = [
    {
      id: 1,
      entityName: "TechCorp Industries",
      industry: "Technology",
      newScore: 675,
      change: -45,
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: 2,
      entityName: "RetailMax Corporation",
      industry: "Retail",
      newScore: 710,
      change: 12,
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 3,
      entityName: "HealthTech Solutions",
      industry: "Healthcare",
      newScore: 747,
      change: -8,
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: 4,
      entityName: "Energy Dynamics Inc",
      industry: "Energy",
      newScore: 782,
      change: 23,
      timestamp: new Date(Date.now() - 7200000)
    },
    {
      id: 5,
      entityName: "Financial Services Co",
      industry: "Finance",
      newScore: 695,
      change: -15,
      timestamp: new Date(Date.now() - 10800000)
    }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters updated:', newFilters);
    // Apply filters to data here
  };

  const handleFiltersToggle = () => {
    setIsFiltersCollapsed(!isFiltersCollapsed);
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      console.log('Real-time data update simulated');
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={handleMobileMenuToggle}
        isMenuOpen={isMobileMenuOpen}
      />
      <Sidebar 
        isCollapsed={isSidebarCollapsed}
        onToggle={handleSidebarToggle}
      />
      <main className={`pt-16 transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              Credit Intelligence Dashboard
            </h1>
            <p className="text-muted-foreground">
              Monitor real-time credit scores, trends, and risk indicators across your portfolio
            </p>
          </div>

          {/* Filter Controls */}
          <FilterControls
            onFiltersChange={handleFiltersChange}
            isCollapsed={isFiltersCollapsed}
            onToggleCollapse={handleFiltersToggle}
          />

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                trend={metric?.trend}
                subtitle={metric?.subtitle}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Charts */}
            <div className="lg:col-span-2 space-y-6">
              <TrendChart
                data={trendData}
                title="Portfolio Score Trend"
                dataKey="score"
                color="#0EA5E9"
              />
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ScoreDistributionChart data={scoreDistributionData} />
                <RiskCategoryChart data={riskCategoryData} />
              </div>
            </div>

            {/* Right Column - Panels */}
            <div className="space-y-6">
              <AlertsPanel alerts={alertsData} />
              <QuickActions />
            </div>
          </div>

          {/* Recent Score Changes */}
          <div className="mb-8">
            <RecentScoreChanges changes={recentChangesData} />
          </div>

          {/* Status Bar */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
                  <span className="text-success font-medium">System Online</span>
                </div>
                <div className="text-muted-foreground">
                  Last updated: {new Date()?.toLocaleTimeString()}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-muted-foreground">
                  Data sources: 5/5 connected
                </span>
                <span className="text-muted-foreground">
                  Model version: v2.1.3
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreditIntelligenceDashboard;