
import { HighlightMapFeatures } from "@/components/map/highlight-map-features";
import { InteractiveMap } from "@/components/map/interactive-map";
import { getFoundations } from "@/lib/data";

export default async function MapPage() {
  const foundations = await getFoundations();

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Interactive Map of Costa Rica</h1>
        <p className="text-muted-foreground">
          Explore wildlife foundations and their conservation efforts on the ground.
        </p>
      </div>
      <div className="w-full">
        <InteractiveMap foundations={foundations} />
      </div>
      <HighlightMapFeatures foundations={foundations} />
    </div>
  );
}
