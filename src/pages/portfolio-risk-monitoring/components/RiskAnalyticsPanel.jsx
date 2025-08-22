import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, ScatterChart, Scatter } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RiskAnalyticsPanel = ({ selectedEntities, portfolioData }) => {
  const [activeView, setActiveView] = useState('distribution');
  const [timeRange, setTimeRange] = useState('30d');

  const viewOptions = [
    { value: 'distribution', label: 'Risk Distribution' },
    { value: 'correlation', label: 'Correlation Matrix' },
    { value: 'timeline', label: 'Score Timeline' },
    { value: 'scatter', label: 'Risk vs Return' }
  ];

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  // Mock data for risk distribution
  const riskDistributionData = [
    { name: 'Low Risk', value: 45, count: 18, color: '#059669' },
    { name: 'Medium Risk', value: 35, count: 14, color: '#D97706' },
    { name: 'High Risk', value: 15, count: 6, color: '#DC2626' },
    { name: 'Critical Risk', value: 5, count: 2, color: '#7C2D12' }
  ];

  // Mock data for score timeline
  const timelineData = [
    { date: '2024-07-23', avgScore: 720, entities: 40 },
    { date: '2024-07-30', avgScore: 718, entities: 40 },
    { date: '2024-08-06', avgScore: 715, entities: 40 },
    { date: '2024-08-13', avgScore: 722, entities: 40 },
    { date: '2024-08-20', avgScore: 719, entities: 40 },
    { date: '2024-08-22', avgScore: 716, entities: 40 }
  ];

  // Mock data for correlation matrix
  const correlationData = [
    { sector: 'Technology', tech: 1.0, healthcare: 0.3, finance: 0.5, manufacturing: 0.2, retail: 0.4 },
    { sector: 'Healthcare', tech: 0.3, healthcare: 1.0, finance: 0.2, manufacturing: 0.1, retail: 0.3 },
    { sector: 'Finance', tech: 0.5, healthcare: 0.2, finance: 1.0, manufacturing: 0.4, retail: 0.6 },
    { sector: 'Manufacturing', tech: 0.2, healthcare: 0.1, finance: 0.4, manufacturing: 1.0, retail: 0.3 },
    { sector: 'Retail', tech: 0.4, healthcare: 0.3, finance: 0.6, manufacturing: 0.3, retail: 1.0 }
  ];

  // Mock data for risk vs return scatter
  const scatterData = [
    { risk: 2.1, return: 8.5, name: 'TechCorp Inc', size: 120 },
    { risk: 3.2, return: 12.3, name: 'HealthPlus Ltd', size: 85 },
    { risk: 1.8, return: 6.2, name: 'SafeBank Corp', size: 200 },
    { risk: 4.1, return: 15.8, name: 'GrowthCo', size: 60 },
    { risk: 2.8, return: 9.7, name: 'StableFirm', size: 150 },
    { risk: 5.2, return: 18.9, name: 'RiskyCorp', size: 40 },
    { risk: 1.5, return: 4.8, name: 'ConservativeCo', size: 180 },
    { risk: 3.8, return: 14.2, name: 'MidRiskInc', size: 90 }
  ];

  const renderDistributionView = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Risk Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {riskDistributionData?.map((item) => (
              <div key={item?.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item?.color }}></div>
                  <span className="text-sm text-text-secondary">{item?.name}</span>
                </div>
                <div className="text-sm font-medium text-text-primary">
                  {item?.count} entities ({item?.value}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Risk Categories</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={riskDistributionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-text-secondary)"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="var(--color-text-secondary)" fontSize={12} />
                <Tooltip 
                  formatter={(value) => [value, 'Count']}
                  labelStyle={{ color: 'var(--color-text-primary)' }}
                  contentStyle={{ 
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="count" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimelineView = () => (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Portfolio Score Timeline</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickFormatter={(value) => new Date(value)?.toLocaleDateString()}
            />
            <YAxis 
              stroke="var(--color-text-secondary)" 
              fontSize={12}
              domain={['dataMin - 10', 'dataMax + 10']}
            />
            <Tooltip 
              formatter={(value) => [value, 'Average Score']}
              labelFormatter={(value) => new Date(value)?.toLocaleDateString()}
              labelStyle={{ color: 'var(--color-text-primary)' }}
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="avgScore" 
              stroke="var(--color-accent)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: 'var(--color-accent)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderCorrelationView = () => (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Sector Correlation Matrix</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2 text-sm font-medium text-text-secondary">Sector</th>
              <th className="text-center p-2 text-sm font-medium text-text-secondary">Tech</th>
              <th className="text-center p-2 text-sm font-medium text-text-secondary">Health</th>
              <th className="text-center p-2 text-sm font-medium text-text-secondary">Finance</th>
              <th className="text-center p-2 text-sm font-medium text-text-secondary">Mfg</th>
              <th className="text-center p-2 text-sm font-medium text-text-secondary">Retail</th>
            </tr>
          </thead>
          <tbody>
            {correlationData?.map((row) => (
              <tr key={row?.sector}>
                <td className="p-2 text-sm font-medium text-text-primary">{row?.sector}</td>
                <td className="p-2 text-center">
                  <div 
                    className="w-8 h-8 rounded mx-auto flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: `rgba(14, 165, 233, ${row?.tech})` }}
                  >
                    {row?.tech?.toFixed(1)}
                  </div>
                </td>
                <td className="p-2 text-center">
                  <div 
                    className="w-8 h-8 rounded mx-auto flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: `rgba(14, 165, 233, ${row?.healthcare})` }}
                  >
                    {row?.healthcare?.toFixed(1)}
                  </div>
                </td>
                <td className="p-2 text-center">
                  <div 
                    className="w-8 h-8 rounded mx-auto flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: `rgba(14, 165, 233, ${row?.finance})` }}
                  >
                    {row?.finance?.toFixed(1)}
                  </div>
                </td>
                <td className="p-2 text-center">
                  <div 
                    className="w-8 h-8 rounded mx-auto flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: `rgba(14, 165, 233, ${row?.manufacturing})` }}
                  >
                    {row?.manufacturing?.toFixed(1)}
                  </div>
                </td>
                <td className="p-2 text-center">
                  <div 
                    className="w-8 h-8 rounded mx-auto flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: `rgba(14, 165, 233, ${row?.retail})` }}
                  >
                    {row?.retail?.toFixed(1)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Correlation values range from 0 (no correlation) to 1 (perfect correlation). Darker colors indicate stronger correlations.
      </p>
    </div>
  );

  const renderScatterView = () => (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Risk vs Return Analysis</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={scatterData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              type="number" 
              dataKey="risk" 
              name="Risk Score"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              label={{ value: 'Risk Score', position: 'insideBottom', offset: -10 }}
            />
            <YAxis 
              type="number" 
              dataKey="return" 
              name="Expected Return"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              label={{ value: 'Expected Return (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              formatter={(value, name) => [
                name === 'risk' ? `${value}` : `${value}%`,
                name === 'risk' ? 'Risk Score' : 'Expected Return'
              ]}
              labelFormatter={(label, payload) => payload?.[0]?.payload?.name || ''}
              labelStyle={{ color: 'var(--color-text-primary)' }}
              contentStyle={{ 
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
            />
            <Scatter 
              dataKey="return" 
              fill="var(--color-accent)"
              fillOpacity={0.7}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        Each point represents an entity. Position shows risk-return profile, with higher returns typically associated with higher risk.
      </p>
    </div>
  );

  const renderCurrentView = () => {
    switch (activeView) {
      case 'distribution':
        return renderDistributionView();
      case 'correlation':
        return renderCorrelationView();
      case 'timeline':
        return renderTimelineView();
      case 'scatter':
        return renderScatterView();
      default:
        return renderDistributionView();
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Risk Analytics</h2>
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={16} className="text-success status-pulse" />
            <span className="text-sm text-success">Live Data</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Select
            placeholder="Select view"
            options={viewOptions}
            value={activeView}
            onChange={setActiveView}
            className="w-48"
          />
          <Select
            placeholder="Time range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Button variant="outline" size="sm">
            <Icon name="Download" size={14} className="mr-2" />
            Export
          </Button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {selectedEntities?.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">No Entities Selected</h3>
              <p className="text-muted-foreground">
                Select entities from the left panel to view detailed risk analytics
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Selected Entities</p>
                    <p className="text-2xl font-semibold text-text-primary">{selectedEntities?.length}</p>
                  </div>
                  <Icon name="Building2" size={24} className="text-accent" />
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Score</p>
                    <p className="text-2xl font-semibold text-text-primary">716</p>
                  </div>
                  <Icon name="TrendingUp" size={24} className="text-success" />
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">High Risk</p>
                    <p className="text-2xl font-semibold text-error">8</p>
                  </div>
                  <Icon name="AlertTriangle" size={24} className="text-error" />
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Alerts</p>
                    <p className="text-2xl font-semibold text-warning">12</p>
                  </div>
                  <Icon name="Bell" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            {/* Main Analytics */}
            {renderCurrentView()}
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskAnalyticsPanel;