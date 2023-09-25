import Image from "next/image";
import { createServerClient, getTiendaInfo } from "../../../(infoTienda)/layout";
import SubirProducto from "@/app/components/SubirProducto";
import { LucideCheck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ListadoProductos from "@/app/components/ListadoProductos";

async function Page({ params }: { params: { slug: string } }) {

    async function getProductosData() {
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc('obtener_productos_con_imagenes', {
            tienda_url: params.slug
        });
        return data
    }

    let productos = await getProductosData();
    const tienda = await getTiendaInfo(params.slug);

    return (
        <div className="container mx-auto">

            <div className="flex flex-col md:flex-row gap-5 justify-center md:justify-between">
                <h1 className="text-4xl font-bold tracking-wide my-4">
                    Listado de productos
                </h1>
                <div className="flex justify-center items-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-indigo-500 hover:bg-indigo-700 w-60">
                                <Plus className="mr-2 h-4 w-4" /> Agregar producto
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="">
                            <DialogHeader>
                                <DialogTitle className="text-3xl">
                                    Agregar producto
                                </DialogTitle>
                            </DialogHeader>

                            <SubirProducto tienda={tienda} />

                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <hr className="my-5" />

            <ListadoProductos productos={productos} />


        </div>
    );
}
export default Page