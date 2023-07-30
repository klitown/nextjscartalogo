'use client'
import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { CartProvider } from "react-use-cart";

interface Props {
    productos: any
}

const MasBuscados = ({ productos }: Props) => {

    const snapContainer = useRef<HTMLDivElement>(null);
    const snapContainers = useRef<HTMLDivElement[] | null>([]);

    const handleBackClick = (masBuscadosContainer?: boolean, index?: number) => {
        if (masBuscadosContainer) {
            if (snapContainer.current) {
                (snapContainer.current as HTMLDivElement).scrollLeft -= snapContainer.current.offsetWidth;
            }
        } else {
            if (index) {
                if (snapContainers.current![index]) {
                    (snapContainers.current![index] as HTMLDivElement).scrollLeft -= snapContainers.current![index].offsetWidth;
                }
            }
        }
    };

    const handleNextClick = (masBuscadosContainer?: boolean, index?: number) => {
        if (masBuscadosContainer) {
            if (snapContainer.current) {
                (snapContainer.current as HTMLDivElement).scrollLeft += snapContainer.current.offsetWidth;
            }
        } else {
            if (index) {
                if (snapContainers.current![index]) {
                    (snapContainers.current![index] as HTMLDivElement).scrollLeft += snapContainers.current![index].offsetWidth;
                }
            }
        }
    };

    const toggleToast = () => {

    }

    const navigateToDetails = (id: number) => {

    }

    if (productos.length === 0) return <h1>No se encontraron productos</h1>

    return (
        <CartProvider>
            <>
                <div className='flex justify-start items-center px-3 mt-10'>
                    <h1 className="font-bold text-5xl my-5 font-worksans text-black">
                        Los más buscados
                    </h1>
                </div>
                <div className="relative">
                    <div className={`absolute flex justify-between transform translate-y-[500%] left-1 right-3 top-1/2 z-[9999]`}>

                        <button onClick={() => handleBackClick(true)}
                            className={`btn btn-circle rounded-full`}>
                            &lt;
                        </button>
                        <button onClick={() => handleNextClick(true)}
                            className="btn btn-circle rounded-full">
                            &gt;
                        </button>
                    </div>
                </div>
                <div ref={snapContainer}
                    className="w-full flex gap-0 snap-x snap-mandatory overflow-x-auto md:overflow-x-hidden bg-gray-50 p-5 scroll-smooth"
                >
                    {
                        productos.map((producto: any, index: any) => (
                            <div key={producto.id}>
                                {
                                    producto.mas_buscado ?
                                        <div className="snap-center snap-always mx-5 z-10">
                                            <ProductCard toggleToast={toggleToast} producto={producto} key={producto.id}
                                                onClick={() => navigateToDetails(producto.id)} data-superjson />
                                        </div>
                                        : null
                                }
                            </div>
                        ))
                    }
                </div>
            </>
        </CartProvider>
    );
}

export default MasBuscados;