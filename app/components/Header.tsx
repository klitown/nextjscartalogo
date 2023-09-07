'use client';
import { useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import React from "react";
import { NavigationMenuDemo } from "./Asd";


function Header({ tienda, categorias }: {
    tienda: any,
    categorias: Array<{ codigo: string, descripcion: string, id: number, nombre: string }>
}) {


    const [searchValue, setSearchValue] = useState<string>("");
    const router = useRouter()

    const handleSearchProduct = (e: any) => {
        router.push(`/${tienda.url}/busqueda/${searchValue}`)
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            router.push(`/${tienda.url}/busqueda/${searchValue}`)
        }
    };

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    return (
        <header className="flex flex-col md:flex-row items-center md:justify-between border-b border-gray-200 p-3 px-1 lg:px-10">
            <div className="flex flex-row justify-between w-full">

                <div className="flex gap-3 items-center basis-full md:basis-1/2">
                    <div className="flex lg:hidden justify-start items-center">
                        <Sidebar tienda={tienda} categorias={categorias} />
                    </div>
                    <div className="flex justify-start items-center basis-full">
                        <Image
                            src={tienda.url_logo ? tienda.url_logo
                                : 'https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/cartalogo_imagenes/cartalogo/white.png'}
                            alt="Logo de la tienda" width={100} height={100} priority={true}
                        />
                    </div>
                </div>

                <div className="hidden lg:flex justify-end gap-3 items-center basis-1/2">

                    <NavigationMenuDemo tiendaUrl={tienda.url} categorias={categorias} />

                    <div className="relative basis-1/2">
                        <input type="search" id="default-search" name="search-products" placeholder="Buscar productos..."
                            value={searchValue}
                            onChange={handleChange}
                            onKeyDown={(e) => handleKeyDown(e)}
                            className="block w-full h-82 p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-blue-500 focus:border-blue-500 " />
                        <div className="absolute inset-y-0 right-1 flex items-center pr-2">
                            <button onClick={handleSearchProduct}
                                className="bg-black text-white px-2 py-2 rounded-xl cursor-pointer 
                                hover:bg-green-500 hover:text-white hover:border hover:border-green-500" type="button">
                                Buscar
                            </button>
                        </div>
                    </div>



                    <span className="">
                        <div
                            onClick={() => {
                                // navegar al carrito
                                router.push(`/${tienda.url}/carrito`)
                            }}
                            className="h-16 w-16 
                                flex flex-col justify-center items-center border-black hover:border-b-4 
                                hover:border-blue-700 cursor-pointer"
                        >
                            {/* <span className="hidden lg:block">Carrito</span> */}
                            <Image src="/icon-carrito.png" width={32} height={32} alt="Icono carrito" />
                            <span className="sr-only">Carrito</span>
                        </div>
                    </span>

                </div>


            </div>


            <div className="relative w-full py-5 block md:hidden">
                <div className="absolute inset-y-0 left-3 flex items-center pl-0 mr-4 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" name="search-products" placeholder="Buscar productos..."
                    value={searchValue}
                    onChange={handleChange}
                    onKeyDown={(e) => handleKeyDown(e)}
                    className="w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-blue-500 focus:border-blue-500 " />
                <div className="absolute inset-y-0 right-1 my-3 flex items-center pr-2">
                    <button onClick={handleSearchProduct}
                        className="bg-black text-white pl-3 px-3 py-3 rounded-xl cursor-pointer" type="button">
                        Buscar
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;