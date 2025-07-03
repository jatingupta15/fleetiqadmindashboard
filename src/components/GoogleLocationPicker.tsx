
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Navigation } from 'lucide-react';

interface GoogleLocationPickerProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string, placeDetails?: any) => void;
  required?: boolean;
}

interface LocationSuggestion {
  id: string;
  name: string;
  address: string;
  type: 'current' | 'popular' | 'recent';
}

const GoogleLocationPicker: React.FC<GoogleLocationPickerProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock suggestions like Zomato/Swiggy
  const [suggestions] = useState<LocationSuggestion[]>([
    {
      id: '1',
      name: 'Current Location',
      address: 'Use GPS to find current location',
      type: 'current'
    },
    {
      id: '2',
      name: 'Office Complex',
      address: 'Sector 62, Noida, Uttar Pradesh',
      type: 'popular'
    },
    {
      id: '3',
      name: 'City Center Mall',
      address: 'Sector 12, Gurgaon, Haryana',
      type: 'popular'
    },
    {
      id: '4',
      name: 'Airport Terminal',
      address: 'IGI Airport, New Delhi',
      type: 'recent'
    }
  ]);

  useEffect(() => {
    // Try to load Google Maps if not already loaded
    if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
      setIsGoogleLoaded(true);
      initializeAutocomplete();
      return;
    }

    // Load Google Maps API with a free tier approach
    loadGoogleMapsAPI();
  }, []);

  const loadGoogleMapsAPI = () => {
    // For demo purposes, we'll simulate Google Maps loading
    // In production, you'd load the actual API
    setTimeout(() => {
      console.log('Google Maps API would be loaded here');
      // setIsGoogleLoaded(true);
    }, 1000);
  };

  const initializeAutocomplete = () => {
    if (!inputRef.current || typeof window === 'undefined' || !(window as any).google) return;

    const googleMaps = (window as any).google.maps;
    const autocomplete = new googleMaps.places.Autocomplete(inputRef.current, {
      types: ['establishment', 'geocode'],
      fields: ['place_id', 'formatted_address', 'name', 'geometry']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address, place);
        setShowSuggestions(false);
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onChange(value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    if (suggestion.type === 'current') {
      getCurrentLocation();
    } else {
      onChange(suggestion.address);
      setSearchTerm(suggestion.address);
      setShowSuggestions(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const address = `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
          onChange(address);
          setSearchTerm(address);
          setShowSuggestions(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          onChange('Unable to get current location');
        }
      );
    }
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    suggestion.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2 relative">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>
        <MapPin className="w-4 h-4 inline mr-1" />
        {label} {required && '*'}
      </Label>
      
      <div className="relative">
        <Input
          ref={inputRef}
          id={label.toLowerCase().replace(/\s+/g, '-')}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          required={required}
          className="pr-10"
        />
        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => handleSuggestionClick(suggestion)}
              className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="flex-shrink-0 mr-3">
                {suggestion.type === 'current' ? (
                  <Navigation className="w-5 h-5 text-blue-500" />
                ) : (
                  <MapPin className="w-5 h-5 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{suggestion.name}</div>
                <div className="text-sm text-gray-600">{suggestion.address}</div>
              </div>
            </div>
          ))}
          
          {searchTerm && filteredSuggestions.length === 0 && (
            <div className="p-3 text-gray-500 text-center">
              No locations found. Try a different search term.
            </div>
          )}
        </div>
      )}

      {/* Click outside to close suggestions */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default GoogleLocationPicker;
