import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Foundation } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type FoundationCardProps = {
  foundation: Foundation;
};

export function FoundationCard({ foundation }: FoundationCardProps) {
  const imageURL = foundation.imageURL || "https://placehold.co/400x250.png";
  return (
    <Link href={`/foundations/${foundation.slug}`} className="block h-full">
        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
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
        <CardHeader className="p-4">
            <CardTitle className="text-lg font-headline mb-2">{foundation.name}</CardTitle>
            <CardDescription className="text-sm text-muted-foreground font-semibold">{foundation.location}</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0 flex-grow">
            <p className="text-foreground/80 line-clamp-4">{foundation.mission}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
        </CardFooter>
        </Card>
    </Link>
  );
}
