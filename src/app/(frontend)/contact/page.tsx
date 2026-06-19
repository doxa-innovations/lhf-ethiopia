import type { Metadata } from "next";
import { ContactPageClient } from "@/components/pages/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact LHF Ethiopia: request books for your congregation, propose a new translation, or partner with us.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
