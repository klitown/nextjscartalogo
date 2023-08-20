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
import { useToast } from "@/components/ui/use-toast"
import { Check, Circle, RefreshCcwDotIcon } from "lucide-react"

const FormSchema = z.object({
    nombre: z.string().min(2, {
        message: "El nombre debe tener por lo menos 2 caracteres",
    }),
    telefono: z.coerce.number().int().positive(),
    descripcion: z.string(),
    ubicacion: z.string().min(2, {
        message: "La ubicación no es válida",
    }),
    url_logo: z.string(),
    logoFile: z.any()
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
            url_logo: tienda.url_logo,
            logoFile: undefined,
            // imagen_portada: "",
            descripcion: tienda.descripcion,
            // redes: [],
            // colores: []
        },
    })
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const [imagenLogo, setImagenLogo] = useState();
    const { toast } = useToast();

    function changeImagenLogo(event: any) {
        const logoFile = event.target.files[0]
        setImagenLogo(logoFile);
    }

    async function onSubmit(formData: z.infer<typeof FormSchema>) {
        setIsFetching(true);
        try {
            if (imagenLogo !== undefined) {
                const parts = tienda.url_logo.split("/");
                const lastPart = parts[parts.length - 1];
                console.log("Borrando: ", lastPart);
                // Borrado
                const { data, error } = await supabase.storage
                    .from('cartalogo_imagenes')
                    .remove([`${tienda.url}/${lastPart}`]);
                if (error) {
                    console.error('Error removing storage object:', error.message);
                } else {
                    console.log('Storage object removed successfully:', data);
                    ///// subida
                    const { data: logoImagenData, error: errorLogoImagenData } = await supabase.storage
                        .from('cartalogo_imagenes')
                        .upload(`${tienda.url}/logo_${Math.floor(Math.random() * 1000000) + 1}.png`, imagenLogo);
                    if (errorLogoImagenData) {
                        throw errorLogoImagenData;
                    }
                    const logoUrlResponse = supabase.storage.from('cartalogo_imagenes').getPublicUrl(logoImagenData.path);
                    console.log('Imagen subida correctamente. Ver imagen:', logoUrlResponse.data.publicUrl);
                    formData = {
                        ...formData,
                        url_logo: logoUrlResponse.data.publicUrl
                    }
                }
            }
            const { data: res, error } = await supabase
                .from('tiendas')
                .update({ ...formData })
                .eq('id', tienda.id)
                .select()
            if (error) throw error;
            toast({
                variant: "success",
                title: "¡Los datos han sidos actualizados correctamente!",
                description: "El cambio se reflejará en tu tienda en un instante",
            })
        } catch (error) {
            console.error("Error updating data: ", error);
            setIsFetching(false);
            return;
        }
        setIsFetching(false);
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        document.dispatchEvent(escapeEvent);
        startTransition(() => {
            router.refresh();
        });
    }

    return (
        <div className="p-5">
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

                    {/* LOGO DE LA TIENDA */}
                    <FormField
                        control={form.control}
                        name="logoFile"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>
                                    Logo de la tienda
                                </FormLabel>
                                <FormControl>
                                    <Input type="file" accept="image/*" onChange={changeImagenLogo} />
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
                    <Button type="submit" disabled={isFetching}>
                        {isFetching
                            ? <RefreshCcwDotIcon className="mr-2 h-4 w-4 animate-spin" />
                            : <Check className="mr-2 h-4 w-4" />
                        }
                        Actualizar información
                    </Button>
                </form>
            </Form>
        </div>
    )
}
