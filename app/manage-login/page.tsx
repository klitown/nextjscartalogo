import { createServerClient } from "../(tienda)/[slug]/(infoTienda)/layout";
import { redirect } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Page({ params, searchParams }: {
    params: { slug: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const { code } = searchParams;
    let user: any;
    const getInitialData = async () => {
        const supabase = createServerClient();
        const { data } = await supabase.auth.getUser();
        console.log('data: ', data);
        return data
    }

    user = getInitialData()

    return (
        <>
            {JSON.stringify(user, null, 0)}
        </>
    )
}