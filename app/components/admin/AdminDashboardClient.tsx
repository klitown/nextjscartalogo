"use client";
import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ITienda } from "@/lib/interfaces/ITienda";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Trash2 } from "lucide-react";
import { createClient } from "@/supabase/client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AdminDashboardClientProps {
    tiendas: ITienda[];
}

export default function AdminDashboardClient({
    tiendas,
}: AdminDashboardClientProps) {
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [tiendaToDelete, setTiendaToDelete] = useState<ITienda | null>(null);

    const supabase = createClient();

    const handleDeleteClick = async (tienda: ITienda) => {
        setShowDeleteAlert(true);
        setTiendaToDelete(tienda);
    };

    const handleDeleteConfirm = async () => {
        const { error } = await supabase
            .from("tiendas")
            .delete()
            .eq("id", tiendaToDelete?.id);

        if (error) throw error;
        setShowDeleteAlert(false);
        setTiendaToDelete(null);
        window.location.reload();
    };

    const handleDeleteCancel = async () => {
        setShowDeleteAlert(false);
        setTiendaToDelete(null);
    };

    return (
        <div className="mx-10 py-10">
            <h2 className="text-2xl font-bold mb-5">Tiendas Management</h2>

            {/* Delete Confirmation Alert */}
            {showDeleteAlert && tiendaToDelete && (
                <Alert variant="destructive" className="mb-4">
                    <AlertTitle>
                        Are you sure you want to delete {tiendaToDelete.nombre}?
                    </AlertTitle>
                    <AlertDescription>
                        This action cannot be undone. This will permanently
                        delete the tienda and remove the data from our servers.
                        <div className="mt-4">
                            <Button
                                onClick={handleDeleteConfirm}
                                variant="destructive"
                                className="mr-2"
                            >
                                Borrar
                            </Button>
                            <Button
                                onClick={handleDeleteCancel}
                                variant="outline"
                            >
                                Cancelar
                            </Button>
                        </div>
                    </AlertDescription>
                </Alert>
            )}

            {/* Table */}
            <div className="rounded-md border overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Contacto</TableHead>
                            <TableHead>Ubicación</TableHead>
                            <TableHead>URL</TableHead>
                            <TableHead>Plan</TableHead>
                            <TableHead>Redes</TableHead>
                            <TableHead>Colores</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Fechas</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tiendas.map((tienda) => (
                            <TableRow key={tienda.id}>
                                <TableCell className="font-medium">
                                    {tienda.id}
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p className="font-semibold">
                                            {tienda.nombre}
                                        </p>
                                        <img
                                            src={tienda.url_logo}
                                            alt={`${tienda.nombre} logo`}
                                            className="w-10 h-10 object-cover mt-1"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p>{tienda.telefono}</p>
                                        <p className="text-sm text-gray-500">
                                            {tienda.email}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>{tienda.ubicacion}</TableCell>
                                <TableCell>
                                    <a
                                        href={tienda.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        {tienda.url}
                                    </a>
                                </TableCell>
                                <TableCell>
                                    {/* <Badge variant="outline">Plan {tienda.plan_id}</Badge> */}
                                </TableCell>
                                <TableCell>{tienda.redes}</TableCell>
                                <TableCell>{tienda.colores}</TableCell>
                                <TableCell>
                                    <p
                                        className="max-w-xs truncate"
                                        title={tienda.descripcion}
                                    >
                                        {tienda.descripcion}
                                    </p>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <p className="text-sm">
                                            Created:{" "}
                                            {new Date(
                                                tienda.inserted_at
                                            ).toLocaleDateString()}
                                        </p>
                                        <p className="text-sm">
                                            Updated:{" "}
                                            {new Date(
                                                tienda.updated_at
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() =>
                                            handleDeleteClick(tienda)
                                        }
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
