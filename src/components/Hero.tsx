import styled from 'styled-components';

const HeroImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsnNbLy4biG-oTpKF1wm7zDk4jzZB7pFTWOp0ViuyIQ_-bhQUT9xI78MLn6V4nLHmLvb_43a80dxRyp_uHIiiMGCRcKKbo9uglJS6-ISnDSs2LBeihpUr43_sTbdDpdu65CKt-FLlKWbPw7Ky-tfbBxcx0phJdaQN4dMfQQd1X4nsws-ZFVCIFua9lmd_7olBPXuTRDQ0YY2vbkrDG2BOabhQvmITGORWtrZHvkghU3xVNaK8X-OMdqWIdh3d0jTn6Rv17FYETaw0");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.7s;
  
  .group:hover & {
    transform: scale(1.05);
  }
`;

const Hero = () => {
  return (
    <section className="@container">
      <div className="flex flex-col gap-6 md:gap-10 @[864px]:flex-row items-center">
        <div className="w-full @[864px]:w-1/2 flex flex-col gap-6 items-start">
          <div className="flex flex-col gap-4 text-left">
            <span className="text-primary font-bold tracking-wider uppercase text-xs">New Collection 2024</span>
            <h1 className="text-[#111318] dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              Celebrate Every Moment
            </h1>
            <h2 className="text-gray-600 dark:text-gray-300 text-lg font-normal leading-relaxed max-w-lg">
              Curated gifts for meaningful moments. Explore our exclusive collection of premium stationery, artistic decor, and modern electronics.
            </h2>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-primary/90 text-white text-base font-bold transition-transform active:scale-95 shadow-lg shadow-primary/25">
              Shop New Collection
            </button>
            <button className="flex items-center justify-center rounded-lg h-12 px-6 bg-white dark:bg-white/10 border border-[#dbdfe6] dark:border-white/20 text-[#111318] dark:text-white text-base font-medium hover:bg-gray-50 dark:hover:bg-white/20 transition-colors">
              View Lookbook
            </button>
          </div>
        </div>
        <div className="w-full @[864px]:w-1/2 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative group">
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero;
