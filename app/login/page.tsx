"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export default function SignInPage() {
    const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
    const supabase = createClient();

    const searchParams = useSearchParams();

    const next = searchParams.get("next");

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
                title: "Please try again.",
                description: "There was an error logging in with Google.",
                variant: "destructive",
            });
            setIsGoogleLoading(false);
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-orange-400 to-orange-700">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Bienvenido
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Inicia sesión en tu cuenta
                    </p>
                </div>

                <div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={signInWithGoogle}
                        disabled={isGoogleLoading}
                        className="w-full border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    >
                        {isGoogleLoading ? (
                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-gray-900"></div>
                        ) : (
                            <svg
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                    fill="#4285F4"
                                />
                            </svg>
                        )}
                        <span>Ingresar con Google</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
