import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Video, ChevronLeft, ChevronRight, X } from "lucide-react";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'photos' | 'videos'>('all');

  // Placeholder gallery items - will be replaced with real content
  const galleryItems = [
    { id: 1, type: 'photo', title: 'Opening Ceremony 2024', thumbnail: '🏆', category: 'ceremony' },
    { id: 2, type: 'photo', title: 'Finals Match Action', thumbnail: '🏸', category: 'matches' },
    { id: 3, type: 'video', title: 'Tournament Highlights', thumbnail: '🎥', category: 'highlights' },
    { id: 4, type: 'photo', title: 'Award Distribution', thumbnail: '🥇', category: 'ceremony' },
    { id: 5, type: 'photo', title: 'Team Celebrations', thumbnail: '🎉', category: 'celebration' },
    { id: 6, type: 'photo', title: 'Sports Complex View', thumbnail: '🏟️', category: 'venue' },
    { id: 7, type: 'video', title: 'Player Interviews', thumbnail: '🎤', category: 'interviews' },
    { id: 8, type: 'photo', title: 'Intense Rally Moments', thumbnail: '⚡', category: 'matches' },
    { id: 9, type: 'photo', title: 'Symbiosis Campus', thumbnail: '🏛️', category: 'venue' },
    { id: 10, type: 'photo', title: 'Podium Ceremony', thumbnail: '🏅', category: 'ceremony' },
    { id: 11, type: 'video', title: 'Behind the Scenes', thumbnail: '🎬', category: 'bts' },
    { id: 12, type: 'photo', title: 'Team Spirit', thumbnail: '🤝', category: 'celebration' },
  ];

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === (filter === 'photos' ? 'photo' : 'video'));

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'next' 
      ? (selectedImage + 1) % filteredItems.length
      : selectedImage === 0 ? filteredItems.length - 1 : selectedImage - 1;
    
    setSelectedImage(newIndex);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Tournament Gallery
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Relive the excitement, passion, and triumph of previous tournaments. 
            Witness the spirit of competitive badminton at its finest.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-4">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              className="flex items-center space-x-2"
            >
              <span>All Media</span>
              <span className="text-sm">({galleryItems.length})</span>
            </Button>
            <Button
              variant={filter === 'photos' ? 'default' : 'outline'}
              onClick={() => setFilter('photos')}
              className="flex items-center space-x-2"
            >
              <Camera className="h-4 w-4" />
              <span>Photos</span>
              <span className="text-sm">({galleryItems.filter(item => item.type === 'photo').length})</span>
            </Button>
            <Button
              variant={filter === 'videos' ? 'default' : 'outline'}
              onClick={() => setFilter('videos')}
              className="flex items-center space-x-2"
            >
              <Video className="h-4 w-4" />
              <span>Videos</span>
              <span className="text-sm">({galleryItems.filter(item => item.type === 'video').length})</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id}
                className="cursor-pointer hover:shadow-tournament-card transition-all duration-300 transform hover:scale-105 animate-fade-in" 
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-video bg-muted flex items-center justify-center overflow-hidden">
                  <div className="text-6xl">{item.thumbnail}</div>
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Video className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h3>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {item.type === 'video' ? (
                      <Video className="h-3 w-3" />
                    ) : (
                      <Camera className="h-3 w-3" />
                    )}
                    <span className="capitalize">{item.category}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No items found for the selected filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
              onClick={() => navigateLightbox('prev')}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
              onClick={() => navigateLightbox('next')}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Content */}
            <div className="bg-background rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center text-8xl">
                {filteredItems[selectedImage].thumbnail}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {filteredItems[selectedImage].title}
                </h3>
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    {filteredItems[selectedImage].type === 'video' ? (
                      <Video className="h-4 w-4" />
                    ) : (
                      <Camera className="h-4 w-4" />
                    )}
                    <span className="capitalize">{filteredItems[selectedImage].type}</span>
                  </div>
                  <span className="capitalize">{filteredItems[selectedImage].category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coming Soon Notice */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">2025 Tournament Documentation</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Professional photography and videography services will capture every moment of the 
            2025 tournament. Stay tuned for live updates and post-event galleries.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <Camera className="h-5 w-5" />
              <span>Live Photo Updates</span>
            </div>
            <div className="flex items-center space-x-2">
              <Video className="h-5 w-5" />
              <span>Match Recordings</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>📱</span>
              <span>Social Media Coverage</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;