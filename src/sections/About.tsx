import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, MotionValue } from "framer-motion";
import { WordsPullUpMultiStyle } from "../animations/WordsPullUp";

const ABOUT_TEXT =
  "Over the past years, I have designed and built web applications, APIs, and developer tools for startups and open-source communities. From real-time data pipelines to polished user interfaces, I focus on shipping software that is fast, reliable, and a joy to use.";

const segments = [
  { text: "Hi, I'm Ashish Prajapati,", className: "font-normal" },
  { text: "a developer who builds with precision.", className: "italic font-serif" },
  {
    text: "I craft software that's fast, reliable, and a joy to use.",
    className: "font-normal",
  },
];

function useOnceScroll(targetRef: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.85", "start 0.35"],
  });

  const maxProgress = useMotionValue(0);

  useMotionValueEvent(scrollYProgress, "change", (v: number) => {
    if (v > maxProgress.get()) maxProgress.set(v);
  });

  return maxProgress;
}

export default function About() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const segmentsScrollRef = useRef<HTMLDivElement>(null);

  const progress = useOnceScroll(scrollRef);
  const segmentsProgress = useOnceScroll(segmentsScrollRef);

  const totalChars = ABOUT_TEXT.length;

  return (
    <section className="bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto bg-[#101010] rounded-2xl md:rounded-3xl p-8 sm:p-12 md:p-16 text-center border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
        <p className="text-primary text-[10px] sm:text-xs tracking-widest uppercase mb-6 sm:mb-8">
          Software Developer
        </p>

        <div ref={segmentsScrollRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-8 sm:mb-12">
          <WordsPullUpMultiStyle segments={segments} progress={segmentsProgress} />
        </div>

        <div ref={scrollRef} className="max-w-2xl mx-auto">
          <p className="text-[#DEDBC8] text-xs sm:text-sm md:text-base text-pretty">
            {ABOUT_TEXT.split("").map((char, index) => {
              const charProgress = index / totalChars;
              const rangeStart = charProgress - 0.1;
              const rangeEnd = charProgress + 0.05;

              return (
                <ScrollChar
                  key={index}
                  char={char}
                  progress={progress}
                  rangeStart={rangeStart}
                  rangeEnd={rangeEnd}
                />
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

function ScrollChar({
  char,
  progress,
  rangeStart,
  rangeEnd,
}: {
  char: string;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
}) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0.2, 1]);

  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  );
}