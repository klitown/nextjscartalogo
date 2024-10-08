import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./supabase/middleware";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = await updateSession(req);

    const { session, tienda } = await getSessionAndTienda(supabase);

    // Check if the request is for a dashboard
    const dashboardRegex = /^\/([^\/]+)\/dashboard/;
    const match = req.nextUrl.pathname.match(dashboardRegex);

    if (match) {
        const requestedTiendaUrl = match[1];

        // If there's no session, redirect to login
        if (!session) {
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // If the user doesn't have a tienda, redirect to registrar
        if (!tienda) {
            return NextResponse.redirect(new URL("/registrar", req.url));
        }

        // If the user is trying to access a dashboard that's not theirs, redirect to their own dashboard
        if (requestedTiendaUrl !== tienda.url) {
            return NextResponse.redirect(
                new URL(`/${tienda.url}/dashboard`, req.url)
            );
        }

        // If everything is okay, allow access to the dashboard
        return NextResponse.next();
    }

    // Handle other routes
    switch (req.nextUrl.pathname) {
        case "/registrar":
            return handleRegistrarPage(req, session, tienda);
        case "/login":
            return handleLoginPage(req, session, tienda);
        default:
            return res;
    }
}

async function getSessionAndTienda(supabase: any) {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    let tienda = null;

    if (session) {
        const { data } = await supabase
            .from("tiendas")
            .select("url")
            .eq("user_id", session.user.id)
            .single();
        tienda = data;
    }

    return { session, tienda };
}

function handleRegistrarPage(req: NextRequest, session: any, tienda: any) {
    if (session) {
        if (tienda) {
            return NextResponse.redirect(
                new URL(`/${tienda.url}/dashboard`, req.url)
            );
        }
    } else {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

function handleLoginPage(req: NextRequest, session: any, tienda: any) {
    if (session) {
        if (tienda) {
            // If the user already has a tienda, redirect to their dashboard
            return NextResponse.redirect(
                new URL(`/${tienda.url}/dashboard`, req.url)
            );
        } else {
            // If the user is logged in but doesn't have a tienda, redirect to "registrar" page
            return NextResponse.redirect(new URL("/registrar", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/registrar",
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
