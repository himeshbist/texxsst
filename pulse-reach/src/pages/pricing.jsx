// src/pages/pricing.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/button";
import Badge from "../components/ui/badge";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

export default function Pricing() {
    const [annual, setAnnual] = useState(false);

    const plans = useMemo(
        () => [
            {
                id: "free",
                name: "Free",
                monthly: 0,
                yearly: 0,
                blurb: "For getting started and occasional sends.",
                cta: { label: "Start Free", to: "/tools/bulk-email" },
                features: [
                    "500 emails / month",
                    "100 OCR pages / month",
                    "CSV import & merge tags",
                    "Basic templates",
                ],
                limits: ["Community support"],
                negatives: ["No custom domain sending", "No priority OCR"],
            },
            {
                id: "pro",
                name: "Pro",
                monthly: 19,
                yearly: 182, // ~20% off (19*12*0.8 ≈ 182.4)
                blurb: "For growing teams who need reliable scale.",
                cta: { label: "Upgrade to Pro" },
                popular: true,
                features: [
                    "10,000 emails / month",
                    "3,000 OCR pages / month",
                    "Custom fields & saved lists",
                    "Email templates & snippets",
                    "Priority OCR (faster worker)",
                ],
                limits: ["Email support"],
                negatives: [],
            },
            {
                id: "business",
                name: "Business",
                monthly: 49,
                yearly: 470, // ~20% off (49*12*0.8 ≈ 470.4)
                blurb: "For serious volume and advanced control.",
                cta: { label: "Contact Sales" },
                features: [
                    "100,000 emails / month",
                    "15,000 OCR pages / month",
                    "Team seats & roles",
                    "Custom domain sending",
                    "Webhooks & export logs",
                    "Priority support",
                ],
                limits: [],
                negatives: [],
            },
        ],
        []
    );

    function onCTA(plan) {
        if (plan.cta.to) return; // Link handles navigation
        if (plan.id === "pro") {
            toast.info("Pro checkout is not wired in this demo. Replace this handler with your payment flow.");
        } else if (plan.id === "business") {
            toast.success("Thanks! We’ll reach out within 1 business day.");
        }
    }

    return (
        <main className="container py-12">
            {/* Header */}
            <div className="mx-auto max-w-3xl text-center">
                <Badge variant="secondary">Pricing</Badge>
                <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">
                    Simple, fair pricing for every stage
                </h1>
                <p className="mt-4 text-slate-600">
                    Start free. Scale with Pro or Business when you need advanced features and higher limits.
                </p>

                {/* Billing toggle */}
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border bg-white p-1 shadow-sm">
                    <ToggleButton active={!annual} onClick={() => setAnnual(false)}>
                        Monthly
                    </ToggleButton>
                    <ToggleButton active={annual} onClick={() => setAnnual(true)}>
                        Yearly <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] text-emerald-700">Save 20%</span>
                    </ToggleButton>
                </div>
            </div>

            {/* Plans */}
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((p) => (
                    <PlanCard key={p.id} plan={p} annual={annual} onCTA={() => onCTA(p)} />
                ))}
            </div>

            {/* FAQ */}
            <section className="mx-auto mt-16 max-w-4xl">
                <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
                <div className="mt-6 grid gap-4">
                    <FAQ q="Can I use the Free plan in production?">
                        Yes. The Free plan is great for small lists and quick OCR tasks.
                    </FAQ>
                    <FAQ q="Do you charge per contact?">
                        No. We bill by usage (emails sent / OCR pages). Import as many contacts as you want.
                    </FAQ>
                    <FAQ q="What happens if I exceed my plan limits?">
                        We’ll pause sends/extractions and notify you to upgrade or wait for the next cycle.
                    </FAQ>
                    <FAQ q="Can I cancel anytime?">
                        Absolutely. Plans are month-to-month. Yearly is prepaid with bigger savings.
                    </FAQ>
                </div>
            </section>

            {/* CTA band */}
            <section className="mt-16 rounded-2xl border bg-gradient-to-r from-violet-50 to-cyan-50 p-6 text-center">
                <h3 className="text-xl font-semibold">Ready to get started?</h3>
                <p className="mt-1 text-slate-600">Create your first campaign in minutes.</p>
                <div className="mt-4 flex justify-center gap-3">
                    <Link to="/tools/bulk-email"><Button size="lg">Start Free</Button></Link>
                    <Link to="/tools/ocr"><Button variant="outline" size="lg">Try OCR</Button></Link>
                </div>
            </section>
        </main>
    );
}

function ToggleButton({ active, children, ...props }) {
    return (
        <button
            className={
                "rounded-lg px-4 py-2 text-sm transition " +
                (active ? "bg-violet-600 text-white" : "text-slate-600 hover:bg-slate-100")
            }
            {...props}
        >
            {children}
        </button>
    );
}

function PlanCard({ plan, annual, onCTA }) {
    const price = annual ? plan.yearly : plan.monthly;
    const sub = annual
        ? plan.yearly === 0
            ? "$0"
            : `$${plan.yearly} / yr`
        : plan.monthly === 0
            ? "$0"
            : `$${plan.monthly} / mo`;

    const perMonthWhenYearly =
        annual && plan.yearly > 0 ? Math.round((plan.yearly / 12) * 100) / 100 : null;

    const CTA = plan.cta.to ? (
        <Link to={plan.cta.to}>
            <Button className="w-full">{plan.cta.label}</Button>
        </Link>
    ) : (
        <Button onClick={onCTA} className="w-full">
            {plan.cta.label}
        </Button>
    );

    return (
        <div className={"relative rounded-2xl border p-6 " + (plan.popular ? "ring-2 ring-violet-500" : "")}>
            {plan.popular && (
                <div className="absolute -top-3 left-6">
                    <span className="rounded-full bg-violet-600 px-2.5 py-1 text-xs font-medium text-white shadow">
                        Most popular
                    </span>
                </div>
            )}

            <div className="mb-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{plan.blurb}</p>
            </div>

            <div className="mb-5">
                <div className="flex items-end gap-2">
                    <span className="text-4xl font-bold">{sub.startsWith("$") ? sub.split(" ")[0] : sub}</span>
                    <span className="text-slate-500">{sub.startsWith("$") ? sub.split(" ").slice(1).join(" ") : ""}</span>
                </div>
                {perMonthWhenYearly && (
                    <div className="text-xs text-slate-500">≈ ${perMonthWhenYearly}/mo billed yearly</div>
                )}
            </div>

            <div className="space-y-2">
                {plan.features.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                        <Check size={16} className="mt-0.5 text-emerald-600" />
                        <span>{f}</span>
                    </div>
                ))}
                {plan.limits.map((f, i) => (
                    <div key={`l-${i}`} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check size={16} className="mt-0.5 text-slate-400" />
                        <span>{f}</span>
                    </div>
                ))}
                {plan.negatives.map((f, i) => (
                    <div key={`n-${i}`} className="flex items-start gap-2 text-sm text-slate-500 line-through">
                        <X size={16} className="mt-0.5 text-slate-300" />
                        <span>{f}</span>
                    </div>
                ))}
            </div>

            <div className="mt-6">{CTA}</div>

            {plan.id === "free" && (
                <p className="mt-3 text-xs text-slate-500">No credit card required.</p>
            )}
        </div>
    );
}

function FAQ({ q, children }) {
    return (
        <details className="rounded-lg border p-4 open:shadow-sm">
            <summary className="cursor-pointer select-none text-sm font-medium text-slate-800">
                {q}
            </summary>
            <div className="mt-2 text-sm text-slate-600">{children}</div>
        </details>
    );
}