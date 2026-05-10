import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { WordsPullUpMultiStyle } from "../animations/WordsPullUp";

const headerSegments = [
  {
    text: "Where I've worked.",
    className: "text-primary",
  },
  {
    text: "Building at scale, shipping with intent.",
    className: "text-gray-500",
  },
];

interface Role {
  number: string;
  title: string;
  company: string;
  period: string;
  description: string;
  colSpan: string;
}

const roles: Role[] = [
  {
    number: "01",
    title: "Senior Frontend Engineer",
    company: "Clara Health",
    period: "2023 — Present",
    description:
      "Led redesign of core platform serving 2M+ users. Established component library and design system that reduced feature delivery time by 35%.",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    number: "02",
    title: "Full-Stack Developer",
    company: "Fieldstream",
    period: "2021 — 2023",
    description:
      "Built real-time data pipelines and monitoring dashboards for distributed infrastructure. Migrated monolith to microservices handling 50K req/min.",
    colSpan: "",
  },
  {
    number: "03",
    title: "Software Engineer",
    company: "Iterative Labs",
    period: "2019 — 2021",
    description:
      "Designed and shipped developer tooling for CI/CD pipelines. Implemented automated testing framework that caught 80% of regressions before deploy.",
    colSpan: "",
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-16 sm:mb-20">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9]">
            <WordsPullUpMultiStyle segments={headerSegments} />
          </div>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.number}
              className={`${role.colSpan} bg-[#111111] rounded-[2rem] p-6 sm:p-8 border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.35)] hover:bg-[#161616] transition-colors duration-500 relative overflow-hidden group flex flex-col justify-between`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div>
                <span className="text-[10px] sm:text-xs tracking-[0.15em] font-bold text-white/40 block mb-4">
                  {role.number} // {role.period}
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-1">
                  {role.title}
                </h2>

                <p className="text-primary/70 text-sm mb-4">
                  {role.company}
                </p>

                <p className="text-primary/60 text-sm sm:text-base leading-relaxed">
                  {role.description}
                </p>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.15em] font-bold text-primary group-hover:gap-4 active:scale-[0.96] transition-[gap,transform] duration-500 mt-6"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                VIEW WORK
                <span className="border border-white/[0.08] rounded-full p-2">
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}