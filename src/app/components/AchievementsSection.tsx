import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Trophy, Award, Target, Star, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Happy Clients", value: 50, suffix: "+" },
  { label: "Awards Won", value: 12, suffix: "" },
  { label: "Years Experience", value: 6, suffix: "+" },
];

const achievements = [
  {
    icon: Trophy,
    title: "Best Developer Award 2023",
    organization: "Tech Excellence Awards",
    description: "Recognized for outstanding contributions to software development and innovation.",
    color: "from-[#1a7270] to-[#3a9d90]",
  },
  {
    icon: Award,
    title: "Hackathon Champion",
    organization: "TechCrunch Disrupt 2022",
    description: "First place winner for developing an AI-powered productivity application.",
    color: "from-[#387999] to-[#5b99b6]",
  },
  {
    icon: Target,
    title: "Open Source Contributor",
    organization: "GitHub",
    description: "500+ contributions to major open-source projects including React and Next.js.",
    color: "from-[#126f39] to-[#5cc37f]",
  },
  {
    icon: Star,
    title: "Tech Speaker",
    organization: "Various Conferences",
    description: "Presented at 15+ tech conferences on modern web development practices.",
    color: "from-[#3a9d90] to-[#98d2af]",
  },
  {
    icon: Users,
    title: "Community Leader",
    organization: "Local Dev Community",
    description: "Founded and manage a 1000+ member developer community.",
    color: "from-[#5b99b6] to-[#92c3df]",
  },
  {
    icon: Zap,
    title: "Innovation Award",
    organization: "Digital Innovation Summit",
    description: "Awarded for implementing cutting-edge solutions in enterprise applications.",
    color: "from-[#37a65f] to-[#5cc37f]",
  },
];

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, duration]);

  return <span>{count}</span>;
}

export function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#1a7270] to-[#387999] bg-clip-text text-transparent">
            Achievements
          </h2>
          <p className="text-muted-foreground text-lg">
            Milestones and recognition throughout my career
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/30">
                <motion.div
                  className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#1a7270] to-[#387999] bg-clip-text text-transparent mb-2"
                  whileInView={{ scale: [1, 1.1, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  <Counter end={stat.value} />
                  {stat.suffix}
                </motion.div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                  whileHover={{ scale: 1.1 }}
                />
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${achievement.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <achievement.icon className="size-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-primary font-medium mb-3">
                    {achievement.organization}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
