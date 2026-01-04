const occasions = [
  {
    name: 'Birthdays',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGV8yoPAyTXmf5K44TUnSGhzgpWioqwzl_j6QRXmtUBvSXPzFPREFvTyvLenL22ZUaxPvnDSqfVFwXawBCkc9zF62X80XtZhdx0CUQl2HyUnFszRXjR5RWHccjicEk2P2loPjyD8yS0biyHIPG3gVbBjlmMDZRxM9eKl6IrvMTWkDkNVFXkgt8J37qiypBGdrIz8XP2r71fPC-adSWMZ3lMwKlhpoLOGYx2Mil7Le1pIDOY-iLvRHsvDfIlMLcRnAln_0MFUm7mcY',
    cta: 'Shop Gifts'
  },
  {
    name: 'Weddings',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4ZgJUDPpkK_Dq5aIiHnU-5WRqA8hTyjmhCTEZJtM52BekKFKbDu-Tboal7deERq6o-A9H2n5_jok2SeGyX4Kl3fQzTe5lpEBu_jw6mOeB0Nd7TkGJ4erIlr_gaDLkENTWypptnBK2ONfweRoxGSxFugvMZ5xG0I9-D8jNHeHKt2ay1Dt3fjO67bequRx1TE0QwXRkOjh4eFAmF3Jrq_-9B0JovZ7QCBuHGXQmxYuGxihIFL-LOlRPTLsD2RsvFCbInPkemRLB2Wk',
    cta: 'Shop Registry'
  },
  {
    name: 'Corporate',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAcCPbkwy436J0eeyKwSKGEvzfmm17hWJvlXqcCIUSJFfGR4t-w5av40fYwdXcY7fxRPFbC2PTjDP4JJhIwa3CRl6eitseGR2OLjlPAgOgDwqQ7XM0zuU4jMm2PzsE4yz1y1DStTBT8ou3-Wm3Kh6xORxsxnYG6j0ONVW0SmyoYcCCINeDuaXZZ7vErqX7hCho_UjrAemO2k5t-xKTRfoXuPhlE6waYM3FTJp0fJThLQpu1Db_LaUfwEwIchQ0wiqHkOCyr6RcOr0',
    cta: 'Bulk Orders'
  },
  {
    name: 'Just Because',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoyFHJOh1-6IovE64tZ4bVP2iKrM0-cFrt8t-SkXPY6ipl2kbELP129qwQ5HPVFruumhA-5wEns3lj4JbuHNmxewI8kQ9tIoTVeBAVCcVwjFCnjxSJaS4OJiXcWJSv89WZkcBRtLk_YiUgjqYWVZeKv6idfcR1Hn5sq-dQMHEUrGie-EsPNeC_9J6C4fiVD5GGmMcV1YBri60W17u8bYGdAZdD3s7UKNGNg5rwyCOqP2sF5ojoQD9nztvIci1KJMWfHcXf5bcXScE',
    cta: 'Surprise Them'
  }
]

const ShopByOccasion = () => {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[#111318] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">Shop by Occasion</h2>
        <a className="text-primary text-sm font-bold hover:underline flex items-center gap-1" href="#">
          View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {occasions.map((occasion) => (
          <a key={occasion.name} className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer" href="#">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{backgroundImage: `url("${occasion.image}")`}}>
            </div>
            <div className="absolute bottom-0 left-0 p-5 z-20">
              <p className="text-white text-lg md:text-xl font-bold">{occasion.name}</p>
              <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">{occasion.cta}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default ShopByOccasion
