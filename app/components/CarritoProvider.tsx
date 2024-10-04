"use client"

import React from "react";
import { CartProvider } from "react-use-cart";

export default function CarritoProvider({ children }: any) {
    return (
        <CartProvider>
            {children}
        </CartProvider>
    )
}
