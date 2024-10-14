import Image from "next/image";
import { getTiendaInfo } from "../../../(infoTienda)/layout";
import { Button } from "@/components/ui/button";
import { Edit, Phone, MapPin, Instagram, Facebook, Info } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ITienda } from "@/lib/interfaces/ITienda";
import EditarTienda from "@/app/components/EditarTienda";

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
        <div className="container mx-auto py-10 px-4">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-lg p-8 mb-10">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0 md:mr-8">
                        <Image
                            src={tienda.url_logo}
                            alt="Logo de la tienda"
                            width={150}
                            height={150}
                            className="rounded-full border-4 border-white shadow-md"
                        />
                    </div>
                    <div className="text-center md:text-left text-white flex-grow">
                        <h1 className="text-4xl font-bold mb-2">
                            {tienda.nombre.toUpperCase()}
                        </h1>
                        <p className="text-xl opacity-90">
                            {tienda.descripcion}
                        </p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-white text-black hover:bg-indigo-100 mt-4 md:mt-0">
                                <Edit className="mr-2 h-4 w-4" /> Editar
                                información
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
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <InfoCard
                    icon={<Phone />}
                    title="Teléfono"
                    content={tienda.telefono?.toString() || ""}
                />
                <InfoCard
                    icon={<MapPin />}
                    title="Ubicación"
                    content={tienda.ubicacion?.toUpperCase()}
                />
                <InfoCard
                    icon={<Instagram />}
                    title="Instagram"
                    content={obtenerNombreUsuarioInstagram(tienda.redes!)}
                    link={`https://instagram.com/${obtenerNombreUsuarioInstagram(
                        tienda.redes!
                    )}`}
                />
                <InfoCard
                    icon={<Facebook />}
                    title="Facebook"
                    content={tienda.redes?.find((red) =>
                        red.includes("facebook")
                    )}
                    link={tienda.redes?.find((red) => red.includes("facebook"))}
                />
            </div>
        </div>
    );
}

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    content: string | undefined;
    link?: string;
    fullWidth?: boolean;
}

function InfoCard({ icon, title, content, link, fullWidth }: InfoCardProps) {
    return (
        <div
            className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg ${
                fullWidth ? "md:col-span-2 lg:col-span-3" : ""
            }`}
        >
            <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
            </div>
            {link ? (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:underline"
                >
                    {content}
                </a>
            ) : (
                <p className="text-gray-700">{content}</p>
            )}
        </div>
    );
}
