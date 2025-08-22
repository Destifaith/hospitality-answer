"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './info-nav.module.css';

const InfoNav = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(3); // Example count

  const currencyRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'GHS', symbol: '₵', name: 'Ghana Cedi' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' }
  ];

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'PT', name: 'Português', flag: '🇵🇹' }
  ];

  const toggleCurrency = () => {
    setIsCurrencyOpen(!isCurrencyOpen);
    setIsLanguageOpen(false);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
    setIsCurrencyOpen(false);
  };

  const selectCurrency = (currency: typeof currencies[0]) => {
    setSelectedCurrency(currency.code);
    setIsCurrencyOpen(false);
  };

  const selectLanguage = (language: typeof languages[0]) => {
    setSelectedLanguage(language.code);
    setIsLanguageOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target as Node)) {
        setIsCurrencyOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentCurrency = () => currencies.find(c => c.code === selectedCurrency);
  const getCurrentLanguage = () => languages.find(l => l.code === selectedLanguage);

  return (
    <div className={styles.infoNav}>
      <div className={styles.container}>
        {/* Left side - Contact Info */}
        <div className={styles.leftSection}>
          <div className={styles.contactInfo}>
            <span className={styles.contactItem}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +233 123 456 789
            </span>
            <span className={styles.contactItem}>
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              info@hospitalityanswers.com
            </span>
          </div>
        </div>

        {/* Right side - Controls */}
        <div className={styles.rightSection}>
          {/* Currency Selector */}
          <div className={styles.dropdown} ref={currencyRef}>
            <button 
              className={styles.dropdownToggle}
              onClick={toggleCurrency}
              aria-expanded={isCurrencyOpen}
              title={`Currency: ${getCurrentCurrency()?.name || 'US Dollar'}`}
            >
              <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span className={styles.compactText}>{getCurrentCurrency()?.symbol} {selectedCurrency}</span>
              <svg className={`${styles.chevron} ${isCurrencyOpen ? styles.open : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            
            {isCurrencyOpen && (
              <div className={styles.dropdownMenu}>
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    className={`${styles.dropdownItem} ${selectedCurrency === currency.code ? styles.active : ''}`}
                    onClick={() => selectCurrency(currency)}
                  >
                    <span className={styles.currencySymbol}>{currency.symbol}</span>
                    <span className={styles.currencyInfo}>
                      <span className={styles.currencyCode}>{currency.code}</span>
                      <span className={styles.currencyName}>{currency.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className={styles.dropdown} ref={languageRef}>
            <button 
              className={styles.dropdownToggle}
              onClick={toggleLanguage}
              aria-expanded={isLanguageOpen}
              title={`Language: ${getCurrentLanguage()?.name || 'English'}`}
            >
              <span className={styles.flag}>{getCurrentLanguage()?.flag}</span>
              <span className={styles.compactText}>{selectedLanguage}</span>
              <svg className={`${styles.chevron} ${isLanguageOpen ? styles.open : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            </button>
            
            {isLanguageOpen && (
              <div className={styles.dropdownMenu}>
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`${styles.dropdownItem} ${selectedLanguage === language.code ? styles.active : ''}`}
                    onClick={() => selectLanguage(language)}
                  >
                    <span className={styles.flag}>{language.flag}</span>
                    <span className={styles.languageInfo}>
                      <span className={styles.languageCode}>{language.code}</span>
                      <span className={styles.languageName}>{language.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          <button className={styles.cartButton} title={`Shopping Cart (${cartItemCount} items)`}>
            <div className={styles.cartIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              {cartItemCount > 0 && (
                <span className={styles.cartBadge}>{cartItemCount}</span>
              )}
            </div>
          </button>

          {/* Wishlist */}
          <button className={styles.wishlistButton} title="My Wishlist">
            <div className={styles.wishlistIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
          </button>

          {/* Shop With Us */}
          <button className={styles.shopButton} title="Shop With Us">
            <div className={styles.shopIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
          </button>

          {/* Authentication Buttons */}
          <div className={styles.authButtons}>
            <button className={styles.loginButton} title="Login to your account">
              <svg className={styles.authIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10,17 15,12 10,7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span className={styles.authTextCompact}>Login</span>
            </button>
            
            <button className={styles.signupButton} title="Create new account">
              <svg className={styles.authIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
              <span className={styles.authTextCompact}>Sign Up</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoNav;