import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Animal } from "@/lib/data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import Image from "next/image";

type AnimalCardProps = {
  animal: Animal;
};

export function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
      {animal.imageURL ? (
         <CardHeader className="p-0 relative h-48">
          <Image
              src={animal.imageURL}
              alt={animal.name}
              layout="fill"
              className="object-cover"
              data-ai-hint={animal.dataAiHint}
            />
       </CardHeader>
      ) : (
        <div className="h-48 bg-muted flex items-center justify-center text-muted-foreground">
            No image
        </div>
      )}
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-2">{animal.name}</CardTitle>
        <Badge variant={animal.status === 'En Peligro' || animal.status === 'Endangered' ? 'destructive' : 'secondary'}>{animal.status}</Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/animals/${animal.slug}`}>Aprender Más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
