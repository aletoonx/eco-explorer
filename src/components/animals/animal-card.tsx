import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Animal } from "@/lib/data";
import { Badge } from "../ui/badge";
import Image from 'next/image';

type AnimalCardProps = {
  animal: Animal;
};

export function AnimalCard({ animal }: AnimalCardProps) {
  const imageURL = animal.imageURL || "https://placehold.co/400x250.png";
  return (
    <Card className="flex flex-col h-auto overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
      {imageURL && (
         <div className="relative h-48 w-full">
          <Image
              src={imageURL}
              alt={animal.name}
              fill
              style={{objectFit: "cover"}}
              className="w-full h-full"
              data-ai-hint={animal.dataAiHint}
            />
       </div>
      )}
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-1">{animal.name}</CardTitle>
        <CardDescription className="italic text-xs mb-2">{animal.scientificName}</CardDescription>
        <p className="text-sm text-muted-foreground mb-1"><strong>Hábitat:</strong> {animal.habitat}</p>
        <p className="text-sm text-foreground/80 mt-3">{animal.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant={animal.status === 'En Peligro' || animal.status === 'Endangered' ? 'destructive' : 'secondary'}>{animal.status}</Badge>
      </CardFooter>
    </Card>
  );
}
