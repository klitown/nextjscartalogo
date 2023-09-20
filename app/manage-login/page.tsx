import { createServerClient } from "../(tienda)/[slug]/(infoTienda)/layout";
import { redirect } from 'next/navigation';

export default async function Page({ params, searchParams }: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const { code } = searchParams;

    const supabase = createServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (code && user) {
        console.log('code: ', code);
        redirect(`https://cartalogo.digital/${user.id}`)
    } else {
        console.log('user', user);
        console.log('code', code);
        redirect('https://cartalogo.digital/nicolas')
    }

    return (
        <h1>asd</h1>
    )
}