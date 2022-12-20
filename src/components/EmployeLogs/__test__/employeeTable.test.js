import { fireEvent, render, screen } from "@testing-library/react";
import EmployeLogs from "../index";

it("renders table elements", () => {
  render(<EmployeLogs data={[]} queryParams={{}} />);
  const LogIdHeader = screen.getByText(/Log ID/i);
  expect(LogIdHeader).toBeInTheDocument();
});

it("test table sort", () => {
  render(<EmployeLogs data={[]} queryParams={{}} />);
  const LogIdHeader = screen.getByText(/Log ID/i);
  fireEvent.click(LogIdHeader);
  const arrowUpElement = screen.getByRole("img");
  expect(arrowUpElement).toHaveAttribute("aria-label", "arrow-up");
  fireEvent.click(LogIdHeader);
  const arrowDownElement = screen.getByRole("img");
  expect(arrowDownElement).toHaveAttribute("aria-label", "arrow-down");
});
