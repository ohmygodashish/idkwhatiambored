export default function Navbar() {
  const links = [
    "Our story",
    "Collective",
    "Workshops",
    "Programs",
    "Inquiries",
  ];

  return (
    <nav className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-30">
      <div className="bg-black/85 backdrop-blur-xl rounded-full px-3 py-1.5 md:px-5 md:py-2 border border-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_16px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[10px] sm:text-xs md:text-sm whitespace-nowrap px-1.5 py-2 transition-colors duration-200 active:scale-[0.96] transition-transform"
              style={{
                color: "rgba(225, 224, 204, 0.8)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(225, 224, 204, 0.8)")
              }
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}