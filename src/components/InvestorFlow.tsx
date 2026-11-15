
"use client";

/**
 * AI-powered investor flow with comprehensive investment preferences in tabbed interface
 */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ROICalculator } from './ROICalculator';

interface InvestorPreferences {
  investmentPreferences: {
    preferredLocation: string;
    cityTier: string;
    minBudget: string;
    maxBudget: string;
  };
  investmentStrategy: {
    propertyTypes: string[];
    investmentGoal: string;
    minROI: string;
    maxROI: string;
    riskLevel: string;
  };
  investmentTimeline: {
    timeHorizon: string;
    strategyDetails: string;
  };
}

const FlowHeader = ({ showBackButton, onBack, title }: { showBackButton: boolean; onBack: () => void; title: string }) => (
    <div className="flex items-center gap-4 mb-8">
        {showBackButton && (
            <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft />
            </Button>
        )}
        <h2 className="text-2xl font-bold">{title}</h2>
    </div>
)

export const InvestorFlow: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'preferences' | 'strategy' | 'timeline' | 'calculator'>('preferences');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  const [preferences, setPreferences] = useState<InvestorPreferences>({
    investmentPreferences: {
      preferredLocation: '',
      cityTier: '',
      minBudget: '',
      maxBudget: ''
    },
    investmentStrategy: {
      propertyTypes: [],
      investmentGoal: '',
      minROI: '',
      maxROI: '',
      riskLevel: ''
    },
    investmentTimeline: {
      timeHorizon: '',
      strategyDetails: ''
    }
  });

  const cityTiers = [
    'Tier 1 (Metro Cities)',
    'Tier 2 (Major Cities)', 
    'Tier 3 (Smaller Cities)'
  ];

  const propertyTypes = [
    'Apartment', 'Independent House', 'Villa', 'Plot',
    'Office Space', 'Retail Shop', 'Showroom', 'Warehouse',
    'Mixed-Use Development', 'Co-working Space',
    'Residential Plot', 'Commercial Land', 'Agricultural Land'
  ];

  const investmentGoals = [
    'Capital Appreciation',
    'Rental Income',
    'Portfolio Diversification',
    'Tax Benefits',
    'Retirement Planning'
  ];

  const riskLevels = [
    { value: 'low', label: 'Low Risk', color: '🟢', description: 'Stable returns, prime locations' },
    { value: 'medium', label: 'Medium Risk', color: '🟡', description: 'Balanced portfolio, emerging areas' },
    { value: 'high', label: 'High Risk', color: '🔴', description: 'High-growth potential, developing areas' }
  ];

  const timeHorizons = [
    'Short Term (1-3 years)',
    'Medium Term (3-7 years)',
    'Long Term (7-15 years)',
    'Very Long Term (15+ years)'
  ];

  const handleLocationChange = (field: keyof InvestorPreferences['investmentPreferences'], value: string) => {
    setPreferences(prev => ({
      ...prev,
      investmentPreferences: { ...prev.investmentPreferences, [field]: value }
    }));
  };

  const handleStrategyChange = (field: keyof InvestorPreferences['investmentStrategy'], value: string | string[]) => {
    setPreferences(prev => ({
      ...prev,
      investmentStrategy: { ...prev.investmentStrategy, [field]: value }
    }));
  };

  const handleTimelineChange = (field: keyof InvestorPreferences['investmentTimeline'], value: string) => {
    setPreferences(prev => ({
      ...prev,
      investmentTimeline: { ...prev.investmentTimeline, [field]: value }
    }));
  };

  const handlePropertyTypeToggle = (propertyType: string) => {
    setPreferences(prev => ({
      ...prev,
      investmentStrategy: {
        ...prev.investmentStrategy,
        propertyTypes: prev.investmentStrategy.propertyTypes.includes(propertyType)
          ? prev.investmentStrategy.propertyTypes.filter(pt => pt !== propertyType)
          : [...prev.investmentStrategy.propertyTypes, propertyType]
      }
    }));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    toast({
        title: 'Preferences Saved',
        description: 'Redirecting to investment opportunities.',
    });
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const params = new URLSearchParams();
    if (preferences.investmentPreferences.preferredLocation) {
        params.set('q', preferences.investmentPreferences.preferredLocation);
    }
    if (preferences.investmentStrategy.propertyTypes.length > 0) {
        params.set('type', preferences.investmentStrategy.propertyTypes[0]);
    }
    if (preferences.investmentPreferences.maxBudget) {
        params.set('maxPrice', preferences.investmentPreferences.maxBudget);
    }
    
    router.push(`/properties?${params.toString()}`);
    setIsSaving(false);
  };

  const renderInvestmentPreferences = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Location/City *</label>
          <Input
            type="text"
            placeholder="Enter preferred location or city"
            className="bg-background"
            value={preferences.investmentPreferences.preferredLocation}
            onChange={(e) => handleLocationChange('preferredLocation', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">City Tier *</label>
          <Select onValueChange={(value) => handleLocationChange('cityTier', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select city tier" />
            </SelectTrigger>
            <SelectContent>
              {cityTiers.map((tier) => (
                <SelectItem key={tier} value={tier}>{tier}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: 'Minimum Investment Budget (&#8377;) *' }} />
          <Input
            type="number"
            placeholder="Enter minimum budget"
            className="bg-background"
            value={preferences.investmentPreferences.minBudget}
            onChange={(e) => handleLocationChange('minBudget', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: 'Maximum Investment Budget (&#8377;) *' }} />
          <Input
            type="number"
            placeholder="Enter maximum budget"
            className="bg-background"
            value={preferences.investmentPreferences.maxBudget}
            onChange={(e) => handleLocationChange('maxBudget', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderInvestmentStrategy = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-3">Property Types *</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => handlePropertyTypeToggle(type)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                preferences.investmentStrategy.propertyTypes.includes(type)
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-muted dark:hover:bg-primary/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Investment Goal *</label>
          <Select onValueChange={(value) => handleStrategyChange('investmentGoal', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select investment goal" />
            </SelectTrigger>
            <SelectContent>
              {investmentGoals.map((goal) => (
                <SelectItem key={goal} value={goal}>{goal}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Risk Level Preference *</label>
          <Select onValueChange={(value) => handleStrategyChange('riskLevel', value)}>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select risk level" />
            </SelectTrigger>
            <SelectContent>
              {riskLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  <div className="flex items-center space-x-2">
                    <span>{level.color}</span>
                    <span>{level.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Minimum ROI (% per year) *</label>
          <Input
            type="number"
            placeholder="Enter minimum ROI"
            className="bg-background"
            value={preferences.investmentStrategy.minROI}
            onChange={(e) => handleStrategyChange('minROI', e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Maximum ROI (% per year) *</label>
          <Input
            type="number"
            placeholder="Enter maximum ROI"
            className="bg-background"
            value={preferences.investmentStrategy.maxROI}
            onChange={(e) => handleStrategyChange('maxROI', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderInvestmentTimeline = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Investment Timeline (Time Horizon) *</label>
        <Select onValueChange={(value) => handleTimelineChange('timeHorizon', value)}>
          <SelectTrigger className="bg-background">
            <SelectValue placeholder="Select investment timeline" />
          </SelectTrigger>
          <SelectContent>
            {timeHorizons.map((horizon) => (
              <SelectItem key={horizon} value={horizon}>{horizon}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Investment Strategy Details</label>
        <textarea
          placeholder="Describe your investment strategy, specific criteria, exit planning, or additional considerations..."
          className="w-full px-4 py-3 bg-background border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all min-h-[120px]"
          value={preferences.investmentTimeline.strategyDetails}
          onChange={(e) => handleTimelineChange('strategyDetails', e.target.value)}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={onBack} title="Investment Preferences" />
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Investment Preferences</h2>
            <p className="text-muted-foreground">Configure your investment strategy and preferences</p>
          </div>

          <div className="bg-card border rounded-2xl overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('preferences')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-all ${
                  activeTab === 'preferences'
                    ? 'bg-secondary text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                📍 Investment Preferences
              </button>
              <button
                onClick={() => setActiveTab('strategy')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-all ${
                  activeTab === 'strategy'
                    ? 'bg-secondary text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                🎯 Investment Strategy
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-all ${
                  activeTab === 'timeline'
                    ? 'bg-secondary text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                ⏰ Investment Timeline
              </button>
               <button
                onClick={() => setActiveTab('calculator')}
                className={`flex-1 px-6 py-4 text-center font-medium transition-all ${
                  activeTab === 'calculator'
                    ? 'bg-secondary text-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:bg-muted/50'
                }`}
              >
                🧮 ROI Calculator
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'preferences' && renderInvestmentPreferences()}
              {activeTab === 'strategy' && renderInvestmentStrategy()}
              {activeTab === 'timeline' && renderInvestmentTimeline()}
              {activeTab === 'calculator' && <ROICalculator />}
            </div>

            {activeTab !== 'calculator' && (
              <div className="px-8 pb-8 flex justify-end items-center">
                <Button onClick={handleSavePreferences} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding Opportunities...
                    </>
                  ) : (
                    'Find Investment Opportunities'
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
