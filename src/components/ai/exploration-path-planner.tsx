'use client';

import { useState } from 'react';
import { suggestExplorationPath, SuggestExplorationPathInput, SuggestExplorationPathOutput } from '@/ai/flows/suggest-exploration-path';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Bot, Milestone, Sparkles, Wand2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

type Interest = 'ambos' | 'animales' | 'fundaciones';

type ExplorationPlannerProps = {
  initialAnimal?: string;
};

export function ExplorationPlanner({ initialAnimal }: ExplorationPlannerProps) {
  const [interest, setInterest] = useState<Interest>('ambos');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SuggestExplorationPathOutput | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const input: SuggestExplorationPathInput = {
        interest,
        ...(initialAnimal && { specificAnimal: initialAnimal }),
      };
      const response = await suggestExplorationPath(input);
      setResult(response);
    } catch (e) {
      console.error(e);
      setError('La IA no pudo generar una ruta en este momento. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const renderSkeleton = () => (
    <div className="space-y-4 mt-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-16 w-full" />
      <div className="space-y-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );

  return (
    <Card className="bg-muted/30 border-dashed border-primary/50">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Wand2 className="w-8 h-8 text-primary" />
            <div>
                <CardTitle className="font-headline text-2xl">Planificador de Rutas con IA</CardTitle>
                <CardDescription>
                    {initialAnimal 
                        ? `Inspírate para explorar más sobre el ${initialAnimal} y su entorno.`
                        : 'Dinos qué te interesa y nuestra IA creará una ruta de exploración única para ti.'
                    }
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        {!initialAnimal && (
          <div className="mb-6">
            <Label className="font-semibold text-lg mb-3 block">¿Cuál es tu principal interés?</Label>
            <RadioGroup
              defaultValue="ambos"
              value={interest}
              onValueChange={(value: Interest) => setInterest(value)}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ambos" id="ambos" />
                <Label htmlFor="ambos">Ambos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="animales" id="animales" />
                <Label htmlFor="animales">Solo Animales</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fundaciones" id="fundaciones" />
                <Label htmlFor="fundaciones">Solo Fundaciones</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <Button onClick={handleSubmit} disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Bot className="mr-2 animate-spin" />
              Creando tu aventura...
            </>
          ) : (
            <>
              <Sparkles className="mr-2" />
              {initialAnimal ? 'Sugerir Ruta Relacionada' : 'Generar Ruta de Exploración'}
            </>
          )}
        </Button>

        {loading && renderSkeleton()}

        {error && (
            <div className="mt-4 p-4 bg-destructive/10 border border-destructive/50 text-destructive rounded-lg flex items-center gap-3">
                <AlertTriangle className="w-5 h-5" />
                <p>{error}</p>
            </div>
        )}

        {result && (
          <div className="mt-6 border-t pt-6">
            <h3 className="font-headline text-3xl text-primary mb-2">{result.title}</h3>
            <p className="text-muted-foreground mb-6">{result.description}</p>
            <div className="relative space-y-6">
                {/* Línea de tiempo vertical */}
                 <div className="absolute left-3 top-2 h-full border-l-2 border-dashed border-primary/50"></div>
                {result.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4 pl-1">
                         <div className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full bg-primary mt-1">
                            <Milestone className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-lg">
                                <Link href={`/${step.type === 'animal' ? 'animals' : 'foundations'}/${step.slug}`} className="hover:underline">
                                    {step.name}
                                </Link>
                            </p>
                            <p className="text-sm text-muted-foreground">{step.reason}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
