import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

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

    // Retrieve the current session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (session) {
        const userId = session.user.id;

        // Query the tiendas table to get the tienda for this user
        const { data: tienda } = await supabase
            .from("tiendas")
            .select("nombre")
            .eq("user_id", userId)
            .single();

        if (tienda) {
            // Redirect to the tienda's dashboard
            const url = new URL(`/${tienda.nombre}/dashboard`, request.url);
            return NextResponse.redirect(url);
        }

        // Redirect to the registrar dashboard
        const url = new URL(`/registrar`, request.url);
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
