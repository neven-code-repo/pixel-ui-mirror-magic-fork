
import React, { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const businesses = [
  { name: "Papa Joe Burger", city: "Columbus, Ohio", emoji: "🍔" },
  { name: "Fresh Cuts Salon", city: "Phoenix, Arizona", emoji: "💇" },
  { name: "Green Thumb Gardens", city: "Portland, Oregon", emoji: "🌿" },
  { name: "Tech Solutions Pro", city: "Austin, Texas", emoji: "💻" },
  { name: "Sweet Treats Bakery", city: "Miami, Florida", emoji: "🧁" },
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
              <div className="text-sm text-[#1e2b86] bg-[#E5DEFF] p-3 rounded-lg">
                <span className="mr-2">{business.emoji}</span>
                <span className="font-medium">{business.name}</span>
                <span className="text-[#1e2b86]/70"> from {business.city} just completed the quiz</span>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
