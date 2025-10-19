import { Button } from "@/components/ui/button";
import { moodLabels, type MoodValue } from "@shared/schema";
import { cn } from "@/lib/utils";

interface MoodSelectorProps {
  value: MoodValue;
  onChange: (mood: MoodValue) => void;
  size?: "sm" | "default" | "lg";
}

const moodColors: Record<MoodValue, string> = {
  1: "bg-red-100 dark:bg-red-950 border-red-300 dark:border-red-800 text-red-700 dark:text-red-300",
  2: "bg-orange-100 dark:bg-orange-950 border-orange-300 dark:border-orange-800 text-orange-700 dark:text-orange-300",
  3: "bg-yellow-100 dark:bg-yellow-950 border-yellow-300 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300",
  4: "bg-lime-100 dark:bg-lime-950 border-lime-300 dark:border-lime-800 text-lime-700 dark:text-lime-300",
  5: "bg-emerald-100 dark:bg-emerald-950 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300",
};

export function MoodSelector({ value, onChange, size = "default" }: MoodSelectorProps) {
  const moods = [1, 2, 3, 4, 5] as MoodValue[];

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-foreground">How are you feeling today?</label>
      <div className="flex gap-2 flex-wrap">
        {moods.map((mood) => (
          <Button
            key={mood}
            type="button"
            variant="outline"
            size={size}
            onClick={() => onChange(mood)}
            className={cn(
              "transition-all border-2",
              value === mood
                ? moodColors[mood]
                : "bg-background hover:bg-accent text-muted-foreground"
            )}
            data-testid={`button-mood-${mood}`}
          >
            {moodLabels[mood]}
          </Button>
        ))}
      </div>
    </div>
  );
}
