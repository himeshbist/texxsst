// src/components/layout/Navbar.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "../ui/button";
import Badge from "../ui/badge";
import Logo from "./Logo";
import { Mail, ScanText, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
    const [open, setOpen] = useState(false); // mobile drawer
    return (
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
            <div className="container h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <Logo size={24} />
                    <span className="font-semibold">PulseReach</span>
                </Link>

                <nav className="hidden md:flex items-center gap-6">
                    <NavLink to="/" className="text-sm text-slate-600 hover:text-slate-900">
                        Home
                    </NavLink>

                    <ToolsDropdown />

                    <NavLink to="/pricing" className="text-sm text-slate-600 hover:text-slate-900">
                        Pricing
                    </NavLink>
                    <NavLink to="/docs" className="text-sm text-slate-600 hover:text-slate-900">
                        Docs
                    </NavLink>
                </nav>

                <div className="hidden md:block">
                    <Link to="/tools/bulk-email">
                        <Button>Start Free</Button>
                    </Link>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden focus-ring rounded-md p-2"
                    onClick={() => setOpen((s) => !s)}
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M4 6h16M4 12h16M4 18h16" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {/* Mobile drawer */}
            {open && (
                <div className="md:hidden border-t bg-white">
                    <div className="container py-3 flex flex-col gap-2">
                        <Link to="/" onClick={() => setOpen(false)} className="py-2 text-slate-700">Home</Link>
                        <div className="py-2">
                            <div className="text-slate-500 text-xs uppercase mb-2">Tools</div>
                            <div className="flex flex-col gap-1">
                                <MobileItem to="/tools/bulk-email" label="Bulk Email" badge="Live" icon={<Mail size={16} />} onSelect={() => setOpen(false)} />
                                <MobileItem to="/tools/ocr" label="OCR" badge="Live" icon={<ScanText size={16} />} onSelect={() => setOpen(false)} />
                                <MobileItem to="/tools/bulk-sms" label="Bulk SMS" badge="Coming Soon" icon={<Phone size={16} />} secondary onSelect={() => setOpen(false)} />
                            </div>
                        </div>
                        <Link to="/tools/bulk-email" onClick={() => setOpen(false)}>
                            <Button className="w-full">Start Free</Button>
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

function MobileItem({ to, label, badge, icon, secondary, onSelect }) {
    return (
        <Link to={to} onClick={onSelect} className="flex items-center justify-between rounded-md p-2 hover:bg-slate-50">
            <span className="flex items-center gap-2">{icon} {label}</span>
            <Badge variant={secondary ? "secondary" : "default"}>{badge}</Badge>
        </Link>
    );
}

/**
 * ToolsDropdown
 * - Opens on hover with small open delay, closes with small leave delay.
 * - Stays open while moving the mouse into the card (no flicker).
 * - Closes immediately once a link is selected.
 * - Also opens on focus (keyboard) and closes on route change.
 */
function ToolsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const closeTimer = useRef(null);
    const openTimer = useRef(null);
    const location = useLocation();

    useEffect(() => {
        // Close on route change
        setIsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        return () => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            if (openTimer.current) clearTimeout(openTimer.current);
        };
    }, []);

    function openWithDelay() {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        if (openTimer.current) clearTimeout(openTimer.current);
        openTimer.current = setTimeout(() => setIsOpen(true), 40); // tiny intent delay
    }

    function closeWithDelay() {
        if (openTimer.current) clearTimeout(openTimer.current);
        if (closeTimer.current) clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => setIsOpen(false), 80); // leave grace period
    }

    function closeNow() {
        if (openTimer.current) clearTimeout(openTimer.current);
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setIsOpen(false);
    }

    return (
        <div
            className="relative"
            onMouseEnter={openWithDelay}
            onMouseLeave={closeWithDelay}
        >
            <button
                className="text-sm text-slate-600 hover:text-slate-900 focus-ring rounded-md px-2 py-1"
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onFocus={openWithDelay}
                onBlur={closeWithDelay}
            >
                Tools
            </button>

            {/* Panel */}
            <div
                role="menu"
                aria-label="Tools"
                className={`absolute left-0 top-full mt-2 w-[360px] rounded-md border bg-white p-2 shadow-lg transition
        ${isOpen ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"}`}
                onMouseEnter={openWithDelay}
                onMouseLeave={closeWithDelay}
            >
                <MenuItem to="/tools/bulk-email" icon={<Mail size={16} />} label="Bulk Email" badge={<Badge>Live</Badge>} onSelect={closeNow} />
                <MenuItem to="/tools/ocr" icon={<ScanText size={16} />} label="OCR Image → Text" badge={<Badge>Live</Badge>} onSelect={closeNow} />
                <MenuItem to="/tools/bulk-sms" icon={<Phone size={16} />} label="Bulk SMS" badge={<Badge variant="secondary">Coming Soon</Badge>} onSelect={closeNow} />
            </div>
        </div>
    );
}

function MenuItem({ to, icon, label, badge, onSelect }) {
    return (
        <Link
            to={to}
            role="menuitem"
            onClick={onSelect}
            className="flex items-center justify-between rounded-md p-3 hover:bg-slate-50 focus:bg-slate-50 focus-ring"
        >
            <span className="flex items-center gap-2">{icon} {label}</span>
            {badge}
        </Link>
    );
}