import { getTiendaInfo } from "@/app/(tienda)/[slug]/(infoTienda)/layout";
import EditarProductoWrapper from "@/app/components/editar-producto/EditarProductoWrapper";
import { createClient } from "@/supabase/server";

interface PageProps {
    params: { id: string; slug: string };
}

export default async function EditarProductoPage({ params }: PageProps) {
    const tiendaInfo = await getTiendaInfo(params.slug);

    if (!tiendaInfo) {
        return <div>Tienda no encontrada</div>;
    }

    async function getProductoData() {
        const supabase = createClient();
        const { data, error } = await supabase.rpc(
            "obtener_producto_por_id_o_url",
            {
                tienda_url_param: params.slug,
                producto_id_param: params.id,
            }
        );
        if (error) {
            console.error(error);
        }
        return data;
    }

    const res = await getProductoData();
    const producto = res[0];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                Editando producto: {producto?.nombre}
            </h1>
            <EditarProductoWrapper
                tienda={tiendaInfo}
                tiendaSlug={params.slug}
                producto={producto}
            />
        </div>
    );
}
