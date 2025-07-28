
"use client";

import type { Foundation } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin } from "lucide-react";
import Image from "next/image";

type InteractiveMapProps = {
  foundations: Foundation[];
};

// Map dimensions based on the image aspect ratio
const MAP_WIDTH = 560;
const MAP_HEIGHT = 500;

// Geographic bounds of Costa Rica
const bounds = {
  minLng: -85.95,
  maxLng: -82.5,
  minLat: 8.0,
  maxLat: 11.2,
};

// Function to convert longitude/latitude to percentage-based top/left coordinates
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
            <Image 
                src="https://placehold.co/560x500.png"
                alt="Map of Costa Rica"
                width={MAP_WIDTH}
                height={MAP_HEIGHT}
                className="rounded-md"
                data-ai-hint="costa rica map"
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
