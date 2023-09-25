"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

function Dashboard() {

    const [user, setUser] = useState<any>();
    const [tienda, setTienda] = useState<any>();

    useEffect(() => {
        getInitialData();
    }, []);

    const getInitialData = async () => {
        const supabase = createClientComponentClient();
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
    }

    const getTienda = async () => {
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
            .from('tiendas')
            .select()
            .eq('user_id', user.id)
            .single();
        setTienda(data);
    }

    if (!user) return <h1>Loading...</h1>

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                <div className="basis-full">
                    <div className="container mx-auto p-4">
                        <div className="mb-4 -mt-5">
                            <p className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                ¡Bienvenido, {user.user_metadata.name}!
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">

                            <div className="h-32 bg-white shadow-md rounded-lg border border-gray-200 p-3 flex flex-col justify-evenly">
                                <div className="flex flex-row justify-between">
                                    <h3 className="text-xl text-gray-500">
                                        Mi tienda
                                    </h3>
                                    <h3 className="text-3xl text-gray-500">
                                        🏪
                                    </h3>
                                </div>
                                <Link href={`/${tienda.url}`} target="_blank" className="bg-blue-500 text-white rounded-xl px-3 py-2 hover:bg-blue-700">
                                    Ver mi tienda
                                </Link>
                            </div>
                            <div className="h-32 bg-white shadow-md rounded-lg border border-gray-200 p-3 flex flex-col justify-evenly">
                                <div className="flex flex-row justify-between">
                                    <h3 className="text-xl text-gray-500">
                                        Cargar productos
                                    </h3>
                                    <h3 className="text-3xl text-gray-500">
                                        📲
                                    </h3>
                                </div>
                                <Link href={`/${tienda.url}/dashboard`} target="_blank" className="bg-green-500 text-white rounded-xl px-3 py-2 hover:bg-green-700">
                                    Cargar productos
                                </Link>
                            </div>

                            {/* <div className="h-32 bg-white shadow-md rounded-lg border border-gray-200 p-3 flex flex-col justify-evenly">
                                <div className="flex flex-row justify-between">
                                    <h3 className="text-xl text-gray-500">
                                        Cantidad de visitas
                                    </h3>
                                    <h3 className="text-3xl text-gray-500">
                                        #️⃣
                                    </h3>
                                </div>
                                <h4 className="text-3xl font-bold text-black">
                                    1.340
                                </h4>
                                <h5 className="text-sm font-light">
                                    en las últimas 2 semanas
                                </h5>
                            </div>
                            <div className="h-32 bg-white shadow-md rounded-lg border border-gray-200 p-3 flex flex-col justify-evenly">
                                <div className="flex flex-row justify-between">
                                    <h3 className="text-xl text-gray-500">
                                        Total de ventas
                                    </h3>
                                    <h3 className="text-3xl text-gray-500">
                                        💰
                                    </h3>
                                </div>
                                <h4 className="text-3xl font-bold text-black">
                                    3.453.000 gs
                                </h4>
                                <h5 className="text-sm font-light">
                                    +20% desde el último mes
                                </h5>
                            </div>
                            <div className="h-32 bg-white shadow-md rounded-lg border border-gray-200 p-3 flex flex-col justify-evenly">
                                <div className="flex flex-row justify-between">
                                    <h3 className="text-xl text-gray-500">
                                        Ventas concretadas
                                    </h3>
                                    <h3 className="text-3xl text-gray-500">
                                        📲
                                    </h3>
                                </div>
                                <h4 className="text-3xl font-bold text-black">
                                    39
                                </h4>
                                <h5 className="text-sm font-light">
                                    ¡Sigue así!
                                </h5>
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </>

    );
}

export default Dashboard;