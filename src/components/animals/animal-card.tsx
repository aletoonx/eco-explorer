import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Animal } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

type AnimalCardProps = {
  animal: Animal;
};

export function AnimalCard({ animal }: AnimalCardProps) {
  const placeholderImageUrl = "https://placehold.co/400x300.png";
  const imageUrl = animal.imageUrl || placeholderImageUrl;
  const isExternalImage = imageUrl !== placeholderImageUrl && !imageUrl.startsWith("https://placehold.co");

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
       <CardHeader className="p-0">
        {isExternalImage ? (
          <img
            src={imageUrl}
            alt={animal.name}
            width={400}
            height={300}
            className="object-cover w-full h-48"
            data-ai-hint={animal.dataAiHint}
          />
        ) : (
          <Image
            src={imageUrl}
            alt={animal.name}
            width={400}
            height={300}
            className="object-cover w-full h-48"
            data-ai-hint={animal.dataAiHint}
          />
        )}
     </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-2">{animal.name}</CardTitle>
        <Badge variant={animal.status === 'En Peligro' ? 'destructive' : 'secondary'}>{animal.status}</Badge>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/animals/${animal.slug}`}>Aprender Más</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
