import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t w-full bg-card">
            <div className="container mx-auto py-8 px-4 md:px-6 grid md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-4 text-center md:text-left">
                    <div>
                        <p className="text-sm text-muted-foreground">&copy; 2024 Eco Explorer. All rights reserved.</p>
                        <nav className="flex gap-4 justify-center md:justify-start mt-2">
                            <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                                Terms of Service
                            </Link>
                            <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                                Privacy
                            </Link>
                        </nav>
                    </div>
                     <div className="flex flex-col items-center md:items-start gap-2 text-sm">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <a href="mailto:aletoonx@gmail.com" className="hover:underline">aletoonx@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>+506 8377-1010</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center md:items-end gap-4">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src="https://placehold.co/100x100.png" alt="Ihan Fuentes Arroyo" data-ai-hint="profile picture" />
                        <AvatarFallback>IFA</AvatarFallback>
                    </Avatar>
                    <div className="text-center md:text-right">
                        <p className="font-semibold">Ihan Fuentes Arroyo</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
