import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModelVersionControl = () => {
  const [selectedVersion, setSelectedVersion] = useState('v2.1.3');
  const [showRollbackModal, setShowRollbackModal] = useState(false);

  const modelVersions = [
    {
      version: 'v2.1.3',
      status: 'active',
      deployedAt: '2025-08-20T10:30:00Z',
      accuracy: 94.2,
      performance: 'excellent',
      description: 'Enhanced feature engineering with improved risk scoring',
      changes: ['Added alternative data sources', 'Optimized feature selection', 'Improved model calibration']
    },
    {
      version: 'v2.1.2',
      status: 'previous',
      deployedAt: '2025-08-15T14:20:00Z',
      accuracy: 93.8,
      performance: 'good',
      description: 'Stability improvements and bug fixes',
      changes: ['Fixed data preprocessing issues', 'Updated validation logic', 'Performance optimizations']
    },
    {
      version: 'v2.1.1',
      status: 'archived',
      deployedAt: '2025-08-10T09:15:00Z',
      accuracy: 93.1,
      performance: 'good',
      description: 'Initial production release with baseline features',
      changes: ['Core model implementation', 'Basic feature set', 'Initial deployment']
    }
  ];

  const abTestResults = [
    {
      id: 'test-001',
      name: 'Feature Engineering v2.1.3 vs v2.1.2',
      status: 'completed',
      winner: 'v2.1.3',
      improvement: '+0.4%',
      confidence: 95,
      duration: '7 days',
      sampleSize: '10,000 predictions'
    },
    {
      id: 'test-002',
      name: 'Risk Threshold Optimization',
      status: 'running',
      progress: 65,
      estimatedCompletion: '2 days',
      sampleSize: '5,000 predictions'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'previous': return 'text-warning bg-warning/10';
      case 'archived': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'excellent': return 'text-success';
      case 'good': return 'text-accent';
      case 'fair': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRollback = (version) => {
    setSelectedVersion(version);
    setShowRollbackModal(true);
  };

  const confirmRollback = () => {
    console.log(`Rolling back to version ${selectedVersion}`);
    setShowRollbackModal(false);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">Model Version Control</h3>
          <p className="text-sm text-muted-foreground">Manage model deployments and rollbacks</p>
        </div>
        <Button variant="outline" size="sm" iconName="GitBranch" iconPosition="left">
          View Git History
        </Button>
      </div>
      {/* Model Versions */}
      <div className="space-y-4 mb-8">
        <h4 className="text-sm font-medium text-card-foreground">Deployment History</h4>
        {modelVersions?.map((version) => (
          <div key={version?.version} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(version?.status)}`}>
                  {version?.status}
                </div>
                <div>
                  <h5 className="font-medium text-card-foreground">{version?.version}</h5>
                  <p className="text-xs text-muted-foreground">Deployed {formatDate(version?.deployedAt)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-sm font-medium text-card-foreground">{version?.accuracy}%</p>
                  <p className={`text-xs ${getPerformanceColor(version?.performance)}`}>
                    {version?.performance}
                  </p>
                </div>
                {version?.status !== 'active' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRollback(version?.version)}
                    iconName="RotateCcw"
                  >
                    Rollback
                  </Button>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">{version?.description}</p>
            
            <div className="space-y-1">
              <p className="text-xs font-medium text-card-foreground">Key Changes:</p>
              {version?.changes?.map((change, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon name="Check" size={12} className="text-success" />
                  <span className="text-xs text-muted-foreground">{change}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* A/B Testing Results */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-card-foreground">A/B Testing Results</h4>
        {abTestResults?.map((test) => (
          <div key={test?.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h5 className="font-medium text-card-foreground">{test?.name}</h5>
                <p className="text-xs text-muted-foreground">Sample: {test?.sampleSize}</p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                test?.status === 'completed' ? 'text-success bg-success/10' : 'text-accent bg-accent/10'
              }`}>
                {test?.status}
              </div>
            </div>

            {test?.status === 'completed' ? (
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Winner</p>
                  <p className="text-sm font-medium text-success">{test?.winner}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Improvement</p>
                  <p className="text-sm font-medium text-card-foreground">{test?.improvement}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="text-sm font-medium text-card-foreground">{test?.confidence}%</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium text-card-foreground">{test?.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${test?.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">ETA: {test?.estimatedCompletion}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Rollback Confirmation Modal */}
      {showRollbackModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1100">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-warning/10 rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={20} className="text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Confirm Rollback</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to rollback to version {selectedVersion}? This will replace the current active model.
            </p>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowRollbackModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmRollback}
                className="flex-1"
              >
                Confirm Rollback
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelVersionControl;