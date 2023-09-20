import { createServerClient } from "../(tienda)/[slug]/(infoTienda)/layout";
import { redirect } from 'next/navigation';

export default async function Page({ params, searchParams }: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const { code } = searchParams;

    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

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

    if (code && user) {
        console.log('code: ', code);
        const tienda: any = getUserStore(user.id);
        redirect(`https://cartalogo.digital/${tienda.url}`)
    } else {
        console.log('user', user);
        console.log('code', code);
        redirect('https://cartalogo.digital/login')
    }

    return (
        <h1>asd</h1>
    )
}