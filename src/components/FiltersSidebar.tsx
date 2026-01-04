const FiltersSidebar = () => {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 hidden lg:block">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-[#111318] dark:text-white">Filters</h3>
        <button className="text-sm text-primary font-medium hover:underline">Clear All</button>
      </div>
      {/* Price Filter */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h4 className="text-sm font-semibold mb-4 text-[#111318] dark:text-white">Price Range</h4>
        <div className="px-1 mb-4">
          <input className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer" max="500" min="0" type="range" defaultValue="250"/>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input className="w-full pl-6 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[#111318] dark:text-white focus:ring-primary focus:border-primary" type="number" defaultValue="0"/>
          </div>
          <span className="text-gray-400">-</span>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
            <input className="w-full pl-6 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-[#111318] dark:text-white focus:ring-primary focus:border-primary" type="number" defaultValue="500"/>
          </div>
        </div>
      </div>
      {/* Brand Filter */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h4 className="text-sm font-semibold mb-3 text-[#111318] dark:text-white">Brand</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" type="checkbox"/>
            <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-[#111318] dark:group-hover:text-white">Artisan Home</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input defaultChecked className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary" type="checkbox"/>
            <span className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-[#111318] dark:group-hover:text-white">Modern Living</span>
          </label>
          {/* ... more brands */}
        </div>
      </div>
      {/* Rating Filter */}
      <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
        <h4 className="text-sm font-semibold mb-3 text-[#111318] dark:text-white">Rating</h4>
        <div className="space-y-2">
            {/* 5 star */}
            <label className="flex items-center gap-3 cursor-pointer">
                <input className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" name="rating" type="radio"/>
                <div className="flex text-yellow-400 text-sm">
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                </div>
                <span className="text-xs text-gray-500">&amp; Up</span>
            </label>
            {/* 4 star */}
            <label className="flex items-center gap-3 cursor-pointer">
                <input className="w-4 h-4 text-primary border-gray-300 focus:ring-primary" name="rating" type="radio"/>
                <div className="flex text-yellow-400 text-sm">
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-current">star</span>
                    <span className="material-symbols-outlined text-[18px] text-gray-300">star</span>
                </div>
                <span className="text-xs text-gray-500">&amp; Up</span>
            </label>
        </div>
      </div>
      {/* Material/Color */}
      <div className="pb-6">
        <h4 className="text-sm font-semibold mb-3 text-[#111318] dark:text-white">Material</h4>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700 text-xs font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition-colors">Ceramic</button>
          <button className="px-3 py-1 rounded-full border border-primary text-xs font-medium bg-primary/10 text-primary transition-colors">Metal</button>
          {/* ... more materials */}
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
