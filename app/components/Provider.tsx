import { CartProvider } from "react-use-cart"

const Provider = ({ children }: any) => {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    )
}
export { Provider }