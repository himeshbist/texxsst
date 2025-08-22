import { cn } from "../../lib/utils";

export default function Progress({ value = 0, className }) {
    return (
        <div className={cn("w-full h-2 rounded-full bg-slate-200 overflow-hidden", className)}>
            <div
                className="h-full bg-violet-600 transition-all"
                style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
            />
        </div>
    );
}