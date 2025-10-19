import { type JournalEntry, type InsertJournalEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getEntries(): Promise<JournalEntry[]>;
  getEntry(id: string): Promise<JournalEntry | undefined>;
  createEntry(entry: InsertJournalEntry): Promise<JournalEntry>;
  updateEntry(id: string, entry: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined>;
  deleteEntry(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private entries: Map<string, JournalEntry>;

  constructor() {
    this.entries = new Map();
    this.seedData();
  }

  private seedData() {
    const sampleEntries: InsertJournalEntry[] = [
      {
        date: "2024-10-15",
        content: "Today was a good day. I felt productive at work and managed to complete the project I've been working on. Feeling grateful for the support from my team.",
        mood: 4,
        tags: ["work", "productivity", "gratitude"],
      },
      {
        date: "2024-10-16",
        content: "Woke up feeling a bit anxious about the upcoming presentation. Took some time to meditate and it helped calm my nerves. Need to remember to practice self-care more often.",
        mood: 3,
        tags: ["anxiety", "self-care", "meditation"],
      },
      {
        date: "2024-10-17",
        content: "Had an amazing day! The presentation went really well, and I received positive feedback from my manager. Celebrated with friends in the evening. Days like these remind me why I love what I do.",
        mood: 5,
        tags: ["work", "celebration", "friends"],
      },
    ];

    sampleEntries.forEach((entry) => {
      const id = randomUUID();
      const journalEntry: JournalEntry = {
        ...entry,
        id,
        createdAt: new Date(),
      };
      this.entries.set(id, journalEntry);
    });
  }

  async getEntries(): Promise<JournalEntry[]> {
    return Array.from(this.entries.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getEntry(id: string): Promise<JournalEntry | undefined> {
    return this.entries.get(id);
  }

  async createEntry(insertEntry: InsertJournalEntry): Promise<JournalEntry> {
    const id = randomUUID();
    const entry: JournalEntry = {
      ...insertEntry,
      id,
      createdAt: new Date(),
    };
    this.entries.set(id, entry);
    return entry;
  }

  async updateEntry(id: string, updates: Partial<InsertJournalEntry>): Promise<JournalEntry | undefined> {
    const existingEntry = this.entries.get(id);
    if (!existingEntry) {
      return undefined;
    }
    const updatedEntry: JournalEntry = {
      ...existingEntry,
      ...updates,
    };
    this.entries.set(id, updatedEntry);
    return updatedEntry;
  }

  async deleteEntry(id: string): Promise<boolean> {
    return this.entries.delete(id);
  }
}

export const storage = new MemStorage();
