"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import styles from "../style/TourPackages.module.css"

// Define the type for a Tour Package object
interface TourPackage {
  id: number
  name: string
  destination: string
  duration: string
  price: number
  rating: number
  imageUrl: string
  description: string
  highlights: string[]
}

// Tour packages data
const tourPackages: TourPackage[] = [
  {
    id: 1,
    name: "Cape Coast Castle Adventure",
    destination: "Cape Coast, Ghana",
    duration: "3 Days, 2 Nights",
    price: 450,
    rating: 4.9,
    imageUrl: "/Home/others/cape-coast-castle-tour.png",
    description: "Explore the historic Cape Coast Castle and learn about Ghana&apos;s rich cultural heritage.",
    highlights: ["Castle Tour", "Canopy Walk", "Local Cuisine", "Cultural Shows"],
  },
  {
    id: 2,
    name: "Kakum National Park Safari",
    destination: "Kakum, Ghana",
    duration: "2 Days, 1 Night",
    price: 320,
    rating: 4.7,
    imageUrl: "/Home/others/placeholder-0v60l.png",
    description: "Experience the breathtaking canopy walkway and diverse wildlife of Kakum National Park.",
    highlights: ["Canopy Walkway", "Wildlife Spotting", "Nature Trails", "Bird Watching"],
  },
  {
    id: 3,
    name: "Kumasi Cultural Experience",
    destination: "Kumasi, Ghana",
    duration: "4 Days, 3 Nights",
    price: 580,
    rating: 4.8,
    imageUrl: "/Home/others/kumasi-ashanti-palace.png",
    description: "Immerse yourself in Ashanti culture with visits to palaces, markets, and traditional ceremonies.",
    highlights: ["Manhyia Palace", "Kejetia Market", "Kente Weaving", "Traditional Ceremonies"],
  },
  {
    id: 4,
    name: "Volta Region Waterfalls Tour",
    destination: "Volta Region, Ghana",
    duration: "3 Days, 2 Nights",
    price: 420,
    rating: 4.6,
    imageUrl: "/Home/others/placeholder-330ah.png",
    description: "Discover the stunning waterfalls and scenic landscapes of the Volta Region.",
    highlights: ["Wli Waterfalls", "Mount Afadja", "Tafi Monkey Sanctuary", "Local Villages"],
  },
  {
    id: 5,
    name: "Accra City & Beach Combo",
    destination: "Accra, Ghana",
    duration: "2 Days, 1 Night",
    price: 280,
    rating: 4.5,
    imageUrl: "/Home/others/accra-beaches-independence-arch-modern.png",
    description: "Explore Ghana&apos;s vibrant capital city and relax on beautiful coastal beaches.",
    highlights: ["Independence Arch", "Labadi Beach", "National Museum", "Makola Market"],
  },
  {
    id: 6,
    name: "Northern Ghana Cultural Safari",
    destination: "Tamale & Mole, Ghana",
    duration: "5 Days, 4 Nights",
    price: 750,
    rating: 4.9,
    imageUrl: "/Home/others/mole-elephants-ghana.png",
    description: "Experience the unique culture and wildlife of Northern Ghana including Mole National Park.",
    highlights: ["Mole National Park", "Elephant Safari", "Traditional Villages", "Larabanga Mosque"],
  },
]

const TourPackages: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === tourPackages.length - 1 ? 0 : prevIndex + 1))
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? tourPackages.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === tourPackages.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <section className={styles.tourSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Discover Amazing Tour Packages</h2>
        <p className={styles.sectionSubtitle}>
          {/* Explore Ghana's most beautiful destinations with our carefully curated tour packages */}
          Explore Ghana&apos;s most beautiful destinations with our carefully curated tour packages
        </p>

        <div
          className={styles.carousel}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className={styles.carouselTrack} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {tourPackages.map((tour) => (
              <div key={tour.id} className={styles.tourCard}>
                <div className={styles.imageContainer}>
                  <Image
                    src={tour.imageUrl || "/placeholder.svg"}
                    alt={tour.name}
                    className={styles.tourImage}
                    width={600}
                    height={400}
                    priority={tour.id <= 2}
                  />
                  <div className={styles.ratingBadge}>
                    <span className={styles.star}>⭐</span>
                    <span>{tour.rating}</span>
                  </div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.tourName}>{tour.name}</h3>
                  <p className={styles.destination}>📍 {tour.destination}</p>
                  <p className={styles.duration}>🕒 {tour.duration}</p>

                  <p className={styles.description}>{tour.description}</p>

                  <div className={styles.highlights}>
                    {tour.highlights.slice(0, 3).map((highlight, index) => (
                      <span key={index} className={styles.highlight}>
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className={styles.priceButtonRow}>
                    <div className={styles.priceContainer}>
                      <span className={styles.price}>GH₵{tour.price}</span>
                      <span className={styles.priceLabel}>per person</span>
                    </div>
                    <button className={styles.exploreButton}>Explore Package</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            className={`${styles.navButton} ${styles.prevButton}`}
            onClick={goToPrevious}
            aria-label="Previous tour"
          >
            ‹
          </button>
          <button className={`${styles.navButton} ${styles.nextButton}`} onClick={goToNext} aria-label="Next tour">
            ›
          </button>

          {/* Dots indicator */}
          <div className={styles.dotsContainer}>
            {tourPackages.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TourPackages
