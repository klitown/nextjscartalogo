import { createServerClient, getTiendaInfo } from "../../../(infoTienda)/layout";
import SubirProducto from "@/app/components/SubirProducto";
import { Edit, LucideBadgeDollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ListadoProductos from "@/app/components/ListadoProductos";
import Image from "next/image";
import EditarProducto from "@/app/components/EditarProducto";


export default async function Page({ params }: { params: { slug: string } }) {

    async function getProductosData() {
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc('obtener_productos_con_imagenes', {
            tienda_url: params.slug
        });
        return data
    }

    const productos = await getProductosData();
    const tienda = await getTiendaInfo(params.slug);

    console.log("prodctos: ", productos);


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

            {/* <ListadoProductos productos={productos} /> */}

            <div className="container mx-auto">

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                    {
                        productos.map((producto: any) => (
                            <div key={producto.id} className="rounded-xl border-2 border-gray-100 bg-white flex justify-between flex-col">
                                <div className="flex flex-col md:flex-row justify-center items-center md:justify-start md:items-start gap-4 p-4 sm:p-6 lg:p-8">
                                    <Image src={producto.imagenes.length >= 1 ? producto.imagenes[0]
                                        : 'https://wubpmygcxfkkllmvhixb.supabase.co/storage/v1/object/public/cartalogo_imagenes/cartalogo/646051.png'}
                                        alt="Imagen del producto"
                                        width={100} height={100}
                                        style={{ borderRadius: '1rem' }}
                                    />

                                    <div>
                                        <p className="font-bold text-lg md:text-2xl">
                                            {producto.nombre}
                                        </p>

                                        <p className="line-clamp-2 text-md text-gray-700 my-3">
                                            {producto.descripcion ? producto.descripcion : 'Sin descripción'}
                                        </p>

                                        <div className="mt-2 flex flex-col gap-4">
                                            <div className="flex items-center gap-1 text-gray-500">
                                                <LucideBadgeDollarSign />

                                                <p className="text-md">
                                                    Gs. {parseInt(`${producto.price}`, 10).toLocaleString("es-ES")}
                                                </p>
                                            </div>

                                            {producto.mas_buscado ?
                                                <span className="bg-green-500 text-white rounded-full px-3 py-2 text-[12px] text-center">
                                                    Más buscado
                                                </span>
                                                : null}
                                        </div>
                                    </div>
                                </div>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button className="bg-lime-500 hover:bg-lime-700 w-full h-10">
                                            <Edit className="mr-2 h-4 w-4" /> Editar producto
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="">
                                        <DialogHeader>
                                            <DialogTitle className="text-3xl">
                                                Edición de producto
                                            </DialogTitle>
                                        </DialogHeader>

                                        <EditarProducto producto={producto} tienda={tienda} />

                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))
                    }
                </div>
            </div>


        </div>
    );
}