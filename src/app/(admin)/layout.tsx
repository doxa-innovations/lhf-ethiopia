/**
 * Admin shell layout — sibling root layout to (frontend) and (payload).
 * Renders its own <html>/<body>, the brand sidebar, and the top bar.
 *
 * Sign-in page (/admin/login) bypasses this layout via a route group
 * exception ((admin)/login/page.tsx wraps itself in a minimal layout).
 */
import "../(frontend)/globals.css";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import { ToastProvider } from "@/components/cms/Toast";
import { ConfirmDialogProvider } from "@/components/cms/ConfirmDialog";
import { adminEnabled } from "@/lib/admin-flag";

export const metadata = {
  title: { default: "LHF Ethiopia · Admin", template: "%s · Admin · LHF Ethiopia" },
  description: "Edit every page of the LHF Ethiopia site in English, አማርኛ and Afaan Oromoo.",
  robots: { index: false, follow: false },
};

const NAV_GROUPS = [
  {
    label: "Pages",
    items: [
      { href: "/admin/edit/home", label: "Home" },
      { href: "/admin/edit/about", label: "About" },
      { href: "/admin/edit/publications", label: "Publications" },
      { href: "/admin/edit/podcast", label: "Podcast" },
      { href: "/admin/edit/donate", label: "Donate" },
      { href: "/admin/edit/contact", label: "Contact" },
      { href: "/admin/edit/nav", label: "Navbar copy" },
      { href: "/admin/edit/footer", label: "Footer copy" },
    ],
  },
  {
    label: "Collections",
    items: [
      { href: "/admin/edit/news", label: "News articles" },
      { href: "/admin/edit/projects", label: "Projects" },
      { href: "/admin/edit/events", label: "Events" },
      { href: "/admin/edit/stories", label: "Stories" },
      { href: "/admin/edit/values", label: "Values" },
      { href: "/admin/edit/podcast-episodes", label: "Podcast episodes" },
      { href: "/admin/edit/languages", label: "Languages" },
    ],
  },
  {
    label: "Site",
    items: [
      { href: "/admin/edit/site-settings", label: "Settings" },
      { href: "/admin/media", label: "Media library" },
      { href: "/admin/users", label: "Users" },
    ],
  },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  if (!adminEnabled) notFound();
  const session = await auth();
  const signedIn = Boolean(session?.user);

  // Login page renders without the sidebar shell — middleware ensures
  // unauthenticated users only ever land on /admin/login here.
  if (!signedIn) {
    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          />
        </head>
        <body
          style={{
            margin: 0,
            minHeight: "100vh",
            background:
              "linear-gradient(135deg, rgb(var(--bg-soft, 248 246 242)) 0%, rgb(var(--surface-2, 244 240 234)) 100%)",
            color: "rgb(var(--ink, 18 22 32))",
            fontFamily: "Inter, system-ui, sans-serif",
            fontSize: 14,
            display: "grid",
            placeItems: "center",
            padding: 20,
          }}
        >
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
        />
        <style>{`
          :root {
            --font-inter: "Inter", system-ui, sans-serif;
            --font-garamond: "EB Garamond", "Cormorant", serif;
          }
        `}</style>
      </head>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "rgb(var(--bg-soft, 248 246 242))",
          color: "rgb(var(--ink, 18 22 32))",
          fontFamily: "var(--font-inter)",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "256px 1fr",
            minHeight: "100vh",
          }}
        >
          {/* SIDEBAR */}
          <aside
            style={{
              background: "white",
              borderRight: "1px solid rgb(var(--border, 226 222 215))",
              padding: "20px 0",
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
              position: "sticky",
              top: 0,
            }}
          >
            <Link
              href="/admin"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0 18px 18px",
                borderBottom: "1px solid rgb(var(--border, 226 222 215))",
                marginBottom: 14,
                color: "rgb(var(--ink, 18 22 32))",
                textDecoration: "none",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 30,
                  height: 30,
                  flexShrink: 0,
                  backgroundImage: 'url("/lhflogo.png")',
                  backgroundSize: "auto 100%",
                  backgroundPosition: "left center",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
                <span
                  style={{
                    fontFamily: "var(--font-garamond)",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "rgb(var(--navy, 30 42 71))",
                  }}
                >
                  LHF Ethiopia
                </span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgb(var(--ink-faint, 138 145 158))",
                    marginTop: 2,
                  }}
                >
                  Admin
                </span>
              </span>
            </Link>

            <nav style={{ flex: 1, overflowY: "auto", paddingInline: 8 }}>
              {NAV_GROUPS.map((group) => (
                <div key={group.label} style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      padding: "10px 12px 6px",
                      fontSize: 10.5,
                      fontWeight: 700,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgb(var(--ink-faint, 138 145 158))",
                    }}
                  >
                    {group.label}
                  </div>
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{
                        display: "block",
                        padding: "8px 12px",
                        borderRadius: 8,
                        color: "rgb(var(--ink, 18 22 32))",
                        textDecoration: "none",
                        fontWeight: 500,
                        fontSize: 13.5,
                        transition: "background 140ms ease",
                      }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>

            <div
              style={{
                borderTop: "1px solid rgb(var(--border, 226 222 215))",
                padding: "14px 18px",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 999,
                  background: "rgb(var(--brand, 159 31 42))",
                  color: "white",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                {(session?.user?.name ?? "?").slice(0, 1).toUpperCase()}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "rgb(var(--ink))" }}>
                  {session?.user?.name ?? "Editor"}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgb(var(--ink-faint, 138 145 158))",
                  }}
                >
                  {(session?.user as { role?: string } | undefined)?.role ?? ""}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end" }}>
                <Link
                  href="/admin/account"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgb(var(--ink-faint, 138 145 158))",
                    textDecoration: "none",
                  }}
                >
                  Account
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/admin/login" });
                  }}
                >
                  <button
                    type="submit"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: "rgb(var(--ink-faint, 138 145 158))",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                      padding: 0,
                    }}
                  >
                    Sign out
                  </button>
                </form>
              </div>
            </div>
          </aside>

          {/* MAIN */}
          <main style={{ minWidth: 0 }}>
            <ToastProvider>
              <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
            </ToastProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
