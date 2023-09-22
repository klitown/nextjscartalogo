export interface ITienda {
    id: number;
    nombre: string;
    telefono?: number | null;
    ubicacion?: string | null;
    url_logo: string;
    redes?: string[] | null;
    colores?: string[] | null;
    plan_id?: number | null;
    inserted_at: string; // Debes usar un tipo adecuado para manejar timestamps
    updated_at: string; // Debes usar un tipo adecuado para manejar timestamps
    url: string;
    descripcion: string;
    imagen_portada?: string | null;
    email?: string | null;
    user_id?: string | null; // Debes usar un tipo adecuado para UUID
    mensaje_carrito?: string | null;
}