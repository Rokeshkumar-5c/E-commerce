import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ImageGallery from '../components/ImageGallery';
import ProductInfo from '../components/ProductInfo';
import RelatedProducts from '../components/RelatedProducts';
import { selectAllProducts } from '../store/productsSlice';

const ProductDetailPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const allProducts = useSelector(selectAllProducts);
    const product = allProducts.find(p => p.id === productId);

    if (!product) {
        return <div>Product not found</div>;
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
