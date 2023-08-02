import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import MasBuscados from "../MasBuscados";
import Portada from "../components/Portada";
import Header from "../components/Header";

export default async function Page({ params }: { params: { slug: string } }) {

    const supabase = createServerComponentClient({ cookies });

    const { data: tienda } = await supabase
        .from("tiendas")
        .select()
        .eq("url", params.slug);
    console.log('Tienda:', tienda);

    let { data: productos } = await supabase
        .from("productos")
        .select()
        .match({ tienda_id: tienda![0].id })

    const categoryIds: number[] = productos?.map((producto) => producto.categoria_id) as number[];
    const categorias = await supabase
        .from('categorias')
        .select('*')
        .in('id', categoryIds) as unknown as Array<{ codigo: string, descripcion: string, id: number, nombre: string }>

    const saveImagenes = (imagenes: any) => {
        const productosConImagenes = productos!.map((producto) => {
            const imagenesProducto = imagenes.filter((imagen: any) => imagen.producto_id === producto.id);
            return { ...producto, imagenes: imagenesProducto };
        });
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
    if (!categorias) return <h1>Ocurrió un error</h1>

    return (
        <div className="container mx-auto">
            {/* @ts-ignore */}
            <Header categorias={categorias.data!}
                tiendaData={tienda![0]}
                data-superjson
            />
            <Portada
                tiendaNombre={tienda![0].nombre}
                tiendaDescripcion={tienda![0].descripcion}
                urlPortada={tienda![0].imagen_portada}
                data-superjson
            />
            <MasBuscados productos={productos!} data-superjson />
        </div>

    )
}