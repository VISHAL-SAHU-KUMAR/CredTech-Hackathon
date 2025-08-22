import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentScoreChanges = ({ changes }) => {
  const formatTime = (timestamp) => {
    const now = new Date();
    const changeTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - changeTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  const getScoreColor = (score) => {
    if (score >= 750) return 'text-success';
    if (score >= 650) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Score Changes</h3>
        <Button variant="ghost" size="sm">
          <Icon name="ExternalLink" size={16} />
        </Button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {changes?.map((change) => (
          <div
            key={change?.id}
            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Building" size={16} className="text-primary" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-text-primary truncate">
                  {change?.entityName}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {change?.industry} • {formatTime(change?.timestamp)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getScoreColor(change?.newScore)}`}>
                    {change?.newScore}
                  </span>
                  <Icon 
                    name={getChangeIcon(change?.change)} 
                    size={14} 
                    className={getChangeColor(change?.change)} 
                  />
                </div>
                <div className={`text-xs ${getChangeColor(change?.change)}`}>
                  {change?.change > 0 ? '+' : ''}{change?.change} pts
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Icon name="ChevronRight" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button variant="outline" size="sm" fullWidth>
          View All Changes
        </Button>
      </div>
    </div>
  );
};

export default RecentScoreChanges;