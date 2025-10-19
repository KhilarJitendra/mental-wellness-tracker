import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { type JournalEntry, moodLabels } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Calendar, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { type: "spring", stiffness: 200, damping: 15 }
};

export default function Analytics() {
  const { data: entries, isLoading } = useQuery<JournalEntry[]>({
    queryKey: ["/api/entries"],
  });

  const { data: suggestions } = useQuery<string[]>({
    queryKey: ["/api/suggestions"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pb-24 md:pb-8">
        <section className="px-4 py-12 md:py-16">
          <div className="max-w-5xl mx-auto space-y-8">
            <Skeleton className="h-20 w-full" />
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32" />
              ))}
            </div>
            <Skeleton className="h-96 w-full" />
          </div>
        </section>
      </div>
    );
  }

  const totalEntries = entries?.length || 0;
  const avgMood = totalEntries > 0
    ? (entries!.reduce((sum, e) => sum + e.mood, 0) / totalEntries).toFixed(1)
    : "0.0";
  const streak = totalEntries;

  // Mood distribution
  const moodCounts = entries?.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<number, number>) || {};

  const mostFrequentMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];

  // Tag analysis
  const tagCounts = entries?.reduce((acc, entry) => {
    entry.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>) || {};

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Mood trend data (last 30 days)
  const moodTrend = entries
    ?.slice(-30)
    .map((entry) => ({
      date: entry.date,
      mood: entry.mood,
    })) || [];

  const maxMood = 5;
  const chartHeight = 200;

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Header */}
      <section className="px-4 py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-2">
            Your Insights
          </h1>
          <p className="text-lg text-muted-foreground">
            Understanding your emotional patterns
          </p>
        </motion.div>
      </section>

      {/* Key Metrics */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid sm:grid-cols-3 gap-6"
          >
            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                    >
                      <Calendar className="w-5 h-5 text-primary" />
                    </motion.div>
                    <CardDescription>Current Streak</CardDescription>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <CardTitle className="text-4xl" data-testid="text-streak">{streak}</CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {streak > 7 ? "Amazing consistency!" : "Keep building your habit"}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div 
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                      className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center"
                    >
                      <TrendingUp className="w-5 h-5 text-secondary" />
                    </motion.div>
                    <CardDescription>Average Mood</CardDescription>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                  >
                    <CardTitle className="text-4xl" data-testid="text-avg-mood">{avgMood}</CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Out of 5</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                      className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"
                    >
                      <Sparkles className="w-5 h-5 text-primary" />
                    </motion.div>
                    <CardDescription>Total Entries</CardDescription>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <CardTitle className="text-4xl" data-testid="text-total-entries">{totalEntries}</CardTitle>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Reflections captured</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mood Trend Chart */}
      {moodTrend.length > 0 && (
        <section className="px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Mood Trend</CardTitle>
                  <CardDescription>Your emotional journey over time</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="relative" style={{ height: chartHeight }}>
                  <svg width="100%" height={chartHeight} className="overflow-visible">
                    {/* Grid lines */}
                    {[1, 2, 3, 4, 5].map((level) => (
                      <g key={level}>
                        <line
                          x1="0"
                          y1={chartHeight - (level / maxMood) * chartHeight}
                          x2="100%"
                          y2={chartHeight - (level / maxMood) * chartHeight}
                          stroke="hsl(var(--border))"
                          strokeWidth="1"
                          strokeDasharray="4"
                        />
                        <text
                          x="-8"
                          y={chartHeight - (level / maxMood) * chartHeight + 4}
                          fontSize="12"
                          fill="hsl(var(--muted-foreground))"
                          textAnchor="end"
                        >
                          {level}
                        </text>
                      </g>
                    ))}

                    {/* Mood line */}
                    {moodTrend.length > 1 && (
                      <polyline
                        points={moodTrend
                          .map((point, i) => {
                            const x = (i / (moodTrend.length - 1)) * 100;
                            const y = chartHeight - (point.mood / maxMood) * chartHeight;
                            return `${x}%,${y}`;
                          })
                          .join(" ")}
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Data points */}
                    {moodTrend.map((point, i) => {
                      const x = (i / Math.max(moodTrend.length - 1, 1)) * 100;
                      const y = chartHeight - (point.mood / maxMood) * chartHeight;
                      return (
                        <circle
                          key={i}
                          cx={`${x}%`}
                          cy={y}
                          r="4"
                          fill="hsl(var(--primary))"
                        />
                      );
                    })}
                  </svg>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Mood Distribution & Tags */}
      <section className="px-4 pb-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Mood Distribution</CardTitle>
              <CardDescription>How you've been feeling</CardDescription>
            </CardHeader>
            <CardContent>
              {Object.entries(moodCounts).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(moodCounts)
                    .sort((a, b) => Number(b[0]) - Number(a[0]))
                    .map(([mood, count]) => {
                      const percentage = ((count / totalEntries) * 100).toFixed(0);
                      return (
                        <div key={mood} className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-foreground">
                              {moodLabels[Number(mood) as keyof typeof moodLabels]}
                            </span>
                            <span className="text-muted-foreground">{count} entries</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No mood data yet
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Tags</CardTitle>
              <CardDescription>Your most common themes</CardDescription>
            </CardHeader>
            <CardContent>
              {topTags.length > 0 ? (
                <div className="space-y-3">
                  {topTags.map(([tag, count]) => (
                    <div key={tag} className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {count} {count === 1 ? "entry" : "entries"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No tags yet
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Suggestions */}
      {suggestions && suggestions.length > 0 && (
        <section className="px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <CardTitle>Personalized Insights</CardTitle>
                </div>
                <CardDescription>Based on your recent entries</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-base leading-relaxed text-foreground">
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}
