import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import ComplianceBadges from './components/ComplianceBadges';
import LoginFooter from './components/LoginFooter';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem('creditlens_user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        // Check if session is still valid (24 hours for remember me, 8 hours otherwise)
        const loginTime = new Date(user.loginTime);
        const now = new Date();
        const sessionDuration = user?.rememberMe ? 24 * 60 * 60 * 1000 : 8 * 60 * 60 * 1000;
        
        if (now - loginTime < sessionDuration) {
          navigate('/credit-intelligence-dashboard');
        } else {
          // Session expired, clear storage
          localStorage.removeItem('creditlens_user');
        }
      } catch (error) {
        // Invalid user data, clear storage
        localStorage.removeItem('creditlens_user');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Main Content Container */}
      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Login Form */}
          <div className="order-2 lg:order-1">
            <div className="w-full max-w-md mx-auto">
              {/* Login Card */}
              <div className="bg-surface border border-border rounded-2xl shadow-xl p-8">
                <LoginHeader />
                <LoginForm />
              </div>
            </div>
          </div>

          {/* Right Side - Compliance & Trust Signals */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              {/* Hero Content */}
              <div className="text-center lg:text-left space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-text-primary leading-tight">
                  Intelligent Credit
                  <span className="block text-primary">Risk Assessment</span>
                </h1>
                <p className="text-lg text-muted-foreground max-w-lg">
                  Empower your lending decisions with AI-driven credit intelligence, 
                  real-time risk monitoring, and explainable analytics.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3 p-4 bg-surface/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Real-time Analytics</h3>
                    <p className="text-sm text-muted-foreground">Live credit scoring and risk monitoring</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-surface/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Explainable AI</h3>
                    <p className="text-sm text-muted-foreground">Transparent decision-making process</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-surface/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Multi-source Data</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive data integration</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-surface/50 rounded-lg border border-border/50">
                  <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg flex-shrink-0">
                    <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">Regulatory Compliance</h3>
                    <p className="text-sm text-muted-foreground">Built for financial regulations</p>
                  </div>
                </div>
              </div>

              {/* Compliance Badges */}
              <div className="bg-surface/50 border border-border/50 rounded-xl p-6">
                <ComplianceBadges />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16">
          <LoginFooter />
        </div>
      </div>
    </div>
  );
};

export default Login;