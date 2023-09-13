'use client'
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    producto: any
    onClick?: () => void
    toggleToast?: () => any
    showAddCart?: boolean,
    tiendaUrl: string
}

const ProductCard = ({ producto, onClick, toggleToast, showAddCart = true, tiendaUrl }: Props) => {
    const [alreadyAdded, setAlreadyAdded] = useState(false);
    const {
        inCart,
        cartTotal,
        items,
        addItem,
        updateItemQuantity
    } = useCart();

    useEffect(() => {
        const productInCart = inCart(producto.id);
        setAlreadyAdded(productInCart);
    }, [cartTotal]);

    function handleClick() {
        // toggleToast();
    }

    return (
        <div>
            <Link href={`/${tiendaUrl}/producto/${producto.id}`}>
                <div className="flex w-[95%] md:w-[320px] flex-col overflow-hidden rounded-lg border cursor-pointer
                                        border-gray-100 bg-white hover:shadow-2xl shadow-sm transition-transform ease-in-out"
                    onClick={onClick}
                >
                    <div className="relative mx-3 mt-3 flex h-80 overflow-hidden rounded-xl">
                        <Image src={producto.imagenes[0]} alt="Imagen del producto" fill priority={true}
                            className="aspect-square object-scale-down overflow-hidden"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-green-500 px-2 text-center text-sm font-medium text-white">
                    Más vendido
                </span> */}
                    </div>
                    <div className="mt-4 px-5 pb-5">
                        <h5 className="text-xl font-bold mt-5 tracking-tight text-slate-900">
                            {producto.nombre}
                        </h5>
                        <p className="text-md tracking-tight mt-1 mb-3 text-gray-500">
                            Gs. {parseInt(`${producto.price}`, 10).toLocaleString("es-ES")}
                        </p>
                    </div>
                </div>
            </Link>
            <div className="flex w-[100%] md:w-[320px] flex-col overflow-hidden my-4 cursor-pointer hover:shadow-2xl shadow-sm transition-transform ease-in-out"
            >
                {
                    alreadyAdded ? <>
                        {items.map((item) => (
                            <div key={item.id} onClick={(e) => {
                                e.stopPropagation();
                            }}>
                                {
                                    item.id === producto.id &&
                                    <div className="flex justify-around items-center gap-1">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                updateItemQuantity(item.id, item.quantity! - 1)
                                            }
                                            }
                                            type="button"
                                            className="bg-red-500 w-12 h-12 leading-10 text-white transition hover:opacity-75"
                                        >
                                            &minus;
                                        </button>
                                        <p className='text-xl font-sans text-black font-bold'>{item.quantity}</p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                updateItemQuantity(item.id, item.quantity! + 1)
                                            }
                                            }
                                            type="button"
                                            className="bg-green-500 w-12 h-12 leading-10 text-white transition hover:opacity-75"
                                        >
                                            &#43;
                                        </button>
                                    </div>
                                }
                            </div>
                        ))}
                    </>
                        :
                        <button className="flex items-center justify-center bg-slate-900 px-5 py-2.5 text-center text-sm 
                font-medium text-white w-full hover:bg-green-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                {/* @ts-ignore */ }
                                addItem(producto);
                                //handleClick();
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Agregar al carrito
                        </button>
                }
            </div>
        </div>
    );
}

export default ProductCard;