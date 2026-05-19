import { motion } from "motion/react";
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from "lucide-react";
import { Button } from "./ui/button";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Resume", href: "#resume" },
      { name: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Projects",
    links: [
      { name: "Gallery", href: "#gallery" },
      { name: "Achievements", href: "#achievements" },
      { name: "Certificates", href: "#certificates" },
      { name: "Timeline", href: "#timeline" },
    ],
  },
  {
    title: "Connect",
    links: [
      { name: "Contact", href: "#contact" },
      { name: "GitHub", href: "#" },
      { name: "LinkedIn", href: "#" },
      { name: "Twitter", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Mail, href: "#contact", label: "Email" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-xl mb-4 bg-gradient-to-r from-[#1a7270] to-[#387999] bg-clip-text text-transparent">
              Carlos David Tabacon
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Full Stack Developer & Designer passionate about creating exceptional web experiences and also your Virtual Assistant.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            © {new Date().getFullYear()} John Doe. Made with{" "}
            <Heart className="size-4 text-red-500 fill-red-500 inline animate-pulse" />
          </p>
          <p className="text-sm text-muted-foreground">
            Built with React, Next.js & Tailwind CSS
          </p>
        </div>
      </div>

      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-5" />
      </motion.button>
    </footer>
  );
}
