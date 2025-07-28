
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

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 flex-grow">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold font-headline">Welcome, Explorer!</h1>
            <p className="text-muted-foreground">
              Your journey into the wild begins here. What will you discover today?
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/map">
              <Card className="hover:border-primary transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Interactive Map</CardTitle>
                  <Map className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">Explore Habitats</div>
                  <p className="text-xs text-muted-foreground">
                    Discover wildlife foundations and animal territories.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/animals">
              <Card className="hover:border-primary transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Animal Kingdom</CardTitle>
                  <PawPrint className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">Meet the Species</div>
                  <p className="text-xs text-muted-foreground">
                    Learn about endangered animals and their stories.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/foundations" className="md:col-span-2">
              <Card className="hover:border-primary transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Conservation Heroes</CardTitle>
                  <Landmark className="w-4 h-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-headline">Find Foundations</div>
                  <p className="text-xs text-muted-foreground">
                    Connect with organizations protecting our planet.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          
        </div>
      </div>
      <div className="flex-grow flex">
        <Card className="h-full flex flex-col w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-accent" />
              <CardTitle className="font-headline">Personalized Exploration Path</CardTitle>
            </div>
            <CardDescription>
              Let our AI guide suggest a personalized tour on the interactive map based on your interests.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col">
            <ExplorationPlanner />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
