import { describe, it, expect } from "vitest";
import { flattenStrapiItem, flattenStrapiResponse } from "@/lib/api-client";

describe("flattenStrapiItem", () => {
  it("merges id with attributes into a flat object", () => {
    const item = { id: 1, attributes: { title: "Test", slug: "test" } };
    const result = flattenStrapiItem(item);

    expect(result).toEqual({ id: 1, title: "Test", slug: "test" });
  });
});

describe("flattenStrapiResponse", () => {
  it("flattens array response", () => {
    const response = {
      data: [
        { id: 1, attributes: { title: "A" } },
        { id: 2, attributes: { title: "B" } },
      ],
      meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 2 } },
    };

    const result = flattenStrapiResponse(response);

    expect(result).toEqual([
      { id: 1, title: "A" },
      { id: 2, title: "B" },
    ]);
  });

  it("flattens single item response", () => {
    const response = {
      data: { id: 1, attributes: { siteName: "Agency" } },
      meta: {},
    };

    const result = flattenStrapiResponse(response);

    expect(result).toEqual([{ id: 1, siteName: "Agency" }]);
  });
});
