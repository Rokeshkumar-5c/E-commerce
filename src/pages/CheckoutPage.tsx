import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCartAsync,
  selectIsClearingCart,
} from "../store/cartSlice";
import type { RootState } from "../store/store";
import { LoadingSpinner } from "../shared/components/Loading";
import { useAppDispatch } from "../shared/hooks/useAppDispatch";

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  saveCard: boolean;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartTotal);
  const isClearingCart = useSelector(selectIsClearingCart);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState<PaymentFormData>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    saveCard: false,
  });
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof PaymentFormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + " / " + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    if (paymentMethod === "card") {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 16) {
        newErrors.cardNumber = "Please enter a valid card number";
      }
      if (!formData.expiryDate || formData.expiryDate.length < 7) {
        newErrors.expiryDate = "Please enter expiry date";
      }
      if (!formData.cvv || formData.cvv.length < 3) {
        newErrors.cvv = "Please enter CVV";
      }
      if (!formData.cardholderName.trim()) {
        newErrors.cardholderName = "Please enter cardholder name";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In a real app, this would process the payment
      console.log("Processing payment...", {
        paymentMethod,
        formData,
        cartItems,
        total,
      });
      
      // Clear cart and redirect to confirmation
      dispatch(clearCartAsync()).then(() => {
        navigate("/order-confirmation");
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <main className="flex-grow flex justify-center items-center py-8 px-4 md:px-8">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
            shopping_cart
          </span>
          <h2 className="text-2xl font-bold text-[#111618] dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-[#617c89] dark:text-[#9aacb5] mb-6">
            Add items to your cart before checkout
          </p>
          <Link
            to="/cart"
            className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Go to Cart
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow flex justify-center py-8 px-4 md:px-8">
      <form onSubmit={handleSubmit} className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Payment Process */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap gap-2 items-center text-sm md:text-base">
            <Link
              to="/cart"
              className="text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">
                check_circle
              </span>
              Cart
            </Link>
            <span className="text-[#dbe2e6] dark:text-[#3a4c55] material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <Link
              to="#"
              className="text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">
                check_circle
              </span>
              Shipping
            </Link>
            <span className="text-[#dbe2e6] dark:text-[#3a4c55] material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="text-[#111618] dark:text-white font-bold">
              Payment
            </span>
            <span className="text-[#dbe2e6] dark:text-[#3a4c55] material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="text-[#617c89] dark:text-[#5a6c75] font-medium">
              Confirmation
            </span>
          </nav>

          {/* Section Title */}
          <div>
            <h1 className="text-[#111618] dark:text-white text-3xl font-bold leading-tight">
              Choose Payment Method
            </h1>
            <p className="text-[#617c89] dark:text-[#9aacb5] mt-1">
              Select your preferred way to pay for this order.
            </p>
          </div>

          {/* Payment Methods List */}
          <div className="flex flex-col gap-4">
            {/* Credit Card Option */}
            <div
              className={`rounded-xl border-2 ${
                paymentMethod === "card"
                  ? "border-primary bg-white dark:bg-[#1a2c35]"
                  : "border-[#dbe2e6] dark:border-[#2a3c45] bg-white dark:bg-[#1a2c35]"
              } overflow-hidden transition-all shadow-sm`}
            >
              <label className="flex items-center gap-4 p-5 cursor-pointer border-b border-[#f0f3f4] dark:border-[#2a3c45]">
                <input
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                  name="payment_method"
                  type="radio"
                  className="h-5 w-5 text-primary border-[#dbe2e6] focus:ring-primary focus:ring-offset-0 bg-transparent"
                />
                <div className="flex grow items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      credit_card
                    </span>
                    <span className="text-[#111618] dark:text-white font-bold text-lg">
                      Credit or Debit Card
                    </span>
                  </div>
                </div>
              </label>

              {/* Credit Card Form */}
              {paymentMethod === "card" && (
              <div className="p-5 md:p-8 bg-[#f8fbfe] dark:bg-[#15232b]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-1 md:col-span-2">
                      <label className="block text-[#111618] dark:text-[#e0e0e0] text-sm font-semibold mb-2">
                        Card Number
                      </label>
                    <div className="relative">
                        <input
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            setFormData((prev) => ({
                              ...prev,
                              cardNumber: formatted,
                            }));
                          }}
                          className={`w-full h-12 rounded-lg border ${
                            errors.cardNumber
                              ? "border-red-500"
                              : "border-[#dbe2e6] dark:border-[#3a4c55]"
                          } bg-white dark:bg-[#1a2c35] px-4 text-[#111618] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-[#9aacb5]`}
                          placeholder="0000 0000 0000 0000"
                          type="text"
                          maxLength={19}
                        />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#617c89]">
                          <span className="material-symbols-outlined">
                            credit_card
                          </span>
                        </div>
                      </div>
                      {errors.cardNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>

                  {/* Expiry Date */}
                  <div className="col-span-1">
                      <label className="block text-[#111618] dark:text-[#e0e0e0] text-sm font-semibold mb-2">
                        Expiry Date
                      </label>
                      <input
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) => {
                          const formatted = formatExpiryDate(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            expiryDate: formatted,
                          }));
                        }}
                        className={`w-full h-12 rounded-lg border ${
                          errors.expiryDate
                            ? "border-red-500"
                            : "border-[#dbe2e6] dark:border-[#3a4c55]"
                        } bg-white dark:bg-[#1a2c35] px-4 text-[#111618] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-[#9aacb5]`}
                        placeholder="MM / YY"
                        type="text"
                        maxLength={7}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.expiryDate}
                        </p>
                      )}
                  </div>

                  {/* CVV */}
                  <div className="col-span-1">
                    <label className="block text-[#111618] dark:text-[#e0e0e0] text-sm font-semibold mb-2 flex items-center gap-1">
                      CVV / CVC
                        <span
                          className="material-symbols-outlined text-[16px] text-[#617c89] cursor-help"
                          title="3-digit security code on the back of your card"
                        >
                          help
                        </span>
                    </label>
                    <div className="relative">
                        <input
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className={`w-full h-12 rounded-lg border ${
                            errors.cvv
                              ? "border-red-500"
                              : "border-[#dbe2e6] dark:border-[#3a4c55]"
                          } bg-white dark:bg-[#1a2c35] px-4 text-[#111618] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-[#9aacb5]`}
                          placeholder="123"
                          type="text"
                          maxLength={4}
                        />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#617c89]">
                        <span className="material-symbols-outlined">lock</span>
                        </div>
                      </div>
                      {errors.cvv && (
                        <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                      )}
                    </div>

                  {/* Cardholder Name */}
                  <div className="col-span-1 md:col-span-2">
                      <label className="block text-[#111618] dark:text-[#e0e0e0] text-sm font-semibold mb-2">
                        Cardholder Name
                      </label>
                      <input
                        name="cardholderName"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        className={`w-full h-12 rounded-lg border ${
                          errors.cardholderName
                            ? "border-red-500"
                            : "border-[#dbe2e6] dark:border-[#3a4c55]"
                        } bg-white dark:bg-[#1a2c35] px-4 text-[#111618] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-[#9aacb5]`}
                        placeholder="Name on card"
                        type="text"
                      />
                      {errors.cardholderName && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.cardholderName}
                        </p>
                      )}
                  </div>

                  {/* Save Card Checkbox */}
                  <div className="col-span-1 md:col-span-2 mt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          name="saveCard"
                          checked={formData.saveCard}
                          onChange={handleInputChange}
                          className="h-5 w-5 rounded border-[#dbe2e6] dark:border-[#3a4c55] bg-white dark:bg-[#1a2c35] text-primary focus:ring-primary"
                          type="checkbox"
                        />
                        <span className="text-sm text-[#111618] dark:text-[#e0e0e0] group-hover:text-primary transition-colors">
                          Save this card for future secure purchases
                        </span>
                    </label>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* PayPal Option */}
            <label
              className={`group flex items-center gap-4 rounded-xl border ${
                paymentMethod === "paypal"
                  ? "border-primary"
                  : "border-[#dbe2e6] dark:border-[#2a3c45]"
              } bg-white dark:bg-[#1a2c35] p-5 cursor-pointer hover:border-primary/50 transition-all shadow-sm`}
            >
              <input
                checked={paymentMethod === "paypal"}
                onChange={() => setPaymentMethod("paypal")}
                className="h-5 w-5 text-primary border-[#dbe2e6] bg-transparent focus:ring-primary focus:ring-offset-0"
                name="payment_method"
                type="radio"
              />
              <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#003087]">
                    account_balance_wallet
                  </span>
                  <span className="text-[#111618] dark:text-white font-medium">
                    PayPal
                  </span>
                </div>
              </div>
            </label>

            {/* Google Pay Option */}
            <label
              className={`group flex items-center gap-4 rounded-xl border ${
                paymentMethod === "googlepay"
                  ? "border-primary"
                  : "border-[#dbe2e6] dark:border-[#2a3c45]"
              } bg-white dark:bg-[#1a2c35] p-5 cursor-pointer hover:border-primary/50 transition-all shadow-sm`}
            >
              <input
                checked={paymentMethod === "googlepay"}
                onChange={() => setPaymentMethod("googlepay")}
                className="h-5 w-5 text-primary border-[#dbe2e6] bg-transparent focus:ring-primary focus:ring-offset-0"
                name="payment_method"
                type="radio"
              />
              <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#EA4335]">
                    payments
                  </span>
                  <span className="text-[#111618] dark:text-white font-medium">
                    Google Pay
                  </span>
                </div>
              </div>
            </label>

            {/* Buy Now Pay Later */}
            <label
              className={`group flex items-center gap-4 rounded-xl border ${
                paymentMethod === "bnpl"
                  ? "border-primary"
                  : "border-[#dbe2e6] dark:border-[#2a3c45]"
              } bg-white dark:bg-[#1a2c35] p-5 cursor-pointer hover:border-primary/50 transition-all shadow-sm`}
            >
              <input
                checked={paymentMethod === "bnpl"}
                onChange={() => setPaymentMethod("bnpl")}
                className="h-5 w-5 text-primary border-[#dbe2e6] bg-transparent focus:ring-primary focus:ring-offset-0"
                name="payment_method"
                type="radio"
              />
              <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ffb0d6]">
                    shopping_bag
                  </span>
                  <div>
                    <p className="text-[#111618] dark:text-white font-medium">
                      Buy Now, Pay Later
                    </p>
                    <p className="text-xs text-[#617c89] mt-0.5">
                      Pay in 4 interest-free installments
                    </p>
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* Billing Address Toggle */}
          <div className="mt-4 flex items-center gap-3 p-4 bg-white dark:bg-[#1a2c35] rounded-xl border border-[#dbe2e6] dark:border-[#2a3c45]">
            <input
              checked={billingSameAsShipping}
              onChange={(e) => setBillingSameAsShipping(e.target.checked)}
              className="h-5 w-5 rounded border-[#dbe2e6] dark:border-[#3a4c55] text-primary focus:ring-primary"
              type="checkbox"
            />
            <span className="text-sm font-medium text-[#111618] dark:text-white">
              Billing address is the same as shipping address
            </span>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-[#1a2c35] rounded-xl shadow-sm border border-[#dbe2e6] dark:border-[#2a3c45] overflow-hidden">
              <div className="p-6 border-b border-[#f0f3f4] dark:border-[#2a3c45]">
                <h2 className="text-xl font-bold text-[#111618] dark:text-white">
                  Order Summary
                </h2>
                <p className="text-sm text-[#617c89] mt-1">
                  {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in cart
                </p>
              </div>

              {/* Product List */}
              <div className="p-6 flex flex-col gap-6 max-h-[300px] overflow-y-auto">
                {cartItems.map((item) => {
                  const itemPrice = parseFloat(item.price.replace("$", ""));
                  const itemTotal = itemPrice * item.quantity;
                  return (
                    <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 shrink-0 bg-[#f0f3f4] dark:bg-[#15232b] rounded-lg overflow-hidden relative">
                        <img
                          alt={item.name}
                          className="w-full h-full object-cover"
                          src={item.image}
                        />
                  </div>
                  <div className="flex-1">
                        <h4 className="text-sm font-bold text-[#111618] dark:text-white leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#617c89] mt-1">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-[#111618] dark:text-white mt-2">
                          ${itemTotal.toFixed(2)}
                        </p>
                  </div>
                </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="p-6 flex flex-col gap-3">
                <div className="flex justify-between text-sm text-[#617c89]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#617c89]">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600 font-medium" : ""}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#617c89]">
                  <span>Tax (Estimated)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="h-px bg-[#f0f3f4] dark:bg-[#2a3c45] my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-base font-bold text-[#111618] dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {/* Pay Button */}
                <button
                  type="submit"
                  disabled={isClearingCart}
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isClearingCart ? (
                    <>
                      <LoadingSpinner size="sm" className="border-white border-t-transparent" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined group-hover:scale-110 transition-transform">
                        lock
                      </span>
                      Pay ${total.toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CheckoutPage;
