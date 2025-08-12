import { getAnimal } from "@/lib/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint, Globe } from "lucide-react";
import Image from "next/image";

export default async function AnimalDetailPage({ params }: { params: { slug: string } }) {
  const animal = await getAnimal(params.slug);

  if (!animal) {
    notFound();
  }

  const imageURL = animal.imageURL || "https://placehold.co/800x450.png";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{animal.name}</h1>
        <p className="text-xl text-muted-foreground font-headline">{animal.scientificName}</p>
      </div>

      {imageURL && (
        <Card className="overflow-hidden">
            <CardContent className="p-0 relative aspect-video">
            <Image
                src={imageURL}
                alt={animal.name}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
                data-ai-hint={animal.dataAiHint}
                unoptimized
            />
            </CardContent>
        </Card>
      )}
      
      <p className="text-lg leading-relaxed">{animal.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PawPrint className="w-5 h-5 text-primary"/>
                    <span>Estado de Conservación</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Badge variant={animal.status === 'Endangered' || animal.status === 'En Peligro' ? 'destructive' : 'secondary'} className="text-lg">
                    {animal.status}
                </Badge>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary"/>
                    <span>Hábitat</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{animal.habitat}</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
