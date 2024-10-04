"use client";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Link from "next/link";
import { ITienda } from "@/lib/interfaces/ITienda";
import Portada from "../Portada";

interface Props {
    tienda: ITienda;
    productos: any;
    categorias: any;
}

const FreeTiendaLayout = ({ tienda, productos, categorias }: Props) => {
    const [loading, setLoading] = useState(true);
    const [categoriasMap, setCategoriasMap] = useState<any>();
    const [productosMasBuscados, setProductosMasBuscados] = useState<any>();

    useEffect(() => {
        getInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getInfo = () => {
        const map = new Map();
        // Llenar el mapa con las categorías
        categorias.forEach((categoria: any) => {
            map.set(categoria.id, {
                ...categoria,
                productos: [],
            });
        });

        // Agrupar los productos por categoría
        productos.forEach((producto: any) => {
            if (map.has(producto.categoria_id)) {
                const categoria = map.get(producto.categoria_id);
                categoria.productos.push(producto);
                map.set(producto.categoria_id, categoria);
            }
        });
        const masBuscados = productos.filter(
            (producto: any) => producto.mas_buscado
        );
        setProductosMasBuscados(masBuscados);
        setCategoriasMap(map);
        setLoading(false);
    };

    if (loading) return <h1>Loading...</h1>;

    return (
        <>
            <Portada
                tiendaNombre={tienda.nombre}
                tiendaDescripcion={tienda.descripcion}
                urlPortada={tienda.imagen_portada!}
                redes={tienda.redes!}
            />
            {productosMasBuscados.length >= 1 && (
                <div className="lg:container lg:mx-auto">
                    <div className="flex justify-start items-center px-3 mt-10">
                        <h1 className="font-bold text-5xl md:text-5xl mt-5 mb-0 font-worksans text-black">
                            Los productos más buscados
                        </h1>
                    </div>
                    <div className="my-16 lg:my-4 border-2 border-yellow-500 rounded-xl p-5">
                        {productos.length > 0 ? (
                            <Swiper
                                slidesPerView={1}
                                centerInsufficientSlides={false}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                }}
                                loop={false}
                                navigation={true}
                                modules={[Autoplay, Navigation]}
                                breakpoints={{
                                    // when window width is >= 640px
                                    640: {
                                        slidesPerView: 1,
                                    },
                                    1024: {
                                        slidesPerView: 2,
                                    },
                                    1280: {
                                        slidesPerView: 3,
                                    },
                                }}
                            >
                                {productosMasBuscados.map(
                                    (producto: any, index: number) => {
                                        return (
                                            <SwiperSlide
                                                key={`${producto.nombre} + ${index}`}
                                                className="my-10"
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                {producto.mas_buscado ? (
                                                    <ProductCard
                                                        tiendaUrl={tienda.url}
                                                        producto={producto}
                                                    />
                                                ) : null}
                                            </SwiperSlide>
                                        );
                                    }
                                )}
                            </Swiper>
                        ) : (
                            <h1>Error!</h1>
                        )}
                    </div>
                </div>
            )}

            {/* PRODUCTOS AGRUPADOS POR CATEGORIA */}
            <div className="lg:container lg:mx-auto">
                {Array.from(categoriasMap!.values()).map(
                    (categoria: any, index) => (
                        <div
                            className="border rounded-xl p-5 my-10"
                            key={categoria.id + index}
                        >
                            <div className="flex justify-start items-center px-3 mb-5">
                                <h1 className="font-bold text-5xl mb-0 font-worksans text-black">
                                    {categoria.nombre}
                                </h1>
                            </div>
                            <div className="my-3 px-3">
                                <Link
                                    href={`/${tienda.url}/${categoria.codigo}`}
                                    className={`block select-none space-y-1 p-3 leading-none no-underline
                                border border-gray-200 rounded-lg bg-indigo-500 text-white w-full md:w-32 text-center
                                outline-none transition-colors hover:bg-indigo-700`}
                                >
                                    Ver todo
                                </Link>
                            </div>
                            <hr />
                            <Swiper
                                slidesPerView={1}
                                centerInsufficientSlides={true}
                                spaceBetween={30}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                }}
                                loop={false}
                                navigation={true}
                                modules={[Autoplay, Navigation]}
                                breakpoints={{
                                    // when window width is >= 640px
                                    640: {
                                        slidesPerView: 1,
                                    },
                                    1024: {
                                        slidesPerView: 2,
                                    },
                                    1280: {
                                        slidesPerView: 3,
                                    },
                                }}
                            >
                                {categoria.productos.map(
                                    (producto: any, index: number) => (
                                        <SwiperSlide
                                            key={`${producto.nombre} + ${index}`}
                                            className="my-10"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <ProductCard
                                                tiendaUrl={tienda.url}
                                                producto={producto}
                                            />
                                        </SwiperSlide>
                                    )
                                )}
                            </Swiper>
                        </div>
                    )
                )}
            </div>
        </>
    );
};

export default FreeTiendaLayout;
