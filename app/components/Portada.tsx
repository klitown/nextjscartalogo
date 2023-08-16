'use client';

interface Portada {
    urlPortada: string;
    tiendaNombre: string;
    tiendaDescripcion: string
}

function Portada({ urlPortada, tiendaNombre, tiendaDescripcion }: Portada) {
    return (
        <section className="bg-cover bg-no-repeat bg-center h-[85vh]  flex justify-center items-center w-full"
            style={{
                backgroundImage: `url(${urlPortada})`
            }}>
            <div className="flex justify-center items-center px-8 
            py-12 mx-auto max-w-7xl lg:px-16 md:px-12 lg:py-24 backdrop-blur-sm bg-white/50 rounded-xl">
                <div className="justify-center w-full text-center lg:p-10 max-auto">
                    <div className="justify-center w-full mx-auto">
                        <p className={`mt-8 text-5xl font-medium tracking-tighter text-black inter`}>
                            {tiendaNombre.toUpperCase()}
                        </p>
                        <p className="max-w-xl mx-auto mt-4 text-lg tracking-tight">
                            {tiendaDescripcion}
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center max-w-xl gap-3 mx-auto mt-10 lg:flex-row">
                        <a href="#" className="items-center justify-center w-full px-6 py-2.5  text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none lg:w-auto focus-visible:outline-black text-sm focus-visible:ring-black">
                            Button
                        </a>
                        <a href="#" className="inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600">
                            Learn more &nbsp; →
                        </a>
                    </div>
                </div>


            </div>
        </section>

    );
}

export default Portada;