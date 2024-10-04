import { createServerClient, getCategoriasInfo, getTiendaInfo } from "./layout";

import { Metadata } from "next";
import PremiumTiendaLayout from "@/app/components/layouts/PremiumTiendaLayout";
import FreeTiendaLayout from "@/app/components/layouts/FreeTiendaLayout";
import { ITienda } from "@/lib/interfaces/ITienda";

type Props = {
    params: { slug: string };
};

export const generateMetadata = ({ params }: Props): Metadata => {
    return {
        title: `${params.slug} - BSPY`,
        description: `Vista la tienda ${params.slug} - BSPY`,
    };
};

export default async function Page({ params }: { params: { slug: string } }) {
    async function getProductosData() {
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc(
            "obtener_productos_con_imagenes",
            {
                tienda_url: params.slug,
            }
        );
        if (error) {
            console.log("Error en getProductosData: ", error);
        }
        return data;
    }
    const tienda: ITienda = await getTiendaInfo(params.slug);
    const productos = await getProductosData();
    const categorias = await getCategoriasInfo(tienda.id);

    const width = tienda.plan_id === 1 ? "w-full" : "max-w-6xl";
    const tiendaBasica = tienda.plan_id === 1;

    return (
        <div className="flex justify-center gap-4 min-h-screen">
            <div className={width}>
                <main className="px-4 sm:px-6 lg:px-0">
                    {tiendaBasica ? (
                        <FreeTiendaLayout
                            tienda={tienda}
                            productos={productos}
                            categorias={categorias}
                        />
                    ) : (
                        <PremiumTiendaLayout
                            tienda={tienda}
                            productos={productos}
                            categorias={categorias}
                        />
                    )}
                </main>
            </div>
        </div>
    );
}
