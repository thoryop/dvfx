import "server-only";

/**
 * Admin (write) access to Wix CMS via the REST API + a server-only API key.
 * Used for persisting Orders and Leads. Never imported by client code.
 * All helpers no-op-safely report configuration state so routes can degrade.
 */
const DATA_BASE = "https://www.wixapis.com/wix-data/v2";

export function isWixAdminConfigured(): boolean {
  return Boolean(process.env.WIX_API_KEY && process.env.WIX_SITE_ID);
}

function headers(): HeadersInit {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (!apiKey || !siteId) {
    throw new Error("Wix admin not configured (WIX_API_KEY / WIX_SITE_ID).");
  }
  return {
    Authorization: apiKey,
    "wix-site-id": siteId,
    "Content-Type": "application/json",
  };
}

type Data = Record<string, unknown>;

/** Insert an item; returns the created item's data (incl. _id). */
export async function wixInsert(
  dataCollectionId: string,
  data: Data
): Promise<Data> {
  const res = await fetch(`${DATA_BASE}/items`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ dataCollectionId, dataItem: { data } }),
  });
  if (!res.ok) {
    throw new Error(`Wix insert failed (${res.status}): ${await res.text()}`);
  }
  const json = await res.json();
  return (json?.dataItem?.data ?? {}) as Data;
}

/** Replace an existing item (by _id). */
export async function wixUpdate(
  dataCollectionId: string,
  id: string,
  data: Data
): Promise<Data> {
  const res = await fetch(`${DATA_BASE}/items/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify({ dataCollectionId, dataItem: { data: { ...data, _id: id } } }),
  });
  if (!res.ok) {
    throw new Error(`Wix update failed (${res.status}): ${await res.text()}`);
  }
  const json = await res.json();
  return (json?.dataItem?.data ?? {}) as Data;
}

/** Query items by an exact-match filter. Returns raw item data objects. */
export async function wixQuery(
  dataCollectionId: string,
  filter: Data,
  limit = 10
): Promise<Data[]> {
  const res = await fetch(`${DATA_BASE}/items/query`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ dataCollectionId, query: { filter, paging: { limit } } }),
  });
  if (!res.ok) {
    throw new Error(`Wix query failed (${res.status}): ${await res.text()}`);
  }
  const json = await res.json();
  return ((json?.dataItems ?? []) as { data: Data }[]).map((d) => d.data);
}
