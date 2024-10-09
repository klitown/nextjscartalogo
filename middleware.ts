import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./supabase/middleware";

// New function to check if a user is an admin
async function isAdmin(supabase: any, userId: string) {
    const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

    if (error) {
        console.error("Error checking admin status:", error);
        return false;
    }

    return data?.role === "admin";
}

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = await updateSession(req);

    const { session, tienda, isAdminUser } = await getSessionAndTienda(
        supabase
    );

    // Check if the request is for a dashboard
    const dashboardRegex = /^\/([^\/]+)\/dashboard/;
    const match = req.nextUrl.pathname.match(dashboardRegex);

    // New check for admin dashboard
    if (req.nextUrl.pathname === "/admin/dashboard") {
        if (!session) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        if (!isAdminUser) {
            return NextResponse.redirect(new URL("/", req.url));
        }
        return NextResponse.next();
    }

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

// Updated function to include admin check
async function getSessionAndTienda(supabase: any) {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    let tienda = null;
    let isAdminUser = false; // New variable to store admin status

    if (session) {
        const { data } = await supabase
            .from("tiendas")
            .select("url")
            .eq("user_id", session.user.id)
            .single();
        tienda = data;
        isAdminUser = await isAdmin(supabase, session.user.id); // Check if user is admin
    }

    return { session, tienda, isAdminUser }; // Return admin status along with session and tienda
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
        "/admin/dashboard", // New matcher for admin dashboard
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
