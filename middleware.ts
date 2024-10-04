import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./supabase/middleware";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = await updateSession(req);

    // Check if we're on the registrar page
    if (req.nextUrl.pathname === "/registrar") {
        // Check if the user is authenticated
        const {
            data: { session },
        } = await supabase.auth.getSession();

        if (session) {
            const userId = session.user.id;

            // Check if the user already has a tienda
            const { data: tienda } = await supabase
                .from("tiendas")
                .select("url")
                .eq("user_id", userId)
                .single();

            if (tienda) {
                // If the user already has a tienda, redirect them to their dashboard
                return NextResponse.redirect(
                    new URL(`/${tienda.url}/dashboard`, req.url)
                );
            }
        } else {
            // If the user is not authenticated, redirect them to the login page
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return res;
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/registrar",
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
