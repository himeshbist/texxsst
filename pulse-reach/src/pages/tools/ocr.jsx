import { useEffect, useRef, useState } from "react";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";
import Progress from "../../components/ui/progress";
import Badge from "../../components/ui/badge";
import { extractText } from "../../lib/ocr";
import { toast } from "sonner";

export default function OCR() {
    const [file, setFile] = useState(null);
    const [lang, setLang] = useState("eng");
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("");
    const [text, setText] = useState("");
    const [json, setJson] = useState(null);
    const [busy, setBusy] = useState(false);
    const dropRef = useRef(null);

    function onDrop(e) {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0];
        if (f) setFile(f);
    }

    function onDragOver(e) {
        e.preventDefault();
    }

    async function onExtract() {
        if (!file) return toast.error("Choose an image first");
        setBusy(true);
        setText("");
        setJson(null);
        setProgress(0);
        setStatus("Initializing…");
        try {
            const data = await extractText(file, lang, (m) => {
                if (m.status) setStatus(m.status);
                if (m.progress) setProgress(Math.round((m.progress || 0) * 100));
            });
            setText(data.text || "");
            setJson(data);
            setProgress(100);
            toast.success("Extraction complete");
        } catch (e) {
            console.error(e);
            toast.error("OCR failed");
        } finally {
            setBusy(false);
        }
    }

    function copyText() {
        navigator.clipboard.writeText(text || "");
        toast.success("Copied");
    }

    function downloadTxt() {
        const blob = new Blob([text || ""], { type: "text/plain;charset=utf-8" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "ocr.txt";
        a.click();
        URL.revokeObjectURL(a.href);
    }

    function downloadJSON() {
        const blob = new Blob([JSON.stringify(json || {}, null, 2)], { type: "application/json" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "ocr.json";
        a.click();
        URL.revokeObjectURL(a.href);
    }

    useEffect(() => {
        const el = dropRef.current;
        if (!el) return;
        el.addEventListener("dragover", onDragOver);
        el.addEventListener("drop", onDrop);
        return () => {
            el.removeEventListener("dragover", onDragOver);
            el.removeEventListener("drop", onDrop);
        };
    }, []);

    return (
        <main className="container py-10">
            <div className="mb-6 flex items-center gap-2">
                <h1 className="text-2xl font-semibold">OCR Image → Text</h1>
                <Badge>Live</Badge>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div className="space-y-4">
                    <div
                        ref={dropRef}
                        className="rounded-xl border-2 border-dashed p-6 text-center"
                    >
                        <div className="text-sm text-slate-600">Drag & drop an image here</div>
                        <div className="my-3 text-xs text-slate-500">or</div>
                        <Input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                        {file && <div className="mt-3 text-sm text-slate-600">Selected: <span className="font-mono">{file.name}</span></div>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-slate-600">Language</label>
                            <select
                                className="mt-1 w-full h-10 rounded-md border border-slate-300 bg-white px-3 text-sm"
                                value={lang}
                                onChange={(e) => setLang(e.target.value)}
                            >
                                <option value="eng">English (eng)</option>
                                <option value="spa">Spanish (spa)</option>
                                <option value="fra">French (fra)</option>
                                <option value="deu">German (deu)</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <Button onClick={onExtract} disabled={!file || busy} className="w-full">
                                {busy ? "Extracting…" : "Extract Text"}
                            </Button>
                        </div>
                    </div>

                    {busy && (
                        <div className="space-y-2">
                            <Progress value={progress} />
                            <div className="text-xs text-slate-600">{status} ({progress}%)</div>
                        </div>
                    )}
                </div>

                <aside className="space-y-4">
                    <div className="rounded-xl border p-4">
                        <div className="text-sm font-medium">Text</div>
                        <div className="mt-2 min-h-[160px] rounded border bg-slate-50 p-3 text-sm">
                            {text ? <pre className="whitespace-pre-wrap">{text}</pre> : <span className="text-slate-500">No text yet</span>}
                        </div>
                        <div className="mt-3 flex gap-2">
                            <Button variant="outline" onClick={copyText} disabled={!text}>Copy</Button>
                            <Button variant="outline" onClick={downloadTxt} disabled={!text}>Download .txt</Button>
                        </div>
                    </div>

                    <div className="rounded-xl border p-4">
                        <div className="text-sm font-medium">JSON</div>
                        <div className="mt-2 min-h-[160px] rounded border bg-slate-50 p-3 text-xs overflow-auto max-h-[300px]">
                            {json ? <pre>{JSON.stringify(json, null, 2)}</pre> : <span className="text-slate-500">No JSON yet</span>}
                        </div>
                        <div className="mt-3">
                            <Button variant="outline" onClick={downloadJSON} disabled={!json}>Download .json</Button>
                        </div>
                    </div>
                </aside>
            </div>
        </main>
    );
}