/* Small icon shown in the collapsed admin sidebar. */
export default function Icon() {
  return (
    <span
      aria-hidden
      style={{
        width: 28,
        height: 28,
        display: "inline-block",
        backgroundImage: 'url("/lhflogo.png")',
        backgroundSize: "auto 100%",
        backgroundPosition: "left center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
