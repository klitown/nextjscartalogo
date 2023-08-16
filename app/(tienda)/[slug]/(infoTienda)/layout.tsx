"use server"
import Header from '../../../components/Header';
import { cache } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import CarritoProvider from '../../../components/Test';

const createServerClient = cache(() => {
    const cookieStore = cookies()
    return createServerComponentClient({
        cookies: () => cookieStore
    })
});
const getTiendaInfo = cache(async (urlTienda: string) => {
    const supabase = createServerClient();
    const { data: tienda } = await supabase
        .from("tiendas")
        .select()
        .eq("url", urlTienda)
        .single();
    return tienda
});
const getCategoriasInfo = cache(async (idTienda: number) => {
    const supabase = createServerClient();
    const { data, error } = await supabase.rpc('obtener_categorias_de_tienda', {
        tienda_id: idTienda
    });
    return data
});


export { createServerClient, getTiendaInfo, getCategoriasInfo }

export default async function Layout({ children }: { children: React.ReactNode }) {

    const tienda = await getTiendaInfo('nicolas-nicolas');
    const categorias = await getCategoriasInfo(tienda.id);

    return (
        <>
            <Header tienda={tienda} categorias={categorias} />
            <CarritoProvider>
                {children}
            </CarritoProvider>
        </>
    );
}