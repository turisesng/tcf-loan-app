import { Link } from "react-router-dom";
import { ArrowRight, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Tool {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  category: string;
  isActive: boolean;
}

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(tool.price);

  return (
    <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:shadow-card hover:border-primary/30">
      <div className="flex items-start justify-between mb-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
          {tool.code}
        </div>
        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">
          {tool.category}
        </span>
      </div>

      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
        {tool.name}
      </h3>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
        {tool.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold text-primary">{formattedPrice}</span>
        </div>
        <Button variant="soft" size="sm" asChild>
          <Link to={`/tools/${tool.id}`}>
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
