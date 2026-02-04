import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const Card = ({ children, className = "", title }: CardProps) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-slate-soft p-6 ${className}`}>
            {title && (
                <h3 className="text-lg font-display font-medium text-navy mb-4 border-b border-slate-soft pb-2">
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};
