import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsPanel = ({ alerts }) => {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'critical': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getAlertBg = (type) => {
    switch (type) {
      case 'critical': return 'bg-error/10 border-error/20';
      case 'warning': return 'bg-warning/10 border-warning/20';
      case 'info': return 'bg-accent/10 border-accent/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Alerts</h3>
        <Button variant="ghost" size="sm">
          <Icon name="Settings" size={16} />
        </Button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-4 rounded-lg border transition-smooth hover:shadow-sm ${getAlertBg(alert?.type)}`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={getAlertIcon(alert?.type)} 
                size={16} 
                className={`mt-0.5 ${getAlertColor(alert?.type)}`} 
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-text-primary truncate">
                    {alert?.entity}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {formatTime(alert?.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {alert?.message}
                </p>
                {alert?.scoreChange && (
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">Score:</span>
                    <span className={`text-xs font-medium ${
                      alert?.scoreChange > 0 ? 'text-success' : 'text-error'
                    }`}>
                      {alert?.oldScore} → {alert?.newScore}
                    </span>
                    <Icon 
                      name={alert?.scoreChange > 0 ? 'TrendingUp' : 'TrendingDown'} 
                      size={12} 
                      className={alert?.scoreChange > 0 ? 'text-success' : 'text-error'} 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" fullWidth>
          View All Alerts
        </Button>
      </div>
    </div>
  );
};

export default AlertsPanel;