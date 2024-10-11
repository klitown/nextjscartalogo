"use client";

import { useRef } from "react";
import localFont from "next/font/local";
import { Red_Hat_Display } from "next/font/google";
import Image from "next/image";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BackgroundGradientAnimation } from "./components/background-gradient-animation";
import Link from "next/link";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import FeaturesSectionDemo from "@/components/blocks/features-section-demo-2";

// Font files can be colocated inside of `app`
const agrandir = localFont({
    src: "./agrandir.otf",
    display: "swap",
});
const redHat = Red_Hat_Display({
    subsets: ["latin"],
    display: "swap",
});

const features = [
    {
        name: "Visita a tu tienda",
        description:
            "Con tu tienda en línea, tus clientes solo deben navegar a tu sitio web y empezar a ver tus productos",
    },
    {
        name: "Agregar al carrito",
        description:
            "Una vez que se elija un producto, se añade el producto al carrito integrado de tu sitio web",
    },
    {
        name: "Finalizar compra",
        description:
            "El pedido te llega directamente al Whatsapp con todos los detalles incluidos.",
    },
];

const pricingTiers = [
    {
        name: "GRATIS",
        price: "0gs",
        description: "Perfecto para probar",
        features: [
            "Límite de 10 productos",
            "Funcionalidad de carrito con redirección a Whatsapp",
            "Opción de autogestión de productos",
            "Soporte limitado",
        ],
        highlight: false,
    },
    {
        name: "BÁSICO",
        price: "50.000gs",
        description: "Excelente para empezar",
        features: [
            "Límite de 30 productos",
            "Funcionalidad de carrito con redirección a Whatsapp",
            "Opción de autogestión de productos",
            "Soporte prioritario",
            "Actualizaciones preferenciales",
            "Detalles de productos personalizados",
        ],
        highlight: true,
    },
];

function Home() {
    const comoFuncionaRef = useRef<any>();
    const preguntasFrecuentesRef = useRef<any>();
    const preciosRef = useRef<any>();

    return (
        <>
            <div className="bg-[url(/grid.svg)]">
                <div className={`flex flex-col justify-start items-center`}>
                    <header className="w-full p-5">
                        <div className="px-4 sm:px-6 lg:px-8 bg-black rounded-xl">
                            <div className="flex flex-col md:flex-row h-32 gap-4 md:gap-0 md:h-16 items-center justify-center md:justify-between">
                                <div className="items-center flex justify-center md:flex md:items-center md:gap-12 ">
                                    <Image
                                        src="/bspy.png"
                                        priority={true}
                                        width={100}
                                        height={100}
                                        alt="Logo de BSPY"
                                    />
                                </div>

                                <div className="hidden md:block text-white">
                                    <nav aria-label="Global">
                                        <ul className="flex items-center gap-6 text-md text-white">
                                            <li>
                                                <div
                                                    className="text-white transition hover:text-white-500/75 cursor-pointer hover:border-b hover:border-b-white"
                                                    onClick={() =>
                                                        comoFuncionaRef.current.scrollIntoView(
                                                            {
                                                                behavior:
                                                                    "smooth",
                                                            }
                                                        )
                                                    }
                                                >
                                                    Como funciona
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="text-white transition hover:text-white-500/75 cursor-pointer hover:border-b hover:border-b-white"
                                                    onClick={() =>
                                                        preguntasFrecuentesRef.current.scrollIntoView(
                                                            {
                                                                behavior:
                                                                    "smooth",
                                                            }
                                                        )
                                                    }
                                                >
                                                    Preguntas frecuentes
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="text-white transition hover:text-white-500/75 cursor-pointer hover:border-b hover:border-b-white"
                                                    onClick={() =>
                                                        preciosRef.current.scrollIntoView(
                                                            {
                                                                behavior:
                                                                    "smooth",
                                                            }
                                                        )
                                                    }
                                                >
                                                    Precios
                                                </div>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>

                                <div className="">
                                    <Link
                                        href={"/login"}
                                        className="group relative inline-flex h-[calc(38px+10px)] items-center justify-center rounded-full bg-orange-600 py-1 pl-6 pr-14 font-medium text-neutral-50"
                                    >
                                        <span className="z-10 pr-2 font-bold">
                                            Crear mi tienda
                                        </span>
                                        <div className="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full bg-orange-700 transition-[width] group-hover:w-[calc(100%-8px)]">
                                            <div className="mr-3.5 flex items-center justify-center">
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 text-neutral-50"
                                                >
                                                    <path
                                                        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </header>

                    <HeroHighlight>
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: [20, -5, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.4, 0.0, 0.2, 1],
                            }}
                            className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl 
                        leading-relaxed lg:leading-snug text-center mx-auto "
                        >
                            Tu propia tienda a tan solo{" "}
                            <Highlight className="text-black dark:text-white">
                                unos clicks de distancia.
                            </Highlight>
                        </motion.h1>
                    </HeroHighlight>
                </div>
                <section className="my-20">
                    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                            <div className="relative z-10 lg:py-16">
                                <div className="relative h-64 sm:h-80 lg:h-full">
                                    <Image
                                        src="/stock_image.jpeg"
                                        fill
                                        alt="Imagen de portada"
                                        className="absolute inset-2 h-full w-full object-cover ml-0 md:ml-5 rounded-xl"
                                    />
                                </div>
                            </div>

                            <div className="relative flex justify-center items-center bg-gradient-to-br from-orange-500 to-black rounded-xl">
                                <div className="p-8 sm:p-16 lg:p-24 flex justify-center items-center flex-col">
                                    <h2
                                        className={`${agrandir.className} text-6xl md:text-7xl font-bold text-white`}
                                    >
                                        Construí tu negocio con nosotros
                                    </h2>

                                    <p
                                        className={`${redHat.className} text-2xl max-w-xl tracking-wide mt-3 text-white`}
                                    >
                                        Construí tu marca con nosotros y crecé
                                        tu negocio desde la comodidad de tu
                                        hogar. Nosotros nos encargamos de todo
                                        el mantenimiento para que te enfoques en
                                        lo que verdaderamente importa:
                                        <span className="font-extrabold tracking-wider ml-2">
                                            vender.
                                        </span>
                                    </p>

                                    <Link
                                        href={`https://bspy.com.py/icases`}
                                        target="__blank"
                                        className="my-6 group relative inline-flex h-12 items-center justify-center rounded-md bg-white px-6 font-medium 
                                text-black"
                                    >
                                        <span>Ver tienda ejemplo</span>
                                        <div className="relative ml-1 h-5 w-5 overflow-hidden">
                                            <div className="absolute transition-all duration-200 group-hover:-translate-y-5 group-hover:translate-x-4">
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5"
                                                >
                                                    <path
                                                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                                <svg
                                                    width="15"
                                                    height="15"
                                                    viewBox="0 0 15 15"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-5 w-5 -translate-x-4"
                                                >
                                                    <path
                                                        d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9.00001C12 9.27615 11.7761 9.50001 11.5 9.50001C11.2239 9.50001 11 9.27615 11 9.00001V4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z"
                                                        fill="currentColor"
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                    ></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div
                    ref={comoFuncionaRef}
                    className="mx-auto max-w-7xl p-10 lg:px-8 bg-white/80 backdrop-blur-lg md:bg-white rounded-xl border border-gray-200 shadow-xl"
                >
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Una mejor experiencia
                    </p>
                    <FeaturesSectionDemo />
                </div>
                <div
                    ref={preguntasFrecuentesRef}
                    className="items-center w-full px-5  mx-auto md:px-12 lg:px-16 max-w-7xl my-24"
                >
                    <div className="max-w-2xl">
                        <p
                            className={`${agrandir.className} text-6xl md:text-7xl font-bold text-orange-500`}
                        >
                            Preguntas frecuentes
                        </p>
                    </div>

                    <BackgroundGradientAnimation interactive={false}>
                        <div className="relative items-center gap-12 m-auto lg:inline-flex md:order-first p-4 md:p-20">
                            <div className="p-4 mx-auto lg:max-w-7xl lg:p-0">
                                <ul
                                    role="list"
                                    className="grid grid-cols-1 gap-4 list-none lg:grid-cols-3 lg:gap-12"
                                >
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-white">
                                                ¿Son una plataforma de
                                                ecommerce?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-orange-400">
                                            Nos consideramos una plataforma de
                                            ecommerce. Queremos conectar
                                            clientes con negocios de manera
                                            sencilla, al alcance de todos.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-white">
                                                ¿Los planes son mensuales?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-orange-400">
                                            Sì, los planes tienen un costo
                                            mensual fijo.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-white">
                                                ¿Cobran comisión por venta?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-orange-400">
                                            No cobramos ninguna comisión por
                                            venta. Solamente cobramos el pago
                                            mensual.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-white">
                                                ¿Ustedes gestionan mis pedidos?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-orange-400">
                                            Nosotros nos encargamos de conectar
                                            tu negocio con los clientes. Luego,
                                            la finalización del pedido corre por
                                            cuenta del negocio.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-white">
                                                ¿Qué métodos de pago puedo
                                                ofrecer a mis clientes?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-orange-400">
                                            Estamos trabajando para integrar una
                                            pasarela de pagos para permitir
                                            cobrar a los clientes mediante
                                            transferencias y tarjetas.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-white">
                                                ¿Ofrecen asistencia técnica?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-orange-400">
                                            Sí, ofrecemos soporte técnico para
                                            ayudarte con cualquier pregunta o
                                            problema que puedas tener. Nuestro
                                            equipo está siempre en línea
                                            brindarte asistencia.
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </BackgroundGradientAnimation>
                </div>
                {/* PRICING SECTION */}
                <section
                    ref={preciosRef}
                    aria-labelledby="pricing-one"
                    id="pricing-one"
                    className="container mx-auto"
                >
                    <div className="relative items-center w-full px-8 py-8 mx-auto md:px-12 lg:px-16 max-w-7xl">
                        <p
                            className={`${agrandir.className} text-7xl font-bold text-black mb-10`}
                        >
                            Precios
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {pricingTiers.map((tier, index) => (
                                <Card
                                    key={tier.name}
                                    className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                                        tier.highlight ? "scale-105 z-10" : ""
                                    }`}
                                >
                                    <div
                                        className={`absolute inset-0 ${
                                            index === 0
                                                ? "bg-gradient-to-br from-orange-100 via-orange-200 to-orange-100"
                                                : "bg-gradient-to-br from-black via-orange-900 to-black"
                                        } opacity-90`}
                                    />
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-30" />

                                    <CardHeader className="relative z-10">
                                        <CardTitle
                                            className={`text-4xl font-bold ${
                                                index === 0
                                                    ? "text-orange-800"
                                                    : "text-orange-500"
                                            }`}
                                        >
                                            {tier.price}
                                        </CardTitle>
                                        <CardDescription
                                            className={`text-2xl font-semibold mt-2 ${
                                                index === 0
                                                    ? "text-orange-900"
                                                    : "text-white"
                                            }`}
                                        >
                                            {tier.name}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="relative z-10">
                                        <p
                                            className={`mb-6 ${
                                                index === 0
                                                    ? "text-orange-800"
                                                    : "text-gray-300"
                                            }`}
                                        >
                                            {tier.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {tier.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className={`flex items-center ${
                                                        index === 0
                                                            ? "text-orange-900"
                                                            : "text-white"
                                                    }`}
                                                >
                                                    <Check
                                                        className={`h-5 w-5 mr-2 ${
                                                            index === 0
                                                                ? "text-orange-600"
                                                                : "text-orange-500"
                                                        }`}
                                                    />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                    <CardFooter className="relative z-10">
                                        <Button
                                            onClick={() => {
                                                window.open(
                                                    "https://wa.me/+595984659792?text=Hola%20BSPY%20estoy%20interesado%20en%20abrir%20una%20tienda%20con%20ustedes",
                                                    "_blank"
                                                );
                                            }}
                                            className={`w-full ${
                                                index === 0
                                                    ? "bg-orange-600 hover:bg-orange-700 text-white"
                                                    : "bg-orange-500 hover:bg-orange-600 text-white"
                                            }`}
                                        >
                                            Quiero el {tier.name}
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="bg-black container mx-auto rounded-xl my-10">
                    <div className="flex flex-col justify-center flex-1 px-8 py-12 md:px-12 lg:flex-none lg:px-24">
                        <div className="relative px-4 py-10 sm:px-6 lg:px-8">
                            <div className="w-full p-0 mx-auto text-center">
                                <p
                                    className={`${agrandir.className} text-5xl font-bold text-white`}
                                >
                                    Ponete en contacto con nosotros y solicitá
                                    una prueba
                                </p>
                                <p className=" mt-4 text-lg tracking-tight text-white/70">
                                    Contactanos via whatsapp y solicitá una
                                    tienda de prueba, o ante cualquier duda que
                                    tengas, estamos para ayudarte.
                                </p>
                            </div>
                            <div className="flex items-center justify-center w-full max-w-xl pt-8 mx-auto md:pt-6">
                                <button
                                    onClick={() => {
                                        window.open(
                                            "https://wa.me/+595984659792?text=Hola%20BSPY%20estoy%20interesado%20en%20abrir%20una%20tienda%20con%20ustedes",
                                            "_blank"
                                        );
                                    }}
                                    type="button"
                                    className="group inline-flex w-full items-center justify-center rounded-lg bg-green-500 px-6 py-4 mt-2
                                        text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-green-600"
                                >
                                    Quiero abrir mi tienda
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                        className="ml-2 scale-110 w-4 h-4"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                <hr />
                <footer className="mt-12">
                    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-center text-teal-600">
                                <Image
                                    src={"/bspy.png"}
                                    alt="Logo de cartalogo"
                                    width={200}
                                    height={200}
                                    className="rounded-md"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Home;
