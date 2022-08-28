import EntityHeader from "./components/EntityHeader/EntityHeader";
import {
  getAccelerateData,
  getBenchmarkData,
  getConfigData,
  getTargetData,
} from "./Api";
import Sidebar from "./components/Sidebar/Sidebar";
import { StoreContextProvider } from "./stores/Store";
import TotalRunsPane from "./components/TotalRunsPane/TotalRunsPane";
import WorkflowPane from "./components/WorkflowPane/WorkflowPane";
import styled from "styled-components";

function App() {
  const targetApiData = getTargetData();
  const configData = getConfigData();
  const accelerateData = getAccelerateData();
  const benchmarkData = getBenchmarkData();

  return (
    <StyledApp>
      <Sidebar />
      <StoreContextProvider
        accelerateData={accelerateData}
        benchmarkData={benchmarkData}
        configData={configData}
        hardwareTargetApiData={targetApiData}
      >
        <HeaderContainer>
          <EntityHeader />
        </HeaderContainer>
        <PanesContainer>
          <WorkflowPane />
          <TotalRunsPane />
        </PanesContainer>
      </StoreContextProvider>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: block;
  font-style: normal;
  font-size: 14px;
  line-height: 20px;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 48px 60px;
`;

const PanesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  paddding-bottom: 48px;
  width: 100%;

  @media (max-width: 850px) {
    display: block;
  }
`;

export default App;
