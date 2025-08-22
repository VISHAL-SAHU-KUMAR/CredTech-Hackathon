import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataPipelineStatus = ({ pipelines, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'running': return 'text-accent';
      case 'completed': return 'text-success';
      case 'failed': return 'text-error';
      case 'queued': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running': return 'Play';
      case 'completed': return 'CheckCircle';
      case 'failed': return 'XCircle';
      case 'queued': return 'Clock';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">Data Pipeline Status</h2>
        <Button variant="outline" size="sm" iconName="RefreshCw" iconPosition="left">
          Refresh All
        </Button>
      </div>
      <div className="space-y-4">
        {pipelines?.map((pipeline) => (
          <div key={pipeline?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon name={pipeline?.icon} size={20} className="text-primary" />
                <div>
                  <h3 className="font-medium text-card-foreground">{pipeline?.name}</h3>
                  <p className="text-sm text-muted-foreground">{pipeline?.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Icon 
                  name={getStatusIcon(pipeline?.status)} 
                  size={16} 
                  className={getStatusColor(pipeline?.status)} 
                />
                <span className={`text-sm font-medium ${getStatusColor(pipeline?.status)}`}>
                  {pipeline?.status?.charAt(0)?.toUpperCase() + pipeline?.status?.slice(1)}
                </span>
              </div>
            </div>

            {pipeline?.status === 'running' && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Progress</span>
                  <span className="text-sm font-medium text-card-foreground">{pipeline?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${pipeline?.progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Started</p>
                <p className="text-sm font-medium text-card-foreground">{pipeline?.startTime}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Duration</p>
                <p className="text-sm font-medium text-card-foreground">{pipeline?.duration}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Records</p>
                <p className="text-sm font-medium text-card-foreground">{pipeline?.recordsProcessed?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                <p className="text-sm font-medium text-card-foreground">{pipeline?.successRate}%</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="text-xs text-muted-foreground">
                Next run: {pipeline?.nextRun}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(pipeline?.id)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  View Details
                </Button>
                {pipeline?.status === 'failed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Retry
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataPipelineStatus;