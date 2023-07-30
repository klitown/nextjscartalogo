import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MasBuscados from "../MasBuscados";

export default async function Page({ params }: { params: { slug: string } }) {

    const supabase = createServerComponentClient({ cookies });
    let urlPortada = '';
    const { data: tienda } = await supabase
        .from("tiendas")
        .select()
        .eq("url", params.slug);
    console.log('Tienda:', tienda);
    urlPortada = tienda![0].imagen_portada;

    let { data: productos } = await supabase
        .from("productos")
        .select()
        .match({ tienda_id: tienda![0].id })
    console.log('Productos:', productos);

    const saveImagenes = (imagenes: any) => {
        const productosConImagenes = productos!.map((producto) => {
            const imagenesProducto = imagenes.filter((imagen: any) => imagen.producto_id === producto.id);
            return { ...producto, imagenes: imagenesProducto };
        });
        console.log('Final ', productosConImagenes);
        productos = productosConImagenes
    }

    if (productos!.length >= 1) {
        const idsProductos: any = productos?.map((producto) => producto.id);
        const { data: imagenes } = await supabase
            .from('imagenes')
            .select()
            .in('producto_id', idsProductos);
        saveImagenes(imagenes);
    }


    /*********
    UI SECTION
    UI SECTION
    UI SECTION 
    ***********/

    if (tienda?.length === 0 || productos?.length === 0) return <h1>Sin datos</h1>

    return (
        <div className="container mx-auto">

            <section
                className="relative h-[60vh] rounded-xl border-none mt-5 mx-5
                bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] 
                bg-cover bg-center bg-no-repeat"
            >
                <div
                    className="relative px-4 flex justify-center items-center h-full"
                >
                    {/* <div
                        className="absolute inset-0 bg-white/75  from-white/95 to-white/25"
                    ></div> */}
                    <div className="max-w-xl p-5 rounded-xl backdrop-blur-sm bg-white/75">
                        <h1 className="text-4xl text-black font-extrabold sm:text-5xl text-center">
                            {tienda![0].nombre}
                        </h1>

                        <p className="mt-4 max-w-lg text-black font-medium text-lg sm:text-xl/relaxed">
                            {tienda![0].descripcion}
                        </p>
                    </div>
                </div>
            </section>

            <MasBuscados productos={productos!} data-superjson />

        </div>

    )
}