import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModelPerformanceCard = ({ modelData, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'optimal': return 'text-success';
      case 'good': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'optimal': return 'CheckCircle';
      case 'good': return 'CheckCircle';
      case 'warning': return 'AlertTriangle';
      case 'critical': return 'AlertCircle';
      default: return 'Circle';
    }
  };

  const formatPercentage = (value) => `${(value * 100)?.toFixed(1)}%`;

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Model Performance</h3>
          <p className="text-sm text-muted-foreground">Real-time monitoring & metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`flex items-center space-x-1 ${getStatusColor(modelData?.status)}`}>
            <Icon name={getStatusIcon(modelData?.status)} size={16} />
            <span className="text-sm font-medium capitalize">{modelData?.status}</span>
          </div>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">
            {formatPercentage(modelData?.accuracy)}
          </div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">
            {formatPercentage(modelData?.precision)}
          </div>
          <div className="text-xs text-muted-foreground">Precision</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">
            {formatPercentage(modelData?.recall)}
          </div>
          <div className="text-xs text-muted-foreground">Recall</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-text-primary">
            {modelData?.f1Score?.toFixed(3)}
          </div>
          <div className="text-xs text-muted-foreground">F1 Score</div>
        </div>
      </div>
      {/* Performance Trend */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">7-Day Performance Trend</h4>
        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={modelData?.performanceTrend}>
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={false}
              />
              <Tooltip 
                formatter={(value) => [formatPercentage(value), 'Accuracy']}
                labelFormatter={(label) => `Day ${label}`}
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Model Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Model Version</span>
          <span className="text-sm font-medium text-text-primary">{modelData?.version}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Last Training</span>
          <span className="text-sm font-medium text-text-primary">
            {new Date(modelData.lastTraining)?.toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Data Freshness</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
            <span className="text-sm font-medium text-success">
              {modelData?.dataFreshness}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Predictions Today</span>
          <span className="text-sm font-medium text-text-primary">
            {modelData?.predictionsToday?.toLocaleString()}
          </span>
        </div>
      </div>
      {/* Drift Detection */}
      <div className="bg-muted/50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">Model Drift Detection</span>
          <div className={`flex items-center space-x-1 ${
            modelData?.driftStatus === 'stable' ? 'text-success' : 
            modelData?.driftStatus === 'minor' ? 'text-warning' : 'text-error'
          }`}>
            <Icon name={
              modelData?.driftStatus === 'stable' ? 'CheckCircle' : 
              modelData?.driftStatus === 'minor' ? 'AlertTriangle' : 'AlertCircle'
            } size={14} />
            <span className="text-xs font-medium capitalize">{modelData?.driftStatus}</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          {modelData?.driftStatus === 'stable' && 'Model performance is stable with no significant drift detected.'}
          {modelData?.driftStatus === 'minor' && 'Minor drift detected. Consider retraining within 30 days.'}
          {modelData?.driftStatus === 'significant' && 'Significant drift detected. Immediate retraining recommended.'}
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails('performance')}
          className="flex-1"
        >
          <Icon name="BarChart3" size={14} className="mr-1" />
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails('retrain')}
          className="flex-1"
        >
          <Icon name="RefreshCw" size={14} className="mr-1" />
          Retrain Model
        </Button>
      </div>
    </div>
  );
};

export default ModelPerformanceCard;