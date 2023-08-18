function Page({ params }: { children: React.ReactNode; params: { slug: string } }) {
    return (
        <div className="container mx-auto flex flex-col">

            <h1 className="text-5xl font-bold text-center">
                {params.slug.toUpperCase()}
            </h1>

            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4 my-5">
                <div className="flex items-center gap-2 text-green-800">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                            clip-rule="evenodd"
                        />
                    </svg>

                    <strong className="block font-bold"> Atención </strong>
                </div>

                <p className="mt-2 text-md text-green-700">
                    La información mostrada acá son los datos públicos para tus clientes y visitantes de tu tienda
                </p>
            </div>

            <p>
                En proceso..
            </p>

        </div>
    );
}

export default Page;