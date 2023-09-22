import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabase = createRouteHandlerClient<any>({ cookies })
        await supabase.auth.exchangeCodeForSession(code)
        const { data: activeSession } = await supabase.auth.getSession();
        const { data: tienda, error } = await supabase.rpc("get_store_by_user_id", {
            user_id: activeSession.session?.user.id
        });
        console.log("Data tienda acá: ", tienda);
        if (error) {
            console.log("Error acá: ", error);
            return NextResponse.redirect(requestUrl.origin);
        }
        if (!tienda) {
            return NextResponse.redirect(`${requestUrl.origin}/registrar`)
        }
        return NextResponse.redirect(`${requestUrl.origin}/${tienda.url}/dashboard`)
    }

    return NextResponse.redirect(requestUrl.origin)

}