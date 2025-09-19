import { useEffect, useState } from 'react';

const SponsorCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Placeholder sponsor data - will be replaced with real sponsors
  const sponsors = [
    { name: "Title Sponsor", logo: "🏆", tier: "title" },
    { name: "Associate Partner", logo: "🤝", tier: "associate" },
    { name: "Official Partner", logo: "⚡", tier: "partner" },
    { name: "Media Partner", logo: "📺", tier: "media" },
    { name: "Technology Partner", logo: "💻", tier: "tech" },
    { name: "Sports Partner", logo: "🏸", tier: "sports" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sponsors.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [sponsors.length]);

  return (
    <div className="bg-muted/50 py-8 animate-fade-in">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-lg font-semibold text-muted-foreground mb-6 animate-fade-in-up">
          Proudly Supported By
        </h3>
        
        <div className="flex justify-center items-center min-h-[120px]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full max-w-6xl">
            {sponsors.map((sponsor, index) => (
              <div
                key={sponsor.name}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-lg border bg-card
                  transition-all duration-500 transform animate-fade-in hover:animate-glow
                  ${index === currentIndex ? 'scale-110 shadow-tournament animate-bounce-in' : 'scale-100 opacity-70 hover:opacity-100 hover:scale-105'}
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-2 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>{sponsor.logo}</div>
                <div className="text-xs text-center font-medium text-muted-foreground">
                  {sponsor.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6 space-x-2 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {sponsors.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-150 ${
                index === currentIndex ? 'bg-primary animate-glow' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SponsorCarousel;