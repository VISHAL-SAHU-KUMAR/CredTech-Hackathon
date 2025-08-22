import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlainLanguageExplanations = ({ entity, currentScore }) => {
  const [selectedExplanation, setSelectedExplanation] = useState('overall');

  const explanations = {
    overall: {
      title: 'Overall Credit Assessment',
      icon: 'FileText',
      content: `Based on our comprehensive analysis, ${entity?.name} receives a credit score of ${currentScore}, which falls in the "Good" credit range. This score reflects the company's strong financial position, positive market performance, and favorable news sentiment.\n\nThe primary strengths include excellent debt management with a debt-to-equity ratio of 0.45, indicating the company maintains a healthy balance between debt and equity financing. Revenue growth of 12.5% demonstrates consistent business expansion and market confidence.\n\nKey factors supporting this score:\n• Strong liquidity position with current ratio of 2.1\n• Healthy cash flow margin of 18.3%\n• Positive market sentiment and news coverage\n• Stable industry outlook in the technology sector\n\nMinor concerns include market volatility at 18.2%, which is typical for technology companies but adds some uncertainty to future performance predictions.`,
      confidence: 94.2,
      lastUpdated: '2 minutes ago'
    },
    financial: {
      title: 'Financial Health Analysis',icon: 'DollarSign',
      content: `${entity?.name}'s financial metrics demonstrate robust fiscal management and operational efficiency. The company's debt-to-equity ratio of 0.45 is well below industry averages, indicating conservative debt management and strong equity position.\n\nRevenue growth of 12.5% year-over-year shows consistent business expansion, while the current ratio of 2.1 provides confidence in the company's ability to meet short-term obligations. The interest coverage ratio of 8.5x demonstrates strong earnings relative to debt service requirements.\n\nCash flow margin of 18.3% indicates efficient conversion of revenue to cash, providing flexibility for operations and growth investments. Return on equity of 15.2% shows effective use of shareholder investments to generate profits.\n\nThese metrics collectively suggest a financially stable organization with strong fundamentals supporting creditworthiness.`,
      confidence: 96.8,
      lastUpdated: '5 minutes ago'
    },
    market: {
      title: 'Market Performance Insights',
      icon: 'TrendingUp',
      content: `Market indicators for ${entity?.name} show positive momentum with stock performance up 8.2% over the assessment period. The company's market capitalization of $2.4B reflects investor confidence and market positioning.\n\nThe P/E ratio of 16.8 suggests reasonable valuation relative to earnings, while the beta of 1.12 indicates slightly higher volatility than the overall market, which is typical for technology companies.\n\nHigh trading volume trends suggest strong investor interest and liquidity in the stock. Market sentiment analysis shows predominantly positive investor outlook, supported by recent strategic announcements and product launches.\n\nOverall market performance supports the credit assessment by demonstrating investor confidence and market validation of the company's business model and growth prospects.`,
      confidence: 89.5,
      lastUpdated: '3 minutes ago'
    },
    news: {
      title: 'News Sentiment Impact',
      icon: 'Newspaper',
      content: `Recent news coverage of ${entity?.name} has been predominantly positive, contributing favorably to the credit assessment. Analysis of major financial publications shows strong sentiment scores across key media outlets.\n\nPositive coverage includes announcements of strategic partnership expansions, which signal growth opportunities and market confidence. New product launches have received favorable market response, indicating successful innovation and market positioning.\n\nQuarterly earnings reports meeting analyst expectations demonstrate consistent performance and management credibility. The company's proactive communication strategy has maintained positive relationships with financial media.\n\nMinor concerns include regulatory discussions around new compliance requirements, though these appear to be industry-wide issues rather than company-specific challenges. Overall news sentiment supports the positive credit outlook.`,
      confidence: 87.3,
      lastUpdated: '1 minute ago'
    },
    risks: {
      title: 'Risk Assessment Summary',icon: 'AlertTriangle',
      content: `While ${entity?.name} demonstrates strong creditworthiness, several risk factors require monitoring. Market volatility at 18.2% reflects the inherent uncertainty in the technology sector, which could impact future performance.\n\nRegulatory changes in the technology sector may require additional compliance investments, potentially affecting short-term profitability. Competitive pressures in the market could impact market share and pricing power.\n\nEconomic factors such as interest rate changes could affect borrowing costs and investment decisions. Supply chain disruptions, while currently minimal, remain a potential concern for operational continuity.\n\nDespite these risks, the company's strong financial foundation, diversified revenue streams, and proactive management approach provide substantial mitigation. Risk tolerance assessment suggests these factors are manageable within the current credit framework.\n\nRecommended monitoring includes quarterly financial reviews and ongoing assessment of market conditions and regulatory developments.`,
      confidence: 91.7,
      lastUpdated: '4 minutes ago'
    }
  };

  const explanationTypes = [
    { id: 'overall', label: 'Overall Assessment', icon: 'FileText' },
    { id: 'financial', label: 'Financial Health', icon: 'DollarSign' },
    { id: 'market', label: 'Market Performance', icon: 'TrendingUp' },
    { id: 'news', label: 'News Sentiment', icon: 'Newspaper' },
    { id: 'risks', label: 'Risk Factors', icon: 'AlertTriangle' }
  ];

  const currentExplanation = explanations?.[selectedExplanation];

  const handleExport = () => {
    // Export functionality
    console.log('Exporting explanation:', selectedExplanation);
  };

  const handleShare = () => {
    // Share functionality
    console.log('Sharing explanation:', selectedExplanation);
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Plain Language Explanations</h2>
            <p className="text-sm text-muted-foreground">AI-generated insights in simple terms</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              title="Share explanation"
            >
              <Icon name="Share2" size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleExport}
              title="Export explanation"
            >
              <Icon name="Download" size={16} />
            </Button>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-1 px-6">
          {explanationTypes?.map((type) => (
            <button
              key={type?.id}
              onClick={() => setSelectedExplanation(type?.id)}
              className={`flex items-center space-x-2 px-3 py-3 text-sm font-medium rounded-t-lg transition-colors ${
                selectedExplanation === type?.id
                  ? 'bg-muted text-card-foreground border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-card-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={type?.icon} size={14} />
              <span className="hidden sm:block">{type?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {/* Explanation Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name={currentExplanation?.icon} size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {currentExplanation?.title}
                </h3>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Confidence: {currentExplanation?.confidence}%</span>
                  <span>Updated: {currentExplanation?.lastUpdated}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Confidence Indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Explanation Confidence</span>
              <span className="font-medium text-card-foreground">{currentExplanation?.confidence}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary rounded-full h-2 transition-all duration-300"
                style={{ width: `${currentExplanation?.confidence}%` }}
              ></div>
            </div>
          </div>

          {/* Explanation Content */}
          <div className="prose prose-sm max-w-none">
            <div className="text-card-foreground leading-relaxed whitespace-pre-line">
              {currentExplanation?.content}
            </div>
          </div>

          {/* Key Insights */}
          {selectedExplanation === 'overall' && (
            <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
              <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
                <Icon name="Lightbulb" size={16} className="text-accent mr-2" />
                Key Insights
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                  <span className="text-card-foreground">Strong financial fundamentals support creditworthiness</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="CheckCircle" size={14} className="text-success mt-0.5" />
                  <span className="text-card-foreground">Positive market sentiment enhances credit profile</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="AlertCircle" size={14} className="text-warning mt-0.5" />
                  <span className="text-card-foreground">Monitor market volatility for potential impacts</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Items */}
          {selectedExplanation === 'risks' && (
            <div className="mt-6 p-4 bg-warning/5 rounded-lg border border-warning/20">
              <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
                <Icon name="CheckSquare" size={16} className="text-warning mr-2" />
                Recommended Actions
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Icon name="Clock" size={14} className="text-muted-foreground mt-0.5" />
                  <span className="text-card-foreground">Schedule quarterly financial review</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="Eye" size={14} className="text-muted-foreground mt-0.5" />
                  <span className="text-card-foreground">Monitor regulatory developments</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Icon name="TrendingUp" size={14} className="text-muted-foreground mt-0.5" />
                  <span className="text-card-foreground">Track market performance indicators</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Icon name="Bot" size={14} />
            <span>Generated by CreditLens AI</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="RefreshCw" size={14} />
            <span>Auto-updates every 5 minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlainLanguageExplanations;