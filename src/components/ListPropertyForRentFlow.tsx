
"use client";

/**
 * AI-powered landlord flow for listing properties for rent
 */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Loader2, UploadCloud, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

type RentStep = 'ownerInfo' | 'propertyInfo' | 'rentalInfo' | 'amenities' | 'images' | 'summary';

interface PropertyForRentData {
  ownerInfo: {
    ownerName: string;
    email: string;
    phoneNumber: string;
    alternatePhone: string;
    whatsappNumber: string;
  };
  propertyInfo: {
    propertyAddress: string;
    propertyType: string;
    carpetArea: string;
    bedrooms: string;
  };
  rentalInfo: {
    monthlyRent: string;
    securityDeposit: string;
    furnishing: string;
    availableFrom: string;
    tenantPreference: string;
  };
  amenities: string[];
  propertyImages: string[];
}

const propertyTypes = [
  'Apartment', 'Independent House', 'Villa', 'Studio Apartment', 'PG/Hostel', 'Shared Apartment'
];
const bedroomOptions = ['1', '2', '3', '4', '5+'];
const furnishingOptions = ['Fully Furnished', 'Semi-Furnished', 'Unfurnished'];
const tenantOptions = ['Any', 'Family', 'Bachelors (Male)', 'Bachelors (Female)', 'Company Lease'];
const amenityOptions = [
    'Parking', 'Swimming Pool', 'Gym', 'Garden', 'Security', 'Power Backup',
    'Lift', 'Club House', 'Children Play Area', 'Jogging Track', 'Wi-Fi',
    'AC', 'Gas Connection', 'Washing Machine', 'Refrigerator'
];


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

export const ListPropertyForRentFlow: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [currentStep, setCurrentStep] = useState<RentStep>('ownerInfo');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();
    const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;


    const [formData, setFormData] = useState<PropertyForRentData>({
        ownerInfo: { ownerName: '', email: '', phoneNumber: '', alternatePhone: '', whatsappNumber: '' },
        propertyInfo: { propertyAddress: '', propertyType: '', carpetArea: '', bedrooms: '' },
        rentalInfo: { monthlyRent: '', securityDeposit: '', furnishing: '', availableFrom: '', tenantPreference: '' },
        amenities: [],
        propertyImages: [],
    });

    const handleDataChange = (section: keyof PropertyForRentData, field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...(prev[section] as object),
                [field]: value
            }
        }));
    };

    const handleAmenityToggle = (amenity: string) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleSaveAndSubmit = async () => {
        setIsSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsSaving(false);
        toast({
            title: 'Property Listed!',
            description: 'Your property has been successfully listed for rent.',
        });
    };

    const renderOwnerInfo = () => (
        <div>
            <FlowHeader showBackButton={true} onBack={onBack} title="Owner Information" />
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold">Your Contact Details</h3>
                    <p className="text-muted-foreground mt-2">Provide your information so we can get in touch.</p>
                </div>
                <div className="bg-card border rounded-2xl p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Owner Name *</label>
                            <Input placeholder="Enter your full name" onChange={e => handleDataChange('ownerInfo', 'ownerName', e.target.value)} value={formData.ownerInfo.ownerName} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email Address *</label>
                            <Input type="email" placeholder="you@example.com" onChange={e => handleDataChange('ownerInfo', 'email', e.target.value)} value={formData.ownerInfo.email} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                            <Input type="tel" placeholder="+91 98765 43210" onChange={e => handleDataChange('ownerInfo', 'phoneNumber', e.target.value)} value={formData.ownerInfo.phoneNumber} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Alternate Phone Number</label>
                            <Input type="tel" placeholder="Optional alternate number" onChange={e => handleDataChange('ownerInfo', 'alternatePhone', e.target.value)} value={formData.ownerInfo.alternatePhone} />
                        </div>
                         <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
                            <Input type="tel" placeholder="Same as primary if left blank" onChange={e => handleDataChange('ownerInfo', 'whatsappNumber', e.target.value)} value={formData.ownerInfo.whatsappNumber} />
                        </div>
                    </div>
                     <div className="text-center pt-6">
                        <Button onClick={() => setCurrentStep('propertyInfo')}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderPropertyInfo = () => (
        <div>
            <FlowHeader showBackButton={true} onBack={() => setCurrentStep('ownerInfo')} title="Property Information" />
             <div className="max-w-4xl mx-auto">
                 <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold">Describe Your Property</h3>
                    <p className="text-muted-foreground mt-2">Enter the details of the property you want to rent out.</p>
                </div>
                <div className="bg-card border rounded-2xl p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Property Address *</label>
                        <Textarea placeholder="Enter the full address of the property" onChange={e => handleDataChange('propertyInfo', 'propertyAddress', e.target.value)} value={formData.propertyInfo.propertyAddress} />
                    </div>
                     <div className="h-64 bg-muted rounded-lg">
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
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Property Type *</label>
                            <Select onValueChange={value => handleDataChange('propertyInfo', 'propertyType', value)} value={formData.propertyInfo.propertyType}>
                                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                <SelectContent>
                                    {propertyTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Carpet Area (sq.ft.) *</label>
                            <Input type="number" min="0" placeholder="e.g., 1200" onChange={e => handleDataChange('propertyInfo', 'carpetArea', e.target.value)} value={formData.propertyInfo.carpetArea} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-2">Bedrooms *</label>
                            <Select onValueChange={value => handleDataChange('propertyInfo', 'bedrooms', value)} value={formData.propertyInfo.bedrooms}>
                                <SelectTrigger><SelectValue placeholder="Select bedrooms" /></SelectTrigger>
                                <SelectContent>
                                    {bedroomOptions.map(b => <SelectItem key={b} value={b}>{b} BHK</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="text-center pt-6">
                        <Button onClick={() => setCurrentStep('rentalInfo')}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderRentalInfo = () => (
         <div>
            <FlowHeader showBackButton={true} onBack={() => setCurrentStep('propertyInfo')} title="Rental Information" />
             <div className="max-w-4xl mx-auto">
                 <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold">Set Your Rental Terms</h3>
                    <p className="text-muted-foreground mt-2">Define the financial and leasing details.</p>
                </div>
                <div className="bg-card border rounded-2xl p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: 'Monthly Rent (&#8377;) *' }} />
                            <Input type="number" min="0" placeholder="Enter amount" onChange={e => handleDataChange('rentalInfo', 'monthlyRent', e.target.value)} value={formData.rentalInfo.monthlyRent} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-2" dangerouslySetInnerHTML={{ __html: 'Security Deposit (&#8377;) *' }} />
                            <Input type="number" min="0" placeholder="Enter amount" onChange={e => handleDataChange('rentalInfo', 'securityDeposit', e.target.value)} value={formData.rentalInfo.securityDeposit} />
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-2">Furnishing *</label>
                            <Select onValueChange={value => handleDataChange('rentalInfo', 'furnishing', value)} value={formData.rentalInfo.furnishing}>
                                <SelectTrigger><SelectValue placeholder="Select furnishing" /></SelectTrigger>
                                <SelectContent>
                                    {furnishingOptions.map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium mb-2">Availability Date *</label>
                            <Input type="date" onChange={e => handleDataChange('rentalInfo', 'availableFrom', e.target.value)} value={formData.rentalInfo.availableFrom} />
                        </div>
                    </div>
                     <div >
                        <label className="block text-sm font-medium mb-2">Tenant Preference *</label>
                        <Select onValueChange={value => handleDataChange('rentalInfo', 'tenantPreference', value)} value={formData.rentalInfo.tenantPreference}>
                            <SelectTrigger><SelectValue placeholder="Select preferred tenant" /></SelectTrigger>
                            <SelectContent>
                                {tenantOptions.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="text-center pt-6">
                        <Button onClick={() => setCurrentStep('amenities')}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderAmenities = () => (
         <div>
            <FlowHeader showBackButton={true} onBack={() => setCurrentStep('rentalInfo')} title="Amenities" />
             <div className="max-w-4xl mx-auto">
                 <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold">Select Amenities</h3>
                    <p className="text-muted-foreground mt-2">Choose the amenities available at your property.</p>
                </div>
                 <div className="bg-card border rounded-2xl p-8 space-y-6">
                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {amenityOptions.map((amenity) => (
                            <button
                                key={amenity}
                                onClick={() => handleAmenityToggle(amenity)}
                                className={`px-4 py-3 rounded-lg text-sm font-medium transition-all border ${
                                formData.amenities.includes(amenity)
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background hover:bg-muted'
                                }`}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>
                     <div className="text-center pt-6">
                        <Button onClick={() => setCurrentStep('images')}>Continue</Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderImages = () => (
        <div>
            <FlowHeader showBackButton={true} onBack={() => setCurrentStep('amenities')} title="Property Images" />
             <div className="max-w-4xl mx-auto">
                 <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold">Upload Property Photos</h3>
                    <p className="text-muted-foreground mt-2">Good photos attract better tenants. Upload high-quality images.</p>
                </div>
                <div className="bg-card border rounded-2xl p-8 space-y-6">
                    <div className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer hover:border-primary transition-colors">
                        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h4 className="mt-4 text-lg font-semibold">Drag and drop images here</h4>
                        <p className="mt-1 text-sm text-muted-foreground">or click to browse</p>
                        <Input type="file" className="sr-only" multiple />
                    </div>
                    <div className="text-center pt-6">
                        <Button onClick={() => setCurrentStep('summary')}>Continue to Summary</Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderSummary = () => (
        <div>
            <FlowHeader showBackButton={true} onBack={() => setCurrentStep('images')} title="Review Your Listing" />
             <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold">Is everything correct?</h3>
                    <p className="text-muted-foreground mt-2">Review the details below before you list your property.</p>
                </div>
                <div className="bg-card border rounded-2xl p-8 space-y-8">
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-primary">Owner Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <p><span className="font-medium text-muted-foreground">Name:</span> {formData.ownerInfo.ownerName}</p>
                            <p><span className="font-medium text-muted-foreground">Email:</span> {formData.ownerInfo.email}</p>
                            <p><span className="font-medium text-muted-foreground">Phone:</span> {formData.ownerInfo.phoneNumber}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-primary">Property Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <p className="col-span-2"><span className="font-medium text-muted-foreground">Address:</span> {formData.propertyInfo.propertyAddress}</p>
                            <p><span className="font-medium text-muted-foreground">Type:</span> {formData.propertyInfo.propertyType}</p>
                            <p><span className="font-medium text-muted-foreground">Area:</span> {formData.propertyInfo.carpetArea} sq.ft.</p>
                             <p><span className="font-medium text-muted-foreground">Bedrooms:</span> {formData.propertyInfo.bedrooms} BHK</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-primary">Rental Information</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <p><span className="font-medium text-muted-foreground" dangerouslySetInnerHTML={{__html: 'Monthly Rent:'}} /> &#8377;{formData.rentalInfo.monthlyRent}</p>
                            <p><span className="font-medium text-muted-foreground" dangerouslySetInnerHTML={{__html: 'Security Deposit:'}}/> &#8377;{formData.rentalInfo.securityDeposit}</p>
                            <p><span className="font-medium text-muted-foreground">Furnishing:</span> {formData.rentalInfo.furnishing}</p>
                            <p><span className="font-medium text-muted-foreground">Available From:</span> {formData.rentalInfo.availableFrom}</p>
                             <p className="col-span-2"><span className="font-medium text-muted-foreground">Tenant Preference:</span> {formData.rentalInfo.tenantPreference}</p>
                        </div>
                    </div>
                     <div className="space-y-4">
                        <h4 className="font-semibold text-lg text-primary">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                            {formData.amenities.length > 0 ? formData.amenities.map(a => (
                                <span key={a} className="px-2 py-1 bg-primary/20 border border-primary/30 rounded text-xs">{a}</span>
                            )) : <p className="text-sm text-muted-foreground">No amenities selected.</p>}
                        </div>
                    </div>
                    <div className="text-center pt-6 border-t">
                        <Button size="lg" onClick={handleSaveAndSubmit} disabled={isSaving}>
                            {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : 'Submit and List Property'}
                        </Button>
                    </div>
                </div>
             </div>
        </div>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'ownerInfo': return renderOwnerInfo();
            case 'propertyInfo': return renderPropertyInfo();
            case 'rentalInfo': return renderRentalInfo();
            case 'amenities': return renderAmenities();
            case 'images': return renderImages();
            case 'summary': return renderSummary();
            default: return renderOwnerInfo();
        }
    };
    
    return (
        <div className="text-foreground">
            {renderCurrentStep()}
        </div>
    );
};
