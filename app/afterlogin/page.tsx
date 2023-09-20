import { createServerClient } from "../(tienda)/[slug]/(infoTienda)/layout";

export default async function Page({ params }: { params: { slug: string } }) {

    async function getProductosData() {
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc('obtener_productos_con_imagenes', {
            tienda_url: params.slug
        });
        return data
    }

    return (


        <h1>asd</h1>


    )
}