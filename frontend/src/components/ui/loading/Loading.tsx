const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      <span className="ml-3 text-gray-700 font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
