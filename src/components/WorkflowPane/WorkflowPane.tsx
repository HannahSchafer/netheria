import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import HardwareTargetsPane from '../HardwareTargetsPane/HardwareTargetsPane'
import Pane from '../Pane/Pane';
import getString from '../../utils/getString';
import { DROPDOWN_PANES } from '../../config';
import styled from "styled-components";

interface WorkflowPaneProps {
}

export function WorkflowPane({
}: WorkflowPaneProps) {
  return (
    <WorkflowPaneContainer>
      <Pane title={getString("octomize")} styles={{
        padding: '24px',
        }}>
        {
        DROPDOWN_PANES.map((paneData, i) => {
          return (
            <div>
            <Dropdown key={i} displayData={paneData} hasCheckbox />
            </div>
          )
        })
      }
        <HardwareTargetsPane />
    </Pane>
    </WorkflowPaneContainer>
  );
}

const WorkflowPaneContainer = styled.div`
  width: 65%;
`;

export default WorkflowPane;
