import { render, screen } from "@testing-library/react";
import BenchmarkPane from "./BenchmarkPane";
import { StoreContextProvider } from "../../stores/Store";

test("renders benchmark pane", () => {
  render(
    <StoreContextProvider>
      <BenchmarkPane />
    </StoreContextProvider>
  );
  const pane = screen.getByLabelText("benchmark-pane");
  expect(pane).toBeInTheDocument();
});
