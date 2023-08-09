'use client';
import { useState } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import { useRouter } from 'next/navigation'

function Header({ tiendaData, categorias }: {
    tiendaData: any,
    categorias: Array<{ codigo: string, descripcion: string, id: number, nombre: string }>
}) {

    const [searchValue, setSearchValue] = useState<string>("");
    const router = useRouter()

    const handleSearchProduct = () => {
        router.push(`/${tiendaData.url}/busqueda/${searchValue}`)
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchValue(event.target.value);
    }

    return (
        <header className="flex flex-col md:flex-row items-center md:justify-between border-b border-gray-200 p-3">
            <div className="flex flex-row justify-between w-full">
                <div className="flex justify-center items-center">
                    <Sidebar tiendaData={tiendaData} categorias={categorias} />
                </div>
                <div className="flex justify-center items-center">
                    <Image src={tiendaData.url_logo ? tiendaData.url_logo : 'https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/cartalogo_imagenes/cartalogo/white.png'} width={32} height={32} alt="Logo de la tienda" />
                </div>
                <div className="flex justify-center items-center border-gray-100">
                    <span className="border-e border-e-gray-100">
                        <div
                            onClick={() => {
                                // navegar al carrito
                            }}
                            className="h-16 w-16 
                                flex flex-col justify-center items-center border-b-2 border-black hover:border-b-4 hover:border-blue-700 cursor-pointer"
                        >
                            {/* <span className="hidden lg:block">Carrito</span> */}
                            <Image src="/icon-carrito.png" width={32} height={32} alt="Icono carrito" />
                            <span className="sr-only">Carrito</span>
                        </div>
                    </span>
                </div>
            </div>


            <div className="relative w-full p-5 block md:hidden">
                <div className="absolute inset-y-0 left-5 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" name="search-products" placeholder="Buscar productos..."
                    value={searchValue}
                    onChange={handleChange}
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-blue-500 focus:border-blue-500 " />
                <div className="absolute inset-y-0 right-5 flex items-center pr-2">
                    <button onClick={handleSearchProduct}
                        className="bg-black text-white px-5 py-2 rounded-xl cursor-pointer" type="button">
                        Buscar
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;