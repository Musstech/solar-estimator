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

export const LeadsTable = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const response = await fetch("/api/dashboard/leads");
                if (!response.ok) throw new Error("Failed to fetch leads");
                const data = await response.json();
                setLeads(data);
            } catch (err) {
                // If API fails, we use mock data in a real app or show error
                // For this demo, we'll keep the error state but allow user to see it
                setError("Could not load leads from API. Please ensure n8n is configured.");
                console.error(err);
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
                <p className="text-grey font-medium">Fetching the latest engineering leads...</p>
            </div>
        );
    }

    if (error && leads.length === 0) {
        return (
            <div className="bg-white rounded-xl p-8 text-center border border-slate-200 shadow-sm">
                <div className="text-4xl mb-4">⚠️</div>
                <p className="text-red-500 font-medium mb-4">{error}</p>
                <div className="text-xs text-slate-400 p-4 bg-slate-50 rounded italic">
                    Note: The dashboard is trying to reach "N8N_FETCH_LEADS_URL" which is not yet configured on your Vercel/Local env.
                </div>
            </div>
        );
    }

    if (leads.length === 0) {
        return (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="text-4xl mb-4 text-slate-300">📁</div>
                <p className="text-grey font-medium">No leads found yet.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Installer Lead</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Daily Load</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">System</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Est. Budget</th>
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
                                <td className="px-6 py-4 text-sm text-grey">{lead.totalDailyLoad || 0} kWh</td>
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
                                        View BOM
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
