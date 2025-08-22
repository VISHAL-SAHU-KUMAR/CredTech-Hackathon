import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExplainableAI = ({ entity }) => {
  const [activeView, setActiveView] = useState('shap');

  const shapFeatures = [
    { feature: 'Debt-to-Equity Ratio', importance: 0.85, impact: 'positive', value: '0.45', description: 'Low debt relative to equity indicates strong financial stability' },
    { feature: 'Revenue Growth', importance: 0.72, impact: 'positive', value: '12.5%', description: 'Consistent revenue growth demonstrates business expansion' },
    { feature: 'Current Ratio', importance: 0.68, impact: 'positive', value: '2.1', description: 'Strong liquidity position for short-term obligations' },
    { feature: 'News Sentiment', importance: 0.45, impact: 'positive', value: '0.73', description: 'Positive media coverage supports creditworthiness' },
    { feature: 'Market Volatility', importance: 0.38, impact: 'negative', value: '18.2%', description: 'Higher volatility increases investment risk' },
    { feature: 'Industry Outlook', importance: 0.32, impact: 'neutral', value: 'Stable', description: 'Technology sector shows moderate growth prospects' },
    { feature: 'Interest Coverage', importance: 0.28, impact: 'positive', value: '8.5x', description: 'Strong ability to service debt obligations' },
    { feature: 'Cash Flow Margin', importance: 0.25, impact: 'positive', value: '18.3%', description: 'Healthy cash generation from operations' }
  ];

  const limeFeatures = [
    { feature: 'Financial Stability', weight: 0.92, contribution: '+45 points', factors: ['Low debt ratio', 'Strong cash flow', 'Consistent profitability'] },
    { feature: 'Market Position', weight: 0.78, contribution: '+32 points', factors: ['Market leadership', 'Brand recognition', 'Customer loyalty'] },
    { feature: 'Growth Trajectory', weight: 0.65, contribution: '+28 points', factors: ['Revenue growth', 'Market expansion', 'Product innovation'] },
    { feature: 'Risk Factors', weight: -0.23, contribution: '-12 points', factors: ['Market volatility', 'Regulatory changes', 'Competition'] }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getImpactBg = (impact) => {
    switch (impact) {
      case 'positive': return 'bg-success';
      case 'negative': return 'bg-error';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Explainable AI Insights</h2>
            <p className="text-sm text-muted-foreground">Understanding the factors driving the credit score</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={activeView === 'shap' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('shap')}
            >
              SHAP Analysis
            </Button>
            <Button
              variant={activeView === 'lime' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveView('lime')}
            >
              LIME Analysis
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {activeView === 'shap' && (
          <div className="space-y-6">
            {/* SHAP Feature Importance */}
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Feature Importance Rankings</h3>
              <div className="space-y-3">
                {shapFeatures?.map((feature, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-card-foreground">{feature?.feature}</span>
                        <span className="text-xs text-muted-foreground">({feature?.value})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon 
                          name={feature?.impact === 'positive' ? 'TrendingUp' : feature?.impact === 'negative' ? 'TrendingDown' : 'Minus'} 
                          size={16} 
                          className={getImpactColor(feature?.impact)}
                        />
                        <span className="text-sm font-medium text-card-foreground">
                          {(feature?.importance * 100)?.toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Importance Bar */}
                    <div className="mb-2">
                      <div className="w-full bg-border rounded-full h-2">
                        <div
                          className={`h-full rounded-full ${getImpactBg(feature?.impact)}`}
                          style={{ width: `${feature?.importance * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">{feature?.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Heatmap */}
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Feature Impact Heatmap</h3>
              <div className="grid grid-cols-4 gap-2">
                {shapFeatures?.slice(0, 8)?.map((feature, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg text-center cursor-pointer transition-all hover:scale-105 ${
                      feature?.impact === 'positive' ? 'bg-success/20 hover:bg-success/30' :
                      feature?.impact === 'negative'? 'bg-error/20 hover:bg-error/30' : 'bg-muted hover:bg-muted/80'
                    }`}
                    title={feature?.description}
                  >
                    <div className="text-xs font-medium text-card-foreground mb-1">
                      {feature?.feature?.split(' ')?.[0]}
                    </div>
                    <div className={`text-lg font-bold ${getImpactColor(feature?.impact)}`}>
                      {(feature?.importance * 100)?.toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'lime' && (
          <div className="space-y-6">
            {/* LIME Local Explanations */}
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4">Local Model Explanations</h3>
              <div className="space-y-4">
                {limeFeatures?.map((feature, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-card-foreground">{feature?.feature}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          feature?.weight > 0 ? 'text-success' : 'text-error'
                        }`}>
                          {feature?.contribution}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          feature?.weight > 0 ? 'bg-success' : 'bg-error'
                        }`}></div>
                      </div>
                    </div>
                    
                    {/* Weight Visualization */}
                    <div className="mb-3">
                      <div className="w-full bg-border rounded-full h-2 relative">
                        <div className="absolute left-1/2 w-0.5 h-full bg-card-foreground"></div>
                        <div
                          className={`h-full rounded-full ${
                            feature?.weight > 0 ? 'bg-success ml-1/2' : 'bg-error'
                          }`}
                          style={{ 
                            width: `${Math.abs(feature?.weight) * 50}%`,
                            marginLeft: feature?.weight > 0 ? '50%' : `${50 - Math.abs(feature?.weight) * 50}%`
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Contributing Factors */}
                    <div className="space-y-1">
                      {feature?.factors?.map((factor, factorIndex) => (
                        <div key={factorIndex} className="flex items-center space-x-2">
                          <Icon name="ChevronRight" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Confidence */}
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="flex items-center space-x-3 mb-2">
                <Icon name="Shield" size={20} className="text-primary" />
                <h3 className="text-lg font-semibold text-card-foreground">Model Confidence</h3>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">94.2%</div>
                  <div className="text-xs text-muted-foreground">Prediction Confidence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">0.89</div>
                  <div className="text-xs text-muted-foreground">Model Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">0.76</div>
                  <div className="text-xs text-muted-foreground">Feature Stability</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplainableAI;