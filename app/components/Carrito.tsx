"use client";
import { useCart } from "react-use-cart";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export const Carrito = ({ tienda }: any) => {
    const { removeItem, items, cartTotal } = useCart();

    const formatNumber = (number: number) => {
        if (number) {
            const exp = /(\d)(?=(\d{3})+(?!\d))/g;
            const rep = "$1.";
            let arr = number.toString().split(".");
            arr[0] = arr[0].replace(exp, rep);
            return arr[1] ? arr.join(".") : arr[0];
        }
    };

    const generarMensaje = (
        telefono: number,
        productos: any[],
        totalCarrito: number
    ) => {
        let apiWhatspp = `https://api.whatsapp.com/send/?phone=${telefono}&text=`;
        let texto = `Hola!%20vi%20${
            productos.length === 1 ? "este" : "estos"
        }%20${productos.length === 1 ? "producto" : "productos"}%20en%20la%20web
    %20y%20quiero%20confirmar%20el%20pedido:%0A`;
        let nombresProductos = productos.map(
            (producto) =>
                producto.nombre +
                " " +
                `(Cantidad: ${producto.quantity ? producto.quantity : 1}).` +
                "%0A"
        );
        let replaced = nombresProductos.join("").replace(/ /g, "%20");
        let final =
            apiWhatspp +
            texto +
            replaced +
            "%0A" +
            `${
                totalCarrito
                    ? `El%20total%20según%20la%20web%20es%20de%20${formatNumber(
                          totalCarrito
                      )}%20.`
                    : ""
            }`;
        return final;
    };

    if (items.length === 0 && !tienda) return <div>Loading...</div>;

    return (
        <>
            <div className="min-h-screen">
                <div className="flex flex-col items-center border-b bg-gray-100 py-4 sm:px-10 lg:px-20 xl:px-32">
                    <p className="text-2xl font-bold text-gray-800">
                        Carrito de compras
                    </p>
                    <div className="mt-4 py-2 text-xs sm:mt-0 flex flex-col md:flex-row items-center justify-center sm:text-base w-full">
                        <div className="relative my-5">
                            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <span className="font-semibold text-gray-900">
                                        Comprar
                                    </span>
                                </li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2">
                                        2
                                    </div>
                                    <span className="font-semibold text-gray-900">
                                        Confirmar
                                    </span>
                                </li>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                                <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white">
                                        3
                                    </div>
                                    <span className="font-semibold text-gray-500">
                                        Contactar
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start items-center mx-auto ml-10">
                    <Link
                        href={`/${tienda.url}`}
                        className="mt-3 flex rounded p-2 items-center text-gray-500 transition-all duration-200 ease-in-out 
                            focus:shadow bg-black hover:bg-red-500"
                    >
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                {" "}
                                <path
                                    d="M7 12L17 12M7 12L11 8M7 12L11 16"
                                    stroke="#ffffff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>{" "}
                            </g>
                        </svg>
                        <span className="text-white font-bold">
                            Volver a la tienda
                        </span>
                    </Link>
                </div>

                <hr className="my-3" />

                <div className="flex w-full lg:px-20 xl:px-32">
                    <div className="px-4 pt-8 w-full">
                        <p className="text-2xl text-black font-bold">
                            Productos elegidos
                        </p>
                        <p className="text-gray-400">
                            Por favor, revisa los productos elegidos antes de
                            proceder a la compra
                        </p>
                        <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                            {items && items.length >= 1 ? (
                                <>
                                    {items.map((prod) => {
                                        const priceFormatted = parseInt(
                                            `${prod.price}`,
                                            10
                                        );
                                        return (
                                            <motion.div
                                                className="flex flex-col rounded-lg bg-white sm:flex-row border border-gray-200 p-4"
                                                key={prod.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="w-full p-2">
                                                    <Image
                                                        src={
                                                            prod.imagenes
                                                                ?.length >= 1
                                                                ? prod
                                                                      .imagenes[0]
                                                                : "https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/bspy/cartalogo/white.png"
                                                        }
                                                        alt="Logo de la tienda"
                                                        width={300}
                                                        height={300}
                                                        priority={true}
                                                    />
                                                </div>
                                                <div className="flex w-full flex-col px-4 py-4">
                                                    <span className="font-semibold text-xl text-black">
                                                        {prod.nombre} (
                                                        {prod.quantity}{" "}
                                                        {prod.quantity === 1
                                                            ? "unidad"
                                                            : "unidades"}
                                                        )
                                                    </span>
                                                    <p className="text-lg font-bold">
                                                        Gs{" "}
                                                        {priceFormatted.toLocaleString(
                                                            "es-ES"
                                                        )}
                                                    </p>

                                                    {prod.attributes &&
                                                        Object.keys(
                                                            prod.attributes
                                                        ).length > 0 && (
                                                            <div className="mt-2">
                                                                <p className="font-semibold text-sm text-gray-700">
                                                                    Detalles:
                                                                </p>
                                                                <ul className="list-disc list-inside">
                                                                    {Object.entries(
                                                                        prod.attributes
                                                                    ).map(
                                                                        ([
                                                                            key,
                                                                            value,
                                                                        ]) => (
                                                                            <li
                                                                                key={
                                                                                    key
                                                                                }
                                                                                className="text-sm text-gray-600"
                                                                            >
                                                                                <span className="font-medium">
                                                                                    {
                                                                                        key
                                                                                    }

                                                                                    :
                                                                                </span>{" "}
                                                                                {typeof value ===
                                                                                    "string" ||
                                                                                typeof value ===
                                                                                    "number"
                                                                                    ? value
                                                                                    : JSON.stringify(
                                                                                          value
                                                                                      )}
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ul>
                                                            </div>
                                                        )}

                                                    <motion.button
                                                        type="button"
                                                        onClick={() =>
                                                            removeItem(prod.id)
                                                        }
                                                        className="mt-3 w-32 flex rounded-xl p-2 justify-center items-center text-gray-500 transition-all duration-200 ease-in-out 
                                                        focus:shadow bg-red-500 hover:bg-red-800"
                                                        whileHover={{
                                                            scale: 1.05,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.95,
                                                        }}
                                                    >
                                                        <svg
                                                            className="h-5 w-5 text-white"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M6 18L18 6M6 6l12 12"
                                                                className=""
                                                            ></path>
                                                        </svg>{" "}
                                                        <span className="text-white font-bold">
                                                            Eliminar
                                                        </span>
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                    <hr />
                                    <div className="flex justify-center items-center mt-10">
                                        <button
                                            onClick={($event) => {
                                                $event.stopPropagation();
                                                let url = generarMensaje(
                                                    tienda.telefono,
                                                    items,
                                                    cartTotal
                                                );
                                                window.open(url, "_blank");
                                            }}
                                            type="button"
                                            className="group my-10 inline-flex w-64 items-center justify-center rounded-md bg-green-500 px-6 py-4 
                                        text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-green-600"
                                        >
                                            Finalizar compra
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
                                </>
                            ) : (
                                <h1>
                                    Empieza a comprar para ver los productos!
                                </h1>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
