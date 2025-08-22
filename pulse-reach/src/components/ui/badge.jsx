import { cn } from "../../lib/utils";

export default function Badge({ children, variant = "default", className }) {
    const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium";
    const styles =
        variant === "secondary"
            ? "border-slate-200 bg-slate-100 text-slate-700"
            : "border-violet-200 bg-violet-50 text-violet-700";
    return <span className={cn(base, styles, className)}>{children}</span>;
}