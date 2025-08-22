"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../style/TourPackages.module.css';

interface TourPackage {
  id: number;
  name: string;
  duration: string;
  price: number;
  description: string;
  imageUrl: string;
}

const tourPackages: TourPackage[] = [
  {
    id: 1,
    name: 'Ghanaian Coastal Escape',
    duration: '7 Days / 6 Nights',
    price: 999,
    description: 'Explore the stunning beaches and historic slave castles along Ghana\'s coast.',
    imageUrl: 'https://i.natgeofe.com/n/f44f39a2-d5ab-42bb-ba34-242764a0fc94/lionhwange.jpg',
  },
  {
    id: 2,
    name: 'Northern Ghana Safari',
    duration: '5 Days / 4 Nights',
    price: 750,
    description: 'Adventure through Mole National Park and witness a rich diversity of wildlife.',
    imageUrl: 'https://i.natgeofe.com/n/f44f39a2-d5ab-42bb-ba34-242764a0fc94/lionhwange.jpg',
  },
  {
    id: 3,
    name: 'Accra City & Culture Tour',
    duration: '3 Days / 2 Nights',
    price: 450,
    description: 'Discover the vibrant life, markets, and historical sites of Ghana\'s capital city.',
    imageUrl: 'https://i.natgeofe.com/n/f44f39a2-d5ab-42bb-ba34-242764a0fc94/lionhwange.jpg',
  },
  {
    id: 4,
    name: 'Ashanti Kingdom Experience',
    duration: '4 Days / 3 Nights',
    price: 600,
    description: 'Delve into the rich history and traditions of the Ashanti people in Kumasi.',
    imageUrl: 'https://i.natgeofe.com/n/f44f39a2-d5ab-42bb-ba34-242764a0fc94/lionhwange.jpg',
  },
  {
    id: 5,
    name: 'Volta Region Waterfalls Tour',
    duration: '2 Days / 1 Night',
    price: 300,
    description: 'A quick getaway to hike and swim at the beautiful Wli waterfalls.',
    imageUrl: 'https://i.natgeofe.com/n/f44f39a2-d5ab-42bb-ba34-242764a0fc94/lionhwange.jpg',
  },
  {
    id: 6,
    name: 'Eco-Tourism in Central Ghana',
    duration: '6 Days / 5 Nights',
    price: 850,
    description: 'Experience sustainable tourism in the heart of Ghana\'s green belt.',
    imageUrl: 'https://i.natgeofe.com/n/f44f39a2-d5ab-42bb-ba34-242764a0fc94/lionhwange.jpg',
  },
  {
    id: 7,
    name: 'Kumasi Craft & Art Tour',
    duration: '3 Days / 2 Nights',
    price: 500,
    description: 'Learn traditional crafts from local artisans in the cultural hub of Kumasi.',
    imageUrl: 'https://i.natgeofe.com/n/f44f39a2-d5ab-42bb-ba34-242764a0fc94/lionhwange.jpg',
  },
  {
    id: 8,
    name: 'Accra Nightlife Adventure',
    duration: '2 Days / 1 Night',
    price: 250,
    description: 'A fun-filled tour of Accra\'s best clubs, lounges, and nightlife spots.',
    imageUrl: 'https://i.natgeofe.com/n/f44f39a2-d5ab-42bb-ba34-242764a0fc94/lionhwange.jpg',
  },
];

const TourPackages: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const totalCards = tourPackages.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => {
        // Calculate the next start index, and loop back to 0 if at the end
        return (prevIndex + 4) % totalCards;
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalCards]);

  const offset = -startIndex * (100 / 4); // Calculate the transform percentage

  return (
    <section className={styles.tourPackagesSection}>
      <div className={styles.backgroundOverlay}></div>
      <Image 
        src="/Home/tour/beautiful-clouds.jpg" 
        alt="Beautiful clouds background" 
        layout="fill"
        objectFit="cover"
        quality={100}
        className={styles.backgroundImage}
      />
      
      <div className={styles.contentWrapper}>
        <h2 className={styles.sectionTitle}>
          Popular Tour Packages ✈️
        </h2>
        
        <div className={styles.tourGridWrapper}>
          <div 
            className={styles.tourGrid}
            style={{ transform: `translateX(${offset}%)` }}
          >
            {tourPackages.map((tourPackage) => (
              <div key={tourPackage.id} className={styles.tourCard}>
                <Image 
                  src={tourPackage.imageUrl}
                  alt={tourPackage.name}
                  className={styles.tourImage}
                  width={600}
                  height={400}
                  priority
                />
                <div className="p-6">
                  <h3 className={styles.tourName}>{tourPackage.name}</h3>
                  <p className={styles.tourDuration}>{tourPackage.duration}</p>
                  <p className={styles.tourDescription}>{tourPackage.description}</p>
                  <div className={styles.priceContainer}>
                    <span className={styles.tourPrice}>
                      ${tourPackage.price}
                    </span>
                    <button className={styles.viewButton}>View Package</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TourPackages;