
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { highlightMapFeatures, HighlightMapFeaturesOutput } from "@/ai/flows/highlight-map-features";
import { type Foundation } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Loader2, LocateFixed } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface HighlightMapFeaturesProps {
    foundations: Foundation[];
}

export function HighlightMapFeatures({ foundations }: HighlightMapFeaturesProps) {
  const [loading, setLoading] = useState(false);
  const [selectedFoundationSlug, setSelectedFoundationSlug] = useState<string | null>(null);
  const [result, setResult] = useState<HighlightMapFeaturesOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSelection = async (slug: string) => {
    setSelectedFoundationSlug(slug);
    setLoading(true);
    setResult(null);
    setError(null);
    
    const foundation = foundations.find(f => f.slug === slug);
    if (!foundation) {
        setError("Could not find the selected foundation.");
        setLoading(false);
        return;
    }

    try {
      const output = await highlightMapFeatures({
        locationName: foundation.name,
        recentSightings: foundation.recentSightings,
        foundationActivities: foundation.foundationActivities,
      });
      setResult(output);
    } catch (e) {
      setError("An error occurred while fetching highlights. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <LocateFixed className="w-6 h-6 text-accent" />
                <CardTitle className="font-headline">Location Highlights</CardTitle>
            </div>
            <CardDescription>
                Select a foundation from the map to see AI-powered highlights about its location.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
                <Select onValueChange={handleSelection} disabled={loading || foundations.length === 0}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a foundation" />
                    </SelectTrigger>
                    <SelectContent>
                        {foundations.map(f => (
                            <SelectItem key={f.slug} value={f.slug}>{f.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
            </div>
            {error && <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>}
            {result && (
                <Card className="bg-muted/50">
                    <CardHeader>
                        <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-400" />
                        <CardTitle className="font-headline text-lg">Highlights for {foundations.find(f => f.slug === selectedFoundationSlug)?.name}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p>{result.highlightedFeatures}</p>
                    </CardContent>
                </Card>
            )}
        </CardContent>
    </Card>
  );
}
