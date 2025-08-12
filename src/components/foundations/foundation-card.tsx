import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Foundation } from "@/lib/data";
import Image from "next/image";

type FoundationCardProps = {
  foundation: Foundation;
};

export function FoundationCard({ foundation }: FoundationCardProps) {
  const imageURL = foundation.imageURL || "https://placehold.co/400x250.png";
  return (
    <Card className="flex flex-col h-auto overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
      {imageURL && (
        <div className="relative h-40 w-full">
            <Image
            src={imageURL}
            alt={foundation.name}
            fill
            style={{objectFit: "cover"}}
            className="w-full h-full"
            data-ai-hint={foundation.dataAiHint}
            />
        </div>
      )}
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-headline mb-2">{foundation.name}</CardTitle>
        <CardDescription className="text-foreground/80">{foundation.mission}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 pt-0">
         <p className="text-sm text-muted-foreground font-semibold">{foundation.location}</p>
      </CardFooter>
    </Card>
  );
}
