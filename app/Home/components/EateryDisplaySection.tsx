"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../style/EateryDisplaySection.module.css';

// Define the type for an Eatery object with coordinates
interface Eatery {
  id: number;
  name: string;
  type: string;
  location: string;
  description: string;
  imageUrl: string;
  latitude: number;
  longitude: number;
}

// Dummy data for various eateries with coordinates
const allEateries: Eatery[] = [
  {
    id: 1,
    name: 'Green Leaf Cafe',
    type: 'Cafe',
    location: 'Accra, Ghana',
    description: 'A serene cafe offering fresh brews and organic meals in a peaceful setting.',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/9e/4e/cf/dining-room.jpg?w=600&h=400&s=1',
    latitude: 5.6148,
    longitude: -0.2058,
  },
  {
    id: 2,
    name: 'Kasoa Grills & Pub',
    type: 'Pub & Grill',
    location: 'Kasoa, Ghana',
    description: 'The best spot for grilled food and cold drinks, with a lively and welcoming atmosphere.',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/9e/4e/cf/dining-room.jpg?w=600&h=400&s=1',
    latitude: 5.5684,
    longitude: -0.4284,
  },
  {
    id: 3,
    name: 'The Lounge Corner',
    type: 'Lounge',
    location: 'Accra, Ghana',
    description: 'An elegant lounge perfect for evening meetups, with great cocktails and music.',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/9e/4e/cf/dining-room.jpg?w=600&h=400&s=1',
    latitude: 5.6037,
    longitude: -0.1870,
  },
  {
    id: 4,
    name: 'Local Joint Kasoa',
    type: 'Restaurant',
    location: 'Kasoa, Ghana',
    description: 'Authentic local dishes prepared with fresh ingredients, a true taste of Ghana.',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/9e/4e/cf/dining-room.jpg?w=600&h=400&s=1',
    latitude: 5.5501,
    longitude: -0.4215,
  },
  {
    id: 5,
    name: 'Urban Eats',
    type: 'Restaurant',
    location: 'Accra, Ghana',
    description: 'A modern urban restaurant with a diverse menu and a vibrant, friendly environment.',
    imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/9e/4e/cf/dining-room.jpg?w=600&h=400&s=1',
    latitude: 5.5907,
    longitude: -0.1980,
  },
];

// Helper function to calculate distance using the Haversine formula
const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in km
  const toRadians = (deg: number) => deg * (Math.PI / 180);
  
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
};

const EateryDisplaySection: React.FC = () => {
  const [filteredEateries, setFilteredEateries] = useState<Eatery[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'denied'>('loading');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          const nearbyEateries = allEateries.filter(eatery => {
            const distance = haversineDistance(
              latitude,
              longitude,
              eatery.latitude,
              eatery.longitude
            );
            return distance >= 1 && distance <= 100;
          });

          setFilteredEateries(nearbyEateries);
          setStatus('success');
        },
        (error) => {
          console.error("Geolocation error:", error);
          setStatus('denied');
          // Fallback: show all eateries if location is denied
          setFilteredEateries(allEateries);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setStatus('denied');
      setFilteredEateries(allEateries);
    }
  }, []);

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <p className="text-center text-lg text-gray-600">
          Checking your location to find nearby eateries...
        </p>
      );
    }

    if (filteredEateries.length === 0) {
      return (
        <p className="text-center text-lg text-gray-600">
          No eateries found within 100km of your location. Displaying all options.
        </p>
      );
    }

    return (
      <div className={styles.eateryGrid}>
        {filteredEateries.map((eatery) => (
          <div key={eatery.id} className={styles.eateryCard}>
            <Image
              src={eatery.imageUrl}
              alt={eatery.name}
              className={styles.eateryImage}
              width={600}
              height={400}
              priority
            />
            <div className="p-6">
              <h3 className={`${styles.eateryName} text-2xl font-semibold text-gray-800 mb-2`}>{eatery.name}</h3>
              <p className={`${styles.eateryLocation} text-gray-600 mb-3`}>📍 {eatery.location}</p>
              <div className="flex items-center mb-4">
                <span className="text-sm font-semibold text-green-700 uppercase">{eatery.type}</span>
              </div>
              <p className={`${styles.eateryDescription} text-gray-700 mb-4 text-base`}>
                {eatery.description}
              </p>
                     <div className={styles.buttonContainer}>
                        <button className={styles.exploreButton}>
                         Explore
                         </button>
                    </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={`${styles.eaterySection} py-12 px-4 sm:px-6 lg:px-8 bg-green-50 rounded-lg shadow-inner`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`${styles.sectionTitle} text-4xl font-extrabold text-green-900 text-center mb-10`}>
          Nearby Eateries & Lounges 🍔
        </h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default EateryDisplaySection;