"use client";

import { useEffect, useState } from "react";
import { Item, useCart } from "react-use-cart";
import ImageGallery from "react-image-gallery";
import Link from "next/link";
import "./cards.css";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

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
        let prod = producto as unknown as Item;
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

    return (
        <>
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

            <div className="container mx-auto flex flex-col lg:flex-row min-h-screen my-20 border border-gray-200 rounded-xl p-10">
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
                    <div className="flex flex-row justify-between">
                        <h1 className="text-3xl font-bold">
                            {producto.nombre}
                        </h1>
                        <p className="text-md font-bold tracking-tight mt-1 mb-3 text-gray-700">
                            Gs.{" "}
                            {parseInt(`${producto.price}`, 10).toLocaleString(
                                "es-ES"
                            )}
                        </p>
                    </div>
                    <div>
                        {producto.descripcion && (
                            <p className="font-light">{producto.descripcion}</p>
                        )}
                    </div>

                    {
                        //@ts-ignore
                        inCart(producto.id) ? (
                            <>
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={($event) => {
                                            $event.stopPropagation();
                                        }}
                                    >
                                        {+item.id === +producto.id! && (
                                            <div className="flex justify-around items-center gap-1">
                                                <button
                                                    onClick={() =>
                                                        updateItemQuantity(
                                                            item.id,
                                                            item.quantity! - 1
                                                        )
                                                    }
                                                    type="button"
                                                    className="bg-red-500 w-12 h-12 leading-10 text-white transition hover:opacity-75"
                                                >
                                                    &minus;
                                                </button>
                                                <p className="text-xl font-sans text-black font-bold">
                                                    {item.quantity}
                                                </p>
                                                <button
                                                    onClick={() =>
                                                        updateItemQuantity(
                                                            item.id,
                                                            item.quantity! + 1
                                                        )
                                                    }
                                                    type="button"
                                                    className="bg-green-500 w-12 h-12 leading-10 text-white transition hover:opacity-75"
                                                >
                                                    &#43;
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </>
                        ) : (
                            <button
                                className="flex items-center justify-center bg-slate-900 px-5 py-2.5 text-center text-sm 
                font-medium text-white w-full hover:bg-green-500"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleClick(producto);
                                }}
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
                            </button>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default DetalleProducto;
