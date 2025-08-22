import { cn } from "../../lib/utils";
import React from "react";

const Input = React.forwardRef(function Input({ className, ...props }, ref) {
    return (
        <input
            ref={ref}
            className={cn(
                "w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
                className
            )}
            {...props}
        />
    );
});

export default Input;