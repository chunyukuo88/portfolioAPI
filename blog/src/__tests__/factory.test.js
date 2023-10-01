import { getSupabaseClient } from '../common/factory';
import { SupabaseClient } from '@supabase/supabase-js';
import 'aws-sdk';

jest.mock('aws-sdk', () => {
  const SSM = {
    getParameter: jest.fn().mockReturnThis(),
    promise: () => ({
      Parameter: {
        Value: 'w00t'
      }
    }),
  };
  return {
    SSM: jest.fn(() => SSM),
  };
});

describe('WHEN: getSupabaseClient is invoked', () => {
  it('THEN: It returns a Supabase client', async () => {

    const expectedKeys = [
      'supabaseUrl',
      'supabaseKey',
      'realtimeUrl',
      'authUrl',
      'storageUrl',
      'functionsUrl',
      'storageKey',
      'headers',
      'auth',
      'fetch',
      'realtime',
      'rest',
    ];
    const client = await getSupabaseClient();

    expect(client).toBeInstanceOf(SupabaseClient);
    expectedKeys.forEach((key) => {
      expect(client).toHaveProperty(key);
    });
  });
});
