import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Map, PawPrint, Landmark } from "lucide-react"
import Link from "next/link"
import { ExplorationPlanner } from "@/components/ai/exploration-path-planner"

export default async function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 flex-grow">
      <div>
        <h1 className="text-3xl font-bold font-headline">¡Bienvenido, Explorador!</h1>
        <p className="text-muted-foreground">
          Tu viaje a la naturaleza comienza aquí. ¿Qué descubrirás hoy?
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/map" className="lg:col-span-1">
          <Card className="hover:border-primary transition-colors h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Mapa Interactivo</CardTitle>
              <Map className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">Explora Hábitats</div>
              <p className="text-xs text-muted-foreground">
                Descubre fundaciones y territorios de animales.
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/animals" className="lg:col-span-1">
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
        <Link href="/foundations" className="lg:col-span-1">
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

      <ExplorationPlanner />
    </div>
  )
}
