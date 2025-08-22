import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const actions = [
    {
      id: 'new-assessment',
      label: 'New Assessment',
      icon: 'Plus',
      variant: 'default',
      description: 'Start credit assessment'
    },
    {
      id: 'bulk-analysis',
      label: 'Bulk Analysis',
      icon: 'FileSpreadsheet',
      variant: 'outline',
      description: 'Analyze multiple entities'
    },
    {
      id: 'export-report',
      label: 'Export Report',
      icon: 'Download',
      variant: 'outline',
      description: 'Download current view'
    },
    {
      id: 'schedule-refresh',
      label: 'Schedule Refresh',
      icon: 'RefreshCw',
      variant: 'ghost',
      description: 'Set auto-refresh'
    }
  ];

  const handleActionClick = (actionId) => {
    console.log(`Action clicked: ${actionId}`);
    // Handle action logic here
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Zap" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
      </div>
      <div className="space-y-3">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant}
            size="sm"
            fullWidth
            iconName={action?.icon}
            iconPosition="left"
            onClick={() => handleActionClick(action?.id)}
            className="justify-start"
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{action?.label}</span>
              <span className="text-xs opacity-70">{action?.description}</span>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last refresh:</span>
          <span className="text-text-primary font-medium">2 min ago</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Next auto-refresh:</span>
          <span className="text-text-primary font-medium">8 min</span>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;