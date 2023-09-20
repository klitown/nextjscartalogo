import { createServerClient } from "../(tienda)/[slug]/(infoTienda)/layout";
import { redirect } from 'next/navigation';

export default async function Page({ params, searchParams }: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const { code } = searchParams;

    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    let tienda: any;

    const getUserStore = async (user_id: string) => {
        const { data, error } = await supabase.rpc("tienda_by_user_id", { user_id });

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
        tienda = getUserStore('0708e5f4-aa43-4459-be0f-ad5c599cda89');
        //redirect(`https://cartalogo.digital/${tienda.url}`)
    } else {
        //redirect('https://cartalogo.digital/login')
    }

    return (
        <>
            {tienda ? tienda : 'sin tienda'}
        </>
    )
}