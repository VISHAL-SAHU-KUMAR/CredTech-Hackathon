import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, BarChart, Bar, Line } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModelEvaluation = () => {
  const [selectedModel, setSelectedModel] = useState('current');
  const [evaluationView, setEvaluationView] = useState('confusion');

  // Confusion Matrix Data
  const confusionMatrix = [
    { predicted: 'Low Risk', actual: 'Low Risk', count: 2847, percentage: 94.2 },
    { predicted: 'Low Risk', actual: 'Medium Risk', count: 123, percentage: 4.1 },
    { predicted: 'Low Risk', actual: 'High Risk', count: 52, percentage: 1.7 },
    { predicted: 'Medium Risk', actual: 'Low Risk', count: 89, percentage: 3.1 },
    { predicted: 'Medium Risk', actual: 'Medium Risk', count: 2156, percentage: 92.8 },
    { predicted: 'Medium Risk', actual: 'High Risk', count: 98, percentage: 4.1 },
    { predicted: 'High Risk', actual: 'Low Risk', count: 34, percentage: 2.8 },
    { predicted: 'High Risk', actual: 'Medium Risk', count: 67, percentage: 5.5 },
    { predicted: 'High Risk', actual: 'High Risk', count: 1123, percentage: 91.7 }
  ];

  // ROC Curve Data
  const rocData = [
    { fpr: 0.0, tpr: 0.0, threshold: 1.0 },
    { fpr: 0.02, tpr: 0.15, threshold: 0.95 },
    { fpr: 0.05, tpr: 0.35, threshold: 0.9 },
    { fpr: 0.08, tpr: 0.52, threshold: 0.85 },
    { fpr: 0.12, tpr: 0.68, threshold: 0.8 },
    { fpr: 0.18, tpr: 0.78, threshold: 0.75 },
    { fpr: 0.25, tpr: 0.85, threshold: 0.7 },
    { fpr: 0.35, tpr: 0.91, threshold: 0.65 },
    { fpr: 0.48, tpr: 0.95, threshold: 0.6 },
    { fpr: 0.65, tpr: 0.97, threshold: 0.55 },
    { fpr: 0.82, tpr: 0.99, threshold: 0.5 },
    { fpr: 1.0, tpr: 1.0, threshold: 0.0 }
  ];

  // Calibration Plot Data
  const calibrationData = [
    { predicted: 0.1, actual: 0.08, count: 1250 },
    { predicted: 0.2, actual: 0.18, count: 1180 },
    { predicted: 0.3, actual: 0.28, count: 1050 },
    { predicted: 0.4, actual: 0.39, count: 980 },
    { predicted: 0.5, actual: 0.51, count: 920 },
    { predicted: 0.6, actual: 0.62, count: 850 },
    { predicted: 0.7, actual: 0.71, count: 780 },
    { predicted: 0.8, actual: 0.82, count: 650 },
    { predicted: 0.9, actual: 0.91, count: 420 }
  ];

  // Feature Importance Data
  const featureImportance = [
    { feature: 'credit_score', importance: 0.28, change: '+0.02' },
    { feature: 'debt_to_income_ratio', importance: 0.22, change: '-0.01' },
    { feature: 'payment_history', importance: 0.18, change: '+0.03' },
    { feature: 'credit_utilization', importance: 0.15, change: '+0.01' },
    { feature: 'account_age', importance: 0.08, change: '0.00' },
    { feature: 'income_stability', importance: 0.05, change: '-0.02' },
    { feature: 'recent_inquiries', importance: 0.04, change: '+0.01' }
  ];

  // Model Comparison Data
  const modelComparison = [
    {
      model: 'Current v2.1.3',
      accuracy: 94.2,
      precision: 92.8,
      recall: 91.5,
      f1: 92.1,
      auc: 0.96,
      status: 'active'
    },
    {
      model: 'Previous v2.1.2',
      accuracy: 93.8,
      precision: 92.6,
      recall: 91.4,
      f1: 92.0,
      auc: 0.95,
      status: 'previous'
    },
    {
      model: 'Baseline v2.1.0',
      accuracy: 92.5,
      precision: 91.2,
      recall: 90.8,
      f1: 91.0,
      auc: 0.93,
      status: 'baseline'
    }
  ];

  // Performance by Segment
  const segmentPerformance = [
    { segment: 'High Income', accuracy: 95.8, precision: 94.2, recall: 93.1, count: 2850 },
    { segment: 'Medium Income', accuracy: 94.1, precision: 92.5, recall: 91.8, count: 4200 },
    { segment: 'Low Income', accuracy: 92.3, precision: 90.8, recall: 89.5, count: 1950 },
    { segment: 'Young Adults', accuracy: 91.8, precision: 89.9, recall: 88.7, count: 1800 },
    { segment: 'Middle Age', accuracy: 94.9, precision: 93.4, recall: 92.6, count: 3500 },
    { segment: 'Seniors', accuracy: 93.7, precision: 92.1, recall: 91.3, count: 1700 }
  ];

  const getConfusionColor = (predicted, actual) => {
    if (predicted === actual) {
      return predicted === 'High Risk' ? '#DC2626' : 
             predicted === 'Medium Risk' ? '#D97706' : '#059669';
    }
    return '#64748B';
  };

  const getModelStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'previous': return 'text-warning bg-warning/10';
      case 'baseline': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-popover-foreground">
                {entry?.name}: {typeof entry?.value === 'number' ? entry?.value?.toFixed(3) : entry?.value}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Evaluation Controls */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Model Evaluation</h3>
            <p className="text-sm text-muted-foreground">Comprehensive model performance analysis</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export Report
            </Button>
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-card-foreground">Model:</span>
            <div className="flex space-x-1">
              {['current', 'previous', 'baseline']?.map((model) => (
                <Button
                  key={model}
                  variant={selectedModel === model ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedModel(model)}
                >
                  {model?.charAt(0)?.toUpperCase() + model?.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-card-foreground">View:</span>
            <div className="flex space-x-1">
              {[
                { key: 'confusion', label: 'Confusion Matrix' },
                { key: 'roc', label: 'ROC Curve' },
                { key: 'calibration', label: 'Calibration' }
              ]?.map((view) => (
                <Button
                  key={view?.key}
                  variant={evaluationView === view?.key ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setEvaluationView(view?.key)}
                >
                  {view?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Main Evaluation Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Evaluation Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-card-foreground">
              {evaluationView === 'confusion' && 'Confusion Matrix'}
              {evaluationView === 'roc' && 'ROC Curve (AUC: 0.96)'}
              {evaluationView === 'calibration' && 'Calibration Plot'}
            </h4>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="BarChart3" size={14} />
              <span>Interactive</span>
            </div>
          </div>

          <div className="h-80">
            {evaluationView === 'confusion' && (
              <div className="grid grid-cols-3 gap-2 h-full">
                {['Low Risk', 'Medium Risk', 'High Risk']?.map((actual, actualIndex) => (
                  ['Low Risk', 'Medium Risk', 'High Risk']?.map((predicted, predictedIndex) => {
                    const data = confusionMatrix?.find(
                      item => item?.actual === actual && item?.predicted === predicted
                    );
                    const intensity = data ? data?.percentage / 100 : 0;
                    
                    return (
                      <div
                        key={`${actual}-${predicted}`}
                        className="border border-border rounded-lg p-3 flex flex-col items-center justify-center text-center"
                        style={{
                          backgroundColor: `${getConfusionColor(predicted, actual)}${Math.floor(intensity * 255)?.toString(16)?.padStart(2, '0')}20`
                        }}
                      >
                        <div className="text-lg font-bold text-card-foreground">
                          {data?.count || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {data?.percentage?.toFixed(1) || '0.0'}%
                        </div>
                        {actualIndex === 0 && (
                          <div className="text-xs font-medium text-card-foreground mt-1">
                            {predicted}
                          </div>
                        )}
                        {predictedIndex === 0 && (
                          <div className="text-xs font-medium text-card-foreground mt-1 transform -rotate-90">
                            {actual}
                          </div>
                        )}
                      </div>
                    );
                  })
                ))}
              </div>
            )}

            {evaluationView === 'roc' && (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={rocData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="fpr" 
                    name="False Positive Rate"
                    stroke="#64748B"
                    fontSize={12}
                  />
                  <YAxis 
                    dataKey="tpr" 
                    name="True Positive Rate"
                    stroke="#64748B"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter dataKey="tpr" fill="#059669" />
                  <Line
                    type="monotone"
                    dataKey="tpr"
                    stroke="#059669"
                    strokeWidth={3}
                    dot={false}
                  />
                  {/* Diagonal reference line */}
                  <Line
                    data={[{ fpr: 0, tpr: 0 }, { fpr: 1, tpr: 1 }]}
                    type="monotone"
                    dataKey="tpr"
                    stroke="#64748B"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            )}

            {evaluationView === 'calibration' && (
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={calibrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="predicted" 
                    name="Predicted Probability"
                    stroke="#64748B"
                    fontSize={12}
                  />
                  <YAxis 
                    dataKey="actual" 
                    name="Actual Probability"
                    stroke="#64748B"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter dataKey="actual" fill="#0EA5E9">
                    {calibrationData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="#0EA5E9" />
                    ))}
                  </Scatter>
                  {/* Perfect calibration line */}
                  <Line
                    data={[{ predicted: 0, actual: 0 }, { predicted: 1, actual: 1 }]}
                    type="monotone"
                    dataKey="actual"
                    stroke="#059669"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Feature Importance */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-card-foreground">Feature Importance</h4>
            <Button variant="ghost" size="sm" iconName="TrendingUp">
              View Details
            </Button>
          </div>

          <div className="space-y-4">
            {featureImportance?.map((feature, index) => (
              <div key={feature?.feature} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-card-foreground truncate">
                  {feature?.feature?.replace(/_/g, ' ')}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${feature?.importance * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="w-16 text-right">
                  <div className="text-sm font-medium text-card-foreground">
                    {(feature?.importance * 100)?.toFixed(1)}%
                  </div>
                  <div className={`text-xs ${
                    feature?.change?.startsWith('+') ? 'text-success' : 
                    feature?.change?.startsWith('-') ? 'text-error' : 'text-muted-foreground'
                  }`}>
                    {feature?.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Model Comparison and Segment Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Comparison */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-card-foreground">Model Comparison</h4>
            <Button variant="outline" size="sm" iconName="GitCompare">
              Compare All
            </Button>
          </div>

          <div className="space-y-4">
            {modelComparison?.map((model) => (
              <div key={model?.model} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-card-foreground">{model?.model}</h5>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getModelStatusColor(model?.status)}`}>
                      {model?.status}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-card-foreground">{model?.accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Precision</p>
                    <p className="font-medium text-card-foreground">{model?.precision}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Recall</p>
                    <p className="font-medium text-card-foreground">{model?.recall}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">F1 Score</p>
                    <p className="font-medium text-card-foreground">{model?.f1}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">AUC</p>
                    <p className="font-medium text-card-foreground">{model?.auc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance by Segment */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-semibold text-card-foreground">Performance by Segment</h4>
            <Button variant="ghost" size="sm" iconName="Filter">
              Filter
            </Button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={segmentPerformance} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" domain={[85, 100]} stroke="#64748B" fontSize={12} />
                <YAxis type="category" dataKey="segment" stroke="#64748B" fontSize={12} width={80} />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  labelStyle={{ color: '#0F172A' }}
                />
                <Bar dataKey="accuracy" fill="#059669" name="Accuracy" />
                <Bar dataKey="precision" fill="#0EA5E9" name="Precision" />
                <Bar dataKey="recall" fill="#D97706" name="Recall" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelEvaluation;