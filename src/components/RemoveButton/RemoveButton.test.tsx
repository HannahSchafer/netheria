import { render, screen } from "@testing-library/react";
import RemoveButton from "./RemoveButton";
import { StoreContextProvider } from "../../stores/Store";

test("renders remove button", () => {
  render(
    <StoreContextProvider>
      <RemoveButton index={0} targetType="testType" />
    </StoreContextProvider>
  );
  const removeButton = screen.getByLabelText("remove-button");
  expect(removeButton).toBeInTheDocument();
});
