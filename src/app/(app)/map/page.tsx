import { HighlightMapFeatures } from "@/components/map/highlight-map-features";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function MapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Interactive Map</h1>
        <p className="text-muted-foreground">
          Explore habitats, see recent sightings, and learn about conservation efforts on the ground.
        </p>
      </div>
      <Card>
        <CardContent className="p-2">
           <Image 
            src="https://placehold.co/1200x600.png"
            alt="Interactive Map"
            width={1200}
            height={600}
            className="w-full h-auto rounded-md"
            data-ai-hint="world map"
           />
        </CardContent>
      </Card>
      <HighlightMapFeatures />
    </div>
  );
}
