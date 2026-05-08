import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const pillLinks = ["Projects", "Skills", "Experience", "Contact"];
const dropdownLinks = ["About", ...pillLinks];

function PillContent({ showLinks, onNavigate }: { showLinks: boolean; onNavigate: (id: string) => void }) {
  if (!showLinks) {
    return <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />;
  }

  return (
    <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
      {pillLinks.map((link, i) => (
        <motion.button
          key={link}
          onClick={() => onNavigate(link.toLowerCase())}
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
        </motion.button>
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
          className="w-4 h-[2px] bg-primary rounded-full origin-center"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.2, delay }}
        />
      ))}
    </div>
  );
}

function DropdownLinks({
  onNavigate,
}: {
  onNavigate: (id: string) => void;
}) {
  return (
    <div className="flex flex-col">
      {dropdownLinks.map((link, i) => (
        <motion.button
          key={link}
          onClick={() => onNavigate(link.toLowerCase())}
          className="text-left text-sm md:text-base py-2.5 text-[rgba(225,224,204,0.7)] hover:text-[#E1E0CC] active:scale-[0.96] transition-colors duration-200"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.25,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {link}
        </motion.button>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const [isHamburger, setIsHamburger] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [measuredWidth, setMeasuredWidth] = useState(44);
  const [measuredDropdownW, setMeasuredDropdownW] = useState(160);
  const [measuredDropdownH, setMeasuredDropdownH] = useState(200);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const dropdownMeasureRef = useRef<HTMLDivElement>(null);

  const isDesktop = windowWidth >= 768;
  const cornerInset = isDesktop ? 44 : 32;

  const handleNavigate = useCallback(
    (id: string) => {
      setIsMenuOpen(false);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (dropdownMeasureRef.current) {
      setMeasuredDropdownW(dropdownMeasureRef.current.offsetWidth);
      setMeasuredDropdownH(dropdownMeasureRef.current.offsetHeight);
    }
  }, [windowWidth]);

  const maxDropdownW = windowWidth - 2 * cornerInset;
  const rawDropdownW = isDesktop ? measuredDropdownW * 1.5 : measuredDropdownW;
  const dropdownWidth = Math.max(120, Math.min(rawDropdownW, maxDropdownW));

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!expanded) return;

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }

    const direction = latest > lastScrollY.current ? "down" : "up";
    lastScrollY.current = latest;

    if (direction === "down" && latest > 20) {
      setIsHamburger(true);
    } else if (direction === "up" && latest < 100) {
      setIsHamburger(false);
    }
  });

  const pillY = isDesktop ? 52 : 28;
  const pillX = (windowWidth - measuredWidth) / 2;
  const hamburgerX = windowWidth - 44 - cornerInset;
  const dropdownX = windowWidth - dropdownWidth - cornerInset;
  const navCornerY = cornerInset;

  const springConfig = { type: "spring" as const };
  const springX = { ...springConfig, stiffness: 180, damping: 28 };
  const springY = { ...springConfig, stiffness: 60, damping: 20 };
  const springScale = { ...springConfig, stiffness: 200, damping: 25 };
  const springWidth = { ...springConfig, stiffness: 250, damping: 30 };

  const showDropdown = isHamburger && isMenuOpen;
  const showHamburgerIcon = isHamburger && !isMenuOpen;

  const navX = isHamburger
    ? isMenuOpen
      ? dropdownX
      : hamburgerX
    : pillX;
  const navY = isHamburger ? navCornerY : pillY;

  const currentWidth = showDropdown
    ? dropdownWidth
    : isHamburger
      ? 44
      : expanded
        ? measuredWidth
        : 44;

  const currentHeight = showDropdown ? measuredDropdownH : 44;
  const currentBorderRadius = showDropdown ? 24 : 22;

  return (
    <>
      {/* Hidden measurement: pill width */}
      <div
        ref={(el) => {
          if (el) setMeasuredWidth(el.offsetWidth);
        }}
        className="fixed top-0 left-0 opacity-0 pointer-events-none z-0 bg-black/85 backdrop-blur-xl rounded-full px-3 py-1.5 md:px-5 md:py-2 border border-white/[0.06]"
      >
        <PillContent showLinks onNavigate={handleNavigate} />
      </div>

      {/* Hidden measurement: dropdown dimensions */}
      <div
        ref={dropdownMeasureRef}
        className="fixed top-0 left-0 opacity-0 pointer-events-none z-0 inline-block"
      >
        <div className="px-5 py-5">
          <div className="flex flex-col">
            {dropdownLinks.map((link) => (
              <div
                key={link}
                className="text-sm md:text-base py-2.5 text-[rgba(225,224,204,0.7)] whitespace-nowrap"
              >
                {link}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

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
          x: navX,
          y: navY,
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
          className="bg-black/85 backdrop-blur-xl border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_16px_rgba(0,0,0,0.4)] overflow-hidden"
          animate={{
            width: currentWidth,
            height: currentHeight,
            borderRadius: currentBorderRadius,
          }}
          transition={springWidth}
        >
          <div className="relative w-full h-full">
            {/* Pill links layer */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                opacity: isHamburger ? 0 : 1,
                scale: isHamburger ? 0.8 : 1,
              }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: isHamburger ? "none" : "auto" }}
            >
              <PillContent showLinks={expanded} onNavigate={handleNavigate} />
            </motion.div>

            {/* Hamburger icon layer (closed state) */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              animate={{
                opacity: showHamburgerIcon ? 1 : 0,
                scale: showHamburgerIcon ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: showHamburgerIcon ? "auto" : "none" }}
              onClick={() => setIsMenuOpen(true)}
            >
              <HamburgerIcon />
            </motion.div>

            {/* Dropdown content layer */}
            <motion.div
              className="absolute inset-0"
              animate={{
                opacity: showDropdown ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: showDropdown ? "auto" : "none" }}
            >
              <div className="px-5 py-5">
                <DropdownLinks onNavigate={handleNavigate} />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}