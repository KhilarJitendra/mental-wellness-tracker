import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PenLine, TrendingUp } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { type JournalEntry } from "@shared/schema";
import { EntryCard } from "@/components/entry-card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Dashboard() {
  const { data: entries, isLoading } = useQuery<JournalEntry[]>({
    queryKey: ["/api/entries"],
  });

  const streak = entries?.length || 0;
  const avgMood = entries?.length 
    ? (entries.reduce((sum, e) => sum + e.mood, 0) / entries.length).toFixed(1)
    : "0.0";

  const recentEntries = entries?.slice(0, 3) || [];

  const todayDate = format(new Date(), "yyyy-MM-dd");
  const hasTodayEntry = entries?.some(e => e.date === todayDate);

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Welcome Section */}
      <section className="px-4 py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Welcome back
          </h1>
          <p className="text-lg text-muted-foreground">
            {hasTodayEntry 
              ? "You've already journaled today. Great work!" 
              : "Take a moment to reflect on your day"}
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid sm:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardDescription>Current Streak</CardDescription>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <CardTitle className="text-4xl" data-testid="text-streak">{streak}</CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Keep it going!</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardDescription>Total Entries</CardDescription>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    <CardTitle className="text-4xl" data-testid="text-total-entries">{entries?.length || 0}</CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Reflections captured</p>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <CardDescription>Average Mood</CardDescription>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <CardTitle className="text-4xl" data-testid="text-avg-mood">{avgMood}</CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Out of 5</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Link href="/new-entry">
            <Card className="hover-elevate active-elevate-2 cursor-pointer border-2 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <PenLine className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle>New Entry</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {hasTodayEntry 
                    ? "Add another reflection for today" 
                    : "Start writing today's journal entry"}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/analytics">
            <Card className="hover-elevate active-elevate-2 cursor-pointer border-2 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle>View Insights</CardTitle>
                </div>
                <CardDescription className="text-base">
                  Explore your mood patterns and trends
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </section>

      {/* Recent Entries */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mb-6"
          >
            <h2 className="text-2xl font-medium text-foreground">Recent Entries</h2>
            <Link href="/journal">
              <Button variant="ghost" data-testid="button-view-all">
                View All
              </Button>
            </Link>
          </motion.div>
          
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-40 w-full rounded-2xl" />
              ))}
            </div>
          ) : recentEntries.length > 0 ? (
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="space-y-4"
            >
              {recentEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  variants={fadeInUp}
                  custom={index}
                >
                  <EntryCard entry={entry} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <Card className="border-2 border-dashed">
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground mb-4">You haven't written any entries yet</p>
                <Link href="/new-entry">
                  <Button data-testid="button-first-entry">Write Your First Entry</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
