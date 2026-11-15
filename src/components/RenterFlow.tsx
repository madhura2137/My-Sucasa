
"use client";

/**
 * AI-powered renter flow with comprehensive rental preferences
 */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


type RenterStep = 'location' | 'rental' | 'tenant' | 'preferences' | 'summary';

interface RenterPreferences {
  locationPreferences: {
    cityTier: string;
    preferredLocation: string;
  };
  rentalInformation: {
    propertyType: string;
    moveInDate: string;
    furnishing: string;
    minRent: string;
    maxRent: string;
  };
  tenantDetails: {
    familyType: string;
    familySize: string;
    petsAllowed: boolean | null;
  };
  preferences: {
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

export const RenterFlow: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<RenterStep>('location');
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [preferences, setPreferences] = useState<RenterPreferences>({
    locationPreferences: {
      cityTier: '',
      preferredLocation: ''
    },
    rentalInformation: {
      propertyType: '',
      moveInDate: '',
      furnishing: '',
      minRent: '',
      maxRent: ''
    },
    tenantDetails: {
      familyType: '',
      familySize: '',
      petsAllowed: null
    },
    preferences: {
      amenities: [],
      nearbyFacilities: []
    }
  });

  const amenityOptions = [
    'Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security', 'Power Backup',
    'Lift', 'Club House', 'Children Play Area', 'Jogging Track', 'Wi-Fi',
    'AC', 'Gas Connection', 'Washing Machine', 'Refrigerator'
  ];

  const facilityOptions = [
    'School', 'Hospital', 'Metro Station', 'Bus Stop', 'Shopping Mall',
    'Restaurant', 'Park', 'Bank', 'ATM', 'Pharmacy', 'Grocery Store',
    'Police Station', 'Fire Station'
  ];

  const handleLocationChange = (field: keyof RenterPreferences['locationPreferences'], value: string) => {
    setPreferences(prev => ({
      ...prev,
      locationPreferences: { ...prev.locationPreferences, [field]: value }
    }));
  };

  const handleRentalChange = (field: keyof RenterPreferences['rentalInformation'], value: string) => {
    setPreferences(prev => ({
      ...prev,
      rentalInformation: { ...prev.rentalInformation, [field]: value }
    }));
  };

  const handleTenantChange = (field: keyof RenterPreferences['tenantDetails'], value: string | boolean) => {
    setPreferences(prev => ({
      ...prev,
      tenantDetails: { ...prev.tenantDetails, [field]: value }
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setPreferences(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        amenities: prev.preferences.amenities.includes(amenity)
          ? prev.preferences.amenities.filter(a => a !== amenity)
          : [...prev.preferences.amenities, amenity]
      }
    }));
  };

  const handleFacilityToggle = (facility: string) => {
    setPreferences(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        nearbyFacilities: prev.preferences.nearbyFacilities.includes(facility)
          ? prev.preferences.nearbyFacilities.filter(f => f !== facility)
          : [...prev.preferences.nearbyFacilities, facility]
      }
    }));
  };
  
  const handleFindProperties = async () => {
    setIsSaving(true);
    toast({
      title: "Finding Properties",
      description: "Redirecting to property listings based on your preferences.",
    });

    // Simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const params = new URLSearchParams();
    if (preferences.locationPreferences.preferredLocation) {
        params.set('q', preferences.locationPreferences.preferredLocation);
    }
    if (preferences.rentalInformation.propertyType) {
        params.set('type', preferences.rentalInformation.propertyType);
    }
    if (preferences.rentalInformation.maxRent) {
        params.set('maxPrice', preferences.rentalInformation.maxRent);
    }

    router.push(`/properties?${params.toString()}`);
    setIsSaving(false);
  };

  const renderLocationPreferences = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={onBack} title="Location Preferences" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Location Preferences</h2>
            <p className="text-muted-foreground">Tell us where you'd like to live</p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">City Tier *</label>
                <Select onValueChange={(value) => handleLocationChange('cityTier', value)}>
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
                <label className="block text-sm font-medium mb-2">Preferred Location *</label>
                <Input
                  type="text"
                  placeholder="Enter preferred area/locality"
                  className="bg-background"
                  value={preferences.locationPreferences.preferredLocation}
                  onChange={(e) => handleLocationChange('preferredLocation', e.target.value)}
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => setCurrentStep('rental')}
                disabled={!preferences.locationPreferences.cityTier || !preferences.locationPreferences.preferredLocation}
              >
                Continue to Rental Information
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderRentalInformation = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('location')} title="Rental Information" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Rental Information</h2>
            <p className="text-muted-foreground">Tell us about your rental requirements</p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Property Type *</label>
                <Select onValueChange={(value) => handleRentalChange('propertyType', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">Independent House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio Apartment</SelectItem>
                    <SelectItem value="pg">PG/Hostel</SelectItem>
                    <SelectItem value="shared">Shared Apartment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Move-in Date *</label>
                <Input
                  type="date"
                  className="bg-background"
                  value={preferences.rentalInformation.moveInDate}
                  onChange={(e) => handleRentalChange('moveInDate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Furnishing *</label>
                <Select onValueChange={(value) => handleRentalChange('furnishing', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select furnishing type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fully">Fully Furnished</SelectItem>
                    <SelectItem value="semi">Semi-Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: 'Monthly Rent Range (&#8377;) *' }} />
                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Minimum rent"
                    className="bg-background"
                    value={preferences.rentalInformation.minRent}
                    onChange={(e) => handleRentalChange('minRent', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Maximum rent"
                    className="bg-background"
                    value={preferences.rentalInformation.maxRent}
                    onChange={(e) => handleRentalChange('maxRent', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => setCurrentStep('tenant')}
                disabled={!preferences.rentalInformation.propertyType || !preferences.rentalInformation.moveInDate || !preferences.rentalInformation.furnishing || !preferences.rentalInformation.minRent || !preferences.rentalInformation.maxRent}
              >
                Continue to Tenant Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTenantDetails = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('rental')} title="Tenant Details" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Tenant Details</h2>
            <p className="text-muted-foreground">Tell us about yourself and your requirements</p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-3">Family Type *</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { value: 'bachelor-male', label: 'Bachelor (Male)', icon: '👨' },
                    { value: 'bachelor-female', label: 'Bachelor (Female)', icon: '👩' },
                    { value: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleTenantChange('familyType', option.value)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        preferences.tenantDetails.familyType === option.value
                          ? 'border-primary bg-primary/20 dark:bg-primary/30'
                          : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {preferences.tenantDetails.familyType === 'family' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Family Size *</label>
                  <Select onValueChange={(value) => handleTenantChange('familySize', value)}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select number of family members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Members</SelectItem>
                      <SelectItem value="3">3 Members</SelectItem>
                      <SelectItem value="4">4 Members</SelectItem>
                      <SelectItem value="5">5 Members</SelectItem>
                      <SelectItem value="6">6+ Members</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-3">Do you have pets? *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleTenantChange('petsAllowed', true)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      preferences.tenantDetails.petsAllowed === true
                        ? 'border-primary bg-primary/20 dark:bg-primary/30'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">🐕</div>
                    <div className="font-medium">Yes</div>
                  </button>
                  <button
                    onClick={() => handleTenantChange('petsAllowed', false)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      preferences.tenantDetails.petsAllowed === false
                        ? 'border-primary bg-primary/20 dark:bg-primary/30'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    <div className="text-2xl mb-2">🚫</div>
                    <div className="font-medium">No</div>
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => setCurrentStep('preferences')}
                disabled={!preferences.tenantDetails.familyType || (preferences.tenantDetails.familyType === 'family' && !preferences.tenantDetails.familySize) || preferences.tenantDetails.petsAllowed === null}
              >
                Continue to Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('tenant')} title="Preferences" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Your Preferences</h2>
            <p className="text-muted-foreground">Select your preferred amenities and nearby facilities</p>
          </div>

          <div className="space-y-8">
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">🏠</span>
                Preferred Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      preferences.preferences.amenities.includes(amenity)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted dark:hover:bg-primary/10'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">📍</span>
                Desired Nearby Facilities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {facilityOptions.map((facility) => (
                  <button
                    key={facility}
                    onClick={() => handleFacilityToggle(facility)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      preferences.preferences.nearbyFacilities.includes(facility)
                         ? 'bg-primary text-primary-foreground border-primary'
                         : 'bg-background hover:bg-muted dark:hover:bg-primary/10'
                    }`}
                  >
                    {facility}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => setCurrentStep('summary')}
            >
              Continue to Summary
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('preferences')} title="Rental Summary" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Your Rental Preferences</h2>
            <p className="text-muted-foreground">Here's what you're looking for</p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Location Preferences</h3>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">City Tier:</span> {preferences.locationPreferences.cityTier}</p>
                  <p><span className="text-muted-foreground">Preferred Location:</span> {preferences.locationPreferences.preferredLocation}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Rental Information</h3>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Property Type:</span> {preferences.rentalInformation.propertyType}</p>
                  <p><span className="text-muted-foreground">Move-in Date:</span> {preferences.rentalInformation.moveInDate}</p>
                  <p><span className="text-muted-foreground">Furnishing:</span> {preferences.rentalInformation.furnishing}</p>
                  <p><span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: 'Rent Range:' }} /> <span dangerouslySetInnerHTML={{ __html: `&#8377;${preferences.rentalInformation.minRent} - &#8377;${preferences.rentalInformation.maxRent}` }} /></p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Tenant Details</h3>
                <div className="space-y-2">
                  <p><span className="text-muted-foreground">Family Type:</span> {preferences.tenantDetails.familyType}</p>
                  {preferences.tenantDetails.familyType === 'family' && (
                    <p><span className="text-muted-foreground">Family Size:</span> {preferences.tenantDetails.familySize} members</p>
                  )}
                  <p><span className="text-muted-foreground">Pets Allowed:</span> {preferences.tenantDetails.petsAllowed ? 'Yes' : 'No'}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Selected Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {preferences.preferences.amenities.map((amenity) => (
                    <span key={amenity} className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-sm">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-lg font-bold text-primary mb-4">Desired Nearby Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {preferences.preferences.nearbyFacilities.map((facility) => (
                    <span key={facility} className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-sm">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleFindProperties}
              disabled={isSaving}
            >
               {isSaving ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Properties...
                </>
            ) : 'View Matching Properties'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentStep === 'location' && renderLocationPreferences()}
      {currentStep === 'rental' && renderRentalInformation()}
      {currentStep === 'tenant' && renderTenantDetails()}
      {currentStep === 'preferences' && renderPreferences()}
      {currentStep === 'summary' && renderSummary()}
    </>
  );
};
