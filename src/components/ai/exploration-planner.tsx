"use client";

import { useState, useEffect } from "react";
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
    message: "Por favor, cuéntanos un poco más sobre tus intereses.",
  }),
});

export function ExplorationPlanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestExplorationPathOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mapFeatures, setMapFeatures] = useState<string>("");
  const [loadingFeatures, setLoadingFeatures] = useState(true);

  useEffect(() => {
    async function fetchMapFeatures() {
      setLoadingFeatures(true);
      const features = await getMapFeatures();
      setMapFeatures(features);
      setLoadingFeatures(false);
    }
    fetchMapFeatures();
  }, []);

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
      setError("Ocurrió un error al generar tu ruta. Por favor, inténtalo de nuevo.");
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
                <FormLabel>¿Qué te interesa ver?</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ej: 'Me fascinan los grandes felinos y quiero ver los esfuerzos de conservación para tigres y leopardos.' o 'Quiero aprender sobre la vida marina y la conservación de los océanos.'"
                    {...field}
                    disabled={loadingFeatures || loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading || loadingFeatures}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Generando...' : 'Sugerir una Ruta'}
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
              <CardTitle className="font-headline text-lg">Tu Ruta Sugerida</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Ruta:</h3>
              <p>{result.suggestedPath}</p>
            </div>
            <div>
              <h3 className="font-semibold">Justificación:</h3>
              <p className="text-muted-foreground">{result.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
