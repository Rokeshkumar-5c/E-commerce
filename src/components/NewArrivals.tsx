import ProductCard from './ProductCard';
import type { Product } from './ProductCard';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../store/productsSlice';

const NewArrivals = () => {
  const products = useSelector(selectAllProducts).slice(0, 4); // Get first 4 products for "New Arrivals"

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#111318] dark:text-white text-2xl md:text-3xl font-bold tracking-tight">New Arrivals</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Fresh finds for this season</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}

export default NewArrivals
