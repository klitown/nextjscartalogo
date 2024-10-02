"use client";
import * as Form from "@radix-ui/react-form";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { useState, useTransition, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Check, LucideShieldClose } from "lucide-react";
import { useRouter } from "next/navigation";
import { ITienda } from "@/lib/interfaces/ITienda";
import { ToastAction } from "@/components/ui/toast";
import { useUser } from "../hooks/user-user";

interface Producto {
    nombre: string;
    price: number | null;
    descripcion: string;
    categoria_id: number;
    tienda_id: number;
    mas_buscado?: boolean;
}

type Props = {
    tienda: ITienda;
};

function SubirProducto({ tienda }: Props) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(url!, apiKey!);
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const { user, session } = useUser();

    const [formulario, setFormulario] = useState<Producto>({
        nombre: "",
        descripcion: "",
        mas_buscado: false,
        price: null,
        categoria_id: 0,
        tienda_id: tienda.id,
    });
    const [productoImagenes, setProductoImagenes] = useState<any>([]);
    const [procesandoCreacion, setProcesandoCreacion] =
        useState<boolean>(false);

    const [categorias, setCategorias] = useState<any>([]);

    const handleChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        const valor = type === "checkbox" ? checked : value;
        setFormulario({ ...formulario, [name]: valor });
    };

    function changeProductoImagen(event: any) {
        const selectedFiles = event.target.files; // Obtiene todos los archivos seleccionados
        // Itera a través de los archivos seleccionados y agrégalos al arreglo productoImagenes
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            setProductoImagenes((prev: any) => [...prev, file]);
        }
    }

    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = async () => {
        let { data: categorias, error } = await supabase
            .from("categorias")
            .select("*");
        setCategorias(categorias);
    };

    const handleCategoria = ($event: string) => {
        setFormulario({ ...formulario, categoria_id: +$event });
    };

    const handleSubmit = async () => {
        if (productoImagenes.length === 0) {
            toast({
                variant: "destructive",
                title: "¡No se cargó ninguna imagen!",
                action: (
                    <ToastAction
                        className="text-sm border border-white bg-white text-black px-3 py-1 font-bold rounded-xl"
                        altText="Entiendo"
                    >
                        Entendido
                    </ToastAction>
                ),
            });
            return;
        }

        if (formulario.categoria_id === 0) {
            toast({
                variant: "destructive",
                title: "¡Selecciona 1 categoría!",
                action: (
                    <ToastAction
                        className="text-sm border border-white bg-white text-black px-3 py-1 font-bold rounded-xl"
                        altText="Entiendo"
                    >
                        Entendido
                    </ToastAction>
                ),
            });
            return;
        }

        setProcesandoCreacion(true);
        try {
            formulario.tienda_id = tienda.id;
            console.log("Enviando...:", formulario);
            const { data, error } = await supabase
                .from("productos")
                .insert([formulario])
                .select();
            if (error) {
                console.error("Error al insertar el producto:", error.message);
                setProcesandoCreacion(false);
            } else {
                console.log("Producto registrado con éxito:", data);
                let idProducto = data[0].id;
                if (productoImagenes.length >= 1) {
                    const promesas = [saveToImagenesTable].map(
                        async (funcionAsync) => {
                            return funcionAsync(
                                productoImagenes,
                                idProducto,
                                tienda.url
                            );
                        }
                    );
                    // Espera a que todas las promesas se resuelvan
                    await Promise.all(promesas);
                }
            }
        } catch (error: any) {
            console.error("Error en la inserción:", error.message);
            setProcesandoCreacion(false);
        } finally {
            setProcesandoCreacion(false);
            console.log("completado");
            toast({
                title: "¡El producto se cargó correctamente!",
                action: (
                    <ToastAction
                        className="text-sm border border-gray-500 bg-green-500 text-white px-3 py-1 font-bold rounded-xl"
                        altText="Entiendo"
                    >
                        Entendido
                    </ToastAction>
                ),
            });
            setFormulario({
                nombre: "",
                descripcion: "",
                mas_buscado: false,
                price: null,
                categoria_id: 0,
                tienda_id: tienda.id,
            });
            setProductoImagenes({});
            const escapeEvent = new KeyboardEvent("keydown", { key: "Escape" });
            document.dispatchEvent(escapeEvent);
            startTransition(() => {
                router.refresh();
            });
        }
    };

    const saveToImagenesTable = async (
        files: File[],
        idProducto: number,
        tiendaUrl: string
    ) => {
        let imagenesSubidas: string[] = [];

        try {
            // Convertir las operaciones de subida en una lista de promesas
            const uploadPromises = files.map(async (file) => {
                const fileName = `${tiendaUrl}/${
                    user!.id
                }_${Date.now()}_${Math.floor(Math.random() * 1000000)}.png`;

                const { data, error } = await supabase.storage
                    .from("bspy")
                    .upload(fileName, file, {
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (error) throw error;

                const { data: urlData } = await supabase.storage
                    .from("bspy")
                    .getPublicUrl(data.path);

                return urlData.publicUrl;
            });

            // Esperar a que todas las imágenes se suban
            imagenesSubidas = await Promise.all(uploadPromises);

            // Actualizar la tabla de productos una vez que todas las imágenes se han subido
            const { data, error } = await supabase
                .from("productos")
                .update({ imagenes: imagenesSubidas })
                .eq("id", idProducto)
                .select();

            if (error) throw error;

            console.log(
                "Imágenes subidas y producto actualizado correctamente. Devolviendo esto: ",
                data
            );
            return data;
        } catch (error) {
            console.error("Error en saveToImagenesTable:", error);
            throw error; // Re-throw the error for the caller to handle
        }
    };

    if (!tienda) return <h1>No te apures, cargando tu tienda...😎</h1>;

    return (
        <div className="flex flex-col bg-white p-5 rounded-xl border border-gray-200 mt-10 mb-10 overflow-visible">
            <Form.Root className="w-full">
                {/* NOMBRE FIELD */}
                <Form.Field
                    className="grid mb-[10px]"
                    name="nombre"
                    id="nombre"
                >
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                            <span className="text-red-500 mr-2">*</span>
                            Nombre del producto
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
                {/* price field */}
                <Form.Field className="grid mb-[10px]" name="price" id="price">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                            <span className="text-red-500 mr-2">*</span>
                            Precio del producto
                        </Form.Label>
                    </div>
                    <Form.Control asChild>
                        <input
                            id="price"
                            className="box-border w-full bg-white shadow-blackA9 inline-flex h-[35px] appearance-none items-center justify-center 
                                            rounded-[4px] px-[10px] text-[15px] leading-none text-black shadow-[0_0_0_1px] 
                                            outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black] selection:color-white selection:bg-blackA9"
                            type="number"
                            name="price"
                            value={
                                formulario.price === null
                                    ? ""
                                    : formulario.price
                            }
                            onChange={handleChange}
                            required
                        />
                    </Form.Control>
                </Form.Field>
                {/* mas buscado field */}
                <Form.Field
                    className="grid mb-[10px]"
                    name="mas_buscado"
                    id="mas_buscado"
                >
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                            <span className="text-red-500 mr-2">*</span>
                            El producto es más buscado
                        </Form.Label>
                    </div>
                    <Form.Control asChild>
                        <fieldset className="space-y-4">
                            <legend className="sr-only">Delivery</legend>

                            <div>
                                <input
                                    type="radio"
                                    name="DeliveryOption"
                                    onChange={() =>
                                        setFormulario({
                                            ...formulario,
                                            mas_buscado: true,
                                        })
                                    }
                                    id="DeliveryStandard"
                                    className="peer hidden"
                                    checked={formulario.mas_buscado}
                                />

                                <label
                                    htmlFor="DeliveryStandard"
                                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                >
                                    <p className="text-gray-700">
                                        Agregar producto a más buscados
                                    </p>

                                    <Check />
                                </label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name="DeliveryOption"
                                    onChange={() =>
                                        setFormulario({
                                            ...formulario,
                                            mas_buscado: false,
                                        })
                                    }
                                    checked={formulario.mas_buscado === false}
                                    id="DeliveryPriority"
                                    className="peer hidden"
                                />

                                <label
                                    htmlFor="DeliveryPriority"
                                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                >
                                    <p className="text-gray-700">
                                        No agregar a más buscados
                                    </p>

                                    <LucideShieldClose />
                                </label>
                            </div>
                        </fieldset>
                    </Form.Control>
                </Form.Field>

                {/* CATEGORIAS */}
                <Form.Field className="grid mb-[10px]" name="price" id="price">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                            Categoría
                        </Form.Label>
                    </div>
                    <Form.Control asChild>
                        {/* @ts-ignore */}
                        <Select
                            onValueChange={(e) => handleCategoria(e)}
                            value={`${formulario.categoria_id}`}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar una categoría" />
                            </SelectTrigger>
                            <SelectContent
                                position="item-aligned"
                                side="bottom"
                                align="end"
                                className="overflow-y-scroll h-[500px] min-h-screen"
                            >
                                {/* <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                            </SelectGroup> */}
                                {categorias.map((categoria: any) => (
                                    <SelectItem
                                        key={categoria.id}
                                        value={categoria.id}
                                    >
                                        {categoria.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Form.Control>
                </Form.Field>

                {/* IMAGEN DEL PRODUCTO TIENDA */}
                <Form.Field className="grid mb-[10px]" name="logo" id="logo">
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                            <span className="text-red-500 mr-2">*</span>
                            Imagenes del producto
                        </Form.Label>
                    </div>
                    <Form.Control asChild>
                        <>
                            <Input
                                accept=".png, .jpg, .jpeg"
                                multiple
                                id="picture"
                                type="file"
                                onChange={changeProductoImagen}
                                required
                            />
                            <span className="mt-2 text-gray-400">
                                * Las imagenes subidas reemplazaran{" "}
                                <span className="text-red-500">
                                    completamente
                                </span>{" "}
                                las actuales
                            </span>
                        </>
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
                            Descripción (opcional)
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

                <Form.Submit className="flex-1" asChild>
                    <button
                        onClick={handleSubmit}
                        type="button"
                        className={`
                                box-border w-full text-white shadow-blackA7 
                                hover:bg-gray-700
                                inline-flex h-[35px] items-center 
                                justify-center rounded-[4px] ${
                                    procesandoCreacion
                                        ? "bg-green-500"
                                        : "bg-black"
                                } px-[15px] font-medium leading-none shadow-[0_2px_10px]
                                focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]
                                `}
                    >
                        {procesandoCreacion
                            ? "Registrando producto..."
                            : "Registrar producto"}
                    </button>
                </Form.Submit>
            </Form.Root>
        </div>
    );
}

export default SubirProducto;
