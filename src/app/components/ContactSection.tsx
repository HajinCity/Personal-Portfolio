import { motion } from "motion/react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Mail, MapPin, Phone, Send, Github, Linkedin } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "carlosdavidtabacon@gmail.com",
    href: "mailto:carlosdavidtabacon@gmail.com",
  },
  {
    icon: Phone,
    label: "Whatsapp",
    value: "+63 965 325 7555",
    href: "tel:+639653257555",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Philippines",
    href: "#",
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/HajinCity", label: "GitHub", username: "@HajinCity" },
  { icon: Linkedin, href: "https://ph.linkedin.com/in/carlosadavidtabacon", label: "LinkedIn", username: "/in/carlosadavidtabacon" },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const WEB3FORMS_KEY = "18afb78b-e31b-45c7-bd9a-b93575e05c05";

  // Honeypot: invisible to real visitors, but bots that auto-fill every field
  // will fill this in too — Web3Forms silently drops the submission when it's set.
  const honeypotRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Bot caught by the honeypot — silently drop, no toast, don't tip them off.
    if (honeypotRef.current?.checked) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          botcheck: "",
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent! I'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0077B6] to-[#0096C7] bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Let's work together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <info.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
              <div className="space-y-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <social.icon className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium">{social.label}</p>
                      <p className="text-sm text-muted-foreground">{social.username}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <h4 className="font-bold mb-2">Available for Freelance</h4>
              <p className="text-sm text-muted-foreground">
                I'm currently available for freelance projects and collaborations.
                Feel free to reach out if you have an exciting opportunity!
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot — hidden from real users, traps bots that auto-fill every field */}
                <input
                  type="checkbox"
                  name="botcheck"
                  ref={honeypotRef}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Send className="size-4" />
                    </motion.div>
                  ) : (
                    <>
                      Send Message
                      <Send className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
