"use client";

import React from "react";
import { usePaystackPayment } from "react-paystack";
import { Button } from "../ui/Button";
import { X, CheckCircle, FileText, Lock } from "lucide-react";
import { formatCurrency } from "@/lib/constants";

interface PaymentModalProps {
    amount: number;
    email: string;
    onSuccess: (reference: any) => void;
    onClose: () => void;
}

// Public Test Key (Replace with Env Variable in Prod)
const PAYSTACK_PUBLIC_KEY = "pk_test_04c559863814674384157777174415418b7c7566"; // Example Test Key

export const PaymentModal: React.FC<PaymentModalProps> = ({ amount, email, onSuccess, onClose }) => {
    const config = {
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: amount * 100, // Paystack expects amount in kobo
        publicKey: PAYSTACK_PUBLIC_KEY,
    };

    const initializePayment = usePaystackPayment(config);

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="bg-navy p-6 text-white text-center relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
                        <X size={24} />
                    </button>
                    <div className="mx-auto w-12 h-12 bg-green/20 rounded-full flex items-center justify-center mb-3">
                        <Lock className="text-green" size={24} />
                    </div>
                    <h3 className="text-xl font-bold font-display">Upgrade to Premium</h3>
                    <p className="text-white/80 text-sm mt-1">Unlock detailed engineering data</p>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <CheckCircle className="text-green w-5 h-5" />
                            <span>Detailed Load Analysis Table</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <CheckCircle className="text-green w-5 h-5" />
                            <span>Wiring & Connection Diagrams</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <CheckCircle className="text-green w-5 h-5" />
                            <span>5-Year Financial ROI Projection</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-slate-600">
                            <CheckCircle className="text-green w-5 h-5" />
                            <span>Professional PDF Download</span>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                        <span className="font-medium text-navy">Total</span>
                        <span className="text-2xl font-bold text-navy">{formatCurrency(amount)}</span>
                    </div>

                    <Button
                        variant="action"
                        className="w-full h-14 text-lg"
                        onClick={() => {
                            initializePayment({ onSuccess: (ref: any) => onSuccess(ref), onClose: onClose });
                        }}
                    >
                        Pay Securely with Paystack
                    </Button>

                    <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
                        <Lock size={10} /> Secured by Paystack (Test Mode)
                    </p>
                </div>
            </div>
        </div>
    );
};
