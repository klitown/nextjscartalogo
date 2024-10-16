"use client";
import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

interface DeleteImageControlProps {
    producto: IProducto;
    currentIndex: number | undefined;
}

export const DeleteImageControl: React.FC<DeleteImageControlProps> = ({
    producto,
    currentIndex,
}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    const handleDeleteClick = () => setShowDialog(true);

    const handleConfirmDelete = async () => {
        setIsDeleting(true);
        try {
            const imageUrl = producto.imagenes![currentIndex!];
            const fileName = imageUrl.split("/").pop();

            // Remove from storage
            const { error: storageError } = await supabase.storage
                .from("bspy")
                .remove([`${producto.tienda_id}/${fileName}`]);

            if (storageError) throw storageError;

            // Update product in database
            const updatedImages = producto.imagenes!.filter(
                (_, index) => index !== currentIndex
            );
            const { error: dbError } = await supabase
                .from("productos")
                .update({ imagenes: updatedImages })
                .eq("id", producto.id);

            if (dbError) throw dbError;

            // onImageDeleted(currentIndex);
            router.refresh();
        } catch (error) {
            console.error("Error deleting image:", error);
            // Handle error (e.g., show error message)
        } finally {
            setIsDeleting(false);
            setShowDialog(false);
        }
    };

    return (
        <>
            <Button
                onClick={handleDeleteClick}
                className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-700 text-white"
                disabled={isDeleting}
            >
                <Trash2 className="mr-2 h-4 w-4" />
                {isDeleting ? "Eliminando..." : "Eliminar imagen"}
            </Button>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="sm:max-w-[425px] overflow-hidden">
                    <DialogTitle>Confirmar eliminación de imagen</DialogTitle>
                    <DialogDescription>
                        ¿Estás seguro de que quieres eliminar esta imagen del
                        producto {producto.nombre}?
                    </DialogDescription>
                    <DialogFooter>
                        <Button
                            onClick={() => setShowDialog(false)}
                            className="bg-gray-500 hover:bg-gray-700"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleConfirmDelete}
                            className="bg-red-500 hover:bg-red-700"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Eliminando..." : "Eliminar"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
