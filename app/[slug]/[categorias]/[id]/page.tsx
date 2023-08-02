'use server';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers } from "next/headers";
import Header from "@/app/components/Header";
import ProductCard from "@/app/ProductCard";
import ProductosPorCategoria from "@/app/ProductosPorCategoria";

async function CategoriasPage({ params }: { params: { id: number } }) {

    const supabase = createServerComponentClient({ cookies });
    const headersList = headers();
    const tiendaUrl = headersList.get("x-invoke-path")?.split("/")[1]
        ? headersList.get("x-invoke-path")?.split("/")[1]
        : 'https://cartalogo.digital';

    const { data: tiendaData } = await supabase
        .from("tiendas")
        .select()
        .eq("url", tiendaUrl)
        .single();

    let { data: productosByCategoria } = await supabase
        .from("productos")
        .select()
        .match({ tienda_id: tiendaData.id })
        .eq("categoria_id", params.id);

    const categoryIds: number[] = productosByCategoria?.map((producto) => producto.categoria_id) as number[];
    const categorias = await supabase
        .from('categorias')
        .select('*')
        .in('id', categoryIds) as unknown as Array<{ codigo: string, descripcion: string, id: number, nombre: string }>

    const saveImagenes = (imagenes: any) => {
        const productosConImagenes = productosByCategoria!.map((producto) => {
            const imagenesProducto = imagenes.filter((imagen: any) => imagen.producto_id === producto.id);
            return { ...producto, imagenes: imagenesProducto };
        });
        productosByCategoria = productosConImagenes
    }

    if (productosByCategoria!.length >= 1) {
        const idsProductos: any = productosByCategoria?.map((producto) => producto.id);
        const { data: imagenes } = await supabase
            .from('imagenes')
            .select()
            .in('producto_id', idsProductos);
        saveImagenes(imagenes);
    }

    const navigateToDetails = (idProducto: number) => {
        console.log('Navegando a...', idProducto)
    }


    if (!productosByCategoria) return <h1>Se produjo un error</h1>

    return (
        <>
            {/* @ts-ignore */}
            <Header tiendaData={tiendaData} categorias={categorias.data!} data-superjson />
            {/* <ToastDemo visible={openToast} /> */}
            <div className="p-10">
                <div className='flex flex-col justify-center items-start px-3 mt-10'>
                    <h5 className="m-0 font-light">Mostrando todos los productos de la categoría</h5>
                    <h1 className="font-bold text-5xl mt-2 font-worksans text-black">
                        {/* @ts-ignore */}
                        {categorias.data.find((categoria) => categoria.id == params.id)?.nombre}
                    </h1>
                </div>

                <div className="flex flex-wrap flex-col md:flex-row gap-9 my-8">
                    <ProductosPorCategoria productos={productosByCategoria} />
                </div>
            </div>

        </>
    );
}

export default CategoriasPage;