import { fireEvent, render, screen } from "@testing-library/react";
import EmployeLogs from "../index";

it("should renders table", () => {
  render(<EmployeLogs />);
  const tableElement = screen.getByRole("table");
  expect(tableElement).toBeInTheDocument();
});

it("renders table th elements", () => {
  render(<EmployeLogs />);
  const LogIdHeader = screen.getByText(/Log ID/i);
  expect(LogIdHeader).toBeInTheDocument();
});

it("test table sort", () => {
  render(<EmployeLogs />);
  const LogIdHeader = screen.getByText(/Log ID/i);
  fireEvent.click(LogIdHeader);
  const arrowUpElement = screen.getByRole("img");
  expect(arrowUpElement).toHaveAttribute("aria-label", "arrow-up");
  fireEvent.click(LogIdHeader);
  const arrowDownElement = screen.getByRole("img");
  expect(arrowDownElement).toHaveAttribute("aria-label", "arrow-down");
});
