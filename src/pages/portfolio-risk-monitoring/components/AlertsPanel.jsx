import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AlertsPanel = ({ alerts, onAlertAction }) => {
  const [filterSeverity, setFilterSeverity] = useState('');
  const [filterType, setFilterType] = useState('');
  const [sortBy, setSortBy] = useState('timestamp');

  const severityOptions = [
    { value: '', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'score-change', label: 'Score Change' },
    { value: 'threshold-breach', label: 'Threshold Breach' },
    { value: 'news-event', label: 'News Event' },
    { value: 'data-quality', label: 'Data Quality' },
    { value: 'model-drift', label: 'Model Drift' }
  ];

  const sortOptions = [
    { value: 'timestamp', label: 'Most Recent' },
    { value: 'severity', label: 'Severity' },
    { value: 'entity', label: 'Entity Name' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-success/10 text-success border-success/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertCircle';
      case 'high': return 'AlertTriangle';
      case 'medium': return 'Info';
      case 'low': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'score-change': return 'TrendingDown';
      case 'threshold-breach': return 'AlertTriangle';
      case 'news-event': return 'Newspaper';
      case 'data-quality': return 'Database';
      case 'model-drift': return 'Activity';
      default: return 'Bell';
    }
  };

  const filteredAlerts = alerts?.filter(alert => {
      const matchesSeverity = !filterSeverity || alert?.severity === filterSeverity;
      const matchesType = !filterType || alert?.type === filterType;
      return matchesSeverity && matchesType;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'severity':
          const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return severityOrder?.[b?.severity] - severityOrder?.[a?.severity];
        case 'entity':
          return a?.entityName?.localeCompare(b?.entityName);
        case 'timestamp':
        default:
          return new Date(b.timestamp) - new Date(a.timestamp);
      }
    });

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Real-time Alerts</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
            <span className="text-sm text-success">Live</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select
            placeholder="Severity"
            options={severityOptions}
            value={filterSeverity}
            onChange={setFilterSeverity}
            className="w-32"
          />
          <Select
            placeholder="Type"
            options={typeOptions}
            value={filterType}
            onChange={setFilterType}
            className="w-40"
          />
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            className="w-32"
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setFilterSeverity('');
              setFilterType('');
              setSortBy('timestamp');
            }}
          >
            <Icon name="X" size={14} className="mr-1" />
            Clear
          </Button>
        </div>
      </div>
      {/* Alerts List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No alerts found</p>
            <p className="text-xs text-muted-foreground mt-1">
              All systems are operating normally
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredAlerts?.map((alert) => (
              <div
                key={alert?.id}
                className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  {/* Severity Icon */}
                  <div className={`p-2 rounded-full ${getSeverityColor(alert?.severity)}`}>
                    <Icon name={getSeverityIcon(alert?.severity)} size={16} />
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert?.severity)}`}>
                          {alert?.severity?.toUpperCase()}
                        </span>
                        <Icon name={getTypeIcon(alert?.type)} size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {alert?.type?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(alert?.timestamp)}
                      </span>
                    </div>

                    <h4 className="font-medium text-text-primary mb-1">
                      {alert?.entityName}
                    </h4>
                    
                    <p className="text-sm text-text-secondary mb-2">
                      {alert?.message}
                    </p>

                    {/* Alert Details */}
                    {alert?.details && (
                      <div className="bg-muted/50 rounded p-2 mb-2">
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(alert?.details)?.map(([key, value]) => (
                            <div key={key}>
                              <span className="text-muted-foreground">
                                {key?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str?.toUpperCase())}:
                              </span>
                              <span className="ml-1 font-medium text-text-primary">
                                {typeof value === 'number' ? value?.toLocaleString() : value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAlertAction(alert?.id, 'acknowledge')}
                      >
                        <Icon name="Check" size={12} className="mr-1" />
                        Acknowledge
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAlertAction(alert?.id, 'investigate')}
                      >
                        <Icon name="Search" size={12} className="mr-1" />
                        Investigate
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAlertAction(alert?.id, 'dismiss')}
                      >
                        <Icon name="X" size={12} className="mr-1" />
                        Dismiss
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      {filteredAlerts?.length > 0 && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Showing {filteredAlerts?.length} of {alerts?.length} alerts
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Settings" size={14} className="mr-1" />
                Configure
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Archive" size={14} className="mr-1" />
                Archive All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;