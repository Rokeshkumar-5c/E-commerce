import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import type { Product } from '../shared/types';
import CategoryBanner from '../components/CategoryBanner';
import FiltersSidebar from '../components/FiltersSidebar';
import Pagination from '../components/Pagination';
import { selectAllProducts, selectIsFetchingProducts, fetchProducts } from '../store/productsSlice';
import { LoadingSpinner } from '../shared/components/Loading';
import { useAppDispatch } from '../shared/hooks/useAppDispatch';

const ProductListingPage = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const dispatch = useAppDispatch();
    const allProducts = useSelector(selectAllProducts);
    const isFetchingProducts = useSelector(selectIsFetchingProducts);

    // Convert URL category name back to display format
    const categoryDisplayName = categoryName?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    useEffect(() => {
        if (categoryDisplayName) {
            dispatch(fetchProducts(categoryDisplayName));
        }
    }, [categoryDisplayName, dispatch]);

    const products = allProducts.filter(product =>
        product.category?.toLowerCase().replace(/\s+/g, '-') === categoryName
    );

    if (isFetchingProducts) {
        return (
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1 flex items-center justify-center min-h-[60vh]">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-1">
            <CategoryBanner />
            <div className="flex flex-col lg:flex-row gap-8">
                <FiltersSidebar />
                <main className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product: Product) => <ProductCard key={product.id} {...product} />)}
                    </div>
                    <Pagination />
                </main>
            </div>
        </div>
    );
};

export default ProductListingPage;
