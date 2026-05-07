import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import WordsPullUpMultiStyle from "./WordsPullUpMultiStyle";

const segments = [
  { text: "Let's build", className: "font-normal" },
  { text: "something together.", className: "italic font-serif" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative bg-black py-24 sm:py-32 md:py-40 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] mb-8 sm:mb-12">
            <WordsPullUpMultiStyle segments={segments} />
          </div>

          <p className="text-primary/70 text-sm sm:text-base md:text-lg max-w-lg mx-auto mb-10 sm:mb-14 text-pretty" style={{ lineHeight: 1.6 }}>
            Have a project in mind, or just want to say hello?
            I'm always open to discussing new ideas and opportunities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <a
              href="mailto:hello@ashishprajapati.dev"
              className="group flex items-center gap-2 bg-primary rounded-full text-black font-medium text-sm sm:text-base hover:gap-3 active:scale-[0.96] transition-[gap,transform] duration-300"
            >
              <span className="pl-5 py-2.5 sm:py-3">Get in touch</span>
              <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center mr-1 group-hover:scale-110 transition-transform duration-300">
                <ArrowUpRight className="w-4 h-4 text-primary" />
              </span>
            </a>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-primary/70 text-xs sm:text-sm hover:text-primary transition-colors duration-200"
                style={{ color: "rgba(225, 224, 204, 0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(225, 224, 204, 0.7)")
                }
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-primary/70 text-xs sm:text-sm"
                style={{ color: "rgba(225, 224, 204, 0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(225, 224, 204, 0.7)")
                }
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-primary/70 text-xs sm:text-sm"
                style={{ color: "rgba(225, 224, 204, 0.7)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(225, 224, 204, 0.7)")
                }
              >
                Twitter
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-20 sm:mt-28 pt-8 border-t border-white/[0.06]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-primary/40 text-xs">
            Designed and built by Ashish Prajapati
          </p>
        </motion.div>
      </div>
    </section>
  );
}