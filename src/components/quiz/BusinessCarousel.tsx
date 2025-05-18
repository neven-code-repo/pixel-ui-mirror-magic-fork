
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const businesses = [
  { name: "Splash Pool Services", city: "Miami, Florida", emoji: "🏊" },
  { name: "Clear Waters Pool Care", city: "Orlando, Florida", emoji: "💧" },
  { name: "Blue Lagoon Pools", city: "Tampa, Florida", emoji: "🌊" },
  { name: "Sunshine Pool Maintenance", city: "Jacksonville, Florida", emoji: "☀️" },
  { name: "Gulf Coast Pools", city: "Naples, Florida", emoji: "🐬" },
];

export const BusinessCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % businesses.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full mt-4">
      <Carousel className="w-full">
        <CarouselContent>
          {businesses.map((business, index) => (
            <CarouselItem key={index} className={`${index === currentIndex ? 'block' : 'hidden'}`}>
              <div className="text-sm text-[#1a4b8a] bg-[#e3f0ff] p-3 rounded-lg">
                <span className="mr-2">{business.emoji}</span>
                <span className="font-medium">{business.name}</span>
                <span className="text-[#1a4b8a]/70"> from {business.city} just completed the quiz</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
