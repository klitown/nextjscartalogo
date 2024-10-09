import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "../components/admin/AdminDashboardClient";

export default async function AdminDashboard() {
    const supabase = createClient();

    // Retrieve the current session
    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/login");
    }

    // Get the user's role
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", session.user.id)
        .single();

    if (userError || userData?.role !== "admin") {
        redirect("/"); // Redirect non-admin users
    }

    // Fetch all tiendas information
    const { data: tiendas, error: tiendasError } = await supabase
        .from("tiendas")
        .select("*");

    if (tiendasError) {
        console.error("Error fetching tiendas:", tiendasError);
        // Handle the error appropriately
    }

    return (
        <div className="w-[100vw]">
            <h1 className="text-center font-bold">Admin Dashboard</h1>
            <p className="text-center font-bold">Hola, {session.user.email}!</p>
            <AdminDashboardClient tiendas={tiendas || []} />
        </div>
    );
}
