import { render, screen } from "@testing-library/react";
import PaneHeader from "./PaneHeader";
import { StoreContextProvider } from "../../stores/Store";

test("renders pan header", () => {
  render(
    <StoreContextProvider>
      <PaneHeader title="test" options={[]} />
    </StoreContextProvider>
  );
  const pane = screen.getByLabelText("pane-header");
  expect(pane).toBeInTheDocument();
});
