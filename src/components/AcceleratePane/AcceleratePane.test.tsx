import { render, screen } from "@testing-library/react";
import AcceleratePane from "./AcceleratePane";

test("renders accelerate pane", () => {
  render(<AcceleratePane />);
  const app = screen.getByLabelText("accelerate-pane");
  expect(app).toBeInTheDocument();
});
