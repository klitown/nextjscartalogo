"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Item, useCart } from "react-use-cart";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Props {
    producto: any;
    onClick?: () => void;
    toggleToast?: () => any;
    showAddCart?: boolean;
    tiendaUrl: string;
}

const CompactProductCard: React.FC<Props> = ({
    producto,
    onClick,
    toggleToast,
    showAddCart = true,
    tiendaUrl,
}) => {
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const { inCart, cartTotal, items, addItem, updateItemQuantity } = useCart();

    useEffect(() => {
        const productInCart = inCart(producto.id);
        setAlreadyAdded(productInCart);
    }, [cartTotal]);

    return (
        <Card className="w-full max-w-lg overflow-hidden">
            <Link href={`/${tiendaUrl}/producto/${producto.id}`}>
                <div className="relative h-[200px] w-full" onClick={onClick}>
                    {producto.imagenes && producto.imagenes.length >= 1 ? (
                        <Image
                            src={producto.imagenes[0]}
                            alt={producto.nombre}
                            fill
                            priority
                            className="object-contain transition-transform duration-300 ease-in-out hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center bg-gray-100">
                            <p className="text-gray-500">No image</p>
                        </div>
                    )}
                </div>
            </Link>
            <CardContent className="p-3">
                <h3 className="text-sm font-semibold line-clamp-2">
                    {producto.nombre}
                </h3>
                <p className="mt-1 text-lg font-bold">
                    Gs.{" "}
                    {parseInt(`${producto.price}`, 10).toLocaleString("es-ES")}
                </p>
            </CardContent>
            <hr className="my-4" />
            {showAddCart && (
                <CardFooter className="p-3 pt-0 flex justify-center items-cente">
                    {alreadyAdded ? (
                        <>
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                >
                                    {item.id === producto.id && (
                                        <div className="flex justify-center items-center gap-4 w-full">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateItemQuantity(
                                                        item.id,
                                                        item.quantity! - 1
                                                    );
                                                }}
                                                type="button"
                                                className="bg-red-500 w-8 h-8 text-white transition hover:opacity-75 rounded-full flex items-center justify-center"
                                            >
                                                &minus;
                                            </button>
                                            <p className="text-lg font-sans text-black font-bold">
                                                {item.quantity}
                                            </p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    updateItemQuantity(
                                                        item.id,
                                                        item.quantity! + 1
                                                    );
                                                }}
                                                type="button"
                                                className="bg-green-500 w-8 h-8 text-white transition hover:opacity-75 rounded-full flex items-center justify-center"
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
                            className="flex items-center justify-center bg-slate-900 px-4 py-2 text-center text-sm 
                            font-medium text-white w-full hover:bg-green-500 rounded-md transition-colors duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                /* @ts-ignore */
                                addItem(producto);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="mr-2 h-5 w-5"
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
                    )}
                </CardFooter>
            )}
        </Card>
    );
};

export default CompactProductCard;
