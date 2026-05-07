import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Download, Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    title: "Senior Full Stack Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: "Leading development of enterprise-scale applications, mentoring junior developers, and architecting scalable solutions.",
    achievements: [
      "Improved application performance by 40%",
      "Led team of 5 developers",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    description: "Developed and maintained multiple client projects using React, Node.js, and cloud technologies.",
    achievements: [
      "Delivered 15+ successful projects",
      "Reduced bug reports by 35%",
      "Implemented automated testing suite",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Startup Ventures",
    period: "2018 - 2020",
    description: "Built responsive web applications and collaborated with design team to create pixel-perfect UIs.",
    achievements: [
      "Increased user engagement by 50%",
      "Built reusable component library",
      "Optimized load times by 45%",
    ],
  },
];

const education = [
  {
    degree: "Master of Computer Science",
    institution: "Tech University",
    period: "2016 - 2018",
    gpa: "3.9/4.0",
  },
  {
    degree: "Bachelor of Software Engineering",
    institution: "State University",
    period: "2012 - 2016",
    gpa: "3.7/4.0",
  },
];

const skillsProgress = [
  { skill: "React / Next.js", level: 95 },
  { skill: "TypeScript / JavaScript", level: 90 },
  { skill: "Node.js / Express", level: 85 },
  { skill: "Python / Django", level: 80 },
  { skill: "UI/UX Design", level: 75 },
  { skill: "DevOps / Cloud", level: 70 },
];

export function ResumeSection() {
  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1a7270] to-[#387999] bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Professional experience and qualifications
          </p>
          <Button size="lg" className="gap-2">
            <Download className="size-4" />
            Download Resume
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="size-6 text-primary" />
                <h3 className="text-2xl font-bold">Work Experience</h3>
              </div>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                      <div className="flex flex-wrap justify-between items-start mb-3">
                        <div>
                          <h4 className="font-bold text-lg">{exp.title}</h4>
                          <p className="text-primary">{exp.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement) => (
                          <li key={achievement} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">✓</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="size-6 text-primary" />
                <h3 className="text-2xl font-bold">Education</h3>
              </div>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-wrap justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold">{edu.degree}</h4>
                          <p className="text-primary">{edu.institution}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{edu.period}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Technical Skills</h3>
            <Card className="p-6">
              <div className="space-y-6">
                {skillsProgress.map((item, index) => (
                  <motion.div
                    key={item.skill}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{item.skill}</span>
                        <span className="text-muted-foreground">{item.level}%</span>
                      </div>
                      <Progress value={item.level} className="h-2" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
