import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const NewsImpactAnalysis = ({ entity }) => {
  const [timeFilter, setTimeFilter] = useState('7days');
  const [sentimentFilter, setSentimentFilter] = useState('all');

  const timeFilterOptions = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' }
  ];

  const sentimentFilterOptions = [
    { value: 'all', label: 'All Sentiment' },
    { value: 'positive', label: 'Positive Only' },
    { value: 'negative', label: 'Negative Only' },
    { value: 'neutral', label: 'Neutral Only' }
  ];

  const newsItems = [
    {
      id: 1,
      headline: 'TechCorp announces strategic partnership with major cloud provider',
      source: 'Financial Times',
      timestamp: '2 hours ago',
      sentiment: 'positive',
      impact: 0.85,
      scoreChange: '+3.2',
      summary: 'Partnership expected to drive 15% revenue growth in cloud services division',
      url: '#',
      category: 'Business Development'
    },
    {
      id: 2,
      headline: 'Q4 earnings exceed analyst expectations by 8%',
      source: 'Reuters',
      timestamp: '6 hours ago',
      sentiment: 'positive',
      impact: 0.73,
      scoreChange: '+2.8',
      summary: 'Strong performance across all business segments with improved margins',
      url: '#',
      category: 'Financial Results'
    },
    {
      id: 3,
      headline: 'New AI product launch receives positive market response',
      source: 'Bloomberg',
      timestamp: '1 day ago',
      sentiment: 'positive',
      impact: 0.67,
      scoreChange: '+2.1',
      summary: 'Early adoption metrics show 40% higher engagement than previous products',
      url: '#',
      category: 'Product Launch'
    },
    {
      id: 4,
      headline: 'Industry faces new regulatory compliance requirements',
      source: 'Wall Street Journal',
      timestamp: '2 days ago',
      sentiment: 'negative',
      impact: -0.23,
      scoreChange: '-0.8',
      summary: 'New regulations may require additional compliance investments across sector',
      url: '#',
      category: 'Regulatory'
    },
    {
      id: 5,
      headline: 'Company expands international operations to three new markets',
      source: 'TechCrunch',
      timestamp: '3 days ago',
      sentiment: 'positive',
      impact: 0.45,
      scoreChange: '+1.5',
      summary: 'Strategic expansion into European and Asian markets shows growth ambition',
      url: '#',
      category: 'Expansion'
    },
    {
      id: 6,
      headline: 'Quarterly revenue guidance maintained despite market headwinds',
      source: 'MarketWatch',
      timestamp: '4 days ago',
      sentiment: 'neutral',
      impact: 0.12,
      scoreChange: '+0.3',
      summary: 'Management confidence in maintaining growth trajectory amid economic uncertainty',
      url: '#',
      category: 'Guidance'
    }
  ];

  const sentimentSummary = {
    positive: { count: 4, percentage: 67, avgImpact: 0.68 },
    negative: { count: 1, percentage: 17, avgImpact: -0.23 },
    neutral: { count: 1, percentage: 16, avgImpact: 0.12 }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-success';
      case 'negative': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getSentimentBg = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'bg-success/10 border-success/20';
      case 'negative': return 'bg-error/10 border-error/20';
      default: return 'bg-muted/10 border-border';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'TrendingUp';
      case 'negative': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const filteredNews = newsItems?.filter(item => {
    if (sentimentFilter !== 'all' && item?.sentiment !== sentimentFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">Recent News Impact</h3>
        <div className="flex items-center space-x-3">
          <Select
            options={timeFilterOptions}
            value={timeFilter}
            onChange={setTimeFilter}
            className="w-32"
          />
          <Select
            options={sentimentFilterOptions}
            value={sentimentFilter}
            onChange={setSentimentFilter}
            className="w-36"
          />
        </div>
      </div>
      {/* Sentiment Summary */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(sentimentSummary)?.map(([sentiment, data]) => (
          <div key={sentiment} className={`p-4 rounded-lg border ${getSentimentBg(sentiment)}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-card-foreground capitalize">{sentiment}</span>
              <Icon name={getSentimentIcon(sentiment)} size={16} className={getSentimentColor(sentiment)} />
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-card-foreground">{data?.count}</div>
              <div className="text-xs text-muted-foreground">
                {data?.percentage}% • Avg impact: {data?.avgImpact > 0 ? '+' : ''}{data?.avgImpact?.toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* News Items */}
      <div className="space-y-4">
        {filteredNews?.map((item) => (
          <div key={item?.id} className="p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentBg(item?.sentiment)}`}>
                    {item?.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{item?.source}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{item?.timestamp}</span>
                </div>
                <h4 className="text-sm font-semibold text-card-foreground mb-2 leading-tight">
                  {item?.headline}
                </h4>
                <p className="text-xs text-muted-foreground mb-3">{item?.summary}</p>
              </div>
              <div className="text-right ml-4">
                <div className={`text-sm font-bold ${getSentimentColor(item?.sentiment)}`}>
                  {item?.scoreChange}
                </div>
                <div className="text-xs text-muted-foreground">Score Impact</div>
              </div>
            </div>

            {/* Impact Visualization */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Impact Strength</span>
                <span className="font-medium text-card-foreground">
                  {(Math.abs(item?.impact) * 100)?.toFixed(0)}%
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5">
                <div
                  className={`h-full rounded-full ${
                    item?.impact > 0 ? 'bg-success' : item?.impact < 0 ? 'bg-error' : 'bg-muted-foreground'
                  }`}
                  style={{ width: `${Math.abs(item?.impact) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <Icon name={getSentimentIcon(item?.sentiment)} size={14} className={getSentimentColor(item?.sentiment)} />
                <span className={`text-xs font-medium capitalize ${getSentimentColor(item?.sentiment)}`}>
                  {item?.sentiment}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="xs" iconName="ExternalLink">
                  Read More
                </Button>
                <Button variant="ghost" size="xs" iconName="BookmarkPlus">
                  Save
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" iconName="ChevronDown" iconPosition="right">
          Load More News
        </Button>
      </div>
      {/* News Analytics Summary */}
      <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
        <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
          <Icon name="BarChart3" size={16} className="text-accent mr-2" />
          News Impact Analytics
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Score Impact:</span>
            <div className="text-lg font-bold text-success">+8.1 points</div>
          </div>
          <div>
            <span className="text-muted-foreground">Coverage Sentiment:</span>
            <div className="text-lg font-bold text-success">67% Positive</div>
          </div>
          <div>
            <span className="text-muted-foreground">Most Impactful:</span>
            <div className="text-sm font-medium text-card-foreground">Partnership News</div>
          </div>
          <div>
            <span className="text-muted-foreground">Trend Direction:</span>
            <div className="flex items-center space-x-1">
              <Icon name="TrendingUp" size={14} className="text-success" />
              <span className="text-sm font-medium text-success">Improving</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsImpactAnalysis;