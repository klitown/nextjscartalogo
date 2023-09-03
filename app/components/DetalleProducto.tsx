"use client"

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

function DetalleProducto({ producto }: any) {

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

    return (
        <div className="container mx-auto flex flex-col lg:flex-row min-h-screen my-20">
            <div className="bg-pink-300 basis-full lg:basis-1/2">
                <h1>foto</h1>
            </div>
            <div className="basis-full lg:basis-1/2 flex flex-col justify-start p-5 gap-10">
                <div className="flex flex-row justify-between">
                    <h1 className="text-3xl font-bold">
                        {producto.nombre}
                    </h1>
                    <p className="text-md tracking-tight mt-1 mb-3 text-gray-500">
                        Gs. {parseInt(`${producto.price}`, 10).toLocaleString("es-ES")}
                    </p>
                </div>
                <div>
                    {producto.descripcion &&
                        <p className="font-light">
                            {producto.descripcion}
                        </p>
                    }
                </div>


                {
                    alreadyAdded ? <>
                        {items.map((item) => (
                            <div key={item.id} onClick={($event) => {
                                $event.stopPropagation();
                            }}>
                                {
                                    item.id === producto.id &&
                                    <div className="flex justify-around items-center gap-1">
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity! - 1)
                                            }
                                            type="button"
                                            className="bg-red-500 w-12 h-12 leading-10 text-white transition hover:opacity-75"
                                        >
                                            &minus;
                                        </button>
                                        <p className='text-xl font-sans text-black font-bold'>{item.quantity}</p>
                                        <button
                                            onClick={() => updateItemQuantity(item.id, item.quantity! + 1)
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
                        <Button className="py-6" onClick={($event) => {
                            $event.stopPropagation();
                            {/* @ts-ignore */ }
                            addItem(producto);
                            //handleClick();
                        }}>
                            <ShoppingCart className="mr-2 h-6 w-6" />
                            Agregar al carrito
                        </Button>
                }





            </div>

        </div>
    );
}

export default DetalleProducto;