// src/pages/tools/bulk-email.jsx
import { useMemo, useState } from "react";
import Input from "../../components/ui/input";
import Textarea from "../../components/ui/textarea";
import Button from "../../components/ui/button";
import Progress from "../../components/ui/progress";
import Badge from "../../components/ui/badge";
import { parseCSV, applyMergeTags, isValidEmail } from "../../lib/csv";
import { sendTestEmail } from "../../lib/api";
import { toast } from "sonner";

export default function BulkEmail() {
    const [senderName, setSenderName] = useState("");
    const [senderEmail, setSenderEmail] = useState("");
    const [subject, setSubject] = useState("Hello {{first_name}} — quick update");
    const [message, setMessage] = useState("Hi {{first_name}},\n\nThanks for being with us!\n\n— {{sender_name}}");
    const [contacts, setContacts] = useState([]);
    const [validCount, setValidCount] = useState(0);
    const [invalidCount, setInvalidCount] = useState(0);
    const [testTo, setTestTo] = useState("");
    const [sending, setSending] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activity, setActivity] = useState([]);

    const example = contacts[0] || { email: "john@example.com", first_name: "John" };

    const mappedPreview = useMemo(() => {
        return {
            subject: applyMergeTags(subject, { ...example, sender_name: senderName }),
            message: applyMergeTags(message, { ...example, sender_name: senderName }),
        };
    }, [subject, message, example, senderName]);

    async function onCSV(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const rows = await parseCSV(file);
        const cleaned = rows.map((r) => ({
            ...r,
            email: String(r.email || r.Email || "").trim(),
            first_name: r.first_name || r.firstname || r.FirstName || "",
        }));
        const valids = cleaned.filter((r) => isValidEmail(r.email));
        const invalids = cleaned.length - valids.length;
        setContacts(valids);
        setValidCount(valids.length);
        setInvalidCount(invalids);
        toast.success(`Imported ${valids.length} contacts (${invalids} invalid skipped)`);
    }

    async function onSendTest() {
        if (!isValidEmail(testTo)) {
            toast.error("Enter a valid test email");
            return;
        }
        await sendTestEmail({ to: testTo, subject });
        toast.success("Test email sent (simulated)");
    }

    async function onSendAll() {
        if (!contacts.length) return toast.error("Import a CSV first");
        if (!isValidEmail(senderEmail)) return toast.error("Enter a valid sender email");
        setSending(true);
        setActivity([]);
        setProgress(0);

        const total = contacts.length;
        toast.info("Sending started…");

        // Simulate chunked sending
        for (let i = 0; i < contacts.length; i++) {
            await new Promise((r) => setTimeout(r, 200));
            const ok = Math.random() > 0.03;
            setActivity((a) => [{ email: contacts[i].email, ok }, ...a].slice(0, 10));
            setProgress(Math.round(((i + 1) / total) * 100));
        }

        toast.success(`Finished sending to ${total} recipients (simulated)`);
        setSending(false);
    }

    return (
        <main className="container py-10">
            <div className="mb-6 flex items-center gap-2">
                <h1 className="text-2xl font-semibold">Bulk Email</h1>
                <Badge>Live</Badge>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
                <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm text-slate-600">Sender name</label>
                            <Input value={senderName} onChange={(e) => setSenderName(e.target.value)} placeholder="Acme Inc." />
                        </div>
                        <div>
                            <label className="text-sm text-slate-600">Sender email</label>
                            <Input value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} placeholder="hello@acme.com" />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm text-slate-600">
                            Subject (supports {"{{merge_tags}}"})
                        </label>
                        <Input value={subject} onChange={(e) => setSubject(e.target.value)} />
                    </div>

                    <div>
                        <label className="text-sm text-slate-600">Message</label>
                        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="text-sm text-slate-600">Upload CSV (email, first_name, ...)</label>
                            <Input type="file" accept=".csv" onChange={onCSV} />
                            <div className="mt-2 text-xs text-slate-500">
                                {validCount ? `${validCount} valid` : "No contacts yet"} {invalidCount ? ` • ${invalidCount} invalid` : ""}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm text-slate-600">Send test to</label>
                            <div className="flex gap-2">
                                <Input placeholder="you@example.com" value={testTo} onChange={(e) => setTestTo(e.target.value)} />
                                <Button onClick={onSendTest} className="whitespace-nowrap">Send Test</Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button onClick={onSendAll} disabled={sending || !contacts.length}>
                            {sending ? "Sending..." : "Send to All"}
                        </Button>
                        {sending ? <Progress value={progress} className="w-48" /> : null}
                        {sending ? <div className="text-sm text-slate-600">{progress}%</div> : null}
                    </div>
                </div>

                <aside className="space-y-4">
                    <div className="rounded-xl border p-4">
                        <div className="text-sm font-medium">Preview</div>
                        <div className="mt-2 text-xs text-slate-500">Showing example recipient</div>
                        <div className="mt-3 rounded border p-3">
                            <Preview subject={mappedPreview.subject} message={mappedPreview.message} />
                        </div>
                    </div>

                    <div className="rounded-xl border p-4">
                        <div className="text-sm font-medium mb-2">Recent activity</div>
                        <ul className="space-y-1 text-sm">
                            {activity.length === 0 && <li className="text-slate-500">No activity yet.</li>}
                            {activity.map((a, i) => (
                                <li key={i} className="flex justify-between">
                                    <span className="text-slate-600">{a.email}</span>
                                    <span className={a.ok ? "text-emerald-600" : "text-rose-600"}>{a.ok ? "Sent" : "Failed"}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </main>
    );
}

function Preview({ subject, message }) {
    return (
        <>
            <div className="text-sm font-semibold">{subject}</div>
            <pre className="mt-2 whitespace-pre-wrap text-sm text-slate-700">{message}</pre>
        </>
    );
}