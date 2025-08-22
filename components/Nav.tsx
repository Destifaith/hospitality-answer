"use client";
import { useState, useEffect,MouseEvent as ReactMouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';

const Nav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (dropdownName: string) => (e: ReactMouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const handleMouseEnter = (dropdownName: string) => {
    if (window.innerWidth > 768) { // Only on desktop
      setOpenDropdown(dropdownName);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) { // Only on desktop
      setOpenDropdown(null);
    }
  };

  const closeAllDropdowns = () => {
    setOpenDropdown(null);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const navElement = document.querySelector(`.${styles.nav}`);
      if (navElement && !navElement.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        closeAllDropdowns();
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      const navElement = document.querySelector(`.${styles.nav}`);
      if (navElement) {
        if (window.scrollY > 50) {
          navElement.classList.add(styles.scrolled);
        } else {
          navElement.classList.remove(styles.scrolled);
        }
      }
    };

    document.addEventListener('click', handleOutsideClick);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.navLogo}>
        <Link href="/">
          <Image
            src="/path/to/your/logo.svg"
            alt="Hospitality Answers Logo"
            width={150}
            height={50}
            className={styles.logoImage}
            priority
          />
        </Link>
      </div>

      <div className={styles.navMobile}>
        <button
          onClick={toggleMobileMenu}
          className={`${styles.navToggle} ${isMobileMenuOpen ? styles.active : ''}`}
          aria-expanded={isMobileMenuOpen ? "true" : "false"}
          aria-controls="nav-list"
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <ul id="nav-list" className={`${styles.navList} ${isMobileMenuOpen ? styles.open : ''}`}>
        <li>
          <Link href="/" className={styles.navLink}>Home</Link>
        </li>

        {/* Accommodation Dropdown */}
        <li
          className={styles.hasDropdown}
          onMouseEnter={() => handleMouseEnter('accommodation')}
          onMouseLeave={handleMouseLeave}
        >
          <a 
            href="#" 
            onClick={toggleDropdown('accommodation')}
            className={styles.navLink}
            aria-expanded={openDropdown === 'accommodation'}
          >
            Accommodation
            <svg className={styles.dropdownIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </a>
          <ul className={`${styles.navDropdown} ${openDropdown === 'accommodation' ? styles.open : ''}`}>
            <li><Link href="/hotels" className={styles.dropdownLink}>Hotels</Link></li>
            <li><Link href="/air-bnb" className={styles.dropdownLink}>Airbnb</Link></li>
            <li><Link href="/resorts" className={styles.dropdownLink}>Resorts</Link></li>
          </ul>
        </li>

        {/* Dining Dropdown */}
        <li
          className={styles.hasDropdown}
          onMouseEnter={() => handleMouseEnter('dining')}
          onMouseLeave={handleMouseLeave}
        >
          <a 
            href="#" 
            onClick={toggleDropdown('dining')}
            className={styles.navLink}
            aria-expanded={openDropdown === 'dining'}
          >
            Dining
            <svg className={styles.dropdownIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </a>
          <ul className={`${styles.navDropdown} ${openDropdown === 'dining' ? styles.open : ''}`}>
            <li><Link href="/restaurants" className={styles.dropdownLink}>Restaurants</Link></li>
            <li><Link href="/cafes" className={styles.dropdownLink}>Cafes & Eateries</Link></li>
            <li><Link href="/pubs" className={styles.dropdownLink}>Pubs & Bars</Link></li>
            <li><Link href="/lounges" className={styles.dropdownLink}>Lounges</Link></li>
          </ul>
        </li>

        {/* Wellness Dropdown */}
        <li
          className={styles.hasDropdown}
          onMouseEnter={() => handleMouseEnter('wellness')}
          onMouseLeave={handleMouseLeave}
        >
          <a 
            href="#" 
            onClick={toggleDropdown('wellness')}
            className={styles.navLink}
            aria-expanded={openDropdown === 'wellness'}
          >
            Wellness
            <svg className={styles.dropdownIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </a>
          <ul className={`${styles.navDropdown} ${openDropdown === 'wellness' ? styles.open : ''}`}>
            <li><Link href="/gyms" className={styles.dropdownLink}>Gyms & Fitness</Link></li>
            <li><Link href="/spa" className={styles.dropdownLink}>Spa & Massage</Link></li>
            <li><Link href="/wellness-centers" className={styles.dropdownLink}>Wellness Centers</Link></li>
          </ul>
        </li>

        {/* Activities Dropdown */}
        <li
          className={styles.hasDropdown}
          onMouseEnter={() => handleMouseEnter('activities')}
          onMouseLeave={handleMouseLeave}
        >
          <a 
            href="#" 
            onClick={toggleDropdown('activities')}
            className={styles.navLink}
            aria-expanded={openDropdown === 'activities'}
          >
            Activities
            <svg className={styles.dropdownIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </a>
          <ul className={`${styles.navDropdown} ${openDropdown === 'activities' ? styles.open : ''}`}>
            <li><Link href="/tours" className={styles.dropdownLink}>Tours & Excursions</Link></li>
            <li><Link href="/events" className={styles.dropdownLink}>Events</Link></li>
            <li><Link href="/beaches" className={styles.dropdownLink}>Beaches</Link></li>
            <li><Link href="/adventure" className={styles.dropdownLink}>Adventure Sports</Link></li>
          </ul>
        </li>

        {/* Services Dropdown */}
        <li
          className={styles.hasDropdown}
          onMouseEnter={() => handleMouseEnter('services')}
          onMouseLeave={handleMouseLeave}
        >
          <a 
            href="#" 
            onClick={toggleDropdown('services')}
            className={styles.navLink}
            aria-expanded={openDropdown === 'services'}
          >
            Services
            <svg className={styles.dropdownIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </a>
          <ul className={`${styles.navDropdown} ${openDropdown === 'services' ? styles.open : ''}`}>
            <li><Link href="/car-rentals" className={styles.dropdownLink}>Car Rentals</Link></li>
            <li><Link href="/shopping" className={styles.dropdownLink}>Shopping Areas</Link></li>
            <li><Link href="/transportation" className={styles.dropdownLink}>Transportation</Link></li>
            <li><Link href="/travel-services" className={styles.dropdownLink}>Travel Services</Link></li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;