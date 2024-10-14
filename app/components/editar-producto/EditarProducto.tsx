"use client";
import { Input } from "@/components/ui/input";
import { useCallback, useEffect, useState, useTransition } from "react";
import * as Form from "@radix-ui/react-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
    Check,
    CheckCheck,
    CheckCircle,
    LucideShieldClose,
    Trash2,
    Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ITienda } from "@/lib/interfaces/ITienda";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { ToastAction } from "@/components/ui/toast";
import { createClient } from "@/supabase/client";
import { motion } from "framer-motion";
import useProductSubmission from "@/app/hooks/useProductSubmission";
import { useUser } from "@/app/hooks/user-user";
import { Button } from "@/components/ui/button";
import ImagePreviews from "../subir-producto/ImagePreviews";

type Props = {
    producto: IProducto;
    tienda: ITienda;
    onProductEdit: () => void;
};

type FormularioProducto = Omit<
    IProducto,
    "id" | "inserted_at" | "updated_at" | "tienda_id" | "attributes"
>;

export default function EditarProducto({
    producto,
    tienda,
    onProductEdit,
}: Props) {
    const supabase = createClient();

    const router = useRouter();
    const [formulario, setFormulario] = useState<FormularioProducto>({
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
    const [galleryImages, setGalleryImages] = useState<
        { original: string; thumbnail: string }[]
    >([]);

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState(
        formulario.categoria_id?.toString() || ""
    );

    useEffect(() => {
        if (producto.imagenes) {
            setGalleryImages(
                producto.imagenes.map((img) => ({
                    original: img,
                    thumbnail: img,
                }))
            );
        }
    }, [producto.imagenes]);

    useEffect(() => {
        // Update the selected category when formulario changes (e.g., when the component first loads)
        setSelectedCategory(formulario.categoria_id?.toString() || "");
    }, [formulario.categoria_id]);

    const getCategorias = useCallback(async () => {
        let { data: categorias, error } = await supabase
            .from("categorias")
            .select("*");
        setCategorias(categorias);
    }, [supabase]);

    useEffect(() => {
        getCategorias();
    }, [getCategorias]);

    function changeProductoImagen(event: any) {
        const selectedFiles: FileList = (event.target as HTMLInputElement)
            .files!;
        if (selectedFiles.length > 0) {
            // Itera a través de los archivos seleccionados y agrégalos al arreglo productoImagenes
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                setProductoImagenes((prev: any) => [...prev, file]);
            }
            // Create image previews
            const newPreviews = Array.from(selectedFiles).map((file) =>
                URL.createObjectURL(file)
            );
            setImagePreviews((prevPreviews) => [
                ...prevPreviews,
                ...newPreviews,
            ]);
        }
    }

    const handleDeleteImage = useCallback((index: number) => {
        setImagePreviews((prevPreviews) =>
            prevPreviews.filter((_, i) => i !== index)
        );
        // You might need to update the actual file list here as well
    }, []);

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

        setProcesandoCreacion(true);

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
                    action: (
                        <ToastAction
                            className="text-sm border border-white bg-green-500 hover:bg-green-500 text-white px-3 py-1 font-bold rounded-xl"
                            altText="Entiendo"
                        >
                            Entendido
                        </ToastAction>
                    ),
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
        } finally {
            // setProcesandoCreacion(false);
            onProductEdit();
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
            throw errorAca;
        }
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-7xl mx-auto p-8 bg-white rounded-2xl shadow-lg"
        >
            <Form.Root className="space-y-6">
                <Form.Submit asChild>
                    <Button
                        onClick={handleSubmit}
                        type="button"
                        disabled={procesandoCreacion}
                        className={`py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                            procesandoCreacion
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        }`}
                    >
                        <CheckCircle className="mr-2 h-4 w-4" />{" "}
                        {procesandoCreacion
                            ? "Editando producto..."
                            : "Finalizar edición"}
                    </Button>
                </Form.Submit>
                <hr />
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column: Product Information */}
                    <div className="flex-1">
                        <motion.div variants={fadeIn} className="mb-4">
                            <Form.Field name="nombre" id="nombre">
                                <Form.Label className="text-sm font-semibold text-gray-700">
                                    Nombre del producto
                                </Form.Label>
                                <Form.Control asChild>
                                    <Input
                                        type="text"
                                        name="nombre"
                                        value={formulario.nombre}
                                        onChange={handleChange}
                                        required
                                        className="w-full mt-1"
                                    />
                                </Form.Control>
                            </Form.Field>
                        </motion.div>

                        <motion.div variants={fadeIn} className="mb-4">
                            <Form.Field name="price" id="price">
                                <Form.Label className="text-sm font-semibold text-gray-700">
                                    Precio del producto
                                </Form.Label>
                                <Form.Control asChild>
                                    <Input
                                        type="number"
                                        name="price"
                                        value={
                                            formulario.price === null
                                                ? 0
                                                : formulario.price
                                        }
                                        onChange={handleChange}
                                        required
                                        className="w-full mt-1"
                                    />
                                </Form.Control>
                            </Form.Field>
                        </motion.div>

                        <motion.div variants={fadeIn} className="mb-4">
                            <Form.Field name="mas_buscado" id="mas_buscado">
                                <Form.Label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    El producto es más buscado
                                </Form.Label>
                                <Form.Control asChild>
                                    <div className="flex space-x-4">
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex-1"
                                        >
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
                                                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium shadow-sm hover:border-indigo-200 peer-checked:border-indigo-500 peer-checked:ring-1 peer-checked:ring-indigo-500"
                                            >
                                                <p className="text-gray-700">
                                                    El producto es más buscado
                                                </p>
                                                <Check className="text-indigo-600" />
                                            </label>
                                        </motion.div>
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            className="flex-1"
                                        >
                                            <input
                                                type="radio"
                                                name="DeliveryOption"
                                                onChange={() =>
                                                    setFormulario({
                                                        ...formulario,
                                                        mas_buscado: false,
                                                    })
                                                }
                                                checked={
                                                    formulario.mas_buscado ===
                                                    false
                                                }
                                                id="DeliveryPriority"
                                                className="peer hidden"
                                            />
                                            <label
                                                htmlFor="DeliveryPriority"
                                                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium shadow-sm hover:border-indigo-200 peer-checked:border-indigo-500 peer-checked:ring-1 peer-checked:ring-indigo-500"
                                            >
                                                <p className="text-gray-700">
                                                    No agregar a más buscados
                                                </p>
                                                <LucideShieldClose className="text-indigo-600" />
                                            </label>
                                        </motion.div>
                                    </div>
                                </Form.Control>
                            </Form.Field>
                        </motion.div>

                        <motion.div variants={fadeIn} className="mb-4">
                            {/* CATEGORIAS */}
                            <Form.Field
                                className="grid gap-2"
                                name="categoria"
                                id="categoria"
                            >
                                <div className="flex items-baseline justify-between">
                                    <Form.Label className="text-sm font-medium text-gray-700">
                                        <span className="text-red-500 mr-2">
                                            *
                                        </span>
                                        Categoría
                                    </Form.Label>
                                </div>
                                <Form.Control asChild>
                                    <Select
                                        value={selectedCategory}
                                        onValueChange={(e) =>
                                            handleCategoria(e)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Seleccionar una categoría" />
                                        </SelectTrigger>
                                        <SelectContent
                                            position="item-aligned"
                                            side="bottom"
                                            align="end"
                                            className="max-h-60 overflow-y-auto"
                                        >
                                            {categorias.map(
                                                (categoria: any) => (
                                                    <SelectItem
                                                        placeholder={
                                                            categoria.nombre
                                                        }
                                                        defaultValue={
                                                            producto.id
                                                        }
                                                        key={categoria.id}
                                                        value={categoria.id.toString()}
                                                    >
                                                        {categoria.nombre}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </Form.Control>
                            </Form.Field>
                        </motion.div>

                        <motion.div variants={fadeIn}>
                            <Form.Field name="descripcion" id="descripcion">
                                <Form.Label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Descripción (opcional)
                                </Form.Label>
                                <Form.Control asChild>
                                    <textarea
                                        id="descripcion"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
                                        name="descripcion"
                                        rows={5}
                                        value={formulario.descripcion ?? ""}
                                        onChange={handleChange}
                                    />
                                </Form.Control>
                            </Form.Field>
                        </motion.div>
                    </div>

                    {/* Right column: Images */}
                    <div className="flex-1">
                        <motion.div variants={fadeIn} className="space-y-6">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Imágenes del producto
                            </h2>

                            <Form.Field name="logo" id="logo">
                                <Form.Label className="text-sm font-semibold text-gray-700 mb-2 block">
                                    Subir nuevas imágenes
                                </Form.Label>
                                <Form.Control asChild>
                                    <div className="space-y-2">
                                        <label
                                            htmlFor="picture"
                                            className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-indigo-500 focus:outline-none"
                                        >
                                            <span className="flex items-center space-x-2">
                                                <Upload className="w-6 h-6 text-gray-600" />
                                                <span className="font-medium text-gray-600">
                                                    Seleccionar archivos
                                                </span>
                                            </span>
                                            <input
                                                id="picture"
                                                type="file"
                                                accept=".png, .jpg, .jpeg"
                                                multiple
                                                onChange={changeProductoImagen}
                                                required
                                                className="hidden"
                                            />
                                        </label>
                                        <span className="block text-xs text-gray-500 italic">
                                            * Las imágenes subidas reemplazarán{" "}
                                            <span className="text-red-500 font-semibold">
                                                completamente
                                            </span>{" "}
                                            las actuales
                                        </span>
                                    </div>
                                </Form.Control>

                                {/* Image Previews */}
                                {imagePreviews.length > 0 && (
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Imágenes seleccionadas
                                        </h3>
                                        <ImagePreviews
                                            imagePreviews={imagePreviews}
                                            handleDeleteImage={
                                                handleDeleteImage
                                            }
                                        />
                                    </div>
                                )}
                            </Form.Field>

                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    Imágenes actuales
                                </h3>
                                {galleryImages.length > 0 ? (
                                    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
                                        <ImageGallery
                                            items={galleryImages}
                                            showPlayButton={false}
                                            showFullscreenButton={true}
                                            showNav={true}
                                            showBullets={true}
                                            showThumbnails={true}
                                        />
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">
                                        No hay imágenes disponibles para este
                                        producto.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </Form.Root>
        </motion.div>
    );
}
