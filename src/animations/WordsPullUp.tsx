import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
}

export default function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, wordIndex) => {
        const isLast = wordIndex === words.length - 1;
        return (
          <span key={wordIndex} className="inline-flex flex-wrap items-baseline">
            {word.split("").map((char, charIndex) => {
              const isLastCharOfLastWord = isLast && charIndex === word.length - 1;
              return (
                <span key={charIndex} className="relative">
                  <motion.span
                    className="inline-block leading-none"
                    style={{ willChange: "transform, opacity" }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{
                      duration: 0.35,
                      delay: (wordIndex * word.length + charIndex) * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                  {showAsterisk && isLastCharOfLastWord && (
                    <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">
                      *
                    </span>
                  )}
                </span>
              );
            })}
            {!isLast && <span>&nbsp;</span>}
          </span>
        );
      })}
    </div>
  );
}
