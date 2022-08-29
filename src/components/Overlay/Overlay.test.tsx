import { render, screen } from "@testing-library/react";
import Overlay from "./Overlay";
import { StoreContextProvider } from "../../stores/Store";

test("renders overlay when isOpen true", () => {
  render(
    <StoreContextProvider>
      <Overlay isOpen={true} />
    </StoreContextProvider>
  );
  const header = screen.getByLabelText("overlay");
  expect(header).toBeInTheDocument();
});
