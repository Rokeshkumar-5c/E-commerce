const Pagination = () => {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Previous</button>
      <button className="w-10 h-10 text-sm font-medium bg-primary text-white rounded-lg">1</button>
      <button className="w-10 h-10 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">2</button>
      <button className="w-10 h-10 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">3</button>
      <span className="text-gray-400 px-2">...</span>
      <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Next</button>
    </div>
  );
};

export default Pagination;
