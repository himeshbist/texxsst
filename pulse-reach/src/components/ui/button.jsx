import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const variants = cva(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
    {
        variants: {
            variant: {
                default: "bg-violet-600 text-white hover:bg-violet-700",
                outline: "border border-slate-300 hover:bg-slate-50",
                ghost: "hover:bg-slate-100",
            },
            size: {
                sm: "h-8 px-3",
                md: "h-10 px-4",
                lg: "h-11 px-5 text-base",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "md",
        },
    }
);

export default function Button({ className, variant, size, ...props }) {
    return <button className={cn(variants({ variant, size }), className)} {...props} />;
}