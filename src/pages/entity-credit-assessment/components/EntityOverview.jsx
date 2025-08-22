import React from 'react';

import Button from '../../../components/ui/Button';

const EntityOverview = ({ entity, onGenerateReport, onSetAlert }) => {
  const sparklineData = entity?.scoreHistory?.map((score, index) => ({
    x: index * 10,
    y: 50 - (score - 650) / 10
  }));

  const sparklinePath = sparklineData?.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point?.x} ${point?.y}`)?.join(' ');

  return (
    <div className="bg-card rounded-lg border border-border p-6 space-y-6">
      {/* Entity Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">{entity?.name}</h2>
            <p className="text-sm text-muted-foreground">{entity?.industry}</p>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            entity?.riskLevel === 'Low' ? 'bg-success/10 text-success' :
            entity?.riskLevel === 'Medium'? 'bg-warning/10 text-warning' : 'bg-error/10 text-error'
          }`}>
            {entity?.riskLevel} Risk
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Entity ID:</span>
            <p className="font-medium text-card-foreground">{entity?.id}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Founded:</span>
            <p className="font-medium text-card-foreground">{entity?.founded}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Revenue:</span>
            <p className="font-medium text-card-foreground">{entity?.revenue}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Employees:</span>
            <p className="font-medium text-card-foreground">{entity?.employees}</p>
          </div>
        </div>
      </div>
      {/* Credit Score Section */}
      <div className="space-y-4 border-t border-border pt-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Credit Score</h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              entity?.scoreChange > 0 ? 'bg-success' : 
              entity?.scoreChange < 0 ? 'bg-error' : 'bg-muted-foreground'
            }`}></div>
            <span className={`text-sm font-medium ${
              entity?.scoreChange > 0 ? 'text-success' : 
              entity?.scoreChange < 0 ? 'text-error' : 'text-muted-foreground'
            }`}>
              {entity?.scoreChange > 0 ? '+' : ''}{entity?.scoreChange}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold text-card-foreground">{entity?.currentScore}</span>
            <span className="text-sm text-muted-foreground">/ 850</span>
          </div>

          {/* Score Trend Sparkline */}
          <div className="relative">
            <div className="text-xs text-muted-foreground mb-2">30-day trend</div>
            <svg width="100%" height="60" className="border border-border rounded">
              <path
                d={sparklinePath}
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2"
                className="drop-shadow-sm"
              />
              <circle
                cx={sparklineData?.[sparklineData?.length - 1]?.x}
                cy={sparklineData?.[sparklineData?.length - 1]?.y}
                r="3"
                fill="var(--color-primary)"
              />
            </svg>
          </div>

          {/* Score Range Indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-error via-warning to-success"></div>
              <div 
                className="absolute top-0 w-1 h-full bg-card-foreground rounded-full"
                style={{ left: `${((entity?.currentScore - 300) / 550) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="space-y-3 border-t border-border pt-6">
        <h3 className="text-sm font-semibold text-card-foreground">Quick Actions</h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            fullWidth
            iconName="FileText"
            iconPosition="left"
            onClick={onGenerateReport}
          >
            Generate Report
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="Bell"
            iconPosition="left"
            onClick={onSetAlert}
          >
            Set Alert
          </Button>
          <Button
            variant="ghost"
            fullWidth
            iconName="Share2"
            iconPosition="left"
          >
            Share Assessment
          </Button>
        </div>
      </div>
      {/* Last Updated */}
      <div className="text-xs text-muted-foreground border-t border-border pt-4">
        Last updated: {entity?.lastUpdated}
      </div>
    </div>
  );
};

export default EntityOverview;