"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useState, useTransition } from 'react';

const FormSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener por lo menos 2 caracteres",
    }),
    telefono: z.coerce.number().int().positive(),
    descripcion: z.string(),
    ubicacion: z.string().min(2, {
        message: "La ubicación no es válida",
    }),
    // redes: z.string().array().nonempty().min(1),
    // colores: z.string().array().nonempty().min(1)
})

export default function EditarTienda({ tienda }: any) {

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(url!, apiKey!);
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            nombre: tienda.nombre,
            telefono: tienda.telefono,
            ubicacion: tienda.ubicacion,
            // url_logo: "",
            // imagen_portada: "",
            descripcion: tienda.descripcion,
            // redes: [],
            // colores: []
        },
    })
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsFetching(true);
        console.log('Log: ', data);
        const { data: res, error } = await supabase
            .from('tiendas')
            .update({ ...data })
            .eq('id', tienda.id)
            .select()
        // console.log(res);
        setIsFetching(false);
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(escapeEvent);
        startTransition(() => {
            // Refresh the current route and fetch new data from the server without
            // losing client-side browser or React state.
            router.refresh();
        });
    }

    return (
        <div className="container mx-auto w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                    <FormField
                        control={form.control}
                        name="nombre"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Nombre de la tienda
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingrese el nombre de la tienda" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="telefono"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Teléfono de la tienda
                                </FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Ingrese el número"
                                        {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="ubicacion"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Ubicación
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Ingrese la ubicación" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="descripcion"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Descripción
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Ingrese la descripción de la tienda"
                                        rows={10}
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">
                        Actualizar información
                    </Button>
                </form>
            </Form>
        </div>
    )
}
