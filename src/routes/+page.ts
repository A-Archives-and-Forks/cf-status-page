import kvJSON from '../routes/api/kv/kv.json' assert { type: 'json' };

export const prerender = true;

export async function load(event) {
  try {
    const resp = await event.fetch('/api/kv');
    if (resp.ok) {
      const _kvMonitors = await resp.json();
      return { kvMonitors: _kvMonitors as App.MonitorsState };
    }
  } catch {
    // fall through to static fallback below
  }
  return { kvMonitors: kvJSON as unknown as App.MonitorsState };
}
