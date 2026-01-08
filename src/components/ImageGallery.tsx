import styled from 'styled-components';
import type { Product } from './ProductCard';

interface ImageGalleryProps {
  product: Product;
}

const MainImageContainer = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url("${props => props.$imageUrl}");
  background-size: cover;
  background-position: center;
  transition: transform 0.5s;
  cursor: zoom-in;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ThumbnailImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url("${props => props.$imageUrl}");
  background-size: cover;
  background-position: center;
`;

const ImageGallery = ({ product }: ImageGalleryProps) => {
  return (
    <div className="lg:col-span-7 flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white dark:bg-gray-800 group">
        <MainImageContainer $imageUrl={product.image} />
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/60 backdrop-blur text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[#111318] dark:text-white border border-gray-200 dark:border-gray-700">
          Best Seller
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
        {(product.images || [product.image, product.image, product.image]).map((image, index) => (
          <button key={index} className={`shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 ${index === 0 ? 'border-primary' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}>
            <ThumbnailImage $imageUrl={image} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
