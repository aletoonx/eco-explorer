import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export function ExtinctionInfo() {
  return (
    <Card className="bg-muted/30">
        <CardHeader>
            <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-destructive" />
                <CardTitle className="font-headline text-2xl">El Peligro de la Extinción en Costa Rica</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
             <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">Principales Causas</AccordionTrigger>
                    <AccordionContent className="text-base space-y-2 pt-2">
                        <p><strong>Pérdida de Hábitat:</strong> La deforestación para la agricultura, la ganadería y el desarrollo urbano destruye los hogares de innumerables especies, fragmentando sus poblaciones y limitando su acceso a alimentos y refugio.</p>
                        <p><strong>Contaminación:</strong> Los pesticidas agrícolas, los desechos plásticos en los océanos y la contaminación de los ríos afectan directamente la salud de los animales y la calidad de sus ecosistemas.</p>
                        <p><strong>Caza y Comercio Ilegal:</strong> La caza furtiva para obtener pieles, plumas o para el mercado de mascotas exóticas sigue siendo una amenaza directa para especies icónicas como el jaguar y las lapas.</p>
                        <p><strong>Cambio Climático:</strong> El aumento de las temperaturas y los cambios en los patrones de lluvia alteran los hábitats, afectando la disponibilidad de alimentos y los ciclos de reproducción de muchas especies.</p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold text-lg hover:no-underline">Graves Consecuencias</AccordionTrigger>
                    <AccordionContent className="text-base space-y-2 pt-2">
                        <p><strong>Desequilibrio Ecológico:</strong> Cada especie cumple un rol en su ecosistema. La desaparición de un depredador, un polinizador o una especie clave puede causar un efecto dominó que desestabiliza toda la cadena alimenticia.</p>
                        <p><strong>Pérdida de Biodiversidad Genética:</strong> La biodiversidad es una "biblioteca" genética invaluable. Perder especies significa perder para siempre soluciones potenciales a problemas médicos y ambientales.</p>
                        <p><strong>Impacto en el Ecoturismo:</strong> La rica vida silvestre de Costa Rica es su mayor atractivo. La disminución de especies visibles podría afectar negativamente la economía local que depende del turismo.</p>
                        <p><strong>Pérdida de Patrimonio Natural:</strong> Los animales emblemáticos son parte de la identidad cultural y el patrimonio natural del país. Su extinción representa una pérdida irreparable para las futuras generaciones.</p>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </CardContent>
    </Card>
  )
}
