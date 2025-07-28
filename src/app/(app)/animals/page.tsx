import { animals } from "@/lib/data";
import { AnimalCard } from "@/components/animals/animal-card";

export default function AnimalsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Animal Kingdom</h1>
        <p className="text-muted-foreground">
          Learn more about the world's most vulnerable species.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {animals.map((animal) => (
          <AnimalCard key={animal.slug} animal={animal} />
        ))}
      </div>
    </div>
  );
}
