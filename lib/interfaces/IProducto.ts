interface IProducto {
    nombre: string;
    descripcion: string | null;
    price: number;
    mas_buscado: boolean;
    categoria_id: number;
    imagenes: string[] | null;
    id?: number;
    inserted_at?: string;
    updated_at?: string;
    tienda_id?: number;
}
