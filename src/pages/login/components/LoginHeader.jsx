import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-6 mb-8">
      {/* Company Logo */}
      <div className="flex items-center justify-center space-x-3">
        <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl shadow-lg">
          <Icon name="TrendingUp" size={24} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-text-primary">CreditLens Pro</h1>
          <p className="text-sm text-muted-foreground">Credit Intelligence Platform</p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-text-primary">
          Welcome Back
        </h2>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Sign in to access your credit intelligence dashboard and analytical tools
        </p>
      </div>

      {/* Status Indicator */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
        <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
        <span className="text-xs font-medium text-success">All Systems Operational</span>
      </div>
    </div>
  );
};

export default LoginHeader;