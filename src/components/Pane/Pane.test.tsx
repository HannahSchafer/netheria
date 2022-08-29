import { render, screen } from "@testing-library/react";
import Pane from "./Pane";
import { StoreContextProvider } from "../../stores/Store";

test("renders pane", () => {
  render(
    <StoreContextProvider>
      <Pane>
        <div>child node</div>
      </Pane>
    </StoreContextProvider>
  );
  const pane = screen.getByLabelText("pane");
  expect(pane).toBeInTheDocument();
});
