import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard, { Product } from '../components/ProductCard';
import CategoryBanner from '../components/CategoryBanner';
import FiltersSidebar from '../components/FiltersSidebar';
import Pagination from '../components/Pagination';
import { selectAllProducts } from '../store/productsSlice';

const ProductListingPage = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const allProducts = useSelector(selectAllProducts);

    const products = allProducts.filter(product =>
        product.category?.toLowerCase().replace(/\s+/g, '-') === categoryName
    );

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
