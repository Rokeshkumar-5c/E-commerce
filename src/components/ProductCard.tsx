export interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  image: string;
  category?: string;
  description?: string;
  images?: string[];
}

const ProductCard = ({ name, price, rating, image }: Product) => {
  return (
    <div className="group flex flex-col bg-white dark:bg-[#1a2230] rounded-xl border border-[#dbdfe6] dark:border-white/5 overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
        <div className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{backgroundImage: `url("${image}")`}}>
        </div>
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-gray-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
          <span className="material-symbols-outlined text-[20px]">favorite</span>
        </button>
        <div className="absolute bottom-3 right-3">
          <button className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white shadow-lg translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/90">
            <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-[#111318] dark:text-white text-lg truncate">{name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold text-lg">{price}</span>
          <div className="flex items-center gap-0.5 text-yellow-400 text-sm">
            <span className="material-symbols-outlined text-[16px] fill-current">star</span>
            <span className="text-gray-400 dark:text-gray-500 ml-1">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
