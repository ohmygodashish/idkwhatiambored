import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WordsPullUpMultiStyle } from "../animations/WordsPullUp";

const headerSegments = [
  {
    text: "Skills & tools.",
    className: "text-primary",
  },
  {
    text: "What I work with.",
    className: "text-gray-500",
  },
];

interface SkillCategory {
  label: string;
  skills: string[];
}

const categories: SkillCategory[] = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Vue", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    label: "DevOps",
    skills: ["Docker", "AWS", "Kubernetes", "CI/CD", "Terraform", "Linux"],
  },
  {
    label: "Tools",
    skills: ["Git", "Figma", "VS Code", "Vim", "Notion", "Linear"],
  },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-16 sm:mb-20">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[0.95] sm:leading-[0.9]">
            <WordsPullUpMultiStyle segments={headerSegments} />
          </div>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.label}
              className="bg-[#111111] rounded-[2rem] p-6 sm:p-8 border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.35)]"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="text-[10px] sm:text-xs tracking-[0.15em] font-bold text-white/40 block mb-4">
                {category.label.toUpperCase()}
              </span>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full text-sm text-primary/70 bg-white/[0.04] border border-white/[0.06]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}