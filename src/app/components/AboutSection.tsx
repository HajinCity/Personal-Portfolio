import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, Palette, Database, Zap } from "lucide-react";

const skills = [
  { name: "Frontend", icon: Code2, items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { name: "Backend", icon: Database, items: ["Node.js", "Python", "PostgreSQL", "MongoDB"] },
  { name: "Design", icon: Palette, items: ["Figma", "UI/UX", "Motion Design", "Prototyping"] },
  { name: "Tools", icon: Zap, items: ["Git", "Docker", "AWS", "CI/CD"] },
];

const journey = [
  { year: "2018", title: "Started Coding Journey", description: "Discovered passion for web development" },
  { year: "2020", title: "First Developer Role", description: "Joined tech startup as frontend developer" },
  { year: "2022", title: "Full Stack Mastery", description: "Expanded expertise to backend technologies" },
  { year: "2024", title: "Senior Position", description: "Leading development teams and mentoring" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1a7270] to-[#387999] bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building digital experiences with code and creativity
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#1a7270] via-[#387999] to-[#3a9d90] blur-xl opacity-30"
              />
              <div className="relative bg-background rounded-full w-64 h-64 mx-auto overflow-hidden border-4 border-primary/20">
                <div className="w-full h-full bg-gradient-to-br from-[#1a7270] to-[#387999] flex items-center justify-center text-white text-6xl font-bold">
                  JD
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-foreground/90">
                I'm a passionate developer with over 6 years of experience in crafting
                elegant web solutions. I specialize in building scalable applications
                with modern technologies and exceptional user experiences.
              </p>
              <p className="text-foreground/90">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge through
                technical writing and mentorship.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold mb-6">Skills & Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow border-border/50 hover:border-primary/50 group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <skillGroup.icon className="size-6 text-primary" />
                      </div>
                      <h4 className="font-semibold">{skillGroup.name}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">My Journey</h3>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1a7270] via-[#387999] to-[#3a9d90] -translate-x-1/2" />
            <div className="space-y-8">
              {journey.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center gap-8 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                    <Card className="p-6 inline-block max-w-md hover:shadow-lg transition-shadow">
                      <div className="text-sm text-primary font-semibold mb-2">{item.year}</div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />
                  </div>
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
