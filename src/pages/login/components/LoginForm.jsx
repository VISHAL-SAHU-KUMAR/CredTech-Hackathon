import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // Mock credentials for different user types
  const mockCredentials = [
    { email: 'john.analyst@creditlens.com', password: 'CreditAnalyst2025!', role: 'Senior Credit Analyst' },
    { email: 'sarah.manager@creditlens.com', password: 'RiskManager2025!', role: 'Credit Risk Manager' },
    { email: 'mike.scientist@creditlens.com', password: 'DataScience2025!', role: 'Data Scientist' },
    { email: 'lisa.compliance@creditlens.com', password: 'Compliance2025!', role: 'Compliance Officer' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear specific error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check against mock credentials
      const validCredential = mockCredentials?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (validCredential) {
        // Store user session data
        localStorage.setItem('creditlens_user', JSON.stringify({
          email: validCredential?.email,
          role: validCredential?.role,
          loginTime: new Date()?.toISOString(),
          rememberMe: formData?.rememberMe
        }));

        // Successful login - redirect to dashboard
        navigate('/credit-intelligence-dashboard');
      } else {
        setLoginAttempts(prev => prev + 1);
        
        if (loginAttempts >= 2) {
          setErrors({
            general: `Account temporarily locked after ${loginAttempts + 1} failed attempts. Please try again in 15 minutes or contact support.`
          });
        } else {
          setErrors({
            general: `Invalid email or password. Please use valid credentials:\n• john.analyst@creditlens.com / CreditAnalyst2025!\n• sarah.manager@creditlens.com / RiskManager2025!\n• mike.scientist@creditlens.com / DataScience2025!\n• lisa.compliance@creditlens.com / Compliance2025!`
          });
        }
      }
    } catch (error) {
      setErrors({
        general: 'Authentication service temporarily unavailable. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // Mock forgot password flow
    alert('Password reset instructions would be sent to your registered email address.');
  };

  const handleRequestAccess = () => {
    // Mock access request flow
    alert('Access request form would be displayed for new users to request platform access.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Error Message */}
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-error">Authentication Failed</p>
                <p className="text-sm text-error/80 mt-1 whitespace-pre-line">{errors?.general}</p>
              </div>
            </div>
          </div>
        )}

        {/* Email Field */}
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder="Enter your work email"
          error={errors?.email}
          required
          disabled={isLoading}
          className="w-full"
        />

        {/* Password Field */}
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData?.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            error={errors?.password}
            required
            disabled={isLoading}
            className="w-full pr-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-8 h-8 w-8"
            disabled={isLoading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={16} />
          </Button>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            name="rememberMe"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="link"
            onClick={handleForgotPassword}
            disabled={isLoading}
            className="text-sm"
          >
            Forgot password?
          </Button>
        </div>

        {/* Sign In Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          disabled={isLoading || loginAttempts >= 3}
          fullWidth
          iconName="LogIn"
          iconPosition="right"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Button>

        {/* Request Access */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don't have access?{' '}
            <Button
              type="button"
              variant="link"
              onClick={handleRequestAccess}
              disabled={isLoading}
              className="text-sm p-0 h-auto"
            >
              Request Access
            </Button>
          </p>
        </div>

        {/* Security Notice */}
        <div className="mt-6 p-3 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Shield" size={16} className="text-accent mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-xs font-medium text-text-primary">Secure Connection</p>
              <p className="text-xs text-muted-foreground">
                Your connection is encrypted and protected by enterprise-grade security.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;