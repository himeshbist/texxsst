// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Input from "../ui/input";
import Button from "../ui/button";
import { Github, Twitter, Linkedin, Mail, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { toast } from "sonner";

export default function Footer() {
    function subscribe(e) {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = String(form.get("email") || "").trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Enter a valid email");
            return;
        }
        toast.success("Subscribed! (demo)");
        e.currentTarget.reset();
    }

    const year = new Date().getFullYear();

    return (
        <footer className="relative border-t bg-white">
            {/* Accent gradient strip */}
            <div className="h-[2px] w-full bg-gradient-to-r from-violet-500/50 via-cyan-500/50 to-violet-500/50" />

            {/* MOBILE — compact accordion layout */}
            <div className="container md:hidden py-6">
                {/* Brand + tagline */}
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <Logo size={20} />
                        <span className="font-semibold">PulseReach</span>
                    </Link>
                </div>
                <p className="mt-2 text-sm text-slate-600">
                    Bulk email + OCR in one lightweight, responsive app.
                </p>

                {/* Tiny badges */}
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <MiniPill icon={<Sparkles size={12} />} text="Fast" />
                    <MiniPill icon={<ShieldCheck size={12} />} text="Secure" />
                    <MiniPill icon={<Zap size={12} />} text="No bloat" />
                </div>

                {/* Quick subscribe (single line) */}
                

                {/* Social row */}
                {/* <div className="mt-4 flex items-center gap-3">
                    <IconBtn href="https://twitter.com" label="Twitter"><Twitter size={18} /></IconBtn>
                    <IconBtn href="https://github.com" label="GitHub"><Github size={18} /></IconBtn>
                    <IconBtn href="https://linkedin.com" label="LinkedIn"><Linkedin size={18} /></IconBtn>
                    <a href="mailto:hello@example.com" className="ml-auto flex items-center gap-1 text-slate-600 hover:text-slate-900">
                        <Mail size={16} /> Contact
                    </a>
                </div> */}

                {/* Collapsible sections */}
                <div className="mt-4 space-y-2">
                    <Disclosure title="Product">
                        <FooterLink to="/tools/bulk-email">Bulk Email</FooterLink>
                        <FooterLink to="/tools/ocr">OCR Image → Text</FooterLink>
                        <FooterLink to="/tools/bulk-sms">Bulk SMS</FooterLink>
                        <FooterLink to="/pricing">Pricing</FooterLink>
                    </Disclosure>

                    <Disclosure title="Resources">
                        <FooterLink to="/docs">Docs</FooterLink>
                        <FooterLink to="/">Deliverability Guide</FooterLink>
                        <FooterLink to="/">OCR Tips</FooterLink>
                        <FooterLink to="/">Changelog</FooterLink>
                    </Disclosure>

                    <Disclosure title="Company">
                        <div className="flex flex-row items-center gap-4">
                            <FooterLink to="https://twitter.com"><Twitter size={18} /></FooterLink>
                            <FooterLink to="https://github.com"><Github size={18} /></FooterLink>
                            <FooterLink to="https://linkedin.com"><Linkedin size={18} /></FooterLink>
                            <FooterLink to="mailto:hello@example.com"><Mail size={18} /></FooterLink>
                        </div>
                    </Disclosure>
                </div>

                {/* Legal */}
                <div className="mt-6 border-t pt-3 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-3">
                        <div>© {year} PulseReach</div>
                        <span className="mx-1 h-3 w-px bg-slate-200" />
                        <Link to="/" className="hover:text-slate-700">Privacy</Link>
                        <Link to="/" className="hover:text-slate-700">Terms</Link>
                        <Link to="/" className="hover:text-slate-700">Security</Link>
                    </div>
                </div>
            </div>

            {/* DESKTOP — tidy 4-column layout */}
            <div className="container hidden md:block py-10">
                <div className="grid gap-10 md:grid-cols-4">
                    {/* Brand + subscribe */}
                    <div>
                        <Link to="/" className="flex items-center gap-2">
                            <Logo size={22} />
                            <span className="font-semibold">PulseReach</span>
                        </Link>
                        <p className="mt-3 text-sm text-slate-600">
                            Bulk email + OCR in one lightweight, responsive app.
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                            <MiniPill icon={<Sparkles size={12} />} text="Fast" />
                            <MiniPill icon={<ShieldCheck size={12} />} text="Secure" />
                            <MiniPill icon={<Zap size={12} />} text="No bloat" />
                        </div>
                        
                        {/* <div className="mt-4 flex items-center gap-2">
                            <IconBtn href="https://twitter.com" label="Twitter"><Twitter size={18} /></IconBtn>
                            <IconBtn href="https://github.com" label="GitHub"><Github size={18} /></IconBtn>
                            <IconBtn href="https://linkedin.com" label="LinkedIn"><Linkedin size={18} /></IconBtn>
                            <a href="mailto:hello@example.com" className="flex items-center gap-1 text-slate-600 hover:text-slate-900">
                                <Mail size={16} /> Contact
                            </a>
                        </div> */}
                    </div>

                    <DesktopCol title="Product">
                        <FooterLink to="/tools/bulk-email">Bulk Email</FooterLink>
                        <FooterLink to="/tools/ocr">OCR Image → Text</FooterLink>
                        <FooterLink to="/tools/bulk-sms">Bulk SMS</FooterLink>
                        <FooterLink to="/pricing">Pricing</FooterLink>
                    </DesktopCol>

                    <DesktopCol title="Resources">
                        <FooterLink to="/docs">Docs</FooterLink>
                        <FooterLink to="/">Deliverability Guide</FooterLink>
                        <FooterLink to="/">OCR Tips</FooterLink>
                        <FooterLink to="/">Changelog</FooterLink>
                    </DesktopCol>

                    <DesktopCol title="Social">
                        <div className="flex flex-row items-center gap-4 ">
                            <FooterLink to="https://twitter.com"><Twitter size={18} /></FooterLink>
                            <FooterLink to="https://github.com"><Github size={18} /></FooterLink>
                            <FooterLink to="https://linkedin.com"><Linkedin size={18} /></FooterLink>
                            <FooterLink to="mailto:hello@example.com"><Mail size={18} /></FooterLink>
                        </div>
                    </DesktopCol>
                </div>

                <div className="mt-8 border-t pt-4 text-sm text-slate-500">
                    <div className="flex items-center justify-between">
                        <div>© {year} PulseReach • Built for small businesses and power users</div>
                        <div className="flex items-center gap-4">
                            <Link to="/" className="hover:text-slate-700">Privacy</Link>
                            <Link to="/" className="hover:text-slate-700">Terms</Link>
                            <Link to="/" className="hover:text-slate-700">Security</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* Helpers */
function MiniPill({ icon, text }) {
    return (
        <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700">
            {icon}{text}
        </span>
    );
}

function IconBtn({ href, label, children }) {
    return (
        <a
            className="rounded-md border p-1.5 text-slate-700 hover:bg-slate-50"
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
        >
            {children}
        </a>
    );
}

function FooterLink({ to, children }) {
    return (
        <li>
            <Link to={to} className="hover:text-slate-900">{children}</Link>
        </li>
    );
}

/* Mobile collapsible */
function Disclosure({ title, children }) {
    return (
        <details className="rounded-lg border p-3">
            <summary className="cursor-pointer select-none text-sm font-medium text-slate-800">
                {title}
            </summary>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">{children}</ul>
        </details>
    );
}

/* Desktop column */
function DesktopCol({ title, children }) {
    return (
        <div>
            <div className="text-sm font-semibold">{title}</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">{children}</ul>
        </div>
    );
}