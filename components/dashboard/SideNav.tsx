"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNav = () => {
    const pathname = usePathname();

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: "📊" },
        { name: "Leads", href: "/dashboard/leads", icon: "👤" },
        { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
    ];

    return (
        <div className="w-64 bg-navy h-full flex flex-col text-white">
            <div className="p-6">
                <h1 className="text-xl font-display font-bold tracking-tight">MSE Installer</h1>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest">Dashboard</p>
            </div>

            <nav className="flex-1 mt-4 px-4 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? "bg-green text-white shadow-lg"
                                    : "hover:bg-white/10 text-slate-300"
                                }`}
                        >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center font-bold">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-slate-400">Musstech Installer</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
