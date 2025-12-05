import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/consultation", label: "Consultation" },
  { href: "/ebook", label: "eBook" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="font-display text-xl font-bold text-primary-foreground">P</span>
          </div>
          <span className="hidden font-display text-lg font-semibold text-foreground sm:inline-block">
            Paying the Right Way™
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                location.pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button variant="hero" size="sm" asChild>
            <Link to="/tools">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-border md:hidden animate-fade-in">
          <nav className="container flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 text-base font-medium transition-colors rounded-lg",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="hero" className="mt-2" asChild>
              <Link to="/tools" onClick={() => setIsOpen(false)}>
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
