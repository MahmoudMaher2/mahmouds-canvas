// src/components/AnimatedBackground.tsx
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white to-purple-50/20 dark:from-blue-950/20 dark:via-gray-900 dark:to-purple-950/20" />
      
      {/* Simple Moving Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-blue-300/20 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-purple-300/20 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
      
      {/* Moving dots pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-500 rounded-full animate-bounce" />
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default AnimatedBackground;