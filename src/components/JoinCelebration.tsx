const JoinCelebration = () => {
  return (
    <section className="w-full bg-primary rounded-2xl p-8 md:p-12 relative overflow-hidden">
      {/* Decorative gift icon */}
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 opacity-20">
        <span className="material-symbols-outlined text-[120px] md:text-[180px] text-white">
          card_giftcard
        </span>
      </div>
      
      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-3">
          Join the Celebration
        </h2>
        <p className="text-white/90 text-center mb-6 text-sm md:text-base">
          Subscribe to receive exclusive offers, new arrival alerts, and gift-giving inspiration.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border-none bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default JoinCelebration;

