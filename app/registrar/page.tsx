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
        <section className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="lg:w-1/2 mb-10 lg:mb-0">
                    <h1 className="text-4xl font-bold text-indigo-900 mb-6">
                        ¡Tu nueva tienda está a 1 click de distancia! 🚀
                    </h1>
                    <p className="text-xl text-gray-700 mb-8">
                        Completa estos datos iniciales para dar vida a tu tienda
                        online. No te preocupes, podrás editar cualquier dato
                        más adelante.
                    </p>
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-4 mb-4">
                            <div>
                                <div className="flex justify-start gap-0.5 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
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
                        <p className="text-gray-600">
                            <span className="font-semibold text-indigo-600">
                                Fotografía de alta calidad:
                            </span>{" "}
                            Asegúrate de que las imágenes de tus productos sean
                            de alta resolución y calidad. Esto ayuda a los
                            clientes a ver los detalles y la calidad de los
                            productos.
                        </p>
                    </div>
                </div>
                <div className="lg:w-1/2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white p-8 rounded-xl shadow-lg"
                    >
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <span className="text-red-500">*</span>{" "}
                                    Nombre de la tienda
                                </label>
                                <input
                                    {...register("nombre", {
                                        required: "Este campo es requerido",
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.nombre && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.nombre.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <span className="text-red-500">*</span> Link
                                    de la tienda para compartir
                                </label>
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">
                                        bspy.com.py/
                                    </span>
                                    <input
                                        {...register("url", {
                                            required: "Este campo es requerido",
                                        })}
                                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                {errors.url && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.url.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <span className="text-red-500">*</span>{" "}
                                    Teléfono de la tienda
                                </label>
                                <input
                                    {...register("telefono", {
                                        required: "Este campo es requerido",
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.telefono && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.telefono.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <span className="text-red-500">*</span>{" "}
                                    Ubicación de la tienda
                                </label>
                                <input
                                    {...register("ubicacion", {
                                        required: "Este campo es requerido",
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                                {errors.ubicacion && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.ubicacion.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <span className="text-red-500">*</span> Logo
                                    de la tienda
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImagenLogo(e.target.files?.[0])
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <span className="text-red-500">*</span>{" "}
                                    Portada de la tienda
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setImagenPortada(e.target.files?.[0])
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descripción de la tienda
                                </label>
                                <textarea
                                    {...register("descripcion")}
                                    rows={4}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Podrás ver la descripción en la página
                                    principal de tu tienda
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Instagram
                                </label>
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">
                                        @
                                    </span>
                                    <input
                                        {...register("instagram")}
                                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Ingrese solo usuario, sin @
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Facebook
                                </label>
                                <input
                                    {...register("facebook")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="https://facebook.com/tu-pagina"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Copie y pegue el link completo
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={procesandoCreacion}
                                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white font-medium ${
                                    procesandoCreacion
                                        ? "bg-indigo-400 cursor-wait"
                                        : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                }`}
                            >
                                {procesandoCreacion
                                    ? "Registrando tienda..."
                                    : "Registrar tienda"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Create;
