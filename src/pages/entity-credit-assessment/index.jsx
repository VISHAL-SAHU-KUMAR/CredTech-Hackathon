import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import EntityOverview from './components/EntityOverview';
import CreditScoringEngine from './components/CreditScoringEngine';
import ExplainableAI from './components/ExplainableAI';
import PlainLanguageExplanations from './components/PlainLanguageExplanations';
import NewsImpactAnalysis from './components/NewsImpactAnalysis';
import PeerComparison from './components/PeerComparison';

const EntityCreditAssessment = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState(742);

  // Mock entity data
  const entityData = {
    id: 'TC-2024-001',
    name: 'TechCorp Inc.',
    industry: 'Technology Software',
    founded: '2018',
    revenue: '$125M',
    employees: '5,200',
    currentScore: currentScore,
    scoreChange: 8,
    riskLevel: 'Low',
    lastUpdated: 'Dec 22, 2025 at 3:35 PM',
    scoreHistory: [698, 705, 712, 718, 725, 731, 738, 742]
  };

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScoreUpdate = (newScore) => {
    setCurrentScore(newScore);
  };

  const handleGenerateReport = () => {
    console.log('Generating comprehensive credit report...');
    // Report generation logic would go here
  };

  const handleSetAlert = () => {
    console.log('Setting up credit score alert...');
    // Alert setup logic would go here
  };

  return (
    <>
      <Helmet>
        <title>Entity Credit Assessment - CreditLens Pro</title>
        <meta name="description" content="Comprehensive creditworthiness analysis with explainable AI insights and real-time scoring for TechCorp Inc." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header 
          onMenuToggle={handleMobileMenuToggle}
          isMenuOpen={isMobileMenuOpen}
        />

        {/* Sidebar */}
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggle={handleSidebarToggle}
        />

        {/* Main Content */}
        <main className={`pt-16 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Entity Credit Assessment</h1>
                  <p className="text-text-secondary mt-2">
                    Comprehensive creditworthiness analysis with explainable AI insights
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg">
                    <div className="w-2 h-2 bg-success rounded-full status-pulse"></div>
                    <span className="text-sm font-medium text-success">Real-time Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Three-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Panel - Entity Overview */}
              <div className="lg:col-span-3">
                <EntityOverview 
                  entity={entityData}
                  onGenerateReport={handleGenerateReport}
                  onSetAlert={handleSetAlert}
                />
              </div>

              {/* Center Section - Main Assessment Area */}
              <div className="lg:col-span-6 space-y-6">
                {/* Credit Scoring Engine */}
                <CreditScoringEngine 
                  entity={entityData}
                  onScoreUpdate={handleScoreUpdate}
                />

                {/* Explainable AI Visualizations */}
                <ExplainableAI entity={entityData} />
              </div>

              {/* Right Panel - Explanations and Analysis */}
              <div className="lg:col-span-3">
                <PlainLanguageExplanations 
                  entity={entityData}
                  currentScore={currentScore}
                />
              </div>
            </div>

            {/* Bottom Section - Additional Analysis */}
            <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* News Impact Analysis */}
              <div className="bg-card rounded-lg border border-border p-6">
                <NewsImpactAnalysis entity={entityData} />
              </div>

              {/* Peer Comparison */}
              <div className="bg-card rounded-lg border border-border p-6">
                <PeerComparison entity={entityData} />
              </div>
            </div>

            {/* Export and Actions Footer */}
            <div className="mt-8 p-6 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-card-foreground">Assessment Complete</h3>
                  <p className="text-sm text-muted-foreground">
                    Analysis updated {entityData?.lastUpdated} • Next refresh in 15 minutes
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                    Export Full Report
                  </button>
                  <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors">
                    Schedule Review
                  </button>
                  <button className="px-4 py-2 border border-border text-card-foreground rounded-lg font-medium hover:bg-muted transition-colors">
                    Share Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default EntityCreditAssessment;