import { getFoundations } from "@/lib/data";
import { FoundationCard } from "@/components/foundations/foundation-card";

export const dynamic = 'force-dynamic';

export default async function FoundationsPage() {
  const foundations = await getFoundations();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Directorio de Fundaciones</h1>
        <p className="text-muted-foreground">
          Descubre organizaciones dedicadas a proteger la vida silvestre y sus hábitats.
        </p>
      </div>
      {foundations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {foundations.map((foundation) => (
            <FoundationCard key={foundation.slug} foundation={foundation} />
          ))}
        </div>
      ) : (
        <p>No se encontraron fundaciones. Por favor, agrega algunas a la base de datos de Firestore.</p>
      )}
    </div>
  );
}
