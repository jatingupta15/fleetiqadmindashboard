
declare global {
  interface Window {
    google: any;
    initMap?: () => void;
  }
}

// Export an empty object to make this a module
export {};
