"use client";
import { CartProvider } from "react-use-cart";
import ProductCard from "./ProductCard";
import React, { useRef } from "react";
import { Provider } from "./Provider";

function ProductosAgrupadosCategorias({ productos, categorias }: any) {

    const categoriasMap = new Map();
    // Llenar el mapa con las categorías
    categorias.forEach((categoria: any) => {
        categoriasMap.set(categoria.id, {
            ...categoria,
            productos: []
        });
    });

    // Agrupar los productos por categoría
    productos.forEach((producto: any) => {
        if (categoriasMap.has(producto.categoria_id)) {
            const categoria = categoriasMap.get(producto.categoria_id);
            categoria.productos.push(producto);
            categoriasMap.set(producto.categoria_id, categoria);
        }
    });

    const toggleToast = () => {
        //
    }
    const navigateToDetails = (id: number) => {
        //
    }

    const sliderRef = useRef<any>(null);

    const handleScroll = (direction: any) => {
        const slider = sliderRef.current;

        if (slider) {
            const scrollWidth = slider.scrollWidth;
            const clientWidth = slider.clientWidth;

            if (direction === "left") {
                slider.scrollLeft -= clientWidth;
            } else if (direction === "right") {
                slider.scrollLeft += clientWidth;
            }
        }
    };

    return (
        <div className="container mx-auto">
            {Array.from(categoriasMap.values()).map(categoria => (
                <div className="border border-gray-200 rounded-xl p-5 my-10" key={categoria.id}>
                    <div className='flex justify-start items-center px-3 mb-5'>
                        <h1 className="font-bold text-5xl mt-5 mb-0 font-worksans text-black">
                            {categoria.nombre}
                        </h1>
                    </div>
                    <div className="relative">
                        <div
                            ref={sliderRef}
                            className="w-full flex snap-x overflow-x-hidden overflow-y-hidden scroll-snap-type-x-mandatory 
                            transition-transform duration-300 scroll-smooth bg-gray-100 p-4 rounded-xl"
                            style={{ scrollSnapAlign: "center" }}
                        >
                            {categoria.productos.map((producto: any) => (
                                <div key={producto.id} className="snap-always snap-center mx-10">
                                    <ProductCard
                                        toggleToast={toggleToast}
                                        producto={producto}
                                        onClick={() => navigateToDetails(producto.id)}
                                    />
                                </div>
                            ))}
                        </div>

                        <button
                            className="absolute bg-indigo-500 text-white px-6 py-4 rounded-full left-0 top-1/2 transform -translate-y-1/2"
                            onClick={() => handleScroll("left")}
                        >
                            &lt;
                        </button>
                        <button
                            className="absolute bg-indigo-500 text-white px-6 py-4 rounded-full right-0 top-1/2 transform -translate-y-1/2"
                            onClick={() => handleScroll("right")}
                        >
                            &gt;
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default ProductosAgrupadosCategorias;