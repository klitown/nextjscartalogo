"use client";

import { ITienda } from "@/lib/interfaces/ITienda";
import { useRouter } from "next/navigation";
import EditarProducto from "./EditarProducto";

interface EditarProductoProps {
    tienda: ITienda;
    tiendaSlug: string;
    producto: IProducto;
}

export default function EditarProductoWrapper({
    tienda,
    producto,
    tiendaSlug,
}: EditarProductoProps) {
    const router = useRouter();

    const handleProductAdded = () => {
        router.push(`/${tiendaSlug}/dashboard/productos`);
        router.refresh();
    };

    return (
        <EditarProducto
            tienda={tienda}
            producto={producto}
            onProductEdit={handleProductAdded}
        />
    );
}
