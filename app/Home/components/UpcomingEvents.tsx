"use client"

import { useState, useEffect } from "react"
import { MapPin, Calendar, Clock, Users } from "lucide-react"
import Image from "next/image"
import styles from "../style/UpcomingEvents.module.css"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  city: string
  category: "beach" | "spa" | "gym"
  price: number
  capacity: number
  enrolled: number
  image: string
  featured?: boolean
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Sunrise Beach Yoga",
    description: "Start your day with energizing yoga session on the pristine beach with ocean views.",
    date: "2024-01-15",
    time: "06:00",
    location: "Labadi Beach",
    city: "Accra",
    category: "beach",
    price: 50,
    capacity: 25,
    enrolled: 18,
    image: "/Home/others/sunrise-beach-yoga.png",
    featured: true,
  },
  {
    id: "2",
    title: "Deep Tissue Massage Workshop",
    description: "Learn professional massage techniques in our luxury spa environment.",
    date: "2024-01-16",
    time: "14:00",
    location: "Serenity Spa & Wellness",
    city: "Accra",
    category: "spa",
    price: 120,
    capacity: 12,
    enrolled: 8,
    image: "/Home/others/luxury-spa-massage.png",
  },
  {
    id: "3",
    title: "HIIT Bootcamp Challenge",
    description: "High-intensity interval training session designed to push your limits.",
    date: "2024-01-17",
    time: "18:00",
    location: "FitZone Gym",
    city: "Kumasi",
    category: "gym",
    price: 30,
    capacity: 20,
    enrolled: 15,
    image: "/Home/others/high-intensity-workout.png",
  },
  {
    id: "4",
    title: "Aqua Fitness Class",
    description: "Low-impact water aerobics perfect for all fitness levels.",
    date: "2024-01-18",
    time: "10:00",
    location: "Kokrobite Beach Resort",
    city: "Accra",
    category: "beach",
    price: 40,
    capacity: 30,
    enrolled: 22,
    image: "/Home/others/placeholder-ary0b.png",
  },
  {
    id: "5",
    title: "Aromatherapy & Meditation",
    description: "Relax and rejuvenate with guided meditation and essential oils.",
    date: "2024-01-19",
    time: "16:00",
    location: "Tranquil Minds Spa",
    city: "Kumasi",
    category: "spa",
    price: 80,
    capacity: 15,
    enrolled: 12,
    image: "/Home/others/aromatherapy-meditation-spa.png",
  },
  {
    id: "6",
    title: "Strength Training Masterclass",
    description: "Master proper form and technique with our certified trainers.",
    date: "2024-01-20",
    time: "17:00",
    location: "PowerHouse Fitness",
    city: "Tamale",
    category: "gym",
    price: 45,
    capacity: 18,
    enrolled: 10,
    image: "/Home/others/strength-training-gym.png",
  },
]

const cities = ["All Cities", "Accra", "Kumasi", "Tamale"]
const categories = [
  { value: "all", label: "All Categories", icon: "🏃" },
  { value: "beach", label: "Beach Activities", icon: "🏖️" },
  { value: "spa", label: "Spa & Wellness", icon: "🧘" },
  { value: "gym", label: "Gym & Fitness", icon: "💪" },
]

export default function UpcomingEvents() {
  const [selectedCity, setSelectedCity] = useState("All Cities")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents)

  useEffect(() => {
    let filtered = mockEvents

    if (selectedCity !== "All Cities") {
      filtered = filtered.filter((event) => event.city === selectedCity)
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    setFilteredEvents(filtered)
  }, [selectedCity, selectedCategory])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beach":
        return `${styles.categoryBadge} ${styles.beach}`
      case "spa":
        return `${styles.categoryBadge} ${styles.spa}`
      case "gym":
        return `${styles.categoryBadge} ${styles.gym}`
      default:
        return styles.categoryBadge
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Upcoming Events</h2>
          <p className={styles.description}>
            Discover exciting recreation and fitness events near you. From beach activities to spa treatments and gym
            sessions.
          </p>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <div className={styles.locationFilter}>
            <MapPin className={styles.locationIcon} />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={styles.selectTrigger}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.categoryButtons}>
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`${styles.categoryButton} ${selectedCategory === category.value ? styles.active : ""}`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className={styles.eventsGrid}>
          {filteredEvents.map((event) => (
            <div key={event.id} className={styles.eventCard}>
              <div className={styles.imageContainer}>
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={300}
                  height={200}
                  className={styles.eventImage}
                />
                {event.featured && <div className={styles.featuredBadge}>Featured</div>}
                <div className={getCategoryColor(event.category)}>
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </div>
              </div>

              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{event.title}</h3>
                <p className={styles.cardDescription}>{event.description}</p>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.eventDetails}>
                  <div className={styles.detailRow}>
                    <Calendar className={styles.detailIcon} />
                    <span>{formatDate(event.date)}</span>
                    <Clock className={styles.detailIcon} style={{ marginLeft: "0.5rem" }} />
                    <span>{event.time}</span>
                  </div>

                  <div className={styles.detailRow}>
                    <MapPin className={styles.detailIcon} />
                    <span>
                      {event.location}, {event.city}
                    </span>
                  </div>

                  <div className={styles.detailRow}>
                    <Users className={styles.detailIcon} />
                    <span>
                      {event.enrolled}/{event.capacity} enrolled
                    </span>
                  </div>

                  <div className={styles.priceRow}>
                    <span className={styles.price}>₵{event.price}</span>
                    <div className={styles.progressContainer}>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${(event.enrolled / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button className={styles.joinButton} disabled={event.enrolled >= event.capacity}>
                  {event.enrolled >= event.capacity ? "Fully Booked" : "Join Event"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>
              No events found for the selected filters. Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
