import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

export function Footer() {
    return (
        <footer className="border-t w-full bg-card text-card-foreground">
            <div className="container mx-auto py-8 px-4 md:px-6">

                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="flex items-center gap-4">
                         <Avatar className="w-16 h-16">
                            <AvatarImage src="https://placehold.co/100x100.png" alt="Ihan Fuentes Arroyo" data-ai-hint="profile picture" />
                            <AvatarFallback>IFA</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold text-lg font-headline">Ihan Fuentes Arroyo</p>
                            <p className="text-sm text-muted-foreground">App Creator</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm md:items-center">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <a href="mailto:aletoonx@gmail.com" className="hover:underline">aletoonx@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>+506 8377-1010</span>
                        </div>
                    </div>
                    <div className="flex justify-center md:justify-end gap-4">
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4" prefetch={false}>
                            Privacy
                        </Link>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="text-center text-sm text-muted-foreground">
                    <p>&copy; 2024 Eco Explorer. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}