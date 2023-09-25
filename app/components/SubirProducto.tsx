'use client'
import * as Form from "@radix-ui/react-form";
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input"
import { useState, useTransition, useEffect } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast";
import { Check, LucideShieldClose } from "lucide-react";
import { useRouter } from "next/navigation"

interface Producto {
    nombre: string
    price: number | null
    descripcion: string
    categoria_id: number;
    tienda_id: number
    mas_buscado?: boolean
}

function SubirProducto({ tienda }: any) {

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(url!, apiKey!);
    const { toast } = useToast();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [formulario, setFormulario] = useState<Producto>({
        nombre: "",
        descripcion: "",
        mas_buscado: false,
        price: null,
        categoria_id: 0,
        tienda_id: tienda.id,
    });
    const [productoImagenes, setProductoImagenes] = useState<any>([]);
    const [procesandoCreacion, setProcesandoCreacion] = useState<boolean>(false);

    const [categorias, setCategorias] = useState<any>([]);

    const handleChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        const valor = type === "checkbox" ? checked : value;
        setFormulario({ ...formulario, [name]: valor });
    };

    function changeProductoImagen(event: any) {
        const file = event.target.files[0]
        setProductoImagenes({
            ...productoImagenes,
            file: file
        });
    }

    useEffect(() => {
        getCategorias()
    }, []);

    const getCategorias = async () => {
        let { data: categorias, error } = await supabase
            .from('categorias')
            .select('*')
        setCategorias(categorias);
    }

    const handleCategoria = ($event: string) => {
        setFormulario({ ...formulario, categoria_id: +$event });
    }

    const handleSubmit = async () => {

        if (productoImagenes.length === 0) {
            toast({
                variant: "destructive",
                title: "¡No se cargó ninguna imagen!",
            });
            return
        }

        if (formulario.categoria_id === 0) {
            toast({
                variant: "destructive",
                title: "¡Selecciona 1 categoría!",
            });
            return
        }

        setProcesandoCreacion(true);
        try {
            formulario.tienda_id = tienda.id;
            console.log('Enviando...:', formulario);
            const { data, error } = await supabase
                .from('productos')
                .insert([formulario])
                .select();
            if (error) {
                console.error('Error al insertar el producto:', error.message);
                setProcesandoCreacion(false);
            } else {
                console.log('Producto registrado con éxito:', data);
                let id_producto = data[0].id;
                await saveToImagenesTable(id_producto);
            }
        } catch (error: any) {
            console.error('Error en la inserción:', error.message);
            setProcesandoCreacion(false);
        } finally {
            setProcesandoCreacion(false);
            console.log('completado');
            toast({
                variant: "success",
                title: "¡El producto se cargó correctamente!",
            })
            setFormulario({
                nombre: "",
                descripcion: "",
                mas_buscado: false,
                price: null,
                categoria_id: 0,
                tienda_id: tienda.id,
            });
            setProductoImagenes({});
            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
            document.dispatchEvent(escapeEvent);
            startTransition(() => {
                router.refresh();
            });
            router.refresh();
        }
    };

    const saveToImagenesTable = async (idProducto: number) => {
        const { data, error } = await supabase.storage
            .from('cartalogo_imagenes')
            //@ts-ignore
            .upload(`${tienda.url}/${Math.floor(Math.random() * 1000000) + 1}.png`, productoImagenes.file);
        if (error) {
            console.error('Error acá: ', error)
        } else {
            const { data: url } = supabase.storage
                .from('cartalogo_imagenes').getPublicUrl(data.path);
            const { data: testing, error: errorAca } = await supabase
                .from('productos')
                .update({ imagenes: [url.publicUrl] })
                .eq('id', +idProducto)
                .select()
            if (error) {
                console.error("Aca: ", errorAca)
            }
            console.log('Imagen subida correctamente. Devolviendo esto: ', testing);
        }
    }

    if (!tienda) return <h1>No te apures, cargando tu tienda...😎</h1>

    return (
        <div className="flex flex-col bg-white p-5 rounded-xl border border-gray-200 mt-10 mb-10 overflow-visible">
            <Form.Root className="w-full">
                {/* NOMBRE FIELD */}
                <Form.Field className="grid mb-[10px]" name="nombre" id="nombre">
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
                <Form.Field
                    className="grid mb-[10px]"
                    name="price"
                    id="price"
                >
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
                            type="text"
                            name="price"
                            value={formulario.price === null ? "" : formulario.price}
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
                                    onChange={() => setFormulario({ ...formulario, mas_buscado: true })}
                                    id="DeliveryStandard"
                                    className="peer hidden"
                                    checked={formulario.mas_buscado}
                                />

                                <label
                                    htmlFor="DeliveryStandard"
                                    className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-blue-500 peer-checked:ring-1 peer-checked:ring-blue-500"
                                >
                                    <p className="text-gray-700">Agregar producto a más buscados</p>

                                    <Check />
                                </label>
                            </div>

                            <div>
                                <input
                                    type="radio"
                                    name="DeliveryOption"
                                    onChange={() => setFormulario({ ...formulario, mas_buscado: false })}
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
                <Form.Field
                    className="grid mb-[10px]"
                    name="price"
                    id="price"
                >
                    <div className="flex items-baseline justify-between">
                        <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                            Categoría
                        </Form.Label>
                    </div>
                    <Form.Control asChild>
                        {/* @ts-ignore */}
                        <Select onValueChange={(e) => handleCategoria(e)} value={formulario.categoria_id}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Seleccionar una categoría" />
                            </SelectTrigger>
                            <SelectContent position="item-aligned" side="bottom" align="end" className="overflow-y-scroll h-[500px] min-h-screen">
                                {/* <SelectGroup>
                                <SelectLabel>Fruits</SelectLabel>
                            </SelectGroup> */}
                                {categorias.map((categoria: any) => (
                                    <SelectItem key={categoria.id} value={categoria.id}>
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
                            Imagen del producto
                        </Form.Label>
                    </div>
                    <Form.Control asChild>
                        <>
                            <Input id="picture" type="file" onChange={changeProductoImagen}
                                required />
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
                                justify-center rounded-[4px] ${procesandoCreacion ? 'bg-green-500' : 'bg-black'} px-[15px] font-medium leading-none shadow-[0_2px_10px]
                                focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none mt-[10px]
                                `}
                    >
                        {procesandoCreacion ? 'Registrando producto...' : 'Registrar producto'}
                    </button>
                </Form.Submit>

            </Form.Root>
        </div>
    );
}

export default SubirProducto;