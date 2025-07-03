
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';

interface GoogleLocationPickerProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string, placeDetails?: google.maps.places.PlaceResult) => void;
  required?: boolean;
}

const GoogleLocationPicker: React.FC<GoogleLocationPickerProps> = ({
  label,
  placeholder,
  value,
  onChange,
  required = false
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      initializeAutocomplete();
      return;
    }

    // If no API key is provided, show input field for user to enter it
    if (!apiKey) {
      return;
    }

    // Load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
      initializeAutocomplete();
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  const initializeAutocomplete = () => {
    if (!inputRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['establishment', 'geocode'],
      fields: ['place_id', 'formatted_address', 'name', 'geometry']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        onChange(place.formatted_address, place);
      }
    });
  };

  if (!apiKey) {
    return (
      <div className="space-y-2">
        <Label htmlFor="google-maps-key">Google Maps API Key</Label>
        <Input
          id="google-maps-key"
          type="password"
          placeholder="Enter your Google Maps API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <p className="text-sm text-gray-600">
          Get your API key from{' '}
          <a 
            href="https://console.cloud.google.com/google/maps-apis" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Google Cloud Console
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>
        <MapPin className="w-4 h-4 inline mr-1" />
        {label} {required && '*'}
      </Label>
      <Input
        ref={inputRef}
        id={label.toLowerCase().replace(/\s+/g, '-')}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={!isLoaded ? 'bg-gray-100' : ''}
        disabled={!isLoaded}
      />
      {!isLoaded && apiKey && (
        <p className="text-sm text-gray-500">Loading Google Maps...</p>
      )}
    </div>
  );
};

export default GoogleLocationPicker;
