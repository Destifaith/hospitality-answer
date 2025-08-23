"use client"

import { useState } from "react"
import Image from "next/image"
import { Car, Users, Fuel, Settings, MapPin, Star } from "lucide-react"
import styles from "../style/AvailableCars.module.css"

interface CarRental {
  id: string
  name: string
  category: string
  image: string
  pricePerDay: number
  location: string
  rating: number
  features: {
    seats: number
    transmission: string
    fuelType: string
    airConditioning: boolean
  }
  available: boolean
  description: string
}

const carRentals: CarRental[] = [
  {
    id: "1",
    name: "Toyota Camry",
    category: "Sedan",
    image: "/Home/cars/toyota-camry-rental.png",
    pricePerDay: 45,
    location: "Accra Airport",
    rating: 4.8,
    features: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
      airConditioning: true,
    },
    available: true,
    description: "Comfortable and reliable sedan perfect for business trips and city driving.",
  },
  {
    id: "2",
    name: "Honda CR-V",
    category: "SUV",
    image: "/Home/cars/honda-crv-rental.png",
    pricePerDay: 65,
    location: "Kumasi Central",
    rating: 4.9,
    features: {
      seats: 7,
      transmission: "Automatic",
      fuelType: "Petrol",
      airConditioning: true,
    },
    available: true,
    description: "Spacious SUV ideal for family trips and off-road adventures.",
  },
  {
    id: "3",
    name: "Nissan Sentra",
    category: "Compact",
    image: "/Home/cars/nissan-sentra-rental.png",
    pricePerDay: 35,
    location: "Takoradi Port",
    rating: 4.6,
    features: {
      seats: 5,
      transmission: "Manual",
      fuelType: "Petrol",
      airConditioning: true,
    },
    available: true,
    description: "Economical compact car perfect for budget-conscious travelers.",
  },
  {
    id: "4",
    name: "Ford Explorer",
    category: "SUV",
    image: "/Home/cars/ford-explorer-rental.png",
    pricePerDay: 85,
    location: "Accra Airport",
    rating: 4.7,
    features: {
      seats: 8,
      transmission: "Automatic",
      fuelType: "Petrol",
      airConditioning: true,
    },
    available: false,
    description: "Premium SUV with luxury features for executive travel and large groups.",
  },
  {
    id: "5",
    name: "Hyundai Elantra",
    category: "Sedan",
    image: "/Home/cars/hyundai-elantra-rental.png",
    pricePerDay: 40,
    location: "Cape Coast",
    rating: 4.5,
    features: {
      seats: 5,
      transmission: "Automatic",
      fuelType: "Petrol",
      airConditioning: true,
    },
    available: true,
    description: "Modern sedan with excellent fuel efficiency and comfort features.",
  },
  {
    id: "6",
    name: "Toyota Land Cruiser",
    category: "SUV",
    image: "/Home/cars/toyota-landcruiser-rental.png",
    pricePerDay: 120,
    location: "Tamale Airport",
    rating: 4.9,
    features: {
      seats: 8,
      transmission: "Automatic",
      fuelType: "Diesel",
      airConditioning: true,
    },
    available: true,
    description: "Rugged 4WD vehicle perfect for safari tours and rough terrain exploration.",
  },
]

const locations = ["All Locations", "Accra Airport", "Kumasi Central", "Takoradi Port", "Cape Coast", "Tamale Airport"]
const categories = ["All Categories", "Sedan", "SUV", "Compact"]

export default function AvailableCars() {
  const [selectedLocation, setSelectedLocation] = useState("All Locations")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")

  const filteredCars = carRentals.filter((car) => {
    const locationMatch = selectedLocation === "All Locations" || car.location === selectedLocation
    const categoryMatch = selectedCategory === "All Categories" || car.category === selectedCategory
    return locationMatch && categoryMatch
  })

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Available Cars for Rent</h2>
          <p className={styles.description}>
            Choose from our premium fleet of well-maintained vehicles. Perfect for business trips, family vacations, or
            exploring Ghana&apos;s beautiful destinations.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <MapPin className={styles.filterIcon} />
            <select
              className={styles.select}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterGroup}>
            <Car className={styles.filterIcon} />
            <select
              className={styles.select}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cars Grid */}
        <div className={styles.carsGrid}>
          {filteredCars.map((car) => (
            <div key={car.id} className={styles.carCard}>
              <div className={styles.imageContainer}>
                <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className={styles.carImage} />
                <div className={`${styles.availabilityBadge} ${car.available ? styles.available : styles.unavailable}`}>
                  {car.available ? "Available" : "Unavailable"}
                </div>
                <div className={styles.categoryBadge}>{car.category}</div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.carName}>{car.name}</h3>
                  <div className={styles.rating}>
                    <Star className={styles.starIcon} />
                    <span className={styles.ratingText}>{car.rating}</span>
                  </div>
                </div>

                <div className={styles.location}>
                  <MapPin className={styles.locationIcon} />
                  <span className={styles.locationText}>{car.location}</span>
                </div>

                <p className={styles.carDescription}>{car.description}</p>

                {/* Features */}
                <div className={styles.featuresGrid}>
                  <div className={styles.feature}>
                    <Users className={styles.featureIcon} />
                    <span>{car.features.seats} seats</span>
                  </div>
                  <div className={styles.feature}>
                    <Settings className={styles.featureIcon} />
                    <span>{car.features.transmission}</span>
                  </div>
                  <div className={styles.feature}>
                    <Fuel className={styles.featureIcon} />
                    <span>{car.features.fuelType}</span>
                  </div>
                  <div className={styles.feature}>
                    <Car className={styles.featureIcon} />
                    <span>A/C</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className={styles.pricing}>
                  <div className={styles.priceContainer}>
                    <div>
                      <span className={styles.price}>₵{car.pricePerDay}</span>
                      <span className={styles.priceUnit}>/day</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={styles.actions}>
                  <button className={`${styles.button} ${styles.buttonOutline}`} disabled={!car.available}>
                    View Details
                  </button>
                  <button className={`${styles.button} ${styles.buttonPrimary}`} disabled={!car.available}>
                    {car.available ? "Book Now" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCars.length === 0 && (
          <div className={styles.emptyState}>
            <Car className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No cars found</h3>
            <p className={styles.emptyDescription}>Try adjusting your filters to see more options.</p>
          </div>
        )}
      </div>
    </section>
  )
}
