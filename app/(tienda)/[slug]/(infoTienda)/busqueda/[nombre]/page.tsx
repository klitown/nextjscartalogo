'use server';
import ProductCard from "@/app/components/ProductCard";
import { createServerClient } from "../../layout";
import { cache } from "react";

async function BusquedaPage({ params }: { params: { nombre: string, slug: string } }) {

    let nombreProducto = params.nombre;
    nombreProducto = nombreProducto.replace(/%20/g, ' ');

    const getProductosPorNombre = cache(async () => {
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc('obtener_productos_con_imagenes_por_nombre', {
            tienda_url: params.slug,
            nombre_producto: nombreProducto
        });
        return data
    });

    const productos = await getProductosPorNombre();
    console.log('sadsadsadsad', productos)

    const navigateToDetails = (idProducto: number) => {
        console.log('Navegando a...', idProducto)
    }

    return (
        <div className="container mx-auto">
            <div className='flex flex-col justify-center items-start px-3 my-10'>
                <h3 className="m-0 font-bold text-2xl">
                    Resultados de la búsqueda
                </h3>
            </div>
            {
                productos?.length >= 1 ?
                    <div className="flex flex-row flex-wrap gap-10">
                        {
                            productos?.map((producto: any) => (
                                <div key={producto.id}>
                                    <ProductCard producto={producto} key={producto.id} data-superjson />
                                </div>
                            ))
                        }
                    </div>
                    : <h2 className="mx-auto p-5">No se encontraron productos que coincidan con tu búsqueda😓</h2>
            }
        </div>
    );
}

export default BusquedaPage;