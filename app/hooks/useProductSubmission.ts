import { useState, useTransition, ChangeEvent } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { createClient } from "@/supabase/client";

interface Tienda {
    id: number;
    url: string;
}

interface User {
    id: string;
}

interface ProductFormData {
    nombre: string;
    descripcion: string;
    mas_buscado: boolean;
    price: number | null;
    categoria_id: number;
    tienda_id: number;
    attributes?: {
        Colores?: string[];
        Tamaños?: string[];
    };
}

interface ProductData extends ProductFormData {
    id: number;
    imagenes?: string[];
}

const useProductSubmission = (tienda: Tienda, user: User) => {
    const [formulario, setFormulario] = useState<ProductFormData>({
        nombre: "",
        descripcion: "",
        mas_buscado: false,
        price: null,
        categoria_id: 0,
        tienda_id: tienda.id,
        attributes: {},
    });
    const [productoImagenes, setProductoImagenes] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [procesandoCreacion, setProcesandoCreacion] =
        useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();
    const supabase = createClient();

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = event.target;
        let newValue: string | number | boolean | null = value;

        if (type === "checkbox" || type === "radio") {
            newValue = value;
        } else if (type === "number") {
            newValue = value === "" ? null : parseFloat(value);
        }

        setFormulario((prev) => ({ ...prev, [name]: newValue }));
    };

    const handleImageUpload = (files: FileList | null) => {
        if (files) {
            setProductoImagenes(Array.from(files));
        }
    };

    const handleSubmit = async (): Promise<boolean> => {
        if (!validateSubmission()) return false;

        setProcesandoCreacion(true);
        try {
            const producto = await insertProduct();
            if (productoImagenes.length >= 1) {
                await uploadImages(producto.id);
            }
            handleSuccessfulSubmission();
            return true; // Submission was successful
        } catch (error) {
            handleSubmissionError(error as Error);
            return false; // Submission failed
        } finally {
            setProcesandoCreacion(false);
        }
    };

    const validateSubmission = (): boolean => {
        if (productoImagenes.length === 0) {
            showErrorToast("¡No se cargó ninguna imagen!");
            return false;
        }
        if (formulario.categoria_id === 0) {
            showErrorToast("¡Selecciona 1 categoría!");
            return false;
        }
        return true;
    };

    const insertProduct = async (): Promise<ProductData> => {
        const { data, error } = await supabase
            .from("productos")
            .insert([formulario])
            .select();
        if (error)
            throw new Error(`Error al insertar el producto: ${error.message}`);
        return data[0] as ProductData;
    };

    const uploadImages = async (idProducto: number): Promise<void> => {
        const uploadPromises = productoImagenes.map((file) =>
            uploadSingleImage(file)
        );
        const imagenesSubidas = await Promise.all(uploadPromises);
        await updateProductImages(idProducto, imagenesSubidas);
    };

    const uploadSingleImage = async (file: File): Promise<string> => {
        const fileName = `${tienda.url}/${user.id}_${Date.now()}_${Math.floor(
            Math.random() * 1000000
        )}.png`;
        const { data, error } = await supabase.storage
            .from("bspy")
            .upload(fileName, file, { cacheControl: "3600", upsert: false });
        if (error) throw new Error(`Error uploading image: ${error.message}`);
        const { data: urlData } = await supabase.storage
            .from("bspy")
            .getPublicUrl(data.path);
        return urlData.publicUrl;
    };

    const updateProductImages = async (
        idProducto: number,
        imagenesSubidas: string[]
    ): Promise<void> => {
        const { error } = await supabase
            .from("productos")
            .update({ imagenes: imagenesSubidas })
            .eq("id", idProducto);
        if (error)
            throw new Error(`Error updating product images: ${error.message}`);
    };

    const handleSuccessfulSubmission = (): void => {
        showSuccessToast("¡El producto se cargó correctamente!");
        resetForm();
    };

    const handleSubmissionError = (error: Error): void => {
        console.error("Error en la inserción:", error.message);
        showErrorToast(
            "Error al cargar el producto. Por favor, intente nuevamente."
        );
    };

    const showErrorToast = (message: string): void => {
        toast({
            variant: "destructive",
            title: message,
            // action: <ToastAction altText="Entiendo">Entendido</ToastAction>,
        });
    };

    const showSuccessToast = (message: string): void => {
        toast({
            title: message,
            // action: <ToastAction altText="Entiendo">Entendido</ToastAction>,
        });
    };

    const resetForm = (): void => {
        setFormulario({
            nombre: "",
            descripcion: "",
            mas_buscado: false,
            price: null,
            categoria_id: 0,
            tienda_id: tienda.id,
        });
        setProductoImagenes([]);
    };

    const changeProductoImagen = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles);
            setProductoImagenes((prev) => [...prev, ...newFiles]);

            // Generate previews
            newFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews((prev) => [
                        ...prev,
                        reader.result as string,
                    ]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeProductoImagen = (index: number) => {
        setProductoImagenes((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCategoria = ($event: string) => {
        const categoriaId = +$event;
        setFormulario((prev) => ({
            ...prev,
            categoria_id: categoriaId,
            attributes:
                categoriaId === 126 || categoriaId === 7
                    ? { Colores: [], Tamaños: [] }
                    : {},
        }));
    };

    const handleColorChange = (colors: string[]) => {
        setFormulario((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                Colores: colors,
            },
        }));
    };

    const handleSizeChange = (sizes: string[]) => {
        setFormulario((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                Tamaños: sizes,
            },
        }));
    };

    return {
        formulario,
        productoImagenes,
        handleChange,
        handleImageUpload,
        handleSubmit,
        handleCategoria,
        procesandoCreacion,
        changeProductoImagen,
        removeProductoImagen,
        handleColorChange,
        handleSizeChange,
        isPending,
        imagePreviews,
    };
};

export default useProductSubmission;
