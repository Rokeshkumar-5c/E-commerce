import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ImageGallery from '../components/ImageGallery';
import ProductInfo from '../components/ProductInfo';
import RelatedProducts from '../components/RelatedProducts';
import { selectAllProducts, selectProductById, selectIsFetchingProductById, fetchProductById } from '../store/productsSlice';
import { LoadingSpinner } from '../shared/components/Loading';
import { useAppDispatch } from '../shared/hooks/useAppDispatch';

const ProductDetailPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useAppDispatch();
    const allProducts = useSelector(selectAllProducts);
    const product = useSelector((state: any) => selectProductById(state, productId || ''));
    const isFetchingProduct = useSelector(selectIsFetchingProductById);

    useEffect(() => {
        if (productId && !product) {
            dispatch(fetchProductById(productId));
        }
    }, [productId, product, dispatch]);

    if (isFetchingProduct) {
        return (
            <main className="layout-container max-w-[1280px] mx-auto px-4 sm:px-10 py-6 min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </main>
        );
    }

    if (!product) {
        return (
            <main className="layout-container max-w-[1280px] mx-auto px-4 sm:px-10 py-6 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Product not found</h2>
                    <p className="text-gray-600 dark:text-gray-400">The product you're looking for doesn't exist.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="layout-container max-w-[1280px] mx-auto px-4 sm:px-10 py-6 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
                <ImageGallery product={product} />
                <ProductInfo product={product} />
            </div>
            <RelatedProducts />
        </main>
    );
};

export default ProductDetailPage;
