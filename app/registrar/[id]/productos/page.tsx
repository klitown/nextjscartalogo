'use client'
import * as Form from "@radix-ui/react-form";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import * as Toast from '@radix-ui/react-toast';
import { useEffect, useState } from "react";
import * as Select from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { SelectItem } from '../../../components/SelectItem'
import { useRouter } from "next/navigation";

interface Producto {
    nombre?: string
    descripcion?: string
    price?: number
    mas_buscado?: boolean
    categoria_id?: number;
    tienda_id?: number
}

function Index({ params }: { params: { id: string } }) {

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(url!, apiKey!);
    const router = useRouter()

    const [formulario, setFormulario] = useState<Producto>({
        nombre: "",
        descripcion: "",
        mas_buscado: true,
        price: 0,
        categoria_id: 0,
        tienda_id: 0,
    });
    const [productoImagenes, setProductoImagenes] = useState<any>([{}]);
    const [procesandoCreacion, setProcesandoCreacion] = useState<boolean>(false);
    const [tienda, setTienda] = useState();

    useEffect(() => {
        const getTiendaData = async (idTienda: number) => {
            try {
                const { data, error } = await supabase
                    .from('tiendas')
                    .select()
                    .eq('id', idTienda)
                    .single();

                if (error) {
                    console.error('Error al obtener la tienda:', error.message);
                    return null;
                }
                setTienda(data);
            } catch (error: any) {
                console.error('Error en la consulta:', error);
                return null;
            }
        };
        getTiendaData(+params.id);
    }, []);

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

    const handleCategoria = ($event: string) => {
        setFormulario({ ...formulario, categoria_id: +$event });
    }

    const handleSubmit = async () => {
        setProcesandoCreacion(true);
        try {
            formulario.tienda_id = +params.id;
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
                data.forEach((producto) => {
                    console.log('Insertando producto: ', producto);
                    saveToImagenesTable(producto.id);
                })
            }
        } catch (error: any) {
            console.error('Error en la inserción:', error.message);
            setProcesandoCreacion(false);
        } finally {
            setProcesandoCreacion(false);
            //@ts-ignore
            router.push(`/${tienda.url}`)
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
            const { data: test, error } = await supabase
                .from('imagenes')
                .insert([{
                    path: url.publicUrl,
                    producto_id: idProducto
                }]);
        }
        console.log('Imagen subida correctamente');
    }

    if (!tienda) return <h1>No te apures, cargando tu tienda...😎</h1>

    return (
        <section>
            <div className=" bg-[#2b42ff] mx-auto w-full min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-3xl font-bold text-white my-5 mx-3 tracking-wide">
                    {/* @ts-ignore */}
                    Bienvenido, {tienda!.nombre}
                </h1>
                <h3 className="text-xl font-bold text-white my-5 mx-3 tracking-wide">
                    Te pedimos que registres por lo menos 1 producto para continuar 👀
                </h3>
                <h5 className="text-lg font-light text-white my-1 mx-3 tracking-wide">
                    No te preocupes, podrás seguir agregando productos más adelante
                </h5>
                <div className="flex flex-col bg-white p-5 rounded-xl border border-gray-200 mt-10 mb-10">
                    <Form.Root className="w-full">
                        {/* NOMBRE FIELD */}
                        <Form.Field className="grid mb-[10px]" name="nombre" id="nombre">
                            <div className="flex items-baseline justify-between">
                                <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
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
                                    value={formulario.price}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Control>
                        </Form.Field>
                        {/* mas field */}
                        {/* <Form.Field
                            className="grid mb-[10px]"
                            name="mas_buscado"
                            id="mas_buscado"
                        >
                            <div className="flex items-baseline justify-between">
                                <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                    El producto es más buscado
                                </Form.Label>
                            </div>
                            <Form.Control asChild>
                                <input
                                    id="mas_buscado"
                                    className="px-3 py-2 border border-gray-200"
                                    type="checkbox"
                                    name="mas_buscado"
                                    checked={formulario.mas_buscado}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Control>
                        </Form.Field> */}

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
                            <Select.Root onValueChange={($event) => handleCategoria($event)}>
                                <Select.Trigger
                                    className="inline-flex items-center justify-center rounded px-[15px] text-[13px] leading-none h-[35px] 
                                    gap-[5px] bg-white text-black shadow-[0_2px_10px] shadow-black/10 hover:bg-mauve3  border border-black
                                    focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-black outline-none"
                                    aria-label="Food"
                                >
                                    <Select.Value placeholder="Seleccionar categoria.." />
                                    <Select.Icon className="text-black">
                                        <ChevronDownIcon />
                                    </Select.Icon>
                                </Select.Trigger>
                                <Select.Portal>
                                    <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
                                        <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-black cursor-default">
                                            <ChevronUpIcon />
                                        </Select.ScrollUpButton>
                                        <Select.Viewport className="p-[5px]">
                                            <Select.Group>
                                                <Select.Label className="px-[25px] text-xs leading-[25px] text-mauve11">
                                                    Seleccionar categoria
                                                </Select.Label>
                                                <SelectItem value="3">Teléfonos</SelectItem>
                                                <SelectItem value="4">Monitores</SelectItem>
                                            </Select.Group>

                                            <Select.Separator className="h-[1px] bg-violet6 m-[5px]" />


                                        </Select.Viewport>
                                        <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-black cursor-default">
                                            <ChevronDownIcon />
                                        </Select.ScrollDownButton>
                                    </Select.Content>
                                </Select.Portal>
                            </Select.Root>
                        </Form.Field>

                        {/* IMAGEN DEL PRODUCTO TIENDA */}
                        <Form.Field className="grid mb-[10px]" name="logo" id="logo">
                            <div className="flex items-baseline justify-between">
                                <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                                    Imagen del producto
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
                                    onChange={changeProductoImagen}
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
                                    Descripción
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
            </div>
        </section>
    );
}

export default Index;