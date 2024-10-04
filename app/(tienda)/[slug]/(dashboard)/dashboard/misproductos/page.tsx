import {
    createServerClient,
    getTiendaInfo,
} from "../../../(infoTienda)/layout";
import SubirProducto from "@/app/components/SubirProducto";
import { Edit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
import Image from "next/image";
import EditarProducto from "@/app/components/EditarProducto";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

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
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className="bg-indigo-500 hover:bg-indigo-700 w-60">
                                <Plus className="mr-2 h-4 w-4" /> Agregar producto
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="h-full max-h-[100dvh]">
                            <div className="flex flex-col h-full overflow-hidden">
                                <DrawerHeader className="flex-shrink-0 sticky top-0 bg-white z-10 w-full pb-4">
                                    <DrawerTitle className="text-3xl text-center">
                                        Agregar producto
                                    </DrawerTitle>
                                </DrawerHeader>
                                <DrawerClose>
                                    <Button className="bg-red-500 hover:bg-red-700 text-white" variant="outline">Cancelar</Button>
                                </DrawerClose>
                                <div className="flex-grow overflow-y-auto">
                                    <div className="w-full max-w-2xl mx-auto p-6">
                                        <SubirProducto tienda={tienda} />
                                    </div>
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>

            <p className="text-left text-md text-gray-500 font-bold">
                Se encontraron <span className="text-black font-extrabold text-md">{productos.length}</span> productos
            </p>

            <hr className="my-5" />

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="hidden md:table-cell font-bold text-black">Imagen</TableHead>
                            <TableHead className="font-bold text-black">Nombre</TableHead>
                            <TableHead className="hidden md:table-cell font-bold text-black">Descripción</TableHead>
                            <TableHead className="font-bold text-black">Precio</TableHead>
                            <TableHead className="hidden md:table-cell font-bold text-black">Más buscado</TableHead>
                            <TableHead className="font-bold text-black">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {productos.map((producto: any) => (
                            <TableRow key={producto.id}>
                                <TableCell className="hidden md:table-cell">
                                    <Image
                                        src={
                                            producto.imagenes && producto.imagenes.length >= 1
                                                ? producto.imagenes[0]
                                                : "https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/bspy/cartalogo/646051.png"
                                        }
                                        alt="Imagen del producto"
                                        width={50}
                                        height={50}
                                        style={{ borderRadius: "0.5rem" }}
                                    />
                                </TableCell>
                                <TableCell className="font-medium">{producto.nombre}</TableCell>
                                <TableCell className="hidden md:table-cell max-w-xs truncate">
                                    {producto.descripcion ? producto.descripcion : "Sin descripción"}
                                </TableCell>
                                <TableCell>
                                    Gs. {parseInt(`${producto.price}`, 10).toLocaleString("es-ES")}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {producto.mas_buscado ? (
                                        <span className="bg-green-500 text-white rounded-full px-2 py-1 text-xs">
                                            Producto marcado como más buscado
                                        </span>
                                    ) : <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                                        No marcado como más buscado
                                    </span>}
                                </TableCell>
                                <TableCell>
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <Button className="bg-lime-500 hover:bg-lime-700">
                                                <Edit className="mr-2 h-4 w-4" /> Editar
                                            </Button>
                                        </DrawerTrigger>
                                        <DrawerContent className="h-full max-h-[100dvh]">
                                            <div className="flex flex-col h-full overflow-hidden">
                                                <DrawerHeader className="flex-shrink-0 sticky top-0 bg-white z-10 w-full pb-4">
                                                    <DrawerTitle className="text-3xl text-center">
                                                        Edición de producto
                                                    </DrawerTitle>
                                                </DrawerHeader>
                                                <DrawerClose>
                                                    <Button className="bg-red-500 hover:bg-red-700 text-white" variant="outline">Cancelar</Button>
                                                </DrawerClose>
                                                <div className="flex-grow overflow-y-auto">
                                                    <div className="w-full max-w-2xl mx-auto p-6">
                                                        <EditarProducto
                                                            producto={producto}
                                                            tienda={tienda}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}