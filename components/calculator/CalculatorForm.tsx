"use client";

import React, { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Card } from "../ui/Card";
import { calculateSolarSystem, CalculationResult } from "@/lib/solar-logic";
import { formatCurrency, PANEL_OPTIONS } from "@/lib/constants";

export const CalculatorForm = () => {
    const [bill, setBill] = useState<string>("");
    const [panelWattage, setPanelWattage] = useState<number>(550);
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate calculation delay for better UX (as per brand guide "Loading skeletons")
        setTimeout(() => {
            const billAmount = parseFloat(bill.replace(/[^0-9.]/g, ""));
            if (!isNaN(billAmount) && billAmount > 0) {
                const res = calculateSolarSystem({
                    monthlyBill: billAmount,
                    panelWattage,
                });
                setResult(res);
            }
            setLoading(false);
        }, 800);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <Card title="Solar Estimator" className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <form onSubmit={handleCalculate} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            label="Monthly Electric Bill"
                            placeholder="e.g. 50,000"
                            suffix="₦"
                            value={bill}
                            onChange={(e) => setBill(e.target.value)}
                            type="number"
                            required
                        />

                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-sm font-medium text-navy uppercase tracking-wide">
                                Panel Type
                            </label>
                            <select
                                className="w-full p-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy"
                                value={panelWattage}
                                onChange={(e) => setPanelWattage(Number(e.target.value))}
                            >
                                {PANEL_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <Button type="submit" variant="action" className="w-full md:w-auto min-w-[200px]" isLoading={loading}>
                        Calculate Savings
                    </Button>
                </form>
            </Card>

            {result && (
                <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <Card className="border-l-4 border-l-green">
                        <p className="text-grey text-sm font-medium uppercase mb-1">Recommended System</p>
                        <p className="text-3xl font-display font-bold text-navy">{result.requiredSystemSize} kW</p>
                        <p className="text-sm text-grey mt-2">Inverter Capacity</p>
                    </Card>

                    <Card className="border-l-4 border-l-blue">
                        <p className="text-grey text-sm font-medium uppercase mb-1">Total Panels</p>
                        <p className="text-3xl font-display font-bold text-navy">{result.panelCount}</p>
                        <p className="text-sm text-grey mt-2">x {panelWattage}W Modules</p>
                    </Card>

                    <Card className="border-l-4 border-l-gold">
                        <p className="text-grey text-sm font-medium uppercase mb-1">Battery Bank</p>
                        <p className="text-3xl font-display font-bold text-navy">{result.batteryCapacity} kWh</p>
                        <p className="text-sm text-grey mt-2">Required Storage</p>
                    </Card>

                    <Card className="md:col-span-3 bg-slate-soft/50 border-hidden">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-navy font-bold text-lg">Estimated Cost</p>
                                <p className="text-grey text-sm">Hardware only, excluding installation</p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-green">
                                    {formatCurrency(result.estimatedCost.min)} - {formatCurrency(result.estimatedCost.max)}
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};
