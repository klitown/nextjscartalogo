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
        console.log('data: ', data);
        setUser(data.user);
        getUserStore(data.user!.id)
    }

    const getUserStore = async (user_id: string) => {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase.rpc("tienda_by_user_id", { user_id });
        if (error) {
            console.error("Error al llamar a la función almacenada:", error);
            console.error("User aca: ", user!.id)
            return
        } else {
            console.log("Tienda obtenida:", data);
            if (code && user) {
                redirect(`https://cartalogo.digital/${data.url}`)
            } else {
                console.log('asdsad')
            }
        }
    };

    return (
        <>
            {JSON.stringify(user, null, 0)}
        </>
    )
}