import { render, screen } from "@testing-library/react";
import Modal from "./Modal";
import { StoreContextProvider } from "../../stores/Store";

test("renders modal when isOpen true", () => {
  render(
    <StoreContextProvider>
      <Modal isOpen={true} />
    </StoreContextProvider>
  );
  const header = screen.getByLabelText("modal");
  expect(header).toBeInTheDocument();
});
