"use client";
import { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { CartProvider } from "react-use-cart";
import { Provider } from "./Provider";
import ProductosAgrupadosCategoria from "./ProductosAgrupadosCategoria";

interface Props {
    productos: any,
    categorias: any
}

const MasBuscados = ({ productos, categorias }: Props) => {


    const toggleToast = () => {
        //asd
    }

    const navigateToDetails = (id: number) => {
        //asd
    }

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
            <div className='flex justify-start items-center px-3 mt-10'>
                <h1 className="font-bold text-5xl mt-5 mb-0 font-worksans text-black">
                    Los productos más buscados
                </h1>
            </div>
            <div className="container mx-auto">
                <div className="relative overflow-x-hidden my-20">
                    <div className="flex-no-wrap relative flex items-center justify-center gap-4 w-full overflow-hidden p-0">
                        {
                            productos.map((producto: any, index: any) => (
                                <div key={producto.id}>
                                    {
                                        producto.mas_buscado ?
                                            <ProductCard toggleToast={toggleToast} producto={producto}
                                                onClick={() => navigateToDetails(producto.id)} />
                                            : null
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* PRODUCTOS AGRUPADOS POR CATEGORIA */}
            <div className="container mx-auto">
                {Array.from(categoriasMap.values()).map(categoria => (
                    <div className="border  rounded-xl p-5 my-10" key={categoria.id}>
                        <div className='flex justify-start items-center px-3 mb-5'>
                            <h1 className="font-bold text-5xl mt-5 mb-0 font-worksans text-black">
                                {categoria.nombre}
                            </h1>
                        </div>
                        <div className="relative">
                            <div
                                ref={sliderRef}
                                className="w-full flex snap-x overflow-x-hidden overflow-y-hidden scroll-snap-type-x-mandatory 
                            transition-transform duration-300 scroll-smooth  p-4 rounded-xl"
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
        </div>
    );
}

export default MasBuscados;