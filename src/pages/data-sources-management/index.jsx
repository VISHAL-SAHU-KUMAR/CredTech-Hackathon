import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import DataSourceCard from './components/DataSourceCard';
import SystemHealthPanel from './components/SystemHealthPanel';
import DataPipelineStatus from './components/DataPipelineStatus';
import ErrorLogsPanel from './components/ErrorLogsPanel';
import DataLineageVisualization from './components/DataLineageVisualization';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DataSourcesManagement = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for data sources
  const dataSources = [
    {
      id: 'yahoo-finance',
      name: 'Yahoo Finance API',
      description: 'Real-time financial market data and company information',
      type: 'financial',
      icon: 'TrendingUp',
      status: 'connected',
      lastRefresh: '2 minutes ago',
      dataQuality: 95,
      recordsToday: 45678,
      responseTime: 245,
      rateLimitUsed: 1250,
      rateLimitTotal: 5000
    },
    {
      id: 'mca-filings',
      name: 'MCA Filings Database',
      description: 'Ministry of Corporate Affairs regulatory filings',
      type: 'financial',
      icon: 'FileText',
      status: 'connected',
      lastRefresh: '15 minutes ago',
      dataQuality: 88,
      recordsToday: 12345,
      responseTime: 1200,
      rateLimitUsed: null,
      rateLimitTotal: null
    },
    {
      id: 'news-feeds',
      name: 'Financial News Aggregator',
      description: 'Real-time news feeds for sentiment analysis',
      type: 'news',
      icon: 'Newspaper',
      status: 'warning',
      lastRefresh: '1 hour ago',
      dataQuality: 72,
      recordsToday: 8901,
      responseTime: 850,
      rateLimitUsed: 890,
      rateLimitTotal: 1000
    },
    {
      id: 'internal-db',
      name: 'Internal Credit Database',
      description: 'Historical credit scores and customer data',
      type: 'internal',
      icon: 'Database',
      status: 'connected',
      lastRefresh: '5 minutes ago',
      dataQuality: 98,
      recordsToday: 23456,
      responseTime: 120,
      rateLimitUsed: null,
      rateLimitTotal: null
    },
    {
      id: 'external-ratings',
      name: 'External Rating Agencies',
      description: 'Third-party credit ratings and assessments',
      type: 'financial',
      icon: 'Star',
      status: 'error',
      lastRefresh: '3 hours ago',
      dataQuality: 45,
      recordsToday: 0,
      responseTime: 0,
      rateLimitUsed: 0,
      rateLimitTotal: 500
    },
    {
      id: 'social-sentiment',
      name: 'Social Media Sentiment',
      description: 'Social media monitoring for brand sentiment',
      type: 'news',
      icon: 'MessageCircle',
      status: 'connected',
      lastRefresh: '30 minutes ago',
      dataQuality: 81,
      recordsToday: 15678,
      responseTime: 650,
      rateLimitUsed: 450,
      rateLimitTotal: 2000
    }
  ];

  // Mock system health data
  const systemHealthData = {
    overallHealth: 87,
    activeSources: 5,
    avgResponseTime: 510,
    recentActivity: [
      {
        type: 'success',
        message: 'Yahoo Finance API connection restored',
        timestamp: '2 minutes ago'
      },
      {
        type: 'warning',
        message: 'News feeds experiencing high latency',
        timestamp: '1 hour ago'
      },
      {
        type: 'error',
        message: 'External ratings API connection failed',
        timestamp: '3 hours ago'
      },
      {
        type: 'success',
        message: 'Internal database backup completed',
        timestamp: '6 hours ago'
      }
    ]
  };

  // Mock pipeline data
  const pipelineData = [
    {
      id: 'credit-scoring-pipeline',
      name: 'Credit Scoring Pipeline',
      description: 'Real-time credit score calculation and updates',
      icon: 'Calculator',
      status: 'running',
      progress: 75,
      startTime: '14:30 PM',
      duration: '25 min',
      recordsProcessed: 12450,
      successRate: 98.5,
      nextRun: 'In 35 minutes'
    },
    {
      id: 'data-ingestion-pipeline',
      name: 'Data Ingestion Pipeline',
      description: 'Automated data collection from external sources',
      icon: 'Download',
      status: 'completed',
      progress: 100,
      startTime: '14:00 PM',
      duration: '45 min',
      recordsProcessed: 67890,
      successRate: 99.2,
      nextRun: 'In 15 minutes'
    },
    {
      id: 'model-training-pipeline',
      name: 'Model Training Pipeline',
      description: 'ML model retraining with latest data',
      icon: 'Brain',
      status: 'queued',
      progress: 0,
      startTime: 'Pending',
      duration: 'N/A',
      recordsProcessed: 0,
      successRate: 0,
      nextRun: 'In 2 hours'
    },
    {
      id: 'data-validation-pipeline',
      name: 'Data Validation Pipeline',
      description: 'Quality checks and data validation processes',
      icon: 'CheckCircle',
      status: 'failed',
      progress: 45,
      startTime: '13:45 PM',
      duration: '15 min',
      recordsProcessed: 5678,
      successRate: 67.8,
      nextRun: 'Manual restart required'
    }
  ];

  // Mock error logs
  const errorLogs = [
    {
      id: 'err-001',
      severity: 'critical',
      source: 'external-ratings',
      message: 'API authentication failed - invalid credentials',
      timestamp: '2025-01-22 12:15:30',
      details: 'HTTP 401: Unauthorized access to external ratings API endpoint',
      stackTrace: true
    },
    {
      id: 'err-002',
      severity: 'warning',
      source: 'news-feeds',
      message: 'Rate limit approaching threshold',
      timestamp: '2025-01-22 11:45:15',
      details: 'Current usage: 890/1000 requests per hour',
      stackTrace: false
    },
    {
      id: 'err-003',
      severity: 'error',
      source: 'yahoo-finance',
      message: 'Connection timeout during data fetch',
      timestamp: '2025-01-22 11:30:22',
      details: 'Timeout after 30 seconds while fetching market data',
      stackTrace: true
    },
    {
      id: 'err-004',
      severity: 'info',
      source: 'internal-db',
      message: 'Scheduled maintenance completed successfully',
      timestamp: '2025-01-22 10:00:00',
      details: 'Database optimization and index rebuilding completed',
      stackTrace: false
    },
    {
      id: 'err-005',
      severity: 'warning',
      source: 'mca-filings',
      message: 'Data quality below threshold',
      timestamp: '2025-01-22 09:15:45',
      details: 'Data quality score: 72% (threshold: 80%)',
      stackTrace: false
    }
  ];

  // Mock data lineage
  const dataLineageData = {
    stages: [
      {
        name: 'Data Sources',
        nodes: [
          {
            id: 'src-1',
            name: 'Yahoo Finance',
            type: 'source',
            records: 45678,
            lastUpdated: '2 min ago',
            status: 'Active',
            description: 'Real-time financial market data'
          },
          {
            id: 'src-2',
            name: 'MCA Filings',
            type: 'source',
            records: 12345,
            lastUpdated: '15 min ago',
            status: 'Active',
            description: 'Regulatory filing information'
          },
          {
            id: 'src-3',
            name: 'News Feeds',
            type: 'source',
            records: 8901,
            lastUpdated: '1 hour ago',
            status: 'Warning',
            description: 'Financial news and sentiment data'
          }
        ]
      },
      {
        name: 'Data Processing',
        nodes: [
          {
            id: 'proc-1',
            name: 'Data Cleansing',
            type: 'processing',
            records: 66924,
            lastUpdated: '5 min ago',
            status: 'Active',
            description: 'Data validation and cleaning processes'
          },
          {
            id: 'proc-2',
            name: 'Feature Engineering',
            type: 'processing',
            records: 66924,
            lastUpdated: '8 min ago',
            status: 'Active',
            description: 'Feature extraction and transformation'
          }
        ]
      },
      {
        name: 'Data Storage',
        nodes: [
          {
            id: 'store-1',
            name: 'Data Warehouse',
            type: 'storage',
            records: 66924,
            lastUpdated: '10 min ago',
            status: 'Active',
            description: 'Centralized data storage'
          }
        ]
      },
      {
        name: 'Output',
        nodes: [
          {
            id: 'out-1',
            name: 'Credit Scores',
            type: 'output',
            records: 66924,
            lastUpdated: '12 min ago',
            status: 'Active',
            description: 'Final credit assessment results'
          }
        ]
      }
    ]
  };

  // Mock performance analytics data
  const performanceAnalyticsData = {
    summary: {
      avgResponseTime: 510,
      successRate: 96.8,
      throughput: 125,
      errorRate: 3.2
    },
    '24h': {
      'response-time': [
        { time: '00:00', value: 450 },
        { time: '04:00', value: 380 },
        { time: '08:00', value: 520 },
        { time: '12:00', value: 680 },
        { time: '16:00', value: 590 },
        { time: '20:00', value: 510 }
      ],
      'success-rate': [
        { time: '00:00', value: 98.5 },
        { time: '04:00', value: 99.2 },
        { time: '08:00', value: 96.8 },
        { time: '12:00', value: 94.5 },
        { time: '16:00', value: 97.1 },
        { time: '20:00', value: 96.8 }
      ],
      'throughput': [
        { time: '00:00', value: 85 },
        { time: '04:00', value: 45 },
        { time: '08:00', value: 125 },
        { time: '12:00', value: 180 },
        { time: '16:00', value: 150 },
        { time: '20:00', value: 125 }
      ],
      'error-rate': [
        { time: '00:00', value: 1.5 },
        { time: '04:00', value: 0.8 },
        { time: '08:00', value: 3.2 },
        { time: '12:00', value: 5.5 },
        { time: '16:00', value: 2.9 },
        { time: '20:00', value: 3.2 }
      ]
    },
    sourceBreakdown: [
      { source: 'Yahoo Finance', responseTime: 245 },
      { source: 'MCA Filings', responseTime: 1200 },
      { source: 'News Feeds', responseTime: 850 },
      { source: 'Internal DB', responseTime: 120 },
      { source: 'Social Media', responseTime: 650 }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'sources', label: 'Data Sources', icon: 'Database' },
    { id: 'pipelines', label: 'Pipelines', icon: 'GitBranch' },
    { id: 'lineage', label: 'Data Lineage', icon: 'Workflow' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'logs', label: 'Error Logs', icon: 'AlertTriangle' }
  ];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleDataSourceRefresh = async (sourceId) => {
    console.log(`Refreshing data source: ${sourceId}`);
    // Simulate API call
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleDataSourceConfigure = (sourceId) => {
    console.log(`Configuring data source: ${sourceId}`);
  };

  const handlePipelineDetails = (pipelineId) => {
    console.log(`Viewing pipeline details: ${pipelineId}`);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Data Sources Management - CreditLens Pro</title>
        <meta name="description" content="Monitor, configure, and maintain external data integrations for credit assessment accuracy" />
      </Helmet>
      <Header onMenuToggle={handleMobileMenuToggle} isMenuOpen={isMobileMenuOpen} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      <main className={`pt-16 transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-text-primary">Data Sources Management</h1>
                <p className="text-text-secondary mt-2">
                  Monitor, configure, and maintain external data integrations for accurate credit assessment
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="RefreshCw" iconPosition="left">
                  Refresh All
                </Button>
                <Button variant="default" iconName="Plus" iconPosition="left">
                  Add Source
                </Button>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-muted-foreground'
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
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  <div className="xl:col-span-2">
                    <SystemHealthPanel healthData={systemHealthData} />
                  </div>
                  <div>
                    <PerformanceAnalytics analyticsData={performanceAnalyticsData} />
                  </div>
                </div>
                <DataPipelineStatus 
                  pipelines={pipelineData} 
                  onViewDetails={handlePipelineDetails} 
                />
              </>
            )}

            {activeTab === 'sources' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {dataSources?.map((source) => (
                  <DataSourceCard
                    key={source?.id}
                    source={source}
                    onRefresh={handleDataSourceRefresh}
                    onConfigure={handleDataSourceConfigure}
                  />
                ))}
              </div>
            )}

            {activeTab === 'pipelines' && (
              <DataPipelineStatus 
                pipelines={pipelineData} 
                onViewDetails={handlePipelineDetails} 
              />
            )}

            {activeTab === 'lineage' && (
              <DataLineageVisualization lineageData={dataLineageData} />
            )}

            {activeTab === 'analytics' && (
              <PerformanceAnalytics analyticsData={performanceAnalyticsData} />
            )}

            {activeTab === 'logs' && (
              <ErrorLogsPanel logs={errorLogs} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataSourcesManagement;