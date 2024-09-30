"use client";

import { useRouter } from "next/navigation";

import { createClient } from "@/supabase/client";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
    const supabase = createClient();
    const router = useRouter();

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    }

    return (
        <Button className="w-full" onClick={handleLogout}>
            Cerrar sesión
        </Button>
    );
}
