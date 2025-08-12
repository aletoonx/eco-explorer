import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Map, PawPrint, Landmark, Rocket } from "lucide-react"
import Link from "next/link"
import { ExplorationPlanner } from "@/components/ai/exploration-planner";
import { getMapFeatures } from "@/lib/data";

export default async function DashboardPage() {
  const mapFeatures = await getMapFeatures();

  return (
    <div className="flex flex-col gap-8 flex-grow">
      <div>
        <h1 className="text-3xl font-bold font-headline">¡Bienvenido, Explorador!</h1>
        <p className="text-muted-foreground">
          Tu viaje a la naturaleza comienza aquí. ¿Qué descubrirás hoy?
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/map">
          <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mapa Interactivo</CardTitle>
              <Map className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">Explora Hábitats</div>
              <p className="text-xs text-muted-foreground">
                Descubre fundaciones de vida silvestre y territorios de animales.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/animals">
          <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reino Animal</CardTitle>
              <PawPrint className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">Conoce las Especies</div>
              <p className="text-xs text-muted-foreground">
                Aprende sobre animales en peligro y sus historias.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/foundations" className="md:col-span-2">
          <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Héroes de la Conservación</CardTitle>
              <Landmark className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">Encuentra Fundaciones</div>
              <p className="text-xs text-muted-foreground">
                Conéctate con organizaciones que protegen nuestro planeta.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card className="h-full flex flex-col w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-primary" />
            <CardTitle className="font-headline">Ruta de Exploración Personalizada</CardTitle>
          </div>
          <CardDescription>
            Deja que nuestra guía de IA te sugiera un recorrido personalizado en el mapa interactivo basado en tus intereses.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <ExplorationPlanner mapFeatures={mapFeatures} />
        </CardContent>
      </Card>
    </div>
  )
}
