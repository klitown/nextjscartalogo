"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";
import { useUser } from "../hooks/user-user";
import { Toast, ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";

interface FormInputs {
    nombre: string;
    telefono: string;
    ubicacion: string;
    url: string;
    descripcion: string;
    instagram?: string;
    facebook?: string;
}

function Create() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FormInputs>();
    const [procesandoCreacion, setProcesandoCreacion] = useState(false);

    const [imagenLogo, setImagenLogo] = useState<File | undefined>();
    const [imagenPortada, setImagenPortada] = useState<File | undefined>();

    const router = useRouter();
    const supabase = createClient();
    const { user } = useUser();
    const { toast } = useToast();

    const makeUrlForTienda = (texto: string) => {
        return texto.toLowerCase().replace(/\s+/g, "-");
    };

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        if (!imagenLogo || !imagenPortada || !user?.id) {
            toast({
                variant: "destructive",
                title: "Error al registrar la tienda",
                description:
                    "Por favor, complete todos los campos necesarios para registrar tu tienda",
                action: (
                    <ToastAction altText="Intentar nuevamente">
                        Entiendo
                    </ToastAction>
                ),
            });
            return;
        }

        setProcesandoCreacion(true);

        try {
            const folderName = makeUrlForTienda(data.nombre);

            const uploadImage = async (file: File, prefix: string) => {
                const { data: uploadData, error } = await supabase.storage
                    .from("bspy")
                    .upload(`${folderName}/${prefix}_${Date.now()}.png`, file);

                if (error) throw error;

                const { data: urlData } = await supabase.storage
                    .from("bspy")
                    .getPublicUrl(uploadData.path);

                return urlData.publicUrl;
            };

            const [url_logo, imagen_portada] = await Promise.all([
                uploadImage(imagenLogo, "logo"),
                uploadImage(imagenPortada, "portada"),
            ]);

            const jsonData = {
                ...data,
                url_logo,
                imagen_portada,
                redes: [
                    `https://instagram.com/${data.instagram}`,
                    data.facebook,
                ],
                user_id: user.id,
                plan_id: 1,
            };

            // Remove facebook and instagram
            delete jsonData.instagram;
            delete jsonData.facebook;

            const { data: insertedData, error } = await supabase
                .from("tiendas")
                .insert(jsonData)
                .select();

            if (error) throw error;
            toast({
                title: "¡Tu nueva tienda fue registrada!",
                description:
                    "Gracias por utilizar Cartalogo, te redirecionaremos para que continues tu aventura...",
                action: (
                    <ToastAction altText="Intentar nuevamente">
                        Entendido
                    </ToastAction>
                ),
            });
            router.push(`/${insertedData[0].url}/dashboard`);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error al registrar la tienda",
                description:
                    "Hubo un problema al procesar tu solicitud. Por favor, intenta nuevamente.",
                action: (
                    <ToastAction altText="Intentar nuevamente">
                        Entiendo
                    </ToastAction>
                ),
            });
        } finally {
            setProcesandoCreacion(false);
        }
    };

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <aside className="relative bg-[#2b42ff] h-16 flex justify-center items-center lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
                    <blockquote className="bg-white mx-10 rounded-xl p-8 hidden lg:flex lg:flex-col">
                        <div className="flex items-center gap-4">
                            <Image
                                width={64}
                                height={64}
                                alt="Avatar"
                                src="https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/bspy/hola2/330858.png"
                            />
                            <div>
                                <div className="flex justify-start gap-0.5 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
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
                        saber más sobre tu tienda. <br />
                        No te preocupes, podrás editar cualquier dato nuevamente
                        más adelante.
                    </p>

                    <div className="flex flex-col bg-white p-5 rounded-xl border border-gray-200 mt-10">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-[300px] lg:w-[400px]"
                        >
                            <div className="grid mb-[10px]">
                                <label className="text-[15px] font-medium leading-[35px] text-black">
                                    <span className="text-red-500">*</span>{" "}
                                    Nombre de la tienda
                                </label>
                                <input
                                    {...register("nombre", {
                                        required: "Este campo es requerido",
                                    })}
                                    className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                    rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                    outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                />
                                {errors.nombre && (
                                    <p className="text-red-500">
                                        {errors.nombre.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid mb-[10px]">
                                <label className="text-[15px] font-medium leading-[35px] text-black">
                                    <span className="text-red-500">*</span> Link
                                    de la tienda para compartir
                                </label>
                                <input
                                    {...register("url", {
                                        required: "Este campo es requerido",
                                    })}
                                    className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                    rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                    outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                />
                                {errors.url && (
                                    <p className="text-red-500">
                                        {errors.url.message}
                                    </p>
                                )}
                                <p className="text-gray-700 mt-2 mb-2">
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
                                    bspy.com.py/{watch("url")}
                                </p>
                            </div>

                            <div className="grid mb-[10px]">
                                <label className="text-[15px] font-medium leading-[35px] text-black">
                                    <span className="text-red-500">*</span>{" "}
                                    Teléfono de la tienda
                                </label>
                                <input
                                    {...register("telefono", {
                                        required: "Este campo es requerido",
                                    })}
                                    className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                    rounde d-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                    outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                />
                                {errors.telefono && (
                                    <p className="text-red-500">
                                        {errors.telefono.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid mb-[10px]">
                                <label className="text-[15px] font-medium leading-[35px] text-black">
                                    <span className="text-red-500">*</span>{" "}
                                    Ubicación de la tienda
                                </label>
                                <input
                                    {...register("ubicacion", {
                                        required: "Este campo es requerido",
                                    })}
                                    className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                    rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                    outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                />
                                {errors.ubicacion && (
                                    <p className="text-red-500">
                                        {errors.ubicacion.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid mb-[10px]">
                                <label className="text-[15px] font-medium leading-[35px] text-black">
                                    <span className="text-red-500">*</span> Logo
                                    de la tienda
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImagenLogo(e.target.files?.[0])
                                    }
                                    className="block w-full text-sm border border-gray-300 py-2
                                    rounded-lg cursor-pointer bg-white focus:outline-none first-letter:rounded-[4px] text-[15px] 
                                    leading-none text-black shadow-[0_0_0_1px] 
                                    outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                />
                            </div>

                            <div className="grid mb-[10px]">
                                <label className="text-[15px] font-medium leading-[35px] text-black">
                                    <span className="text-red-500">*</span>{" "}
                                    Portada de la tienda
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImagenPortada(e.target.files?.[0])
                                    }
                                    className="block w-full text-sm border border-gray-300 py-2
                                    rounded-lg cursor-pointer bg-white focus:outline-none first-letter:rounded-[4px] text-[15px] 
                                    leading-none text-black shadow-[0_0_0_1px] 
                                    outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                />
                            </div>

                            <div className="grid mb-[10px]">
                                <label className="text-[15px] font-medium leading-[35px] text-black">
                                    Descripción de la tienda
                                </label>
                                <textarea
                                    {...register("descripcion")}
                                    className="box-border w-full bg-white shadow-blackA9 inline-flex appearance-none items-center justify-center 
                                    rounded-[4px] p-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] outline-none 
                                    hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9 resize-none"
                                    rows={5}
                                />
                                <div className="text-gray-500 mt-2 mb-2">
                                    Podrás ver la descripción en la página
                                    principal de tu tienda
                                </div>
                            </div>

                            <div className="grid mb-[10px]">
                                <label className="text-[15px] font-medium leading-[35px] text-black">
                                    Instagram
                                </label>
                                <input
                                    {...register("instagram")}
                                    className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                    rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                    outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                />
                                <div className="text-gray-500 mt-2 mb-2">
                                    Ingrese solo usuario, sin @
                                </div>
                            </div>

                            <div className="grid mb-[10px]">
                                <label className="text-[15px] font-medium leading-[35px] text-black">
                                    Facebook
                                </label>
                                <input
                                    {...register("facebook")}
                                    className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                    rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                    outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                                />
                                <div className="text-gray-500 mt-2 mb-2">
                                    Copie y pegue el link completo
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={procesandoCreacion}
                                className={`
                                box-border w-full text-white shadow-blackA7 
                                hover:bg-green-700
                                inline-flex h-[35px] items-center 
                                justify-center rounded-[4px] ${
                                    procesandoCreacion
                                        ? "bg-green-500 cursor-wait"
                                        : "bg-black"
                                } px-[15px] font-medium 
                                leading-none mt-[10px]
                                `}
                            >
                                {procesandoCreacion
                                    ? "Registrando tienda..."
                                    : "Registrar tienda"}
                            </button>
                        </form>
                    </div>
                </main>
            </div>
        </section>
    );
}

export default Create;
