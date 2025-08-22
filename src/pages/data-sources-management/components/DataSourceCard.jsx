import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataSourceCard = ({ source, onRefresh, onConfigure }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertTriangle';
      default: return 'Clock';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await onRefresh(source?.id);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${source?.type === 'financial' ? 'bg-primary/10' : source?.type === 'news' ? 'bg-accent/10' : 'bg-secondary/10'}`}>
            <Icon 
              name={source?.icon} 
              size={20} 
              className={source?.type === 'financial' ? 'text-primary' : source?.type === 'news' ? 'text-accent' : 'text-secondary'} 
            />
          </div>
          <div>
            <h3 className="font-semibold text-card-foreground">{source?.name}</h3>
            <p className="text-sm text-muted-foreground">{source?.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Icon 
            name={getStatusIcon(source?.status)} 
            size={16} 
            className={getStatusColor(source?.status)} 
          />
          <span className={`text-sm font-medium ${getStatusColor(source?.status)}`}>
            {source?.status?.charAt(0)?.toUpperCase() + source?.status?.slice(1)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Last Refresh</p>
          <p className="text-sm font-medium text-card-foreground">{source?.lastRefresh}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Data Quality</p>
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${source?.dataQuality >= 90 ? 'bg-success' : source?.dataQuality >= 70 ? 'bg-warning' : 'bg-error'}`}
                style={{ width: `${source?.dataQuality}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-card-foreground">{source?.dataQuality}%</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Records Today</p>
          <p className="text-sm font-medium text-card-foreground">{source?.recordsToday?.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Response Time</p>
          <p className="text-sm font-medium text-card-foreground">{source?.responseTime}ms</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          {source?.rateLimitUsed && (
            <div className="text-xs text-muted-foreground">
              Rate Limit: {source?.rateLimitUsed}/{source?.rateLimitTotal}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            loading={isRefreshing}
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onConfigure(source?.id)}
            iconName="Settings"
            iconPosition="left"
          >
            Configure
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataSourceCard;