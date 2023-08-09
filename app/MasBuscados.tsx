'use client'
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { CartProvider } from "react-use-cart";
import Glide from "@glidejs/glide"


interface Props {
    productos: any
}

const MasBuscados = ({ productos }: Props) => {

    const toggleToast = () => {

    }

    const navigateToDetails = (id: number) => {

    }

    useEffect(() => {
        const slider = new Glide(".glide-01", {
            type: "slider",
            focusAt: "center",
            perView: 3,
            autoplay: 3000,
            animationDuration: 700,
            gap: 24,
            breakpoints: {
                640: {
                    perView: 1,
                },
            },
        }).mount()

        return () => {
            slider.destroy()
        }
    }, [])

    if (productos.length === 0) return <h1>No se encontraron productos</h1>

    return (
        <CartProvider>
            <div className='flex justify-start items-center px-3 mt-10'>
                <h1 className="font-bold text-5xl mt-5 mb-0 font-worksans text-black">
                    Los productos más buscados
                </h1>
            </div>

            <div className="glide-01 relative w-full my-20">
                {/*    <!-- Slides --> */}
                <div className="overflow-hidden" data-glide-el="track">
                    <div className="flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] 
                    [will-change: transform] relative flex items-center justify-center gap-4 w-full overflow-hidden p-0">
                        {
                            productos.map((producto: any, index: any) => (
                                <div key={producto.id}>
                                    {
                                        producto.mas_buscado ?
                                            <ProductCard toggleToast={toggleToast} producto={producto} key={producto.id}
                                                onClick={() => navigateToDetails(producto.id)} data-superjson />
                                            : null
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/*    <!-- Controls --> */}
                <div
                    className="absolute left-0 top-1/2 flex h-0 w-full items-center justify-between px-4 "
                    data-glide-el="controls"
                >
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-black text-white 
                        transition duration-300 hover:border-slate-900 hover:text-white focus-visible:outline-none lg:h-12 lg:w-12"
                        data-glide-dir="<"
                        aria-label="prev slide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <title>prev slide</title>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                            />
                        </svg>
                    </button>
                    <button
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 bg-black text-white 
                        transition duration-300 hover:border-slate-900 hover:text-white focus-visible:outline-none lg:h-12 lg:w-12"
                        data-glide-dir=">"
                        aria-label="next slide"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                        >
                            <title>next slide</title>
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                        </svg>
                    </button>
                </div>
            </div>

        </CartProvider>
    );
}

export default MasBuscados;