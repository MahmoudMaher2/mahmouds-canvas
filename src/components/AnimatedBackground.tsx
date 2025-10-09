const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Animated Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-accent/15 to-primary/15 rounded-full blur-3xl animate-float-slow" 
           style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/25 to-accent/25 rounded-full blur-3xl animate-pulse-glow" 
           style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-1/2 w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-float" 
           style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-40 right-1/3 w-56 h-56 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-3xl animate-float-slow" 
           style={{ animationDelay: '4s' }} />
      
      {/* Geometric Shapes */}
      <svg className="absolute top-1/4 right-1/3 w-32 h-32 text-primary/10 animate-float" style={{ animationDelay: '3s' }}>
        <circle cx="64" cy="64" r="60" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-1/3 right-1/4 w-40 h-40 text-accent/10 animate-float-slow" style={{ animationDelay: '1.5s' }}>
        <polygon points="80,10 10,140 150,140" fill="currentColor" />
      </svg>
      <svg className="absolute top-1/2 left-1/3 w-36 h-36 text-primary/10 animate-float" style={{ animationDelay: '4s' }}>
        <rect x="10" y="10" width="116" height="116" rx="20" fill="currentColor" />
      </svg>
      
      {/* Wave Pattern */}
      <svg className="absolute bottom-0 left-0 w-full h-48 opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path 
          fill="url(#wave-gradient)" 
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--gradient-start))" />
            <stop offset="50%" stopColor="hsl(var(--gradient-mid))" />
            <stop offset="100%" stopColor="hsl(var(--gradient-end))" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
