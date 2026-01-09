import styled from 'styled-components';
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCartAsync,
  updateQuantityAsync,
  addToCartAsync,
  selectIsUpdatingQuantity,
} from "../store/cartSlice";
import { LoadingSpinner } from "../shared/components/Loading";
import { useAppDispatch } from "../shared/hooks/useAppDispatch";

const ProgressBar = styled.div<{ $width: number }>`
  height: 100%;
  border-radius: 9999px;
  background-color: var(--color-primary);
  transition: width 0.5s ease-out;
  width: ${props => props.$width}%;
`;

const CartItemImage = styled.div<{ $imageUrl: string }>`
  background-image: url("${props => props.$imageUrl}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const RecommendationImage = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url("${props => props.$imageUrl}");
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
  
  .group:hover & {
    transform: scale(1.05);
  }
`;

const ShoppingCartPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const isUpdatingQuantity = useSelector(selectIsUpdatingQuantity);
  
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;
  const freeShippingThreshold = 50;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    dispatch(updateQuantityAsync({ id, quantity: newQuantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCartAsync(id));
  };

  const handleAddRecommendation = (product: {
    id: string;
    name: string;
    price: string;
    image: string;
  }) => {
    dispatch(addToCartAsync(product));
  };

  // Recommendation products
  const recommendations = [
    {
      id: "rec-1",
      name: "Desk Organizer Set",
      price: "$35.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCUqoYW88Aqulft3Wfc8vGufoPi0aBp33ohHZxvsclMCQtAzA-rASI5LNO4Hu-2uOq2f0MMUuuEd-DQS5Y1qGwzSpdmXMDQzbVO4PnPAAgu-dpseGdP8Ag_rXBNdIwWNsTSKZwnN4nmIPtvY966CRPokPca0hCnfmpjB2Bs2oMUyA29JEq2uejT8I6-ldFXDKrkRWZs3YVlqx9O8MWdvioyoCtmepo7CB_RnEKRhx3R3EDgaYX6rIFi1Zd0dzQ93d_TbVNMoHKSDTo",
    },
    {
      id: "rec-2",
      name: "Metallic Ballpoint",
      price: "$12.50",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDbc4aXPgcClKMJ4duKltvA8rCQwJTUgRd6ZxEXxIZLv3HbhlNB377mrvqH1G_2fb3cevSl6chte1tZMlx3t3KLsLt1nNH04NpX96eoZMhV9AdVG7XcpGk7sG6rhBkM2FDwB55cE5vI-DgRkPEcRo3FufMlSWeW7s9JkZLXNwIfU8R6EYCxxvGYcBcKT-oi1ofFUWXuH6wgyPl7SAXslj0xIDKtE5QFZiN7OEncpNTDxi6MjOeR9XcdiKNn0Fq5DGnzwRw7irfMWlQ",
    },
    {
      id: "rec-3",
      name: "Scented Candle",
      price: "$22.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBOBGdksEFdESEmXEFNtoP3xCq2DJLxn1-nkQgZmM9cpaWp7R42L2gq2K6DzHTshdWF7gQVeWDfKH7HgGTLy5Eo8hKwjdC9qZKLv003HbmQ6LzwyIieSKZ-zxwX-SZTP4rD2ny0cy1rA7IXB8RON44YHvHA8yTDGKqu0moeLGWVVu93dlK0t2y0W56p55Vr26xK17aAQsp7dDc54XYlaZbcyZ-2vvo_C0-5Njgzq9JzTPS1vNefemxkGKyg61FgHmXl3x6gm5HIP-4",
    },
    {
      id: "rec-4",
      name: "Mini Succulent",
      price: "$18.00",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBB-CJXuq0FfWzA0n9L9qcw5RATJ7EptB0QgBZ55J1Bj4Trms0ehvZEbmi0ZyeRPLTHs4dVLFABcX0ViIEQJM_FEla_49x2hagKilgpCy5arROA-vIdBHcIrPBOhyPsWqAdcFIZn3BbRY5kCpdEE-dQ4ycretZgz3iygtkpxpqSJuVWO1dIgohfKonzGN1TQm9iyQJqeMh3KY9Leu2FaVJykJNne-BeKAwkRLC8LyfL9tWcmJM1FCfKJjXKKk1i8QM_RsR9YLdfyjw",
    },
  ];

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="layout-container max-w-[1280px] mx-auto px-4 sm:px-10 py-8 w-full min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items & Upsells */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Page Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-main-light dark:text-text-main-dark">
              Shopping Cart{" "}
              <span className="text-text-sec-light dark:text-text-sec-dark text-xl font-medium align-middle ml-2">
                ({itemCount} {itemCount === 1 ? "item" : "items"})
              </span>
            </h1>
            <Link
              to="/"
              className="text-sm font-medium text-primary hover:text-primary-dark underline decoration-1 underline-offset-4"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Free Shipping Progress */}
          {subtotal < freeShippingThreshold && (
            <div className="bg-card-light dark:bg-card-dark rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm">
              <div className="flex gap-6 justify-between mb-3">
                <p className="text-text-main-light dark:text-text-main-dark text-base font-semibold">
                  Spend ${amountNeeded.toFixed(2)} more for Free Shipping
                </p>
                <span className="material-symbols-outlined text-primary">
                  local_shipping
                </span>
              </div>
              <div className="rounded-full bg-background-light dark:bg-border-dark overflow-hidden h-2.5">
                <ProgressBar $width={progressPercentage} />
              </div>
              <p className="text-text-sec-light dark:text-text-sec-dark text-xs mt-2 font-medium">
                {progressPercentage.toFixed(0)}% towards free shipping
              </p>
            </div>
          )}

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="bg-card-light dark:bg-card-dark rounded-xl p-12 border border-border-light dark:border-border-dark shadow-sm text-center">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                shopping_cart
              </span>
              <h2 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">
                Your cart is empty
              </h2>
              <p className="text-text-sec-light dark:text-text-sec-dark mb-6">
                Start adding items to your cart!
              </p>
              <Link
                to="/"
                className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-all"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => {
                const itemPrice = parseFloat(item.price.replace("$", ""));
                const itemTotal = itemPrice * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 bg-card-light dark:bg-card-dark px-4 py-4 sm:p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="shrink-0">
                      <CartItemImage
                        $imageUrl={item.image}
                        className="rounded-lg size-24 sm:size-28 bg-gray-100 dark:bg-gray-800"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Link
                              to={`/product/${item.id}`}
                              className="text-lg font-semibold text-text-main-light dark:text-text-main-dark hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                          </div>
                          <p className="text-green-600 text-xs font-medium mt-1">
                            In Stock
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-text-main-light dark:text-text-main-dark">
                            ${itemTotal.toFixed(2)}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-xs text-text-sec-light dark:text-text-sec-dark">
                              ${itemPrice.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                        <div className="flex items-center gap-4 text-text-sec-light dark:text-text-sec-dark text-sm">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="flex items-center gap-1 hover:text-red-500 transition-colors group"
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              delete
                            </span>
                            <span className="group-hover:underline">Remove</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-primary transition-colors group">
                            <span className="material-symbols-outlined text-[18px]">
                              favorite
                            </span>
                            <span className="group-hover:underline">
                              Save for later
                            </span>
                          </button>
                        </div>
                        <div className="flex items-center bg-background-light dark:bg-border-dark rounded-lg p-1">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={isUpdatingQuantity}
                            className="size-7 flex items-center justify-center rounded bg-white dark:bg-card-dark text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUpdatingQuantity ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <span className="material-symbols-outlined text-[16px]">
                                remove
                              </span>
                            )}
                          </button>
                          <input
                            className="w-10 bg-transparent border-none text-center text-sm font-medium text-text-main-light dark:text-text-main-dark focus:ring-0 p-0 disabled:opacity-50"
                            min="1"
                            type="number"
                            value={item.quantity}
                            disabled={isUpdatingQuantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                          />
                          <button
                            aria-label="Increase quantity"
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={isUpdatingQuantity}
                            className="size-7 flex items-center justify-center rounded bg-white dark:bg-card-dark text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isUpdatingQuantity ? (
                              <LoadingSpinner size="sm" />
                            ) : (
                              <span className="material-symbols-outlined text-[16px]">
                                add
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Recommendations / Upsells */}
          {cartItems.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-4">
                You might also like
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {recommendations.map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                    <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800 mb-2 overflow-hidden relative">
                      <RecommendationImage $imageUrl={product.image} />
                      <button
                        onClick={() => handleAddRecommendation(product)}
                        className="absolute bottom-2 right-2 size-8 bg-white dark:bg-card-dark rounded-full shadow flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          add
                        </span>
                      </button>
                    </div>
                    <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark truncate">
                      {product.name}
                    </p>
                    <p className="text-sm text-text-sec-light dark:text-text-sec-dark">
                      {product.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Sticky Summary */}
        {cartItems.length > 0 && (
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-lg">
              <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-6">
                Order Summary
              </h2>
              <div className="flex flex-col gap-3 mb-6 border-b border-border-light dark:border-border-dark pb-6">
                <div className="flex justify-between text-text-sec-light dark:text-text-sec-dark text-sm">
                  <span>Subtotal</span>
                  <span className="text-text-main-light dark:text-text-main-dark font-medium">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-text-sec-light dark:text-text-sec-dark text-sm">
                  <span>Estimated Shipping</span>
                  <span className="text-text-main-light dark:text-text-main-dark font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-text-sec-light dark:text-text-sec-dark text-sm">
                  <span>Estimated Tax</span>
                  <span className="text-text-main-light dark:text-text-main-dark font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="relative">
                    <input
                      className="w-full bg-background-light dark:bg-border-dark border-transparent rounded-lg text-sm px-4 py-2.5 focus:ring-0 focus:border-primary placeholder:text-text-sec-light dark:placeholder:text-text-sec-dark dark:text-white"
                      placeholder="Promo code"
                      type="text"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-xs font-bold uppercase tracking-wider hover:text-primary-dark">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end mb-6">
                <span className="text-base font-medium text-text-main-light dark:text-text-main-dark">
                  Total
                </span>
                <span className="text-2xl font-black text-text-main-light dark:text-text-main-dark tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>
              <label className="flex items-center gap-3 mb-6 cursor-pointer group">
                <input
                  className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-border-dark dark:border-gray-600"
                  type="checkbox"
                />
                <div className="flex items-center gap-2 text-sm text-text-main-light dark:text-text-main-dark select-none group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    redeem
                  </span>
                  This order contains a gift
                </div>
              </label>
              <Link
                to="/checkout"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShoppingCartPage;
