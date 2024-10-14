import { getTiendaInfo } from "@/app/(tienda)/[slug]/(infoTienda)/layout";
import SubirProductoWrapper from "@/app/components/subir-producto/SubirProductoWrapper";

interface PageProps {
    params: { slug: string };
}

export default async function AgregarProductoPage({ params }: PageProps) {
    const tiendaInfo = await getTiendaInfo(params.slug);

    if (!tiendaInfo) {
        return <div>Tienda no encontrada</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Agregar Nuevo Producto</h1>
            <SubirProductoWrapper
                tienda={tiendaInfo}
                tiendaSlug={params.slug}
            />
        </div>
    );
}
