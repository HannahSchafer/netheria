import { render, screen } from "@testing-library/react";
import EntityHeader from "./EntityHeader";
import { StoreContextProvider } from "../../stores/Store";
import { mockConfigData } from "../../utils/testHelpers/mockStore";

test("renders entity header", () => {
  render(
    <StoreContextProvider configData={mockConfigData}>
      <EntityHeader />
    </StoreContextProvider>
  );
  const header = screen.getByLabelText("entity-header");
  expect(header).toBeInTheDocument();
});
