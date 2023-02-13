import { getSupabaseClient } from './factory';
import { SupabaseClient } from '@supabase/supabase-js';

describe('WHEN: getSupabaseClient is invoked', () => {
  it('THEN: it returns a Supabase client', () => {
    const client = getSupabaseClient();

    expect(client).toBeInstanceOf(SupabaseClient);
  });
});
