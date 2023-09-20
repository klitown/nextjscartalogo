import { createServerClient } from "../(tienda)/[slug]/(infoTienda)/layout";

export default async function Page({ params, searchParams }: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const { code } = searchParams;

    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (code && user) {
        console.log('code: ', code);
        window.location.href = 'https://cartalogo.digital/nicolas';
    } else {
        window.location.href = 'https://cartalogo.digital/login';
    }

    return (
        <h1>asd</h1>
    )
}