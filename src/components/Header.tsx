import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../store/cartSlice';

const Header = () => {
  const cartItems = useSelector(selectCartItems);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white dark:bg-[#1a202c] border-b border-[#f0f2f4] dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-8">
            <Link className="flex items-center gap-2 text-[#111318] dark:text-white group" to="/">
              <div className="size-8 text-primary">
                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold tracking-tight">GiftShop</h2>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" to="/">Home</Link>
              <Link className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" to="/category/decorative-statues">Decorative Statues</Link>
              <Link className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" to="/category/desk-accessories">Desk Accessories</Link>
              <Link className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" to="/category/electronics">Electronics</Link>
              <Link className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition-colors" to="/category/decor">Decor</Link>
            </nav>
          </div>
          <div className="flex items-center flex-1 justify-end gap-4">
            <div className="hidden sm:flex max-w-md w-full">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </div>
                <input className="block w-full pl-10 pr-3 py-2 border-none rounded-lg bg-[#f0f2f4] dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary placeholder-gray-500" placeholder="Search for gifts..." type="text"/>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-primary rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
              <button className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined">account_circle</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
