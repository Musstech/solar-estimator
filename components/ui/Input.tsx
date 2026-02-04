import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    suffix?: string;
}

export const Input = ({
    label,
    error,
    suffix,
    className = "",
    ...props
}: InputProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            <label className="text-sm font-medium text-navy uppercase tracking-wide">
                {label}
            </label>
            <div className="relative">
                <input
                    className={`w-full p-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-navy focus:border-transparent transition-all
            ${error ? "border-red-500" : "border-slate-300"}
            ${className}
          `}
                    {...props}
                />
                {suffix && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-grey">
                        {suffix}
                    </span>
                )}
            </div>
            {error && <span className="text-xs text-red-500">{error}</span>}
        </div>
    );
};
