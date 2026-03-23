import { describe, expect, it, vi, beforeEach } from 'vitest';
import { processCronTrigger } from '$lib/functions/cronTrigger';

// Mock fetch globally
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

// Mock KV namespace
const mockKV = {
  get: vi.fn().mockResolvedValue(null),
  put: vi.fn().mockResolvedValue(undefined)
};

const mockEnv = {
  KV_STATUS_PAGE: mockKV,
  SECRET_TELEGRAM_CHAT_ID: undefined,
  SECRET_TELEGRAM_API_TOKEN: undefined
} as unknown as App.Platform['env'];

describe('processCronTrigger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock the cloudflare-dns location check
    mockFetch.mockResolvedValueOnce({
      headers: { get: () => 'abc123-SIN' }
    } as unknown as Response);
    // Mock subsequent monitor fetches as successful 200
    mockFetch.mockResolvedValue({
      status: 200,
      statusText: 'OK'
    } as unknown as Response);
  });

  it('should run cron trigger without throwing', async () => {
    const result = await processCronTrigger(mockEnv);
    expect(typeof result).toBe('string');
    // result should be today's date (YYYY-MM-DD)
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should call KV put to save monitors state', async () => {
    await processCronTrigger(mockEnv);
    expect(mockKV.put).toHaveBeenCalled();
  });
});
