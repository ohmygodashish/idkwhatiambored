import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WordsPullUpMultiStyle } from "../animations/WordsPullUp";

const headerSegments = [
  {
    text: "Where I've worked.",
    className: "text-primary",
  },
  {
    text: "Building at scale, shipping with intent.",
    className: "italic font-serif text-gray-500",
  },
];

interface Role {
  title: string;
  company: string;
  period: string;
  description: string;
}

const roles: Role[] = [
  {
    title: "Senior Frontend Engineer",
    company: "Nexus Digital",
    period: "2023 — Present",
    description:
      "Led redesign of core platform serving 2M+ users. Established component library and design system that reduced feature delivery time by 35%.",
  },
  {
    title: "Full-Stack Developer",
    company: "Meridian Labs",
    period: "2021 — 2023",
    description:
      "Built real-time data pipelines and monitoring dashboards for distributed infrastructure. Migrated monolith to microservices handling 50K req/min.",
  },
  {
    title: "Software Engineer",
    company: "Cobalt Systems",
    period: "2019 — 2021",
    description:
      "Designed and shipped developer tooling for CI/CD pipelines. Implemented automated testing framework that caught 80% of regressions before deploy.",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-20">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9]">
            <WordsPullUpMultiStyle segments={headerSegments} />
          </div>
        </div>

        <div ref={ref} className="relative max-w-3xl">
          <div className="absolute left-[5px] top-2 bottom-2 w-px bg-white/[0.08]" />

          <div className="flex flex-col gap-10 sm:gap-14">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                className="relative pl-8 sm:pl-10"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="absolute left-0 top-2 w-[10px] h-[10px] rounded-full bg-primary -translate-x-[2.5px]" />

                <span className="text-[10px] sm:text-xs tracking-[0.1em] font-bold text-white/40 uppercase block mb-2">
                  {role.period}
                </span>

                <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight mb-1">
                  {role.title}
                </h2>

                <p className="text-primary/70 text-sm mb-3">
                  {role.company}
                </p>

                <p className="text-primary/60 text-sm sm:text-base leading-relaxed">
                  {role.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}