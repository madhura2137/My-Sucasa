
"use client";

/**
 * AI-powered buyer flow with first-time buyer detection and property preferences
 */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type BuyerStep = 'firstTime' | 'process' | 'preferences';

interface BuyerPreferences {
  locationPreferences: {
    cityTier: string;
    preferredLocation: string;
  };
  propertyRequirements: {
    propertyType: string;
    bedrooms: string;
    minPrice: string;
    maxPrice: string;
  };
  purchasePreferences: {
    purpose: string;
    timeline: string;
    amenities: string[];
    nearbyFacilities: string[];
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

export const BuyerFlow: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<BuyerStep>('firstTime');
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  const [preferences, setPreferences] = useState<BuyerPreferences>({
    locationPreferences: {
      cityTier: '',
      preferredLocation: ''
    },
    propertyRequirements: {
      propertyType: '',
      bedrooms: '',
      minPrice: '',
      maxPrice: ''
    },
    purchasePreferences: {
      purpose: '',
      timeline: '',
      amenities: [],
      nearbyFacilities: []
    }
  });

  const amenityOptions = [
    'Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security', 'Power Backup',
    'Lift', 'Club House', 'Children Play Area', 'Jogging Track'
  ];

  const facilityOptions = [
    'School', 'Hospital', 'Metro Station', 'Bus Stop', 'Shopping Mall',
    'Restaurant', 'Park', 'Bank', 'ATM', 'Pharmacy'
  ];

  const handleFirstTimeAnswer = (answer: boolean) => {
    setIsFirstTime(answer);
    if (answer) {
      setCurrentStep('process');
    } else {
      setCurrentStep('preferences');
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setPreferences(prev => ({
      ...prev,
      purchasePreferences: {
        ...prev.purchasePreferences,
        amenities: prev.purchasePreferences.amenities.includes(amenity)
          ? prev.purchasePreferences.amenities.filter(a => a !== amenity)
          : [...prev.purchasePreferences.amenities, amenity]
      }
    }));
  };

  const handleFacilityToggle = (facility: string) => {
    setPreferences(prev => ({
      ...prev,
      purchasePreferences: {
        ...prev.purchasePreferences,
        nearbyFacilities: prev.purchasePreferences.nearbyFacilities.includes(facility)
          ? prev.purchasePreferences.nearbyFacilities.filter(f => f !== facility)
          : [...prev.purchasePreferences.nearbyFacilities, facility]
      }
    }));
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    toast({
        title: "Preferences Saved",
        description: "Redirecting to property listings...",
    });
    
    // Simulate a delay for showing toast
    await new Promise(resolve => setTimeout(resolve, 1500));

    const params = new URLSearchParams();
    if (preferences.locationPreferences.preferredLocation) {
        params.set('q', preferences.locationPreferences.preferredLocation);
    }
    if (preferences.propertyRequirements.propertyType) {
        params.set('type', preferences.propertyRequirements.propertyType);
    }
    if (preferences.propertyRequirements.maxPrice) {
        params.set('maxPrice', preferences.propertyRequirements.maxPrice);
    }

    router.push(`/properties?${params.toString()}`);
    setIsSaving(false);
  };


  const renderFirstTimeQuestion = () => (
    <div>
        <FlowHeader showBackButton={true} onBack={onBack} title="Buyer Journey" />
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Are you buying for the first time?
          </h2>
          <p className="text-muted-foreground mt-2">
            This helps us personalize your property search experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="group relative overflow-hidden bg-card border rounded-2xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-blue-500/50"
              onClick={() => handleFirstTimeAnswer(true)}
            >
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-4xl mb-4">
                  🌱
                </div>
                <h3 className="text-2xl font-bold">Yes, First Time</h3>
                <p className="text-muted-foreground text-center">I'll guide you through the complete home buying process</p>
              </div>
            </div>

            <div
              className="group relative overflow-hidden bg-card border rounded-2xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-blue-500/50"
              onClick={() => handleFirstTimeAnswer(false)}
            >
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-blue-500/10 flex items-center justify-center text-4xl mb-4">
                  🏠
                </div>
                <h3 className="text-2xl font-bold">No, Experienced</h3>
                <p className="text-muted-foreground text-center">I know what I'm looking for, let's get straight to it</p>
              </div>
            </div>
        </div>
    </div>
  );

  const renderProcessSteps = () => (
    <div>
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('firstTime')} title="First-Time Buyer Guide" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Your Home Buying Journey</h2>
          <p className="text-muted-foreground">Follow these steps to find your perfect home</p>
        </div>

        <div className="space-y-8">
          {[
            { step: 1, title: "Financial Assessment", desc: "Check your budget and get pre-approved", icon: "💰" },
            { step: 2, title: "Property Search", desc: "Find properties that match your criteria", icon: "🔍" },
            { step: 3, title: "Property Visits", desc: "Visit shortlisted properties", icon: "🏠" },
            { step: 4, title: "Make an Offer", desc: "Negotiate and make your offer", icon: "📝" },
            { step: 5, title: "Legal Verification", desc: "Verify property documents", icon: "📋" },
            { step: 6, title: "Home Loan Processing", desc: "Complete your loan application", icon: "🏦" },
            { step: 7, title: "Registration", desc: "Register the property in your name", icon: "✅" }
          ].map((item) => (
            <div key={item.step} className="bg-card border rounded-2xl p-6 flex items-center space-x-6">
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-2xl flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="w-8 h-8 rounded-full bg-blue-500/20 border-blue-500/50 border flex items-center justify-center font-bold">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => setCurrentStep('preferences')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Start Your Property Search
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div>
      <FlowHeader showBackButton={true} onBack={() => isFirstTime ? setCurrentStep('process') : setCurrentStep('firstTime')} title="Property Preferences" />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Tell Us Your Preferences</h2>
          <p className="text-muted-foreground">Help us find the perfect property for you</p>
        </div>

        <div className="space-y-8">
          {/* Location Preferences */}
          <div className="bg-card border rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mr-3">📍</span>
              Location Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">City Tier</label>
                <Select onValueChange={(value) => setPreferences(prev => ({
                  ...prev,
                  locationPreferences: { ...prev.locationPreferences, cityTier: value }
                }))}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select city tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tier1">Tier 1 (Metro Cities)</SelectItem>
                    <SelectItem value="tier2">Tier 2 (Major Cities)</SelectItem>
                    <SelectItem value="tier3">Tier 3 (Smaller Cities)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Location</label>
                <Input
                  type="text"
                  placeholder="Enter preferred area/locality"
                  className="bg-background"
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    locationPreferences: { ...prev.locationPreferences, preferredLocation: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Property Requirements */}
          <div className="bg-card border rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mr-3">🏠</span>
              Property Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Property Type</label>
                <Select onValueChange={(value) => setPreferences(prev => ({
                  ...prev,
                  propertyRequirements: { ...prev.propertyRequirements, propertyType: value }
                }))}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">Independent House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="plot">Plot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Bedrooms</label>
                <Select onValueChange={(value) => setPreferences(prev => ({
                  ...prev,
                  propertyRequirements: { ...prev.propertyRequirements, bedrooms: value }
                }))}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 BHK</SelectItem>
                    <SelectItem value="2">2 BHK</SelectItem>
                    <SelectItem value="3">3 BHK</SelectItem>
                    <SelectItem value="4">4+ BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Min Price (₹)</label>
                <Input
                  type="number"
                  placeholder="Min price"
                  className="bg-background"
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    propertyRequirements: { ...prev.propertyRequirements, minPrice: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Max Price (₹)</label>
                <Input
                  type="number"
                  placeholder="Max price"
                  className="bg-background"
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    propertyRequirements: { ...prev.propertyRequirements, maxPrice: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>

          {/* Purchase Preferences */}
          <div className="bg-card border rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 mr-3">🎯</span>
              Purchase Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Purpose</label>
                <Select onValueChange={(value) => setPreferences(prev => ({
                  ...prev,
                  purchasePreferences: { ...prev.purchasePreferences, purpose: value }
                }))}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="selfUse">Self Use</SelectItem>
                    <SelectItem value="investment">Investment</SelectItem>
                    <SelectItem value="rental">Rental Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Timeline to Buy</label>
                <Select onValueChange={(value) => setPreferences(prev => ({
                  ...prev,
                  purchasePreferences: { ...prev.purchasePreferences, timeline: value }
                }))}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                    <SelectItem value="short">Short Term (3-6 months)</SelectItem>
                    <SelectItem value="medium">Medium Term (6-12 months)</SelectItem>
                    <SelectItem value="long">Long Term (1+ year)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Preferred Amenities</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      preferences.purchasePreferences.amenities.includes(amenity)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-background hover:bg-muted dark:hover:bg-blue-500/10'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby Facilities */}
            <div>
              <label className="block text-sm font-medium mb-3">Desired Nearby Facilities</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {facilityOptions.map((facility) => (
                  <button
                    key={facility}
                    onClick={() => handleFacilityToggle(facility)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      preferences.purchasePreferences.nearbyFacilities.includes(facility)
                         ? 'bg-blue-600 text-white border-blue-600'
                         : 'bg-background hover:bg-muted dark:hover:bg-blue-500/10'
                    }`}
                  >
                    {facility}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={handleSavePreferences}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isSaving}
          >
            {isSaving ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Properties...
                </>
            ) : "Find Matching Properties"}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-foreground">
      {currentStep === 'firstTime' && renderFirstTimeQuestion()}
      {currentStep === 'process' && renderProcessSteps()}
      {currentStep === 'preferences' && renderPreferences()}
    </div>
  );
};
