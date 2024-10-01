import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { getUserRole } from "@/lib/get-user-role";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    // Create a Supabase client
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Get the current user from Supabase
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Get the user's role using the custom getUserRole function
    const role = await getUserRole();

    // Retrieve the current session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        const userId = session.user.id;

        // Query the tiendas table to get the tienda for this user
        const { data: tienda, error } = await supabase
            .from("tiendas")
            .select("nombre")
            .eq("user_id", userId)
            .single();

        if (error) {
            // Get the full origin (protocol + host) of the current request
            const origin = request.nextUrl.origin;

            // Construct the full URL for redirection
            const redirectUrl = `${origin}/`;

            // Redirect to the home page
            return NextResponse.redirect(redirectUrl);
        }
        if (tienda) {
            // Redirect to the tienda's dashboard
            const url = new URL(`/${tienda.nombre}/dashboard`, request.url);
            return NextResponse.redirect(url);
        } else {
            // Redirect to the regustrar dashboard
            const url = new URL(`/registrar`, request.url);
            return NextResponse.redirect(url);
        }
        return NextResponse.next();
    }

    // Redirect non-admin users trying to access admin pages to the home page
    if (
        user &&
        role !== "admin" &&
        request.nextUrl.pathname.startsWith("/admin")
    ) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    // Redirect unauthenticated users to sign-in page
    if (!user && !request.nextUrl.pathname.startsWith("/login")) {
        const url = request.nextUrl.clone();
        url.pathname = "/signin";
        url.searchParams.set("next", request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    // Redirect authenticated users attempting to access the sign-in page to the home page
    if (user && request.nextUrl.pathname.startsWith("/signin")) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
