import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

import Select from '../../../components/ui/Select';

const PerformanceAnalytics = ({ analyticsData }) => {
  const [timeRange, setTimeRange] = useState('24h');
  const [metricType, setMetricType] = useState('response-time');

  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' }
  ];

  const metricOptions = [
    { value: 'response-time', label: 'Response Time' },
    { value: 'success-rate', label: 'Success Rate' },
    { value: 'throughput', label: 'Throughput' },
    { value: 'error-rate', label: 'Error Rate' }
  ];

  const getCurrentData = () => {
    return analyticsData?.[timeRange]?.[metricType] || [];
  };

  const getMetricUnit = (metric) => {
    switch (metric) {
      case 'response-time': return 'ms';
      case 'success-rate': return '%';
      case 'throughput': return 'req/s';
      case 'error-rate': return '%';
      default: return '';
    }
  };

  const getMetricColor = (metric) => {
    switch (metric) {
      case 'response-time': return '#0EA5E9';
      case 'success-rate': return '#059669';
      case 'throughput': return '#1E3A8A';
      case 'error-rate': return '#DC2626';
      default: return '#64748B';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">Performance Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Select
            options={metricOptions}
            value={metricType}
            onChange={setMetricType}
            className="w-40"
          />
        </div>
      </div>
      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Clock" size={20} className="text-primary" />
            <span className="text-xs text-muted-foreground">AVG</span>
          </div>
          <p className="text-2xl font-bold text-primary">{analyticsData?.summary?.avgResponseTime}ms</p>
          <p className="text-sm text-muted-foreground">Response Time</p>
        </div>

        <div className="p-4 bg-success/10 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Icon name="CheckCircle" size={20} className="text-success" />
            <span className="text-xs text-muted-foreground">RATE</span>
          </div>
          <p className="text-2xl font-bold text-success">{analyticsData?.summary?.successRate}%</p>
          <p className="text-sm text-muted-foreground">Success Rate</p>
        </div>

        <div className="p-4 bg-accent/10 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Zap" size={20} className="text-accent" />
            <span className="text-xs text-muted-foreground">REQ/S</span>
          </div>
          <p className="text-2xl font-bold text-accent">{analyticsData?.summary?.throughput}</p>
          <p className="text-sm text-muted-foreground">Throughput</p>
        </div>

        <div className="p-4 bg-error/10 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <span className="text-xs text-muted-foreground">RATE</span>
          </div>
          <p className="text-2xl font-bold text-error">{analyticsData?.summary?.errorRate}%</p>
          <p className="text-sm text-muted-foreground">Error Rate</p>
        </div>
      </div>
      {/* Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-card-foreground mb-4">
          {metricOptions?.find(opt => opt?.value === metricType)?.label} Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={getCurrentData()}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="time" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                unit={getMetricUnit(metricType)}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={getMetricColor(metricType)}
                strokeWidth={2}
                dot={{ fill: getMetricColor(metricType), strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: getMetricColor(metricType), strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Source Performance Breakdown */}
      <div>
        <h3 className="text-sm font-semibold text-card-foreground mb-4">Performance by Source</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData?.sourceBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="source" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar 
                dataKey="responseTime" 
                fill="var(--color-primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;