import { getAnimals } from "@/lib/data";
import { AnimalCard } from "@/components/animals/animal-card";
import { ExtinctionInfo } from "@/components/animals/extinction-info";

export const dynamic = 'force-dynamic';

export default async function AnimalsPage() {
  const animals = await getAnimals();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Reino Animal</h1>
        <p className="text-muted-foreground">
          Aprende más sobre las especies más vulnerables del mundo.
        </p>
      </div>

      <ExtinctionInfo />

      {animals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {animals.map((animal) => (
            <AnimalCard key={animal.slug} animal={animal} />
          ))}
        </div>
      ) : (
        <p>No se encontraron animales. Por favor, agrega algunos a la base de datos de Firestore.</p>
      )}
    </div>
  );
}
