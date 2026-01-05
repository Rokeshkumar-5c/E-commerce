import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  return (
    <main className="flex-grow flex justify-center py-8 px-4 md:px-8">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Payment Process */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap gap-2 items-center text-sm md:text-base">
            <Link to="/cart" className="text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Cart
            </Link>
            <span className="text-[#dbe2e6] dark:text-[#3a4c55] material-symbols-outlined text-[16px]">chevron_right</span>
            <Link to="#" className="text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              Shipping
            </Link>
            <span className="text-[#dbe2e6] dark:text-[#3a4c55] material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-[#111618] dark:text-white font-bold">Payment</span>
            <span className="text-[#dbe2e6] dark:text-[#3a4c55] material-symbols-outlined text-[16px]">chevron_right</span>
            <span className="text-[#617c89] dark:text-[#5a6c75] font-medium">Confirmation</span>
          </nav>
          {/* Section Title */}
          <div>
            <h1 className="text-[#111618] dark:text-white text-3xl font-bold leading-tight">Choose Payment Method</h1>
            <p className="text-[#617c89] dark:text-[#9aacb5] mt-1">Select your preferred way to pay for this order.</p>
          </div>
          {/* Payment Methods List */}
          <div className="flex flex-col gap-4">
            {/* Credit Card Option (Active) */}
            <div className="rounded-xl border-2 border-primary bg-white dark:bg-[#1a2c35] overflow-hidden transition-all shadow-sm">
              <label className="flex items-center gap-4 p-5 cursor-pointer border-b border-[#f0f3f4] dark:border-[#2a3c45]">
                <input defaultChecked name="payment_method" type="radio" className="h-5 w-5 text-primary border-[#dbe2e6] focus:ring-primary focus:ring-offset-0 bg-transparent" />
                <div className="flex grow items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">credit_card</span>
                    <span className="text-[#111618] dark:text-white font-bold text-lg">Credit or Debit Card</span>
                  </div>
                </div>
              </label>
              {/* Credit Card Form */}
              <div className="p-5 md:p-8 bg-[#f8fbfe] dark:bg-[#15232b]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[#111618] dark:text-[#e0e0e0] text-sm font-semibold mb-2">Card Number</label>
                    <div className="relative">
                      <input className="w-full h-12 rounded-lg border border-[#dbe2e6] dark:border-[#3a4c55] bg-white dark:bg-[#1a2c35] px-4 text-[#111618] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-[#9aacb5]" placeholder="0000 0000 0000 0000" type="text" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#617c89]">
                        <span className="material-symbols-outlined">credit_card</span>
                      </div>
                    </div>
                  </div>
                  {/* Expiry Date */}
                  <div className="col-span-1">
                    <label className="block text-[#111618] dark:text-[#e0e0e0] text-sm font-semibold mb-2">Expiry Date</label>
                    <input className="w-full h-12 rounded-lg border border-[#dbe2e6] dark:border-[#3a4c55] bg-white dark:bg-[#1a2c35] px-4 text-[#111618] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-[#9aacb5]" placeholder="MM / YY" type="text" />
                  </div>
                  {/* CVV */}
                  <div className="col-span-1">
                    <label className="block text-[#111618] dark:text-[#e0e0e0] text-sm font-semibold mb-2 flex items-center gap-1">
                      CVV / CVC
                      <span className="material-symbols-outlined text-[16px] text-[#617c89] cursor-help" title="3-digit security code on the back of your card">help</span>
                    </label>
                    <div className="relative">
                      <input className="w-full h-12 rounded-lg border border-[#dbe2e6] dark:border-[#3a4c55] bg-white dark:bg-[#1a2c35] px-4 text-[#111618] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-[#9aacb5]" placeholder="123" type="text" />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#617c89]">
                        <span className="material-symbols-outlined">lock</span>
                      </div>
                    </div>
                  </div>
                  {/* Cardholder Name */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[#111618] dark:text-[#e0e0e0] text-sm font-semibold mb-2">Cardholder Name</label>
                    <input className="w-full h-12 rounded-lg border border-[#dbe2e6] dark:border-[#3a4c55] bg-white dark:bg-[#1a2c35] px-4 text-[#111618] dark:text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-[#9aacb5]" placeholder="Name on card" type="text" />
                  </div>
                  {/* Save Card Checkbox */}
                  <div className="col-span-1 md:col-span-2 mt-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input className="h-5 w-5 rounded border-[#dbe2e6] dark:border-[#3a4c55] bg-white dark:bg-[#1a2c35] text-primary focus:ring-primary" type="checkbox" />
                      <span className="text-sm text-[#111618] dark:text-[#e0e0e0] group-hover:text-primary transition-colors">Save this card for future secure purchases</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* PayPal Option */}
            <label className="group flex items-center gap-4 rounded-xl border border-[#dbe2e6] dark:border-[#2a3c45] bg-white dark:bg-[#1a2c35] p-5 cursor-pointer hover:border-primary/50 transition-all shadow-sm">
              <input className="h-5 w-5 text-primary border-[#dbe2e6] bg-transparent focus:ring-primary focus:ring-offset-0" name="payment_method" type="radio" />
              <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#003087]">account_balance_wallet</span>
                  <span className="text-[#111618] dark:text-white font-medium">PayPal</span>
                </div>
              </div>
            </label>
            {/* Google Pay Option */}
            <label className="group flex items-center gap-4 rounded-xl border border-[#dbe2e6] dark:border-[#2a3c45] bg-white dark:bg-[#1a2c35] p-5 cursor-pointer hover:border-primary/50 transition-all shadow-sm">
              <input className="h-5 w-5 text-primary border-[#dbe2e6] bg-transparent focus:ring-primary focus:ring-offset-0" name="payment_method" type="radio" />
              <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#EA4335]">payments</span>
                  <span className="text-[#111618] dark:text-white font-medium">Google Pay</span>
                </div>
              </div>
            </label>
            {/* Buy Now Pay Later */}
            <label className="group flex items-center gap-4 rounded-xl border border-[#dbe2e6] dark:border-[#2a3c45] bg-white dark:bg-[#1a2c35] p-5 cursor-pointer hover:border-primary/50 transition-all shadow-sm">
              <input className="h-5 w-5 text-primary border-[#dbe2e6] bg-transparent focus:ring-primary focus:ring-offset-0" name="payment_method" type="radio" />
              <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#ffb0d6]">shopping_bag</span>
                  <div>
                    <p className="text-[#111618] dark:text-white font-medium">Buy Now, Pay Later</p>
                    <p className="text-xs text-[#617c89] mt-0.5">Pay in 4 interest-free installments</p>
                  </div>
                </div>
              </div>
            </label>
          </div>
          {/* Billing Address Toggle */}
          <div className="mt-4 flex items-center gap-3 p-4 bg-white dark:bg-[#1a2c35] rounded-xl border border-[#dbe2e6] dark:border-[#2a3c45]">
            <input defaultChecked className="h-5 w-5 rounded border-[#dbe2e6] dark:border-[#3a4c55] text-primary focus:ring-primary" type="checkbox" />
            <span className="text-sm font-medium text-[#111618] dark:text-white">Billing address is the same as shipping address</span>
          </div>
        </div>
        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
          <div className="sticky top-24">
            <div className="bg-white dark:bg-[#1a2c35] rounded-xl shadow-sm border border-[#dbe2e6] dark:border-[#2a3c45] overflow-hidden">
              <div className="p-6 border-b border-[#f0f3f4] dark:border-[#2a3c45]">
                <h2 className="text-xl font-bold text-[#111618] dark:text-white">Order Summary</h2>
                <p className="text-sm text-[#617c89] mt-1">2 Items in cart</p>
              </div>
              {/* Product List */}
              <div className="p-6 flex flex-col gap-6 max-h-[300px] overflow-y-auto">
                {/* Item 1 */}
                <div className="flex gap-4">
                  <div className="w-20 h-20 shrink-0 bg-[#f0f3f4] dark:bg-[#15232b] rounded-lg overflow-hidden relative">
                    <img alt="Premium Fountain Pen with gold nib" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCktg5GSTUSxhjp0p4kwFfzGFawN7lP6Jq7LPv1E0hIhxj6OpPRIC-lubPhvaJlvT2rl-HcGGzPU2lx1rW7IbKDbEVmINmBCvOrDR3U7BpkIjCsHwLbWxdcwjyg-KZZFjDV130qOCwgOrfyH1IwET7g7q2WkoGk0fOflo-EOoibThcw5tN_i2mDTgOxcZu5xXZVdXdQlKsGe_EY7PQnIDWdvikG2pWD9A27gro_HYxXx84R2ANDYmy72xwX3oZNWiSN16oTsL_xpJM" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-[#111618] dark:text-white leading-tight">Premium Fountain Pen - Gold Edition</h4>
                    <p className="text-xs text-[#617c89] mt-1">Qty: 1</p>
                    <p className="text-sm font-medium text-[#111618] dark:text-white mt-2">$85.00</p>
                  </div>
                </div>
              </div>
              {/* Totals */}
              <div className="p-6 flex flex-col gap-3">
                <div className="flex justify-between text-sm text-[#617c89]">
                  <span>Subtotal</span>
                  <span>$124.50</span>
                </div>
                <div className="flex justify-between text-sm text-[#617c89]">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm text-[#617c89]">
                  <span>Tax (Estimated)</span>
                  <span>$10.20</span>
                </div>
                <div className="h-px bg-[#f0f3f4] dark:bg-[#2a3c45] my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="text-base font-bold text-[#111618] dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary">$134.70</span>
                </div>
                {/* Pay Button */}
                <button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group">
                  <span className="material-symbols-outlined group-hover:scale-110 transition-transform">lock</span>
                  Pay $134.70
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckoutPage;
