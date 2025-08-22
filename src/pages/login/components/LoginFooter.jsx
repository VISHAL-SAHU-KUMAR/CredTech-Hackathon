import React from 'react';
import Button from '../../../components/ui/Button';

const LoginFooter = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Support', href: '#support' },
    { label: 'Documentation', href: '#docs' }
  ];

  const handleLinkClick = (href) => {
    // Mock navigation for footer links
    console.log(`Navigating to: ${href}`);
    alert(`This would navigate to the ${href?.replace('#', '')} page.`);
  };

  return (
    <footer className="mt-12 space-y-6">
      {/* Footer Links */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        {footerLinks?.map((link, index) => (
          <React.Fragment key={link?.href}>
            <Button
              variant="link"
              onClick={() => handleLinkClick(link?.href)}
              className="text-xs text-muted-foreground hover:text-text-primary p-0 h-auto"
            >
              {link?.label}
            </Button>
            {index < footerLinks?.length - 1 && (
              <span className="text-muted-foreground">•</span>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Copyright */}
      <div className="text-center space-y-2">
        <p className="text-xs text-muted-foreground">
          © {currentYear} CreditLens Pro. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Enterprise-grade credit intelligence and risk assessment platform
        </p>
      </div>
      {/* Version Info */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Version 2.1.4 • Last updated: August 2025
        </p>
      </div>
    </footer>
  );
};

export default LoginFooter;