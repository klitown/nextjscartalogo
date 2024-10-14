"use client";

import { useRouter } from "next/navigation";
import SubirProducto from "./SubirProducto";

interface SubirProductoWrapperProps {
    tienda: any; // Replace 'any' with your actual tienda type
    tiendaSlug: string;
}

export default function SubirProductoWrapper({
    tienda,
    tiendaSlug,
}: SubirProductoWrapperProps) {
    const router = useRouter();

    const handleProductAdded = () => {
        router.push(`/${tiendaSlug}/dashboard/productos`);
        router.refresh();
    };

    return (
        <SubirProducto tienda={tienda} onProductAdded={handleProductAdded} />
    );
}
