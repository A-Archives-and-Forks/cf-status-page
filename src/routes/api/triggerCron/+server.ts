import { processCronTrigger } from '$lib/functions/cronTrigger';
import type { RequestEvent } from '@sveltejs/kit';

export async function POST({ platform }: RequestEvent) {
  if (platform?.env) {
    try {
      const checkDay = await processCronTrigger(platform.env);
      return new Response(`triggered event OK: ${checkDay}`);
    } catch (err: unknown) {
      console.error(err);
      const e = err as Error;
      return new Response(e?.message || e?.stack || JSON.stringify(err));
    }
  }

  return new Response('no platform.env');
}
