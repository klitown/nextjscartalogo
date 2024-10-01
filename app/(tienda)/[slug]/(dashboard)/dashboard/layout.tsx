import { UserNav } from "@/app/components/UserNav";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    ArchiveIcon,
    HeartIcon,
    HomeIcon,
    RocketIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getTiendaInfo } from "../../(infoTienda)/layout";
import { createClient } from "@/supabase/server";

export default async function ProductDetailLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { slug: string };
}) {
    const supabase = createClient();

    // Retrieve the current session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
        return redirect("/login");
    }

    const tienda = await getTiendaInfo(params.slug);

    const { data: activeSession } = await supabase.auth.getSession();

    if (tienda.user_id !== activeSession?.session?.user.id) {
        return redirect("/login");
    }

    return (
        <div className="flex flex-col h-screen">
            <header className="bg-white">
                <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between sm:justify-between sm:gap-4">
                        <Sheet>
                            <SheetTrigger asChild className="cursor-pointer">
                                <svg
                                    width="30"
                                    height="30"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="w-[100vw] lg:w-1/4"
                            >
                                <SheetHeader>
                                    <SheetTitle>Menú principal</SheetTitle>
                                </SheetHeader>
                                <hr className="my-3" />
                                <div className="flex flex-col justify-center items-center gap-3 w-full text-lg text-black mt-5">
                                    <SheetClose asChild>
                                        <Link
                                            href={`/${params.slug}/dashboard`}
                                            className=" cursor-pointer  w-full flex flex-row text-xl font-bold tracking-wide p-2
                                    hover:bg-indigo-500 hover:text-white hover:rounded-xl"
                                        >
                                            <HomeIcon
                                                height={30}
                                                width={30}
                                                className="mr-3"
                                            />
                                            Inicio
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href={`/${params.slug}/dashboard/mitienda`}
                                            className=" cursor-pointer  w-full flex flex-row text-xl font-bold tracking-wide p-2
                                    hover:bg-indigo-500 hover:text-white hover:rounded-xl"
                                        >
                                            <HeartIcon
                                                height={30}
                                                width={30}
                                                className="mr-3"
                                            />
                                            Mi tienda
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link
                                            href={`/${params.slug}/dashboard/misproductos`}
                                            className=" cursor-pointer  w-full flex flex-row text-xl font-bold tracking-wide p-2
                                    hover:bg-indigo-500 hover:text-white hover:rounded-xl"
                                        >
                                            <ArchiveIcon
                                                height={30}
                                                width={30}
                                                className="mr-3"
                                            />
                                            Mis productos
                                        </Link>
                                    </SheetClose>
                                    <div
                                        className=" cursor-pointer  w-full flex flex-row text-xl font-bold tracking-wide p-2
                                    hover:bg-indigo-500 hover:text-white hover:rounded-xl"
                                    >
                                        <RocketIcon
                                            height={30}
                                            width={30}
                                            className="mr-3"
                                        />
                                        Facturación
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                        USER AVATAR SETTINGS
                        <UserNav user={session.user} session={session} />
                    </div>
                    <hr className="my-3" />
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <div className="grow">{children}</div>
            {/* END CONTENIDO PRINCIPAL */}

            <footer className="bg-white" aria-labelledby="footer-heading">
                <hr className="mt-20" />
                <h2 id="footer-heading" className="sr-only">
                    Footer
                </h2>
                <div className="px-4 py-12 mx-auto bg-gray-50 max-w-7xl sm:px-6 lg:px-16 flex justify-center items-center">
                    <span className="mt-2 text-sm font-light text-gray-500 text-center">
                        Copyright © 2024 <br />
                        <span className="font-bold text-md">BSPY</span>
                    </span>
                </div>
            </footer>
        </div>
    );
}
