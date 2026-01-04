import Hero from '../components/Hero';
import Features from '../components/Features';
import ShopByOccasion from '../components/ShopByOccasion';
import NewArrivals from '../components/NewArrivals';
import JoinCelebration from '../components/JoinCelebration';

const HomePage = () => {
  return (
    <main className="flex-1 flex flex-col items-center w-full">
      <div className="w-full max-w-[1280px] px-4 md:px-10 lg:px-20 py-8 flex flex-col gap-16">
        <Hero />
        <Features />
        <ShopByOccasion />
        <NewArrivals />
        <JoinCelebration />
      </div>
    </main>
  );
};

export default HomePage;
