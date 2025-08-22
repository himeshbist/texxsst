// src/pages/home.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/button";
import HeroVisual from "../components/visuals/HeroVisual";
import Badge from "../components/ui/badge";
import Input from "../components/ui/input";
import Progress from "../components/ui/progress";
import LogoMarquee from "../components/visuals/LogoMarquee";
import { Send, ScanText, Shield, Clock3, Store, Users, Newspaper, Phone, CalendarClock, LayoutTemplate, BarChart3, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
    function joinWaitlist(e) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const email = String(data.get("email") || "").trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Enter a valid email");
            return;
        }
        toast.success("Added to SMS waitlist (demo)");
        e.currentTarget.reset();
    }

    const [votes, setVotes] = useState({
        automations: 21,
        templates: 14,
        analytics: 9,
    });

    function upvote(key) {
        setVotes((v) => ({ ...v, [key]: v[key] + 1 }));
        toast.success("Thanks for the vote!");
    }

    return (
        <main>
            {/* HERO (unchanged) */}
            <section className="relative overflow-hidden border-b">
                <div
                    className="absolute inset-0 -z-10"
                    style={{
                        background:
                            "radial-gradient(60% 40% at 50% 0%, rgba(124,58,237,0.15), transparent), radial-gradient(40% 30% at 90% 10%, rgba(6,182,212,0.15), transparent)",
                    }}
                />
                <div className="container py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-slate-600 bg-white shadow-sm">
                            <Badge>New</Badge>
                            Bulk Email + OCR are live
                        </div>
                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
                            Reach thousands. Read anything. Instantly.
                        </h1>
                        <p className="mt-4 text-slate-600">
                            Send bulk emails that land, and turn images into machine‑readable text in seconds.
                            Built for small businesses and power users.
                        </p>
                        <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <Link to="/tools/bulk-email"><Button size="lg">Start Sending</Button></Link>
                            <Link to="/tools/ocr"><Button variant="ghost" size="lg">Try OCR</Button></Link>
                        </div>
                        <div className="mt-6 text-xs text-slate-500">Fast • Secure • No bloat</div>
                    </div>
                    <HeroVisual />
                </div>
            </section>

            {/* MOVING LOGOS */}
            <LogoMarquee speed={26} forceMotion={true} />

            {/* Why teams choose PulseReach */}
            <section className="container py-10">
                <h2 className="text-2xl font-semibold">Why teams choose PulseReach</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Benefit
                        icon={<Send size={18} />}
                        title="Personalized at scale"
                        desc="Upload CSVs and use merge tags without wrestling complex tools."
                    />
                    <Benefit
                        icon={<ScanText size={18} />}
                        title="Clean OCR output"
                        desc="Accurate extraction with one‑click copy or downloads in TXT/JSON."
                    />
                    <Benefit
                        icon={<Shield size={18} />}
                        title="Deliverability‑minded"
                        desc="Input validation and guidance to help emails land where they should."
                    />
                    <Benefit
                        icon={<Clock3 size={18} />}
                        title="Fast, lightweight"
                        desc="Responsive UI with lazy‑loaded OCR so your app stays snappy."
                    />
                </div>
            </section>

            {/* Features */}
            <section className="container py-12">
                <div className="grid gap-6 md:grid-cols-3">
                    <FeatureCard title="Bulk Email" desc="Upload CSV, personalize with merge tags, preview, and send." />
                    <FeatureCard title="OCR Image → Text" desc="Drag & drop images; copy output or download TXT/JSON." />
                    <FeatureCard title="Bulk SMS" desc="Scheduling, sender IDs, and personalization — coming soon." badge="Coming Soon" />
                </div>
            </section>

            {/* Use cases */}
            <section className="container py-10">
                <h2 className="text-2xl font-semibold">Built for your workflow</h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    <UseCase
                        icon={<Store size={18} />}
                        title="Small shops"
                        desc="Send promos and receipts, keep customers in the loop."
                    />
                    <UseCase
                        icon={<Users size={18} />}
                        title="Ops & admin"
                        desc="Notify teams, send reminders, and share updates quickly."
                    />
                    <UseCase
                        icon={<Newspaper size={18} />}
                        title="Creators"
                        desc="Publish newsletters and convert images to text for drafts."
                    />
                </div>
            </section>

            {/* How it works */}
            <section className="container pb-16">
                <h2 className="text-2xl font-semibold">How it works</h2>
                <ol className="mt-4 grid gap-4 md:grid-cols-3 text-slate-600">
                    <li className="rounded-lg border p-4">1) Import a CSV or image</li>
                    <li className="rounded-lg border p-4">2) Configure subject/message or OCR language</li>
                    <li className="rounded-lg border p-4">3) Send or extract — done</li>
                </ol>
            </section>

            {/* WHAT'S NEXT — lively roadmap */}
            <section className="border-t hidden md:block" aria-label="Roadmap">
                <div className="container py-12">
                    <h3 className="text-xl font-semibold">What’s next for PulseReach</h3>
                    <p className="mt-1 text-sm text-slate-600">Peek at the roadmap and tell us what to build first.</p>

                    <div className="mt-6 grid gap-6 lg:grid-cols-4">
                        {/* Bulk SMS — waitlist */}
                        <div className="rounded-2xl border p-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Phone className="text-violet-600" size={18} />
                                    <div className="font-medium">Bulk SMS</div>
                                </div>
                                <Badge variant="secondary">Alpha</Badge>
                            </div>
                            <p className="mt-2 text-sm text-slate-600">
                                Sender IDs, scheduling, personalization, and analytics.
                                Join the waitlist for early access.
                            </p>
                            <div className="mt-3">
                                <Progress value={65} />
                                <div className="mt-1 text-xs text-slate-500">65% complete</div>
                            </div>
                            <form onSubmit={joinWaitlist} className="mt-4 flex gap-2">
                                <Input name="email" type="email" placeholder="you@example.com" className="h-10" />
                                <Button type="submit">Notify me</Button>
                            </form>
                        </div>

                        {/* Automations & Scheduling — upvote */}
                        <RoadmapVoteCard
                            icon={<CalendarClock className="text-violet-600" size={18} />}
                            title="Automations & scheduling"
                            desc="Set-and-forget sequences, recurring sends, and triggers."
                            progress={40}
                            votes={votes.automations}
                            onVote={() => upvote("automations")}
                        />

                        {/* Templates & Snippets — upvote */}
                        <RoadmapVoteCard
                            icon={<LayoutTemplate className="text-violet-600" size={18} />}
                            title="Templates & snippets"
                            desc="Reusable email and OCR presets with shared variables."
                            progress={35}
                            votes={votes.templates}
                            onVote={() => upvote("templates")}
                        />

                        {/* Deliverability Dashboard — upvote */}
                        <RoadmapVoteCard
                            icon={<BarChart3 className="text-violet-600" size={18} />}
                            title="Deliverability dashboard"
                            desc="Track bounces, opens, and sending health at a glance."
                            progress={20}
                            votes={votes.analytics}
                            onVote={() => upvote("analytics")}
                        />
                    </div>

                    {/* CTA band */}
                    <div className="mt-8 rounded-2xl border bg-gradient-to-r from-violet-50 to-cyan-50 p-6 text-center">
                        <h4 className="text-lg font-semibold">Build with us</h4>
                        <p className="mt-1 text-slate-600 text-sm">
                            Vote on features or join the SMS alpha — your feedback shapes the roadmap.
                        </p>
                        <div className="mt-4 flex justify-center gap-3">
                            <Link to="/tools/bulk-email"><Button>Start Sending</Button></Link>
                            <Link to="/tools/ocr"><Button variant="outline">Try OCR</Button></Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

/* Helpers */
function Benefit({ icon, title, desc }) {
    return (
        <div className="rounded-xl border p-5">
            <div className="flex items-center gap-2">
                <span className="text-violet-600">{icon}</span>
                <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">{desc}</p>
        </div>
    );
}

function FeatureCard({ title, desc, badge }) {
    return (
        <div className="rounded-xl border p-5">
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{title}</h3>
                {badge ? <Badge variant="secondary">{badge}</Badge> : null}
            </div>
            <p className="mt-2 text-sm text-slate-600">{desc}</p>
        </div>
    );
}

function UseCase({ icon, title, desc }) {
    return (
        <div className="rounded-xl border p-5">
            <div className="flex items-center gap-2">
                <span className="text-violet-600">{icon}</span>
                <h3 className="font-semibold">{title}</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600">{desc}</p>
        </div>
    );
}

function RoadmapVoteCard({ icon, title, desc, progress, votes, onVote }) {
    return (
        <div className="rounded-2xl border p-5">
            <div className="flex items-center gap-2">
                {icon}
                <div className="font-medium">{title}</div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{desc}</p>
            <div className="mt-3">
                <Progress value={progress} />
                <div className="mt-1 text-xs text-slate-500">{progress}% planned</div>
            </div>
            <div className="mt-3 flex items-center justify-between">
                <button
                    onClick={onVote}
                    className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                    <ThumbsUp size={16} /> Upvote
                </button>
                <div className="text-sm text-slate-600">{votes} votes</div>
            </div>
        </div>
    );
}