import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmationPage: React.FC = () => {
  return (
    <main className="flex-grow flex justify-center items-center py-8 px-4 md:px-8 min-h-[60vh]">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">
              check_circle
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#111618] dark:text-white mb-2">
            Order Confirmed!
          </h1>
          <p className="text-[#617c89] dark:text-[#9aacb5] text-lg">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        <div className="bg-white dark:bg-[#1a2c35] rounded-xl border border-[#dbe2e6] dark:border-[#2a3c45] p-6 mb-6">
          <p className="text-sm text-[#617c89] dark:text-[#9aacb5] mb-2">
            Order Number
          </p>
          <p className="text-xl font-bold text-[#111618] dark:text-white mb-4">
            ORD-{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </p>
          <p className="text-sm text-[#617c89] dark:text-[#9aacb5]">
            You will receive an email confirmation shortly with order details and tracking information.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-all"
          >
            Continue Shopping
          </Link>
          <Link
            to="/account"
            className="border-2 border-[#dbe2e6] dark:border-[#2a3c45] text-[#111618] dark:text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
          >
            View Orders
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmationPage;
