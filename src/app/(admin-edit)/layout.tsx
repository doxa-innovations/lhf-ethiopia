import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import "../(frontend)/globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ContentProvider } from "@/components/providers/ContentProvider";
import { getAllLocalesContent } from "@/lib/content/get-content";
import { PublishedElementsProvider } from "@/components/cms/PublishedElementsProvider";
import { getPublishedElements } from "@/lib/cms/get-published-elements";
import { ToastProvider } from "@/components/cms/Toast";
import { ConfirmDialogProvider } from "@/components/cms/ConfirmDialog";
import { adminEnabled } from "@/lib/admin-flag";

/*
 * Sibling root layout for /admin/edit/*. Mirrors the public (frontend) layout
 * — fonts, providers, Navbar, Footer — so the editor is a 1:1 view of the
 * live site. The route-level page wraps content in <EditorProvider> +
 * <EditorToolbar>, which is why this layout intentionally omits both.
 */
export default async function AdminEditLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (!adminEnabled) notFound();
  const [content, published] = await Promise.all([
    getAllLocalesContent(),
    getPublishedElements(),
  ]);
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
            --font-inter: "Inter", system-ui, -apple-system, "Segoe UI", sans-serif;
            --font-garamond: "EB Garamond", "Cormorant", "Times New Roman", serif;
          }
        `}</style>
      </head>
      <body>
        <LanguageProvider>
          <PublishedElementsProvider value={published}>
            <ContentProvider value={content}>
              <MotionProvider>
                <ToastProvider>
                  <ConfirmDialogProvider>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                  </ConfirmDialogProvider>
                </ToastProvider>
              </MotionProvider>
            </ContentProvider>
          </PublishedElementsProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
