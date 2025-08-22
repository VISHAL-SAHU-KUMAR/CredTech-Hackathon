import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataSourcesStatus = ({ dataSources, onRefreshSource }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'text-success';
      case 'syncing': return 'text-accent';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'disconnected': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return 'CheckCircle';
      case 'syncing': return 'RefreshCw';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'AlertCircle';
      case 'disconnected': return 'XCircle';
      default: return 'Circle';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected': return 'bg-success/10 text-success border-success/20';
      case 'syncing': return 'bg-accent/10 text-accent border-accent/20';
      case 'warning': return 'bg-warning/10 text-warning border-warning/20';
      case 'error': return 'bg-error/10 text-error border-error/20';
      case 'disconnected': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const formatLastSync = (timestamp) => {
    const now = new Date();
    const syncTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - syncTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getDataTypeIcon = (type) => {
    switch (type) {
      case 'financial': return 'DollarSign';
      case 'news': return 'Newspaper';
      case 'market': return 'TrendingUp';
      case 'regulatory': return 'Shield';
      case 'social': return 'Users';
      default: return 'Database';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Data Sources</h3>
          <p className="text-sm text-muted-foreground">Real-time connection status</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRefreshSource('all')}
        >
          <Icon name="RefreshCw" size={14} className="mr-1" />
          Refresh All
        </Button>
      </div>
      {/* Status Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-success">
            {dataSources?.filter(ds => ds?.status === 'connected')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Connected</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            {dataSources?.filter(ds => ds?.status === 'syncing')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Syncing</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-warning">
            {dataSources?.filter(ds => ds?.status === 'warning')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Warning</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-error">
            {dataSources?.filter(ds => ds?.status === 'error')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Error</div>
        </div>
      </div>
      {/* Data Sources List */}
      <div className="space-y-3">
        {dataSources?.map((source) => (
          <div
            key={source?.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border"
          >
            <div className="flex items-center space-x-3">
              {/* Data Type Icon */}
              <div className="p-2 bg-accent/10 rounded-lg">
                <Icon name={getDataTypeIcon(source?.type)} size={16} className="text-accent" />
              </div>

              {/* Source Info */}
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-text-primary">{source?.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(source?.status)}`}>
                    {source?.status?.charAt(0)?.toUpperCase() + source?.status?.slice(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Last sync: {formatLastSync(source?.lastSync)}</span>
                  <span>Records: {source?.recordCount?.toLocaleString()}</span>
                  <span>Latency: {source?.latency}ms</span>
                </div>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="flex items-center space-x-3">
              {/* Status Indicator */}
              <div className={`flex items-center space-x-1 ${getStatusColor(source?.status)}`}>
                <Icon 
                  name={getStatusIcon(source?.status)} 
                  size={16} 
                  className={source?.status === 'syncing' ? 'animate-spin' : ''}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRefreshSource(source?.id)}
                  disabled={source?.status === 'syncing'}
                >
                  <Icon name="RefreshCw" size={12} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRefreshSource(source?.id, 'configure')}
                >
                  <Icon name="Settings" size={12} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Data Quality Indicators */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-medium text-text-primary mb-3">Data Quality Metrics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-success">98.5%</div>
            <div className="text-xs text-muted-foreground">Completeness</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-success">99.2%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-warning">94.8%</div>
            <div className="text-xs text-muted-foreground">Timeliness</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSourcesStatus;