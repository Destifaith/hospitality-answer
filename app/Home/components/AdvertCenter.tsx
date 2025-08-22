'use client'

import { useState } from 'react';
import styles from '../style/AdvertCenter.module.css';

// Define a type for your advertisement data structure for type safety
interface Ad {
  id: number;
  title: string;
  company: string;
  category: string;
  price: string;
  description: string;
  features: string[];
  contact: string;
  rating: number;
  reviews: number;
}

const AdvertCenter = () => {
  const [advertisements] = useState<Ad[]>([ // Specify the type for the array
    {
      id: 1,
      title: "Premium Web Design Services",
      company: "DigitalCraft Studio",
      category: "Web Development",
      price: "$2,500 - $8,000",
      description: "Transform your business with stunning, responsive websites. Our expert team creates custom web solutions that drive results and engage your audience.",
      features: ["Responsive Design", "SEO Optimized", "Custom Development", "Mobile First"],
      contact: "contact@digitalcraft.com",
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      title: "Social Media Marketing Package",
      company: "SocialBoost Agency",
      category: "Digital Marketing",
      price: "$500 - $2,000/month",
      description: "Grow your brand's online presence with our comprehensive social media marketing strategies. Increase engagement and drive conversions.",
      features: ["Content Creation", "Analytics Reports", "Community Management", "Ad Campaigns"],
      contact: "hello@socialboost.com",
      rating: 4.7,
      reviews: 89
    },
    {
      id: 3,
      title: "Professional Photography",
      company: "LensArt Studios",
      category: "Photography",
      price: "$200 - $1,500",
      description: "Capture your brand's essence with professional photography services. From product shots to corporate headshots, we deliver exceptional quality.",
      features: ["Product Photography", "Portrait Sessions", "Event Coverage", "Photo Editing"],
      contact: "book@lensart.com",
      rating: 4.8,
      reviews: 156
    },
    {
      id: 4,
      title: "Mobile App Development",
      company: "AppForge Solutions",
      category: "App Development",
      price: "$5,000 - $25,000",
      description: "Build powerful mobile applications for iOS and Android. Our team creates user-friendly apps that solve real problems and delight users.",
      features: ["iOS & Android", "UI/UX Design", "API Integration", "App Store Submission"],
      contact: "dev@appforge.com",
      rating: 4.9,
      reviews: 203
    },
    {
      id: 5,
      title: "Content Writing Services",
      company: "WordSmith Collective",
      category: "Content Creation",
      price: "$50 - $500/article",
      description: "Engage your audience with compelling content that converts. Our writers create blog posts, articles, and copy that drives results.",
      features: ["Blog Writing", "SEO Content", "Copywriting", "Content Strategy"],
      contact: "write@wordsmith.com",
      rating: 4.6,
      reviews: 94
    },
    {
      id: 6,
      title: "Logo & Branding Design",
      company: "Creative Minds Studio",
      category: "Graphic Design",
      price: "$300 - $2,500",
      description: "Create a memorable brand identity with our professional logo and branding services. Stand out from the competition with unique designs.",
      features: ["Logo Design", "Brand Guidelines", "Business Cards", "Brand Strategy"],
      contact: "design@creativeminds.com",
      rating: 4.8,
      reviews: 178
    }
  ]);

  // Tell TypeScript that the state can be either an 'Ad' or 'null'
  const [selectedAd, setSelectedAd] = useState<Ad | null>(advertisements.length > 0 ? advertisements[0] : null);

  const handleAdSelect = (ad: Ad) => {
    setSelectedAd(ad);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`${styles.star} ${i < Math.floor(rating) ? styles.filled : ''}`}>
        ★
      </span>
    ));
  };

  if (!selectedAd) {
    return <div>No advertisements available.</div>;
  }

  return (
    <section className={styles.advertCenter}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Advertisement Center</h2>
          <p className={styles.sectionSubtitle}>
            Discover amazing services and connect with talented professionals
          </p>
        </div>

        <div className={styles.contentWrapper}>
          {/* Left Side - Selected Ad Display */}
          <div className={styles.selectedAdSection}>
            <div className={styles.selectedAdCard}>
              <div className={styles.selectedAdImage}>
                {/* Placeholder for the image */}
                <div className={styles.imagePlaceholder}></div>
                <div className={styles.categoryBadge}>
                  {selectedAd.category}
                </div>
              </div>
              
              <div className={styles.selectedAdContent}>
                <div className={styles.adHeader}>
                  <h3 className={styles.adTitle}>{selectedAd.title}</h3>
                  <div className={styles.companyInfo}>
                    <span className={styles.companyName}>{selectedAd.company}</span>
                    <div className={styles.ratingSection}>
                      <div className={styles.stars}>
                        {renderStars(selectedAd.rating)}
                      </div>
                      <span className={styles.ratingText}>
                        {selectedAd.rating} ({selectedAd.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <p className={styles.adDescription}>{selectedAd.description}</p>

                <div className={styles.featuresSection}>
                  <h4 className={styles.featuresTitle}>What&apos;s Included:</h4>
                  <ul className={styles.featuresList}>
                    {selectedAd.features.map((feature, index) => (
                      <li key={index} className={styles.featureItem}>
                        <span className={styles.checkIcon}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.adFooter}>
                  <div className={styles.priceSection}>
                    <span className={styles.priceLabel}>Starting from</span>
                    <span className={styles.price}>{selectedAd.price}</span>
                  </div>
                  
                  <div className={styles.actionButtons}>
                    <button className={styles.contactBtn}>
                      Contact Now
                    </button>
                    <button className={styles.saveBtn}>
                      ♡ Save
                    </button>
                  </div>
                </div>

                <div className={styles.contactInfo}>
                  <span className={styles.contactLabel}>Contact:</span>
                  <a href={`mailto:${selectedAd.contact}`} className={styles.contactEmail}>
                    {selectedAd.contact}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Ads List */}
          <div className={styles.adsListSection}>
            <div className={styles.adsListHeader}>
              <h4 className={styles.listTitle}>Browse Services</h4>
              <span className={styles.adsCount}>
                {advertisements.length} services available
              </span>
            </div>

            <div className={styles.adsList}>
              {advertisements.map((ad) => (
                <div 
                  key={ad.id}
                  className={`${styles.adCard} ${selectedAd.id === ad.id ? styles.active : ''}`}
                  onClick={() => handleAdSelect(ad)}
                >
                  <div className={styles.cardImage}>
                    {/* Placeholder for the image in the list */}
                    <div className={styles.imagePlaceholderSmall}></div>
                  </div>
                  
                  <div className={styles.cardContent}>
                    <h5 className={styles.cardTitle}>{ad.title}</h5>
                    <p className={styles.cardCompany}>{ad.company}</p>
                    <div className={styles.cardMeta}>
                      <span className={styles.cardCategory}>{ad.category}</span>
                      <div className={styles.cardRating}>
                        <span className={styles.ratingIcon}>★</span>
                        <span>{ad.rating}</span>
                      </div>
                    </div>
                    <p className={styles.cardPrice}>{ad.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvertCenter;