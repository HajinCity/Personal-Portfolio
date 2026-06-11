import { CityBackground } from "./CityBackground";
import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code2, Palette, Database, Zap } from "lucide-react";

const skills = [
  { name: "Frontend", icon: Code2, items: ["React", "HTML/CSS/JS", "TypeScript", "Tailwind CSS", "WordPress"] },
  { name: "Backend", icon: Database, items: ["C# / .NET", "REST APIs", "Python", "SQL", "Firebase"] },
  { name: "Design", icon: Palette, items: ["Figma", "UI/UX", "Canva", "Prototyping"] },
  { name: "Tools", icon: Zap, items: ["Git / GitHub", "VS Code", "Cursor AI", "ClickUp", "Trello"] },
];

const journey = [
  { year: "2022", title: "First Real Project", description: "Built the 3 Degree Coffee Shop POS system — my first end-to-end production app — while starting BS Information Technology at Saint Columban College." },
  { year: "2024", title: "Hestia Case Management System", description: "Developed a full VAWC case management platform with secure data handling, audit trails, and role-based access across desktop and mobile." },
  { year: "2025-2026", title: "BS IT Graduate & Internship at ActiVerse", description: "Graduated from Saint Columban College and completed a 500-hour hybrid OJT at ActiVerse Incorporation in Makati, serving simultaneously as Full Stack Developer, WordPress Developer, Tech Support, and more." },
  { year: "2025–2026", title: "Backend & Freelance Developer", description: "Built REST APIs and mobile features for Motodisk.com, developed the Accounts Payable Management System, and delivered client web projects — all while continuing to grow as a fullstack developer." },
];

export function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* City animated background */}
      <div className="absolute inset-0">
        <CityBackground />
      </div>
      <div className="absolute inset-0 bg-background/88" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0077B6] to-[#0096C7] bg-clip-text text-transparent">
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
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0077B6] via-[#0096C7] to-[#00B4D8] blur-xl opacity-30"
              />
              <div className="relative bg-background rounded-full w-64 h-64 mx-auto overflow-hidden border-4 border-primary/20">
                <img
                  src={`${import.meta.env.BASE_URL}projects/profile.jpg`}
                  alt="Carlos David Tabacon"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to initials if image is missing
                    const el = e.currentTarget;
                    el.style.display = "none";
                    el.nextElementSibling?.removeAttribute("style");
                  }}
                />
                <div
                  style={{ display: "none" }}
                  className="w-full h-full bg-gradient-to-br from-[#0077B6] to-[#0096C7] flex items-center justify-center text-white text-6xl font-bold"
                >
                  CD
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-4">
              <p className="text-foreground/90">
                I'm a results-driven IT professional and Full Stack Developer with a
                proven track record across software development, IT support, web development,
                and client-facing roles. I specialize in building scalable systems, REST APIs,
                relational databases, and WordPress platforms.
              </p>
              <p className="text-foreground/90">
                My experience spans desktop, mobile, and web — from building secure case
                management systems to backend APIs for automotive platforms. I thrive in both
                remote and onsite environments and am passionate about delivering reliable,
                secure, and user-centered solutions.
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
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0077B6] via-[#0096C7] to-[#00B4D8] -translate-x-1/2" />
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
