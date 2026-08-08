import "server-only";
import type { PodcastEpisodeLocale } from "@/lib/i18n/content-types";
import { PODCAST_EPISODES } from "@/lib/content";

const CHANNEL_ID = "UCdYXcvhpvJ0I5yqD82rqogg";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const FEED_REVALIDATE_SECONDS = 3600;
const DURATION_REVALIDATE_SECONDS = 86_400;

const GOOGLEBOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

const durationCache = new Map<string, number>();

const FALLBACK: PodcastEpisodeLocale[] = PODCAST_EPISODES.map((ep) => ({
  slug: ep.slug,
  youtubeId: ep.youtubeId,
  number: ep.number,
  title: ep.title,
  summary: ep.summary,
  language: ep.language,
  date: ep.date,
  durationMin: ep.durationMin,
  topic: ep.topic,
  guest: ep.guest,
}));

type RawEntry = {
  videoId: string;
  title: string;
  published: string;
  description: string;
};

function extractEntries(xml: string): RawEntry[] {
  const entries: RawEntry[] = [];
  const entryRe = /<entry>([\s\S]*?)<\/entry>/g;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(xml))) {
    const block = m[1];
    const videoId = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(block)?.[1];
    const title = /<title>([\s\S]*?)<\/title>/.exec(block)?.[1];
    const published = /<published>([^<]+)<\/published>/.exec(block)?.[1];
    const description =
      /<media:description>([\s\S]*?)<\/media:description>/.exec(block)?.[1] ?? "";
    if (videoId && title && published) {
      entries.push({
        videoId,
        title: decodeXml(title.trim()),
        published,
        description: decodeXml(description.trim()),
      });
    }
  }
  return entries;
}

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)));
}

function parseEpisodeNumber(title: string): number {
  const m = /episode\s*(\d+)/i.exec(title) ?? /\bep\.?\s*(\d+)/i.exec(title);
  return m ? Number(m[1]) : 0;
}

function inferTopic(title: string): string {
  const t = title.toLowerCase();
  if (/(catechism|catechis)/.test(t)) return "Catechism";
  if (/(hymn|music|choir|song)/.test(t)) return "Music";
  if (/(bible|scripture|1\s*tim|romans|genesis|psalm|verse)/.test(t))
    return "Bible Study";
  return "Doctrine";
}

function inferLanguage(title: string, description: string): string {
  const hasEthiopicTitle = /[ሀ-፿]/.test(title);
  const hasEthiopicBody = /[ሀ-፿]/.test(description);
  const looksLikeShort = /#short|#shorts/i.test(title);
  if (looksLikeShort) return "Amharic";
  if (hasEthiopicTitle || hasEthiopicBody) return "Amharic / English";
  return "English";
}

function summarize(description: string): string {
  const cleaned = description.replace(/\s+/g, " ").trim();
  if (cleaned.length <= 280) return cleaned;
  const clipped = cleaned.slice(0, 280);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 200 ? lastSpace : 280).trim()}…`;
}

async function scrapeDuration(videoId: string): Promise<number> {
  const cached = durationCache.get(videoId);
  if (cached !== undefined) return cached;
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { "User-Agent": GOOGLEBOT_UA },
      next: { revalidate: DURATION_REVALIDATE_SECONDS },
    });
    if (!res.ok) return 0;
    const html = await res.text();
    const match = /"lengthSeconds":"(\d+)"/.exec(html);
    if (!match) return 0;
    const minutes = Math.round(Number(match[1]) / 60);
    durationCache.set(videoId, minutes);
    return minutes;
  } catch {
    return 0;
  }
}

export async function fetchYouTubeEpisodes(): Promise<PodcastEpisodeLocale[]> {
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: FEED_REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      console.warn(`[podcast-feed] RSS ${res.status}; using fallback snapshot.`);
      return FALLBACK;
    }
    const xml = await res.text();
    const rawEntries = extractEntries(xml);
    if (rawEntries.length === 0) {
      console.warn("[podcast-feed] RSS parsed 0 entries; using fallback.");
      return FALLBACK;
    }

    const enriched = await Promise.all(
      rawEntries.map(async (entry, idx) => {
        const durationMin = await scrapeDuration(entry.videoId);
        const parsedNumber = parseEpisodeNumber(entry.title);
        return {
          slug: entry.videoId,
          youtubeId: entry.videoId,
          number: parsedNumber || Math.max(rawEntries.length - idx, 0),
          title: entry.title,
          summary: summarize(entry.description),
          language: inferLanguage(entry.title, entry.description),
          date: entry.published.slice(0, 10),
          durationMin,
          topic: inferTopic(entry.title),
          guest: "LHF Ethiopia",
        } satisfies PodcastEpisodeLocale;
      }),
    );

    return enriched;
  } catch (err) {
    const cause = err instanceof Error ? err.message : String(err);
    console.warn(`[podcast-feed] fetch failed (${cause}); using fallback.`);
    return FALLBACK;
  }
}
