import { motion } from "motion/react";
import { useState } from "react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowLeft, Calendar, Clock, Search, Tag } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const blogPosts = [
  {
    id: 1,
    title: "Building Scalable React Applications with Next.js 14",
    excerpt: "Learn how to leverage the latest features of Next.js 14 to build performant and scalable web applications.",
    content: `
# Building Scalable React Applications with Next.js 14

Next.js 14 introduces powerful new features that make building scalable applications easier than ever. In this comprehensive guide, we'll explore the App Router, Server Components, and streaming capabilities.

## Key Features

The App Router provides a new way to structure your application with improved performance and developer experience. Server Components allow you to render parts of your UI on the server, reducing client-side JavaScript.

## Performance Optimization

With streaming, you can progressively render UI, improving perceived performance. Combined with React Suspense, this creates exceptional user experiences.

## Best Practices

1. Use Server Components by default
2. Implement proper data fetching strategies
3. Optimize images with next/image
4. Leverage automatic code splitting

This is just the beginning of what's possible with Next.js 14.
    `,
    category: "Web Development",
    tags: ["React", "Next.js", "Performance"],
    date: "2024-03-15",
    readTime: "8 min read",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    excerpt: "Dive deep into TypeScript's advanced features and learn patterns that will make your code more maintainable.",
    content: `
# Mastering TypeScript: Advanced Patterns

TypeScript has become essential for modern web development. Let's explore advanced patterns that will elevate your code quality.

## Generic Constraints

Use generic constraints to create flexible yet type-safe functions and components.

## Utility Types

TypeScript's built-in utility types like Partial, Pick, and Omit are powerful tools for type manipulation.

## Conclusion

These patterns will help you write more maintainable and robust code.
    `,
    category: "Programming",
    tags: ["TypeScript", "Best Practices", "Code Quality"],
    date: "2024-03-10",
    readTime: "6 min read",
    author: "John Doe",
  },
  {
    id: 3,
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt: "Explore the emerging trends and technologies shaping the future of web development.",
    content: `
# The Future of Web Development

The web development landscape is constantly evolving. Here are the trends defining 2024.

## AI-Powered Development

AI tools are transforming how we write code and build applications.

## Edge Computing

Moving computation closer to users for better performance.

## WebAssembly Growth

WASM is enabling new possibilities for web applications.

Stay ahead by embracing these trends.
    `,
    category: "Industry Insights",
    tags: ["Trends", "Future", "Web Development"],
    date: "2024-03-01",
    readTime: "5 min read",
    author: "John Doe",
  },
  {
    id: 4,
    title: "CSS Grid vs Flexbox: When to Use Which",
    excerpt: "A practical guide to choosing between CSS Grid and Flexbox for your layouts.",
    content: `
# CSS Grid vs Flexbox

Both are powerful layout tools, but knowing when to use each is crucial.

## Use Flexbox When

- Building one-dimensional layouts
- Distributing space among items
- Aligning items in a container

## Use Grid When

- Creating two-dimensional layouts
- Precise positioning is needed
- Building complex page layouts

## Combining Both

Often the best solution uses both together.
    `,
    category: "CSS & Design",
    tags: ["CSS", "Layout", "Design"],
    date: "2024-02-20",
    readTime: "7 min read",
    author: "John Doe",
  },
  {
    id: 5,
    title: "Optimizing React Performance: A Complete Guide",
    excerpt: "Comprehensive strategies for improving React application performance and user experience.",
    content: `
# Optimizing React Performance

Performance is critical for user experience. Here's how to optimize your React apps.

## Memoization

Use React.memo, useMemo, and useCallback strategically.

## Code Splitting

Implement dynamic imports to reduce initial bundle size.

## Virtual Lists

Handle large lists efficiently with windowing.

Apply these techniques for faster apps.
    `,
    category: "Web Development",
    tags: ["React", "Performance", "Optimization"],
    date: "2024-02-10",
    readTime: "10 min read",
    author: "John Doe",
  },
  {
    id: 6,
    title: "Modern Authentication Strategies for Web Applications",
    excerpt: "Understanding different authentication approaches and implementing secure user authentication.",
    content: `
# Modern Authentication Strategies

Security is paramount in modern applications. Let's explore authentication best practices.

## JWT vs Sessions

Understanding the tradeoffs between token-based and session-based auth.

## OAuth 2.0

Implementing third-party authentication securely.

## Best Practices

- Always use HTTPS
- Implement refresh tokens
- Store tokens securely

Secure your applications properly.
    `,
    category: "Security",
    tags: ["Authentication", "Security", "Best Practices"],
    date: "2024-01-25",
    readTime: "9 min read",
    author: "John Doe",
  },
];

const allCategories = ["All", ...Array.from(new Set(blogPosts.map(p => p.category)))];

export function BlogSection() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (selectedPost) {
    return (
      <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setSelectedPost(null)}
            className="mb-8 gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-background rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="relative h-96 bg-gradient-to-br from-muted to-muted/50">
              <ImageWithFallback
                src={`https://picsum.photos/seed/blog-${selectedPost.id}/1200/600`}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPost.tags.map(tag => (
                    <Badge key={tag} className="bg-white/20 backdrop-blur-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-4xl font-bold mb-4">{selectedPost.title}</h1>
                <div className="flex items-center gap-6 text-sm text-white/90">
                  <span className="flex items-center gap-2">
                    <Calendar className="size-4" />
                    {new Date(selectedPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="size-4" />
                    {selectedPost.readTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground/90 prose-strong:text-foreground prose-code:text-primary prose-pre:bg-muted">
                {selectedPost.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold mt-8 mb-4">{paragraph.slice(2)}</h1>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold mt-6 mb-3">{paragraph.slice(3)}</h2>;
                  } else if (paragraph.trim().match(/^\d+\./)) {
                    return <li key={index} className="ml-6">{paragraph.trim()}</li>;
                  } else if (paragraph.startsWith('- ')) {
                    return <li key={index} className="ml-6">{paragraph.slice(2)}</li>;
                  } else if (paragraph.trim()) {
                    return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
                  }
                  return null;
                })}
              </div>
            </div>
          </motion.article>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#0077B6] to-[#0096C7] bg-clip-text text-transparent">
            Blog
          </h2>
          <p className="text-muted-foreground text-lg">
            Thoughts, tutorials, and insights on web development
          </p>
        </motion.div>

        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <Card
                className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                onClick={() => setSelectedPost(post)}
              >
                <div className="relative h-48 bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                  <ImageWithFallback
                    src={`https://picsum.photos/seed/blog-${post.id}/400/300`}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm">
                    {post.category}
                  </Badge>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="size-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="size-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Read More →
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
