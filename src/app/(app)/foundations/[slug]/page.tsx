import { getFoundations, getFoundation, type Foundation } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Target, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function generateStaticParams() {
  const foundations = await getFoundations();
  return foundations.map((foundation) => ({
    slug: foundation.slug,
  }));
}

export default async function FoundationDetailPage({ params }: { params: { slug: string } }) {
  const foundation = await getFoundation(params.slug);

  if (!foundation) {
    notFound();
  }
  
  const imageURL = foundation.imageURL || "https://placehold.co/800x400.png";

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{foundation.name}</h1>
      </div>

       <Card className="overflow-hidden">
        <CardContent className="p-0">
            <Image
                src={imageURL}
                alt={foundation.name}
                width={800}
                height={400}
                className="w-full object-cover max-h-96"
                data-ai-hint={foundation.dataAiHint}
            />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary"/>
                <span>Misión</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-lg">{foundation.mission}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary"/>
                    <span>Ubicación</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p>{foundation.location}</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary"/>
                    <span>Contacto</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <a href={`mailto:${foundation.contact}`} className="text-accent hover:underline">{foundation.contact}</a>
            </CardContent>
        </Card>
        {foundation.ofcWebsite && (
          <Card>
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-primary"/>
                      <span>Sitio Web</span>
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href={foundation.ofcWebsite} target="_blank" rel="noopener noreferrer">
                    Visitar Sitio
                  </Link>
                </Button>
              </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
