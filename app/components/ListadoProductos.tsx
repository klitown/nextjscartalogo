"use client"

import { LucideCheck } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function ListadoProductos({ productos }: any) {

    const [listadoProductos, setListadoProductos] = useState<any[]>(productos);
    const [busquedaValue, setBusquedaValue] = useState('');
    const { toast } = useToast();

    const handleSearch = (value: string) => {
        if (value === '') {
            setBusquedaValue('');
            setListadoProductos(productos)
            return;
        }
        setBusquedaValue(value);
        let a = listadoProductos.filter((producto) => producto.nombre.toLowerCase() == value.toLowerCase());
        if (a.length >= 1) {
            console.log(a);
            setListadoProductos(a);
        } else {
            setTimeout(() => {
                toast({
                    variant: "destructive",
                    title: "¡No se encontró ningún producto!",
                });
                setListadoProductos(productos);
            }, 3000);
        }
    }

    return (
        <div className="container mx-auto">

            <input
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                value={busquedaValue}
                placeholder="Buscar producto"
                className="border border-gray-100 rounded-xl p-4 w-full md:w-1/3 my-4" />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                {
                    listadoProductos.map((producto: any) => (
                        <article key={producto.id} className="rounded-xl border-2 border-gray-100 bg-white">
                            <div className="flex items-start gap-4 p-4 sm:p-6 lg:p-8">
                                <Image src={producto.imagenes.length >= 1 ? producto.imagenes[0]
                                    : 'https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/cartalogo_imagenes/cartalogo/646051.png'}
                                    alt="Imagen del producto"
                                    width={100} height={100}
                                    style={{ borderRadius: '1rem' }}
                                />

                                <div>
                                    <p className="font-bold text-lg md:text-2xl">
                                        {producto.nombre}
                                    </p>

                                    <p className="line-clamp-2 text-md text-gray-700 my-3">
                                        {producto.descripcion ? producto.descripcion : 'Sin descripción'}
                                    </p>

                                    <div className="mt-2 sm:flex sm:items-center sm:gap-2">
                                        <div className="flex items-center gap-1 text-gray-500">
                                            <LucideCheck />

                                            <p className="text-xs">
                                                Gs. {parseInt(`${producto.price}`, 10).toLocaleString("es-ES")}
                                            </p>
                                        </div>

                                        <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                                        {producto.mas_buscado ?
                                            <span className="bg-green-500 text-white rounded-full px-3 py-2 text-[12px]"> Más buscado </span>
                                            : null}
                                    </div>
                                </div>
                            </div>

                        </article>
                    ))
                }
            </div>
        </div>
    );
}

export default ListadoProductos;