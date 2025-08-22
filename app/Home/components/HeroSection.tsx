// HeroSection.tsx
import styles from '../style/HeroSection.module.css';

const HeroSection = () => {
  return (
    <main className={styles.heroMain}>
      <section className={styles.hero}>
        <div className={styles.heroVisual}>
          <div className={styles.heroVisualWrapper}>
            <video
              className={styles.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              poster="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/marketing-hero-section/assets/poster.avif"
            >
              <source
                src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/f06d7301a0e51d1ada45994de485c8872270c4c6/marketing-hero-section/assets/video-1.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div className={styles.heroContent}>
          {/* Text 1 - Top Left */}
          <div className={`${styles.textPosition} ${styles.text1}`}>
            <h2 className={styles.animatedText}>Transform Your Vision</h2>
          </div>

          {/* Text 2 - Top Right */}
          <div className={`${styles.textPosition} ${styles.text2}`}>
            <h2 className={styles.animatedText}>Drive Real Results</h2>
          </div>

          {/* Text 3 - Center Left */}
          <div className={`${styles.textPosition} ${styles.text3}`}>
            <h2 className={styles.animatedText}>Scale Your Business</h2>
          </div>

          {/* Text 4 - Center (Main) */}
          <div className={`${styles.textPosition} ${styles.text4}`}>
            <h1 className={`${styles.animatedText} ${styles.mainHeadline}`}>Elevate Your Brand</h1>
          </div>

          {/* Text 5 - Center Right */}
          <div className={`${styles.textPosition} ${styles.text5}`}>
            <h2 className={styles.animatedText}>Boost Conversions</h2>
          </div>

          {/* Text 6 - Bottom Left */}
          <div className={`${styles.textPosition} ${styles.text6}`}>
            <h2 className={styles.animatedText}>Captivate Audiences</h2>
          </div>

          {/* Text 7 - Bottom Center */}
          <div className={`${styles.textPosition} ${styles.text7}`}>
            <h2 className={styles.animatedText}>Dominate Markets</h2>
          </div>

          {/* Text 8 - Bottom Right */}
          <div className={`${styles.textPosition} ${styles.text8}`}>
            <h2 className={styles.animatedText}>Maximize Growth</h2>
          </div>

          {/* CTA Button - Always visible */}
          <div className={styles.ctaContainer}>
            <a href="#" className={`${styles.buttonLink} ${styles.primary}`}>
              Get Started
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;