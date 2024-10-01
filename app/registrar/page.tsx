"use client";
import { useEffect, useState } from "react";
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import * as Toast from "@radix-ui/react-toast";
import { redirect, useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";
import { useUser } from "../hooks/user-user";

interface Formulario {
    user_id: number | null;
    nombre: string;
    telefono: number | null;
    ubicacion: string;
    plan_id: number;
    url: string;
    url_logo: string;
    imagen_portada: string;
    descripcion?: string;
    redes?: Array<string>;
    colores?: Array<string> | string;
}

function Create() {
    const [procesandoCreacion, setProcesandoCreacion] = useState(false);
    const [showToastError, setShowToastError] = useState(false);
    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [imagenLogo, setImagenLogo] = useState();
    const [instagram, setInstagram] = useState<string>("");
    const [facebook, setFacebook] = useState<string>("");
    const [imagenPortada, setImagenPortada] = useState();

    const router = useRouter();

    const supabase = createClient();

    const { user } = useUser();

    const [formulario, setFormulario] = useState<Formulario>({
        user_id: null,
        nombre: "",
        descripcion: "",
        telefono: null,
        ubicacion: "",
        redes: [],
        colores: "",
        plan_id: 1,
        url: "",
        url_logo: "",
        imagen_portada: "",
    });

    const handleChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        const valor = type === "checkbox" ? checked : value;
        setFormulario({ ...formulario, [name]: valor });
    };

    const makeUrlForTienda = (texto: string) => {
        // Convertir el texto a minúsculas
        const textoEnMinusculas = texto.toLowerCase();
        // Reemplazar espacios en blanco con guiones ("-")
        const textoFormateado = textoEnMinusculas.replace(/\s+/g, "-");
        return textoFormateado;
    };

    function changeImagenLogo(event: any) {
        const logoFile = event.target.files[0];
        setImagenLogo(logoFile);
    }

    function changeImagenPortada(event: any) {
        const portadaFile = event.target.files[0];
        setImagenPortada(portadaFile);
    }

    const saveImagenes = async () => {
        if (imagenLogo === undefined || imagenPortada === undefined) {
            setShowToastError(true);
            return;
        }
        setProcesandoCreacion(true);
        try {
            let folderName = makeUrlForTienda(formulario.nombre!);
            const { data: logoImagenData, error: errorLogoImagenData } =
                await supabase.storage
                    .from("cartalogo_imagenes")
                    //@ts-ignore
                    .upload(
                        `${folderName}/logo_${
                            Math.floor(Math.random() * 1000000) + 1
                        }.png`,
                        imagenLogo
                    );

            const { data: portadaImagenData, error: errorPortadaImagenData } =
                await supabase.storage
                    .from("cartalogo_imagenes")
                    //@ts-ignore
                    .upload(
                        `${folderName}/portada_${
                            Math.floor(Math.random() * 1000000) + 1
                        }.png`,
                        imagenPortada
                    );
            if (errorLogoImagenData || errorPortadaImagenData) {
                console.error("Error acá: ", {
                    errorLogoImagenData,
                    errorPortadaImagenData,
                });
            } else {
                const [logoUrlResponse, portadaUrlResponse] = await Promise.all(
                    [
                        supabase.storage
                            .from("cartalogo_imagenes")
                            .getPublicUrl(logoImagenData.path),
                        supabase.storage
                            .from("cartalogo_imagenes")
                            .getPublicUrl(portadaImagenData.path),
                    ]
                );
                console.log(
                    "Imagenes subidas correctamente. Ver imagenes:",
                    logoUrlResponse.data.publicUrl,
                    portadaUrlResponse.data.publicUrl
                );
                setFormulario({
                    ...formulario,
                    url_logo: logoUrlResponse.data.publicUrl,
                    imagen_portada: portadaUrlResponse.data.publicUrl,
                });
                setFormulario((formValue) => {
                    console.log("El nuevo valor de form:", formValue);
                    handleSubmit(formValue);
                    return formValue;
                });
            }
        } catch (error) {
            console.log("Error en subida: ", error);
        }
    };

    const handleSubmit = async (formValue: Formulario) => {
        try {
            let jsonData = Object.fromEntries(
                Object.entries(formValue).filter(([_, valor]) => valor !== "")
            );
            jsonData.url = jsonData.url;
            jsonData.redes = [`https://instagram.com/${instagram}`, facebook];
            jsonData.user_id = user?.id;
            if (jsonData.user_id === null) {
                console.error("No autorizado");
                return;
            } else {
                jsonData.user_id = user?.id;
            }
            console.log("JSON FINAL ENVIADO: ", jsonData);
            const { data, error } = await supabase
                .from("tiendas")
                .insert(jsonData)
                .select();
            if (error) {
                console.error("Error al insertar la tienda:", error.message);
                // setShowToastError(true);
                setProcesandoCreacion(false);
            } else {
                console.log("Tienda registrada con éxito:", data);
                setShowToastSuccess(true);
                router.push(`/${data[0].url}/dashboard`);
            }
        } catch (error: any) {
            console.error("Error en la inserción:", error.message);
            setProcesandoCreacion(false);
        }
        setProcesandoCreacion(false);
    };

    // if (!user) return redirect("/");

    return (
        <section className="bg-white">
            {showToastError && (
                <>
                    <Toast.Provider swipeDirection="right" duration={5000}>
                        <Toast.Root
                            className="bg-red-500 text-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
                        p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] 
                        grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide 
                        data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 
                        data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
                            open={showToastError}
                            onOpenChange={setShowToastError}
                        >
                            <Toast.Title className="[grid-area:_title] mb-[5px] font-bold text-slate12 text-lg text-white">
                                Error al registrar la tienda
                            </Toast.Title>
                            <Toast.Description className="text-white">
                                Por favor, complete todos los campos necesarios
                                para registrar tu tienda
                            </Toast.Description>
                            <Toast.Action
                                className="[grid-area:_action]"
                                asChild
                                altText="Goto schedule to undo"
                            >
                                <button
                                    className="inline-flex bg-black text-white px-3 py-2 rounded-lg items-center justify-center font-medium text-md 
                            leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px]
                            shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8"
                                >
                                    Entiendo
                                </button>
                            </Toast.Action>
                        </Toast.Root>
                        <Toast.Viewport
                            className="[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col 
            p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
                        />
                    </Toast.Provider>
                </>
            )}

            {showToastSuccess && (
                <>
                    <Toast.Provider swipeDirection="right" duration={5000}>
                        <Toast.Root
                            className="bg-green-500 text-white flex flex-col rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
                        p-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide 
                        data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 
                        data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
                            open={showToastSuccess}
                            onOpenChange={setShowToastSuccess}
                        >
                            <Toast.Title className="[grid-area:_title] mb-[5px] font-bold text-slate12 text-xl text-white">
                                ¡Tu nueva tienda fue registrada!
                            </Toast.Title>
                            <Toast.Description>
                                Gracias por utilizar Cartalogo, te
                                redirecionaremos para que continues tu
                                aventura...
                            </Toast.Description>
                        </Toast.Root>
                        <Toast.Viewport
                            className="[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col 
            p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none"
                        />
                    </Toast.Provider>
                </>
            )}

            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative bg-[#2b42ff] h-16 flex justify-center items-center lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <blockquote className="bg-white mx-10 rounded-xl p-8 hidden lg:flex lg:flex-col">
                        <div className="flex items-center gap-4">
                            <Image
                                width={64}
                                height={64}
                                alt="Avatar"
                                src="https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/cartalogo_imagenes/hola2/330858.png"
                            />
                            <div>
                                <div className="flex justify-start gap-0.5 text-yellow-400">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>

                                <p className="mt-1 text-lg font-medium text-gray-700">
                                    Recomendaciones
                                </p>
                            </div>
                        </div>

                        <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
                            <span className="font-bold">
                                Fotografía de alta calidad:
                            </span>{" "}
                            Asegúrate de que las imágenes de tus productos sean
                            de alta resolución y calidad. <br />
                            Esto ayuda a los clientes a ver los detalles y la
                            calidad de los productos.
                        </p>
                    </blockquote>
                </aside>

                <main className="flex flex-col items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <h1 className="text-3xl font-bold text-black my-5 mx-3 tracking-wide">
                        ¡Tu nueva tienda está a 1 click de distancia! 🚀
                    </h1>

                    <p className="mt-4 leading-relaxed text-gray-500">
                        Te pedimos que completes estos datos iniciales para
                        saber más sobre tu tienda
                    </p>

                    <div className="flex flex-col bg-white p-5 rounded-xl border border-gray-200 mt-10">
                        <Form.Root className="w-[300px] lg:w-[400px]">
                            {/* NOMBRE FIELD */}
                            <Form.Field
                                className="grid mb-[10px]"
                                name="nombre"
                                id="nombre"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                        <span className="text-red-500">*</span>{" "}
                                        Nombre de la tienda
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        id="nombre"
                                        className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                            rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                            outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                        type="text"
                                        name="nombre"
                                        value={formulario.nombre}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Control>
                            </Form.Field>
                            <Form.Field
                                className="grid mb-[10px]"
                                name="url"
                                id="url"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                        <span className="text-red-500">*</span>{" "}
                                        Link de la tienda para compartir
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        id="url"
                                        className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                            rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                            outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                        type="text"
                                        name="url"
                                        value={formulario.url}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Control>
                                <Form.Message className="text-gray-700 mt-2 mb-2">
                                    Ingrese como le gustaria que se comparta el
                                    link a la tienda. Agregaremos el link al
                                    final de nuestra página. <br />
                                    <span className="text-black font-bold">
                                        Ejemplo:
                                    </span>{" "}
                                    bspy.com.py/tatoartesania <br />
                                    <span className="text-black font-bold">
                                        Actual:
                                    </span>{" "}
                                    bspy.com.py/{formulario.url}
                                </Form.Message>
                            </Form.Field>
                            {/* telefono field */}
                            <Form.Field
                                className="grid mb-[10px]"
                                name="telefono"
                                id="telefono"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                        <span className="text-red-500">*</span>{" "}
                                        Teléfono de la tienda
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        id="telefono"
                                        className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                            rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                            outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                        type="text"
                                        name="telefono"
                                        value={
                                            formulario.telefono === null
                                                ? ""
                                                : formulario.telefono
                                        }
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Control>
                            </Form.Field>
                            {/* ubicacion field */}
                            <Form.Field
                                className="grid mb-[10px]"
                                name="ubicacion"
                                id="ubicacion"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                        <span className="text-red-500">*</span>{" "}
                                        Ubicación de la tienda
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        id="ubicacion"
                                        className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                            rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                            outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                        type="text"
                                        name="ubicacion"
                                        value={formulario.ubicacion}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Control>
                            </Form.Field>

                            {/* LOGO DE LA TIENDA */}
                            <Form.Field
                                className="grid mb-[10px]"
                                name="logo"
                                id="logo"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                        <span className="text-red-500">*</span>{" "}
                                        Logo de la tienda
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        id="logo"
                                        className="block w-full text-sm border border-gray-300 py-2
                                        rounded-lg cursor-pointer bg-white focus:outline-none first-letter:rounded-[4px] text-[15px] 
                                        leading-none text-black shadow-[0_0_0_1px] 
                                        outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                        type="file"
                                        name="logo"
                                        onChange={changeImagenLogo}
                                        required
                                    />
                                </Form.Control>
                            </Form.Field>

                            {/* PORTADA */}
                            <Form.Field
                                className="grid mb-[10px]"
                                name="logo"
                                id="portada"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                        <span className="text-red-500">*</span>{" "}
                                        Portada de la tienda
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        id="portada"
                                        className="block w-full text-sm border border-gray-300 py-2
                                        rounded-lg cursor-pointer bg-white focus:outline-none first-letter:rounded-[4px] text-[15px] 
                                        leading-none text-black shadow-[0_0_0_1px] 
                                        outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                        type="file"
                                        name="portada"
                                        onChange={changeImagenPortada}
                                        required
                                    />
                                </Form.Control>
                            </Form.Field>

                            {/* DESCRIPCION FIELD */}
                            <Form.Field
                                className="grid mb-[10px]"
                                name="descripcion"
                                id="descripcion"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                        <span className="text-red-500">*</span>{" "}
                                        Descripción de la tienda
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <textarea
                                        id="descripcion"
                                        className="box-border w-full bg-white shadow-blackA9 inline-flex appearance-none items-center justify-center 
                                                rounded-[4px] p-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none 
                                                hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 resize-none"
                                        name="descripcion"
                                        rows={5}
                                        value={formulario.descripcion}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Control>
                            </Form.Field>
                            <Form.Field
                                className="grid mb-[10px]"
                                name="instagram"
                                id="instagram"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                        Instagram
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        id="instagram"
                                        className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
            rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
            outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                        type="text"
                                        name="instagram"
                                        value={instagram}
                                        onChange={(e) =>
                                            setInstagram(e.target.value)
                                        }
                                    />
                                </Form.Control>
                            </Form.Field>

                            {/* Campo para Facebook */}
                            <Form.Field
                                className="grid mb-[10px]"
                                name="facebook"
                                id="facebook"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                        Facebook
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <input
                                        id="facebook"
                                        className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
            rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
            outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                        type="text"
                                        name="facebook"
                                        value={facebook}
                                        onChange={(e) =>
                                            setFacebook(e.target.value)
                                        }
                                    />
                                </Form.Control>
                            </Form.Field>
                        </Form.Root>
                        <Form.Submit asChild>
                            <button
                                onClick={saveImagenes}
                                type="button"
                                disabled={procesandoCreacion}
                                className={`
                                box-border w-full text-white shadow-blackA7 
                                hover:bg-green-700
                                inline-flex h-[35px] items-center 
                                justify-center rounded-[4px] ${
                                    procesandoCreacion
                                        ? "bg-green-500"
                                        : "bg-black"
                                } px-[15px] font-medium 
                                leading-none mt-[10px]
                                `}
                            >
                                {procesandoCreacion
                                    ? "Registrando tienda..."
                                    : "Registrar tienda"}
                            </button>
                        </Form.Submit>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default Create;
