import { createServerClient, getCategoriasInfo, getTiendaInfo } from '../layout';
import ProductCard from "@/app/components/ProductCard";

async function Page({ params }: { params: { categoria: string, slug: string } }) {

    async function obtenerProductosPorCodigoCategoria() {
        const supabase = createServerClient();
        try {
            // Obtén el ID de la categoría según el código
            const { data: categorias, error: categoriasError } = await supabase
                .from('categorias')
                .select('id')
                .eq('codigo', params.categoria.toUpperCase())

            if (categoriasError || categorias.length === 0) {
                console.log('Error al obtener la categoría', categoriasError)
                return
            }

            const categoriaId = categorias![0].id;

            // Obtén los productos según el ID de la tienda y el ID de la categoría
            const { data: productos, error: productosError } = await supabase
                .from('productos')
                .select('*')
                .eq('tienda_id', tienda.id)
                .eq('categoria_id', categoriaId);

            if (productosError) {
                throw new Error('Error al obtener los productos');
            }

            return productos;

        } catch (error) {
            console.error('Error al obtener los productos:', error);
            return null;
        }
    }
    const tienda = await getTiendaInfo(params.slug);
    const categorias = await getCategoriasInfo(tienda.id);
    const productos = await obtenerProductosPorCodigoCategoria();

    const navigateToDetails = (idProducto: number) => {
        console.log('Navegando a...', idProducto)
    }

    return (

        <div className="container mx-auto">
            <div className='flex flex-col justify-center items-start px-3 my-10'>
                <h5 className="m-0 font-light text-2xl">
                    Mostrando todos los productos de la categoría
                </h5>
                <h1 className="font-bold text-5xl mt-3 font-worksans text-black">
                    {categorias.find((categoria: any) => categoria.codigo == params.categoria)?.nombre}
                </h1>
            </div>
            <hr className="my-5" />
            {
                productos ? productos?.length >= 1 && <>
                    {
                        productos?.map((producto: any) => (
                            <div key={producto.id}>
                                <ProductCard producto={producto} key={producto.id} />
                            </div>
                        ))
                    }
                </> : null
            }
        </div>
    );
}

export default Page;