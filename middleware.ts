import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { updateSession } from "./supabase/middleware";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    await supabase.auth.getSession();
    await updateSession(req);
    return res;
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/protected",
        "/signin",
        "/admin/:path*",
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
