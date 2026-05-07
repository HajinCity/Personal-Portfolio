import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

const timelineEvents = [
  {
    year: "2024",
    type: "career",
    title: "Promoted to Senior Developer",
    organization: "Tech Innovations Inc.",
    description: "Leading development teams and architecting enterprise solutions.",
    tags: ["Leadership", "Architecture"],
  },
  {
    year: "2023",
    type: "achievement",
    title: "AWS Solutions Architect Certification",
    organization: "Amazon Web Services",
    description: "Achieved professional certification in cloud architecture and solutions design.",
    tags: ["Cloud", "Certification"],
  },
  {
    year: "2022",
    type: "career",
    title: "Full Stack Developer",
    organization: "Digital Solutions Co.",
    description: "Delivered multiple high-impact projects using modern web technologies.",
    tags: ["React", "Node.js"],
  },
  {
    year: "2021",
    type: "achievement",
    title: "Hackathon Winner",
    organization: "TechCrunch Disrupt",
    description: "Won first place for building an innovative AI-powered application.",
    tags: ["AI", "Innovation"],
  },
  {
    year: "2020",
    type: "career",
    title: "Started Developer Journey",
    organization: "Startup Ventures",
    description: "First professional role as a frontend developer.",
    tags: ["Frontend", "Career Start"],
  },
  {
    year: "2018",
    type: "education",
    title: "Master's Degree Completed",
    organization: "Tech University",
    description: "Graduated with honors in Computer Science.",
    tags: ["Education", "CS"],
  },
  {
    year: "2016",
    type: "education",
    title: "Bachelor's Degree",
    organization: "State University",
    description: "Completed Software Engineering degree with distinction.",
    tags: ["Education", "Software"],
  },
];

const typeColors = {
  career: "from-[#1a7270] to-[#3a9d90]",
  achievement: "from-[#387999] to-[#5b99b6]",
  education: "from-[#126f39] to-[#5cc37f]",
};

export function TimelineSection() {
  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1a7270] to-[#387999] bg-clip-text text-transparent">
            Timeline
          </h2>
          <p className="text-muted-foreground text-lg">
            My professional and educational journey
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#1a7270] via-[#387999] to-[#3a9d90] md:-translate-x-1/2" />

          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={`${event.year}-${event.title}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`} />

                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${typeColors[event.type as keyof typeof typeColors]} border-4 border-background shadow-lg`}
                  />
                </div>

                <div className="flex-1 ml-20 md:ml-0">
                  <Card className="p-6 hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${typeColors[event.type as keyof typeof typeColors]} text-white`}>
                        {event.year}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {event.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-primary font-medium mb-3">{event.organization}</p>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
