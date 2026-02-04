"use client";

import { formatCurrency } from "@/lib/constants";

interface Lead {
    id: string;
    date: string;
    name: string;
    bill: number;
    systemSize: string;
    status: "New" | "Contacted" | "In Progress" | "Closed";
}

const mockLeads: Lead[] = [
    { id: "1", date: "2026-02-03", name: "Alice Johnson", bill: 45000, systemSize: "12 kW", status: "New" },
    { id: "2", date: "2026-02-02", name: "Bob Smith", bill: 120000, systemSize: "32 kW", status: "Contacted" },
    { id: "3", date: "2026-02-01", name: "Charlie Davis", bill: 30000, systemSize: "8 kW", status: "In Progress" },
    { id: "4", date: "2026-01-31", name: "David Wilson", bill: 65000, systemSize: "18 kW", status: "Closed" },
];

export const LeadsTable = () => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Monthly Bill</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Rec. System</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {mockLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-navy">{lead.name}</td>
                                <td className="px-6 py-4 text-sm text-grey">{lead.date}</td>
                                <td className="px-6 py-4 text-sm text-navy font-medium">{formatCurrency(lead.bill)}</td>
                                <td className="px-6 py-4 text-sm font-bold text-green">{lead.systemSize}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${lead.status === "New" ? "bg-blue/10 text-blue" :
                                            lead.status === "Contacted" ? "bg-gold/10 text-gold" :
                                                lead.status === "In Progress" ? "bg-green/10 text-green" :
                                                    "bg-grey-light text-grey"
                                        }`}>
                                        {lead.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-navy hover:text-green font-medium text-sm transition-colors">
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
