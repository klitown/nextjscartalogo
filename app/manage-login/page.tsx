"use client"

import { useEffect, useState } from "react";
import { createServerClient } from "../(tienda)/[slug]/(infoTienda)/layout";
import { redirect } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Page({ params, searchParams }: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const [user, setUser] = useState<any>();
    const { code } = searchParams;

    useEffect(() => {
        getInitialData();
    }, []);

    const getInitialData = async () => {
        const supabase = createClientComponentClient();
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
    }

    return (
        <>
            {JSON.stringify(user, null, 0)}
        </>
    )
}