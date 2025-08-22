import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceBadges = () => {
  const complianceCertifications = [
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      icon: 'Shield',
      description: 'Security, Availability & Confidentiality'
    },
    {
      id: 'pci',
      name: 'PCI DSS',
      icon: 'CreditCard',
      description: 'Payment Card Industry Compliance'
    },
    {
      id: 'iso',
      name: 'ISO 27001',
      icon: 'Award',
      description: 'Information Security Management'
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      icon: 'Lock',
      description: 'Data Protection Regulation'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Trust Signals Header */}
      <div className="text-center">
        <h3 className="text-sm font-semibold text-text-primary mb-2">
          Enterprise Security & Compliance
        </h3>
        <p className="text-xs text-muted-foreground">
          Your data is protected by industry-leading security standards
        </p>
      </div>
      {/* Compliance Badges Grid */}
      <div className="grid grid-cols-2 gap-3">
        {complianceCertifications?.map((cert) => (
          <div
            key={cert?.id}
            className="flex items-center space-x-2 p-3 bg-surface border border-border rounded-lg hover:bg-muted/50 transition-smooth group"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-smooth">
              <Icon name={cert?.icon} size={14} className="text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-text-primary truncate">
                {cert?.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {cert?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Security Features */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Icon name="Zap" size={12} className="text-success" />
          <span className="text-xs text-muted-foreground">256-bit SSL encryption</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={12} className="text-success" />
          <span className="text-xs text-muted-foreground">Session timeout protection</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="UserCheck" size={12} className="text-success" />
          <span className="text-xs text-muted-foreground">Multi-factor authentication</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Database" size={12} className="text-success" />
          <span className="text-xs text-muted-foreground">Encrypted data storage</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceBadges;