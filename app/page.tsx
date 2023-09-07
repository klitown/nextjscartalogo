"use client";

import localFont from 'next/font/local'
import { Red_Hat_Display } from 'next/font/google'
import Image from 'next/image'
import { CheckCheckIcon } from 'lucide-react';

// Font files can be colocated inside of `app`
const agrandir = localFont({
    src: './agrandir.otf',
    display: 'swap',
})
const redHat = Red_Hat_Display({
    subsets: ['latin'],
    display: 'swap',
})


const features = [
    {
        name: 'Push to deploy.',
        description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
    },
    {
        name: 'SSL certificates.',
        description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
    },
    {
        name: 'Database backups.',
        description: 'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi lobortis.',
    },
]

function Home() {
    return (
        <>
            <main className={`bg-[url('/bg.svg')] bg-white/90 bg-no-repeat bg-cover backdrop-blur-xl 
            h-screen flex flex-col justify-start items-center`}>
                <header className=" w-full p-5">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="md:flex md:items-center md:gap-12">
                                <Image src="/cartalogoWhite.png"
                                    priority={true}
                                    width={200}
                                    height={200}
                                    alt="Logo de Cartalogo" />
                            </div>

                            <div className="hidden md:block text-white">
                                <nav aria-label="Global">
                                    <ul className="flex items-center gap-6 text-md text-white">
                                        <li>
                                            <a
                                                className="text-white transition hover:text-white-500/75"
                                                href="/"
                                            >
                                                About
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                className="text-white transition hover:text-white-500/75"
                                                href="/"
                                            >
                                                Careers
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                className="text-white transition hover:text-white-500/75"
                                                href="/"
                                            >
                                                History
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                className="text-white transition hover:text-white-500/75"
                                                href="/"
                                            >
                                                Services
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                className="text-white transition hover:text-white-500/75"
                                                href="/"
                                            >
                                                Projects
                                            </a>
                                        </li>

                                        <li>
                                            <a
                                                className="text-white transition hover:text-white-500/75"
                                                href="/"
                                            >
                                                Blog
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>

                        </div>
                    </div>
                </header>

                <section className="flex flex-col justify-center md:flex-row w-full h-screen">

                    <div className='flex flex-col basis-full justify-center items-start p-10'>
                        <div className='bg-white/30 backdrop-blur-lg rounded-xl p-10'>
                            <h1 className={`${agrandir.className} text-7xl font-bold text-white`}>
                                Tu
                                <span className='animate-text bg-gradient-to-r from-[#2CFFDC] via-[#FFF] to-[#2CFFDC] mx-4 bg-clip-text text-transparent'>
                                    nueva tienda
                                </span>

                                te está <br /> esperando
                            </h1>
                            <p className={`${redHat.className} text-xl text-white max-w-xl tracking-wide mt-3`}>
                                Imagina tener tu propia tienda virtual, donde puedas mostrar tus productos al mundo y hacer crecer tu negocio
                                desde la comodidad de tu hogar.
                                <br />
                                Con nuestro servicio, tendrás todas las herramientas que necesitas para crear tu tienda en línea de manera sencilla y efectiva.
                            </p>
                        </div>
                    </div>

                    <div className='flex basis-1/2'>


                    </div>
                </section>

            </main>


            <section>
                <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:h-screen lg:grid-cols-2">
                        <div className="relative z-10 lg:py-16">
                            <div className="relative h-64 sm:h-80 lg:h-full">
                                <img alt="House"
                                    src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                    className="absolute inset-0 h-full w-full object-cover" />
                            </div>
                        </div>

                        <div className="relative flex items-center bg-terciary rounded-tr-xl rounded-br-xl">
                            <span className="hidden lg:absolute lg:inset-y-0 lg:-start-16 lg:block lg:w-16 lg: bg-terciary rounded-tl-xl roudned-bl-xl"></span>

                            <div className="p-8 sm:p-16 lg:p-24">
                                <h2 className={`${agrandir.className} text-7xl font-bold text-black`}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore,
                                    debitis.
                                </h2>

                                <p className={`${redHat.className} text-xl max-w-xl tracking-wide mt-3 text-gray-600`}>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
                                    molestiae! Quidem est esse numquam odio deleniti, beatae, magni
                                    dolores provident quaerat totam eos, aperiam architecto eius quis
                                    quibusdam fugiat dicta.
                                </p>

                                <a href="#"
                                    className="mt-8 inline-block rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
                                    Get in Touch
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="bg-[url('/1.svg')] overflow-hidden bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 bg-white rounded-xl">
                    <div
                        className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 overflow-hidden">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base font-semibold leading-7 text-indigo-600">Deploy faster</h2>
                                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A better workflow</p>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque,
                                    iste dolor cupiditate blanditiis ratione.
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-gray-900">
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>
                        <img src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="Product screenshot"
                            className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
                            width={2432} height={1442} />
                    </div>
                </div>
            </div>


            <section aria-labelledby="pricing-one" id="pricing-one" className='container mx-auto mt-20'>
                <div className="relative items-center w-full px-8 py-24 mx-auto md:px-12 lg:px-16 max-w-7xl">
                    <p className={`${agrandir.className} text-7xl font-bold text-black mb-10`}>
                        Precios
                    </p>
                    <div className="grid max-w-2xl grid-cols-1 -mx-4 gap-y-10 sm:mx-auto lg:max-w-none lg:grid-cols-3 xl:gap-x-4 lg:-mx-8">
                        <section className="flex flex-col px-6 sm:px-8 lg:py-8">
                            <h3 className="mt-5 text-lg text-black">Wannabe</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Good for those trying to get there.
                            </p>
                            <p className="order-first text-5xl font-light tracking-tight text-black">
                                $2
                            </p>
                            <ul role="list" className="flex flex-col order-last mt-10 text-sm text-gray-500 gap-y-3">
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Connect 1 websites </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Connect up to 2 bank accounts </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Track up to 15 credit cards </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Analytics support </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Export up to 3 months data </span>
                                </li>
                            </ul>
                            <a className="items-center justify-center w-full px-6 py-2.5 mt-8 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black" aria-label="Wannabe tier" href="/register">
                                Button
                            </a>
                        </section>
                        <section className="flex flex-col order-first px-6 py-8 bg-black rounded-3xl sm:px-8 lg:order-none">
                            <h3 className="mt-5 text-lg text-white">Indie Hacker</h3>
                            <p className="mt-2 text-sm text-gray-100">
                                Perfect for those leaving 9-5 and working 24/7.
                            </p>
                            <p className="order-first text-5xl font-light tracking-tight text-white">
                                $29
                            </p>
                            <ul role="list" className="flex flex-col order-last mt-10 text-sm text-white gap-y-3">
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Connect 80 websites </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Connect up to 5 bank accounts </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Track up to 50 credit cards </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Analytics support </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Export up to 12 months data </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Cloud service 24/7 </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Track in multiple users </span>
                                </li>
                            </ul>
                            <a className="items-center justify-center w-full px-6 py-2.5 mt-8 text-center text-black duration-200 bg-white border-2 border-white rounded-full nline-flex hover:bg-transparent hover:border-white hover:text-white focus:outline-none focus-visible:outline-white text-sm focus-visible:ring-white" aria-label="Indie hacker tier" href="/register">
                                Button
                            </a>
                        </section>
                        <section className="flex flex-col px-6 sm:px-8 lg:py-8">
                            <h3 className="mt-5 text-lg text-black">Big fish</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                For even the biggest enterprise companies.
                            </p>
                            <p className="order-first text-5xl font-light tracking-tight text-black">
                                $99
                            </p>
                            <ul role="list" className="flex flex-col order-last mt-10 text-sm text-gray-500 gap-y-3">
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Connect unlimited websites </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Connect up to 15 bank accounts </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Track up to 200 credit cards </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Analytics support </span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCheckIcon />
                                    <span className="ml-4"> Export up to 24 months data </span>
                                </li>
                            </ul>
                            <a className="items-center justify-center w-full px-6 py-2.5 mt-8 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black" aria-label="Big fish tier" href="/register">
                                Button
                            </a>
                        </section>
                    </div>
                </div>
            </section>

            <section>
                <div className="items-center w-full px-5 py-24 mx-auto md:px-12 lg:px-16 max-w-7xl">
                    <div>
                        <div className="max-w-2xl">
                            <p className={`${agrandir.className} text-7xl font-bold text-black`}>
                                Preguntas frecuentes
                            </p>
                        </div>
                    </div>
                    <div className="w-full mx-auto mt-12 text-left">
                        <div className="relative items-center gap-12 m-auto lg:inline-flex md:order-first">
                            <div className="p-4 mx-auto lg:max-w-7xl lg:p-0">
                                <ul role="list" className="grid grid-cols-2 gap-4 list-none lg:grid-cols-3 lg:gap-12">
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                Can I used Lexingtøn Themes for my site?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Upswing securities passively index inverse bondholders
                                            capitalization financial health Moodys debt managed.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                Will i get updates?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Upswing securities passively index inverse bondholders
                                            capitalization financial health Moodys debt managed.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                How much do disputes cost?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Upswing securities passively index inverse bondholders
                                            capitalization financial health Moodys debt managed.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                How do refunds work?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Plus, our platform is constantly evolving to meet the changing needs.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                Is there a fee to use Google Pay?
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Plus, our platform is constantly evolving to meet the changing needs.
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <p className="mt-5 text-lg font-medium leading-6 text-black">
                                                Customer support
                                            </p>
                                        </div>
                                        <div className="mt-2 text-base text-gray-500">
                                            Plus, our platform is constantly evolving to meet the changing needs.
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-primary container mx-auto rounded-xl'>
                <div className="flex flex-col justify-center flex-1 px-8 py-8 md:px-12 lg:flex-none lg:px-24">
                    <div>
                        <div className="relative">
                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                <div className="relative sm:overflow-hidden">
                                    <div className="relative px-4 py-16 sm:px-6 lg:px-8">
                                        <div className="max-w-2xl p-10 mx-auto text-center">
                                            <div>
                                                <p className={`${agrandir.className} text-7xl font-bold text-white`}>
                                                    I am a slightly longer heading than the others
                                                </p>
                                                <p className="max-w-xl mt-4 text-lg tracking-tight text-white/70">
                                                    If you could kick the person in the pants responsible for most of your trouble, you wouldnt sit for
                                                    a month
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center w-full max-w-xl pt-8 mx-auto md:pt-6">
                                            <form className="w-full">
                                                <div className="w-full sm:relative sm:flex sm:items-center">
                                                    <div className="relative w-full sm:static sm:flex-auto">
                                                        <input type="email" id="email-address"
                                                            placeholder="Email address"
                                                            className="relative z-10 w-full px-6 py-3 text-base text-center text-black 
                                                            appearance-none bg-white custom-blur lg:text-left border-white/10 peer
                                                            placeholder:text-black/70 focus:border-white/50 focus:outline-none rounded-xl" />
                                                    </div>
                                                    <button
                                                        className="inline-flex items-center justify-center w-full px-6 py-3 mt-2 text-center text-white duration-200 bg-black border-2 lg:m-0 lg:ml-2 lg:mt-0 e hover:bg-gray-100 rounded-xl hover:text-black focus:outline-none lg:w-auto"
                                                        type="submit">
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-white mt-32" aria-labelledby="footer-heading">
                <h2 id="footer-heading" className="sr-only">Footer</h2>
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-16">
                    <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                        <div className="text-white xl:col-span-1">
                            <a href="/"
                                className="text-lg font-bold tracking-tighter text-black transition duration-500 ease-in-out transform tracking-relaxed lg:pr-8">
                                <svg className="w-5 h-5" viewBox="0 0 232 232" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M166.524 51.4683L116.367 101.625L65.5235 51.4683L116.367 0.62434L166.524 51.4683ZM231.11 116.054L180.953 166.898L130.796 116.054L180.953 65.8969L231.11 116.054ZM101.939 116.054L51.0948 166.898L0.250934 116.054L51.0948 65.8969L101.939 116.054ZM166.524 181.326L116.367 231.483L65.5235 181.326L116.367 130.482L166.524 181.326Z"
                                        fill="#0c0c0c"></path>
                                </svg> </a>
                        </div>
                        <div className="grid grid-cols-2 gap-8 mt-12 xl:mt-0 xl:col-span-2">
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="font-semibold leading-6 text-black uppercase">
                                        Navigation
                                    </h3>
                                    <ul role="list" className="mt-4 space-y-2">
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Pricing
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                All UI Kits
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Custom pages
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Next.js
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Gatsby
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Remix
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Alpine.js
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Svelte
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                About
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-12 md:mt-0">
                                    <h3 className="font-semibold leading-6 text-black uppercase">
                                        UI/UX &amp; Dev
                                    </h3>
                                    <ul role="list" className="mt-4 space-y-2">
                                        <li>
                                            <a href="https://www.wickedbackgrounds.com/" className="text-sm text-gray-500 hover:text-blue-600">
                                                Wicked Backgrounds
                                            </a>
                                        </li>

                                        <li>
                                            <a href="https://www.colorsandfonts.com/" className="text-sm text-gray-500 hover:text-blue-600">
                                                Colors &amp; Fonts
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.serendipitytheme.com/" className="text-sm text-gray-500 hover:text-blue-600">
                                                Serendipity</a>
                                        </li>
                                        <li>
                                            <a href="https://www.brutalist.one/" className="text-sm text-gray-500 hover:text-blue-600">
                                                Brutalist One</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="md:grid md:grid-cols-2 md:gap-8">
                                <div>
                                    <h3 className="font-semibold leading-6 text-black uppercase">
                                        Legal
                                    </h3>
                                    <ul role="list" className="mt-4 space-y-2">
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Changelog
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                FAQ
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Refund
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                License
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Privacy Policy
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Terms
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="mt-12 md:mt-0">
                                    <h3 className="font-semibold leading-6 text-black uppercase">
                                        Socials
                                    </h3>
                                    <ul role="list" className="mt-4 space-y-2">
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Twitter
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Dribbble
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="text-sm text-gray-500 hover:text-blue-600">
                                                Indie Hackers
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>


        </>

    );
}

export default Home;