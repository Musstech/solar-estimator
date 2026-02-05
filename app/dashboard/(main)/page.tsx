"use client";

import { Card } from "@/components/ui/Card";
import { LeadsTable } from "@/components/dashboard/LeadsTable";

export default function DashboardPage() {
    const stats = [
        { label: "Total Leads", value: "128", trend: "+12%" },
        { label: "Pending Quotes", value: "45", trend: "-5%" },
        { label: "Closed Deals", value: "23", trend: "+8%" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-grey uppercase tracking-wide">{stat.label}</p>
                        <div className="flex items-baseline justify-between">
                            <p className="text-3xl font-display font-bold text-navy">{stat.value}</p>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith("+") ? "bg-green/10 text-green" : "bg-red-50 text-red-500"
                                }`}>
                                {stat.trend}
                            </span>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-display font-bold text-navy">Recent Inquiries</h3>
                    <button
                        onClick={() => alert("CSV Export coming soon! Your data is safe in n8n.")}
                        className="text-sm bg-navy text-white px-4 py-2 rounded-lg hover:bg-navy-light transition-all"
                    >
                        Export CSV
                    </button>
                </div>
                <LeadsTable />
            </div>
        </div>
    );
}
