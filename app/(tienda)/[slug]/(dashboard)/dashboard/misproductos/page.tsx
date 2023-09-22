import Image from "next/image";
import { createServerClient, getTiendaInfo } from "../../../(infoTienda)/layout";
import SubirProducto from "@/app/components/SubirProducto";


async function Page({ params }: { params: { slug: string } }) {

    async function getProductosData() {
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc('obtener_productos_con_imagenes', {
            tienda_url: params.slug
        });
        return data
    }

    let productos = await getProductosData();
    const tienda = await getTiendaInfo(params.slug);

    const renovarProductos = async () => {
        "use server"
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc('obtener_productos_con_imagenes', {
            tienda_url: params.slug
        });
        productos = data;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold tracking-wide my-4">
                Listado de productos
            </h1>
            <input placeholder="Buscar producto" className="border border-gray-100 rounded-xl p-4 w-full md:w-1/3 my-4" />
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                {
                    productos.map((producto: any) => (
                        <div key={producto.id} className="overflow-hidden border border-gray-200 p-3">
                            <div className="h-[350px] w-full object-cover sm:h-[450px] relative rounded-xl">
                                <Image src={producto.imagenes.length >= 1 ? producto.imagenes[0]
                                    : 'https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/cartalogo_imagenes/cartalogo/646051.png'}
                                    alt="Imagen del producto" fill={true}
                                    style={{ borderRadius: '1rem' }}
                                />
                            </div>
                            <div className="mt-3 flex justify-between">
                                <div>
                                    <h3
                                        className="text-gray-900 text-3xl font-bold group-hover:underline group-hover:underline-offset-4"
                                    >
                                        {producto.nombre}
                                    </h3>

                                    <p className="mt-1.5 max-w-[45ch] text-lg text-gray-500">
                                        {producto.descripcion}
                                    </p>
                                </div>

                                <p className="text-gray-900">
                                    Gs. {parseInt(`${producto.price}`, 10).toLocaleString("es-ES")}
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>

            <SubirProducto tienda={tienda} renovarProductos={renovarProductos} />

        </div>
    );
}
export default Page