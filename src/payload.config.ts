import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "@/collections/Users";
import { Media } from "@/collections/Media";
import { News } from "@/collections/News";
import { Projects } from "@/collections/Projects";
import { Events } from "@/collections/Events";
import { Publications } from "@/collections/Publications";
import { Values } from "@/collections/Values";
import { Stories } from "@/collections/Stories";
import { PodcastEpisodes } from "@/collections/PodcastEpisodes";
import { Languages } from "@/collections/Languages";
import { SiteSettings } from "@/globals/SiteSettings";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  secret: process.env.PAYLOAD_SECRET || "dev-only-secret-change-in-production",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — LHF Ethiopia",
    },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    News,
    Projects,
    Events,
    Publications,
    Values,
    Stories,
    PodcastEpisodes,
    Languages,
  ],
  globals: [SiteSettings],
  localization: {
    locales: [
      { code: "en", label: "English" },
      { code: "am", label: "አማርኛ" },
      { code: "om", label: "Afaan Oromoo" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI! },
  }),
  sharp,
  plugins: [
    // Only enable R2 storage in prod when keys are present. In dev, the
    // local file adapter (public/uploads) is used automatically.
    ...(process.env.R2_BUCKET && process.env.R2_ACCESS_KEY_ID
      ? [
          s3Storage({
            collections: { media: { prefix: "uploads" } },
            bucket: process.env.R2_BUCKET!,
            config: {
              endpoint: process.env.R2_ENDPOINT,
              credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID!,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
              },
              region: process.env.R2_REGION || "auto",
              forcePathStyle: true,
            },
          }),
        ]
      : []),
  ],
});
