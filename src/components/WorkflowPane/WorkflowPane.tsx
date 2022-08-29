import HardwareTargetsPane from "../HardwareTargetsPane/HardwareTargetsPane";
import BenchmarkPane from "../BenchmarkPane/BenchmarkPane";
import AcceleratePane from "../AcceleratePane/AcceleratePane";
import Pane from "../Pane/Pane";
import getString from "../../utils/getString";
import styled from "styled-components";

interface WorkflowPaneProps {}

export function WorkflowPane({}: WorkflowPaneProps) {
  return (
    <WorkflowPaneContainer aria-label="workflow-pane" data-alt="Workflow Pane">
      <Pane>
        <PanesContainer>
          <Title>{getString("octomize")}</Title>
          <PaneContainer>
            <BenchmarkPane />
          </PaneContainer>
          <PaneContainer>
            <AcceleratePane />
          </PaneContainer>
          <HardwareTargetsPane />
        </PanesContainer>
      </Pane>
    </WorkflowPaneContainer>
  );
}

const PanesContainer = styled.div`
  padding: 24px;
`;

const PaneContainer = styled.div`
  padding-bottom: 16px;
`;

const Title = styled.div`
  color: #7b818a;
  font-weight: 300;
  font-size: 30px;
  line-height: 36px;
  padding-bottom: 24px;
`;

const WorkflowPaneContainer = styled.div`
  width: 70%;

  @media (max-width: 850px) {
    margin: 0 auto;
    width: 100%;
  }
`;

export default WorkflowPane;
