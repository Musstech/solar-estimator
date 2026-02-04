import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "action";
    isLoading?: boolean;
}

export const Button = ({
    children,
    variant = "primary",
    isLoading,
    className = "",
    ...props
}: ButtonProps) => {
    const baseStyles = "px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-navy text-white hover:bg-navy-light text-h3 !text-base", // Using !text-base to override h3 size but keep font
        secondary: "bg-white border-2 border-navy text-navy hover:bg-slate-soft",
        action: "bg-green text-white font-bold hover:brightness-110 shadow-md transform active:scale-95",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : null}
            {children}
        </button>
    );
};
