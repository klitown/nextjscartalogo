import { UserNav } from "@/app/components/UserNav";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ArchiveIcon, HeartIcon, HomeIcon, MenuIcon } from "lucide-react";
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
        <div className="flex h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 bg-white border-r">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold">Menú principal</h2>
                </div>
                <nav className="flex-1 px-4 space-y-2">
                    <DesktopSidebarLink
                        href={`/${params.slug}/dashboard`}
                        icon={<HomeIcon />}
                    >
                        Inicio
                    </DesktopSidebarLink>
                    <DesktopSidebarLink
                        href={`/${params.slug}/dashboard/mitienda`}
                        icon={<HeartIcon />}
                    >
                        Mi tienda
                    </DesktopSidebarLink>
                    <DesktopSidebarLink
                        href={`/${params.slug}/dashboard/misproductos`}
                        icon={<ArchiveIcon />}
                    >
                        Mis productos
                    </DesktopSidebarLink>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            {/* Mobile Sidebar Trigger */}
                            <Sheet>
                                <SheetTrigger
                                    asChild
                                    className="lg:hidden mr-4"
                                >
                                    <button className="p-2">
                                        <MenuIcon className="h-6 w-6" />
                                    </button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-64 p-0">
                                    <SheetHeader className="p-6">
                                        <SheetTitle>Menú principal</SheetTitle>
                                    </SheetHeader>
                                    <nav className="flex-1 px-4 space-y-2">
                                        <MobileSidebarLink
                                            href={`/${params.slug}/dashboard`}
                                            icon={<HomeIcon />}
                                        >
                                            Inicio
                                        </MobileSidebarLink>
                                        <MobileSidebarLink
                                            href={`/${params.slug}/dashboard/mitienda`}
                                            icon={<HeartIcon />}
                                        >
                                            Mi tienda
                                        </MobileSidebarLink>
                                        <MobileSidebarLink
                                            href={`/${params.slug}/dashboard/misproductos`}
                                            icon={<ArchiveIcon />}
                                        >
                                            Mis productos
                                        </MobileSidebarLink>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <UserNav user={session.user} session={session} />
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-6">{children}</main>
            </div>
        </div>
    );
}

// Desktop SidebarLink component
function DesktopSidebarLink({
    href,
    icon,
    children,
}: {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg p-2 transition-colors duration-200"
        >
            {icon}
            <span>{children}</span>
        </Link>
    );
}

// Mobile SidebarLink component
function MobileSidebarLink({
    href,
    icon,
    children,
}: {
    href: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <SheetClose asChild>
            <Link
                href={href}
                className="flex items-center space-x-3 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg p-2 transition-colors duration-200"
            >
                {icon}
                <span>{children}</span>
            </Link>
        </SheetClose>
    );
}
