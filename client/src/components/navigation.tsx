import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { Link, useLocation } from "wouter";
import { BookOpen, LayoutDashboard, TrendingUp, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/">
              <h1 className="text-xl font-medium text-foreground hover:text-primary transition-colors cursor-pointer">
                MindfulPages
              </h1>
            </Link>
            <div className="flex gap-2">
              <Link href="/dashboard">
                <Button
                  variant={isActive("/dashboard") ? "secondary" : "ghost"}
                  className="gap-2"
                  data-testid="link-dashboard"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/journal">
                <Button
                  variant={isActive("/journal") ? "secondary" : "ghost"}
                  className="gap-2"
                  data-testid="link-journal"
                >
                  <BookOpen className="w-4 h-4" />
                  Journal
                </Button>
              </Link>
              <Link href="/analytics">
                <Button
                  variant={isActive("/analytics") ? "secondary" : "ghost"}
                  className="gap-2"
                  data-testid="link-analytics"
                >
                  <TrendingUp className="w-4 h-4" />
                  Insights
                </Button>
              </Link>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t">
        <div className="flex items-center justify-around h-16 px-2">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "flex flex-col gap-1 h-auto py-2",
                isActive("/") && !isActive("/dashboard") && !isActive("/journal") && !isActive("/analytics") && "text-primary"
              )}
              data-testid="link-home-mobile"
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Home</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "flex flex-col gap-1 h-auto py-2",
                isActive("/dashboard") && "text-primary"
              )}
              data-testid="link-dashboard-mobile"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className="text-xs">Dashboard</span>
            </Button>
          </Link>
          <Link href="/journal">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "flex flex-col gap-1 h-auto py-2",
                isActive("/journal") && "text-primary"
              )}
              data-testid="link-journal-mobile"
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-xs">Journal</span>
            </Button>
          </Link>
          <Link href="/analytics">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "flex flex-col gap-1 h-auto py-2",
                isActive("/analytics") && "text-primary"
              )}
              data-testid="link-analytics-mobile"
            >
              <TrendingUp className="w-5 h-5" />
              <span className="text-xs">Insights</span>
            </Button>
          </Link>
        </div>
      </nav>
    </>
  );
}
