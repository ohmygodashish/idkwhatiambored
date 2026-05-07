import { useRef } from "react";
import { motion, useInView, useTransform, type MotionValue } from "framer-motion";

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  progress?: MotionValue<number>;
}

function ScrollWord({
  word,
  className,
  progress,
  rangeStart,
  rangeEnd,
  showSpace,
}: {
  word: string;
  className?: string;
  progress: MotionValue<number>;
  rangeStart: number;
  rangeEnd: number;
  showSpace: boolean;
}) {
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [0, 1]);
  const y = useTransform(progress, [rangeStart, rangeEnd], [20, 0]);

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className ?? ""}`}
      style={{ willChange: "transform, opacity", opacity, y }}
    >
      {word}
      {showSpace && <span>&nbsp;</span>}
    </motion.span>
  );
}

export default function WordsPullUpMultiStyle({
  segments,
  className = "",
  progress,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const allWords: { word: string; className?: string }[] = [];
  segments.forEach((segment) => {
    const words = segment.text.split(" ");
    words.forEach((word) => {
      allWords.push({ word, className: segment.className });
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {allWords.map((item, wordIndex) => {
        if (progress) {
          const wordProgress = wordIndex / allWords.length;
          const rangeStart = wordProgress - 0.1;
          const rangeEnd = wordProgress + 0.05;

          return (
            <ScrollWord
              key={wordIndex}
              word={item.word}
              className={item.className}
              progress={progress}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              showSpace={wordIndex < allWords.length - 1}
            />
          );
        }

        return (
          <motion.span
            key={wordIndex}
            className={`inline-flex flex-wrap ${item.className ?? ""}`}
            style={{ willChange: "transform, opacity" }}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: wordIndex * 0.07,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {item.word}
            {wordIndex < allWords.length - 1 && <span>&nbsp;</span>}
          </motion.span>
        );
      })}
    </div>
  );
}