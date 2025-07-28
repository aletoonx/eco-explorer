import { foundations, type Foundation } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MapPin, Target } from "lucide-react";

export async function generateStaticParams() {
  return foundations.map((foundation) => ({
    slug: foundation.slug,
  }));
}

function getFoundation(slug: string): Foundation | undefined {
  return foundations.find((foundation) => foundation.slug === slug);
}

export default function FoundationDetailPage({ params }: { params: { slug: string } }) {
  const foundation = getFoundation(params.slug);

  if (!foundation) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2">{foundation.name}</h1>
      </div>

       <Card className="overflow-hidden">
        <CardContent className="p-0">
            <Image
                src={foundation.imageUrl}
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
                <span>Mission Statement</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-lg">{foundation.mission}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary"/>
                    <span>Location</span>
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
                    <span>Contact</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <a href={`mailto:${foundation.contact}`} className="text-accent hover:underline">{foundation.contact}</a>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
