import { LeadsTable } from "@/components/dashboard/LeadsTable";

export default function LeadsPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-display font-bold text-navy">Customer Leads</h1>
                    <p className="text-grey text-sm">Review and manage all solar estimation inquiries.</p>
                </div>
                <button className="bg-navy text-white px-4 py-2 rounded-lg hover:bg-navy-light transition-all text-sm font-medium">
                    Download Report
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-soft p-2">
                <LeadsTable />
            </div>
        </div>
    );
}
