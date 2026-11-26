export { onRequestError } from "@doxa-innovations/watch/next";

// Doxa Watch reports the requests, exceptions, queries, outgoing requests and logs of the Node.js server.
// Without DOXA_WATCH_TOKEN it does nothing.
export async function register() {
  // instrumentation is also compiled for the Edge runtime (src/middleware.ts); keep the import inside the
  // Node.js branch, which Next leaves out of that build.
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { register: registerDoxaWatch } = await import("@doxa-innovations/watch/next");
    registerDoxaWatch();
  }
}
