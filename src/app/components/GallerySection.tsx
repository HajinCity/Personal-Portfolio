import { motion } from "motion/react";
import { useState } from "react";
import Masonry from "react-responsive-masonry";
import { X, ZoomIn } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const galleryImages = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    width: 600,
    height: 400,
  },
  {
    id: 2,
    title: "Mobile Dashboard",
    category: "UI Design",
    width: 600,
    height: 800,
  },
  {
    id: 3,
    title: "Social Media App",
    category: "Mobile Development",
    width: 600,
    height: 600,
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    category: "Data Visualization",
    width: 600,
    height: 400,
  },
  {
    id: 5,
    title: "Portfolio Website",
    category: "Web Design",
    width: 600,
    height: 700,
  },
  {
    id: 6,
    title: "Task Management",
    category: "Productivity",
    width: 600,
    height: 500,
  },
  {
    id: 7,
    title: "Music Player",
    category: "UI Design",
    width: 600,
    height: 800,
  },
  {
    id: 8,
    title: "Booking System",
    category: "Web Development",
    width: 600,
    height: 450,
  },
];

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0077B6] to-[#0096C7] bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-muted-foreground text-lg">
            A showcase of my projects and creative work
          </p>
        </motion.div>

        <Masonry columnsCount={3} gutter="1.5rem">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
              onClick={() => setSelectedImage(image)}
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted to-muted/50">
                <ImageWithFallback
                  src={`https://picsum.photos/seed/${image.id}/${image.width}/${image.height}`}
                  alt={image.title}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-bold text-lg mb-1">{image.title}</h3>
                    <p className="text-sm text-white/80">{image.category}</p>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                      <ZoomIn className="size-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </Masonry>

        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden">
            {selectedImage && (
              <div className="relative">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                >
                  <X className="size-5" />
                </button>
                <ImageWithFallback
                  src={`https://picsum.photos/seed/${selectedImage.id}/${selectedImage.width}/${selectedImage.height}`}
                  alt={selectedImage.title}
                  className="w-full h-auto"
                />
                <div className="p-6 bg-background">
                  <h3 className="font-bold text-2xl mb-2">{selectedImage.title}</h3>
                  <p className="text-muted-foreground">{selectedImage.category}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
