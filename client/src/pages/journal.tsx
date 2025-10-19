import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { type JournalEntry } from "@shared/schema";
import { EntryCard } from "@/components/entry-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, PenLine } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

export default function Journal() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: entries, isLoading } = useQuery<JournalEntry[]>({
    queryKey: ["/api/entries"],
  });

  const filteredEntries = entries?.filter((entry) => {
    const query = searchQuery.toLowerCase();
    return (
      entry.content.toLowerCase().includes(query) ||
      entry.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      {/* Header */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between gap-4 mb-8 flex-wrap"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-light text-foreground mb-2">
                Your Journal
              </h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-muted-foreground"
              >
                {entries?.length || 0} entries
              </motion.p>
            </div>
            <Link href="/new-entry">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="gap-2" data-testid="button-new-entry">
                  <PenLine className="w-4 h-4" />
                  New Entry
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Search */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search entries and tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base"
              data-testid="input-search"
            />
          </motion.div>
        </div>
      </section>

      {/* Entries List */}
      <section className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-48 w-full rounded-2xl" />
              ))}
            </div>
          ) : filteredEntries && filteredEntries.length > 0 ? (
            <AnimatePresence mode="popLayout">
              <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="space-y-4"
              >
                {filteredEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    variants={fadeInUp}
                    custom={index}
                    layout
                  >
                    <EntryCard entry={entry} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : entries && entries.length > 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="py-16 text-center">
                <p className="text-muted-foreground">No entries match your search</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-2 border-dashed">
              <CardContent className="py-16 text-center">
                <p className="text-lg text-muted-foreground mb-6">
                  Your journal is waiting for your first entry
                </p>
                <Link href="/new-entry">
                  <Button size="lg" data-testid="button-first-entry">
                    Write Your First Entry
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
