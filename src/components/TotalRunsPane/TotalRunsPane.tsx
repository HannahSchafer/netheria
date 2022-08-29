import Pane from "../Pane/Pane";
import getString from "../../utils/getString";
import {
  useStoreContext,
  NEW_ACCELERATE_SELECTION,
  NEW_BENCHMARK_SELECTION,
} from "../../stores/Store";
import styled from "styled-components";
import classNames from "classnames";
import { COLORS } from "../../styles/colors";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

interface TotalRunsPaneProps {}

export function TotalRunsPane({}: TotalRunsPaneProps) {
  const {
    state: {
      aggregateHardwareTargets,
      totalRuns,
      allData: { accelerateSelection, benchmarkDataSelections },
    },
  } = useStoreContext();

  const handleOctomize = () => {
    //TODO - persist to backend
  };

  const aggregates = Object.values(aggregateHardwareTargets);
  const accelerateSelected = accelerateSelection !== NEW_ACCELERATE_SELECTION;
  const benchmarkSelected =
    benchmarkDataSelections[0].runsPerTrial !==
    NEW_BENCHMARK_SELECTION.runsPerTrial;
  const canOctomize =
    aggregates.length > 0 && (accelerateSelected || benchmarkSelected);
  return (
    <TotalRunsContainer aria-label="total-runs-pane">
      <Pane styles={{ padding: "24px" }}>
        <PaneInnerContainer>
          <div>
            <Title>{getString("totalRuns")}</Title>
            <Aggregate>{totalRuns}</Aggregate>
          </div>
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
          <StyledTooltip arrow title={getString("octomizeTooltip")}>
            <OctomizeButton
              onClick={() => handleOctomize()}
              role="button"
              className={classNames({
                "is-active": canOctomize,
              })}
            >
              {getString("octomize")}
            </OctomizeButton>
          </StyledTooltip>
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

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({}) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: COLORS.gray600,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: COLORS.gray600,
    width: "200px",
    fontSize: "12px",
    fontFamily: "sans-serif",
  },
}));

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
