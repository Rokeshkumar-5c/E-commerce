import styled from 'styled-components';

const BannerBackground = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAi-e0RRzo-UOhKmLIIwU1CF3McToDfoY69tOg6MPIndhLOpp5Jp8RqYH46mhXVlJICx-OL5gCOIiwaknBrzsqymSi585_3yBkPIRQmEBYErl4vxC9bH4luNlZWv9n3VQKDTyuIjWZJFlwZbH0MeESukEOZeihIXFQR8l3-I096aQwgPztV3Edgypmj0iYloSFG5wk-FzSZynkHfoDHEMhi3RLKMG7mVsxLp6lxchlWuhfqQhZJU7nF-PWWNyFz-BsjA_-Rq46vFds');
`;

const CategoryBanner = () => {
  return (
    <div className="relative w-full rounded-xl overflow-hidden mb-8 h-[240px] md:h-[320px] shadow-sm">
      <BannerBackground />
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Decorative Statues</h1>
        <p className="text-white/90 text-lg max-w-xl font-medium">Elevate your space with our curated collection of modern sculptures and artistic accents designed to inspire.</p>
      </div>
    </div>
  );
};

export default CategoryBanner;
