import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataLineageVisualization = ({ lineageData }) => {
  const [selectedNode, setSelectedNode] = useState(null);
  const [viewMode, setViewMode] = useState('flow');

  const getNodeColor = (type) => {
    switch (type) {
      case 'source': return 'bg-primary text-primary-foreground';
      case 'processing': return 'bg-accent text-accent-foreground';
      case 'storage': return 'bg-secondary text-secondary-foreground';
      case 'output': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getNodeIcon = (type) => {
    switch (type) {
      case 'source': return 'Database';
      case 'processing': return 'Cpu';
      case 'storage': return 'HardDrive';
      case 'output': return 'Target';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">Data Lineage</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'flow' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('flow')}
            iconName="GitBranch"
            iconPosition="left"
          >
            Flow View
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            iconName="Table"
            iconPosition="left"
          >
            Table View
          </Button>
        </div>
      </div>
      {viewMode === 'flow' ? (
        <div className="relative">
          {/* Flow Visualization */}
          <div className="flex flex-col space-y-8">
            {lineageData?.stages?.map((stage, stageIndex) => (
              <div key={stageIndex} className="relative">
                <div className="text-center mb-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                    {stage?.name}
                  </h3>
                </div>
                
                <div className="flex items-center justify-center space-x-6 flex-wrap">
                  {stage?.nodes?.map((node, nodeIndex) => (
                    <div key={nodeIndex} className="relative">
                      <div
                        className={`p-4 rounded-lg cursor-pointer transition-smooth ${getNodeColor(node?.type)} ${
                          selectedNode?.id === node?.id ? 'ring-2 ring-ring ring-offset-2' : ''
                        }`}
                        onClick={() => setSelectedNode(node)}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <Icon name={getNodeIcon(node?.type)} size={20} />
                          <span className="text-sm font-medium">{node?.name}</span>
                          <span className="text-xs opacity-80">{node?.records} records</span>
                        </div>
                      </div>
                      
                      {/* Connection Lines */}
                      {stageIndex < lineageData?.stages?.length - 1 && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2">
                          <Icon name="ArrowDown" size={16} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Node Details Panel */}
          {selectedNode && (
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-card-foreground">{selectedNode?.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedNode(null)}
                  iconName="X"
                />
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Type</p>
                  <p className="text-sm font-medium text-card-foreground">{selectedNode?.type}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Records</p>
                  <p className="text-sm font-medium text-card-foreground">{selectedNode?.records?.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Last Updated</p>
                  <p className="text-sm font-medium text-card-foreground">{selectedNode?.lastUpdated}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Status</p>
                  <p className="text-sm font-medium text-success">{selectedNode?.status}</p>
                </div>
              </div>
              
              {selectedNode?.description && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-card-foreground">{selectedNode?.description}</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-card-foreground">Node</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-card-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-card-foreground">Records</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-card-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-card-foreground">Last Updated</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lineageData?.stages?.flatMap(stage => stage?.nodes)?.map((node, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${getNodeColor(node?.type)}`}>
                        <Icon name={getNodeIcon(node?.type)} size={16} />
                      </div>
                      <span className="font-medium text-card-foreground">{node?.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{node?.type}</td>
                  <td className="py-3 px-4 text-sm text-card-foreground">{node?.records?.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-success">{node?.status}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-muted-foreground">{node?.lastUpdated}</td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm" iconName="Eye" iconPosition="left">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataLineageVisualization;