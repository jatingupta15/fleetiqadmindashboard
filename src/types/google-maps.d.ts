
declare global {
  interface Window {
    google: typeof google;
    initMap?: () => void;
  }
}

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element | null, opts?: MapOptions);
    }
    
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: MapTypeId;
    }
    
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    enum MapTypeId {
      HYBRID = 'hybrid',
      ROADMAP = 'roadmap',
      SATELLITE = 'satellite',
      TERRAIN = 'terrain'
    }
    
    namespace places {
      class Autocomplete {
        constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions);
        addListener(eventName: string, handler: () => void): void;
        getPlace(): PlaceResult;
      }
      
      interface AutocompleteOptions {
        types?: string[];
        fields?: string[];
        componentRestrictions?: ComponentRestrictions;
      }
      
      interface ComponentRestrictions {
        country?: string | string[];
      }
      
      interface PlaceResult {
        place_id?: string;
        formatted_address?: string;
        name?: string;
        geometry?: PlaceGeometry;
        address_components?: AddressComponent[];
      }
      
      interface PlaceGeometry {
        location?: LatLng;
        viewport?: LatLngBounds;
      }
      
      interface LatLngBounds {
        getNorthEast(): LatLng;
        getSouthWest(): LatLng;
      }
      
      interface AddressComponent {
        long_name: string;
        short_name: string;
        types: string[];
      }
    }
  }
}

export {};
