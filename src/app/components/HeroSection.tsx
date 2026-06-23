import { motion } from "motion/react";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { ShaderBackground } from "./ShaderBackground";

export function HeroSection() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToResume = () => {
    document.getElementById("resume")?.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/HajinCity", label: "GitHub" },
    { icon: Linkedin, href: "https://ph.linkedin.com/in/carlosadavidtabacon", label: "LinkedIn" },
    { icon: Mail, href: "#contact", label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Shader layer — sits behind all content via DOM order */}
      <div className="absolute inset-0">
        <ShaderBackground />
      </div>

      {/* Content layer — z-10 keeps it above the shader */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            <span className="block text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-[#48CAE4] via-[#90E0EF] to-[#CAF0F8] bg-clip-text text-transparent mb-2 drop-shadow-lg">
              Carlos David Tabacon
            </span>
            <span className="block text-2xl md:text-3xl lg:text-4xl text-white/80 drop-shadow">
              Full Stack Developer, Designer & Virtual Assistant
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 drop-shadow"
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
            <Button size="lg" className="group" onClick={scrollToResume}>
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
                className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/25 text-white transition-colors border border-white/20"
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
        <ChevronDown className="size-8 text-white/60" />
      </motion.div>
    </section>
  );
}
