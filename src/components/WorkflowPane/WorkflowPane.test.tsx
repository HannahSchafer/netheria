import { render, screen } from "@testing-library/react";
import WorkflowPane from "./WorkflowPane";
import { StoreContextProvider } from "../../stores/Store";

test("renders hardware targets pane", () => {
  render(
    <StoreContextProvider>
      <WorkflowPane />
    </StoreContextProvider>
  );
  const pane = screen.getByLabelText("workflow-pane");
  expect(pane).toBeInTheDocument();
});
