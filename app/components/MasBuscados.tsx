"use client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


interface Props {
    tiendaUrl: string
    productos: any,
    categorias: any
}

const MasBuscados = ({ tiendaUrl, productos, categorias }: Props) => {

    const [loading, setLoading] = useState(true);
    const [categoriasMap, setCategoriasMap] = useState<any>();
    const router = useRouter()

    useEffect(() => {
        getInfo();
    }, []);

    const getInfo = () => {
        const map = new Map();
        // Llenar el mapa con las categorías
        categorias.forEach((categoria: any) => {
            map.set(categoria.id, {
                ...categoria,
                productos: []
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
        setCategoriasMap(map);
        setLoading(false);
    }

    const toggleToast = () => {
        //asd
    }

    const navigateToDetails = (idProducto: number) => {
        router.push(`${tiendaUrl}/producto/${idProducto}`)
    }


    if (loading) return <h1>Loading...</h1>


    return (
        <div className="lg:container lg:mx-auto mx-3">

            <div className="lg:container lg:mx-auto">
                <div className='flex justify-start items-center px-3 mt-10'>
                    <h1 className="font-bold text-5xl md:text-5xl mt-5 mb-0 font-worksans text-black">
                        Los productos más buscados
                    </h1>
                </div>
                <div className="my-16 lg:my-4 border-2 border-yellow-500 rounded-xl p-5">
                    {
                        productos.length > 0 ?
                            <Swiper
                                slidesPerView={1}
                                centerInsufficientSlides={true}
                                spaceBetween={30}
                                autoplay={{
                                    delay: 3500,
                                    disableOnInteraction: false,
                                }}
                                loop={true}
                                navigation={true}
                                pagination={true}
                                modules={[Autoplay, Navigation, Pagination]}
                                className=""
                            >
                                {
                                    productos.map((producto: any, index: number) => {
                                        return <SwiperSlide key={`${producto.nombre} + ${index}`} className="my-10">
                                            {
                                                producto.mas_buscado ?
                                                    <ProductCard toggleToast={toggleToast} producto={producto}
                                                        onClick={() => navigateToDetails(producto.id)} />
                                                    : null
                                            }
                                        </SwiperSlide>
                                    })
                                }
                            </Swiper>
                            :
                            <h1>Error!</h1>
                    }
                </div>
            </div>


            {/* PRODUCTOS AGRUPADOS POR CATEGORIA */}
            <div className="lg:container lg:mx-auto">
                {Array.from(categoriasMap!.values()).map((categoria: any, index) => (
                    <div className="border rounded-xl p-5 my-10" key={categoria.id + index}>
                        <div className='flex justify-start items-center px-3 mb-5'>
                            <h1 className="font-bold text-5xl mt-5 mb-0 font-worksans text-black">
                                {categoria.nombre}
                            </h1>
                        </div>

                        <Swiper
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            rewind={true}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className=""
                        >

                            {categoria.productos.map((producto: any, index: number) => (
                                <SwiperSlide key={producto.id + index} className="my-10">
                                    <ProductCard
                                        toggleToast={toggleToast}
                                        producto={producto}
                                        onClick={() => navigateToDetails(producto.id)}
                                    />
                                </SwiperSlide>
                            ))}

                        </Swiper>



                    </div>
                ))}
            </div>
        </div>
    );
}

export default MasBuscados;