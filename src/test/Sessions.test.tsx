import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Sessions from "../pages/Sessions";
import type { Session } from "../types";

afterEach(() => {
  cleanup();
});

const sessions: Session[] = [
  {
    id: "SES-001",
    driver: "Sanjay",
    vehicle: "Tata Nexon EV",
    station: "Central Station",
    connector: "CCS",
    energy: 12.4,
    duration: "35 min",
    cost: 250,
    status: "Charging",
  },
  {
    id: "SES-002",
    driver: "Arun",
    vehicle: "MG ZS EV",
    station: "Airport Express",
    connector: "Type 2",
    energy: 8.5,
    duration: "25 min",
    cost: 180,
    status: "Paused",
  },
  {
    id: "SES-003",
    driver: "Priya",
    vehicle: "Hyundai Kona",
    station: "Metro Square",
    connector: "CCS",
    energy: 20.2,
    duration: "50 min",
    cost: 420,
    status: "Completed",
  },
];

describe("Sessions", () => {
  it("renders sessions and summary counts", () => {
    render(<Sessions sessions={sessions} onUpdate={vi.fn()} />);

    expect(screen.getByText("SES-001")).toBeTruthy();
    expect(screen.getByText("SES-002")).toBeTruthy();
    expect(screen.getByText("SES-003")).toBeTruthy();

    expect(
      screen.getByText("Active sessions").nextElementSibling?.textContent
    ).toBe("1");

    expect(
      screen.getByText("Completed today").nextElementSibling?.textContent
    ).toBe("19");
  });

  it("searches sessions by driver", () => {
    render(<Sessions sessions={sessions} onUpdate={vi.fn()} />);

    fireEvent.change(screen.getByRole("textbox", { name: "Search sessions" }), {
      target: { value: "Arun" },
    });

    expect(screen.getByText("SES-002")).toBeTruthy();
    expect(screen.queryByText("SES-001")).toBeNull();
    expect(screen.queryByText("SES-003")).toBeNull();
  });

  it("filters sessions by status", () => {
    render(<Sessions sessions={sessions} onUpdate={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("Filter sessions"), {
      target: { value: "Paused" },
    });

    expect(screen.getByText("SES-002")).toBeTruthy();
    expect(screen.queryByText("SES-001")).toBeNull();
    expect(screen.queryByText("SES-003")).toBeNull();
  });

  it("pauses, resumes, and stops sessions", () => {
    const onUpdate = vi.fn();

    render(<Sessions sessions={sessions} onUpdate={onUpdate} />);

    fireEvent.click(screen.getByLabelText("Pause SES-001"));
    expect(onUpdate).toHaveBeenLastCalledWith("SES-001", "Paused");

    fireEvent.click(screen.getByLabelText("Resume SES-002"));
    expect(onUpdate).toHaveBeenLastCalledWith("SES-002", "Charging");

    fireEvent.click(screen.getByLabelText("Stop SES-001"));
    expect(onUpdate).toHaveBeenLastCalledWith("SES-001", "Completed");
  });

  it("shows an empty message when no sessions match", () => {
    render(<Sessions sessions={sessions} onUpdate={vi.fn()} />);

    fireEvent.change(screen.getByRole("textbox", { name: "Search sessions" }), {
      target: { value: "no-such-driver" },
    });

    expect(
      screen.getByText("No sessions match your search.")
    ).toBeTruthy();
  });
});