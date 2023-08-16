'use client';
import { useEffect, useRef, useState } from "react";
import Link from 'next/link'


interface Props {
    categorias: Array<{ codigo: string, descripcion: string, id: number, nombre: string }>,
    tienda: any
}

function Categorias({ categorias, tienda }: Props) {

    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(event: any) {
            // @ts-ignore
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    const navigateToCategoria = (categoria: string) => {
        setIsOpen(false);
    }

    return (
        <div className="">
            {/* Botón de menú hamburguesa */}
            <button type="button" className="block p-2 mr-5" onClick={toggleMenu}>
                <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
            {/* Menú */}
            <div ref={sidebarRef}
                className={`fixed top-0 left-0 h-screen w-full lg:w-[25%] bg-white z-[9999999] 
                p-3 shadow-lg overflow-hidden ease-in-out transition-all
                duration-300 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Aquí va el contenido del menú */}
                <button className="text-xl px-5 py-2 text-black rounded-full hover:bg-red-500 hover:text-white"
                    onClick={closeMenu}>
                    X
                </button>
                <h1 className="font-bold text-3xl my-5 text-black">
                    Categorías
                </h1>
                <ul>
                    {categorias.map((categoria) => (
                        <Link href={`/${tienda.url}/${categoria.codigo}`} replace
                            onClick={closeMenu}
                            className="flex items-center border-b border-b-gray-200 p-3 cursor-pointer hover:bg-gray-100"
                            key={categoria.id}
                        >
                            <span className="flex-1 text-black text-xl">
                                {categoria.nombre}
                            </span>
                            <svg
                                className="h-4 w-4 fill-current text-gray-500"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M16.59 11l-4.3-4.3a1 1 0 1 1 1.42-1.4l6 6a1 1 0 0 1 0 1.4l-6 6a1 1 0 0 1-1.42-1.4L16.59 13H4a1 1 0 0 1 0-2h12.59z"
                                ></path>
                            </svg>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Categorias;