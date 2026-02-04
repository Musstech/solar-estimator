"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export const NavMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();

    return (
        <div className="fixed top-6 left-6 z-[60]">
            {/* 3-Dots Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 flex flex-col items-center justify-center gap-1 bg-white shadow-md border border-slate-200 rounded-full hover:bg-slate-50 transition-colors z-[70] relative"
                aria-label="Menu"
            >
                <span className="w-1 h-1 bg-navy rounded-full"></span>
                <span className="w-1 h-1 bg-navy rounded-full"></span>
                <span className="w-1 h-1 bg-navy rounded-full"></span>
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-navy/20 backdrop-blur-sm transition-opacity duration-300 z-[65]"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Slide-out Drawer */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-navy text-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[66] ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="p-8 h-full flex flex-col">
                    <div className="mb-10 pt-4">
                        <h2 className="text-xl font-display font-bold text-white">MSE Installer</h2>
                        <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Portal Navigation</p>
                    </div>

                    <nav className="flex-1 space-y-2">
                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <span>🏠</span> Home
                        </Link>
                        <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <span>📊</span> Installer Dashboard
                        </Link>
                        <Link
                            href="/dashboard/leads"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <span>👤</span> Manage Leads
                        </Link>
                        <Link
                            href="/dashboard/settings"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                        >
                            <span>⚙️</span> Portal Settings
                        </Link>
                    </nav>

                    <div className="mt-auto pt-8 border-t border-white/10">
                        {session ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center font-bold text-xs uppercase">
                                        {session.user?.name?.charAt(0) || "U"}
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-sm font-medium truncate">{session.user?.name}</p>
                                        <p className="text-[10px] text-slate-400 truncate">{session.user?.email}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <span>🚪</span> Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/dashboard/login"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green/20 text-green font-bold hover:bg-green/30 transition-colors"
                            >
                                <span>🔑</span> Installer Login
                            </Link>
                        )}
                    </div>
                </div>

                {/* Close handle */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-4 text-slate-400 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            </div>
        </div>
    );
};
