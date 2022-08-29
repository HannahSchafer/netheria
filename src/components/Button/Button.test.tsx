import { render, screen } from "@testing-library/react";
import Button from "./Button";
import { StoreContextProvider } from "../../stores/Store";
import { COLORS } from "../../styles/colors";

test("renders button", () => {
  render(
    <StoreContextProvider>
      <Button color={COLORS.primary500} isActive={true} onClick={() => null}>
        Test Child
      </Button>
    </StoreContextProvider>
  );
  const button = screen.getByLabelText("button");
  expect(button).toBeInTheDocument();
});
