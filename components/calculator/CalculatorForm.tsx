"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";
import { calculateTechnicalSizing, TechnicalResult, ApplianceLoad } from "@/lib/solar-logic";
import { formatCurrency, APPLIANCE_PRESETS, PANEL_OPTIONS } from "@/lib/constants";

export const CalculatorForm = () => {
    // Calculator State
    const [loads, setLoads] = useState<ApplianceLoad[]>([]);
    const [selectedPreset, setSelectedPreset] = useState("");
    const [panelWattage, setPanelWattage] = useState(450);
    const [result, setResult] = useState<TechnicalResult | null>(null);
    const [loading, setLoading] = useState(false);

    // Lead State
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const addAppliance = () => {
        const preset = APPLIANCE_PRESETS.find(p => p.name === selectedPreset);
        if (preset) {
            const newLoad: ApplianceLoad = {
                id: Math.random().toString(36).substr(2, 9),
                name: preset.name,
                wattage: preset.wattage,
                quantity: 1,
                hoursPerDay: preset.hours
            };
            setLoads([...loads, newLoad]);
        }
    };

    const removeAppliance = (id: string) => {
        setLoads(loads.filter(l => l.id !== id));
    };

    const updateAppliance = (id: string, field: keyof ApplianceLoad, value: any) => {
        setLoads(loads.map(l => l.id === id ? { ...l, [field]: value } : l));
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        if (loads.length === 0) return;
        setLoading(true);

        setTimeout(() => {
            const res = calculateTechnicalSizing(loads);
            setResult(res);
            setLoading(false);
            setShowLeadForm(true);
        }, 800);
    };

    const handleLeadSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitLoading(true);

        try {
            const response = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...leadData,
                    totalDailyLoad: result?.totalDailyLoadKWh,
                    systemSize: result?.requiredPanelCapacityKW,
                    panelCount: result?.panelCount,
                    estimatedCost: result?.estimatedCost.min,
                    applianceCount: loads.length
                }),
            });

            if (response.ok) {
                setSubmitted(true);
            }
        } catch (error) {
            console.error("Failed to submit lead:", error);
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card title="Solar Load Calculator" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <p className="mb-6 text-slate-500">Add your home appliances to calculate precise hardware needs.</p>

                <div className="space-y-6">
                    {/* Appliance Selector */}
                    <div className="flex gap-4 items-end">
                        <div className="flex-1 flex flex-col gap-2">
                            <label className="text-sm font-medium text-navy uppercase tracking-wide">Select Appliance</label>
                            <select
                                className="p-3 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-navy outline-none"
                                value={selectedPreset}
                                onChange={(e) => setSelectedPreset(e.target.value)}
                            >
                                <option value="">-- Choose Preset --</option>
                                {APPLIANCE_PRESETS.map((p) => (
                                    <option key={p.name} value={p.name}>{p.name} ({p.wattage}W)</option>
                                ))}
                            </select>
                        </div>
                        <Button variant="secondary" onClick={addAppliance} disabled={!selectedPreset}>
                            Add Item
                        </Button>
                    </div>

                    {/* Appliance List */}
                    {loads.length > 0 && (
                        <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-navy">Appliance</th>
                                        <th className="px-4 py-3 font-semibold text-navy text-center">Qty</th>
                                        <th className="px-4 py-3 font-semibold text-navy text-center">Hrs/Day</th>
                                        <th className="px-4 py-3 font-semibold text-navy text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {loads.map((load) => (
                                        <tr key={load.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-3 font-medium">{load.name}</td>
                                            <td className="px-4 py-3 text-center">
                                                <input
                                                    type="number"
                                                    className="w-12 p-1 border rounded text-center"
                                                    value={load.quantity}
                                                    onChange={(e) => updateAppliance(load.id, "quantity", parseInt(e.target.value))}
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-center">
                                                <input
                                                    type="number"
                                                    className="w-12 p-1 border rounded text-center"
                                                    value={load.hoursPerDay}
                                                    onChange={(e) => updateAppliance(load.id, "hoursPerDay", parseFloat(e.target.value))}
                                                />
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button onClick={() => removeAppliance(load.id)} className="text-red-500 font-bold hover:scale-110 transition-transform">
                                                    ✕
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="pt-4 flex justify-between items-center">
                        <div className="text-navy font-bold">
                            Total Load: {(loads.reduce((s, l) => s + (l.wattage * l.quantity * l.hoursPerDay), 0) / 1000).toFixed(2)} kWh/day
                        </div>
                        <Button onClick={handleCalculate} variant="action" disabled={loads.length === 0} isLoading={loading}>
                            Calculate Requirements
                        </Button>
                    </div>
                </div>
            </Card>

            {result && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="grid md:grid-cols-3 gap-6">
                        <Card className="border-l-4 border-l-green bg-white shadow-lg">
                            <p className="text-grey text-xs font-bold uppercase mb-1">Inverter Capacity</p>
                            <p className="text-4xl font-display font-bold text-navy">{result.requiredInverterKVA} kVA</p>
                            <p className="text-xs text-slate-400 mt-2 italic">Based on Peak Load: {result.peakLoadWatts}W</p>
                        </Card>

                        <Card className="border-l-4 border-l-blue bg-white shadow-lg">
                            <p className="text-grey text-xs font-bold uppercase mb-1">Solar Panels</p>
                            <p className="text-4xl font-display font-bold text-navy">{result.panelCount}</p>
                            <p className="text-xs text-slate-400 mt-2 font-medium">x 450W Modules ({result.requiredPanelCapacityKW}kWp)</p>
                        </Card>

                        <Card className="border-l-4 border-l-gold bg-white shadow-lg">
                            <p className="text-grey text-xs font-bold uppercase mb-1">Battery Storage</p>
                            <p className="text-4xl font-display font-bold text-navy">{result.batteryCount}</p>
                            <p className="text-xs text-slate-400 mt-2 font-medium">x 12V 200Ah Units ({result.batteryBankKWh}kWh)</p>
                        </Card>
                    </div>

                    <Card className="bg-navy text-white overflow-hidden relative">
                        <div className="relative z-10 flex justify-between items-center px-2">
                            <div>
                                <p className="text-green font-bold text-sm tracking-widest uppercase">Estimated Investment</p>
                                <p className="text-3xl font-bold mt-1">
                                    {formatCurrency(result.estimatedCost.min)} - {formatCurrency(result.estimatedCost.max)}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-slate-400 text-sm italic">Annual Savings</p>
                                <p className="text-xl font-bold text-green">+{formatCurrency(result.savingsPerYear)}/yr</p>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green/10 rounded-full -mr-16 -mt-16" />
                    </Card>

                    {showLeadForm && !submitted && (
                        <Card title="Get a Professional Quote" className="bg-slate-50 border-2 border-green animate-in zoom-in duration-500">
                            <p className="mb-6 text-slate-600">Our engineers will perform a site inspection and provide a finalized hardware bill of materials.</p>
                            <form onSubmit={handleLeadSubmit} className="grid md:grid-cols-3 gap-4">
                                <Input
                                    label="Full Name"
                                    className="bg-white border-slate-200"
                                    value={leadData.name}
                                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    className="bg-white border-slate-200"
                                    value={leadData.email}
                                    onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    className="bg-white border-slate-200"
                                    value={leadData.phone}
                                    onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                                    required
                                />
                                <div className="md:col-span-3">
                                    <Button type="submit" variant="action" className="w-full h-14 text-xl" isLoading={submitLoading}>
                                        Submit Engineering Request
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    )}

                    {submitted && (
                        <Card className="bg-green/10 border-green text-center py-12 animate-in slide-in-from-top-4 duration-500">
                            <div className="text-5xl mb-4">✨</div>
                            <h3 className="text-2xl font-bold text-navy mb-2">Request Received, {leadData.name}!</h3>
                            <p className="text-slate-600">Our technical team is reviewing your load profile and will contact you via {leadData.email} shortly.</p>
                            <Button variant="secondary" className="mt-6" onClick={() => window.location.reload()}>
                                Start New Calculation
                            </Button>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
};
