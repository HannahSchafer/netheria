import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  render(<App />);
  const app = screen.getByLabelText("app");
  expect(app).toBeInTheDocument();
});
