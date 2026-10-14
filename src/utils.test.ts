import { describe, expect, it } from "vitest";
import { filterStations, formatCurrency, getStationAvailability, getStatusTone } from "./utils";
import { initialStations } from "./data";

describe("formatCurrency", () => {
  it("formats rupee amounts without decimal places", () => {
    expect(formatCurrency(42860)).toContain("42,860");
    expect(formatCurrency(0)).toContain("0");
  });
});

describe("getStationAvailability", () => {
  it("calculates available connector percentage", () => {
    expect(getStationAvailability(initialStations[0])).toBe(67);
  });

  it("handles a station with no chargers", () => {
    expect(getStationAvailability({ ...initialStations[0], chargers: 0 })).toBe(0);
  });
});

describe("filterStations", () => {
  it("matches station name without case sensitivity", () => {
    expect(filterStations(initialStations, "MARINA", "All")).toHaveLength(1);
  });

  it("matches location and station id", () => {
    expect(filterStations(initialStations, "Chennai", "All")).toHaveLength(3);
    expect(filterStations(initialStations, "ST-1005", "All")[0].name).toBe("Greenway Plaza");
  });

  it("filters by status", () => {
    expect(filterStations(initialStations, "", "Offline")).toHaveLength(1);
  });

  it("returns an empty list for unknown query", () => {
    expect(filterStations(initialStations, "not-a-station", "All")).toEqual([]);
  });
});

describe("getStatusTone", () => {
  it("maps known statuses to visual tones", () => {
    expect(getStatusTone("Available")).toBe("green");
    expect(getStatusTone("Pending")).toBe("amber");
    expect(getStatusTone("Offline")).toBe("red");
    expect(getStatusTone("Reserved")).toBe("blue");
    expect(getStatusTone("Unknown")).toBe("gray");
  });
});