import AdvertCenter from './Home/components/AdvertCenter';
import EateryDisplaySection from './Home/components/EateryDisplaySection';
import HeroSection from './Home/components/HeroSection';
import HotelDisplaySection from './Home/components/HotelDisplaySection';
import TourPackages from './Home/components/TourPackages';

export default function Home() {
  return (
   <main>
<HeroSection />
<AdvertCenter/>
<HotelDisplaySection/>
<EateryDisplaySection/>
<TourPackages/>
   </main>
  );
}
