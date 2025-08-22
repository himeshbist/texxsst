export default function Logo({ size = 24 }) {
    return (
        <img
            src="/logo.svg"
            width={size}
            height={size}
            alt="PulseReach logo"
            className="block"
        />
    );
}