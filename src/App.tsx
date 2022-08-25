import React from 'react';
import logo from './logo.svg';
import './App.css';
import WorkflowPane from './components/WorkflowPane/WorkflowPane';
import TotalRunsPane from './components/TotalRunsPane/TotalRunsPane';
import Sidebar from './components/Sidebar/Sidebar';
import styled from 'styled-components';
import { StoreContextProvider } from './Store';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <StoreContextProvider>
        <PanesContainer>
          <WorkflowPane />
          <TotalRunsPane />
        </PanesContainer>
      </StoreContextProvider>
    </div>
  );
}

const PanesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
`;

export default App;
