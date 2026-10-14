import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
afterEach(() => {
  cleanup();
});
import Reservations from "../pages/Reservations";
import type { Reservation } from "../types";

const reservations: Reservation[] = [
  {
    id: "RES-001",
    driver: "Sanjay",
    station: "Central Station",
    date: "2026-10-15",
    time: "10:00 AM",
    connector: "CCS",
    status: "Pending",
  },
  {
    id: "RES-002",
    driver: "Arun",
    station: "Airport Express",
    date: "2026-10-16",
    time: "11:00 AM",
    connector: "Type 2",
    status: "Confirmed",
  },
];

describe("Reservations", () => {
  it("renders bookings and counts confirmed reservations", () => {
    render(<Reservations reservations={reservations} onUpdate={vi.fn()} />);
    expect(screen.getByText("RES-001")).toBeTruthy();
    expect(screen.getByText("Central Station")).toBeTruthy();
    expect(screen.getByText("RES-002")).toBeTruthy();
    expect(screen.getByText("Confirmed bookings").previousElementSibling?.textContent).toBe("1");
  });

  it("filters bookings by driver name", () => {
    render(<Reservations reservations={reservations} onUpdate={vi.fn()} />);

    fireEvent.change(screen.getAllByLabelText("Search reservations")[0], {
  target: { value: "Arun" },
});

   expect(screen.getAllByText("RES-002").length).toBeGreaterThan(0);
   expect(screen.queryAllByText("RES-001")).toHaveLength(0);
  });

  it("confirms and cancels pending bookings", () => {
  const onUpdate = vi.fn();

  render(
    <Reservations
      reservations={reservations}
      onUpdate={onUpdate}
    />
  );
  fireEvent.click(screen.getByLabelText("Confirm RES-001"));

expect(onUpdate).toHaveBeenCalledWith("RES-001", "Confirmed");

  fireEvent.click(
    screen.getByRole("button", { name: "Cancel RES-001" })
  );

  expect(onUpdate).toHaveBeenCalledWith("RES-001", "Cancelled");
});

  it("shows an empty message when no bookings match", () => {
    render(<Reservations reservations={reservations} onUpdate={vi.fn()} />);

    fireEvent.change(screen.getAllByLabelText("Search reservations")[0], {
      target: { value: "not-found" },
    });

    expect(screen.getByText("No reservations found.")).toBeTruthy();
  });
});