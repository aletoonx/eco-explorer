import { HighlightMapFeatures } from "@/components/map/highlight-map-features";
import { InteractiveMap } from "@/components/map/interactive-map";
import { getFoundations } from "@/lib/data";

export const dynamic = 'force-dynamic';

export default async function MapPage() {
  const foundations = await getFoundations();

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Mapa Interactivo de Costa Rica</h1>
        <p className="text-muted-foreground">
          Explora fundaciones de vida silvestre y sus esfuerzos de conservación en el terreno.
        </p>
      </div>
      <div className="w-full">
        <InteractiveMap foundations={foundations} />
      </div>
      <HighlightMapFeatures foundations={foundations} />
    </div>
  );
}
