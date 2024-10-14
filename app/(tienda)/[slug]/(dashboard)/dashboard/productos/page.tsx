"use server";
import {
    createServerClient,
    getTiendaInfo,
} from "../../../(infoTienda)/layout";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { createClient } from "@/supabase/server";
import { DeleteProductoButton } from "@/app/components/delete-producto/DeleteProductoButton";

export default async function Page({ params }: { params: { slug: string } }) {
    async function getProductosData() {
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc(
            "obtener_productos_con_imagenes",
            {
                tienda_url: params.slug,
            }
        );
        return data;
    }

    const productos = await getProductosData();
    const tienda = await getTiendaInfo(params.slug);

    return (
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-5 justify-center md:justify-between">
                <h1 className="text-4xl font-bold tracking-wide my-4">
                    Listado de productos
                </h1>
                <div className="flex justify-center items-center">
                    <Link
                        href={`/${tienda.url}/dashboard/productos/agregar`}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background  text-white
                        transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-60"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Agregar producto
                    </Link>
                </div>
            </div>

            <p className="text-left text-md text-gray-500 font-bold">
                Se encontraron{" "}
                <span className="text-black font-extrabold text-md">
                    {productos.length}
                </span>{" "}
                productos
            </p>

            <hr className="my-5" />

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell font-bold text-black">
                                Imagen
                            </TableHead>
                            <TableHead className="font-bold text-black">
                                Nombre
                            </TableHead>
                            <TableHead className="hidden md:table-cell font-bold text-black">
                                Descripción
                            </TableHead>
                            <TableHead className="font-bold text-black">
                                Precio
                            </TableHead>
                            <TableHead className="font-bold text-black">
                                Acciones
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productos.map((producto: any) => (
                            <TableRow key={producto.id}>
                                <TableCell className="hidden md:table-cell">
                                    <Image
                                        src={
                                            producto.imagenes &&
                                            producto.imagenes.length >= 1
                                                ? producto.imagenes[0]
                                                : "https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/bspy/cartalogo/646051.png"
                                        }
                                        alt="Imagen del producto"
                                        width={50}
                                        height={50}
                                        style={{ borderRadius: "0.5rem" }}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">
                                    {producto.nombre}
                                </TableCell>
                                <TableCell className="hidden md:table-cell max-w-xs truncate">
                                    {producto.descripcion
                                        ? producto.descripcion
                                        : "Sin descripción"}
                                </TableCell>
                                <TableCell>
                                    Gs.{" "}
                                    {parseInt(
                                        `${producto.price}`,
                                        10
                                    ).toLocaleString("es-ES")}
                                </TableCell>
                                <TableCell className="flex flex-col md:flex-row gap-4">
                                    <Link
                                        href={`productos/editar/${producto.id}`}
                                    >
                                        <Button className="bg-lime-500 hover:bg-lime-700">
                                            <Edit className="mr-2 h-4 w-4" />{" "}
                                            Editar
                                        </Button>
                                    </Link>
                                    <DeleteProductoButton producto={producto} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
