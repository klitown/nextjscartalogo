"use server";
import Header from "../../../components/Header";
import { cache } from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import CarritoProvider from "../../../components/CarritoProvider";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import { ITienda } from "@/lib/interfaces/ITienda";

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
            <hr className="my-10" />

            <footer className="bg-gray-50 mt-5">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex justify-center text-teal-600 sm:justify-start">
                            <Image
                                src={"/bspy.png"}
                                alt="Logo de cartalogo"
                                width={200}
                                height={200}
                            />
                        </div>

                        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                            Copyright &copy; 2024 - 🇵🇾
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
