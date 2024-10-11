"use server";
import Header from "../../../components/Header";
import { cache } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CarritoProvider from "../../../components/CarritoProvider";
import { Toaster } from "@/components/ui/toaster";
import { ITienda } from "@/lib/interfaces/ITienda";
import TiendaFooter from "@/app/components/footer/TiendaFooter";

const createServerClient = cache(() => {
    const cookieStore = cookies();
    return createServerComponentClient({
        cookies: () => cookieStore,
    });
});

const getTiendaInfo = cache(async (urlTienda: string) => {
    const supabase = createServerClient();
    const { data: tienda, error } = await supabase
        .from("tiendas")
        .select()
        .eq("url", urlTienda)
        .single();
    return tienda as ITienda;
});

const getCategoriasInfo = cache(async (idTienda: number) => {
    const supabase = createServerClient();
    const { data, error } = await supabase.rpc("obtener_categorias_de_tienda", {
        tienda_id: idTienda,
    });
    if (error) {
        console.log("Error getCategoras: ", error);
    }
    return data;
});

export { createServerClient, getTiendaInfo, getCategoriasInfo };

export default async function Layout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { slug: string };
}) {
    const tienda = await getTiendaInfo(params.slug);
    const categorias = await getCategoriasInfo(tienda.id);

    return (
        <>
            <Header tienda={tienda} categorias={categorias} />
            <CarritoProvider>
                {children}
                <Toaster />
            </CarritoProvider>
            <TiendaFooter tienda={tienda} />
        </>
    );
}
