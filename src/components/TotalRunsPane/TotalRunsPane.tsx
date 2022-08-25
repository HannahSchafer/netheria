import React, { useState } from 'react';
import Pane from '../Pane/Pane';
import getString from '../../utils/getString';
import { useStoreContext } from "../../Store";
import styled from "styled-components";
import classNames from 'classnames';

interface TotalRunsPaneProps {
}

export function TotalRunsPane({
}: TotalRunsPaneProps) {
  const {
    state: {aggregateHardwareTargets, totalRuns },
  } = useStoreContext();

  const aggregates =  Object.values(aggregateHardwareTargets);

  const handleOctomize = () => {
    //TODO
  }
  return (
    <TotalRunsContainer>
      <Pane styles={{width: '287px', padding: '24px'}}>
        <div style={{display: 'block'}}>
          <HeaderContainer>
            <Title>{getString("totalRuns")}</Title>
            <Aggregate>{totalRuns}</Aggregate>
          </HeaderContainer>
          {aggregates?.map((target: any, i: any) => {
            return(
              <InstanceContainer>
                <InstanceInnerContainer>
                  <InstanceType>{target.instance}</InstanceType>
                  <InstanceCores>{target.cpu} cores</InstanceCores>
                </InstanceInnerContainer>
                <InstanceRuns>{target.count}</InstanceRuns>
              </InstanceContainer>
            )
          })}
          <OctomizeButton
            onClick={() => handleOctomize()}
            role="button"
            className={classNames({
              'is-active': aggregates.length > 0,
            })}
          >
            {getString("octomize")}
          </OctomizeButton>
        </div>
      </Pane>
    </TotalRunsContainer>
  );
}

const Aggregate = styled.div`
color: #4DB296;
display: flex;
font-weight: 600;
font-size: 32px;
justify-content: flex-end;
line-height: 136.52%
`;

const OctomizeButton = styled.div`
  color: white;
  background-color: #7B818A;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  padding: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;

  &.is-active {
    background-color: #0180FF;
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`

`;

const InstanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
`;

const InstanceInnerContainer = styled.div`
  display: block;
`;

const InstanceType = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 20px;
  color: #2E3238;
`;

const InstanceCores = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #91969C;
`;

const InstanceRuns = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px; 
  color: #4DB396;
`;

const Title = styled.div`
  color: #7B818A;
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  justify-content: flex-end;
`;

const TotalRunsContainer = styled.div`
  margin-left: 16px;
`;

export default TotalRunsPane;
