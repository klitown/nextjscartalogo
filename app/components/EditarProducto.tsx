"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState, useTransition } from "react";
import * as Form from "@radix-ui/react-form";
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

type Props = {
    producto: IProducto;
    tienda: ITienda;
};

export default function EditarProducto({ producto, tienda }: Props) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(url!, apiKey!);
    const router = useRouter();
    const [formulario, setFormulario] = useState<IProducto>({
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        mas_buscado: producto.mas_buscado,
        price: producto.price,
        categoria_id: producto.categoria_id,
        imagenes: producto.imagenes,
    });
    const [productoImagenes, setProductoImagenes] = useState<any[]>([]);
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [categorias, setCategorias] = useState<any>([]);
    const [procesandoCreacion, setProcesandoCreacion] = useState(false);

    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = async () => {
        let { data: categorias, error } = await supabase
            .from("categorias")
            .select("*");
        setCategorias(categorias);
    };

    function changeProductoImagen(event: any) {
        const selectedFiles = event.target.files; // Obtiene todos los archivos seleccionados
        // Itera a través de los archivos seleccionados y agrégalos al arreglo productoImagenes
        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            setProductoImagenes((prev: any) => [...prev, file]);
        }
    }

    const handleChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        const valor = type === "checkbox" ? checked : value;
        setFormulario({ ...formulario, [name]: valor });
    };

    const handleCategoria = ($event: string) => {
        setFormulario({ ...formulario, categoria_id: +$event });
    };

    async function handleSubmit() {
        console.log("Formulario data:", formulario);
        if (formulario.nombre === "" || String(formulario.price) === "") {
            toast({
                variant: "destructive",
                title: "Por favor, verifique que todos los campos tengan datos cargados",
            });
            return;
        }

        try {
            const { data, error } = await supabase
                .from("productos")
                .update({ ...formulario })
                .eq("id", producto.id);
            if (error) {
                console.log("Error aca: ", error);
            } else {
                if (productoImagenes.length >= 1) {
                    const promesas = [manageImagenes].map(
                        async (funcionAsync) => {
                            return funcionAsync();
                        }
                    );
                    // Espera a que todas las promesas se resuelvan
                    await Promise.all(promesas);
                }
                toast({
                    title: "¡Los datos han sidos actualizados correctamente!",
                    description:
                        "El cambio se reflejará en tu tienda en un instante",
                });
                const escapeEvent = new KeyboardEvent("keydown", {
                    key: "Escape",
                });
                document.dispatchEvent(escapeEvent);
                startTransition(() => {
                    router.refresh();
                });
            }
        } catch (error) {
            console.error("Error updating data: ", error);

            return;
        }
    }

    const manageImagenes = async () => {
        let imagenesSubidas: string[] = [];
        const promesas = productoImagenes.map(async (imagen: any) => {
            const { data, error } = await supabase.storage
                .from("bspy")
                //@ts-ignore
                .upload(
                    `${tienda.url}/${
                        Math.floor(Math.random() * 1000000) + 1
                    }.png`,
                    imagen
                );
            if (error) {
                console.error("Error acá: ", error);
            } else {
                const { data: url } = supabase.storage
                    .from("bspy")
                    .getPublicUrl(data.path);
                imagenesSubidas.push(url.publicUrl);
            }
        });
        await Promise.all(promesas);
        // Esperar a que todas las promesas se resuelvan antes de continuar
        const { data: testing, error: errorAca } = await supabase
            .from("productos")
            .update({ imagenes: imagenesSubidas })
            .eq("id", producto.id)
            .select();
        if (errorAca) {
            console.error("Aca: ", errorAca);
        }
    };

    return (
        <div className="p-5">
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
                                formulario.price === null ? 0 : formulario.price
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
                            <legend className="sr-only">Mas buscado</legend>

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
                                        El producto es más buscado
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
                            <span className="text-red-500 mr-2">*</span>
                            Categoría
                        </Form.Label>
                    </div>
                    <Form.Control asChild>
                        {/* @ts-ignore */}
                        <Select
                            onValueChange={(e) => handleCategoria(e)}
                            value={formulario.categoria_id}
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
                            value={formulario.descripcion ?? ""}
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
                            ? "Editando producto..."
                            : "Finalizar edición"}
                    </button>
                </Form.Submit>
            </Form.Root>
        </div>
    );
}
