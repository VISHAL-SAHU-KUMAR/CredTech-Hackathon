import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PeerComparison = ({ entity }) => {
  const [comparisonMetric, setComparisonMetric] = useState('creditScore');
  const [industryFilter, setIndustryFilter] = useState('technology');

  const comparisonMetricOptions = [
    { value: 'creditScore', label: 'Credit Score' },
    { value: 'revenue', label: 'Revenue Growth' },
    { value: 'debtRatio', label: 'Debt-to-Equity' },
    { value: 'profitability', label: 'ROE' },
    { value: 'liquidity', label: 'Current Ratio' }
  ];

  const industryFilterOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'all', label: 'All Industries' },
    { value: 'software', label: 'Software' },
    { value: 'hardware', label: 'Hardware' }
  ];

  const peerData = [
    {
      id: 1,
      name: 'TechCorp Inc.',
      isTarget: true,
      creditScore: 742,
      revenue: '12.5%',
      debtRatio: 0.45,
      profitability: '15.2%',
      liquidity: 2.1,
      marketCap: '$2.4B',
      employees: '5,200',
      riskLevel: 'Low',
      trend: 'up'
    },
    {
      id: 2,
      name: 'InnovateTech Solutions',
      isTarget: false,
      creditScore: 758,
      revenue: '15.8%',
      debtRatio: 0.38,
      profitability: '18.7%',
      liquidity: 2.4,
      marketCap: '$3.1B',
      employees: '6,800',
      riskLevel: 'Low',
      trend: 'up'
    },
    {
      id: 3,
      name: 'Digital Dynamics Corp',
      isTarget: false,
      creditScore: 721,
      revenue: '9.3%',
      debtRatio: 0.52,
      profitability: '12.4%',
      liquidity: 1.8,
      marketCap: '$1.9B',
      employees: '4,100',
      riskLevel: 'Medium',
      trend: 'stable'
    },
    {
      id: 4,
      name: 'CloudFirst Technologies',
      isTarget: false,
      creditScore: 695,
      revenue: '22.1%',
      debtRatio: 0.61,
      profitability: '10.8%',
      liquidity: 1.6,
      marketCap: '$1.2B',
      employees: '2,900',
      riskLevel: 'Medium',
      trend: 'up'
    },
    {
      id: 5,
      name: 'Enterprise Systems Ltd',
      isTarget: false,
      creditScore: 689,
      revenue: '6.7%',
      debtRatio: 0.58,
      profitability: '9.2%',
      liquidity: 1.9,
      marketCap: '$1.8B',
      employees: '7,200',
      riskLevel: 'Medium',
      trend: 'down'
    }
  ];

  const industryBenchmarks = {
    creditScore: { average: 718, percentile25: 685, percentile75: 745, median: 721 },
    revenue: { average: '13.3%', percentile25: '8.1%', percentile75: '18.2%', median: '12.8%' },
    debtRatio: { average: 0.51, percentile25: 0.42, percentile75: 0.59, median: 0.50 },
    profitability: { average: '13.3%', percentile25: '9.8%', percentile75: '16.7%', median: '12.9%' },
    liquidity: { average: 1.94, percentile25: 1.65, percentile75: 2.18, median: 1.92 }
  };

  const getMetricValue = (company, metric) => {
    switch (metric) {
      case 'creditScore': return company?.creditScore;
      case 'revenue': return parseFloat(company?.revenue);
      case 'debtRatio': return company?.debtRatio;
      case 'profitability': return parseFloat(company?.profitability);
      case 'liquidity': return company?.liquidity;
      default: return 0;
    }
  };

  const getMetricDisplay = (company, metric) => {
    switch (metric) {
      case 'creditScore': return company?.creditScore?.toString();
      case 'revenue': return company?.revenue;
      case 'debtRatio': return company?.debtRatio?.toFixed(2);
      case 'profitability': return company?.profitability;
      case 'liquidity': return company?.liquidity?.toFixed(1);
      default: return '-';
    }
  };

  const getRankPosition = (targetValue, metric) => {
    const values = peerData?.map(company => getMetricValue(company, metric));
    const sortedValues = [...values]?.sort((a, b) => {
      // For debt ratio, lower is better
      if (metric === 'debtRatio') return a - b;
      // For others, higher is better
      return b - a;
    });
    const rank = sortedValues?.indexOf(targetValue) + 1;
    return { rank, total: values?.length };
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Low': return 'text-success bg-success/10';
      case 'Medium': return 'text-warning bg-warning/10';
      case 'High': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const targetCompany = peerData?.find(company => company?.isTarget);
  const targetRank = getRankPosition(getMetricValue(targetCompany, comparisonMetric), comparisonMetric);
  const benchmark = industryBenchmarks?.[comparisonMetric];

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">Peer Comparison</h3>
        <div className="flex items-center space-x-3">
          <Select
            options={comparisonMetricOptions}
            value={comparisonMetric}
            onChange={setComparisonMetric}
            className="w-40"
          />
          <Select
            options={industryFilterOptions}
            value={industryFilter}
            onChange={setIndustryFilter}
            className="w-32"
          />
        </div>
      </div>
      {/* Performance Summary */}
      <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-card-foreground">Performance Ranking</h4>
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              #{targetRank?.rank} of {targetRank?.total}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 text-center text-sm">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Your Score</div>
            <div className="font-bold text-card-foreground">
              {getMetricDisplay(targetCompany, comparisonMetric)}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Industry Avg</div>
            <div className="font-bold text-card-foreground">
              {typeof benchmark?.average === 'number' ? benchmark?.average?.toFixed(1) : benchmark?.average}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Top Quartile</div>
            <div className="font-bold text-success">
              {typeof benchmark?.percentile75 === 'number' ? benchmark?.percentile75?.toFixed(1) : benchmark?.percentile75}
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Median</div>
            <div className="font-bold text-card-foreground">
              {typeof benchmark?.median === 'number' ? benchmark?.median?.toFixed(1) : benchmark?.median}
            </div>
          </div>
        </div>
      </div>
      {/* Peer Comparison Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-card-foreground">Company</th>
                <th className="text-center p-4 text-sm font-semibold text-card-foreground">
                  {comparisonMetricOptions?.find(opt => opt?.value === comparisonMetric)?.label}
                </th>
                <th className="text-center p-4 text-sm font-semibold text-card-foreground">Market Cap</th>
                <th className="text-center p-4 text-sm font-semibold text-card-foreground">Risk Level</th>
                <th className="text-center p-4 text-sm font-semibold text-card-foreground">Trend</th>
                <th className="text-center p-4 text-sm font-semibold text-card-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {peerData?.map((company, index) => (
                <tr 
                  key={company?.id} 
                  className={`border-t border-border ${
                    company?.isTarget ? 'bg-primary/5' : 'hover:bg-muted/30'
                  }`}
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      {company?.isTarget && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                      <div>
                        <div className="font-medium text-card-foreground">
                          {company?.name}
                          {company?.isTarget && (
                            <span className="ml-2 text-xs text-primary font-semibold">(You)</span>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {company?.employees} employees
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="font-semibold text-card-foreground">
                      {getMetricDisplay(company, comparisonMetric)}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <div className="text-sm text-card-foreground">{company?.marketCap}</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(company?.riskLevel)}`}>
                      {company?.riskLevel}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <Icon 
                      name={getTrendIcon(company?.trend)} 
                      size={16} 
                      className={getTrendColor(company?.trend)}
                    />
                  </td>
                  <td className="p-4 text-center">
                    <Button variant="ghost" size="xs" iconName="BarChart3">
                      Compare
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Detailed Comparison */}
      <div className="grid grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="p-4 bg-success/5 rounded-lg border border-success/20">
          <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
            <Icon name="CheckCircle" size={16} className="text-success mr-2" />
            Competitive Strengths
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Debt Management</span>
              <span className="text-success font-medium">Above Average</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Liquidity Position</span>
              <span className="text-success font-medium">Top Quartile</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Credit Score</span>
              <span className="text-success font-medium">Above Median</span>
            </div>
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
          <h4 className="text-sm font-semibold text-card-foreground mb-3 flex items-center">
            <Icon name="AlertTriangle" size={16} className="text-warning mr-2" />
            Areas for Improvement
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Revenue Growth</span>
              <span className="text-warning font-medium">Below Leaders</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Profitability</span>
              <span className="text-warning font-medium">Room to Improve</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-card-foreground">Market Position</span>
              <span className="text-warning font-medium">Mid-tier</span>
            </div>
          </div>
        </div>
      </div>
      {/* Export Options */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-xs text-muted-foreground">
          Comparison based on latest available data • Updated 2 hours ago
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export Report
          </Button>
          <Button variant="outline" size="sm" iconName="Share2">
            Share Analysis
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PeerComparison;