import { render, screen } from "@testing-library/react";
import TotalRunsPane from "./TotalRunsPane";
import { StoreContextProvider } from "../../stores/Store";

test("renders total runs pane", () => {
  render(
    <StoreContextProvider>
      <TotalRunsPane />
    </StoreContextProvider>
  );
  const pane = screen.getByLabelText("total-runs-pane");
  expect(pane).toBeInTheDocument();
});
