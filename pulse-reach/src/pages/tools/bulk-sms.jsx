import { useState } from "react";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import Badge from "../../components/ui/badge";
import { toast } from "sonner";

export default function BulkSMS() {
    const [email, setEmail] = useState("");

    function joinWaitlist() {
        if (!email.trim()) return toast.error("Enter your email");
        toast.success("Added to waitlist (demo)");
        setEmail("");
    }

    return (
        <main className="container py-10">
            <div className="mb-6 flex items-center gap-2">
                <h1 className="text-2xl font-semibold">Bulk SMS</h1>
                <Badge variant="secondary">Coming Soon</Badge>
            </div>

            <div className="rounded-xl border p-6 max-w-lg">
                <p className="text-slate-600">
                    CSV import, personalization, scheduling, and sender IDs are coming soon. Get notified:
                </p>
                <div className="mt-4 flex gap-2">
                    <Input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Button onClick={joinWaitlist}>Notify me</Button>
                </div>
            </div>
        </main>
    );
}