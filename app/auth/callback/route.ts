import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    if (code) {
        const supabase = createClient();

        // Exchange the code for a session
        const { data, error } = await supabase.auth.exchangeCodeForSession(
            code
        );

        if (!error && data.session) {
            // Get the user's id from the session
            const userId = data.session.user.id;

            // Query the tiendas table to get the tienda for this user
            const { data: tienda, error: tiendaError } = await supabase
                .from("tiendas")
                .select("url")
                .eq("user_id", userId)
                .single();

            if (!tiendaError && tienda) {
                // Redirect to the tienda's dashboard
                return NextResponse.redirect(
                    //@ts-ignore
                    `${origin}/${tienda.url}/dashboard`
                );
            } else {
                // If no tienda found, redirect to a default page
                return NextResponse.redirect(`${origin}/registrar`);
            }
        }
    }

    // If there's no code or an error occurred, redirect to an error page
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
