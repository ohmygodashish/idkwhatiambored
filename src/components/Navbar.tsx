import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const links = ["About", "Projects", "Skills", "Experience", "Contact"];

function PillContent({ showLinks }: { showLinks: boolean }) {
  if (!showLinks) {
    return <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />;
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
      {links.map((link, i) => (
        <motion.a
          key={link}
          href={`#${link.toLowerCase()}`}
          className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 py-2 text-[rgba(225,224,204,0.7)] hover:text-[#E1E0CC] active:scale-[0.96] transition-colors duration-200"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {link}
        </motion.a>
      ))}
    </div>
  );
}

function HamburgerIcon() {
  return (
    <div className="flex flex-col items-center justify-center gap-[5px]">
      {[0.05, 0.1, 0.15].map((delay, i) => (
        <motion.div
          key={i}
          className="w-4 h-[2px] bg-primary rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.2, delay }}
        />
      ))}
    </div>
  );
}

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [isHamburger, setIsHamburger] = useState(false);
  const [measuredWidth, setMeasuredWidth] = useState(44);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Intro: expand from circle to pill
  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Track window resize
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Scroll direction → morph
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!expanded) return;

    const direction = latest > lastScrollY.current ? "down" : "up";
    lastScrollY.current = latest;

    if (direction === "down" && latest > 20) {
      setIsHamburger(true);
    } else if (direction === "up" && latest < 100) {
      setIsHamburger(false);
    }
  });

  // Position calculations
  const isDesktop = windowWidth >= 768;
  
  // Pill: centered horizontally, offset from top matching old absolute position
  const pillY = isDesktop ? 52 : 28;
  const pillX = (windowWidth - measuredWidth) / 2;
  
  // Hamburger: inside the rounded corners of the video element
  // Hero has p-3=12px mobile, md:p-5=20px. Add buffer to sit inside the curve.
  const cornerInset = isDesktop ? 44 : 32;
  const hamburgerX = windowWidth - 44 - cornerInset;
  const hamburgerY = cornerInset;

  // Slower, less bouncy spring configs
  const springX = { type: "spring" as const, stiffness: 180, damping: 28 };
  const springY = { type: "spring" as const, stiffness: 60, damping: 20 }; // deeper arc
  const springScale = { type: "spring" as const, stiffness: 200, damping: 25 };
  const springWidth = { type: "spring" as const, stiffness: 250, damping: 30 };

  return (
    <>
      {/* Hidden measurement container */}
      <div
        ref={(el) => {
          if (el) setMeasuredWidth(el.offsetWidth);
        }}
        className="fixed top-0 left-0 opacity-0 pointer-events-none z-0 bg-black/85 backdrop-blur-xl rounded-full px-3 py-1.5 md:px-5 md:py-2 border border-white/[0.06]"
      >
        <PillContent showLinks />
      </div>

      <motion.nav
        className="fixed z-50 pointer-events-auto"
        style={{ willChange: "transform" }}
        initial={{
          x: pillX,
          y: pillY,
          opacity: 0,
          scale: 0.8,
        }}
        animate={{
          x: isHamburger ? hamburgerX : pillX,
          y: isHamburger ? hamburgerY : pillY,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          x: springX,
          y: springY,
          opacity: { duration: 0.5 },
          scale: springScale,
        }}
      >
        <motion.div
          className="bg-black/85 backdrop-blur-xl rounded-full border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_16px_rgba(0,0,0,0.4)] flex items-center justify-center h-11 overflow-hidden"
          animate={{
            width: isHamburger ? 44 : expanded ? measuredWidth : 44,
          }}
          transition={springWidth}
        >
          {/* Crossfade: hamburger ↔ pill links */}
          <div className="relative w-full h-full">
            {/* Hamburger layer */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: isHamburger ? 1 : 0,
                scale: isHamburger ? 1 : 0.8,
              }}
              transition={{ duration: 0.25 }}
            >
              <HamburgerIcon />
            </motion.div>

            {/* Pill links layer */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: isHamburger ? 0 : 1,
                scale: isHamburger ? 0.8 : 1,
              }}
              transition={{ duration: 0.25 }}
            >
              <PillContent showLinks={expanded} />
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}