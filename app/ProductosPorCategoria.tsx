'use client'

import { CartProvider } from "react-use-cart";
import ProductCard from "./ProductCard";

function ProductosPorCategoria({ productos }: any) {

    if (productos.length === 0) return <h1>No se encontraron productos</h1>

    return (
        <CartProvider>
            <>
                {
                    productos ? productos?.length >= 1 && <>
                        {
                            productos?.map((producto: any) => (
                                <div key={producto.id}>
                                    <ProductCard producto={producto} key={producto.id} data-superjson />
                                </div>
                            ))
                        }
                    </> : null
                }
            </>
        </CartProvider>
    );
}

export default ProductosPorCategoria;