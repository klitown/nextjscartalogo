import { Carrito } from "@/app/components/Carrito";
import { getTiendaInfo } from "../layout";

export default async function Page({ params }: { params: { slug: string } }) {

    const tienda = await getTiendaInfo(params.slug);

    return (
        <>
            <Carrito tienda={tienda} />
        </>
    )
}

