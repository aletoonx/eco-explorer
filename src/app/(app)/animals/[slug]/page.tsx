'use server';

import { getAnimal } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, HeartPulse, MapPin, PawPrint } from "lucide-react";
import { ExplorationPlanner } from "@/components/ai/exploration-path-planner";

type AnimalPageParams = {
  params: {
    slug: string;
  };
};

export default async function AnimalPage({ params }: AnimalPageParams) {
  const animal = await getAnimal(params.slug);

  if (!animal) {
    notFound();
  }

  const imageURL = animal.imageURL || "https://placehold.co/800x400.png";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{animal.name}</h1>
        <p className="text-lg md:text-xl text-muted-foreground italic">{animal.scientificName}</p>
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src={imageURL}
            alt={animal.name}
            fill
            style={{objectFit: "cover"}}
            className="w-full h-full"
            data-ai-hint={animal.dataAiHint}
          />
        </div>
        <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-muted p-3 rounded-lg">
                    <HeartPulse className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-semibold">Estado</p>
                    <Badge variant={animal.status === 'En Peligro' || animal.status === 'Endangered' ? 'destructive' : 'secondary'}>{animal.status}</Badge>
                </div>
                 <div className="bg-muted p-3 rounded-lg">
                    <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-semibold">Hábitat Principal</p>
                    <p className="text-muted-foreground text-sm">{animal.habitat}</p>
                </div>
                 <div className="bg-muted p-3 rounded-lg">
                    <Globe className="w-6 h-6 mx-auto mb-2 text-primary" />
                    <p className="text-sm font-semibold">Tipo</p>
                    <p className="text-muted-foreground text-sm">Fauna Nativa</p>
                </div>
            </div>
            <div>
                <h3 className="font-headline text-2xl mb-2">Sobre el {animal.name}</h3>
                <p className="text-muted-foreground leading-relaxed text-justify">{animal.description}</p>
            </div>
        </CardContent>
      </Card>

      <ExplorationPlanner initialAnimal={animal.name} />

    </div>
  );
}
