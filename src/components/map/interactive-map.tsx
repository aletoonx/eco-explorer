
"use client";

import type { Foundation } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin } from "lucide-react";

type InteractiveMapProps = {
  foundations: Foundation[];
};

// Dimensiones del mapa basadas en la relación de aspecto de la imagen
const MAP_WIDTH = 560;
const MAP_HEIGHT = 500;

// Límites geográficos de Costa Rica (AJUSTADOS PARA MAYOR PRECISIÓN)
const bounds = {
    minLng: -86.0,  // Extremo Oeste
    maxLng: -82.4,  // Extremo Este
    minLat: 8.0,    // Extremo Sur
    maxLat: 11.22,  // Extremo Norte
};

// Convierte coordenadas de latitud/longitud a coordenadas porcentuales (top/left)
function convertCoords(lat: number, lng: number) {
  const left = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const top = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
  return { left, top };
}

export function InteractiveMap({ foundations }: InteractiveMapProps) {
  return (
    <TooltipProvider>
      <div className="relative w-full max-w-4xl mx-auto rounded-lg bg-card p-4 border">
        <div className="relative mx-auto" style={{ width: `${MAP_WIDTH}px`, height: `${MAP_HEIGHT}px`}}>
            {/* Carga la imagen desde la carpeta `public` */}
            <img
                src="/costa-rica-map.png"
                alt="Mapa de Costa Rica"
                width={MAP_WIDTH}
                height={MAP_HEIGHT}
                className="rounded-md object-cover"
            />
            {foundations.map((foundation) => {
                const { left, top } = convertCoords(foundation.lat, foundation.lng);
                return (
                <Tooltip key={foundation.slug}>
                    <TooltipTrigger asChild>
                    <a
                        href={`/foundations/${foundation.slug}`}
                        className="absolute cursor-pointer group"
                        style={{ top: `${top}%`, left: `${left}%`, transform: 'translate(-50%, -50%)' }}
                        aria-label={foundation.name}
                    >
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-3 h-3 rounded-full bg-primary transition-all group-hover:w-4 group-hover:h-4" />
                            <div className="absolute w-5 h-5 rounded-full bg-primary/50 animate-ping" />
                        </div>
                    </a>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {foundation.name}
                    </p>
                    </TooltipContent>
                </Tooltip>
                );
            })}
        </div>
      </div>
    </TooltipProvider>
  );
}
