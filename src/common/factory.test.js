import { getSupabaseClient } from "./factory";
import { SupabaseClient } from "@supabase/supabase-js";

describe("WHEN: getSupabaseClient is invoked", () => {
  it("THEN: It returns a Supabase client", () => {
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
    const client = getSupabaseClient();

    expect(client).toBeInstanceOf(SupabaseClient);
    expectedKeys.forEach((key) => {
      expect(client).toHaveProperty(key);
    });
  });
});
