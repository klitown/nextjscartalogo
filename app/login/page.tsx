"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Store, ShoppingBag } from "lucide-react";

export default function SignInPage() {
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const supabase = createClient();
    const searchParams = useSearchParams();
    const next = searchParams.get("next");
    const { toast } = useToast();

    async function signInWithGoogle() {
        setIsGoogleLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback${
                        next ? `?next=${encodeURIComponent(next)}` : ""
                    }`,
                },
            });

            if (error) {
                throw error;
            }
        } catch (error) {
            toast({
                title: "Por favor, intenta de nuevo.",
                description: "Hubo un error al iniciar sesión con Google.",
                variant: "destructive",
            });
            setIsGoogleLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left side - Branding */}
            <div className="hidden w-1/2 bg-black lg:block">
                <div className="flex h-full flex-col items-center justify-center text-white">
                    <ShoppingBag className="mb-4 h-16 w-16 text-orange-500" />
                    <h1 className="mb-2 text-4xl font-bold">BSPY</h1>
                    <p className="text-xl">Tu tienda en línea, simplificada</p>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
                <div className="w-full max-w-md space-y-8 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <Store className="mx-auto h-12 w-12 text-orange-500" />
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                            Iniciar sesión
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Ingresa para gestionar tu tienda
                        </p>
                    </div>

                    <div className="mt-8">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={signInWithGoogle}
                            disabled={isGoogleLoading}
                            className="w-full border-2 border-black bg-white text-black transition-all hover:bg-black hover:text-white focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        >
                            {isGoogleLoading ? (
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current"></div>
                            ) : (
                                <svg
                                    className="mr-2 h-5 w-5"
                                    aria-hidden="true"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                        fill="currentColor"
                                    />
                                </svg>
                            )}
                            <span>Ingresar con Google</span>
                        </Button>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Al iniciar sesión, aceptas nuestros términos de
                            servicio y política de privacidad.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
