// @vitest-environment jsdom
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("VoltFlow application", () => {
  it("renders the overview and network metrics", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /operations overview/i })).toBeInTheDocument();
    expect(screen.getByText("Total stations")).toBeInTheDocument();
    expect(screen.getByText("Total stations")).toBeInTheDocument();
  });

  it("navigates to the station directory and filters records", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button", { name: /stations/i })[0]);
    expect(screen.getByRole("heading", { name: /station management/i })).toBeInTheDocument();
    fireEvent.change(screen.getByRole("textbox", { name: /search stations/i }), { target: { value: "Marina" } });
    expect(screen.getAllByText("Marina Central").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Tech Park Hub").length).toBeGreaterThan(0);
  });

  it("can open and close notifications", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button", { name: /open notifications/i })[0]);
    expect(screen.getByRole("complementary", { name: /notifications/i })).toBeInTheDocument();
    fireEvent.click(within(screen.getByRole("complementary", { name: /notifications/i })).getByRole("button", { name: /close notifications/i }));
    expect(screen.queryByRole("complementary", { name: /notifications/i })).not.toBeInTheDocument();
  });

  it("adds a station from the create station dialog", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button", { name: /add station/i })[0]);
    const dialog = screen.getByRole("dialog", { name: /add charging station/i });
    fireEvent.change(within(dialog).getByLabelText(/station name/i), { target: { value: "Test Solar Hub" } });
    fireEvent.change(within(dialog).getByLabelText(/location/i), { target: { value: "Chennai · Test Road" } });
    fireEvent.click(within(dialog).getByRole("button", { name: /create station/i }));
    expect(screen.getByText("Test Solar Hub")).toBeInTheDocument();
  });

  it("changes the selected page to analytics", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button", { name: /analytics/i })[0]);
    expect(screen.getByRole("heading", { name: /network analytics/i })).toBeInTheDocument();
    expect(screen.getByText("Hourly utilization")).toBeInTheDocument();
  });
});