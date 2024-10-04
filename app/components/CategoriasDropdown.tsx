"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function NavigationMenuDemo({
    categorias,
    tiendaUrl,
}: {
    categorias: Array<{
        codigo: string;
        descripcion: string;
        id: number;
        nombre: string;
    }>;
    tiendaUrl: string;
}) {
    return (
        <NavigationMenu orientation="vertical">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-lg">
                        Categorías
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[300px] gap-3 p-4 md:grid-cols-1">
                            {categorias.map((categoria) => (
                                <ListItem
                                    key={categoria.id}
                                    title={categoria.nombre}
                                    href={`/${tiendaUrl}/${categoria.codigo}`}
                                />
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = ({ href, title, children }: any) => {
    return (
        <li className="hover:bg-gray-100">
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground`}
                >
                    <div className="text-md font-medium leading-none">
                        {title}
                    </div>
                    {/* <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p> */}
                </Link>
            </NavigationMenuLink>
        </li>
    );
};
ListItem.displayName = "ListItem";
