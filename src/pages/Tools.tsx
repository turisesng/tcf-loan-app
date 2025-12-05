import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { ToolCard } from "@/components/tools/ToolCard";
import { sampleTools, categories } from "@/data/tools";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = sampleTools.filter((tool) => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && tool.isActive;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="gradient-warm py-12 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-4">
              Digital Tools Marketplace
            </h1>
            <p className="text-lg text-muted-foreground">
              Simple, affordable tools to help you navigate your TCF loan repayment journey. Each tool is designed to solve a specific problem.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border bg-background sticky top-16 md:top-20 z-40">
        <div className="container py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary md:w-64"
              />
            </div>

            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container">
          {filteredTools.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool, index) => (
                <div
                  key={tool.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No tools found matching your search. Try a different keyword.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Tools;
