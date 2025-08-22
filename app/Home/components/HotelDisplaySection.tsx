"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../style/HotelDisplaySection.module.css';

// Define the type for a Hotel object with coordinates
interface Hotel {
  id: number;
  name: string;
  location: string;
  pricePerNight: number;
  rating: number;
  imageUrl: string;
  description: string;
  latitude: number;
  longitude: number;
}

// Dummy hotel data with latitude and longitude coordinates
const allHotels: Hotel[] = [
  {
    id: 1,
    name: 'The Grand Palace Hotel',
    location: 'Accra, Ghana',
    pricePerNight: 250,
    rating: 4.8,
    imageUrl: 'https://placehold.co/600x400/007bff/ffffff?text=Grand+Palace+Hotel',
    description: 'A luxurious stay in the heart of Accra, offering stunning city views and world-class amenities.',
    latitude: 5.6037, // Accra coordinates
    longitude: -0.1870,
  },
  {
    id: 2,
    name: 'Coastal Retreat Kasoa',
    location: 'Kasoa, Ghana',
    pricePerNight: 180,
    rating: 4.5,
    imageUrl: 'https://placehold.co/600x400/28a745/ffffff?text=Coastal+Retreat',
    description: 'Escape to this serene retreat near the coast in Kasoa, perfect for a peaceful getaway.',
    latitude: 5.5684, // Kasoa coordinates
    longitude: -0.4284,
  },
  {
    id: 3,
    name: 'City Suites Accra',
    location: 'Accra, Ghana',
    pricePerNight: 150,
    rating: 4.2,
    imageUrl: 'https://placehold.co/600x400/ffc107/333333?text=City+Suites',
    description: 'Comfortable and affordable suites located conveniently in Accra\'s bustling commercial district.',
    latitude: 5.5907, // Accra coordinates
    longitude: -0.1980,
  },
  {
    id: 4,
    name: 'Hillside Haven Kasoa',
    location: 'Kasoa, Ghana',
    pricePerNight: 200,
    rating: 4.6,
    imageUrl: 'https://placehold.co/600x400/dc3545/ffffff?text=Hillside+Haven',
    description: 'Enjoy panoramic views and fresh air from this beautiful haven nestled in the hills of Kasoa.',
    latitude: 5.5501, // Kasoa coordinates
    longitude: -0.4215,
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

const HotelDisplaySection: React.FC = () => {
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [status, setStatus] = useState<'loading' | 'success' | 'denied'>('loading');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Filter hotels between 1 and 100 km from the user's location
          const nearbyHotels = allHotels.filter(hotel => {
            const distance = haversineDistance(
              latitude,
              longitude,
              hotel.latitude,
              hotel.longitude
            );
            return distance >= 1 && distance <= 100;
          });

          setFilteredHotels(nearbyHotels);
          setStatus('success');
        },
        (error) => {
          console.error("Geolocation error:", error);
          setStatus('denied');
          // If the user denies location, show all hotels as a fallback
          setFilteredHotels(allHotels);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setStatus('denied');
      setFilteredHotels(allHotels);
    }
  }, []);

  const renderContent = () => {
    if (status === 'loading') {
      return (
        <p className="text-center text-lg text-gray-600">
          Checking your location to find nearby hotels...
        </p>
      );
    }

    if (filteredHotels.length === 0) {
      return (
        <p className="text-center text-lg text-gray-600">
          No hotels found within 100km of your location. Displaying all hotels.
        </p>
      );
    }

    return (
      <div className={styles.hotelGrid}>
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className={styles.hotelCard}>
            <Image
              src={hotel.imageUrl}
              alt={hotel.name}
              className={styles.hotelImage}
              width={600}
              height={400}
              priority
            />
            <div className="p-6">
              <h3 className={`${styles.hotelName} text-2xl font-semibold text-gray-800 mb-2`}>{hotel.name}</h3>
              <p className={`${styles.hotelLocation} text-gray-600 mb-3`}>📍 {hotel.location}</p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className={`${styles.hotelRating} text-gray-700 ml-1`}>{hotel.rating} / 5</span>
              </div>
              <p className={`${styles.hotelDescription} text-gray-700 mb-4 text-base`}>
                {hotel.description}
              </p>
              <div className={styles.priceButtonRow}>
  <span className={styles.hotelPrice}>
    GH₵{hotel.pricePerNight}
    <span>/night</span>
  </span>
  <button className={styles.bookButton}>Book Now</button>
</div>

            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={`${styles.hotelSection} py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 rounded-lg shadow-inner`}>
      <div className="max-w-7xl mx-auto">
        <h2 className={`${styles.sectionTitle} text-4xl font-extrabold text-gray-900 text-center mb-10`}>
          Featured Hotels in Ghana
        </h2>
        {renderContent()}
      </div>
    </section>
  );
};

export default HotelDisplaySection;