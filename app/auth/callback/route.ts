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
        const { data, error } = await supabase.rpc("tienda_by_user_id", {
            user_id: activeSession.session?.user.id
        });
        console.log("Data acá: ", data);
        console.log("Error acá: ", error);
        return NextResponse.redirect(`/${data.url}`)
    }

    // URL to redirect to after sign in process completes
    return NextResponse.redirect(requestUrl.origin)
}