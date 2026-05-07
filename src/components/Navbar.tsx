import { useState, useEffect } from "react";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["About", "Projects", "Skills", "Experience", "Contact"];

  return (
    <nav
      className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="bg-black/85 backdrop-blur-xl rounded-full px-3 py-1.5 md:px-5 md:py-2 border border-white/[0.06] shadow-[0_2px_16px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 py-2 text-[rgba(225,224,204,0.7)] hover:text-[#E1E0CC] active:scale-[0.96] transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}