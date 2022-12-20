import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FilterPanel from "../index";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

const MockFilterPanel = () => {
  return (
    <BrowserRouter>
      <FilterPanel />
    </BrowserRouter>
  );
};

it("renders filter input", () => {
  render(<MockFilterPanel />);
  const inputEmployeeName = screen.getByPlaceholderText(/e.g. Admin.User/i);
  const dateElement = screen.getAllByPlaceholderText(/Select Date/i);
  const actionTypeEl = screen.getByPlaceholderText(/Select Action Type/i);
  const applicationTypeEl = screen.getByPlaceholderText(
    /Select Application Type/i
  );

  expect(inputEmployeeName).toBeInTheDocument();
  expect(dateElement.length).toBe(2);
  expect(actionTypeEl).toBeInTheDocument();
  expect(applicationTypeEl).toBeInTheDocument();
});

it("should able to type on employee name input", () => {
  render(<MockFilterPanel />);
  const inputEmployeeName = screen.getByPlaceholderText(/e.g. Admin.User/i);
  expect(inputEmployeeName).toBeInTheDocument();
  fireEvent.change(inputEmployeeName, { target: { value: "1234" } });
  expect(inputEmployeeName.value).toBe("1234");
});

it("should able to filter using employee name", async () => {
  render(<MockFilterPanel />);
  const inputEmployeeName = screen.getByPlaceholderText(/e.g. Admin.User/i);
  expect(inputEmployeeName).toBeInTheDocument();
  fireEvent.change(inputEmployeeName, { target: { value: "36500141375" } });
  expect(inputEmployeeName.value).toBe("36500141375");
  const buttonElement = screen.getByRole("button", { name: "Search Logger" });
  fireEvent.click(buttonElement);
});
