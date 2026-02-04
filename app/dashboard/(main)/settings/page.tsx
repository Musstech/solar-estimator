import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-display font-bold text-navy">Account Settings</h1>
                <p className="text-grey text-sm">Manage your professional profile and app preferences.</p>
            </div>

            <div className="grid gap-8">
                <Card className="space-y-6">
                    <h3 className="text-lg font-bold text-navy border-b border-slate-100 pb-2">Profile Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input label="Full Name" defaultValue="John Doe" />
                        <Input label="Business Name" defaultValue="Musstech Solar Solutions" />
                        <Input label="Contact Email" defaultValue="installer@musstech.com" disabled />
                        <Input label="Phone Number" defaultValue="+234 800 000 0000" />
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button variant="primary">Save Changes</Button>
                    </div>
                </Card>

                <Card className="space-y-6">
                    <h3 className="text-lg font-bold text-navy border-b border-slate-100 pb-2">Notifications</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-navy">New Lead Alerts</p>
                                <p className="text-xs text-grey">Receive an email when a new calculation is submitted.</p>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 accent-green" />
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-navy">Weekly Reports</p>
                                <p className="text-xs text-grey">Summary of your performance every Monday.</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5 accent-green" />
                        </div>
                    </div>
                </Card>

                <div className="flex justify-start">
                    <button className="text-red-500 font-bold hover:underline">Log Out</button>
                </div>
            </div>
        </div>
    );
}
