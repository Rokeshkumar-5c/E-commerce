import { useSelector } from 'react-redux';
import ProductCard, { Product } from './ProductCard';
import { selectAllProducts } from '../store/productsSlice';

const RelatedProducts = () => {
    const allProducts = useSelector(selectAllProducts);
    // Get 4 random products
    const products = allProducts.sort(() => 0.5 - Math.random()).slice(0, 4);

    return (
        <div className="py-12 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-[#111318] dark:text-white">You might also like</h2>
                <a className="text-primary font-medium text-sm hover:underline flex items-center gap-1" href="#">View all <span className="material-symbols-outlined text-sm">arrow_forward</span></a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product: Product) => <ProductCard key={product.id} {...product} />)}
            </div>
        </div>
    );
};

export default RelatedProducts;
