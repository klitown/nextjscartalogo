"use client";
import { useEffect, useState } from "react";
import ProductCardPremium from "../ProductCardPremium";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import PremiumPortada from "../PremiumPortada";
import { ITienda } from "@/lib/interfaces/ITienda";

interface Props {
    tienda: ITienda;
    productos: any;
    categorias: any;
}

const PremiumTiendaLayout = ({ tienda, productos, categorias }: Props) => {
    const [loading, setLoading] = useState(true);
    const [categoriasMap, setCategoriasMap] = useState<any>();
    const [productosMasBuscados, setProductosMasBuscados] = useState<any>();

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        const map = new Map();
        categorias.forEach((categoria: any) => {
            map.set(categoria.id, { ...categoria, productos: [] });
        });

        productos.forEach((producto: any) => {
            if (map.has(producto.categoria_id)) {
                const categoria = map.get(producto.categoria_id);
                categoria.productos.push(producto);
                map.set(producto.categoria_id, categoria);
            }
        });
        const masBuscados = productos.filter(
            (producto: any) => producto.mas_buscado
        );
        setProductosMasBuscados(masBuscados);
        setCategoriasMap(map);
        setLoading(false);
    };

    if (loading) return <h1>Loading...</h1>;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    };

    return (
        <div className="min-h-screen">
            <PremiumPortada
                tiendaNombre={tienda.nombre}
                tiendaDescripcion={tienda.descripcion}
                urlPortada={tienda.imagen_portada!}
                redes={tienda.redes!}
            />

            {productosMasBuscados.length >= 1 && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="lg:container lg:mx-auto py-10 mb-0"
                >
                    <motion.h1
                        variants={itemVariants}
                        className="text-4xl font-bold text-left mb-8 text-black flex items-center justify-start"
                    >
                        <Star className="w-8 h-8 text-yellow-400 mr-2" />
                        Productos Más Buscados
                    </motion.h1>
                    <motion.div
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 border border-gray-200 rounded-lg p-10"
                    >
                        {productosMasBuscados.map(
                            (producto: any, index: number) => (
                                <motion.div
                                    key={`${producto.nombre} + ${index}`}
                                    variants={itemVariants}
                                >
                                    <ProductCardPremium
                                        tiendaUrl={tienda.url}
                                        producto={producto}
                                        showAddCart={true}
                                    />
                                </motion.div>
                            )
                        )}
                    </motion.div>
                </motion.div>
            )}

            <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="lg:container lg:mx-auto"
            >
                {Array.from(categoriasMap!.values()).map(
                    (categoria: any, index) => (
                        <motion.div
                            key={categoria.id + index}
                            variants={itemVariants}
                            className="mb-8 border border-gray-200 rounded-lg p-10"
                        >
                            <motion.h2
                                variants={itemVariants}
                                className="text-3xl font-semibold mb-6 text-black"
                            >
                                {categoria.nombre}
                            </motion.h2>
                            <Link
                                href={`/${tienda.url}/${categoria.codigo}`}
                                className="inline-block bg-indigo-500 text-white px-6 py-2 rounded-full mb-6 hover:bg-indigo-600 transition-colors duration-300"
                            >
                                Ver todo
                            </Link>
                            <motion.div
                                variants={containerVariants}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            >
                                {categoria.productos.map(
                                    (producto: any, index: number) => (
                                        <motion.div
                                            key={`${producto.nombre} + ${index}`}
                                            variants={itemVariants}
                                        >
                                            <ProductCardPremium
                                                tiendaUrl={tienda.url}
                                                producto={producto}
                                                showAddCart={true}
                                            />
                                        </motion.div>
                                    )
                                )}
                            </motion.div>
                        </motion.div>
                    )
                )}
            </motion.div>
        </div>
    );
};

export default PremiumTiendaLayout;
