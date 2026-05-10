import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
  colSpan: string;
  featured?: boolean;
}

const categories: SkillCategory[] = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Vue", "Tailwind CSS", "Framer Motion"],
    colSpan: "md:col-span-2",
    featured: true,
  },
  {
    label: "Backend",
    skills: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL"],
    colSpan: "",
  },
  {
    label: "DevOps",
    skills: ["Docker", "AWS", "Kubernetes", "CI/CD", "Terraform", "Linux"],
    colSpan: "",
  },
  {
    label: "Tools",
    skills: ["Git", "Figma", "VS Code", "Vim", "Notion", "Linear"],
    colSpan: "",
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
              className={`${category.colSpan} bg-[#111111] rounded-[2rem] p-6 sm:p-8 border border-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_24px_rgba(0,0,0,0.35)] hover:bg-[#161616] transition-colors duration-500 relative overflow-hidden group`}
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
                    className="px-3 py-1.5 rounded-full text-sm text-primary/70 bg-white/[0.04] border border-white/[0.06] hover:text-primary hover:bg-white/[0.08] active:scale-[0.96] transition-colors duration-200 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              {category.featured && (
                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 text-[10px] sm:text-xs tracking-[0.15em] font-bold text-primary group-hover:gap-4 active:scale-[0.96] transition-[gap,transform] duration-500"
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  >
                    VIEW PROJECTS
                    <span className="border border-white/[0.08] rounded-full p-2">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}