import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import type { Product } from './ProductCard';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="lg:col-span-5 flex flex-col gap-6">
      {/* Header Info */}
      <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-primary font-semibold text-sm uppercase tracking-wide">{product.category}</span>
          <div className="flex gap-2">
            <button className="text-gray-400 hover:text-red-500 transition-colors"><span className="material-symbols-outlined">favorite</span></button>
            <button className="text-gray-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">share</span></button>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#111318] dark:text-white mb-3">{product.name}</h1>
        <div className="flex items-center gap-4 text-sm text-[#616f89] dark:text-gray-400">
          <div className="flex items-center text-yellow-500">
            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
            <span className="material-symbols-outlined text-[18px] fill-current">star</span>
            <span className="material-symbols-outlined text-[18px]">star_half</span>
          </div>
          <span className="font-medium text-[#111318] dark:text-white">{product.rating}</span>
          <span className="border-l border-gray-300 dark:border-gray-600 h-4 mx-1"></span>
          <a className="hover:underline" href="#reviews">124 Reviews</a>
          <span className="border-l border-gray-300 dark:border-gray-600 h-4 mx-1"></span>
          <span>SKU: {product.id}</span>
        </div>
      </div>
      {/* Price & Urgency */}
      <div>
        <div className="flex items-end gap-3 mb-2">
          <span className="text-3xl font-bold text-[#111318] dark:text-white">{product.price}</span>
        </div>
      </div>
      {/* Description Snippet */}
      <p className="text-[#616f89] dark:text-gray-300 leading-relaxed">
        {product.description || 'A timeless piece to elevate your workspace. Hand-polished brass sphere mounted on a solid marble base, designed to inspire creativity and focus.'}
      </p>
      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button onClick={handleAddToCart} className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">shopping_bag</span>
          Add to Cart - {product.price}
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
