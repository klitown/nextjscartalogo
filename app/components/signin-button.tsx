"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function SignInButton() {
    const pathname = usePathname();

    return pathname !== "/login" ? (
        <Link
            href="/signin"
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
        >
            Ingresar
        </Link>
    ) : null;
}
