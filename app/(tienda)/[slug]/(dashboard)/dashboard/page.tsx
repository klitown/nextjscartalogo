"use client";

import { useUser } from "@/app/hooks/user-user";
import Link from "next/link";
import { createClient } from "@/supabase/client";
import { useEffect, useState } from "react";

function Dashboard({ params }: { params: { slug: string } }) {
    const { loading, error, user, role } = useUser();
    const [totalProducts, setTotalProducts] = useState<number | undefined>(
        undefined
    );

    const supabase = createClient();

    useEffect(() => {
        if (user) {
            getTotalProducts();
        }
    }, [user]);

    const getTotalProducts = async () => {
        if (!user?.id) return;

        // First, get the tienda_id for the user
        const { data: tiendaData, error: tiendaError } = await supabase
            .from("tiendas")
            .select("id")
            .eq("user_id", user.id)
            .single();

        if (tiendaError) {
            console.error("Error fetching tienda:", tiendaError);
            return;
        }

        if (!tiendaData) {
            console.log("No tienda found for this user");
            setTotalProducts(0);
            return;
        }

        // Now, count the products for this tienda
        const { count, error: productError } = await supabase
            .from("productos")
            .select("*", { count: "exact", head: true })
            .eq("tienda_id", tiendaData.id);

        if (productError) {
            console.error("Error fetching product count:", productError);
            return;
        }

        setTotalProducts(count || 0);
    };

    if (!user) return <div>Loading..</div>;

    return (
        <>
            <div className="flex min-h-screen">
                <div className="basis-full">
                    <div className="container mx-auto p-4">
                        <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 -mt-5">
                            <p className="text-2xl font-bold text-gray-900 sm:text-3xl">
                                ¡Bienvenido, {user.user_metadata.name}!
                            </p>
                            <a
                                href={`https://bspy.com.py/${params.slug}`}
                                target="_blank"
                                className="bg-blue-500 rounded-xl px-3 py-2 text-white hover:bg-blue-700"
                            >
                                Ver mi tienda
                            </a>
                        </div>
                        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 mt-10">
                            <Link
                                href={`http://localhost:3001/${params.slug}/dashboard/misproductos`}
                                className="h-32 bg-white shadow-md rounded-lg border border-gray-200 p-3 flex flex-col justify-evenly"
                            >
                                <div className="flex flex-row justify-between text-xl font-bold hover:text-blue-500">
                                    Ver mis productos
                                </div>
                                <h4 className="text-3xl font-bold text-black">
                                    {totalProducts}
                                </h4>
                                <h5 className="text-sm font-light">
                                    productos cargados
                                </h5>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
