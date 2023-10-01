import { getSupabaseClient } from "../common/factory";
import { SupabaseClient } from "@supabase/supabase-js";
import AWS from 'aws-sdk';

/**
 *
 * Use msw (什麼的) to mock the response from process.env.SSM_ENDPOINT
 *
 * */

describe("WHEN: getSupabaseClient is invoked", () => {
  it("THEN: It returns a Supabase client", async () => {

    const expectedKeys = [
      "supabaseUrl",
      "supabaseKey",
      "realtimeUrl",
      "authUrl",
      "storageUrl",
      "functionsUrl",
      "storageKey",
      "headers",
      "auth",
      "fetch",
      "realtime",
      "rest",
    ];
    const client = await getSupabaseClient();

    expect(client).toBeInstanceOf(SupabaseClient);
    expectedKeys.forEach((key) => {
      expect(client).toHaveProperty(key);
    });
  });
});
