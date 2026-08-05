import "server-only";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";

/**
 * Headless Wix client for reading published CMS content from the server.
 * Uses OAuthStrategy with the public client ID — this issues anonymous visitor
 * tokens, which is exactly what read-only (ANYONE) collections need. No secrets
 * are involved; admin writes (Phase 3 leads) will use a separate API-key client.
 *
 * The client is created lazily and memoized so a missing client ID never crashes
 * module load (mock mode runs without any Wix env vars).
 */
function createWixClient() {
  const clientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
  if (!clientId) {
    throw new Error(
      "NEXT_PUBLIC_WIX_CLIENT_ID is not set. Set it (and USE_MOCK_DATA=false) to read from Wix."
    );
  }

  return createClient({
    modules: { items },
    auth: OAuthStrategy({ clientId }),
  });
}

let cached: ReturnType<typeof createWixClient> | null = null;

export function getWixClient() {
  if (!cached) cached = createWixClient();
  return cached;
}
