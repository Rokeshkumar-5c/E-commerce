import React from 'react';
import { Link } from 'react-router-dom';

const UserAccountPage: React.FC = () => {
  return (
    <div className="flex flex-1 max-w-[1440px] mx-auto w-full">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark min-h-[calc(100vh-65px)]">
        <div className="p-6 flex flex-col gap-6 h-full">
          {/* User Mini Profile */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
            <div className="bg-center bg-no-repeat bg-cover rounded-full size-12 shrink-0" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuApiIdia871HIetL9pMcR77z1IUX7waSC6G05kwl6B4gG1jK7NSlpJYF0lXGbuaNgiMdgcCnwDqRdxFGuOAF82exL1Se0U2i0JerVXIt8BnXnGRR9A5zzyI5_yM2JZNBF64uJZIfp2W_Qo8LTKD05YoOukWWAERf-RAe2y7kBBoleLXpC3riwooVx6R8hsMYL6jG6lgazQD_ASDqDwNRRCqB7S9KRdZZQ2f7HG2Xwq5y8DkZjmBYT075ecauunAdXys4tOv0toQaIU")` }}></div>
            <div className="flex flex-col overflow-hidden">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">Alex Johnson</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Gold Member</p>
            </div>
          </div>
          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 flex-1">
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-background-light dark:hover:bg-background-dark transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary transition-colors" style={{ fontSize: '22px' }}>dashboard</span>
              <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300 transition-colors">
              <span className="material-symbols-outlined fill-current" style={{ fontSize: '22px' }}>person</span>
              <span className="text-sm font-bold">My Profile</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-background-light dark:hover:bg-background-dark transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary transition-colors" style={{ fontSize: '22px' }}>inventory_2</span>
              <span className="text-sm font-medium">My Orders</span>
              <span className="ml-auto bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-background-light dark:hover:bg-background-dark transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary transition-colors" style={{ fontSize: '22px' }}>favorite</span>
              <span className="text-sm font-medium">Wishlist</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-background-light dark:hover:bg-background-dark transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary transition-colors" style={{ fontSize: '22px' }}>location_on</span>
              <span className="text-sm font-medium">Addresses</span>
            </Link>
            <Link to="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-background-light dark:hover:bg-background-dark transition-colors group">
              <span className="material-symbols-outlined group-hover:text-primary transition-colors" style={{ fontSize: '22px' }}>credit_card</span>
              <span className="text-sm font-medium">Payment Methods</span>
            </Link>
          </nav>
          <button className="flex items-center gap-3 px-4 py-3 mt-auto rounded-lg text-slate-600 dark:text-slate-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors w-full">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>logout</span>
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      </aside>
      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto flex flex-col gap-8">
          {/* Page Heading */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back, Alex!</h1>
            <p className="text-slate-500 dark:text-slate-400">Manage your personal information, privacy, and security.</p>
          </div>
          {/* Profile Settings Card */}
          <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-border-light dark:border-border-dark flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Personal Information</h2>
              <button className="text-sm text-primary font-medium hover:underline">Edit Avatar</button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                <div className="relative">
                  <input className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" type="text" defaultValue="Alex" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                <div className="relative">
                  <input className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" type="text" defaultValue="Johnson" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>mail</span>
                  </div>
                  <input className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-slate-900 dark:text-white pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" type="email" defaultValue="alex.j@example.com" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>call</span>
                  </div>
                  <input className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-slate-900 dark:text-white pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-xs opacity-70">Security</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</label>
                  <input className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="••••••••" type="password" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                  <input className="w-full rounded-lg border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-slate-900 dark:text-white px-4 py-2.5 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all" placeholder="••••••••" type="password" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-background-light dark:bg-background-dark border-t border-border-light dark:border-border-dark flex justify-end gap-3">
              <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-card-dark border border-transparent hover:border-border-light dark:hover:border-border-dark transition-all">Cancel</button>
              <button className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-primary hover:bg-blue-600 shadow-md shadow-blue-500/20 transition-all">Save Changes</button>
            </div>
          </div>
          {/* Layout: Two columns for lower content */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Orders Column */}
            <div className="xl:col-span-2 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Orders</h2>
                <a className="text-sm font-medium text-primary hover:underline flex items-center gap-1" href="#">
                  View All <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
                </a>
              </div>
              {/* Order Card 1 */}
              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-border-light dark:border-border-dark">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Order #</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">ORD-24881</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Date Placed</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Oct 24, 2023</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Amount</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">$145.00</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Shipped
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <div className="flex -space-x-3 overflow-hidden p-1">
                    <div className="size-12 rounded-lg ring-2 ring-white dark:ring-card-dark bg-cover bg-center" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCt3NJJtvAtUDDLw4k1bBIficlhW9giLHeOUSrVzGxhezgrocByF_2eGPncjYp7TRxqb6aERyLrqxNbFh9lusROXLEJWB-vMgp2ecfqCrcCDovNxHd5ORxMoBFkRktvUY6SSJNY7xqh4D_TRxX8c0tHodl2dF4uKKr_tFsPni2ome6x-BV9VIdtulLueldo-FP79dzIzCgB3yLKSRcxWQ7rAlWP3pNBV38QvSm1e5BCG9dnsxpvU_ANuBmq3zUFfix2VRqy1SO-CTA")` }}></div>
                    <div className="size-12 rounded-lg ring-2 ring-white dark:ring-card-dark bg-cover bg-center" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9ymahp_6SNb6DnXTafc-n6JEdu7T754Up3mbW52iEXPLVSV33-g7fcf_1Hq4gT97eC-DHxuyEp9DR-nJSi1kXEBupNtCGOIIFXKSmPQvN3o07j7kStZPAEtAOebc7WiSZGZAB635lL_MI9TnI_NbkO0ZsqT2t8pXC3-HC3L7jqdnGV5tW_fcWqYBaMai7_oA_-o62g0aDrDHupvONQV154WtTSpzpdRAjXP-Y5B7-4M9Pru35NTN3BOACO-kJ5k2_rAzHQ4lHumw")` }}></div>
                    <div className="size-12 rounded-lg ring-2 ring-white dark:ring-card-dark bg-background-light dark:bg-background-dark flex items-center justify-center text-xs font-bold text-slate-500">
                      +2
                    </div>
                  </div>
                  <div className="flex-1 w-full flex gap-3 justify-end sm:justify-end mt-2 sm:mt-0">
                    <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-background-light dark:hover:bg-background-dark transition-colors">View Details</button>
                    <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-600 shadow-md shadow-blue-500/20 transition-colors">Track Order</button>
                  </div>
                </div>
              </div>
              {/* Order Card 2 */}
              <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-border-light dark:border-border-dark">
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Order #</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">ORD-24802</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Date Placed</span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Sep 12, 2023</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">Total Amount</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">$32.99</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 flex items-center gap-1">
                      Delivered
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                  <div className="flex -space-x-3 overflow-hidden p-1">
                    <div className="size-12 rounded-lg ring-2 ring-white dark:ring-card-dark bg-cover bg-center" style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAkw-GlAGQ08smd4KIpoDZMlrxrNjqTgkyBremw7Dysi5c59m_naGt04mSa-qkytOXZn8ybxc1uMSNZOfUjzEg5sqPJyR9S3Eb_GdrIYwHDOo2UBYduoPMeMVdYlSIEP3AviuGOERUhS6VcU2VF0vTSGKwqwdJvBoFPY-liCKiUgVdNm0xb4NKKQHbmnmbd2FJX3gs27KdPc5fvYGw9MVRlsxkuPhFWRfSHD5i3dRCbdSY1p15BwFZBG3_pCrn0zXqW6BdTwOa8CNU")` }}></div>
                  </div>
                  <div className="flex-1 w-full flex gap-3 justify-end sm:justify-end mt-2 sm:mt-0">
                    <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-border-light dark:border-border-dark text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-background-light dark:hover:bg-background-dark transition-colors">View Details</button>
                    <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg text-primary text-sm font-bold hover:bg-primary/10 transition-colors">Buy Again</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Side Widgets Column (Addresses & Payments) */}
            <div className="flex flex-col gap-8">
              {/* Address Widget */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Default Address</h2>
                  <button className="text-primary hover:text-blue-600 transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>edit</span>
                  </button>
                </div>
                <div className="bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-5 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                  <div className="flex items-start gap-3 relative z-10">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>home</span>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-sm">Home</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Alex Johnson<br />
                        123 Maple Avenue, Apt 4B<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment Widget */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Payment Method</h2>
                  <button className="text-primary hover:text-blue-600 transition-colors">
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                  </button>
                </div>
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-5 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8 blur-2xl"></div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="material-symbols-outlined opacity-80" style={{ fontSize: '28px' }}>contactless</span>
                    <span className="font-bold text-lg italic opacity-90">VISA</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Card Number</p>
                    <p className="font-mono text-lg tracking-widest">•••• •••• •••• 4288</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Card Holder</p>
                      <p className="text-sm font-medium">Alex Johnson</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Expires</p>
                      <p className="text-sm font-medium">12/25</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserAccountPage;
