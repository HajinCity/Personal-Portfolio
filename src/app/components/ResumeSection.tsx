import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Download, Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    title: "IT Intern (OJT) — Multi-Role",
    company: "ActiVerse Incorporation, Makati",
    period: "2025 – 2026",
    description: "Hybrid setup (3 months WFH + 3 months onsite). Served simultaneously across 5 roles in a fast-paced tech environment.",
    achievements: [
      "WordPress Developer: Built and customized websites for business clients; implemented themes, plugins, and custom layouts",
      "Full Stack Developer: Built and consumed REST APIs using C# (MVC), JavaScript, and ReactJS with SQL integration",
      "Tech Support: Troubleshot hardware, software, and network issues for internal users and clients",
      "Appointment Setter & Sales Rep: Engaged prospects via outbound channels; delivered technical product demos",
    ],
  },
  {
    title: "Backend & Mobile Developer",
    company: "Motodisk.com",
    period: "2025 – 2026",
    description: "Designed and developed backend services and REST APIs for an automotive services platform. Contributed to cross-platform mobile app development.",
    achievements: [
      "Designed scalable REST APIs using C# and OOP principles",
      "Contributed to frontend and backend of the cross-platform mobile application",
      "Implemented optimized data models and database queries for improved performance",
    ],
  },
  {
    title: "System Developer (Freelance)",
    company: "Hestia – VAWC Case Management System",
    period: "2024 – 2025",
    description: "Built a full case filing and management system for VAWC cases covering tracking, reporting, and secure data handling across desktop and mobile platforms.",
    achievements: [
      "Implemented role-based access control and audit trail for sensitive case data",
      "Delivered secure, data-integrity-focused case tracking and reporting features",
      "Supported both desktop and mobile platforms within a single system",
    ],
  },
  {
    title: "Freelance Web Developer",
    company: "Client-Based Projects",
    period: "2024 – 2026",
    description: "Built and customized responsive websites and UI components for business clients including The Studio B and PR Property Platform.",
    achievements: [
      "Implemented live contact form APIs integrated with email delivery services",
      "Delivered pixel-perfect, mobile-responsive landing pages for multiple clients",
    ],
  },
  {
    title: "System Developer (Freelance)",
    company: "3 Degree Coffee Shop POS",
    period: "Aug 2022 – Dec 2022",
    description: "Developed a point-of-sale system for sales and inventory tracking with automated daily reporting.",
    achievements: [
      "Automated daily sales reporting and inventory management",
      "Improved transaction accuracy and streamlined POS operations",
    ],
  },
];

const education = [
  {
    degree: "BS Information Technology",
    institution: "Saint Columban College",
    period: "2022 – 2026",
    gpa: ["Graduate 2026", "500-Hr Internship at ActiVerse Incorporation", "Academic Proficiency Awardee", "Saint Thomas Aquinas Awardee"]
  },
   {
    degree: "BS Marine Transportation",
    institution: "Our Lady of Triumph Institute of Technology",
    period: "2020 – 2021",
    gpa: ["Platoon Leader, 1st Class", "Academic Proficiency Awardee", "Dean's List (2020)"]
  },
];

const skillsProgress = [
  { skill: "C# / .NET", level: 95 },
  { skill: "REST APIs", level: 92 },
  { skill: "WordPress", level: 90 },
  { skill: "SQL / Databases", level: 82 },
  { skill: "HTML / CSS / JS", level: 80 },
  { skill: "ReactJS", level: 75 },
  { skill: "Git / GitHub", level: 80 },
  { skill: "Firebase", level: 75 },
  { skill: "Python", level: 60 },
  { skill: "Prompt Engineering", level: 90 },
  { skill: "Claude", level: 90 },
  { skill: "Cursor", level: 90 },
  { skill: "Codex/Chatgpt", level: 90 },
  { skill: "Lovable", level: 90 },
  { skill: "Base44", level: 90 },
];

export function ResumeSection() {
  return (
    <section id="resume" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0077B6] to-[#0096C7] bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Professional experience and qualifications
          </p>
          <Button size="lg" className="gap-2" asChild>
            <a
              href={`${import.meta.env.BASE_URL}resume/Carlos-Tabacon-Resume.pdf`}
              download="Carlos-Tabacon-Resume.pdf"
            >
              <Download className="size-4" />
              Download Resume
            </a>
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
                      <div className="flex flex-wrap gap-2 mt-3">
                        {(edu.gpa as string[]).map((item) => (
                          <span key={item} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
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
