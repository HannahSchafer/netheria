import { render, screen } from "@testing-library/react";
import AcceleratePane from "./AcceleratePane";
import { StoreContextProvider } from "../../stores/Store";

test("renders accelerate pane", () => {
  render(
    <StoreContextProvider>
      <AcceleratePane />
    </StoreContextProvider>
  );
  const pane = screen.getByLabelText("accelerate-pane");
  expect(pane).toBeInTheDocument();
});
