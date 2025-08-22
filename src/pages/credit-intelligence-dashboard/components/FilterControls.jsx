import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ onFiltersChange, isCollapsed, onToggleCollapse }) => {
  const [filters, setFilters] = useState({
    dateRange: '30d',
    industry: 'all',
    scoreRange: 'all',
    riskCategory: 'all'
  });

  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'custom', label: 'Custom range' }
  ];

  const industryOptions = [
    { value: 'all', label: 'All Industries' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Financial Services' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'energy', label: 'Energy' }
  ];

  const scoreRangeOptions = [
    { value: 'all', label: 'All Scores' },
    { value: 'excellent', label: 'Excellent (750+)' },
    { value: 'good', label: 'Good (650-749)' },
    { value: 'fair', label: 'Fair (550-649)' },
    { value: 'poor', label: 'Poor (<550)' }
  ];

  const riskCategoryOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'low', label: 'Low Risk' },
    { value: 'medium', label: 'Medium Risk' },
    { value: 'high', label: 'High Risk' },
    { value: 'critical', label: 'Critical Risk' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: '30d',
      industry: 'all',
      scoreRange: 'all',
      riskCategory: 'all'
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== 'all' && value !== '30d');

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
          {hasActiveFilters && (
            <div className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
              Active
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <Icon name="RotateCcw" size={16} />
              Reset
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onToggleCollapse}>
            <Icon name={isCollapsed ? 'ChevronDown' : 'ChevronUp'} size={16} />
          </Button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Date Range"
            options={dateRangeOptions}
            value={filters?.dateRange}
            onChange={(value) => handleFilterChange('dateRange', value)}
          />
          
          <Select
            label="Industry"
            options={industryOptions}
            value={filters?.industry}
            onChange={(value) => handleFilterChange('industry', value)}
            searchable
          />
          
          <Select
            label="Score Range"
            options={scoreRangeOptions}
            value={filters?.scoreRange}
            onChange={(value) => handleFilterChange('scoreRange', value)}
          />
          
          <Select
            label="Risk Category"
            options={riskCategoryOptions}
            value={filters?.riskCategory}
            onChange={(value) => handleFilterChange('riskCategory', value)}
          />
        </div>
      )}
      {!isCollapsed && filters?.dateRange === 'custom' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <Input
            label="Start Date"
            type="date"
            placeholder="Select start date"
          />
          <Input
            label="End Date"
            type="date"
            placeholder="Select end date"
          />
        </div>
      )}
    </div>
  );
};

export default FilterControls;