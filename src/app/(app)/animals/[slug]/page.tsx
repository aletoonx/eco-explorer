import { animals, type Animal } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PawPrint, Globe } from "lucide-react";

export async function generateStaticParams() {
  return animals.map((animal) => ({
    slug: animal.slug,
  }));
}

function getAnimal(slug: string): Animal | undefined {
  return animals.find((animal) => animal.slug === slug);
}

export default function AnimalDetailPage({ params }: { params: { slug: string } }) {
  const animal = getAnimal(params.slug);

  if (!animal) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{animal.name}</h1>
        <p className="text-xl text-muted-foreground font-headline">{animal.scientificName}</p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
            <Image
                src={animal.imageUrl}
                alt={animal.name}
                width={800}
                height={450}
                className="w-full object-cover"
                data-ai-hint={animal.dataAiHint}
            />
        </CardContent>
      </Card>
      
      <p className="text-lg leading-relaxed">{animal.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <PawPrint className="w-5 h-5 text-primary"/>
                    <span>Conservation Status</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Badge variant={animal.status === 'Endangered' ? 'destructive' : 'secondary'} className="text-lg">
                    {animal.status}
                </Badge>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary"/>
                    <span>Habitat</span>
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
