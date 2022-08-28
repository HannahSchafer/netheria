import { useEffect, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import styled from "styled-components";
import { useStoreContext } from "../../Store";
import classNames from "classnames";
import RemoveButton from "../RemoveButton/RemoveButton";
import PaneHeader from "../PaneHeader/PaneHeader";

export const TARGET_OPTS = [
  {
    title: "Provider",
    styles: { width: "30%" },
  },
  {
    title: "Instance",
    styles: { width: "30%" },
  },
  {
    title: "VCPU",
    styles: { width: "20%" },
  },
  {
    title: "Memory (GIB)",
    styles: { width: "20%" },
  },
];

const NEW_SELECTION = {
  provider: "Select Provider",
  instance: "Select Instance",
  cpu: 0,
  memory: 0,
};

export function HardwareTargetsPane() {
  const {
    state: {
      allData: {
        hardwareTargetCurrent,
        hardwareTargetSelections,
        hardwareTargetApiData,
      },
    },
    actions: { updateData, setAllData, setHardwareTargetInstance },
  } = useStoreContext();

  const [instanceOptions, setInstanceOptions] = useState(null);
  const [canAddNewTarget, setCanAddNewTarget] = useState(false);

  useEffect(() => {
    if (hardwareTargetSelections.length === 0) {
      setCanAddNewTarget(true);
    }
  }, [hardwareTargetSelections, hardwareTargetSelections]);

  const handleSelectProvider = (selection: any, index: number) => {
    updateData(
      selection,
      "provider",
      "hardwareTargetCurrent",
      "hardwareTargetSelections"
    );
    const options = hardwareTargetApiData[selection];
    const instanceOpts = options.map(function (item: { [x: string]: any }) {
      return item["instance"];
    });
    setInstanceOptions(instanceOpts);
  };

  const handleSelectInstance = (selection: any, index: number) => {
    setHardwareTargetInstance(selection, index);
    setCanAddNewTarget(true);
  };

  const handleAddTarget = () => {
    if (!canAddNewTarget) {
      return;
    }
    setCanAddNewTarget(false);
    setAllData(
      [...hardwareTargetSelections, NEW_SELECTION],
      "hardwareTargetSelections"
    );
  };

  const engineTypes = hardwareTargetApiData
    ? Object.keys(hardwareTargetApiData)
    : null;

  return (
    <div aria-label="harware-targets-pane">
      <PaneHeader options={TARGET_OPTS} title="hardwareTargetsTitle">
        <AddButton
          onClick={() => handleAddTarget()}
          role="button"
          className={classNames({
            "is-active": canAddNewTarget,
          })}
        >
          Add
        </AddButton>
      </PaneHeader>
      <Rule />
      <OptionsContainer>
        {hardwareTargetSelections.map((provider: any, i: number) => {
          return (
            <OptionsInnerContainer key={i}>
              <Spacing className={classNames({ "is-active": true })}>
                <Dropdown
                  displayData={{ title: `${provider.provider}` }}
                  handleSelect={handleSelectProvider}
                  menuData={engineTypes}
                  modalWidth={"18%"}
                />
              </Spacing>
              <Spacing
                className={classNames({
                  "is-active": instanceOptions !== null,
                })}
              >
                <Dropdown
                  displayData={{ title: `${provider.instance}` }}
                  handleSelect={handleSelectInstance}
                  menuData={instanceOptions}
                  modalWidth={"18%"}
                  isDisabled={!instanceOptions}
                />
              </Spacing>
              <StyledCalculations
                className={classNames({
                  "is-active": instanceOptions !== null,
                })}
              >
                {provider.cpu}
              </StyledCalculations>
              <StyledCalculations
                className={classNames({
                  "is-active": instanceOptions !== null,
                })}
              >
                {provider.memory}
              </StyledCalculations>
              <RemoveButton
                isActive={hardwareTargetSelections[i].memory > 0}
                index={i}
                targetType="hardwareTargetSelections"
              />
            </OptionsInnerContainer>
          );
        })}
      </OptionsContainer>
    </div>
  );
}

const Spacing = styled.div`
  margin-left: 8px;
  width: 30%;
  cursor: pointer;

  &.is-active {
    color: black;
  }
`;

const StyledCalculations = styled.div`
  width: 20%;
  padding-left: 12px;
  cursor: pointer;

  &.is-active {
    color: black;
  }
`;

const AddButton = styled.div`
  color: white;
  background-color: #7b818a;
  border-radius: 4px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  padding: 0px 16px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: not-allowed;

  &.is-active {
    background-color: #0180ff;
    cursor: pointer;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
`;

const OptionsContainer = styled.div`
  color: #7b818a;
`;

const OptionHeadings = styled.div`
  color: #7b818a;
  display: flex;
  flex-direction: row;
`;

const OptionHeading = styled.div`
  width: 25%;
`;

const OptionsInnerContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

const Title = styled.div`
  color: #7b818a;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
`;

const Rule = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin: 10px 0 32px 0;
  height: 1px;
`;

export default HardwareTargetsPane;
