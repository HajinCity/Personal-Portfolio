import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent } from "./ui/dialog";
import { Award, ExternalLink, X } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// ── Add your certificates here ────────────────────────────────────────────────
// image: put the file in public/projects/ and set the path, e.g. "/projects/cert-aws.png"
//        leave image as "" to show a placeholder instead
const certificates = [
  {
    id: 1,
    title: "Philnits ITPEC Level 1 Certified",
    issuer: "Philnits",
    date: "2025",
    category: "Cloud Computing",
    credentialId: "AWS-SAP-2024-001",
    image: "", // e.g. "/projects/cert-aws.png"
    verifyUrl: "#",
    skills: ["AWS", "Cloud Architecture", "DevOps"],
  },
  {
    id: 2,
    title: "Figma for User Interface and User Experience Design",
    issuer: "Udemy - Sayaman Create Institute",
    date: "2025",
    category: "UI/UX Design",
    credentialId: "UC-7cffa9dd",
    image: "/projects/Figma.jpg",
    verifyUrl: "#",
    skills: ["Figma", "UI Design", "UX Design"],
  },
  {
    id: 3,
    title: "Cybersecurity 101: Foundation for Absolute Beginners",
    issuer: "Udemy - School of AI",
    date: "2025",
    category: "Cybersecurity",
    credentialId: "UC-d557f526",
    image: "/projects/Cybersecurity.jpg",
    verifyUrl: "#",
    skills: ["Cybersecurity", "Network Security", "Ethical Hacking"],
  },
  {
    id: 4,
    title: "Advance Certified in Program and Project Management (ACPPM)",
    issuer: "Udemy - MTF Institute of Management, Technology and Finance",
    date: "2025",
    category: "Project Management",
    credentialId: "UC-2b64be64",
    image: "/projects/AdvancePJM.jpg",
    verifyUrl: "#",
    skills: ["Project Management", "Program Management", "Leadership"],
  },
  {
    id: 5,
    title: "C# For Beginners",
    issuer: "Udemy - Frank Anemaet",
    date: "2023",
    category: "Programming",
    credentialId: "UC-62aba739",
    image: "/projects/CSharp.jpg",
    verifyUrl: "#",
    skills: ["C#", "Object-Oriented Programming", "Software Development"],
  },
  {
    id: 6,
    title: "HTML, CSS, Javascript, React - Online Certification Course",
    issuer: "Udemy - YouAccel Training, Blue Digital Media",
    date: "2025",
    category: "Web Development",
    credentialId: "UC-17deb45d",
    image: "/projects/HTMLCSSJS.jpg",
    verifyUrl: "#",
    skills: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    id: 7,
    title: "Network Defense Fundamentals: Training For IT Beginners",
    issuer: "Udemy - Meta Brains",
    date: "2025",
    category: "Network Security",
    credentialId: "UC-a3c62486",
    image: "/projects/Networking.jpg",
    verifyUrl: "#",
    skills: ["Network Security", "Cybersecurity", "IT Fundamentals"],
  },
  {
    id: 8,
    title: "Professiional Diploma in Agile and Project Management",
    issuer: "Udemy - MTF Institute of Management, Technology and Finance",
    date: "2025",
    category: "Project Management",
    credentialId: "UC-3fed2e11",
    image: "/projects/PJM.jpg",
    verifyUrl: "#",
    skills: ["Project Management", "Agile", "Leadership"],
  },
  {
    id: 9,
    title: "Complete SQL & Relational Database Management System (RDBMS) Course",
    issuer: "Udemy - Atul Kadlag",
    date: "2025",
    category: "Database Management",
    credentialId: "UC-2e176520",
    image: "/projects/SQL.jpg",
    verifyUrl: "#",
    skills: ["Database Management", "SQL", "Data Analysis"],
  },
];

const base = import.meta.env.BASE_URL;
function certImg(image: string, fallbackId: number, size: string) {
  return image
    ? `${base}${image.replace(/^\//, "")}`
    : `https://picsum.photos/seed/cert-${fallbackId}/${size}`;
}

const categories = ["All", ...Array.from(new Set(certificates.map(c => c.category)))];

export function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);

  const filteredCertificates = selectedCategory === "All"
    ? certificates
    : certificates.filter(cert => cert.category === selectedCategory);

  return (
    <section id="certificates" className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0077B6] to-[#0096C7] bg-clip-text text-transparent">
            Certificates & Credentials
          </h2>
          <p className="text-muted-foreground text-lg">
            Professional certifications and achievements
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <Card
                className="p-6 h-full hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1 border-2 hover:border-primary/50"
                onClick={() => setSelectedCertificate(cert)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#0077B6] to-[#00B4D8] group-hover:scale-110 transition-transform">
                    <Award className="size-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {cert.date}
                  </Badge>
                </div>

                <div className="relative mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-muted to-muted/50 aspect-[16/10] flex items-center justify-center">
                  <ImageWithFallback
                    src={certImg(cert.image, cert.id, "400/250")}
                    alt={cert.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-primary font-medium mb-1">
                  {cert.issuer}
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  {cert.category}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    ID: {cert.credentialId}
                  </span>
                  <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={!!selectedCertificate} onOpenChange={() => setSelectedCertificate(null)}>
          <DialogContent className="max-w-3xl">
            {selectedCertificate && (
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="size-5" />
                </button>

                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50 aspect-[16/10]">
                  <ImageWithFallback
                    src={certImg(selectedCertificate.image, selectedCertificate.id, "800/500")}
                    alt={selectedCertificate.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-[#0077B6] to-[#00B4D8]">
                      <Award className="size-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{selectedCertificate.title}</h3>
                      <p className="text-lg text-primary font-medium">{selectedCertificate.issuer}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Issue Date</p>
                      <p className="font-medium">{selectedCertificate.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Category</p>
                      <p className="font-medium">{selectedCertificate.category}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Credential ID</p>
                      <p className="font-mono text-sm">{selectedCertificate.credentialId}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-3">Skills Demonstrated</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedCertificate.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full mt-6 gap-2">
                    <ExternalLink className="size-4" />
                    Verify Credential
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
