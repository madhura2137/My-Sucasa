
"use client";

/**
 * AI-powered seller flow with comprehensive property listing
 */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Loader2, UploadCloud, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type SellerStep = 'owner' | 'property' | 'additional' | 'images' | 'summary';

interface SellerData {
  ownerInfo: {
    ownerName: string;
    email: string;
    phoneNumber: string;
    alternatePhone: string;
    whatsappNumber: string;
    rating: number;
  };
  propertyInfo: {
    propertyTitle: string;
    propertyType: string;
    bedrooms: string;
    carpetArea: string;
    propertyDescription: string;
    propertyAddress: string;
    location: {
      city: string;
      state: string;
    };
    nearbyAttractions: string;
    sellingPrice: string;
    availableFrom: string;
  };
  additionalInfo: {
    specialSpecifications: string;
    legalIssues: string;
  };
  propertyImages: string[];
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

export const SellerFlow: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState<SellerStep>('owner');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const [sellerData, setSellerData] = useState<SellerData>({
    ownerInfo: {
      ownerName: '',
      email: '',
      phoneNumber: '',
      alternatePhone: '',
      whatsappNumber: '',
      rating: 0,
    },
    propertyInfo: {
      propertyTitle: '',
      propertyType: '',
      bedrooms: '',
      carpetArea: '',
      propertyDescription: '',
      propertyAddress: '',
      location: { city: '', state: ''},
      nearbyAttractions: '',
      sellingPrice: '',
      availableFrom: ''
    },
    additionalInfo: {
      specialSpecifications: '',
      legalIssues: ''
    },
    propertyImages: []
  });

  const propertyTypes = [
    'Apartment', 'Independent House', 'Villa', 'Plot', 'Penthouse', 
    'Studio Apartment', 'Duplex', 'Triplex', 'Farmhouse', 'Commercial'
  ];

  const bedroomOptions = [
    '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6+ BHK', 'Studio'
  ];

  const handleOwnerInfoChange = (field: keyof SellerData['ownerInfo'], value: string | number) => {
    setSellerData(prev => ({
      ...prev,
      ownerInfo: { ...prev.ownerInfo, [field]: value }
    }));
  };

  const handlePropertyInfoChange = (field: keyof SellerData['propertyInfo'], value: string) => {
    if (field === 'location') {
        const [city, state] = value.split(',').map(s => s.trim());
        setSellerData(prev => ({
            ...prev,
            propertyInfo: { ...prev.propertyInfo, location: { city: city || '', state: state || '' } }
        }));
    } else {
        setSellerData(prev => ({
            ...prev,
            propertyInfo: { ...prev.propertyInfo, [field]: value }
        }));
    }
  };

  const handleAdditionalInfoChange = (field: keyof SellerData['additionalInfo'], value: string) => {
    setSellerData(prev => ({
      ...prev,
      additionalInfo: { ...prev.additionalInfo, [field]: value }
    }));
  };

    const handleSaveAndSubmit = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast({
            title: 'Property Listed!',
            description: 'Your property has been successfully listed for sale.',
        });
    };

  const renderOwnerInfo = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={onBack} title="Owner Information" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Owner Information</h2>
            <p className="text-muted-foreground">Please provide your contact details</p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Owner's Name *</label>
                <Input
                  type="text"
                  placeholder="Enter owner's full name"
                  className="bg-background"
                  value={sellerData.ownerInfo.ownerName}
                  onChange={(e) => handleOwnerInfoChange('ownerName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address *</label>
                <Input type="email" placeholder="you@example.com" onChange={e => handleOwnerInfoChange('email', e.target.value)} value={sellerData.ownerInfo.email} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number *</label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  className="bg-background"
                  value={sellerData.ownerInfo.phoneNumber}
                  onChange={(e) => handleOwnerInfoChange('phoneNumber', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alternate Phone Number</label>
                <Input type="tel" placeholder="Optional alternate number" onChange={e => handleOwnerInfoChange('alternatePhone', e.target.value)} value={sellerData.ownerInfo.alternatePhone} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                <Input
                  type="tel"
                  placeholder="Enter WhatsApp number (if different from phone)"
                  className="bg-background"
                  value={sellerData.ownerInfo.whatsappNumber}
                  onChange={(e) => handleOwnerInfoChange('whatsappNumber', e.target.value)}
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => setCurrentStep('property')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue to Property Information
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPropertyInfo = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('owner')} title="Property Information" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Property Information</h2>
            <p className="text-muted-foreground">Tell us about your property</p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Property Title *</label>
                <Input
                  type="text"
                  placeholder="Enter a catchy title for your property"
                  className="bg-background"
                  value={sellerData.propertyInfo.propertyTitle}
                  onChange={(e) => handlePropertyInfoChange('propertyTitle', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Property Type *</label>
                <Select onValueChange={(value) => handlePropertyInfoChange('propertyType', value)}>
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
                <label className="block text-sm font-medium mb-2">Bedrooms *</label>
                <Select onValueChange={(value) => handlePropertyInfoChange('bedrooms', value)}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    {bedroomOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Carpet Area (sq.ft) *</label>
                <Input
                  type="number"
                  placeholder="Enter carpet area in square feet"
                  className="bg-background"
                  value={sellerData.propertyInfo.carpetArea}
                  onChange={(e) => handlePropertyInfoChange('carpetArea', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: 'Selling Price (&#8377;) *' }} />
                <Input
                  type="number"
                  placeholder="Enter selling price"
                  className="bg-background"
                  value={sellerData.propertyInfo.sellingPrice}
                  onChange={(e) => handlePropertyInfoChange('sellingPrice', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">City, State *</label>
                 <Input
                  type="text"
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="bg-background"
                  onChange={(e) => handlePropertyInfoChange('location', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Property Description *</label>
                <Textarea
                  placeholder="Describe your property in detail..."
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all min-h-[120px]"
                  value={sellerData.propertyInfo.propertyDescription}
                  onChange={(e) => handlePropertyInfoChange('propertyDescription', e.target.value)}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Property Address *</label>
                <Textarea
                  placeholder="Enter complete property address"
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all min-h-[100px]"
                  value={sellerData.propertyInfo.propertyAddress}
                  onChange={(e) => handlePropertyInfoChange('propertyAddress', e.target.value)}
                />
              </div>
               <div className="md:col-span-2 h-64 bg-muted rounded-lg">
                {googleMapsApiKey ? (
                  <APIProvider apiKey={googleMapsApiKey}>
                    <Map
                      defaultCenter={{ lat: 28.6139, lng: 77.2090 }}
                      defaultZoom={10}
                      mapId="MySuCasaMap"
                      className="h-full w-full rounded-lg"
                    >
                       <Marker position={{ lat: 28.6139, lng: 77.2090 }} />
                    </Map>
                  </APIProvider>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <AlertTriangle className="h-10 w-10 text-yellow-500 mb-4" />
                    <h4 className="font-semibold text-lg">Google Maps API Key is Missing</h4>
                    <p className="text-muted-foreground text-sm max-w-sm mt-2">
                        The map cannot be displayed because the API key is not configured. Please add your key to the `.env` file as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => setCurrentStep('additional')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue to Additional Information
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdditionalInfo = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('property')} title="Additional Information" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Additional Information</h2>
            <p className="text-muted-foreground">Provide additional details about your property</p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Special Specifications</label>
                <Textarea
                  placeholder="Mention any special features like swimming pool, garden, parking, security, etc."
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all min-h-[120px]"
                  value={sellerData.additionalInfo.specialSpecifications}
                  onChange={(e) => handleAdditionalInfoChange('specialSpecifications', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Any Legal Issues</label>
                <Textarea
                  placeholder="Please mention if there are any legal issues, disputes, or pending cases related to the property"
                  className="w-full px-4 py-3 bg-background border border-input rounded-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all min-h-[120px]"
                  value={sellerData.additionalInfo.legalIssues}
                  onChange={(e) => handleAdditionalInfoChange('legalIssues', e.target.value)}
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => setCurrentStep('images')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue to Property Images
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderImages = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('additional')} title="Property Images & 3D Tour" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Upload Media for 3D Tour</h2>
            <p className="text-muted-foreground">Upload high-quality images or a video of your property. Our AI will use them to generate a 3D tour.</p>
          </div>

          <div className="bg-card border rounded-2xl p-8 space-y-6">
            <div className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors">
               <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2 mt-4">Upload Images or Video</h3>
              <p className="text-muted-foreground mb-4">Drag and drop your files here or click to browse</p>
              <Button asChild variant="outline">
                <label htmlFor="file-upload">
                  Choose Files
                  <Input id="file-upload" type="file" className="sr-only" multiple accept="image/*,video/*" />
                </label>
              </Button>
              <p className="text-muted-foreground text-xs mt-4">
                Supported formats: JPG, PNG, MP4, MOV (Max 10MB per file)
              </p>
            </div>
            
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-border"></div>
              <span className="flex-shrink mx-4 text-muted-foreground text-sm">OR</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Provide a Video Link</label>
              <Input
                type="url"
                placeholder="e.g., https://www.youtube.com/watch?v=..."
                className="bg-background"
              />
               <p className="text-muted-foreground text-xs mt-2">
                Paste a link to a video of your property (e.g., from YouTube or Vimeo).
              </p>
            </div>


            <div className="text-center mt-8">
              <Button
                onClick={() => setCurrentStep('summary')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Continue to Summary
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="min-h-screen">
      <FlowHeader showBackButton={true} onBack={() => setCurrentStep('images')} title="Property Summary" />
      <div className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Property Listing Summary</h2>
            <p className="text-muted-foreground">Review your property details before listing</p>
          </div>

          <div className="bg-card border rounded-2xl p-8">
            <div className="space-y-8">
              {/* Owner Information */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">👤</span>
                  Owner Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Owner Name</p>
                    <p>{sellerData.ownerInfo.ownerName || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Email</p>
                    <p>{sellerData.ownerInfo.email || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Phone Number</p>
                    <p>{sellerData.ownerInfo.phoneNumber || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">WhatsApp Number</p>
                    <p>{sellerData.ownerInfo.whatsappNumber || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Property Information */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">🏠</span>
                  Property Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Property Title</p>
                    <p>{sellerData.propertyInfo.propertyTitle || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Property Type</p>
                    <p>{sellerData.propertyInfo.propertyType || 'Not provided'}</p>
                  </div>
                   <div>
                    <p className="text-muted-foreground text-sm">Location</p>
                    <p>{sellerData.propertyInfo.location.city}, {sellerData.propertyInfo.location.state}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Bedrooms</p>
                    <p>{sellerData.propertyInfo.bedrooms || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Carpet Area</p>
                    <p>{sellerData.propertyInfo.carpetArea ? `${sellerData.propertyInfo.carpetArea} sq.ft` : 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm" dangerouslySetInnerHTML={{ __html: 'Selling Price' }} />
                    <p dangerouslySetInnerHTML={{ __html: sellerData.propertyInfo.sellingPrice ? `&#8377;${sellerData.propertyInfo.sellingPrice}` : 'Not provided' }} />
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-muted-foreground text-sm">Property Description</p>
                    <p>{sellerData.propertyInfo.propertyDescription || 'Not provided'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-muted-foreground text-sm">Property Address</p>
                    <p>{sellerData.propertyInfo.propertyAddress || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">📋</span>
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Special Specifications</p>
                    <p>{sellerData.additionalInfo.specialSpecifications || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Legal Issues</p>
                    <p>{sellerData.additionalInfo.legalIssues || 'No legal issues mentioned'}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t">
              <div className="text-center">
                <p className="text-primary mb-4">AI is analyzing your property listing...</p>
                <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground text-sm">Your property is ready to be listed!</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleSaveAndSubmit}
              disabled={isSaving}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Listing Property...
                </>
              ) : 'List Property'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {currentStep === 'owner' && renderOwnerInfo()}
      {currentStep === 'property' && renderPropertyInfo()}
      {currentStep === 'additional' && renderAdditionalInfo()}
      {currentStep === 'images' && renderImages()}
      {currentStep === 'summary' && renderSummary()}
    </>
  );
};
