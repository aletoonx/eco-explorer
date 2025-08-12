import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Foundation } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type FoundationCardProps = {
  foundation: Foundation;
};

export function FoundationCard({ foundation }: FoundationCardProps) {
  const imageURL = foundation.imageURL || "https://placehold.co/400x250.png";
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
      <div className="relative h-40 w-full">
        <img
          src={imageURL}
          alt={foundation.name}
          className="w-full h-full object-cover"
          data-ai-hint={foundation.dataAiHint}
        />
      </div>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-2">{foundation.name}</CardTitle>
        <CardDescription>{foundation.mission.substring(0, 100)}...</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/foundations/${foundation.slug}`}>Ver Detalles</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
