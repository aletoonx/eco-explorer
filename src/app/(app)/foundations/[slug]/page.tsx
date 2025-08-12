'use server';

import { getFoundation } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, HandHeart, Mail, MapPin, Phone, Link as LinkIcon } from "lucide-react";
import Link from "next/link";


type FoundationPageParams = {
  params: {
    slug: string;
  };
};

export default async function FoundationPage({ params }: FoundationPageParams) {
  const foundation = await getFoundation(params.slug);

  if (!foundation) {
    notFound();
  }

  const imageURL = foundation.imageURL || "https://placehold.co/800x400.png";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{foundation.name}</h1>
        <p className="text-lg md:text-xl text-muted-foreground flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {foundation.location}
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="relative h-64 md:h-80 w-full">
          <Image
            src={imageURL}
            alt={foundation.name}
            fill
            style={{objectFit: "cover"}}
            className="w-full h-full"
            data-ai-hint={foundation.dataAiHint}
          />
        </div>
        <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                            <HandHeart className="w-7 h-7 text-primary" />
                            Nuestra Misión
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-justify">{foundation.mission}</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                            <Building className="w-7 h-7 text-primary" />
                            Actividades
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-justify">{foundation.foundationActivities}</p>
                    </CardContent>
                </Card>
            </div>
             <div>
                <h3 className="font-headline text-2xl mb-4 text-center">Contacto y Apoyo</h3>
                <div className="flex justify-center flex-wrap gap-4 text-sm">
                   <Badge variant="secondary" className="flex items-center gap-2 p-2">
                        <Mail className="w-4 h-4" />
                        {foundation.contact}
                   </Badge>
                   <Badge variant="secondary" className="flex items-center gap-2 p-2">
                        <Phone className="w-4 h-4" />
                        (Dato no disponible)
                   </Badge>
                   {foundation.ofcWebsite && (
                    <Badge variant="secondary" className="flex items-center gap-2 p-2 hover:bg-primary/20">
                        <LinkIcon className="w-4 h-4" />
                        <Link href={foundation.ofcWebsite} target="_blank" rel="noopener noreferrer">Sitio Web Oficial</Link>
                    </Badge>
                   )}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
