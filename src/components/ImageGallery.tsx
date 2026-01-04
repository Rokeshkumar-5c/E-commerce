import type { Product } from './ProductCard';

interface ImageGalleryProps {
  product: Product;
}

const ImageGallery = ({ product }: ImageGalleryProps) => {
  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-gray-800 group">
        <div className="w-full h-full bg-center bg-cover transition-transform duration-500 hover:scale-105 cursor-zoom-in" style={{backgroundImage: `url("${product.image}")`}}>
        </div>
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[#111318] dark:text-white border border-gray-200 dark:border-gray-700">
          Best Seller
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {(product.images || [product.image, product.image, product.image]).map((image, index) => (
          <button key={index} className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${index === 0 ? 'border-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}>
            <div className="w-full h-full bg-center bg-cover" style={{backgroundImage: `url("${image}")`}}></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
