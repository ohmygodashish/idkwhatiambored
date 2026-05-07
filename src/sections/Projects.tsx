import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import WordsPullUpMultiStyle from "../animations/WordsPullUpMultiStyle";

const FEATURE_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";

const headerSegments = [
  {
    text: "Selected projects and shipped work.",
    className: "text-[#E1E0CC]",
  },
  {
    text: "Built with care. Shipped with confidence.",
    className: "text-gray-500",
  },
];

type CardVariant = "text" | "media";

interface ProjectCard {
  number: string;
  label: string;
  title: string;
  items?: string[];
  description?: string;
  variant: CardVariant;
  mediaUrl?: string;
  mediaType?: "video" | "image";
  colSpan: string;
}

const projects: ProjectCard[] = [
  {
    number: "01",
    label: "FEATURED",
    title: "Featured project.",
    variant: "media",
    mediaUrl: FEATURE_VIDEO_URL,
    mediaType: "video",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    number: "02",
    label: "INFRASTRUCTURE",
    title: "Cloud Infrastructure.",
    variant: "text",
    items: [
      "Automated deployment pipelines with zero-downtime releases",
      "Real-time monitoring dashboards and alerting systems",
      "Auto-scaling infrastructure across multiple regions",
      "Cost optimization reducing cloud spend by 40%",
    ],
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    number: "03",
    label: "DATA",
    title: "Data Pipeline.",
    variant: "media",
    mediaUrl:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
    mediaType: "image",
    colSpan: "",
  },
  {
    number: "04",
    label: "DEVELOPER TOOLS",
    title: "Developer Toolkit.",
    variant: "text",
    items: [
      "CLI tools automating repetitive development workflows",
      "Editor extensions for inline linting and formatting",
      "Shared component libraries with typed design tokens",
    ],
    colSpan: "md:col-span-2 lg:col-span-1",
  },
  {
    number: "05",
    label: "PLATFORM",
    title: "Full-Stack Platform.",
    variant: "media",
    mediaUrl:
      "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
    mediaType: "image",
    colSpan: "md:col-span-2",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-5"
    >
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-20">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9]">
            <WordsPullUpMultiStyle segments={headerSegments} />
          </div>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {projects.map((card, index) => (
            <motion.div
              key={index}
              className={`${card.colSpan} ${
                card.variant === "text"
                  ? "bg-[#212121] rounded-[2rem] p-6 sm:p-8 border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden group hover:bg-[#2a2a2a] transition-colors duration-500 min-h-[400px] flex flex-col justify-between"
                  : "rounded-[2rem] overflow-hidden border border-white/[0.04] relative group min-h-[400px]"
              }`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {card.variant === "text" ? (
                <>
                  <div>
                    <span className="text-[10px] sm:text-xs tracking-[0.15em] font-bold text-white/40 block mb-4">
                      {card.number} // {card.label}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight mb-6">
                      {card.title}
                    </h2>
                    {card.items && (
                      <ul className="space-y-3 mb-8">
                        {card.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-[#E1E0CC]/70">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.15em] font-bold text-primary group-hover:gap-4 transition-[gap] duration-500"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  >
                    VIEW PROJECT
                    <span className="border border-white/[0.06] rounded-full p-2">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </>
              ) : (
                <>
                  {card.mediaType === "video" ? (
                    <video
                      src={card.mediaUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={card.mediaUrl}
                      alt={card.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010] via-[#101010]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 w-full flex justify-between items-end">
                    <div>
                      <span className="text-[10px] sm:text-xs tracking-[0.15em] font-bold text-white/40 block mb-2">
                        {card.number} // {card.label}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC] tracking-tight">
                        {card.title}
                      </h2>
                    </div>
                    <a
                      href="#"
                      className="bg-primary text-[#323124] rounded-full p-3 flex items-center justify-center hover:scale-110 active:scale-[0.96] transition-transform duration-500"
                      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}