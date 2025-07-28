import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t w-full bg-card">
            <div className="container mx-auto py-8 px-4 md:px-6">
                <div className="border-t pt-4 text-center text-sm text-muted-foreground">
                    <p>&copy; 2024 Eco Explorer. All rights reserved.</p>
                    <nav className="flex gap-4 justify-center mt-2">
                        <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                            Terms of Service
                        </Link>
                        <Link href="#" className="text-sm hover:underline underline-offset-4" prefetch={false}>
                            Privacy
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
}
