
"use client";

import type { Foundation } from "@/lib/data";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MapPin } from "lucide-react";

type InteractiveMapProps = {
  foundations: Foundation[];
};

// Map dimensions (aspect ratio of Costa Rica)
const MAP_WIDTH = 560;
const MAP_HEIGHT = 500;

// Geographic bounds of Costa Rica
const bounds = {
  minLng: -85.95,
  maxLng: -82.5,
  minLat: 8.0,
  maxLat: 11.2,
};

// Function to convert longitude/latitude to SVG x/y coordinates
function convertCoords(lat: number, lng: number) {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * MAP_WIDTH;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * MAP_HEIGHT;
  return { x, y };
}

export function InteractiveMap({ foundations }: InteractiveMapProps) {
  return (
    <TooltipProvider>
      <div className="relative w-full max-w-4xl mx-auto rounded-lg bg-card p-4 border">
        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className="w-full h-auto">
          {/* A more accurate representation of Costa Rica's shape */}
          <path
            d="M106.8,117.8L93.3,163.3L111,180.2L116.1,209.7L146.9,240L148.9,260.8L171.1,283.4L188.8,300.9L212.7,314.9L242.4,329.8L281,351.4L339.3,375.3L371.1,385.6L408.2,385.6L427.6,377.9L434.9,349.3L441.7,330.3L445.4,302.2L453.6,275.6L465.1,250.9L472.9,228.8L471.9,203.4L458,168.1L434.9,139.5L402.4,115.7L374.3,95L343,76.4L323.1,52L297.2,33.4L267,23.1L248.7,33.4L222.8,47.2L198.2,55.1L169.6,71.2L135.5,95.5L106.8,117.8Z"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="2"
          />
          {foundations.map((foundation) => {
            const { x, y } = convertCoords(foundation.lat, foundation.lng);
            return (
              <Tooltip key={foundation.slug}>
                <TooltipTrigger asChild>
                  <a href={`/foundations/${foundation.slug}`} className="cursor-pointer group">
                    <circle
                      cx={x}
                      cy={y}
                      r={6}
                      fill="hsl(var(--primary))"
                      className="transition-all group-hover:fill-accent group-hover:r-8"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r={10}
                      fill="hsl(var(--primary))"
                      opacity="0.3"
                      className="transition-all group-hover:r-12"
                    />
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
        </svg>
      </div>
    </TooltipProvider>
  );
}
