import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";

test("renders sidebar", () => {
  render(<Sidebar />);
  const sidebar = screen.getByLabelText("sidebar");
  expect(sidebar).toBeInTheDocument();
});
