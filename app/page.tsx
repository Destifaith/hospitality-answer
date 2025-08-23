import AdvertCenter from './Home/components/AdvertCenter';
import AvailableCars from './Home/components/AvailableCars';
import EateryDisplaySection from './Home/components/EateryDisplaySection';
import HeroSection from './Home/components/HeroSection';
import HotelDisplaySection from './Home/components/HotelDisplaySection';
import TourPackages from './Home/components/TourPackages';
import UpcomingEvents from './Home/components/UpcomingEvents';

export default function Home() {
  return (
   <main>
<HeroSection />
<AdvertCenter/>
<HotelDisplaySection/>
<EateryDisplaySection/>
<TourPackages/>
<AvailableCars/>
<UpcomingEvents/>
   </main>
  );
}
