import Image from "next/image";
import { getTiendaInfo } from "../../../(infoTienda)/layout";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import EditarTienda from "@/app/components/EditarTienda";
import { ITienda } from "@/lib/interfaces/ITienda";

export default async function Page({ params }: { params: { slug: string } }) {
    const tienda: ITienda = await getTiendaInfo(params.slug);

    // Función para extraer el nombre de usuario de Instagram
    function obtenerNombreUsuarioInstagram(redes: string[]) {
        const instagramUrl = redes.find(
            (red) => red && red.includes("instagram")
        );
        if (instagramUrl) {
            const partesUrl = instagramUrl.split("/");
            return partesUrl[partesUrl.length - 1];
        } else {
            return ""; // Si no se encuentra Instagram, retorna un string vacío
        }
    }

    return (
        <div className="container mx-auto flex flex-col relative">
            <h2 className="text-3xl font-bold mb-5 text-left">
                Información de la tienda
            </h2>
            <hr className="my-3" />
            <div
                role="alert"
                className="rounded border-s-4 border-green-500 bg-green-50 p-4 my-5"
            >
                <div className="flex items-center gap-2 text-green-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clipRule="evenodd"
                        />
                    </svg>

                    <strong className="block font-bold"> Atención </strong>
                </div>

                <p className="mt-2 text-md text-green-700">
                    La información mostrada acá son los datos públicos para tus
                    clientes y visitantes de tu tienda
                </p>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-indigo-500 hover:bg-indigo-700 w-60">
                        <Edit className="mr-2 h-4 w-4" /> Editar información
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-neutral-50">
                    <DialogHeader>
                        <DialogTitle className="text-3xl">
                            Editar información de la tienda
                        </DialogTitle>
                    </DialogHeader>
                    <EditarTienda tienda={tienda} />
                </DialogContent>
            </Dialog>

            <div className="flex flex-col justify-center items-center mt-5">
                <Image
                    src={tienda.url_logo}
                    alt="Logo de la tienda"
                    width={300}
                    height={300}
                    sizes="(max-width: 1300px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                        borderRadius: "1rem",
                    }}
                />
                <h2 className="text-4xl font-bold my-10 text-center">
                    {tienda.nombre.toUpperCase()}
                </h2>

                <div className="flow-root">
                    <dl className="-my-3 divide-y divide-gray-100 text-lg">
                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-xl text-gray-900">
                                Teléfono
                            </dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                {tienda.telefono}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-xl text-gray-900">
                                Ubicación
                            </dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                {tienda.ubicacion?.toUpperCase()}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-xl text-gray-900">
                                Descripción
                            </dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                {tienda.descripcion}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-xl text-gray-900">
                                Instagram
                            </dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                {obtenerNombreUsuarioInstagram(tienda.redes!)}
                            </dd>
                        </div>
                        <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                            <dt className="font-semibold text-xl text-gray-900">
                                Facebook
                            </dt>
                            <dd className="text-gray-700 sm:col-span-2">
                                {tienda.redes?.includes("facebook") && (
                                    <>
                                        {tienda.redes.find(
                                            (red) => red === "facebook"
                                        )}
                                    </>
                                )}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
