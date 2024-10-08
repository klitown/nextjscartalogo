"use client";
import * as Form from "@radix-ui/react-form";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Check,
    X,
    Upload,
    DollarSign,
    Tag,
    FileText,
    LucideShieldClose,
    Plus,
    Trash2,
} from "lucide-react";
import { ITienda } from "@/lib/interfaces/ITienda";
import { useUser } from "../../hooks/user-user";
import { createClient } from "@/supabase/client";
import useProductSubmission from "../../hooks/useProductSubmission";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
    tienda: ITienda;
    onProductAdded: () => void;
};

const commonColors = [
    "Negro",
    "Blanco",
    "Rojo",
    "Azul",
    "Verde",
    "Amarillo",
    "Gris",
];
const commonSizes = ["XS", "S", "M", "L", "XL", "XXL"];

function SubirProducto({ tienda, onProductAdded }: Props) {
    const [customColor, setCustomColor] = useState<string>("");
    const [customSize, setCustomSize] = useState<string>("");

    const supabase = createClient();
    const { user } = useUser();

    const {
        formulario,
        handleChange,
        handleCategoria,
        handleSubmit,
        handleColorChange,
        handleSizeChange,
        procesandoCreacion,
        imagePreviews,
        changeProductoImagen,
        removeProductoImagen,
    } = useProductSubmission(tienda, user!);

    const [categorias, setCategorias] = useState<any>([]);

    useEffect(() => {
        getCategorias();
    }, []);

    const getCategorias = async () => {
        let { data: categorias, error } = await supabase
            .from("categorias")
            .select("*");
        setCategorias(categorias);
    };

    const handleSubmitWithCallback = async () => {
        const ok = await handleSubmit();
        if (ok) {
            onProductAdded();
        }
    };

    const toggleColor = (color: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevent form submission
        const currentColors = formulario.attributes?.Colores || [];
        const newColors = currentColors.includes(color)
            ? currentColors.filter((c) => c !== color)
            : [...currentColors, color];
        handleColorChange(newColors);
    };

    const addCustomColor = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent form submission
        if (
            customColor &&
            !formulario.attributes?.Colores?.includes(customColor)
        ) {
            handleColorChange([
                ...(formulario.attributes?.Colores || []),
                customColor,
            ]);
            setCustomColor("");
        }
    };

    const removeCustomColor = (color: string, event: React.MouseEvent) => {
        event.preventDefault();
        const newColors =
            formulario.attributes?.Colores?.filter((c) => c !== color) || [];
        handleColorChange(newColors);
    };

    const toggleSize = (size: string, event: React.MouseEvent) => {
        event.preventDefault(); // Prevent form submission
        const currentSizes = formulario.attributes?.Tamaños || [];
        const newSizes = currentSizes.includes(size)
            ? currentSizes.filter((s) => s !== size)
            : [...currentSizes, size];
        handleSizeChange(newSizes);
    };

    const addCustomSize = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent form submission
        if (
            customSize &&
            !formulario.attributes?.Tamaños?.includes(customSize)
        ) {
            handleSizeChange([
                ...(formulario.attributes?.Tamaños || []),
                customSize,
            ]);
            setCustomSize("");
        }
    };

    const removeCustomSize = (size: string, event: React.MouseEvent) => {
        event.preventDefault();
        const newSizes =
            formulario.attributes?.Tamaños?.filter((s) => s !== size) || [];
        handleSizeChange(newSizes);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
            <div className="p-8">
                <Form.Root className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Form.Field name="nombre">
                            <div className="flex items-center space-x-2">
                                <Tag className="text-blue-500" />
                                <Form.Label className="text-sm font-medium text-gray-700">
                                    Nombre del producto
                                </Form.Label>
                            </div>
                            <Form.Control asChild>
                                <input
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    type="text"
                                    name="nombre"
                                    value={formulario.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Control>
                        </Form.Field>

                        <Form.Field name="price">
                            <div className="flex items-center space-x-2">
                                <DollarSign className="text-green-500" />
                                <Form.Label className="text-sm font-medium text-gray-700">
                                    Precio del producto
                                </Form.Label>
                            </div>
                            <Form.Control asChild>
                                <input
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
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
                    </div>

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
                                <legend className="sr-only">Más buscado</legend>

                                <div>
                                    <input
                                        type="radio"
                                        name="mas_buscado"
                                        onChange={() =>
                                            handleChange({
                                                target: {
                                                    name: "mas_buscado",
                                                    value: true,
                                                    type: "radio",
                                                },
                                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                                        }
                                        id="masBuscadoSi"
                                        className="peer hidden"
                                        checked={
                                            formulario.mas_buscado === true
                                        }
                                    />

                                    <label
                                        htmlFor="masBuscadoSi"
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
                                        name="mas_buscado"
                                        onChange={() =>
                                            handleChange({
                                                target: {
                                                    name: "mas_buscado",
                                                    value: false,
                                                    type: "radio",
                                                },
                                            } as unknown as React.ChangeEvent<HTMLInputElement>)
                                        }
                                        id="masBuscadoNo"
                                        className="peer hidden"
                                        checked={
                                            formulario.mas_buscado === false
                                        }
                                    />

                                    <label
                                        htmlFor="masBuscadoNo"
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

                    <Form.Field name="categoria">
                        <div className="flex items-center space-x-2 mb-2">
                            <Tag className="text-purple-500" />
                            <Form.Label className="text-sm font-medium text-gray-700">
                                Categoría
                            </Form.Label>
                        </div>
                        <Select
                            onValueChange={(e) => handleCategoria(e)}
                            value={
                                formulario.categoria_id
                                    ? formulario.categoria_id.toString()
                                    : undefined
                            }
                        >
                            <SelectTrigger className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white">
                                <SelectValue placeholder="Seleccionar una categoría" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60 overflow-auto">
                                {categorias.map((categoria: any) => (
                                    <SelectItem
                                        className="cursor-pointer"
                                        key={categoria.id}
                                        value={categoria.id.toString()}
                                    >
                                        {categoria.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </Form.Field>
                    {(formulario.categoria_id === 126 ||
                        formulario.categoria_id === 7) && (
                        <>
                            <Form.Field name="colores">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Tag className="text-red-500" />
                                    <Form.Label className="text-sm font-medium text-gray-700">
                                        Colores
                                    </Form.Label>
                                </div>
                                <p className="flex flex-wrap gap-2 my-4 text-gray-500">
                                    Puedes seleccionar un color, o agregar un
                                    color personalizado.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {commonColors.map((color) => (
                                        <Button
                                            key={color}
                                            onClick={(e) =>
                                                toggleColor(color, e)
                                            }
                                            variant={
                                                formulario.attributes?.Colores?.includes(
                                                    color
                                                )
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className={
                                                formulario.attributes?.Colores?.includes(
                                                    color
                                                )
                                                    ? "bg-green-500"
                                                    : ""
                                            }
                                            size="sm"
                                            type="button"
                                        >
                                            {color}
                                        </Button>
                                    ))}
                                </div>
                                <div className="flex items-start flex-col md:flex-row md:items-center space-x-2 space-y-4 md:space-y-0 mb-2">
                                    <Input
                                        type="text"
                                        value={customColor}
                                        onChange={(e) =>
                                            setCustomColor(e.target.value)
                                        }
                                        placeholder="Color personalizado"
                                        className="flex-grow"
                                    />
                                    <Button
                                        onClick={addCustomColor}
                                        size="sm"
                                        type="button"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />{" "}
                                        Agregar
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-5">
                                    {formulario.attributes?.Colores?.filter(
                                        (color) => !commonColors.includes(color)
                                    ).map((color) => (
                                        <Button
                                            key={color}
                                            onClick={(e) =>
                                                removeCustomColor(color, e)
                                            }
                                            variant="destructive"
                                            size="sm"
                                            type="button"
                                        >
                                            {color}{" "}
                                            <Trash2 className="w-4 h-4 ml-2" />
                                        </Button>
                                    ))}
                                </div>
                            </Form.Field>

                            <Form.Field name="tamaños">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Tag className="text-blue-500" />
                                    <Form.Label className="text-sm font-medium text-gray-700">
                                        Tamaños
                                    </Form.Label>
                                </div>
                                <p className="flex flex-wrap gap-2 my-4 text-gray-500">
                                    Puedes seleccionar un tamaño, o agregar un
                                    tamaño personalizado.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {commonSizes.map((size) => (
                                        <Button
                                            key={size}
                                            onClick={(e) => toggleSize(size, e)}
                                            variant={
                                                formulario.attributes?.Tamaños?.includes(
                                                    size
                                                )
                                                    ? "default"
                                                    : "outline"
                                            }
                                            className={
                                                formulario.attributes?.Colores?.includes(
                                                    size
                                                )
                                                    ? "bg-green-500"
                                                    : ""
                                            }
                                            size="sm"
                                            type="button"
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                                <div className="flex items-start flex-col md:flex-row md:items-center space-x-2 space-y-4 md:space-y-0 mb-2">
                                    <Input
                                        type="text"
                                        value={customSize}
                                        onChange={(e) =>
                                            setCustomSize(e.target.value)
                                        }
                                        placeholder="Tamaño personalizado"
                                        className="flex-grow"
                                    />
                                    <Button
                                        onClick={addCustomSize}
                                        size="sm"
                                        type="button"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />{" "}
                                        Agregar
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {formulario.attributes?.Tamaños?.filter(
                                        (size) => !commonSizes.includes(size)
                                    ).map((size) => (
                                        <Button
                                            key={size}
                                            onClick={(e) =>
                                                removeCustomSize(size, e)
                                            }
                                            variant="destructive"
                                            size="sm"
                                            type="button"
                                        >
                                            {size}{" "}
                                            <Trash2 className="w-4 h-4 ml-2" />
                                        </Button>
                                    ))}
                                </div>
                            </Form.Field>
                        </>
                    )}
                    <Form.Field name="imagenes">
                        <div className="flex items-center space-x-2 mb-2">
                            <Upload className="text-indigo-500" />
                            <Form.Label className="text-sm font-medium text-gray-700">
                                Imágenes del producto
                            </Form.Label>
                        </div>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                        <span>Subir archivos</span>
                                        <Input
                                            id="file-upload"
                                            accept=".png, .jpg, .jpeg"
                                            multiple
                                            type="file"
                                            className="sr-only"
                                            onChange={changeProductoImagen}
                                            required
                                        />
                                    </label>
                                    <p className="pl-1">o arrastrar y soltar</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    PNG, JPG, JPEG hasta 10MB
                                </p>
                            </div>
                        </div>

                        {/* Image Previews */}
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative group">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            removeProductoImagen(index)
                                        }
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-1 w-12 hover:bg-red-400"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Form.Field>

                    <Form.Field name="descripcion">
                        <div className="flex items-center space-x-2 mb-2">
                            <FileText className="text-yellow-500" />
                            <Form.Label className="text-sm font-medium text-gray-700">
                                Descripción (opcional)
                            </Form.Label>
                        </div>
                        <Form.Control asChild>
                            <textarea
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                                name="descripcion"
                                rows={4}
                                value={formulario.descripcion}
                                onChange={handleChange}
                            />
                        </Form.Control>
                    </Form.Field>

                    <Form.Submit asChild>
                        <button
                            onClick={handleSubmitWithCallback}
                            type="button"
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                procesandoCreacion
                                    ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                                    : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out`}
                            disabled={procesandoCreacion}
                        >
                            {procesandoCreacion ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Registrando producto...
                                </>
                            ) : (
                                "Registrar producto"
                            )}
                        </button>
                    </Form.Submit>
                </Form.Root>
            </div>
        </motion.div>
    );
}

export default SubirProducto;
