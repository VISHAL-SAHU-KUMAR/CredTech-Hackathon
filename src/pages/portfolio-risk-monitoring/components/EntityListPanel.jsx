import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const EntityListPanel = ({ entities, selectedEntities, onEntitySelect, onBulkAction }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [scoreRangeFilter, setScoreRangeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [savedFilterPreset, setSavedFilterPreset] = useState('');

  const industryOptions = [
    { value: '', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'energy', label: 'Energy' }
  ];

  const riskOptions = [
    { value: '', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' },
    { value: 'critical', label: 'Critical Risk' }
  ];

  const scoreRangeOptions = [
    { value: '', label: 'All Scores' },
    { value: '800-850', label: '800-850 (Excellent)' },
    { value: '750-799', label: '750-799 (Very Good)' },
    { value: '700-749', label: '700-749 (Good)' },
    { value: '650-699', label: '650-699 (Fair)' },
    { value: '600-649', label: '600-649 (Poor)' },
    { value: '300-599', label: '300-599 (Very Poor)' }
  ];

  const regionOptions = [
    { value: '', label: 'All Regions' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east-africa', label: 'Middle East & Africa' }
  ];

  const presetOptions = [
    { value: '', label: 'No Preset' },
    { value: 'high-risk-entities', label: 'High Risk Entities' },
    { value: 'recent-downgrades', label: 'Recent Downgrades' },
    { value: 'tech-sector', label: 'Technology Sector' },
    { value: 'large-exposure', label: 'Large Exposure' },
    { value: 'watch-list', label: 'Watch List' }
  ];

  const filteredEntities = useMemo(() => {
    return entities?.filter(entity => {
      const matchesSearch = entity?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                           entity?.ticker?.toLowerCase()?.includes(searchQuery?.toLowerCase());
      const matchesIndustry = !industryFilter || entity?.industry === industryFilter;
      const matchesRisk = !riskFilter || entity?.riskCategory === riskFilter;
      const matchesRegion = !regionFilter || entity?.region === regionFilter;
      
      let matchesScore = true;
      if (scoreRangeFilter) {
        const [min, max] = scoreRangeFilter?.split('-')?.map(Number);
        matchesScore = entity?.currentScore >= min && entity?.currentScore <= max;
      }

      return matchesSearch && matchesIndustry && matchesRisk && matchesScore && matchesRegion;
    });
  }, [entities, searchQuery, industryFilter, riskFilter, scoreRangeFilter, regionFilter]);

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-success/10 text-success border-success/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'high': return 'bg-error/10 text-error border-error/20';
      case 'critical': return 'bg-destructive/10 text-destructive border-destructive/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { name: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { name: 'TrendingDown', color: 'text-error' };
    return { name: 'Minus', color: 'text-muted-foreground' };
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onEntitySelect(filteredEntities?.map(e => e?.id));
    } else {
      onEntitySelect([]);
    }
  };

  const isAllSelected = filteredEntities?.length > 0 && 
    filteredEntities?.every(entity => selectedEntities?.includes(entity?.id));

  const clearFilters = () => {
    setSearchQuery('');
    setIndustryFilter('');
    setRiskFilter('');
    setScoreRangeFilter('');
    setRegionFilter('');
    setSavedFilterPreset('');
  };

  return (
    <div className="h-full flex flex-col bg-surface border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-text-primary">Portfolio Entities</h2>
          <span className="text-sm text-muted-foreground">
            {filteredEntities?.length} of {entities?.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Input
            type="search"
            placeholder="Search entities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <Select
            placeholder="Filter by preset"
            options={presetOptions}
            value={savedFilterPreset}
            onChange={setSavedFilterPreset}
          />
          
          <div className="grid grid-cols-1 gap-2">
            <Select
              placeholder="Industry"
              options={industryOptions}
              value={industryFilter}
              onChange={setIndustryFilter}
            />
            <Select
              placeholder="Risk Level"
              options={riskOptions}
              value={riskFilter}
              onChange={setRiskFilter}
            />
            <Select
              placeholder="Score Range"
              options={scoreRangeOptions}
              value={scoreRangeFilter}
              onChange={setScoreRangeFilter}
            />
            <Select
              placeholder="Region"
              options={regionOptions}
              value={regionFilter}
              onChange={setRegionFilter}
            />
          </div>

          {(searchQuery || industryFilter || riskFilter || scoreRangeFilter || regionFilter) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="w-full"
            >
              <Icon name="X" size={14} className="mr-2" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedEntities?.length > 0 && (
        <div className="p-4 bg-accent/5 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-text-primary">
              {selectedEntities?.length} selected
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEntitySelect([])}
            >
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('generate-report')}
            >
              <Icon name="FileText" size={14} className="mr-1" />
              Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('configure-alerts')}
            >
              <Icon name="Bell" size={14} className="mr-1" />
              Alerts
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBulkAction('retrain-models')}
            >
              <Icon name="RefreshCw" size={14} className="mr-1" />
              Retrain
            </Button>
          </div>
        </div>
      )}
      {/* Entity List */}
      <div className="flex-1 overflow-y-auto">
        {/* Select All */}
        {filteredEntities?.length > 0 && (
          <div className="p-4 border-b border-border">
            <Checkbox
              label="Select all entities"
              checked={isAllSelected}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
            />
          </div>
        )}

        {/* Entities */}
        <div className="space-y-1 p-2">
          {filteredEntities?.map((entity) => {
            const isSelected = selectedEntities?.includes(entity?.id);
            const trendIcon = getTrendIcon(entity?.scoreChange);

            return (
              <div
                key={entity?.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                  isSelected ? 'bg-accent/10 border-accent' : 'bg-surface border-border'
                }`}
                onClick={() => {
                  if (isSelected) {
                    onEntitySelect(selectedEntities?.filter(id => id !== entity?.id));
                  } else {
                    onEntitySelect([...selectedEntities, entity?.id]);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-text-primary truncate">
                      {entity?.name}
                    </h3>
                    {entity?.ticker && (
                      <p className="text-xs text-muted-foreground">{entity?.ticker}</p>
                    )}
                  </div>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => {}}
                    className="ml-2"
                  />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-semibold text-text-primary">
                    {entity?.currentScore}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name={trendIcon?.name} size={14} className={trendIcon?.color} />
                    <span className={`text-xs font-medium ${trendIcon?.color}`}>
                      {Math.abs(entity?.scoreChange)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskBadgeColor(entity?.riskCategory)}`}>
                    {entity?.riskCategory?.charAt(0)?.toUpperCase() + entity?.riskCategory?.slice(1)} Risk
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {entity?.industry}
                  </span>
                </div>
                {entity?.hasAlerts && (
                  <div className="mt-2 flex items-center space-x-1">
                    <Icon name="AlertTriangle" size={12} className="text-warning" />
                    <span className="text-xs text-warning">Active Alerts</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredEntities?.length === 0 && (
          <div className="p-8 text-center">
            <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No entities found</p>
            <p className="text-xs text-muted-foreground mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityListPanel;