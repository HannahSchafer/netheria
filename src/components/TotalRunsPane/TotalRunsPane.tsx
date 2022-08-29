import Pane from "../Pane/Pane";
import getString from "../../utils/getString";
import { useStoreContext } from "../../stores/Store";
import styled from "styled-components";
import classNames from "classnames";
import { COLORS } from "../../styles/colors";

interface TotalRunsPaneProps {}

export function TotalRunsPane({}: TotalRunsPaneProps) {
  const {
    state: { aggregateHardwareTargets, totalRuns },
  } = useStoreContext();

  const handleOctomize = () => {
    //TODO
  };

  const aggregates = Object.values(aggregateHardwareTargets);
  return (
    <TotalRunsContainer aria-label="total-runs-pane">
      <Pane styles={{ padding: "24px" }}>
        <PaneInnerContainer>
          <HeaderContainer>
            <Title>{getString("totalRuns")}</Title>
            <Aggregate>{totalRuns}</Aggregate>
          </HeaderContainer>
          {aggregates?.map((target: any, i: number) => {
            return (
              <InstanceContainer key={i}>
                <InstanceInnerContainer>
                  <InstanceType>{target.instance}</InstanceType>
                  <InstanceCores>{target.cpu} cores</InstanceCores>
                </InstanceInnerContainer>
                <InstanceRuns>{target.count}</InstanceRuns>
              </InstanceContainer>
            );
          })}
          <OctomizeButton
            onClick={() => handleOctomize()}
            role="button"
            className={classNames({
              "is-active": aggregates.length > 0,
            })}
          >
            {getString("octomize")}
          </OctomizeButton>
        </PaneInnerContainer>
      </Pane>
    </TotalRunsContainer>
  );
}

const Aggregate = styled.div`
  color: ${COLORS.success500};
  display: flex;
  font-weight: 600;
  font-size: 32px;
  justify-content: flex-end;
  line-height: 136.52%;
`;

const OctomizeButton = styled.div`
  color: ${COLORS.gray600};
  background-color: ${COLORS.gray200};
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  padding: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;

  &.is-active {
    background-color: ${COLORS.primary500};
    color: ${COLORS.white};
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div``;

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
  color: ${COLORS.gray900};
`;

const InstanceCores = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${COLORS.gray450};
`;

const InstanceRuns = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${COLORS.success500};
`;

const PaneInnerContainer = styled.div`
  display: block;
`;

const Title = styled.div`
  color: #${COLORS.gray500};
  font-weight: 700;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  justify-content: flex-end;
`;

const TotalRunsContainer = styled.div`
  margin-left: 16px;
  max-width: 287px;
  width: 100%;

  @media (max-width: 850px) {
    max-width: 100%;
    margin: 0 auto;
  }
`;

export default TotalRunsPane;
