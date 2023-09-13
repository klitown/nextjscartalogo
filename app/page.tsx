"use client";

import { useState, useEffect, useMemo, useRef } from 'react';
import localFont from 'next/font/local'
import { Red_Hat_Display } from 'next/font/google'
import Image from 'next/image'
import { CheckCheckIcon } from 'lucide-react';

// Font files can be colocated inside of `app`
const agrandir = localFont({
    src: './agrandir.otf',
    display: 'swap',
})
const redHat = Red_Hat_Display({
    subsets: ['latin'],
    display: 'swap',
})


const features = [
    {
        name: 'Visita a tu tienda',
        description:
            'Con tu tienda en línea, tus clientes solo deben navegar a tu sitio web y empezar a ver tus productos',
    },
    {
        name: 'Agregar al carrito',
        description: 'Una vez que se elija un producto, se añade el producto al carrito integrado de tu sitio web',
    },
    {
        name: 'Finalizar compra',
        description: 'El pedido te llega directamente al Whatsapp con todos los detalles incluidos.',
    },
]

function Home() {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = useMemo(() => [
        '/desktop.png',
        '/portada_movil.png',
        // Add more image URLs as needed
    ], []);

    useEffect(() => {
        const interval = setInterval(() => {
            // Avanzar al siguiente índice de imagen
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3500); // Cambiar de imagen cada 10 segundos

        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(interval);
    }, [images]);

    const comoFuncionaRef = useRef<any>();
    const preguntasFrecuentesRef = useRef<any>();
    const preciosRef = useRef<any>();

    return (
        <>

            <main className={`bg-[url('/bg.svg')] bg-white/90 bg-no-repeat bg-cover backdrop-blur-xl md:h-screen
            flex flex-col justify-start items-center`}>
                <header className=" w-full p-5">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-center md:justify-between">
                            <div className="items-center flex justify-center md:flex md:items-center md:gap-12 ">
                                <Image src="/cartalogoWhite.png"
                                    priority={true}
                                    width={200}
                                    height={200}
                                    alt="Logo de Cartalogo" />
                            </div>

                            <div className="hidden md:block text-white">
                                <nav aria-label="Global">
                                    <ul className="flex items-center gap-6 text-md text-white">
                                        <li>
                                            <div
                                                className="text-white transition hover:text-white-500/75 cursor-pointer hover:border-b hover:border-b-white"
                                                onClick={() => comoFuncionaRef.current.scrollIntoView({ behavior: 'smooth' })}
                                            >
                                                Como funciona
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className="text-white transition hover:text-white-500/75 cursor-pointer hover:border-b hover:border-b-white"
                                                onClick={() => preguntasFrecuentesRef.current.scrollIntoView({ behavior: 'smooth' })}
                                            >
                                                Preguntas frecuentes
                                            </div>
                                        </li>
                                        <li>
                                            <div
                                                className="text-white transition hover:text-white-500/75 cursor-pointer hover:border-b hover:border-b-white"
                                                onClick={() => preciosRef.current.scrollIntoView({ behavior: 'smooth' })}
                                            >
                                                Precios
                                            </div>
                                        </li>

                                    </ul>
                                </nav>
                            </div>

                        </div>
                    </div>
                </header>

                <section className="flex flex-col justify-center md:flex-row w-full md:h-screen">

                    <div className='flex flex-col basis-full justify-center md:justify-center items-start'>
                        <div className='bg-white/30 backdrop-blur-lg rounded-xl p-10'>
                            <h1 className={`${agrandir.className} text-6xl md:text-7xl font-bold text-white`}>
                                Tu
                                <span className='animate-text bg-gradient-to-r from-[#2CFFDC] via-[#FFF] to-[#2CFFDC] mx-4 bg-clip-text text-transparent'>
                                    nueva tienda
                                </span>

                                te está <br /> esperando
                            </h1>
                            <p className={`${redHat.className} text-xl text-white max-w-xl tracking-wide mt-3`}>
                                Te interesa tener tu propia tienda virtual, donde puedas mostrar tus productos al mundo y hacer crecer tu negocio
                                desde la comodidad de tu hogar.
                                <br />
                                Con nuestro servicio, tendrás todas las herramientas que necesitas para crear tu tienda en línea de manera sencilla y efectiva.
                            </p>
                        </div>
                    </div>

                    <div className='hidden md:flex basis-1/2 relative p-10'>

                        <Image fill
                            src={images[currentImageIndex]}
                            className='aspect-square rounded-md object-scale-down h-48 w-96 mr-10 shadow-md transition-opacity duration-500 ease-in-out transform'
                            alt='Imagen de la tienda' />

                    </div>



                </section>

            </main>

            <section>
                <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                        <div className="relative z-10 lg:py-16">
                            <div className="relative h-64 sm:h-80 lg:h-full">
                                <Image src="/portada_1.jpg" fill alt="Imagen de portada"
                                    className='absolute inset-2 h-full w-full object-cover ml-0 md:ml-5 rounded-xl'
                                />
                            </div>
                        </div>

                        <div className="relative flex justify-center items-center bg-terciary rounded-xl">
                            <div className="p-8 sm:p-16 lg:p-24 flex justify-center items-center flex-col">
                                <h2 className={`${agrandir.className} text-6xl md:text-7xl font-bold text-black`}>
                                    Tu propia tienda, a un click de distancia
                                </h2>

                                <p className={`${redHat.className} text-2xl max-w-xl tracking-wide mt-3 text-white`}>
                                    Desde productos hasta servicios personalizados, construí tu marca con nosotros y crecé tu negocio desde la comodidad de tu hogar.
                                    Nosotros nos encargamos de todo el mantenimiento para que te enfoques en lo que verdaderamente importa:
                                    <span className='font-extrabold tracking-wider ml-2'>
                                        vender.
                                    </span>
                                </p>

                                <a href="#"
                                    className="mt-8 inline-block rounded border border-indigo-600 bg-black px-12 py-3 text-lg font-medium 
                                    transition-opacity ease-in
                                    text-white focus:outline-none focus:ring active:text-indigo-500 hover:bg-white hover:text-black">
                                    Ver tienda demo
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div ref={comoFuncionaRef} className="bg-[url('/1.svg')] overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-white/80 backdrop-blur-lg md:bg-white rounded-xl border border-gray-200 shadow-xl">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 overflow-hidden">
                        <div className="lg:pr-8 lg:pt-4 py-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                                    Proceso de venta
                                </h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Contruí una mejor experiencia
                                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    No pierdas ventas debido a procesos de compra complicados.
                                    Con nosotros, tus clientes pueden comprar de manera rápida y sencilla,
                                    lo que se traduce en una experiencia de compra más agradable y mayores beneficios para tu negocio
                                </p>
                                <dl className="mt-3 max-w-xl space-y-6 p-3 text-base leading-7 text-gray-600 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative p-5 border border-gray-300 rounded-xl bg-white/40">
                                            <dt className="inline font-bold text-indigo-500">
                                                {feature.name}:
                                            </dt>{' '}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <img src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="Product screenshot"
                            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            width={2432} height={1442} />
                    </div>
                </div>
            </div>

            <section ref={preguntasFrecuentesRef}>
                <div className="items-center w-full my-10 px-5 py-24 mx-auto md:px-12 lg:px-16 max-w-7xl border border-gray-200 rounded-xl shadow-xl">
                    <div>
                        <div className="max-w-2xl">
                            <p className={`${agrandir.className} text-7xl font-bold text-black`}>
                                Preguntas frecuentes
                            </p>
                        </div>
                    </div>
                    <div className="w-full mx-auto mt-12 text-left">
                        <div className="relative items-center gap-12 m-auto lg:inline-flex md:order-first">
                            <div className="p-4 mx-auto lg:max-w-7xl lg:p-0">
                                <ul role="list" className="grid grid-cols-1 gap-4 list-none lg:grid-cols-3 lg:gap-12">
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                ¿Son una plataforma de ecommerce?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Nos consideramos una plataforma de ecommerce. Queremos conectar clientes con negocios de manera sencilla,
                                            al alcance de todos.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                ¿Los planes son mensuales?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Sì, los planes tienen un costo mensual fijo.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                ¿Cobran comisión por venta?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            No cobramos ninguna comisión por venta. Solamente cobramos el pago mensual.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                ¿Ustedes gestionan mis pedidos?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Nosotros nos encargamos de conectar tu negocio con los clientes.
                                            Luego, la finalización del pedido corre por cuenta del negocio.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                ¿Qué métodos de pago puedo ofrecer a mis clientes?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Estamos trabajando para integrar una pasarela de pagos para permitir
                                            cobrar a los clientes mediante transferencias y tarjetas.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                ¿Ofrecen asistencia técnica?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Sí, ofrecemos soporte técnico para ayudarte con cualquier pregunta o problema que puedas tener.
                                            Nuestro equipo está siempre en línea brindarte asistencia.
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PRICING SECTION */}
            <section ref={preciosRef} aria-labelledby="pricing-one" id="pricing-one" className='container mx-auto mt-20 bg-[url(/grid.svg)]'>
                <div className="relative items-center w-full px-8 py-24 mx-auto md:px-12 lg:px-16 max-w-7xl">
                    <p className={`${agrandir.className} text-7xl font-bold text-black mb-10`}>
                        Precios
                    </p>
                    <div className="grid max-w-2xl grid-cols-1 -mx-4 gap-y-10 sm:mx-auto lg:max-w-none lg:grid-cols-3 xl:gap-x-4 lg:-mx-8">
                        <section className="flex flex-col px-6 py-8 sm:px-8 lg:py-8 border border-gray-200  rounded-3xl">
                            <h3 className="mt-5 text-lg text-black">BÁSICO</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Excelente para empezar
                            </p>
                            <p className="order-first text-5xl font-light tracking-tight text-black">
                                120.000gs
                            </p>
                            <ul role="list" className="flex flex-col order-last mt-10 text-sm text-gray-500 gap-y-3">
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Página de ecommerce con template básico </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Funcionalidad de carrito con redirección a Whatsapp  </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Opción de autogestión de productos </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4">
                                        Soporte a convenir
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4">
                                        Límite de 30 productos
                                    </span>
                                </li>
                            </ul>
                            <a className="items-center justify-center w-full px-6 py-2.5 mt-8 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black" aria-label="Wannabe tier" href="/register">
                                Estoy interesado
                            </a>
                        </section>
                        <section className="flex flex-col px-6 py-8 bg-black rounded-3xl sm:px-8 lg:order-none">
                            <h3 className="mt-5 text-lg text-white">PRO</h3>
                            <p className="mt-2 text-sm text-gray-100">
                                Especial para fidelizar tu tienda
                            </p>
                            <p className="order-first text-5xl font-light tracking-tight text-white">
                                275.000gs
                            </p>
                            <ul role="list" className="flex flex-col order-last mt-10 text-sm text-white gap-y-3">
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Página de ecommerce con opciones extras de interfaz </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Acceso completo al panel de administración </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Métricas de productos, vistas e interacciones mensuales </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Soporte técnico prioritario </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Hasta 3 fotos por producto </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Diseño de flyers básicos para complemento de la tienda </span>
                                </li>

                            </ul>
                            <a className="items-center justify-center w-full px-6 py-2.5 mt-8 text-center text-black duration-200 bg-white border-2 border-white rounded-full nline-flex hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white text-sm focus-visible:ring-white" aria-label="Indie hacker tier" href="/register">
                                Estoy interesado
                            </a>
                        </section>
                        <section className="flex flex-col px-6 py-8 bg-gray-100 rounded-3xl sm:px-8 lg:order-none">
                            <h3 className="mt-5 text-lg text-black">PERSONALIZADO</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Para los que quieran ir más allá
                            </p>
                            <p className="order-first text-5xl font-light tracking-tight text-black">
                                Contáctanos
                            </p>
                            <ul role="list" className="flex flex-col order-last mt-10 text-sm text-gray-500 gap-y-3">
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4">
                                        Página de ecommerce con diseño a elección
                                    </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Funcionalidad de carrito con pago online nacional e internacional </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Acceso completo al dashboard de administración </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Métricas a elección (visitas, productos más vistos, interacciones y más) </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Hasta 5 fotos por producto </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Diseño de flyers a elección </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Nos adaptamos a tus necesidades especificas </span>
                                </li>
                            </ul>
                            <a className="items-center justify-center w-full px-6 py-2.5 mt-8 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black" aria-label="Big fish tier" href="/register">
                                Estoy interesado
                            </a>
                        </section>
                    </div>
                    <div className='text-gray-400 my-4'>
                        * Para servicios adicionales o personalizados consultar presupuesto - los planes iniciales son modelos predefinidos, el
                        costo puede varíar de acuerdo a las implementaciones o desarrollo que el cliente requiera. <br />
                        * Funcionalidad de pago online en base al cliente: obligación de RUC (requerimiento de procesadora BANCARD).
                    </div>
                </div>
            </section>

            <section className='bg-primary container mx-auto rounded-xl'>
                <div className="flex flex-col justify-center flex-1 px-8 py-8 md:px-12 lg:flex-none lg:px-24">
                    <div className="relative px-4 py-10 sm:px-6 lg:px-8">
                        <div className="w-full p-0 mx-auto text-center">
                            <p className={`${agrandir.className} text-5xl font-bold text-white`}>
                                Ponete en contacto con nosotros y solicitá una prueba
                            </p>
                            <p className=" mt-4 text-lg tracking-tight text-white/70">
                                Contactanos via whatsapp y solicitá una tienda de prueba, o
                                ante cualquier duda que tengas, estamos para ayudarte.
                            </p>
                        </div>
                        <div className="flex items-center justify-center w-full max-w-xl pt-8 mx-auto md:pt-6">
                            <button onClick={() => {
                                window.open('https://wa.me/+595982989819?text=Hola%20Cartalogo%20estoy%20interesado%20en%20abrir%20una%20tienda%20con%20Cartalogo', '_blank')
                            }}
                                type="button"
                                className="group inline-flex w-full items-center justify-center rounded-lg bg-green-500 px-6 py-4 mt-2
                                        text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-green-600">
                                Quiero abrir mi tienda
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="ml-2 scale-110 w-4 h-4">
                                    <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <hr className='my-10' />

            <footer className="bg-gray-50 mt-5">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="flex justify-center text-teal-600 sm:justify-start">
                            <Image src={"/cartalogoBlack.png"} alt='Logo de cartalogo' width={200} height={200} />
                        </div>

                        <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                            Copyright &copy; 2023 - 🇵🇾
                        </p>
                    </div>
                </div>
            </footer>

        </>

    );
}

export default Home;