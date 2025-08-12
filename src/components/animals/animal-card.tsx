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
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
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
      <CardHeader className="p-4">
        <CardTitle className="text-lg font-headline mb-1">{animal.name}</CardTitle>
        <CardDescription className="italic text-xs">{animal.scientificName}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{animal.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Badge variant={animal.status === 'En Peligro' || animal.status === 'Endangered' ? 'destructive' : 'secondary'}>{animal.status}</Badge>
      </CardFooter>
    </Card>
  );
}
