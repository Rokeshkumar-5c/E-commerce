import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingCartPage: React.FC = () => {
  return (
    <main className="layout-container max-w-[1280px] mx-auto px-4 sm:px-10 py-8 w-full min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Cart Items & Upsells */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Page Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-text-main-light dark:text-text-main-dark">
              Shopping Cart <span className="text-text-sec-light dark:text-text-sec-dark text-xl font-medium align-middle ml-2">(3 items)</span>
            </h1>
            <Link to="/" className="text-sm font-medium text-primary hover:text-primary-dark underline decoration-1 underline-offset-4">Continue Shopping</Link>
          </div>
          {/* Free Shipping Progress */}
          <div className="bg-card-light dark:bg-card-dark rounded-xl p-5 border border-border-light dark:border-border-dark shadow-sm">
            <div className="flex gap-6 justify-between mb-3">
              <p className="text-text-main-light dark:text-text-main-dark text-base font-semibold">
                Spend $15.00 more for Free Shipping
              </p>
              <span className="material-symbols-outlined text-primary">local_shipping</span>
            </div>
            <div className="rounded-full bg-background-light dark:bg-border-dark overflow-hidden h-2.5">
              <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out" style={{ width: '85%' }}></div>
            </div>
            <p className="text-text-sec-light dark:text-text-sec-dark text-xs mt-2 font-medium">85% towards free shipping</p>
          </div>
          {/* Cart Items List */}
          <div className="flex flex-col gap-4">
            {/* Item 1 */}
            <div className="flex flex-col sm:flex-row gap-4 bg-card-light dark:bg-card-dark px-4 py-4 sm:p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0">
                <div className="bg-center bg-no-repeat bg-cover rounded-lg size-24 sm:size-28 bg-gray-100 dark:bg-gray-800" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBjC17yisOwRzTziefA9TaT_0Qx9ZzikZHwPW24mKB2cDFyAzvRnG5R8NcgTqopF4fbC00oB4e6Rz22Y9sr0hXCIkYTdx5nwtac6sKe5ZNr78bNWyTYJKViJTbsNwBZCced4nIevrnznJtZ_E6AczATVLYt4IPLXvgebHPwQIdH0aXSpGiCCKqQ_E6YoeI0kX2nAFowKxCtKBvDrXbaT1Fh-LUHArH3LnQ9e540SWMSTg2CGUR37cfh09-R3V9C7h9NL7vAZl2wDtE")' }}>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <a className="text-lg font-semibold text-text-main-light dark:text-text-main-dark hover:text-primary transition-colors" href="#">Premium Fountain Pen</a>
                    </div>
                    <p className="text-text-sec-light dark:text-text-sec-dark text-sm">Trim: Gold | Ink: Blue</p>
                    <p className="text-green-600 text-xs font-medium mt-1">In Stock</p>
                  </div>
                  <p className="text-lg font-bold text-text-main-light dark:text-text-main-dark">$45.00</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                  <div className="flex items-center gap-4 text-text-sec-light dark:text-text-sec-dark text-sm">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors group">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      <span className="group-hover:underline">Remove</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors group">
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                      <span className="group-hover:underline">Save for later</span>
                    </button>
                  </div>
                  <div className="flex items-center bg-background-light dark:bg-border-dark rounded-lg p-1">
                    <button aria-label="Decrease quantity" className="size-7 flex items-center justify-center rounded bg-white dark:bg-card-dark text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <input className="w-10 bg-transparent border-none text-center text-sm font-medium text-text-main-light dark:text-text-main-dark focus:ring-0 p-0" min="1" type="number" defaultValue="1" />
                    <button aria-label="Increase quantity" className="size-7 flex items-center justify-center rounded bg-white dark:bg-card-dark text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Item 2 */}
            <div className="flex flex-col sm:flex-row gap-4 bg-card-light dark:bg-card-dark px-4 py-4 sm:p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0">
                <div className="bg-center bg-no-repeat bg-cover rounded-lg size-24 sm:size-28 bg-gray-100 dark:bg-gray-800" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGIuZ052GsBpbk3SxFveeqJlBl_rjyRshAfu7CFi7nwvatGnS5KGTx9jp92uAKuPmOUpzLfIYytsqJ6OdjvxyYtddSRWZQrMjDCUQO-p6UdiY_M4HKfHPwLg5_bJ-0kF_raskPYNLf-O1y5EtulDUtWk09hz7rAeYTSop1IW5NM2o6VUupa9VHdXTLrZgw1mkikzVWg6u_9ADipX21b1Mt9ClhMSJGsU8AwNqW64xcnmSsXNXXre1BF9M6tn_aaawCSODJuw5S-eQ")' }}>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <a className="text-lg font-semibold text-text-main-light dark:text-text-main-dark hover:text-primary transition-colors" href="#">Ceramic Desk Statue</a>
                    </div>
                    <p className="text-text-sec-light dark:text-text-sec-dark text-sm">Style: Abstract | Size: Medium</p>
                    <p className="text-green-600 text-xs font-medium mt-1">In Stock</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-text-main-light dark:text-text-main-dark">$60.00</p>
                    <p className="text-xs text-text-sec-light dark:text-text-sec-dark">$30.00 each</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                  <div className="flex items-center gap-4 text-text-sec-light dark:text-text-sec-dark text-sm">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors group">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      <span className="group-hover:underline">Remove</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors group">
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                      <span className="group-hover:underline">Save for later</span>
                    </button>
                  </div>
                  <div className="flex items-center bg-background-light dark:bg-border-dark rounded-lg p-1">
                    <button className="size-7 flex items-center justify-center rounded bg-white dark:bg-card-dark text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <input className="w-10 bg-transparent border-none text-center text-sm font-medium text-text-main-light dark:text-text-main-dark focus:ring-0 p-0" type="number" defaultValue="2" />
                    <button className="size-7 flex items-center justify-center rounded bg-white dark:bg-card-dark text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Item 3 */}
            <div className="flex flex-col sm:flex-row gap-4 bg-card-light dark:bg-card-dark px-4 py-4 sm:p-5 rounded-xl border border-border-light dark:border-border-dark shadow-sm hover:shadow-md transition-shadow">
              <div className="shrink-0">
                <div className="bg-center bg-no-repeat bg-cover rounded-lg size-24 sm:size-28 bg-gray-100 dark:bg-gray-800" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4IxfdtnL2UzwdI-8p1QgfnAl1ByH-lQO7OSbILcVTCrdubErTxfuokTNGNye46V88yQV93U9xT3Ev4e9OSF6tu4knUEWdS2RQVVAJl6Zab-nwRA56zhDCX2OoABX42czFpJKIRSPViK2EQwce19lwetOXu75ea9QOspnbcRmEtoTlUfim6lj-bsC3zAG2a2PfvGpL5CZvrTLJGEoOuptT-JBrTHDhpv_YyWWr3_mbDcte9XT9mfbygayaWjWdPkbp5ha_AKqjkts")' }}>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <a className="text-lg font-semibold text-text-main-light dark:text-text-main-dark hover:text-primary transition-colors" href="#">Executive Leather Notebook</a>
                    </div>
                    <p className="text-text-sec-light dark:text-text-sec-dark text-sm">Color: Cognac | Paper: Dot Grid</p>
                    <p className="text-orange-500 text-xs font-medium mt-1">Only 3 left in stock</p>
                  </div>
                  <p className="text-lg font-bold text-text-main-light dark:text-text-main-dark">$25.00</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
                  <div className="flex items-center gap-4 text-text-sec-light dark:text-text-sec-dark text-sm">
                    <button className="flex items-center gap-1 hover:text-red-500 transition-colors group">
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                      <span className="group-hover:underline">Remove</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-primary transition-colors group">
                      <span className="material-symbols-outlined text-[18px]">favorite</span>
                      <span className="group-hover:underline">Save for later</span>
                    </button>
                  </div>
                  <div className="flex items-center bg-background-light dark:bg-border-dark rounded-lg p-1">
                    <button className="size-7 flex items-center justify-center rounded bg-white dark:bg-card-dark text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <input className="w-10 bg-transparent border-none text-center text-sm font-medium text-text-main-light dark:text-text-main-dark focus:ring-0 p-0" type="number" defaultValue="1" />
                    <button className="size-7 flex items-center justify-center rounded bg-white dark:bg-card-dark text-text-main-light dark:text-text-main-dark shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Recommendations / Upsells */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-4">You might also like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Rec Item 1 */}
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800 mb-2 overflow-hidden relative">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCUqoYW88Aqulft3Wfc8vGufoPi0aBp33ohHZxvsclMCQtAzA-rASI5LNO4Hu-2uOq2f0MMUuuEd-DQS5Y1qGwzSpdmXMDQzbVO4PnPAAgu-dpseGdP8Ag_rXBNdIwWNsTSKZwnN4nmIPtvY966CRPokPca0hCnfmpjB2Bs2oMUyA29JEq2uejT8I6-ldFXDKrkRWZs3YVlqx9O8MWdvioyoCtmepo7CB_RnEKRhx3R3EDgaYX6rIFi1Zd0dzQ93d_TbVNMoHKSDTo")' }}></div>
                  <button className="absolute bottom-2 right-2 size-8 bg-white dark:bg-card-dark rounded-full shadow flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
                <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark truncate">Desk Organizer Set</p>
                <p className="text-sm text-text-sec-light dark:text-text-sec-dark">$35.00</p>
              </div>
              {/* Rec Item 2 */}
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800 mb-2 overflow-hidden relative">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDbc4aXPgcClKMJ4duKltvA8rCQwJTUgRd6ZxEXxIZLv3HbhlNB377mrvqH1G_2fb3cevSl6chte1tZMlx3t3KLsLt1nNH04NpX96eoZMhV9AdVG7XcpGk7sG6rhBkM2FDwB55cE5vI-DgRkPEcRo3FufMlSWeW7s9JkZLXNwIfU8R6EYCxxvGYcBcKT-oi1ofFUWXuH6wgyPl7SAXslj0xIDKtE5QFZiN7OEncpNTDxi6MjOeR9XcdiKNn0Fq5DGnzwRw7irfMWlQ")' }}></div>
                  <button className="absolute bottom-2 right-2 size-8 bg-white dark:bg-card-dark rounded-full shadow flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
                <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark truncate">Metallic Ballpoint</p>
                <p className="text-sm text-text-sec-light dark:text-text-sec-dark">$12.50</p>
              </div>
              {/* Rec Item 3 */}
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800 mb-2 overflow-hidden relative">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOBGdksEFdESEmXEFNtoP3xCq2DJLxn1-nkQgZmM9cpaWp7R42L2gq2K6DzHTshdWF7gQVeWDfKH7HgGTLy5Eo8hKwjdC9qZKLv003HbmQ6LzwyIieSKZ-zxwX-SZTP4rD2ny0cy1rA7IXB8RON44YHvHA8yTDGKqu0moeLGWVVu93dlK0t2y0W56p55Vr26xK17aAQsp7dDc54XYlaZbcyZ-2vvo_C0-5Njgzq9JzTPS1vNefemxkGKyg61FgHmXl3x6gm5HIP-4")' }}></div>
                  <button className="absolute bottom-2 right-2 size-8 bg-white dark:bg-card-dark rounded-full shadow flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
                <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark truncate">Scented Candle</p>
                <p className="text-sm text-text-sec-light dark:text-text-sec-dark">$22.00</p>
              </div>
              {/* Rec Item 4 */}
              <div className="group cursor-pointer">
                <div className="aspect-square rounded-lg bg-gray-200 dark:bg-gray-800 mb-2 overflow-hidden relative">
                  <div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBB-CJXuq0FfWzA0n9L9qcw5RATJ7EptB0QgBZ55J1Bj4Trms0ehvZEbmi0ZyeRPLTHs4dVLFABcX0ViIEQJM_FEla_49x2hagKilgpCy5arROA-vIdBHcIrPBOhyPsWqAdcFIZn3BbRY5kCpdEE-dQ4ycretZgz3iygtkpxpqSJuVWO1dIgohfKonzGN1TQm9iyQJqeMh3KY9Leu2FaVJykJNne-BeKAwkRLC8LyfL9tWcmJM1FCfKJjXKKk1i8QM_RsR9YLdfyjw")' }}></div>
                  <button className="absolute bottom-2 right-2 size-8 bg-white dark:bg-card-dark rounded-full shadow flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
                <p className="text-sm font-medium text-text-main-light dark:text-text-main-dark truncate">Mini Succulent</p>
                <p className="text-sm text-text-sec-light dark:text-text-sec-dark">$18.00</p>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column: Sticky Summary */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-24 bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 shadow-lg">
            <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark mb-6">Order Summary</h2>
            <div className="flex flex-col gap-3 mb-6 border-b border-border-light dark:border-border-dark pb-6">
              <div className="flex justify-between text-text-sec-light dark:text-text-sec-dark text-sm">
                <span>Subtotal</span>
                <span className="text-text-main-light dark:text-text-main-dark font-medium">$130.00</span>
              </div>
              <div className="flex justify-between text-text-sec-light dark:text-text-sec-dark text-sm">
                <span>Estimated Shipping</span>
                <span className="text-text-main-light dark:text-text-main-dark font-medium">Calculated next</span>
              </div>
              <div className="flex justify-between text-text-sec-light dark:text-text-sec-dark text-sm">
                <span>Estimated Tax</span>
                <span className="text-text-main-light dark:text-text-main-dark font-medium">$10.40</span>
              </div>
              <div className="pt-2">
                <div className="relative">
                  <input className="w-full bg-background-light dark:bg-border-dark border-transparent rounded-lg text-sm px-4 py-2.5 focus:ring-0 focus:border-primary placeholder:text-text-sec-light dark:placeholder:text-text-sec-dark dark:text-white" placeholder="Promo code" type="text" />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary text-xs font-bold uppercase tracking-wider hover:text-primary-dark">Apply</button>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end mb-6">
              <span className="text-base font-medium text-text-main-light dark:text-text-main-dark">Total</span>
              <span className="text-2xl font-black text-text-main-light dark:text-text-main-dark tracking-tight">$140.40</span>
            </div>
            <label className="flex items-center gap-3 mb-6 cursor-pointer group">
              <input className="rounded border-gray-300 text-primary focus:ring-primary dark:bg-border-dark dark:border-gray-600" type="checkbox" />
              <div className="flex items-center gap-2 text-sm text-text-main-light dark:text-text-main-dark select-none group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">redeem</span>
                This order contains a gift
              </div>
            </label>
            <Link to="/checkout" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center gap-2">
              Proceed to Checkout
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShoppingCartPage;
