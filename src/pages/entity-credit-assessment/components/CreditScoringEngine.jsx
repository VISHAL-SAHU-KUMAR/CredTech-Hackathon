import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CreditScoringEngine = ({ entity, onScoreUpdate }) => {
  const [activeTab, setActiveTab] = useState('parameters');
  const [isCalculating, setIsCalculating] = useState(false);
  const [modelParams, setModelParams] = useState({
    financialWeight: 40,
    marketWeight: 25,
    newsWeight: 20,
    historicalWeight: 15,
    riskTolerance: 'medium',
    timeHorizon: '12months'
  });

  const tabs = [
    { id: 'parameters', label: 'Model Parameters', icon: 'Settings' },
    { id: 'financial', label: 'Financial Data', icon: 'DollarSign' },
    { id: 'market', label: 'Market Data', icon: 'TrendingUp' },
    { id: 'news', label: 'News Analysis', icon: 'Newspaper' }
  ];

  const riskToleranceOptions = [
    { value: 'conservative', label: 'Conservative' },
    { value: 'medium', label: 'Medium' },
    { value: 'aggressive', label: 'Aggressive' }
  ];

  const timeHorizonOptions = [
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '12months', label: '12 Months' },
    { value: '24months', label: '24 Months' }
  ];

  const financialData = [
    { metric: 'Revenue Growth', value: '12.5%', trend: 'up', impact: 'positive' },
    { metric: 'Debt-to-Equity', value: '0.45', trend: 'down', impact: 'positive' },
    { metric: 'Current Ratio', value: '2.1', trend: 'up', impact: 'positive' },
    { metric: 'ROE', value: '15.2%', trend: 'up', impact: 'positive' },
    { metric: 'Interest Coverage', value: '8.5x', trend: 'stable', impact: 'neutral' },
    { metric: 'Cash Flow Margin', value: '18.3%', trend: 'up', impact: 'positive' }
  ];

  const marketData = [
    { metric: 'Stock Performance', value: '+8.2%', trend: 'up', impact: 'positive' },
    { metric: 'Market Cap', value: '$2.4B', trend: 'up', impact: 'positive' },
    { metric: 'P/E Ratio', value: '16.8', trend: 'stable', impact: 'neutral' },
    { metric: 'Beta', value: '1.12', trend: 'stable', impact: 'neutral' },
    { metric: 'Volume Trend', value: 'High', trend: 'up', impact: 'positive' }
  ];

  const newsData = [
    { source: 'Financial Times', sentiment: 'positive', impact: 0.85, headline: 'Company announces strategic partnership expansion' },
    { source: 'Reuters', sentiment: 'neutral', impact: 0.12, headline: 'Quarterly earnings meet analyst expectations' },
    { source: 'Bloomberg', sentiment: 'positive', impact: 0.73, headline: 'New product launch receives positive market response' },
    { source: 'WSJ', sentiment: 'negative', impact: -0.23, headline: 'Regulatory concerns raised over new compliance requirements' }
  ];

  const handleParameterChange = (param, value) => {
    setModelParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleRecalculate = async () => {
    setIsCalculating(true);
    // Simulate calculation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate new score based on parameters
    const baseScore = entity?.currentScore;
    const adjustment = Math.random() * 20 - 10; // Random adjustment for demo
    const newScore = Math.max(300, Math.min(850, Math.round(baseScore + adjustment)));
    
    onScoreUpdate(newScore);
    setIsCalculating(false);
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Credit Scoring Engine</h2>
            <p className="text-sm text-muted-foreground">Configure parameters and analyze data sources</p>
          </div>
          <Button
            variant="default"
            loading={isCalculating}
            iconName="Calculator"
            iconPosition="left"
            onClick={handleRecalculate}
          >
            {isCalculating ? 'Calculating...' : 'Recalculate Score'}
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-card-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'parameters' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Weight Distribution</h3>
                <div className="space-y-4">
                  <Input
                    label="Financial Data Weight (%)"
                    type="number"
                    value={modelParams?.financialWeight}
                    onChange={(e) => handleParameterChange('financialWeight', parseInt(e?.target?.value))}
                    min="0"
                    max="100"
                  />
                  <Input
                    label="Market Data Weight (%)"
                    type="number"
                    value={modelParams?.marketWeight}
                    onChange={(e) => handleParameterChange('marketWeight', parseInt(e?.target?.value))}
                    min="0"
                    max="100"
                  />
                  <Input
                    label="News Sentiment Weight (%)"
                    type="number"
                    value={modelParams?.newsWeight}
                    onChange={(e) => handleParameterChange('newsWeight', parseInt(e?.target?.value))}
                    min="0"
                    max="100"
                  />
                  <Input
                    label="Historical Data Weight (%)"
                    type="number"
                    value={modelParams?.historicalWeight}
                    onChange={(e) => handleParameterChange('historicalWeight', parseInt(e?.target?.value))}
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-card-foreground">Model Configuration</h3>
                <div className="space-y-4">
                  <Select
                    label="Risk Tolerance"
                    options={riskToleranceOptions}
                    value={modelParams?.riskTolerance}
                    onChange={(value) => handleParameterChange('riskTolerance', value)}
                  />
                  <Select
                    label="Time Horizon"
                    options={timeHorizonOptions}
                    value={modelParams?.timeHorizon}
                    onChange={(value) => handleParameterChange('timeHorizon', value)}
                  />
                </div>

                {/* Weight Visualization */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-card-foreground mb-3">Weight Distribution</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Financial', value: modelParams?.financialWeight, color: 'bg-primary' },
                      { label: 'Market', value: modelParams?.marketWeight, color: 'bg-accent' },
                      { label: 'News', value: modelParams?.newsWeight, color: 'bg-warning' },
                      { label: 'Historical', value: modelParams?.historicalWeight, color: 'bg-success' }
                    ]?.map((item) => (
                      <div key={item?.label} className="flex items-center space-x-3">
                        <div className="w-16 text-xs text-muted-foreground">{item?.label}</div>
                        <div className="flex-1 bg-muted rounded-full h-2">
                          <div
                            className={`h-full rounded-full ${item?.color}`}
                            style={{ width: `${item?.value}%` }}
                          ></div>
                        </div>
                        <div className="w-8 text-xs text-card-foreground">{item?.value}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">Financial Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {financialData?.map((item, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-card-foreground">{item?.metric}</span>
                    <Icon 
                      name={getTrendIcon(item?.trend)} 
                      size={16} 
                      className={getTrendColor(item?.impact)}
                    />
                  </div>
                  <div className="text-xl font-bold text-card-foreground">{item?.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'market' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">Market Data</h3>
            <div className="grid grid-cols-2 gap-4">
              {marketData?.map((item, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-card-foreground">{item?.metric}</span>
                    <Icon 
                      name={getTrendIcon(item?.trend)} 
                      size={16} 
                      className={getTrendColor(item?.impact)}
                    />
                  </div>
                  <div className="text-xl font-bold text-card-foreground">{item?.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-card-foreground">News Sentiment Analysis</h3>
            <div className="space-y-3">
              {newsData?.map((item, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-card-foreground">{item?.source}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item?.sentiment === 'positive' ? 'bg-success/10 text-success' :
                          item?.sentiment === 'negative'? 'bg-error/10 text-error' : 'bg-muted-foreground/10 text-muted-foreground'
                        }`}>
                          {item?.sentiment}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item?.headline}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${getSentimentColor(item?.sentiment)}`}>
                        {item?.impact > 0 ? '+' : ''}{(item?.impact * 100)?.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditScoringEngine;