import { SideNav } from "@/components/dashboard/SideNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-soft">
            <SideNav />
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
                    <h2 className="text-navy font-display font-semibold text-lg uppercase tracking-wide">
                        Dashboard
                    </h2>
                    <div className="flex items-center gap-4">
                        <button className="text-grey hover:text-navy p-2 rounded-full hover:bg-slate-100 relative">
                            🔔 <span className="absolute top-1 right-1 w-2 h-2 bg-green rounded-full border border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-slate-200 mx-2"></div>
                        <p className="text-sm font-medium text-navy">Installer View</p>
                    </div>
                </header>
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
