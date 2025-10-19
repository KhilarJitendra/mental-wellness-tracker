import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodSelector } from "@/components/mood-selector";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertJournalEntrySchema, type MoodValue } from "@shared/schema";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const entryFormSchema = insertJournalEntrySchema.extend({
  date: z.string().min(1, "Date is required"),
  content: z.string().min(10, "Entry must be at least 10 characters"),
  mood: z.number().min(1).max(5),
});

type EntryFormValues = z.infer<typeof entryFormSchema>;

export default function NewEntry() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [tagInput, setTagInput] = useState("");
  
  const form = useForm<EntryFormValues>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      content: "",
      mood: 3,
      tags: [],
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: EntryFormValues) => {
      return await apiRequest("POST", "/api/entries", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/entries"] });
      toast({
        title: "Entry saved",
        description: "Your journal entry has been saved successfully.",
      });
      setLocation("/dashboard");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EntryFormValues) => {
    createMutation.mutate(data);
  };

  const addTag = () => {
    if (tagInput.trim() && !form.getValues("tags").includes(tagInput.trim())) {
      const currentTags = form.getValues("tags");
      form.setValue("tags", [...currentTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags");
    form.setValue("tags", currentTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-light text-foreground mb-2">
            New Entry
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Take a moment to reflect on your day
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>How are you feeling?</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="mood"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <MoodSelector
                            value={field.value as MoodValue}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your thoughts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entry</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your thoughts here... What happened today? How did you feel? What are you grateful for?"
                            className="min-h-[300px] text-base leading-loose font-serif resize-none"
                            {...field}
                            data-testid="input-content"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={() => (
                      <FormItem>
                        <FormLabel>Tags (optional)</FormLabel>
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input
                              placeholder="Add a tag (e.g., work, family, health)"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  addTag();
                                }
                              }}
                              data-testid="input-tag"
                            />
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={addTag}
                              data-testid="button-add-tag"
                            >
                              Add
                            </Button>
                          </div>
                          {form.watch("tags").length > 0 && (
                            <div className="flex gap-2 flex-wrap">
                              {form.watch("tags").map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="gap-1 pr-1"
                                  data-testid={`badge-tag-${tag}`}
                                >
                                  {tag}
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 hover:bg-transparent"
                                    onClick={() => removeTag(tag)}
                                    data-testid={`button-remove-tag-${tag}`}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex gap-4 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/dashboard")}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createMutation.isPending}
                  data-testid="button-save"
                >
                  {createMutation.isPending ? "Saving..." : "Save Entry"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
}
