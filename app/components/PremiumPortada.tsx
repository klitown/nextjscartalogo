"use client";
import React from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, ShoppingBag, Star } from "lucide-react";
import SVGInstagram from "./svg-icons/SVGInstagram";
import SVGFacebook from "./svg-icons/SVGFacebook";

interface PortadaProps {
    urlPortada: string;
    tiendaNombre: string;
    tiendaDescripcion: string;
    redes: string[];
}

const PremiumPortada: React.FC<PortadaProps> = ({
    urlPortada,
    tiendaNombre,
    tiendaDescripcion,
    redes,
}) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.3,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative min-h-[70vh] flex justify-center items-center w-full bg-cover bg-center bg-no-repeat overflow-hidden rounded-lg "
            style={{
                backgroundImage: `url('${urlPortada}')`,
            }}
        >
            <motion.div
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-black"
            />

            <div className="relative z-10 text-center px-4 backdrop-blur-sm bg-white bg-opacity-20 p-10 rounded-lg">
                <motion.h1
                    variants={itemVariants}
                    className="text-6xl font-bold text-white mb-4 tracking-tight text-shadow-lg"
                >
                    {tiendaNombre.toUpperCase()}
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto text-shadow-lg"
                >
                    {tiendaDescripcion}
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex justify-center space-x-4 mb-8"
                >
                    {redes.map((red) => (
                        <motion.a
                            key={red}
                            href={red}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-white hover:text-gray-300 transition-colors"
                        >
                            {red.includes("instagram") ? (
                                <SVGInstagram />
                            ) : null}
                            {red.includes("facebook") ? <SVGFacebook /> : null}
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default PremiumPortada;
