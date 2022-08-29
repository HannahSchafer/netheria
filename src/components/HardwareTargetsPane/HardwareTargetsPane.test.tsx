import { render, screen } from "@testing-library/react";
import HardwareTargetsPane from "./HardwareTargetsPane";
import { StoreContextProvider } from "../../stores/Store";

test("renders hardware targets pane", () => {
  render(
    <StoreContextProvider>
      <HardwareTargetsPane />
    </StoreContextProvider>
  );
  const pane = screen.getByLabelText("harware-targets-pane");
  expect(pane).toBeInTheDocument();
});
