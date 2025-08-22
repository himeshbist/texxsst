import { cn } from "../../lib/utils";
import React from "react";

const Textarea = React.forwardRef(function Textarea({ className, ...props }, ref) {
    return (
        <textarea
            ref={ref}
            className={cn(
                "w-full min-h-[120px] rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
                className
            )}
            {...props}
        />
    );
});

export default Textarea;