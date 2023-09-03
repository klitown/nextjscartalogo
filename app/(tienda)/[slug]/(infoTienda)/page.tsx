import Portada from '../../../components/Portada';
import MasBuscados from '../../../components/MasBuscados';
import { createServerClient, getCategoriasInfo, getTiendaInfo } from './layout';


export default async function Page({ params }: { params: { slug: string } }) {

    async function getProductosData() {
        const supabase = createServerClient();
        const { data, error } = await supabase.rpc('obtener_productos_con_imagenes', {
            tienda_url: params.slug
        });
        return data
    }
    const tienda = await getTiendaInfo(params.slug);
    const productos = await getProductosData();
    const categorias = await getCategoriasInfo(tienda.id);


    /*********
    UI SECTION
    UI SECTION
    UI SECTION 
    ***********/


    return (

        <div className="w-full">
            <Portada
                tiendaNombre={tienda.nombre}
                tiendaDescripcion={tienda.descripcion}
                urlPortada={tienda.imagen_portada}
                data-superjson
            />
            <MasBuscados tiendaUrl={tienda.url} productos={productos} categorias={categorias} />
        </div>


    )
}