import styled from 'styled-components';
import { useState } from "react";
import { useSelector } from "react-redux";
import { addToCartAsync, selectIsAddingToCart } from "../store/cartSlice";
import type { Product } from "../shared/types";
import { LoadingSpinner } from "../shared/components/Loading";
import { useAppDispatch } from "../shared/hooks/useAppDispatch";

interface ProductInfoProps {
  product: Product;
}

const FinishSwatch = styled.button<{ $isSelected: boolean; $color: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  border: 2px solid;
  background-color: ${props => props.$color};
  transition: all 0.2s ease;
  border-color: ${props => 
    props.$isSelected 
      ? 'var(--color-primary)' 
      : 'rgb(209 213 219)'};
  transform: ${props => props.$isSelected ? 'scale(1.1)' : 'scale(1)'};
  
  &:hover {
    border-color: ${props => 
      props.$isSelected 
        ? 'var(--color-primary)' 
        : 'rgb(156 163 175)'};
  }
  
  .dark & {
    border-color: ${props => 
      props.$isSelected 
        ? 'var(--color-primary)' 
        : 'rgb(75 85 99)'};
    
    &:hover {
      border-color: ${props => 
        props.$isSelected 
          ? 'var(--color-primary)' 
          : 'rgb(107 114 128)'};
    }
  }
`;

const ProductInfo = ({ product }: ProductInfoProps) => {
  const dispatch = useAppDispatch();
  const isAddingToCart = useSelector(selectIsAddingToCart);
  const [quantity, setQuantity] = useState(1);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "details"
  );

  const handleAddToCart = () => {
    dispatch(addToCartAsync({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    }));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const calculateDiscount = () => {
    if (!product.originalPrice) return 0;
    const current = parseFloat(product.price.replace("$", ""));
    const original = parseFloat(product.originalPrice.replace("$", ""));
    return Math.round(((original - current) / original) * 100);
  };

  const discount = calculateDiscount();
  const finishes = product.finishes || [
    { name: "Polished Gold", color: "#D4AF37" },
    { name: "Silver", color: "#C0C0C0" },
    { name: "Black", color: "#000000" },
  ];

  return (
    <div className="lg:col-span-5 flex flex-col gap-4">
      {/* Collection & Actions */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-primary font-semibold text-sm uppercase tracking-wide">
          {product.collection || product.category || "STATIONERY COLLECTION"}
        </span>
        <div className="flex gap-2">
          <button className="text-gray-400 hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined">favorite</span>
          </button>
          <button className="text-gray-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </div>

      {/* Product Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-[#111318] dark:text-white mb-0.5">
        {product.name}
      </h1>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-4 text-sm text-[#616f89] dark:text-gray-400 mb-1">
        <div className="flex items-center text-yellow-500">
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="material-symbols-outlined text-[18px] fill-current"
            >
              star
            </span>
          ))}
          <span className="material-symbols-outlined text-[18px]">
            star_half
          </span>
        </div>
        <span className="font-medium text-[#111318] dark:text-white">
          {product.rating}
        </span>
        <span className="border-l border-gray-300 dark:border-gray-600 h-4 mx-1"></span>
        <a className="hover:underline" href="#reviews">
          124 Reviews
        </a>
        <span className="border-l border-gray-300 dark:border-gray-600 h-4 mx-1"></span>
        <span>SKU: {product.sku || product.id}</span>
      </div>

      {/* Price */}
      <div className="flex items-end gap-3 mb-0.5">
        <span className="text-3xl font-bold text-[#111318] dark:text-white">
          {product.price}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-xl text-gray-400 line-through">
              {product.originalPrice}
            </span>
            <span className="text-sm font-semibold text-red-500">
              Save {discount}%
            </span>
          </>
        )}
      </div>

      {/* Stock Alert */}
      {product.stock !== undefined && product.stock < 10 && (
        <p className="text-sm text-red-500 font-medium mb-3">
          Only {product.stock} left in stock - order soon.
        </p>
      )}

      {/* Description */}
      <p className="text-[#616f89] dark:text-gray-300 leading-relaxed mb-4">
        {product.description ||
          "A timeless piece to elevate your workspace. Hand-polished brass sphere mounted on a solid marble base, designed to inspire creativity and focus."}
      </p>

      {/* Finish Options */}
      <div>
        <label className="block text-sm font-semibold text-[#111318] dark:text-white mb-2">
          Finish
        </label>
        <div className="flex gap-3">
          {finishes.map((finish, index) => (
            <FinishSwatch
              key={index}
              onClick={() => setSelectedFinish(index)}
              $isSelected={selectedFinish === index}
              $color={finish.color}
              title={finish.name}
            />
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="mt-2">
        <label className="block text-sm font-semibold text-[#111318] dark:text-white mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-sm">remove</span>
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-16 h-10 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
            min="1"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            className="w-10 h-10 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAddingToCart ? (
            <>
              <LoadingSpinner size="sm" className="border-white border-t-transparent" />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">shopping_bag</span>
              Add to Cart - {product.price}
            </>
          )}
        </button>
        <div className="flex gap-3">
          <button className="flex-1 h-12 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">favorite</span>
            Add to Wishlist
          </button>
          <button className="flex-1 h-12 bg-black hover:bg-gray-900 text-white font-semibold rounded-lg transition-all">
            Buy Now
          </button>
        </div>
      </div>

      {/* Service Icons */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">
              local_shipping
            </span>
          </div>
          <span className="text-xs text-center text-gray-600 dark:text-gray-400">
            Free Shipping
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">
              verified
            </span>
          </div>
          <span className="text-xs text-center text-gray-600 dark:text-gray-400">
            2 Year Warranty
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary">
              assignment_return
            </span>
          </div>
          <span className="text-xs text-center text-gray-600 dark:text-gray-400">
            30 Day Returns
          </span>
        </div>
      </div>

      {/* Collapsible Sections */}
      <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* Product Details */}
        <div>
          <button
            onClick={() => toggleSection("details")}
            className="w-full flex items-center justify-between py-3 text-left font-semibold text-[#111318] dark:text-white"
          >
            <span>Product Details</span>
            <span className="material-symbols-outlined transition-transform">
              {expandedSection === "details" ? "expand_less" : "expand_more"}
            </span>
          </button>
          {expandedSection === "details" && (
            <div className="pb-4 text-sm text-[#616f89] dark:text-gray-300">
              {product.details ||
                "Crafted from solid brass with a mirror-polished finish, this ornament sits atop a genuine Carrara marble base. It serves as both a paperweight and a striking visual anchor for your desk."}
            </div>
          )}
        </div>

        {/* Specifications */}
        <div>
          <button
            onClick={() => toggleSection("specifications")}
            className="w-full flex items-center justify-between py-3 text-left font-semibold text-[#111318] dark:text-white"
          >
            <span>Specifications</span>
            <span className="material-symbols-outlined transition-transform">
              {expandedSection === "specifications"
                ? "expand_less"
                : "expand_more"}
            </span>
          </button>
          {expandedSection === "specifications" && (
            <div className="pb-4 text-sm text-[#616f89] dark:text-gray-300">
              {product.specifications ||
                'Material: Solid Brass, Marble Base | Dimensions: 3" x 3" x 2" | Weight: 0.5 lbs | Finish: Mirror Polished'}
            </div>
          )}
        </div>

        {/* Shipping & Returns */}
        <div>
          <button
            onClick={() => toggleSection("shipping")}
            className="w-full flex items-center justify-between py-3 text-left font-semibold text-[#111318] dark:text-white"
          >
            <span>Shipping & Returns</span>
            <span className="material-symbols-outlined transition-transform">
              {expandedSection === "shipping" ? "expand_less" : "expand_more"}
            </span>
          </button>
          {expandedSection === "shipping" && (
            <div className="pb-4 text-sm text-[#616f89] dark:text-gray-300">
              {product.shippingReturns ||
                "Free shipping on orders over $50. Standard shipping takes 3-5 business days. Returns accepted within 30 days of purchase. Items must be in original condition."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
