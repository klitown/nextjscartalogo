'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


export default function AuthForm() {
    const supabase = createClientComponentClient()

    return (
        <Auth
            supabaseClient={supabase}
            view="sign_up"
            appearance={{ theme: ThemeSupa }}
            theme="light"
            showLinks={true}
            providers={['google']}
            redirectTo="http://localhost:3000/auth/callback"
            localization={{
                variables: {
                    sign_in: {
                        "button_label": "Ingresar",
                        email_label: 'E-mail',
                        email_input_placeholder: 'Ingresa tu dirección de e-mail',
                        password_label: 'Tu contraseña',
                        password_input_placeholder: 'Ingresa una contraseña',
                        "link_text": "Ya tienes una cuenta? Inicia sesión",

                    },
                    sign_up: {
                        "button_label": "Registrarte",
                        email_label: 'E-mail',
                        email_input_placeholder: 'Ingresa tu dirección de e-mail',
                        password_label: 'Contraseña',
                        password_input_placeholder: 'Ingresa una contraseña',
                        "loading_button_label": "Registrando...",
                        "link_text": "Aún no tienes una cuenta? Regístrate",
                        confirmation_text: 'Revisa tu correo para completar el registro'
                    },
                    "forgotten_password": {
                        "email_label": "E-mail",
                        "password_label": "Contraseña",
                        "email_input_placeholder": "Ingresa tu correo",
                        "button_label": "Resetear contraseña",
                        "loading_button_label": "Envianto reseteo ...",
                        "link_text": "Olvidaste tu contraseña?",
                        "confirmation_text": "Se envió un link de reseteo a tu correo"
                    },
                },
            }}
        />
    )
}