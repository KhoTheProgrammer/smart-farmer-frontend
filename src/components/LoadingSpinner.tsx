// Loading spinner component - shows while data is being fetched

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-10 min-h-[200px]">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-[--color-primary] rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
