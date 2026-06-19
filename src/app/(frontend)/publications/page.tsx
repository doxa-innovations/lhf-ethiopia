import type { Metadata } from "next";
import { PublicationsPageClient } from "@/components/pages/PublicationsPageClient";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Browse Lutheran books translated and published for Ethiopia in Amharic, Afaan Oromoo, Tigrinya, Somali, Sidaama, and Wolaytta.",
};

export default function PublicationsPage() {
  return <PublicationsPageClient />;
}
