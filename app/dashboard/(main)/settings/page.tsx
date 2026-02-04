"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-display font-bold text-navy">Installer Settings</h1>
                <p className="text-slate-500">Configure your profile and API integrations.</p>
            </header>

            <div className="grid md:grid-cols-2 gap-6">
                <Card title="Business Profile">
                    <form className="space-y-4">
                        <Input label="Company Name" defaultValue="Musstech Solar" />
                        <Input label="Business Address" defaultValue="Lagos, Nigeria" />
                        <Button variant="primary">Save Profile</Button>
                    </form>
                </Card>

                <Card title="API Configuration">
                    <div className="space-y-4">
                        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-xs font-bold text-navy uppercase mb-2">n8n Leads Webhook</p>
                            <code className="text-xs text-green break-all">
                                {process.env.NEXT_PUBLIC_N8N_LEADS_URL || "Not Configured"}
                            </code>
                        </div>
                        <p className="text-xs text-slate-400">
                            Updates safely via environment variables in Vercel.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
