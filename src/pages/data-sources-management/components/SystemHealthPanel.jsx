import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealthPanel = ({ healthData }) => {
  const getHealthColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getHealthBgColor = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 70) return 'bg-warning/10';
    return 'bg-error/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">System Health</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
          <span className="text-sm font-medium text-success">Operational</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className={`p-4 rounded-lg ${getHealthBgColor(healthData?.overallHealth)}`}>
          <div className="flex items-center justify-between mb-2">
            <Icon name="Activity" size={20} className={getHealthColor(healthData?.overallHealth)} />
            <span className={`text-2xl font-bold ${getHealthColor(healthData?.overallHealth)}`}>
              {healthData?.overallHealth}%
            </span>
          </div>
          <p className="text-sm font-medium text-card-foreground">Overall Health</p>
          <p className="text-xs text-muted-foreground">System performance score</p>
        </div>

        <div className="p-4 rounded-lg bg-primary/10">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Database" size={20} className="text-primary" />
            <span className="text-2xl font-bold text-primary">{healthData?.activeSources}</span>
          </div>
          <p className="text-sm font-medium text-card-foreground">Active Sources</p>
          <p className="text-xs text-muted-foreground">Connected data feeds</p>
        </div>

        <div className="p-4 rounded-lg bg-accent/10">
          <div className="flex items-center justify-between mb-2">
            <Icon name="Zap" size={20} className="text-accent" />
            <span className="text-2xl font-bold text-accent">{healthData?.avgResponseTime}ms</span>
          </div>
          <p className="text-sm font-medium text-card-foreground">Avg Response</p>
          <p className="text-xs text-muted-foreground">API response time</p>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-card-foreground">Recent Activity</h3>
        <div className="space-y-3">
          {healthData?.recentActivity?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
              <Icon 
                name={activity?.type === 'success' ? 'CheckCircle' : activity?.type === 'warning' ? 'AlertTriangle' : 'XCircle'} 
                size={16} 
                className={activity?.type === 'success' ? 'text-success' : activity?.type === 'warning' ? 'text-warning' : 'text-error'} 
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-card-foreground">{activity?.message}</p>
                <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemHealthPanel;