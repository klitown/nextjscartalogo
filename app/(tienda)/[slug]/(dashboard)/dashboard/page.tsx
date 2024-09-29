"use client";

import { useUser } from "@/app/hooks/user-user";
import Link from "next/link";
import { createClient } from "@/supabase/client";
import { useEffect, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";

interface DashboardCardProps {
    title: string;
    value: string;
    icon: ReactNode;
    link: string;
    external?: boolean;
}

function DashboardCard({
    title,
    value,
    icon,
    link,
    external = false,
}: DashboardCardProps) {
    return (
        <Link
            href={link}
            target={external ? "_blank" : "_self"}
            className="block w-full h-full"
        >
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white p-6 rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl h-full"
            >
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <div className="p-2 bg-gray-100 rounded-full">{icon}</div>
                </div>
                <p className="text-3xl font-bold mb-4">{value}</p>
                <div className="flex items-center text-sm font-medium text-gray-600 hover:text-black transition-colors duration-150">
                    Ver detalles
                    <ArrowRight className="ml-1 w-4 h-4" />
                </div>
            </motion.div>
        </Link>
    );
}

interface DashboardProps {
    params: {
        slug: string;
    };
}

function Dashboard({ params }: DashboardProps) {
    const { user } = useUser();
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto p-8 border border-gray-200 rounded-lg bg-white"
        >
            <header className="mb-12 flex justify-between items-center">
                <div>
                    <motion.h1
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        className="text-4xl font-bold text-black mb-2"
                    >
                        ¡Bienvenido, {user?.user_metadata.name}!
                    </motion.h1>
                    <motion.p
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600"
                    >
                        Aquí tienes un resumen de tu tienda.
                    </motion.p>
                </div>
                <motion.a
                    href={`https://cartalogo.vercel.app/${params.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    Ver mi tienda
                </motion.a>
            </header>

            <hr className="my-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <DashboardCard
                    title="Total de Productos"
                    value={
                        totalProducts !== undefined
                            ? totalProducts.toString()
                            : "..."
                    }
                    icon={<Package />}
                    link={`/${params.slug}/dashboard/productos`}
                />
            </div>
        </motion.div>
    );
}

export default Dashboard;
