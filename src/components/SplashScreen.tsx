import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

interface SplashScreenProps {
  onComplete: () => void;
}

// Stagger configurations for name reveal (Defined outside to prevent recreation on render)
const nameContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
} as const;

const letterVariants = {
  hidden: { opacity: 0, y: 15, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 10 },
  },
} as const;

const tagsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 1.0,
    },
  },
} as const;

const tagVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 12 },
  },
} as const;

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Total loading progress duration: 2200ms
    const loadingDuration = 2200;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      // Calculate progress with a non-linear feel
      let calculatedProgress = 0;
      if (elapsed < 700) {
        calculatedProgress = (elapsed / 700) * 45;
      } else if (elapsed < 1400) {
        calculatedProgress = 45 + ((elapsed - 700) / 700) * 35;
      } else if (elapsed < 1900) {
        calculatedProgress = 80 + ((elapsed - 1400) / 500) * 18;
      } else {
        calculatedProgress = 98 + ((elapsed - 1900) / 300) * 2;
      }

      const currentProgress = Math.min(calculatedProgress, 100);
      setProgress(currentProgress);

      if (elapsed >= loadingDuration) {
        setProgress(100);
        clearInterval(progressInterval);

        // Wait 400ms at 100% and then start exit slide-up
        const exitTimeout = setTimeout(() => {
          setIsExiting(true);
        }, 450);

        return () => clearTimeout(exitTimeout);
      }
    }, 16);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  const getLoadingMessage = (val: number) => {
    if (val < 20) return "Initializing QA workspace environment...";
    if (val < 45) return "Loading automated Selenuim & Playwright test suites...";
    if (val < 70) return "Configuring Mock APIs & performance tools (JMeter)...";
    if (val < 88) return "Running regression suite benchmarks & security audits...";
    if (val < 98) return "Compiling visual reports & Canvas charts...";
    return "Workspace environment ready. Welcome!";
  };

  const nameFirst = "Mahmoud";

  return (
    <motion.div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f1d] overflow-hidden select-none ${isExiting ? "pointer-events-none" : ""
        }`}
      initial={{ y: 0 }}
      animate={isExiting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => {
        if (isExiting) {
          onComplete();
        }
      }}
    >
      {/* Background Grid Pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isExiting ? { opacity: 0 } : { opacity: 0.03, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      {/* Laser Scanner Line (QA Inspection Motif) */}
      {!isExiting && (
        <motion.div
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-[1px] pointer-events-none z-20"
          animate={{ y: ["-50vh", "50vh"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Large Background Watermark (Utilizes Empty Spaces) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0">
        <motion.span
          className="text-[12vw] font-black text-white/[0.007] dark:text-white/[0.012] tracking-tighter uppercase whitespace-nowrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          QA Automation
        </motion.span>
      </div>

      {/* Corner HUD Telemetry Details (Frames Viewport & Maximizes Space) */}
      {!isExiting && (
        <div className="absolute inset-0 pointer-events-none z-30 font-mono text-[9px] text-white/20 p-6 md:p-10 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            {/* Top Left */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col gap-1 border-l border-t border-white/10 pl-3 pt-3"
            >
              <span>SYS_INIT: ACTIVE</span>
              <span>VER: 3.1.2_BUILD</span>
            </motion.div>
            {/* Top Right */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-1 border-r border-t border-white/10 pr-3 pt-3 text-right"
            >
              <span>SYS_LOC: CAIRO_EG</span>
              <span className="text-cyan-400">PING: 14MS // STABLE</span>
            </motion.div>
          </div>

          <div className="flex justify-between items-end">
            {/* Bottom Left */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col gap-1 border-l border-b border-white/10 pl-3 pb-3"
            >
              <span>ISTQB: CERTIFIED // QA SPECIALIST</span>
              <span className="text-cyan-400">EXPERIENCE: 1+ YEARS // AUTOMATION</span>
            </motion.div>
            {/* Bottom Right */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col gap-1 border-r border-b border-white/10 pr-3 pb-3 text-right"
            >
              <span>M_MAHER © 2026</span>
              <span>PORTFOLIO_MAIN</span>
            </motion.div>
          </div>
        </div>
      )}

      {/* Floating Glow Blobs */}
      {!isExiting && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none"
            animate={{
              x: [-50, 50, -50],
              y: [-30, 30, -30],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[120px] pointer-events-none"
            animate={{
              x: [50, -50, 50],
              y: [30, -30, 30],
              scale: [1, 1.12, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Main Content Wrapper */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-7 max-w-lg w-full px-6"
        animate={isExiting ? { opacity: 0, scale: 0.96, y: -30 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Lottie Hi/Hola Animation */}
        <motion.div
          className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" as const, stiffness: 120, damping: 12, delay: 0.15 }}
        >
          {/* Subtle glow behind the animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/15 to-cyan-500/15 blur-2xl pointer-events-none" />
          <Player
            autoplay
            loop
            src="/Hi Hola.json"
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>

        {/* Brand Name Text (Staggered character reveal + fixed gradient rendering) */}
        <div className="flex flex-col items-center">
          <motion.h1 className="text-5xl md:text-6xl font-black tracking-tight text-white flex items-center justify-center gap-x-3.5 flex-wrap">
            <motion.span
              variants={nameContainerVariants}
              initial="hidden"
              animate="visible"
              className="flex"
            >
              {nameFirst.split("").map((char, idx) => (
                <motion.span key={`first-${idx}`} variants={letterVariants} className="inline-block">
                  {char}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 15, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.8 }}
              className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent inline-block"
            >
              Maher
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.22em" }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="text-[10px] md:text-xs text-white/40 font-bold uppercase tracking-[0.22em] text-center mt-2.5"
          >
            QA Automation Engineer
          </motion.p>
        </div>

        {/* Dot Divider expanding from center */}
        <div className="flex items-center gap-4 py-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-transparent to-white/10"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.0 }}
            className="w-1.5 h-1.5 rounded-full bg-blue-500/60 shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            className="w-1 h-1 rounded-full bg-cyan-500/40"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="w-0.5 h-0.5 rounded-full bg-white/20"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="h-px bg-gradient-to-l from-transparent to-white/10"
          />
        </div>

        {/* Loader Progress & Status */}
        <div className="w-full max-w-sm mt-1">
          {/* Progress track */}
          <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Loader Percentage & Status indicator */}
          <div className="flex justify-between items-center mt-2.5 px-1 text-[9px] font-mono tracking-widest text-white/20 uppercase">
            <span>Status: Running</span>
            <span className="text-white/60 font-semibold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Terminal Log Console */}
        <div className="w-full max-w-sm h-10 flex flex-col items-center justify-start text-center">
          <span className="text-[10px] md:text-[11px] text-white/45 font-mono tracking-wide leading-relaxed min-h-[20px] max-w-full px-2 truncate">
            {getLoadingMessage(progress)}
            <span className="animate-pulse inline-block w-1.5 h-3 ml-1 bg-cyan-400/80 align-middle" />
          </span>
        </div>

        {/* Staggered QA Skill Tags */}
        <motion.div
          variants={tagsContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap items-center justify-center gap-2 max-w-sm mt-1"
        >
          {["QA Engineering", "Test Automation", "Performance (JMeter)", "Mobile Testing"].map((tag) => (
            <motion.span
              key={tag}
              variants={tagVariants}
              whileHover={{ scale: 1.05, borderColor: "rgba(6, 182, 212, 0.4)", color: "rgba(255, 255, 255, 0.6)" }}
              className="text-[9px] px-2.5 py-1 rounded-full border border-white/5 bg-white/[0.02] text-white/30
                font-mono tracking-wider transition-colors duration-200 cursor-default select-none shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Slide-Up Transition Shadows */}
      {isExiting && (
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-cyan-500/20 to-transparent pointer-events-none" />
      )}
    </motion.div>
  );
};

export default SplashScreen;
