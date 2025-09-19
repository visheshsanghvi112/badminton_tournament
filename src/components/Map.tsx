import React from 'react';
import { MapPin, Navigation, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Map = () => {
  const venue = {
    name: "Symbiosis Sports Complex",
    address: "Range Hills Road, Symbiosis Viman Nagar Campus, Pune, Maharashtra 411020, India",
    coordinates: "18.5642,73.9142", // Symbiosis Viman Nagar Campus coordinates
    googleMapsUrl: "https://maps.google.com/maps?q=Symbiosis+International+University+Viman+Nagar+Campus,+Range+Hills+Road,+Pune&t=&z=13&ie=UTF8&iwloc=&output=embed"
  };

  const handleDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates}`, '_blank');
  };

  const handleViewOnGoogle = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${venue.coordinates}`, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Interactive Map */}
      <div className="relative rounded-lg overflow-hidden shadow-tournament">
        <iframe
          src={venue.googleMapsUrl}
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Symbiosis Sports Complex Location"
          className="w-full h-[300px]"
        ></iframe>
        
        {/* Overlay with venue info */}
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-[250px]">
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-sm">{venue.name}</h4>
              <p className="text-xs text-muted-foreground leading-tight">
                Range Hills Road, Viman Nagar Campus
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          onClick={handleDirections}
          variant="default" 
          size="sm"
          className="flex-1 animate-fade-in"
        >
          <Navigation className="h-4 w-4 mr-2" />
          Get Directions
        </Button>
        <Button 
          onClick={handleViewOnGoogle}
          variant="outline" 
          size="sm"
          className="flex-1 animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          <MapPin className="h-4 w-4 mr-2" />
          View on Google Maps
        </Button>
      </div>

      {/* Quick Transport Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>45 min from Pune Airport</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span>30 min from Railway Station</span>
        </div>
      </div>
    </div>
  );
};

export default Map;