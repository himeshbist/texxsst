export default function HeroVisual() {
    return (
        <div className="relative rounded-xl border bg-white/60 p-4 shadow-lg">
            <div className="absolute -inset-8 -z-10 opacity-70 blur-3xl"
                style={{
                    background:
                        "radial-gradient(120px 80px at 10% 10%, rgba(124,58,237,0.25), transparent), radial-gradient(130px 90px at 90% 20%, rgba(6,182,212,0.25), transparent)",
                }}
            />
            <div className="space-y-3">
                <div className="rounded-lg border p-3">
                    <div className="text-xs text-slate-500">Email task</div>
                    <div className="mt-1 h-2 w-full overflow-hidden rounded bg-slate-200">
                        <div className="h-full w-1/2 bg-violet-600" />
                    </div>
                </div>
                <div className="rounded-lg border p-3">
                    <div className="text-xs text-slate-500">OCR Preview</div>
                    <div className="mt-1 rounded bg-slate-100 p-2 text-[11px] text-slate-700">
                        "Hello world" → Hello world
                    </div>
                </div>
            </div>
        </div>
    );
}