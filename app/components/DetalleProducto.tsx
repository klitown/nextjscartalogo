"use client";

import { useEffect, useState } from "react";
import { Item, useCart } from "react-use-cart";
import ImageGallery from "react-image-gallery";
import Link from "next/link";
import "./cards.css";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { motion } from "framer-motion";

function DetalleProducto({
    producto,
    tiendaUrl,
}: {
    producto: IProducto;
    tiendaUrl: string;
}) {
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const [images, setImages] = useState<
        Array<{ original: string; thumbnail?: string }>
    >([]);
    const [selectedAttributes, setSelectedAttributes] = useState<{
        [key: string]: string;
    }>({});

    const { inCart, cartTotal, items, addItem, updateItemQuantity } = useCart();
    const { toast } = useToast();

    useEffect(() => {
        //@ts-ignore
        const productInCart = inCart(producto.id);
        if (productInCart !== alreadyAdded) {
            setAlreadyAdded(productInCart);
        }
    }, [cartTotal]);

    useEffect(() => {
        setImagenes();
    }, []);

    const handleClick = (producto: IProducto) => {
        let prod = {
            ...producto,
            attributes: selectedAttributes,
        } as unknown as Item;
        //@ts-ignore
        addItem(prod);
        toast({
            title: "Producto agregado",
            description: (
                <div>
                    <p className="font-extrabold tracking-wide">
                        Se agregó {producto.nombre} al carrito
                    </p>
                </div>
            ),
            action: (
                <ToastAction
                    className="text-sm border border-white bg-white text-black px-3 py-1 font-bold rounded-xl"
                    altText="Entiendo"
                >
                    Entendido
                </ToastAction>
            ),
        });
    };

    const setImagenes = () => {
        let imagenes: Array<{ original: string; thumbnail?: string }> = [];
        if (producto.imagenes && producto.imagenes.length >= 1) {
            producto.imagenes.forEach((imagen: string) => {
                imagenes.push({
                    original: imagen,
                    thumbnail: imagen,
                });
            });
        }
        setImages(imagenes);
    };

    const handleAttributeChange = (attribute: string, value: string) => {
        setSelectedAttributes((prev) => ({ ...prev, [attribute]: value }));
    };

    const renderAttributes = () => {
        if (!producto.attributes) return null;

        return Object.entries(producto.attributes).map(([key, value]) => (
            <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4"
            >
                <h3 className="text-lg font-semibold mb-2">{key}</h3>
                <div className="flex flex-wrap gap-2">
                    {Array.isArray(value) ? (
                        value.map((item) => (
                            <button
                                key={item}
                                onClick={() => handleAttributeChange(key, item)}
                                className={`px-3 py-1 rounded-full text-sm ${
                                    selectedAttributes[key] === item
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                            >
                                {item}
                            </button>
                        ))
                    ) : (
                        <span>{value ? "asd" : "asd2"}</span>
                    )}
                </div>
            </motion.div>
        ));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-start items-center mx-auto ml-0 md:ml-10 my-10">
                <Link
                    href={`/${tiendaUrl}`}
                    className="mt-3 flex rounded p-2 items-center text-gray-500 transition-all duration-200 ease-in-out 
                            focus:shadow bg-black hover:bg-red-500"
                >
                    <svg
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                            id="SVGRepo_tracerCarrier"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                                d="M7 12L17 12M7 12L11 8M7 12L11 16"
                                stroke="#ffffff"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>{" "}
                        </g>
                    </svg>
                    <span className="text-white font-bold">
                        Volver a la tienda
                    </span>
                </Link>
            </div>

            <motion.div
                className="container mx-auto flex flex-col lg:flex-row min-h-screen my-20 border border-gray-200 rounded-xl p-10"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <hr />
                <div className="basis-full flex justify-start items-start md:basis-1/2 lg:basis-1/2">
                    <ImageGallery
                        additionalClass=""
                        items={images}
                        showFullscreenButton={false}
                        showPlayButton={false}
                        showBullets={true}
                        autoPlay={true}
                    />
                </div>

                <div className="basis-full lg:basis-1/2 flex flex-col justify-start p-5 gap-10">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-row justify-between"
                    >
                        <h1 className="text-3xl font-bold">
                            {producto.nombre}
                        </h1>
                        <p className="text-md font-bold tracking-tight mt-1 mb-3 text-gray-700">
                            Gs.{" "}
                            {parseInt(`${producto.price}`, 10).toLocaleString(
                                "es-ES"
                            )}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {producto.descripcion && (
                            <p className="font-light">{producto.descripcion}</p>
                        )}
                    </motion.div>
                    {producto.attributes ? renderAttributes() : null}
                    {
                        //@ts-ignore
                        inCart(producto.id) ? (
                            <>
                                {items.map((item) => {
                                    if (+item.id === +producto.id!) {
                                        return (
                                            <div
                                                key={item.id}
                                                onClick={($event) => {
                                                    $event.stopPropagation();
                                                }}
                                            >
                                                <motion.div
                                                    className="flex justify-between items-center w-full"
                                                    initial={{
                                                        scale: 0.8,
                                                        opacity: 0,
                                                    }}
                                                    animate={{
                                                        scale: 1,
                                                        opacity: 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                    }}
                                                >
                                                    <button
                                                        onClick={() =>
                                                            updateItemQuantity(
                                                                item.id,
                                                                item.quantity! -
                                                                    1
                                                            )
                                                        }
                                                        type="button"
                                                        className="bg-red-500 w-12 h-12 text-white flex items-center justify-center text-2xl font-bold transition hover:opacity-75"
                                                    >
                                                        &minus;
                                                    </button>
                                                    <p className="text-xl font-sans text-black font-bold w-12 text-center">
                                                        {item.quantity}
                                                    </p>
                                                    <button
                                                        onClick={() =>
                                                            updateItemQuantity(
                                                                item.id,
                                                                item.quantity! +
                                                                    1
                                                            )
                                                        }
                                                        type="button"
                                                        className="bg-green-500 w-12 h-12 text-white flex items-center justify-center text-2xl font-bold transition hover:opacity-75"
                                                    >
                                                        &#43;
                                                    </button>
                                                </motion.div>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </>
                        ) : (
                            <motion.button
                                className="flex items-center justify-center bg-slate-900 w-full h-12 px-4 text-center text-sm font-medium text-white hover:bg-green-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick(producto);
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                Agregar al carrito
                            </motion.button>
                        )
                    }
                </div>
            </motion.div>
        </motion.div>
    );
}

export default DetalleProducto;
