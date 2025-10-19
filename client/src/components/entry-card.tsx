import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type JournalEntry, moodLabels } from "@shared/schema";
import { format } from "date-fns";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface EntryCardProps {
  entry: JournalEntry;
}

const moodDotColors: Record<number, string> = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-lime-500",
  5: "bg-emerald-500",
};

export function EntryCard({ entry }: EntryCardProps) {
  const preview = entry.content.length > 200 
    ? entry.content.substring(0, 200) + "..." 
    : entry.content;

  return (
    <Link href={`/entry/${entry.id}`}>
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="cursor-pointer transition-shadow hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
            <div className="flex items-center gap-3">
              <motion.div 
                className={`w-3 h-3 rounded-full ${moodDotColors[entry.mood]}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <time className="text-sm font-medium text-foreground" data-testid={`text-entry-date-${entry.id}`}>
                {format(new Date(entry.date), "EEEE, MMMM d, yyyy")}
              </time>
            </div>
            <span className="text-xs text-muted-foreground">{moodLabels[entry.mood as keyof typeof moodLabels]}</span>
          </CardHeader>
          <CardContent>
            <p className="text-base leading-relaxed text-foreground line-clamp-3" data-testid={`text-entry-preview-${entry.id}`}>
              {preview}
            </p>
            {entry.tags.length > 0 && (
              <motion.div 
                className="flex gap-2 mt-4 flex-wrap"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
              >
                {entry.tags.map((tag, idx) => (
                  <motion.div
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8 },
                      visible: { opacity: 1, scale: 1 }
                    }}
                  >
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                      data-testid={`badge-tag-${tag}`}
                    >
                      {tag}
                    </Badge>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
