import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PerformanceMetrics = () => {
  const [selectedMetric, setSelectedMetric] = useState('accuracy');
  const [timeRange, setTimeRange] = useState('7d');

  const keyMetrics = [
    {
      id: 'accuracy',
      label: 'Model Accuracy',
      value: 94.2,
      change: '+0.4',
      trend: 'up',
      icon: 'Target',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'precision',
      label: 'Precision',
      value: 92.8,
      change: '+0.2',
      trend: 'up',
      icon: 'Crosshair',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'recall',
      label: 'Recall',
      value: 91.5,
      change: '-0.1',
      trend: 'down',
      icon: 'Search',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'f1',
      label: 'F1 Score',
      value: 92.1,
      change: '+0.1',
      trend: 'up',
      icon: 'BarChart3',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  const performanceTrends = [
    { date: '2025-08-15', accuracy: 93.8, precision: 92.6, recall: 91.4, f1: 92.0 },
    { date: '2025-08-16', accuracy: 94.0, precision: 92.7, recall: 91.3, f1: 92.0 },
    { date: '2025-08-17', accuracy: 93.9, precision: 92.5, recall: 91.6, f1: 92.1 },
    { date: '2025-08-18', accuracy: 94.1, precision: 92.8, recall: 91.4, f1: 92.1 },
    { date: '2025-08-19', accuracy: 94.0, precision: 92.6, recall: 91.5, f1: 92.1 },
    { date: '2025-08-20', accuracy: 94.2, precision: 92.8, recall: 91.5, f1: 92.1 },
    { date: '2025-08-21', accuracy: 94.1, precision: 92.7, recall: 91.6, f1: 92.2 },
    { date: '2025-08-22', accuracy: 94.2, precision: 92.8, recall: 91.5, f1: 92.1 }
  ];

  const modelComparison = [
    { model: 'Current v2.1.3', accuracy: 94.2, precision: 92.8, recall: 91.5, f1: 92.1 },
    { model: 'Previous v2.1.2', accuracy: 93.8, precision: 92.6, recall: 91.4, f1: 92.0 },
    { model: 'Baseline v2.1.0', accuracy: 92.5, precision: 91.2, recall: 90.8, f1: 91.0 },
    { model: 'Industry Avg', accuracy: 89.3, precision: 87.5, recall: 88.2, f1: 87.8 }
  ];

  const predictionAccuracy = [
    { timeSlot: '00:00', predictions: 1250, correct: 1178, accuracy: 94.2 },
    { timeSlot: '04:00', predictions: 980, correct: 923, accuracy: 94.2 },
    { timeSlot: '08:00', predictions: 2100, correct: 1979, accuracy: 94.2 },
    { timeSlot: '12:00', predictions: 2850, correct: 2686, accuracy: 94.2 },
    { timeSlot: '16:00', predictions: 2200, correct: 2073, accuracy: 94.2 },
    { timeSlot: '20:00', predictions: 1800, correct: 1696, accuracy: 94.2 }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{formatDate(label)}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              ></div>
              <span className="text-sm text-popover-foreground">
                {entry?.name}: {entry?.value}%
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
      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics?.map((metric) => (
          <div 
            key={metric?.id}
            className={`bg-card rounded-lg border border-border p-4 cursor-pointer transition-all duration-200 ${
              selectedMetric === metric?.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedMetric(metric?.id)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${metric?.bgColor} flex items-center justify-center`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
              <div className={`flex items-center space-x-1 ${getTrendColor(metric?.trend)}`}>
                <Icon name={getTrendIcon(metric?.trend)} size={14} />
                <span className="text-xs font-medium">{metric?.change}%</span>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{metric?.value}%</p>
              <p className="text-sm text-muted-foreground">{metric?.label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Performance Trends Chart */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Performance Trends</h3>
            <p className="text-sm text-muted-foreground">Model metrics over time</p>
          </div>
          <div className="flex items-center space-x-2">
            {['1d', '7d', '30d', '90d']?.map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceTrends}>
              <defs>
                <linearGradient id="accuracyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="precisionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#64748B"
                fontSize={12}
              />
              <YAxis 
                domain={['dataMin - 1', 'dataMax + 1']}
                stroke="#64748B"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="accuracy"
                stroke="#059669"
                strokeWidth={2}
                fill="url(#accuracyGradient)"
                name="Accuracy"
              />
              <Area
                type="monotone"
                dataKey="precision"
                stroke="#0EA5E9"
                strokeWidth={2}
                fill="url(#precisionGradient)"
                name="Precision"
              />
              <Line
                type="monotone"
                dataKey="recall"
                stroke="#D97706"
                strokeWidth={2}
                name="Recall"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="f1"
                stroke="#1E3A8A"
                strokeWidth={2}
                name="F1 Score"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Model Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Model Comparison</h3>
              <p className="text-sm text-muted-foreground">Performance across versions</p>
            </div>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelComparison} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis type="number" domain={[85, 95]} stroke="#64748B" fontSize={12} />
                <YAxis type="category" dataKey="model" stroke="#64748B" fontSize={12} width={100} />
                <Tooltip 
                  formatter={(value, name) => [`${value}%`, name]}
                  labelStyle={{ color: '#0F172A' }}
                />
                <Bar dataKey="accuracy" fill="#059669" name="Accuracy" />
                <Bar dataKey="precision" fill="#0EA5E9" name="Precision" />
                <Bar dataKey="recall" fill="#D97706" name="Recall" />
                <Bar dataKey="f1" fill="#1E3A8A" name="F1 Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">Prediction Accuracy</h3>
              <p className="text-sm text-muted-foreground">Hourly performance breakdown</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>Last 24 hours</span>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionAccuracy}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="timeSlot" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'accuracy') return [`${value}%`, 'Accuracy'];
                    return [value, name === 'predictions' ? 'Total Predictions' : 'Correct Predictions'];
                  }}
                  labelStyle={{ color: '#0F172A' }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#059669"
                  strokeWidth={3}
                  dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                  name="accuracy"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;