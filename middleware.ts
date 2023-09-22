import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
        console.log("Ya existe usuario");
        return NextResponse.redirect(new URL('/holaquetal', req.url))
    }

    if (!user) {
        console.log("No existe usuario");
        return NextResponse.redirect(new URL('/quetalhola', req.url))
    }

    return res
}

export const config = {
    matcher: ['/', '/login'],
}