

import { createServerClient } from "../(tienda)/[slug]/(infoTienda)/layout";
import { redirect } from 'next/navigation';

export default async function Page({ params, searchParams }: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const { code } = searchParams;

    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    let tienda: any;

    const getUserStore = async () => {
        if (!session) {
            console.error('No session');
            return
        }
        const { data, error } = await supabase.rpc("get_store_by_user_id", {
            user_id: session!.user.id
        });
        if (error) {
            console.error("Error al llamar a la función almacenada:", error);
            return
        } else {
            console.log("Tienda obtenida:", data);
        }
        return data
    };

    if (code) {
        console.log('code: ', code);
        tienda = getUserStore();
        redirect(`https://cartalogo.digital/${tienda.url}`)
    } else {
        redirect('https://cartalogo.digital/holaquetal')
    }

    return (
        <>
            {tienda}
        </>
    )
}