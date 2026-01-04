import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-950">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
