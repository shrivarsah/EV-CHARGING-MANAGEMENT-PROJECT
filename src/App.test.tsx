// @vitest-environment jsdom
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("VoltFlow application", () => {
  it("renders the overview and network metrics", () => {
    render(<App />);
    expect(screen.getByRole("heading", { name: /operations overview/i })).toBeInTheDocument();
    expect(screen.getByText("Total stations")).toBeInTheDocument();
    expect(screen.getByText("Total stations")).toBeInTheDocument();
  });

  it("confirms a pending reservation", () => {
  render(<App />);

  fireEvent.click(
    screen.getAllByRole("button", { name: /reservations/i })[0]
  );

  const confirmButton = screen.getAllByRole("button", {
    name: /^Confirm /i,
  })[0];

  const reservationId = confirmButton
    .getAttribute("aria-label")!
    .replace(/^Confirm /i, "");

  fireEvent.click(confirmButton);

  expect(
    screen.queryByRole("button", {
      name: `Confirm ${reservationId}`,
    })
  ).not.toBeInTheDocument();
});

it("cancels a pending reservation", () => {
  render(<App />);

  fireEvent.click(
    screen.getAllByRole("button", { name: /reservations/i })[0]
  );

  const cancelButton = screen.getAllByRole("button", {
    name: /^Cancel /i,
  })[0];

  const reservationId = cancelButton
    .getAttribute("aria-label")!
    .replace(/^Cancel /i, "");

  fireEvent.click(cancelButton);

  expect(
    screen.queryByRole("button", {
      name: `Cancel ${reservationId}`,
    })
  ).not.toBeInTheDocument();
});

  it("pauses, resumes, and stops a charging session", () => {
  render(<App />);

  fireEvent.click(
    screen.getAllByRole("button", { name: /sessions/i })[0]
  );

  const pauseButton = screen.getAllByRole("button", {
    name: /^Pause /i,
  })[0];

  const pauseLabel = pauseButton.getAttribute("aria-label");

  if (!pauseLabel) {
    throw new Error("Pause button has no accessible label");
  }

  const sessionId = pauseLabel.replace(/^Pause\s+/i, "");

  fireEvent.click(pauseButton);

  expect(
    screen.getByRole("button", { name: `Resume ${sessionId}` })
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", { name: `Resume ${sessionId}` })
  );

  expect(
    screen.getByRole("button", { name: `Pause ${sessionId}` })
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", { name: `Stop ${sessionId}` })
  );

  expect(
    screen.queryByRole("button", { name: `Stop ${sessionId}` })
  ).not.toBeInTheDocument();
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
    fireEvent.change(within(dialog).getByLabelText(/station name/i), {
  target: { value: "Test Solar Hub" },
});

fireEvent.change(within(dialog).getByLabelText(/location/i), {
  target: { value: "Chennai" },
});


    fireEvent.click(
      within(dialog).getByRole("button", { name: /create station/i })
    );

    expect(screen.getByText("Test Solar Hub")).toBeInTheDocument();
  });

  it("changes the selected page to analytics", () => {
    render(<App />);
    fireEvent.click(screen.getAllByRole("button", { name: /analytics/i })[0]);
    expect(
      screen.getByRole("heading", { name: /network analytics/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Hourly utilization")).toBeInTheDocument();
  });
});

it("shows an error when station details are too short", () => {
  render(<App />);

  fireEvent.click(
    screen.getAllByRole("button", { name: /add station/i })[0]
  );

  const dialog = screen.getByRole("dialog", {
    name: /add charging station/i,
  });

  fireEvent.change(within(dialog).getByLabelText(/station name/i), {
  target: { value: "A" },
});

fireEvent.change(within(dialog).getByLabelText(/location/i), {
  target: { value: "B" },
});

  fireEvent.click(
    within(dialog).getByRole("button", { name: /create station/i })
  );

  expect(dialog.textContent).toContain(
  "Enter a station name and location with at least 3 characters."
);
});

it("shows an error when the charger count exceeds 100", () => {
  render(<App />);

  fireEvent.click(
    screen.getAllByRole("button", { name: /add station/i })[0]
  );

  const dialog = screen.getByRole("dialog", {
    name: /add charging station/i,
  });

  fireEvent.change(within(dialog).getByLabelText(/station name/i), {
    target: { value: "Test Charging Hub" },
  });

  fireEvent.change(within(dialog).getByLabelText(/location/i), {
    target: { value: "Chennai" },
  });

  fireEvent.change(
    within(dialog).getByLabelText(/number of chargers/i),
    { target: { value: "101" } }
  );

  fireEvent.submit(dialog.querySelector("form")!);

  expect(dialog.textContent).toContain(
    "Chargers must be a whole number between 1 and 100."
  );
  });

  it("closes the selected station overlay with Escape", () => {
  render(<App />);

  fireEvent.click(
    screen.getAllByRole("button", { name: /stations/i })[0]
  );

  fireEvent.click(
  screen.getAllByRole("button", { name: /^View /i })[0]
);

  const closeButton = screen.getByRole("button", {
    name: /close selected station/i,
  });

  fireEvent.keyDown(closeButton, { key: "Escape" });

  expect(
    screen.queryByRole("button", { name: /close selected station/i })
  ).not.toBeInTheDocument();
}, 15000);

it("closes the selected station overlay when clicked", () => {
  render(<App />);

  fireEvent.click(
    screen.getAllByRole("button", { name: /stations/i })[0]
  );

  fireEvent.click(
  screen.getAllByRole("button", { name: /^View /i })[0]
);

  fireEvent.click(
    screen.getByRole("button", { name: /close selected station/i })
  );

  expect(
    screen.queryByRole("button", { name: /close selected station/i })
  ).not.toBeInTheDocument();
}, 15000);

it("navigates to stations when quick search finds a match", async () => {
  render(<App />);

  const search = screen.getAllByRole("textbox", {
  name: /quick search/i,
})[0];

  fireEvent.change(search, {
    target: { value: "Marina" },
  });

  fireEvent.keyDown(search, { key: "Enter", code: "Enter" });

  expect(
  (await screen.findAllByRole("heading", {
    name: /station management/i,
  })).length
).toBeGreaterThan(0);
});

it("stays on the overview when quick search finds no match", () => {
  render(<App />);

  act(() => {
    window.dispatchEvent(
      new CustomEvent<string>("quick-search", {
        detail: "NoMatchingStationXYZ",
      })
    );
  });

  expect(
  screen.getAllByRole("heading", {
    name: /operations overview/i,
  }).length
).toBeGreaterThan(0);
});