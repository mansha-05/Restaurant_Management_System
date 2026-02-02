import HeroSection from '../../components/HeroSection/HeroSection'
import FeatureSection from '../../components/FeatureSection/FeatureSection'
import PopularDishes from '../../components/PopularDishes/PopularDishes'
//import BrowseByCategory from '../../components/BrowseByCategory/BrowseByCategory'

export default function HomeContent() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <PopularDishes />
      {/* <BrowseByCategory /> */}
    </>
  );
}

