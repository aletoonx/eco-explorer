
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { suggestExplorationPath, SuggestExplorationPathOutput } from "@/ai/flows/suggest-exploration-path";
import { getMapFeatures } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const formSchema = z.object({
  userInterests: z.string().min(10, {
    message: "Please tell us a bit more about your interests.",
  }),
});

export function ExplorationPlanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestExplorationPathOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapFeatures = getMapFeatures();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInterests: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const output = await suggestExplorationPath({
        userInterests: values.userInterests,
        mapFeatures: mapFeatures,
      });
      setResult(output);
    } catch (e) {
      setError("An error occurred while generating your path. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 flex flex-col flex-grow">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="userInterests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What are you interested in seeing?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., 'I'm fascinated by big cats and want to see conservation efforts for tigers and leopards.' or 'I want to learn about marine life and ocean conservation.'"
                    {...field}
                    disabled={!mapFeatures || loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading || !mapFeatures}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Generating...' : 'Suggest a Path'}
          </Button>
        </form>
      </Form>
      {error && <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>}
      {result && (
        <Card className="bg-muted/50 mt-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <CardTitle className="font-headline text-lg">Your Suggested Path</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Path:</h3>
              <p>{result.suggestedPath}</p>
            </div>
            <div>
              <h3 className="font-semibold">Reasoning:</h3>
              <p className="text-muted-foreground">{result.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
