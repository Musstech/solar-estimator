"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login delay
        setTimeout(() => {
            router.push("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-soft flex items-center justify-center p-4">
            <Card className="w-full max-w-md space-y-8 animate-in zoom-in duration-500">
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-display font-bold text-navy">Installer Login</h1>
                    <p className="text-slate-500 text-sm">Access your leads and project dashboard</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="installer@musstech.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                            <input type="checkbox" className="rounded border-slate-300 text-navy focus:ring-navy" />
                            Remember me
                        </label>
                        <a href="#" className="text-sm text-navy hover:text-green font-medium transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    <Button type="submit" variant="primary" className="w-full py-4 text-lg" isLoading={isLoading}>
                        Sign In
                    </Button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-slate-500">
                        Don't have an account?{" "}
                        <a href="#" className="text-navy font-bold hover:text-green transition-colors">Contact Support</a>
                    </p>
                </div>
            </Card>
        </div>
    );
}
