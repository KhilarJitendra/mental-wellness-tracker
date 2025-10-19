import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertJournalEntrySchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all journal entries
  app.get("/api/entries", async (_req, res) => {
    try {
      const entries = await storage.getEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch entries" });
    }
  });

  // Get a single journal entry
  app.get("/api/entries/:id", async (req, res) => {
    try {
      const entry = await storage.getEntry(req.params.id);
      if (!entry) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch entry" });
    }
  });

  // Create a new journal entry
  app.post("/api/entries", async (req, res) => {
    try {
      const validatedData = insertJournalEntrySchema.parse(req.body);
      const entry = await storage.createEntry(validatedData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to create entry" });
      }
    }
  });

  // Update a journal entry
  app.patch("/api/entries/:id", async (req, res) => {
    try {
      const validatedData = insertJournalEntrySchema.partial().parse(req.body);
      const entry = await storage.updateEntry(req.params.id, validatedData);
      if (!entry) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.json(entry);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to update entry" });
      }
    }
  });

  // Delete a journal entry
  app.delete("/api/entries/:id", async (req, res) => {
    try {
      const success = await storage.deleteEntry(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Entry not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete entry" });
    }
  });

  // Get AI-powered suggestions based on journal entries
  app.get("/api/suggestions", async (_req, res) => {
    try {
      const entries = await storage.getEntries();
      
      if (entries.length === 0) {
        return res.json([
          "Start by writing your first journal entry to receive personalized insights.",
          "Reflect on what you're grateful for today.",
          "Consider what emotions you're feeling right now and why.",
        ]);
      }

      // Analyze recent entries for patterns
      const recentEntries = entries.slice(0, 7);
      const avgMood = recentEntries.reduce((sum, e) => sum + e.mood, 0) / recentEntries.length;
      const allTags = recentEntries.flatMap((e) => e.tags);
      const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const topTag = Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

      const suggestions: string[] = [];

      // Mood-based suggestions
      if (avgMood >= 4) {
        suggestions.push("You've been feeling great lately! What specific activities or thoughts have been contributing to your positive mood?");
        suggestions.push("Consider writing about what you're grateful for during this positive period.");
      } else if (avgMood < 3) {
        suggestions.push("You've been experiencing some challenges recently. Remember to be kind to yourself during difficult times.");
        suggestions.push("Try reflecting on one small positive moment from today, no matter how small.");
        suggestions.push("Consider reaching out to a friend or loved one if you need support.");
      } else {
        suggestions.push("Your mood has been balanced. What helps you maintain this equilibrium?");
      }

      // Tag-based suggestions
      if (topTag) {
        suggestions.push(`You've been writing a lot about "${topTag}" lately. How has this area of your life been evolving?`);
      }

      // General wellness suggestions
      const randomSuggestions = [
        "What's one thing you learned about yourself this week?",
        "Describe a moment today when you felt most like yourself.",
        "What would you tell a friend who's going through what you're experiencing?",
        "List three things that made you smile recently.",
        "What's one habit you'd like to develop or change?",
      ];
      
      const randomIndex = Math.floor(Math.random() * randomSuggestions.length);
      suggestions.push(randomSuggestions[randomIndex]);

      res.json(suggestions.slice(0, 4));
    } catch (error) {
      res.status(500).json({ error: "Failed to generate suggestions" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
