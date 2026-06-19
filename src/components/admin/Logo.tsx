/* Custom Payload admin logo — uses the existing public/lhflogo.png so the
 * admin matches the public site visually. */
import Image from "next/image";

export default function Logo() {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 4px",
      }}
    >
      <span
        aria-hidden
        style={{
          width: 36,
          height: 36,
          display: "inline-block",
          backgroundImage: 'url("/lhflogo.png")',
          backgroundSize: "auto 100%",
          backgroundPosition: "left center",
          backgroundRepeat: "no-repeat",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "EB Garamond, Cormorant, Times New Roman, serif",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: "var(--theme-elevation-900, #121620)",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        LHF Ethiopia
      </span>
    </div>
  );
}
// Suppress unused warning on Image import in case we swap to next/image later.
void Image;
