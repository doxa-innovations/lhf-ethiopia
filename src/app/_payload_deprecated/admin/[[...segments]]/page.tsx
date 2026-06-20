/* THIS FILE IS A NEXT 16 ROUTE INTEGRATION FOR PAYLOAD 3.x.
 * Generated per the Payload Next.js mounting pattern — do not edit by hand
 * unless you know what you're doing. The shape (a catch-all route that
 * forwards to Payload's RootPage component) is required by Payload's admin
 * routing to work inside a route group of an existing Next app.
 */
import type { Metadata } from "next";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import { importMap } from "../importMap.js";
import config from "@payload-config";

type Args = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, params, searchParams, importMap });

export default Page;
