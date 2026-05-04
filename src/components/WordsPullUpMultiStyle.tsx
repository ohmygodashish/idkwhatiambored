import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
}

export default function WordsPullUpMultiStyle({
  segments,
  className = "",
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
      {allWords.map((item, wordIndex) => (
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
      ))}
    </div>
  );
}
