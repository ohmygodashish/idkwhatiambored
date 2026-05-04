export default function Navbar() {
  const links = [
    "Our story",
    "Collective",
    "Workshops",
    "Programs",
    "Inquiries",
  ];

  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
      <div className="bg-black/85 backdrop-blur-xl rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 border border-white/[0.06] border-t-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_2px_12px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14">
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
