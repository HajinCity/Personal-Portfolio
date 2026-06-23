import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { ExternalLink, Github, X, Smartphone, Monitor, Globe, Server, Code2 } from "lucide-react";

type ProjectType = "All" | "Web App" | "Mobile App" | "Desktop App" | "Backend" | "Frontend";

const projects = [
  {
    id: 1,
    title: "Hestia — VAWC Case Management System",
    type: "Desktop App" as ProjectType,
    year: "2024–2025",
    description:
      "A secure desktop and mobile case tracking platform built for managing Violence Against Women and Children (VAWC) cases. Features full case filing, status tracking, audit trails, reporting, and role-based access control with a strong emphasis on data security and integrity.",
    tags: ["C#", ".NET", "SQL", "REST APIs", "Desktop", "Mobile"],
    icon: Monitor,
    gradient: "from-[#03045E] via-[#023E8A] to-[#0077B6]",
    image: "/projects/Hestia.png", // e.g. "/projects/hestia.png"
    github: "#",
    live: "",
    featured: true,
  },
  {
    id: 2,
    title: "Motodisk.com — Motor & Automotive Services Platform",
    type: "Backend" as ProjectType,
    year: "2025–2026",
    description:
      "Backend API architecture and mobile application development for an automotive services marketplace. Designed scalable REST APIs using C# with object-oriented principles, optimized database models, and contributed to both frontend and backend of the cross-platform mobile app.",
    tags: ["C#", ".NET", "REST APIs", "SQL", "Mobile", "OOP"],
    icon: Server,
    gradient: "from-[#023E8A] via-[#0077B6] to-[#0096C7]",
    image: "/projects/motodisk.png", // e.g. "/projects/motodisk.png"
    github: "#",
    live: "https://motodisk.com",
    featured: true,
  },
  {
    id: 3,
    title: "Tuluyan — Rental & Boarding Management App",
    type: "Mobile App" as ProjectType,
    year: "2025",
    description:
      "A mobile application for rental and boarding house management. Includes property listing, booking management, user management, and a streamlined tenant-landlord communication workflow.",
    tags: ["Android", "Kotlin", "Firebase", "Mobile"],
    icon: Smartphone,
    gradient: "from-[#0077B6] via-[#0096C7] to-[#00B4D8]",
    image: "/projects/tuluyan.png", // e.g. "/projects/tuluyan.png"
    github: "https://github.com/HajinCity/TuluyanApp2",
    live: "", // local-only deployment — code link only
    featured: false,
  },
  {
    id: 4,
    title: "Accounts Payable Management System",
    type: "Desktop App" as ProjectType,
    year: "2025–2026",
    description:
      "An end-to-end system automating invoice processing and financial workflows. Features database-driven data handling, accurate audit trail management, automated reporting, and significant reduction in manual processing errors.",
    tags: ["C#", ".NET", "SQL", "REST APIs", "Desktop", "OOP"],
    icon: Monitor,
    gradient: "from-[#0096C7] via-[#00B4D8] to-[#48CAE4]",
    image: "/projects/aps.png", // e.g. "/projects/APS.jpg"
    github: "https://github.com/HajinCity/WindowsFormsApp1",
    live: "", // local-only deployment — code link only
    featured: false,
  },
  {
    id: 5,
    title: "3 Degree Coffee Shop POS",
    type: "Desktop App" as ProjectType,
    year: "2022",
    description:
      "A point-of-sale system for sales and inventory tracking. Automates daily sales reporting, streamlines transaction recording, and provides real-time inventory visibility for the business owner.",
    tags: ["C#", "SQL", "POS", "Desktop"],
    icon: Monitor,
    gradient: "from-[#00B4D8] via-[#48CAE4] to-[#90E0EF]",
    image: "", // e.g. "/projects/3degree.png"
    github: "#",
    live: "", // local-only deployment — code link only
    featured: false,
  },

  {
    id: 6,
    title: "Nexus 2026 — Frontend Template",
    type: "Frontend Website for Back Officegt" as ProjectType,
    year: "2026",
    description:
      "A modern frontend template project built with React and TypeScript. Demonstrates component architecture, responsive design patterns, and modern UI/UX principles using contemporary web development tooling.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    icon: Code2,
    gradient: "from-[#0077B6] via-[#00B4D8] to-[#48CAE4]",
    image: "/projects/nexus.png",
    github: "https://github.com/HajinCity/Nexus-Private-Org",
    live: "", // local-only deployment — code link only
    featured: false,
  },
  {
    id: 7,
    title: "VAWC Case Management Mobile App",
    type: "Mobile App" as ProjectType,
    year: "2024–2025",
    description:
      "A secure mobile case and complaint tracking platform built for managing Violence Against Women and Children (VAWC) cases. Features full case filing, status tracking, audit trails, reporting, and role-based access control with a strong emphasis on data security and integrity.",
    tags: ["KOTLIN", "Firebase", "REST APIs", "Mobile"],
    icon: Monitor,
    gradient: "from-[#03045E] via-[#023E8A] to-[#0077B6]",
    image: "/projects/HestiaMobile.png", // e.g. "/projects/hestia.png"
    github: "https://github.com/HajinCity/VawcSanPedro2",
    live: "https://www.mediafire.com/file/ske7rxqkjamkggd/VAWC-SanPedroIX.apk/file",
    featured: true,
  },
  {
    id: 8,
    title: "Garahe.ph — Vehicle Maintenance & Service Tracker",
    type: "Web App" as ProjectType,
    year: "2025–2026",
    description:
      "A CRM and service tracking platform for automotive repair shops. Provides customer management, service scheduling, maintenance history tracking, and automated reminders to enhance customer retention and streamline shop operations. Built with a focus on data security and user-friendly design.",
    tags: ["C#", ".NET", "REST APIs", "SQL", "Mobile", "OOP"],
    icon: Monitor,
    gradient: "from-[#03045E] via-[#023E8A] to-[#0077B6]",
    image: "/projects/Garahe.png", // e.g. "/projects/garahe.png"
    github: "#",
    live: "https://garahe.ph/",
    featured: true,
  },
  {
    id: 9,
    title: "Meridian Harbour - Condominium Showcase Mockup",
    type: "Frontend" as ProjectType,
    year: "2025–2026",
    description:
      "A modern web application for showcasing condominium properties. Features responsive design, interactive elements, and a user-friendly interface to provide potential buyers with an immersive experience.",
    tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    icon: Monitor,
    gradient: "from-[#03045E] via-[#023E8A] to-[#0077B6]",
    image: "/projects/Meridian.png", // e.g. "/projects/meridian.png"
    github: "#",
    live: "", // local-only deployment
    featured: true,
  },
];

const filters: ProjectType[] = ["All", "Web App", "Mobile App", "Desktop App", "Backend", "Frontend"];

const base = import.meta.env.BASE_URL;

// A link counts as "real" if it's set and isn't just a "#" placeholder
const hasLink = (url?: string) => Boolean(url && url !== "#");

export function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<ProjectType>("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered =
    selectedFilter === "All"
      ? projects
      : projects.filter((p) => p.type === selectedFilter);

  return (
    <section id="projects" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0077B6] to-[#00B4D8] bg-clip-text text-transparent">
            Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-world systems and applications built across desktop, mobile, and web platforms
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter)}
              className="rounded-full"
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <Card
                className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1 border-2 hover:border-primary/50"
                onClick={() => setSelectedProject(project)}
              >
                {/* Icon row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${project.gradient} group-hover:scale-110 transition-transform`}>
                    <project.icon className="size-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {project.year}
                  </Badge>
                </div>

                {/* Image / gradient preview */}
                <div className={`relative mb-4 rounded-lg overflow-hidden aspect-[16/10] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  {project.image ? (
                    <img
                      src={`${base}${project.image.replace(/^\//, '')}`}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <project.icon className="size-16 text-white/30" />
                  )}
                  {project.featured && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 text-xs font-semibold">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-primary font-medium mb-1">
                  {project.type}
                </p>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {project.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {project.tags.length} technologies used
                  </span>
                  <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detail Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl">
            {selectedProject && (
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="size-5" />
                </button>

                {/* Image / gradient header */}
                <div className={`relative rounded-xl overflow-hidden bg-gradient-to-br ${selectedProject.gradient} aspect-[16/10] flex items-center justify-center`}>
                  {selectedProject.image ? (
                    <img
                      src={`${base}${selectedProject.image.replace(/^\//, '')}`}
                      alt={selectedProject.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <selectedProject.icon className="size-24 text-white/30" />
                  )}
                  {selectedProject.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border-0 font-semibold">
                        Featured
                      </Badge>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${selectedProject.gradient}`}>
                      <selectedProject.icon className="size-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                      <p className="text-lg text-primary font-medium">{selectedProject.type}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Year</p>
                      <p className="font-medium">{selectedProject.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-medium">{selectedProject.type}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Description</p>
                      <p className="text-sm leading-relaxed">{selectedProject.description}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-3">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {hasLink(selectedProject.live) && (
                      <Button className="flex-1 gap-2" asChild>
                        <a href={selectedProject.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-4" />
                          View Live
                        </a>
                      </Button>
                    )}
                    {hasLink(selectedProject.github) ? (
                      <Button
                        variant={hasLink(selectedProject.live) ? "outline" : "default"}
                        className="flex-1 gap-2"
                        asChild
                      >
                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                          <Github className="size-4" />
                          View Code
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1 gap-2" disabled>
                        <Github className="size-4" />
                        Code Private
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
