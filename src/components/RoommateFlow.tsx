
"use client";

/**
 * AI-powered roommate finding and sharing flow with comprehensive options
 */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, UploadCloud } from 'lucide-react';

type RoommateStep = 'mode' | 'finding' | 'sharing' | 'preferences' | 'summary';
type RoommateMode = 'finding' | 'sharing';

interface RoommateData {
  mode: RoommateMode;
  finding: {
    seekerInfo: {
      name: string;
      age: string;
      gender: string;
      occupation: string;
      aboutMe: string;
      lifestyle: string[];
    };
    propertyInfo: {
      propertyTitle: string;
      propertyType: string;
      propertyAddress: string;
      locationMap: string;
      rentAmount: string;
      deposit: string;
      availableFrom: string;
      totalRent: string;
    };
    sharingDetails: {
      totalPeople: string;
      currentOccupants: string;
      genderPreference: string;
      maxOccupants: string;
      petsAllowed: boolean | null;
    };
    amenities: string[];
    nearbyFacilities: string[];
    propertyImages: string[];
  };
  sharing: {
    seekerInfo: {
      name: string;
      age: string;
      gender: string;
      occupation: string;
      aboutMe: string;
      lifestyle: string[];
    };
    locationPreferences: {
      preferredLocation: string;
      budgetRange: string;
      propertyType: string;
    };
    sharingDetails: {
      totalPeople: string;
      genderPreference: string;
      moveInDate: string;
      maxOccupants: string;
      petsAllowed: boolean | null;
    };
    preferences: {
      lifestyle: string[];
      habits: string[];
      socialPreferences: string[];
      dealBreakers: string[];
    };
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


export const RoommateFlow: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<RoommateStep>('mode');
  const [roommateMode, setRoommateMode] = useState<RoommateMode>('finding');
  const [roommateData, setRoommateData] = useState<RoommateData>({
    mode: 'finding',
    finding: {
      seekerInfo: {
        name: '',
        age: '',
        gender: '',
        occupation: '',
        aboutMe: '',
        lifestyle: []
      },
      propertyInfo: {
        propertyTitle: '',
        propertyType: '',
        propertyAddress: '',
        locationMap: '',
        rentAmount: '',
        deposit: '',
        availableFrom: '',
        totalRent: ''
      },
      sharingDetails: {
        totalPeople: '',
        currentOccupants: '',
        genderPreference: '',
        maxOccupants: '',
        petsAllowed: null
      },
      amenities: [],
      nearbyFacilities: [],
      propertyImages: []
    },
    sharing: {
      seekerInfo: {
        name: '',
        age: '',
        gender: '',
        occupation: '',
        aboutMe: '',
        lifestyle: []
      },
      locationPreferences: {
        preferredLocation: '',
        budgetRange: '',
        propertyType: ''
      },
      sharingDetails: {
        totalPeople: '',
        genderPreference: '',
        moveInDate: '',
        maxOccupants: '',
        petsAllowed: null
      },
      preferences: {
        lifestyle: [],
        habits: [],
        socialPreferences: [],
        dealBreakers: []
      },
      amenities: [],
      nearbyFacilities: []
    }
  });

  const propertyTypes = [
    'Apartment', 'Independent House', 'Villa', 'Studio Apartment', 
    'PG/Hostel', 'Shared Apartment', 'Bachelor Accommodation'
  ];

  const lifestyleOptions = [
    'Early Bird', 'Night Owl', 'Fitness Enthusiast', 'Book Lover',
    'Musician', 'Gamer', 'Cook', 'Travel Enthusiast', 'Pet Lover',
    'Social Butterfly', 'Homebody', 'Student', 'Working Professional'
  ];

  const habitOptions = [
    'Smoker', 'Drinker', 'Vegetarian', 'Non-Vegetarian',
    'Clean Freak', 'Messy', 'Quiet', 'Social', 'Early Riser'
  ];

  const socialOptions = [
    'Looking for Friends', 'Prefer Privacy', 'Open to Socializing',
    'Weekend Social', 'Weekday Social', 'No Parties'
  ];

  const dealBreakerOptions = [
    'No Smoking', 'No Drinking', 'No Pets', 'Vegetarian Only',
    'Early Bedtime', 'No Guests', 'Quiet Environment', 'Professional Only'
  ];

  const amenityOptions = [
    'Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security', 'Power Backup',
    'Lift', 'Club House', 'Children Play Area', 'Jogging Track', 'Wi-Fi',
    'AC', 'Gas Connection', 'Washing Machine', 'Refrigerator', 'TV'
  ];

  const facilityOptions = [
    'School', 'Hospital', 'Metro Station', 'Bus Stop', 'Shopping Mall',
    'Restaurant', 'Park', 'Bank', 'ATM', 'Pharmacy', 'Grocery Store',
    'Police Station', 'Fire Station'
  ];

  const handleModeSelect = (mode: RoommateMode) => {
    setRoommateMode(mode);
    setCurrentStep('finding');
  };

  const handleFindingChange = (section: keyof RoommateData['finding'], field: string, value: string | string[] | boolean | null) => {
    setRoommateData(prev => ({
      ...prev,
      finding: {
        ...prev.finding,
        [section]: {
          ...(prev.finding[section as keyof RoommateData['finding']] as object),
          [field]: value
        }
      }
    }));
  };
  

  const handleSharingChange = (section: keyof RoommateData['sharing'], field: string, value: string | string[] | boolean | null) => {
    setRoommateData(prev => ({
      ...prev,
      sharing: {
        ...prev.sharing,
        [section]: {
          ...(prev.sharing[section as keyof RoommateData['sharing']] as object),
          [field]: value
        }
      }
    }));
  };
  

  const handleLifestyleToggle = (option: string, isFinding: boolean) => {
    if (isFinding) {
        const current = roommateData.finding.seekerInfo.lifestyle;
        const updated = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
        handleFindingChange('seekerInfo', 'lifestyle', updated);
    } else {
        const current = roommateData.sharing.seekerInfo.lifestyle;
        const updated = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
        handleSharingChange('seekerInfo', 'lifestyle', updated);
    }
  };

  const handlePreferenceToggle = (type: 'lifestyle' | 'habits' | 'socialPreferences' | 'dealBreakers', option: string, isFinding: boolean) => {
    if (isFinding) return; // Not applicable for finding flow in this structure
    
    const current = roommateData.sharing.preferences[type];
    const updated = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
    handleSharingChange('preferences', type, updated);
  };

  const handleAmenityToggle = (option: string, isFinding: boolean) => {
    const current = isFinding ? roommateData.finding.amenities : roommateData.sharing.amenities;
    const updated = current.includes(option) ? current.filter(item => item !== option) : [...current, option];
    
    if (isFinding) {
      setRoommateData(prev => ({ ...prev, finding: { ...prev.finding, amenities: updated }}));
    } else {
      setRoommateData(prev => ({ ...prev, sharing: { ...prev.sharing, amenities: updated }}));
    }
  };

  const handleFacilityToggle = (option: string, isFinding: boolean) => {
    const current = isFinding ? roommateData.finding.nearbyFacilities : roommateData.sharing.nearbyFacilities;
    const updated = current.includes(option) ? current.filter(item => item !== option) : [...current, option];

    if (isFinding) {
      setRoommateData(prev => ({ ...prev, finding: { ...prev.finding, nearbyFacilities: updated }}));
    } else {
      setRoommateData(prev => ({ ...prev, sharing: { ...prev.sharing, nearbyFacilities: updated }}));
    }
  };

  const renderModeSelection = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={onBack} title="Looking for a Roommate" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What are you looking for?</h2>
            <p className="text-muted-foreground">Choose your roommate preference</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Finding */}
            <div
              className="group relative overflow-hidden bg-card border rounded-2xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-primary/50"
              onClick={() => handleModeSelect('finding')}
            >
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl mb-4">
                  🏠
                </div>
                <h3 className="text-2xl font-bold">Finding a Roommate</h3>
                <p className="text-muted-foreground text-center">I have a property and need someone to share it with me</p>
              </div>
            </div>

            {/* Sharing */}
            <div
              className="group relative overflow-hidden bg-card border rounded-2xl p-8 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-lg hover:border-primary/50"
              onClick={() => handleModeSelect('sharing')}
            >
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-4xl mb-4">
                  👥
                </div>
                <h3 className="text-2xl font-bold">Sharing a Roommate</h3>
                <p className="text-muted-foreground text-center">I need to find a property to share with someone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFindingForm = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('mode')} title="Finding a Roommate" />
      <div className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Property & Roommate Details</h2>
            <p className="text-muted-foreground">Tell us about your property and what you're looking for in a roommate</p>
          </div>

          <div className="space-y-8">
            {/* Owner Information */}
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">👤</span>
                Owner Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    className="bg-background"
                    value={roommateData.finding.seekerInfo.name}
                    onChange={(e) => handleFindingChange('seekerInfo', 'name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Age *</label>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    className="bg-background"
                    value={roommateData.finding.seekerInfo.age}
                    onChange={(e) => handleFindingChange('seekerInfo', 'age', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender *</label>
                  <Select onValueChange={(value) => handleFindingChange('seekerInfo', 'gender', value)}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Occupation *</label>
                  <Input
                    type="text"
                    placeholder="Enter your occupation"
                    className="bg-background"
                    value={roommateData.finding.seekerInfo.occupation}
                    onChange={(e) => handleFindingChange('seekerInfo', 'occupation', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">About Me *</label>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-3 bg-background border rounded-lg placeholder:text-muted-foreground min-h-[100px]"
                    value={roommateData.finding.seekerInfo.aboutMe}
                    onChange={(e) => handleFindingChange('seekerInfo', 'aboutMe', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">🏠</span>
                Property Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Property Title *</label>
                  <Input
                    type="text"
                    placeholder="Enter a catchy title for your property"
                    className="bg-background"
                    value={roommateData.finding.propertyInfo.propertyTitle}
                    onChange={(e) => handleFindingChange('propertyInfo', 'propertyTitle', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Property Type *</label>
                  <Select onValueChange={(value) => handleFindingChange('propertyInfo', 'propertyType', value)}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: 'Monthly Rent (&#8377;) *' }} />
                  <Input
                    type="number"
                    placeholder="Enter monthly rent"
                    className="bg-background"
                    value={roommateData.finding.propertyInfo.rentAmount}
                    onChange={(e) => handleFindingChange('propertyInfo', 'rentAmount', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: 'Security Deposit (&#8377;) *' }} />
                  <Input
                    type="number"
                    placeholder="Enter security deposit"
                    className="bg-background"
                    value={roommateData.finding.propertyInfo.deposit}
                    onChange={(e) => handleFindingChange('propertyInfo', 'deposit', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Available From *</label>
                  <Input
                    type="date"
                    className="bg-background"
                    value={roommateData.finding.propertyInfo.availableFrom}
                    onChange={(e) => handleFindingChange('propertyInfo', 'availableFrom', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: 'Total Property Rent (&#8377;) *' }} />
                  <Input
                    type="number"
                    placeholder="Enter total property rent"
                    className="bg-background"
                    value={roommateData.finding.propertyInfo.totalRent}
                    onChange={(e) => handleFindingChange('propertyInfo', 'totalRent', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Property Address *</label>
                  <Textarea
                    placeholder="Enter complete property address"
                    className="w-full px-4 py-3 bg-background border rounded-lg placeholder:text-muted-foreground min-h-[100px]"
                    value={roommateData.finding.propertyInfo.propertyAddress}
                    onChange={(e) => handleFindingChange('propertyInfo', 'propertyAddress', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Sharing Details */}
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">👥</span>
                Sharing Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Total People in Property *</label>
                  <Input
                    type="number"
                    placeholder="Enter total number of people"
                    className="bg-background"
                    value={roommateData.finding.sharingDetails.totalPeople}
                    onChange={(e) => handleFindingChange('sharingDetails', 'totalPeople', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Current Occupants *</label>
                  <Input
                    type="number"
                    placeholder="Enter current number of occupants"
                    className="bg-background"
                    value={roommateData.finding.sharingDetails.currentOccupants}
                    onChange={(e) => handleFindingChange('sharingDetails', 'currentOccupants', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Gender *</label>
                  <Select onValueChange={(value) => handleFindingChange('sharingDetails', 'genderPreference', value)}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select gender preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any Gender</SelectItem>
                      <SelectItem value="male">Male Only</SelectItem>
                      <SelectItem value="female">Female Only</SelectItem>
                      <SelectItem value="mixed">Mixed Gender</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Maximum Occupants *</label>
                  <Input
                    type="number"
                    placeholder="Enter maximum number of occupants"
                    className="bg-background"
                    value={roommateData.finding.sharingDetails.maxOccupants}
                    onChange={(e) => handleFindingChange('sharingDetails', 'maxOccupants', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-3">Pets Allowed? *</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleFindingChange('sharingDetails', 'petsAllowed', true)}
                      className={`p-4 rounded-xl border-2 transition-all ${roommateData.finding.sharingDetails.petsAllowed === true
                        ? 'border-primary bg-primary/20 dark:bg-primary/30'
                        : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">🐕</div>
                      <div className="font-medium">Yes, Pets Allowed</div>
                    </button>
                    <button
                      onClick={() => handleFindingChange('sharingDetails', 'petsAllowed', false)}
                      className={`p-4 rounded-xl border-2 transition-all ${roommateData.finding.sharingDetails.petsAllowed === false
                        ? 'border-primary bg-primary/20 dark:bg-primary/30'
                        : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      <div className="text-2xl mb-2">🚫</div>
                      <div className="font-medium">No Pets Allowed</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">⭐</span>
                Property Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {amenityOptions.map((amenity) => (
                  <button
                    key={amenity}
                    onClick={() => handleAmenityToggle(amenity, true)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${roommateData.finding.amenities.includes(amenity)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted dark:hover:bg-primary/10'
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            {/* Nearby Facilities */}
            <div className="bg-card border rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">📍</span>
                Nearby Facilities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {facilityOptions.map((facility) => (
                  <button
                    key={facility}
                    onClick={() => handleFacilityToggle(facility, true)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${roommateData.finding.nearbyFacilities.includes(facility)
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
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('finding')} title="Roommate Summary" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Roommate Preferences</h2>
            <p className="text-muted-foreground">Here's what you're looking for</p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Owner Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Name</p>
                    <p>{roommateData.finding.seekerInfo.name || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Age</p>
                    <p>{roommateData.finding.seekerInfo.age || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Gender</p>
                    <p>{roommateData.finding.seekerInfo.gender || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Occupation</p>
                    <p>{roommateData.finding.seekerInfo.occupation || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Property Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Property Title</p>
                    <p>{roommateData.finding.propertyInfo.propertyTitle || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Property Type</p>
                    <p>{roommateData.finding.propertyInfo.propertyType || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: 'Monthly Rent' }} />
                    <p dangerouslySetInnerHTML={{ __html: `&#8377;${roommateData.finding.propertyInfo.rentAmount || '0'}` }} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: 'Total Rent' }} />
                    <p dangerouslySetInnerHTML={{ __html: `&#8377;${roommateData.finding.propertyInfo.totalRent || '0'}` }} />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Sharing Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Total People</p>
                    <p>{roommateData.finding.sharingDetails.totalPeople || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Current Occupants</p>
                    <p>{roommateData.finding.sharingDetails.currentOccupants || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Gender Preference</p>
                    <p>{roommateData.finding.sharingDetails.genderPreference || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Pets Allowed</p>
                    <p>{roommateData.finding.sharingDetails.petsAllowed ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-primary mb-4">Selected Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {roommateData.finding.amenities.map((amenity) => (
                    <span key={amenity} className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-sm">
                      {amenity}
                    </span>
                  ))}
                  {roommateData.finding.amenities.length === 0 && (
                    <p className="text-muted-foreground">No amenities selected</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="text-center">
                <p className="text-primary mb-4">AI is analyzing your roommate preferences...</p>
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground text-sm">Perfect roommate matches found!</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => {
                alert('Roommate listing submitted successfully!');
              }}
            >
              Submit Roommate Listing
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'mode':
        return renderModeSelection();
      case 'finding':
        return renderFindingForm();
      case 'summary':
        return renderSummary();
      default:
        return renderModeSelection();
    }
  };

  return (
    <div className="text-foreground">
      {renderCurrentStep()}
    </div>
  );
};
