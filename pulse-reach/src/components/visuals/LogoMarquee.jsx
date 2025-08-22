// src/components/visuals/LogoMarquee.jsx
export default function LogoMarquee({ speed = 26, forceMotion = true }) {
  const brands = [
    { name: "Acme Labs", id: "acme" },
    { name: "Deskify", id: "deskify" },
    { name: "Northwind", id: "northwind" },
    { name: "Octave", id: "octave" },
    { name: "CloudBear", id: "cloudbear" },
    { name: "Finch", id: "finch" },
    { name: "ParseKit", id: "parsekit" },
    { name: "Voyage", id: "voyage" },
    { name: "Stackry", id: "stackry" },
  ];

  const loop = [...brands, ...brands]; // seamless wrap

  return (
    <section className="container py-8">
      <div className="text-xs uppercase tracking-wide text-slate-500">Trusted by teams at</div>

      <div className="marquee mt-3 border bg-white/70 px-4 py-3 backdrop-blur">
        <ul
          className="marquee-track"
          // Force the animation inline so it always applies
          style={{ animation: `marquee-x ${speed}s linear infinite` }}
          data-force={forceMotion ? "1" : "0"}
        >
          {loop.map((b, i) => (
            <li
              key={`${b.id}-${i}`}
              className="flex items-center gap-2 opacity-80 hover:opacity-100 transition"
            >
              <BrandGlyph id={b.id} />
              <span className="text-sm text-slate-700">{b.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BrandGlyph({ id }) {
  const c = "block h-8 w-8";
  switch (id) {
    case "acme":
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#06B6D4" /></linearGradient></defs>
          <path d="M4 20 L16 4 L28 20 L16 28 Z" fill="url(#g1)" opacity="0.15" />
          <path d="M8 18 L16 8 L24 18 L16 24 Z" fill="url(#g1)" />
        </svg>
      );
    case "deskify":
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <circle cx="16" cy="16" r="10" fill="#EEF2FF" />
          <path d="M10 18h12M10 14h12" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "northwind":
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <path d="M4 20c6-8 18-8 24 0" stroke="#06B6D4" strokeWidth="2.5" fill="none" />
          <path d="M6 22c4-5 16-5 20 0" stroke="#7C3AED" strokeWidth="2.5" fill="none" />
        </svg>
      );
    case "octave":
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <circle cx="11" cy="16" r="6" fill="#C7D2FE" />
          <circle cx="21" cy="16" r="6" fill="#A5F3FC" />
          <circle cx="16" cy="16" r="5" fill="#fff" />
        </svg>
      );
    case "cloudbear":
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <path d="M10 18a4 4 0 117 0h1a4 4 0 110 8H12a5 5 0 01-2-8z" fill="#E0F2FE" />
          <circle cx="11" cy="14" r="3" fill="#7C3AED" opacity="0.2" />
        </svg>
      );
    case "finch":
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <path d="M6 22l10-12 10 12-10-6z" fill="#A7F3D0" />
          <circle cx="16" cy="16" r="3" fill="#059669" />
        </svg>
      );
    case "parsekit":
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <rect x="6" y="8" width="20" height="16" rx="3" fill="#F1F5F9" />
          <path d="M9 12h10M9 16h7" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 20l4 3-4 3" stroke="#7C3AED" strokeWidth="2" fill="none" />
        </svg>
      );
    case "voyage":
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <path d="M6 22h20l-4 4H10z" fill="#DBEAFE" />
          <path d="M8 18l8-8 8 8" stroke="#2563EB" strokeWidth="2.5" fill="none" />
        </svg>
      );
    case "stackry":
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <rect x="6" y="8" width="20" height="4" rx="2" fill="#C4B5FD" />
          <rect x="6" y="14" width="20" height="4" rx="2" fill="#A78BFA" />
          <rect x="6" y="20" width="20" height="4" rx="2" fill="#7C3AED" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" className={c} aria-hidden="true">
          <rect x="6" y="6" width="20" height="20" rx="6" fill="#F1F5F9" />
        </svg>
      );
  }
}