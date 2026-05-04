import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";

const FEATURE_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";

const headerSegments = [
  {
    text: "Studio-grade workflows for visionary creators.",
    className: "text-[#E1E0CC]",
  },
  {
    text: "Built for pure vision. Powered by art.",
    className: "text-gray-500",
  },
];

interface FeatureCard {
  number: string;
  title: string;
  icon: string;
  items: string[];
  isVideo?: boolean;
  videoUrl?: string;
}

const features: FeatureCard[] = [
  {
    number: "01",
    title: "Your creative canvas.",
    icon: "",
    items: [],
    isVideo: true,
    videoUrl: FEATURE_VIDEO_URL,
  },
  {
    number: "01",
    title: "Project Storyboard.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85",
    items: [
      "Visual timeline with drag-and-drop scenes",
      "Shot list generator with lens and lighting notes",
      "Mood board integration from any source",
      "Real-time collaborative storyboarding",
    ],
  },
  {
    number: "02",
    title: "Smart Critiques.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85",
    items: [
      "AI-powered composition and color analysis",
      "Contextual creative notes and suggestions",
      "Integration with DaVinci, Premiere, and Final Cut",
    ],
  },
  {
    number: "03",
    title: "Immersion Capsule.",
    icon: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85",
    items: [
      "Smart notification silencing during deep work",
      "Ambient soundscapes tuned to creative flow",
      "Schedule syncing with team availability",
    ],
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle segments={headerSegments} />
          </div>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {features.map((card, index) => (
            <motion.div
              key={index}
              className={`relative rounded-2xl overflow-hidden ${
                card.isVideo
                  ? ""
                  : "bg-[#212121] p-5 sm:p-6 flex flex-col border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
              }`}
              style={{ willChange: "transform" }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {card.isVideo ? (
                <>
                  <video
                    src={card.videoUrl}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <p className="text-[#E1E0CC] font-medium text-sm sm:text-base">
                      {card.title}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={card.icon}
                    alt={card.title}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover mb-4 outline outline-1 -outline-offset-1 outline-white/10"
                  />
                  <h3 className="text-[#E1E0CC] font-medium text-sm sm:text-base mb-3">
                    {card.title}
                  </h3>
                  <ul className="space-y-2 flex-1">
                    {card.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-gray-400 text-xs sm:text-sm"
                      >
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-primary text-xs sm:text-sm mt-4 hover:gap-3 active:scale-[0.96] transition-[gap,transform] duration-200"
                  >
                    Learn more
                    <ArrowRight
                      className="w-3.5 h-3.5"
                      style={{ transform: "rotate(-45deg)" }}
                    />
                  </a>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
