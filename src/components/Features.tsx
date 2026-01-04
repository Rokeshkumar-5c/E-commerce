const Features = () => {
  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-[#1a2230] border border-[#dbdfe6] dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[28px]">local_shipping</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[#111318] dark:text-white text-lg font-bold">Free Shipping</h3>
            <p className="text-[#616f89] dark:text-gray-400 text-sm">On all orders over $50</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-[#1a2230] border border-[#dbdfe6] dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[28px]">verified</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[#111318] dark:text-white text-lg font-bold">Quality Guarantee</h3>
            <p className="text-[#616f89] dark:text-gray-400 text-sm">Hand-picked premium items</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-[#1a2230] border border-[#dbdfe6] dark:border-white/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[28px]">lock</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-[#111318] dark:text-white text-lg font-bold">Secure Payments</h3>
            <p className="text-[#616f89] dark:text-gray-400 text-sm">100% secure checkout</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
