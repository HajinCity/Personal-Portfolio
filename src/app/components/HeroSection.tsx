import { motion } from "motion/react";
import { ChevronDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Button } from "./ui/button";

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "#contact", label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, #1a7270 0%, transparent 50%), radial-gradient(circle at 80% 50%, #387999 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, #126f39 0%, transparent 50%), radial-gradient(circle at 20% 50%, #3a9d90 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, #387999 0%, transparent 50%), radial-gradient(circle at 50% 20%, #1a7270 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, #1a7270 0%, transparent 50%), radial-gradient(circle at 80% 50%, #387999 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-30 dark:opacity-20"
        />

        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="block text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#1a7270] via-[#387999] to-[#3a9d90] bg-clip-text text-transparent mb-2">
              Carlos David Tabacon
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl text-muted-foreground">
              Full Stack Developer, Designer & Virtual Assistant
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
          >
            Crafting elegant digital solutions that blend functionality, creativity, and seamless user experience. 
            Passionate about building modern web applications, designing intuitive interfaces and providing reliable virtual assistance that helps businesses grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center mb-16"
          >
            <Button size="lg" className="group">
              View Resume
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Button>
            <Button size="lg" variant="outline" onClick={scrollToContact}>
              Contact Me
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-6 justify-center"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-3 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="size-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="size-8 text-muted-foreground" />
      </motion.div>
    </section>
  );
}
