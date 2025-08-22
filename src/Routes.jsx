import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import EntityCreditAssessment from './pages/entity-credit-assessment';
import DataSourcesManagement from './pages/data-sources-management';
import Login from './pages/login';
import ModelPerformanceAnalytics from './pages/model-performance-analytics';
import PortfolioRiskMonitoring from './pages/portfolio-risk-monitoring';
import CreditIntelligenceDashboard from './pages/credit-intelligence-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CreditIntelligenceDashboard />} />
        <Route path="/entity-credit-assessment" element={<EntityCreditAssessment />} />
        <Route path="/data-sources-management" element={<DataSourcesManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/model-performance-analytics" element={<ModelPerformanceAnalytics />} />
        <Route path="/portfolio-risk-monitoring" element={<PortfolioRiskMonitoring />} />
        <Route path="/credit-intelligence-dashboard" element={<CreditIntelligenceDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
