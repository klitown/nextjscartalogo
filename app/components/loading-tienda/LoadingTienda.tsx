"use client";
import React from "react";
import { motion } from "framer-motion";

const LoadingTienda = () => {
    const dotVariants = {
        initial: { y: 0, opacity: 0.5 },
        animate: {
            y: [-6, 0, -6],
            opacity: [0.5, 1, 0.5],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <motion.div
                className="flex space-x-3"
                initial="initial"
                animate="animate"
            >
                {[0, 1, 2].map((index) => (
                    <motion.span
                        key={index}
                        className="block w-4 h-4 bg-blue-500 rounded-full"
                        variants={dotVariants}
                        transition={{
                            delay: index * 0.2,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
};

export default LoadingTienda;
