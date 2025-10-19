import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type JournalEntry, moodLabels, insertJournalEntrySchema, type MoodValue } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation, useRoute } from "wouter";
import { format } from "date-fns";
import { ArrowLeft, Trash2, Edit2, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { MoodSelector } from "@/components/mood-selector";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const moodDotColors: Record<number, string> = {
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-lime-500",
  5: "bg-emerald-500",
};

const entryFormSchema = insertJournalEntrySchema.extend({
  date: z.string().min(1, "Date is required"),
  content: z.string().min(10, "Entry must be at least 10 characters"),
  mood: z.number().min(1).max(5),
});

type EntryFormValues = z.infer<typeof entryFormSchema>;

export default function EntryDetail() {
  const [, params] = useRoute("/entry/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const { data: entries, isLoading } = useQuery<JournalEntry[]>({
    queryKey: ["/api/entries"],
  });

  const entry = entries?.find((e) => e.id === params?.id);

  const form = useForm<EntryFormValues>({
    resolver: zodResolver(entryFormSchema),
    defaultValues: {
      date: "",
      content: "",
      mood: 3,
      tags: [],
    },
  });

  // Update form when entry loads
  useEffect(() => {
    if (entry && !isEditing) {
      form.reset({
        date: entry.date,
        content: entry.content,
        mood: entry.mood,
        tags: entry.tags,
      });
    }
  }, [entry, isEditing, form]);

  const updateMutation = useMutation({
    mutationFn: async (data: EntryFormValues) => {
      return await apiRequest("PATCH", `/api/entries/${params?.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/entries"] });
      toast({
        title: "Entry updated",
        description: "Your journal entry has been updated successfully.",
      });
      setIsEditing(false);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/entries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/entries"] });
      toast({
        title: "Entry deleted",
        description: "Your journal entry has been deleted.",
      });
      setLocation("/journal");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete entry. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EntryFormValues) => {
    updateMutation.mutate(data);
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

  if (isLoading) {
    return (
      <div className="min-h-screen pb-24 md:pb-8">
        <section className="px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-10 w-32 mb-8" />
            <Skeleton className="h-96 w-full" />
          </div>
        </section>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="min-h-screen pb-24 md:pb-8">
        <section className="px-4 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl font-medium text-foreground mb-4">Entry not found</h1>
            <Button onClick={() => setLocation("/journal")}>Back to Journal</Button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 md:pb-8">
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation("/journal")}
            className="mb-8 -ml-4"
            data-testid="button-back"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Journal
          </Button>

          {isEditing ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-medium">Edit Entry</h2>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setIsEditing(false);
                          form.reset();
                        }}
                        data-testid="button-cancel-edit"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
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

                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} data-testid="input-edit-date" />
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
                              placeholder="Write your thoughts here..."
                              className="min-h-[300px] text-base leading-loose font-serif resize-none"
                              {...field}
                              data-testid="input-edit-content"
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
                          <FormLabel>Tags</FormLabel>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                placeholder="Add a tag"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    addTag();
                                  }
                                }}
                                data-testid="input-edit-tag"
                              />
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={addTag}
                                data-testid="button-add-edit-tag"
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
                                  >
                                    {tag}
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      className="h-4 w-4 hover:bg-transparent"
                                      onClick={() => removeTag(tag)}
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

                    <div className="flex gap-3 justify-end pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          form.reset();
                        }}
                        data-testid="button-cancel-edit-save"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={updateMutation.isPending}
                        data-testid="button-save-edit"
                      >
                        {updateMutation.isPending ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            </Form>
          ) : (
            <Card className="border-2">
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${moodDotColors[entry.mood]}`} />
                    <div>
                      <time className="text-2xl font-medium text-foreground block" data-testid="text-entry-date">
                        {format(new Date(entry.date), "EEEE, MMMM d, yyyy")}
                      </time>
                      <span className="text-sm text-muted-foreground">
                        {moodLabels[entry.mood as keyof typeof moodLabels]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsEditing(true)}
                      data-testid="button-edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          data-testid="button-delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your journal entry.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteMutation.mutate(entry.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            data-testid="button-confirm-delete"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                {entry.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {entry.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" data-testid={`badge-tag-${tag}`}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div 
                  className="prose prose-lg max-w-none font-serif leading-loose text-foreground"
                  data-testid="text-entry-content"
                >
                  {entry.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
