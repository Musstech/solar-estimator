"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/constants";

interface Lead {
    id: string;
    date: string;
    name: string;
    bill: number;
    systemSize: string;
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
                setError("Could not load leads. Please try again later.");
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
                <p className="text-grey font-medium">Fetching the latest leads...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="text-4xl mb-4">⚠️</div>
                <p className="text-red-500 font-medium">{error}</p>
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
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Customer</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Monthly Bill</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Rec. System</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-grey uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {leads.map((lead) => (
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
