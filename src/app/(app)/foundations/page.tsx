import { foundations } from "@/lib/data";
import { FoundationCard } from "@/components/foundations/foundation-card";

export default function FoundationsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Foundation Directory</h1>
        <p className="text-muted-foreground">
          Discover organizations dedicated to protecting wildlife and their habitats.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {foundations.map((foundation) => (
          <FoundationCard key={foundation.slug} foundation={foundation} />
        ))}
      </div>
    </div>
  );
}
