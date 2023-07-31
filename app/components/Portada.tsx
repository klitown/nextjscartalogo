'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

interface Portada {
    urlPortada: string;
    tiendaNombre: string;
    tiendaDescripcion: string
}

function Portada({ urlPortada, tiendaNombre, tiendaDescripcion }: Portada) {

    return (
        <section style={{
            position: 'relative',
            height: '60vh',
            borderRadius: '30px',
            border: 'none',
            marginTop: '1.25rem',
            marginLeft: '1.25rem',
            marginRight: '1.25rem',
            backgroundImage: `url(${urlPortada})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}>
            <div
                className="relative px-4 flex justify-center items-center h-full"
            >
                <div className="max-w-xl p-5 rounded-xl backdrop-blur-sm bg-white/75">
                    <h1 className="text-4xl text-black font-extrabold sm:text-5xl text-center">
                        {tiendaNombre}
                    </h1>

                    <p className="mt-4 max-w-lg text-black font-medium text-lg sm:text-xl/relaxed">
                        {tiendaDescripcion}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Portada;