import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ErrorLogsPanel = ({ logs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'error', label: 'Error' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' }
  ];

  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'yahoo-finance', label: 'Yahoo Finance' },
    { value: 'mca-filings', label: 'MCA Filings' },
    { value: 'news-feeds', label: 'News Feeds' },
    { value: 'internal-db', label: 'Internal Database' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error';
      case 'error': return 'text-error';
      case 'warning': return 'text-warning';
      case 'info': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'error': return 'XCircle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Circle';
    }
  };

  const filteredLogs = logs?.filter(log => {
    const matchesSearch = log?.message?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         log?.source?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || log?.severity === severityFilter;
    const matchesSource = sourceFilter === 'all' || log?.source === sourceFilter;
    
    return matchesSearch && matchesSeverity && matchesSource;
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-card-foreground">Error Logs</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Export
          </Button>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconPosition="left">
            Refresh
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />
        <Select
          options={severityOptions}
          value={severityFilter}
          onChange={setSeverityFilter}
          placeholder="Filter by severity"
        />
        <Select
          options={sourceOptions}
          value={sourceFilter}
          onChange={setSourceFilter}
          placeholder="Filter by source"
        />
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredLogs?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Search" size={24} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No logs found matching your criteria</p>
          </div>
        ) : (
          filteredLogs?.map((log) => (
            <div key={log?.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={getSeverityIcon(log?.severity)} 
                    size={16} 
                    className={getSeverityColor(log?.severity)} 
                  />
                  <div>
                    <p className="font-medium text-card-foreground">{log?.message}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">Source: {log?.source}</span>
                      <span className="text-xs text-muted-foreground">Time: {log?.timestamp}</span>
                      <span className={`text-xs font-medium ${getSeverityColor(log?.severity)}`}>
                        {log?.severity?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" iconName="ExternalLink" iconPosition="left">
                  Details
                </Button>
              </div>
              
              {log?.details && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground font-mono">{log?.details}</p>
                </div>
              )}
              
              {log?.stackTrace && (
                <div className="mt-2">
                  <Button variant="ghost" size="sm" className="text-xs">
                    <Icon name="Code" size={12} className="mr-1" />
                    View Stack Trace
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ErrorLogsPanel;