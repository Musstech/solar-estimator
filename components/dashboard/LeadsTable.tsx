"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/constants";

interface Lead {
    id: string;
    date: string;
    name: string;
    totalDailyLoad?: number;
    systemSize: number;
    estimatedCost: number;
    status: "New" | "Contacted" | "In Progress" | "Closed";
}

const FALLBACK_LEADS: Lead[] = [
    { id: "1", date: "2026-02-03", name: "Ikechukwu Okafor", totalDailyLoad: 12.5, systemSize: 3.5, estimatedCost: 1800000, status: "New" },
    { id: "2", date: "2026-02-02", name: "Sola Bakare", totalDailyLoad: 45.0, systemSize: 12.0, estimatedCost: 5500000, status: "Contacted" },
    { id: "3", date: "2026-02-01", name: "Chidi Eze", totalDailyLoad: 8.2, systemSize: 2.5, estimatedCost: 1200000, status: "In Progress" },
];

export const LeadsTable = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await fetch("/api/dashboard/leads");
                if (!response.ok) throw new Error("API Offline");
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    setLeads(data);
                } else {
                    setLeads(FALLBACK_LEADS);
                }
            } catch (err) {
                console.warn("Using fallback leads due to API unavailability");
                setLeads(FALLBACK_LEADS);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="animate-spin text-4xl mb-4 inline-block">⏳</div>
                <p className="text-grey font-medium">Loading leads...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Daily Load</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Sys. Size</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Budget</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {leads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-navy">{lead.name}</div>
                                    <div className="text-xs text-slate-400">{lead.date}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-grey">{lead.totalDailyLoad} kWh</td>
                                <td className="px-6 py-4 text-sm font-bold text-green">{lead.systemSize} kWp</td>
                                <td className="px-6 py-4 text-sm text-navy font-medium">{formatCurrency(lead.estimatedCost)}</td>
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
                                    <button className="text-navy hover:text-green font-medium text-sm transition-colors border border-slate-200 px-3 py-1 rounded-md">
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {leads === FALLBACK_LEADS && (
                <div className="bg-blue/5 p-3 text-center text-[10px] text-blue uppercase tracking-widest font-bold">
                    Showing Local Leads (API Sync Pending)
                </div>
            )}
        </div>
    );
};
