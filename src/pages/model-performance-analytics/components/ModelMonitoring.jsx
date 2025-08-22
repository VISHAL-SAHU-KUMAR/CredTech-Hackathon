import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModelMonitoring = () => {
  const [alerts, setAlerts] = useState([]);
  const [monitoringStatus, setMonitoringStatus] = useState('active');

  const realTimeMetrics = [
    {
      id: 'latency',
      label: 'Response Latency',
      value: '145ms',
      threshold: '200ms',
      status: 'good',
      icon: 'Zap',
      trend: [142, 145, 143, 147, 145, 144, 145]
    },
    {
      id: 'throughput',
      label: 'Predictions/sec',
      value: '1,247',
      threshold: '1,000',
      status: 'excellent',
      icon: 'Activity',
      trend: [1200, 1220, 1235, 1240, 1247, 1245, 1247]
    },
    {
      id: 'drift',
      label: 'Data Drift Score',
      value: '0.12',
      threshold: '0.15',
      status: 'warning',
      icon: 'TrendingUp',
      trend: [0.08, 0.09, 0.10, 0.11, 0.12, 0.12, 0.12]
    },
    {
      id: 'accuracy',
      label: 'Live Accuracy',
      value: '94.1%',
      threshold: '92%',
      status: 'good',
      icon: 'Target',
      trend: [94.2, 94.1, 94.0, 94.1, 94.1, 94.0, 94.1]
    }
  ];

  const alertHistory = [
    {
      id: 'alert-001',
      type: 'warning',
      title: 'Data Drift Detected',
      message: 'Feature distribution shift detected in credit_utilization_ratio',
      timestamp: new Date(Date.now() - 300000),
      status: 'active',
      severity: 'medium'
    },
    {
      id: 'alert-002',
      type: 'info',
      title: 'Model Retrained Successfully',
      message: 'Model v2.1.3 deployed with improved accuracy metrics',
      timestamp: new Date(Date.now() - 3600000),
      status: 'resolved',
      severity: 'low'
    },
    {
      id: 'alert-003',
      type: 'error',
      title: 'Accuracy Degradation',
      message: 'Model accuracy dropped below 92% threshold for 15 minutes',
      timestamp: new Date(Date.now() - 7200000),
      status: 'resolved',
      severity: 'high'
    },
    {
      id: 'alert-004',
      type: 'warning',
      title: 'High Latency Detected',
      message: 'Response time exceeded 200ms threshold during peak hours',
      timestamp: new Date(Date.now() - 10800000),
      status: 'resolved',
      severity: 'medium'
    }
  ];

  const driftAnalysis = [
    { feature: 'credit_score', baseline: 0.85, current: 0.87, drift: 0.02, status: 'stable' },
    { feature: 'income_ratio', baseline: 0.72, current: 0.74, drift: 0.02, status: 'stable' },
    { feature: 'debt_to_income', baseline: 0.68, current: 0.71, drift: 0.03, status: 'stable' },
    { feature: 'credit_utilization', baseline: 0.91, current: 0.78, drift: 0.13, status: 'drift' },
    { feature: 'payment_history', baseline: 0.89, current: 0.88, drift: 0.01, status: 'stable' },
    { feature: 'account_age', baseline: 0.76, current: 0.73, drift: 0.03, status: 'stable' }
  ];

  const resourceUtilization = [
    { time: '14:00', cpu: 45, memory: 62, gpu: 78 },
    { time: '14:15', cpu: 48, memory: 64, gpu: 80 },
    { time: '14:30', cpu: 52, memory: 66, gpu: 82 },
    { time: '14:45', cpu: 49, memory: 63, gpu: 79 },
    { time: '15:00', cpu: 46, memory: 61, gpu: 77 },
    { time: '15:15', cpu: 44, memory: 59, gpu: 75 },
    { time: '15:30', cpu: 47, memory: 62, gpu: 78 },
    { time: '15:44', cpu: 45, memory: 60, gpu: 76 }
  ];

  useEffect(() => {
    // Simulate real-time alerts
    const interval = setInterval(() => {
      const activeAlerts = alertHistory?.filter(alert => alert?.status === 'active');
      setAlerts(activeAlerts);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success bg-success/10';
      case 'good': return 'text-accent bg-accent/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'error': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getDriftColor = (status) => {
    return status === 'drift' ? '#DC2626' : '#059669';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  return (
    <div className="space-y-6">
      {/* Real-time Status */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              monitoringStatus === 'active' ? 'bg-success status-pulse' : 'bg-error'
            }`}></div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Real-time Monitoring</h3>
              <p className="text-sm text-muted-foreground">Live model performance metrics</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
            <Button variant="outline" size="sm" iconName="Settings">
              Configure
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {realTimeMetrics?.map((metric) => (
            <div key={metric?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 rounded-lg ${getStatusColor(metric?.status)?.split(' ')?.[1]} flex items-center justify-center`}>
                  <Icon name={metric?.icon} size={16} className={getStatusColor(metric?.status)?.split(' ')?.[0]} />
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric?.status)}`}>
                  {metric?.status}
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xl font-bold text-card-foreground">{metric?.value}</p>
                <p className="text-xs text-muted-foreground">Threshold: {metric?.threshold}</p>
              </div>
              <div className="h-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric?.trend?.map((value, index) => ({ value, index }))}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={metric?.status === 'excellent' ? '#059669' : metric?.status === 'good' ? '#0EA5E9' : '#D97706'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Alerts and Resource Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Alerts */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Alert Center</h3>
              <p className="text-sm text-muted-foreground">Recent system notifications</p>
            </div>
            <Button variant="ghost" size="sm" iconName="Bell">
              View All
            </Button>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {alertHistory?.slice(0, 6)?.map((alert) => (
              <div key={alert?.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  alert?.type === 'error' ? 'bg-error/10' : 
                  alert?.type === 'warning' ? 'bg-warning/10' : 'bg-accent/10'
                }`}>
                  <Icon name={getAlertIcon(alert?.type)} size={16} className={getAlertColor(alert?.type)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium text-card-foreground truncate">{alert?.title}</h4>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(alert?.timestamp)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{alert?.message}</p>
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert?.status === 'active' ? 'text-warning bg-warning/10' : 'text-success bg-success/10'
                    }`}>
                      {alert?.status}
                    </span>
                    <span className={`text-xs font-medium ${
                      alert?.severity === 'high' ? 'text-error' : 
                      alert?.severity === 'medium' ? 'text-warning' : 'text-muted-foreground'
                    }`}>
                      {alert?.severity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resource Utilization */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Resource Utilization</h3>
              <p className="text-sm text-muted-foreground">System performance metrics</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Server" size={14} />
              <span>ml-prod-01</span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={resourceUtilization}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="time" stroke="#64748B" fontSize={12} />
                <YAxis domain={[0, 100]} stroke="#64748B" fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name?.toUpperCase()]}
                  labelStyle={{ color: '#0F172A' }}
                />
                <Line
                  type="monotone"
                  dataKey="cpu"
                  stroke="#059669"
                  strokeWidth={2}
                  name="cpu"
                  dot={{ fill: '#059669', strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="memory"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  name="memory"
                  dot={{ fill: '#0EA5E9', strokeWidth: 2, r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="gpu"
                  stroke="#D97706"
                  strokeWidth={2}
                  name="gpu"
                  dot={{ fill: '#D97706', strokeWidth: 2, r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Data Drift Analysis */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Data Drift Analysis</h3>
            <p className="text-sm text-muted-foreground">Feature distribution monitoring</p>
          </div>
          <Button variant="outline" size="sm" iconName="TrendingUp">
            Detailed Analysis
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {driftAnalysis?.map((feature) => (
              <div key={feature?.feature} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    feature?.status === 'drift' ? 'bg-error' : 'bg-success'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{feature?.feature}</p>
                    <p className="text-xs text-muted-foreground">
                      Baseline: {feature?.baseline} → Current: {feature?.current}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${
                    feature?.status === 'drift' ? 'text-error' : 'text-success'
                  }`}>
                    {feature?.drift > 0 ? '+' : ''}{feature?.drift}
                  </p>
                  <p className="text-xs text-muted-foreground">{feature?.status}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart data={driftAnalysis}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="baseline" 
                  name="Baseline"
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis 
                  dataKey="current" 
                  name="Current"
                  stroke="#64748B"
                  fontSize={12}
                />
                <Tooltip 
                  formatter={(value, name) => [value, name]}
                  labelFormatter={(label) => `Feature: ${label}`}
                />
                <Scatter dataKey="current" name="Distribution">
                  {driftAnalysis?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getDriftColor(entry?.status)} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelMonitoring;