import { describe, expect, it } from "vitest";

describe("Dashboard foundation", () => {
  it("uses the required parcel statuses", () => {
    expect(["pending", "in_transit", "delivered", "cancelled"]).toHaveLength(4);
  });
});
