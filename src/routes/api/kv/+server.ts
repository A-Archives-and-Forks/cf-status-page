import { getKVMonitors } from '$lib/functions/helpers.js';
import type { RequestEvent } from '@sveltejs/kit';
import kvJSON from './kv.json';

export async function GET({ platform }: RequestEvent) {
  if (platform?.env) {
    try {
      const kvMonitors = await getKVMonitors(platform.env);
      return new Response(JSON.stringify(kvMonitors));
    } catch (err: unknown) {
      const e = err as Error;
      return new Response(e?.message || e?.stack || JSON.stringify(err));
    }
  }

  return new Response(JSON.stringify(kvJSON));
}
