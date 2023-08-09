'use server';
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { headers } from "next/headers";
import Header from "@/app/components/Header";
import ProductosPorCategoria from "@/app/ProductosPorCategoria";

async function BusquedaPage({ params }: { params: { id: number } }) {

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


    let { data: productos, error } = await supabase
        .from('productos')
        .select('nombre')
        .match({ tienda_id: tiendaData.id })

    console.log(productos);



    const navigateToDetails = (idProducto: number) => {
        console.log('Navegando a...', idProducto)
    }


    if (!tiendaData) return <h1>Se produjo un error</h1>

    return (
        <>
            <h1>
                {tiendaData.nombre}
            </h1>
        </>
    );
}

export default BusquedaPage;