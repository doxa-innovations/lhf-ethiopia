import { getPayload } from "payload";
import config from "../src/payload.config";

console.log("starting connect test");
console.log("DATABASE_URI?", Boolean(process.env.DATABASE_URI));
console.log("PAYLOAD_SECRET?", Boolean(process.env.PAYLOAD_SECRET));

const start = Date.now();
console.log("calling getPayload…");

try {
  const payload = await getPayload({ config });
  console.log(`got payload in ${Date.now() - start}ms`);
  console.log("collections:", Object.keys(payload.collections).join(", "));
  process.exit(0);
} catch (e) {
  console.error("FAILED:", e);
  process.exit(1);
}
