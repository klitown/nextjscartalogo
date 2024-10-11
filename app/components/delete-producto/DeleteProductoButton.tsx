"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/supabase/client";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

export function DeleteProductoButton({ producto }: { producto: IProducto }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDialog, setShowDialog] = useState(false);

    const supabase = createClient();
    const router = useRouter();

    async function deleteProducto() {
        setShowDialog(true);
    }

    async function handleConfirmDelete() {
        setIsDeleting(true);

        const { data, error } = await supabase
            .from("productos")
            .delete()
            .eq("id", producto.id);

        if (error) {
            setIsDeleting(false);
            throw error;
        }
        setIsDeleting(false);
        setShowDialog(false);
        router.refresh(); // <--- Add this line to reload the page
    }

    async function handleCancelDelete() {
        setShowDialog(false);
    }

    return (
        <>
            <Button
                onClick={deleteProducto}
                className="bg-red-500 hover:bg-red-700"
            >
                <Trash2 className="mr-2 h-4 w-4" />{" "}
                {isDeleting ? "Borrando..." : "Borrar"}
            </Button>

            {showDialog && (
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                    <DialogTrigger asChild>
                        <span />
                    </DialogTrigger>
                    <DialogContent className="overflow-hidden">
                        <DialogTitle>Confirmar eliminación</DialogTitle>
                        <DialogDescription>
                            ¿Estás seguro de eliminar {producto.nombre}?
                        </DialogDescription>
                        <DialogFooter>
                            <Button
                                onClick={handleCancelDelete}
                                className="bg-gray-500 hover:bg-gray-700"
                            >
                                Cancelar
                            </Button>
                            <Button
                                onClick={handleConfirmDelete}
                                className="bg-red-500 hover:bg-red-700"
                            >
                                Eliminar
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
