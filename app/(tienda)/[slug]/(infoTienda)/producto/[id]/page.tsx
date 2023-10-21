import DetalleProducto from "@/app/components/DetalleProducto";
import { createServerClient } from "../../layout";
import { Metadata } from "next";

type Props = {
    params: { slug: string };
};

export const generateMetadata = ({ params }: Props): Metadata => {
    return {
        title: `Viendo producto - ${params.slug} - Cartalogo`,
        description: `Vista la tienda ${params.slug} - Cartalogo`
    };
};

export default async function Page({ params }: { params: { slug: string, id: string } }) {

    async function getProductoData() {
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc('obtener_producto_por_id_y_url', {
            tienda_url_param: params.slug,
            producto_id_param: params.id
        });
        return data
    }

    const res = await getProductoData();
    const producto = res[0];

    return (
        <DetalleProducto producto={producto} tiendaUrl={params.slug} />
    );
}

