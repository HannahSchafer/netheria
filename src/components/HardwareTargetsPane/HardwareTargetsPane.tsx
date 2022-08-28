import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import PaneHeader from "../PaneHeader/PaneHeader";
import RemoveButton from "../RemoveButton/RemoveButton";
import { OptionSpacing, Rule } from "../../styles/shared";

import styled from "styled-components";
import { useStoreContext } from "../../stores/Store";
import classNames from "classnames";

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
      allData: { hardwareTargetSelections, hardwareTargetApiData },
    },
    actions: {
      updateData,
      setAllData,
      setHardwareTargetInstance,
      setAggregateHardwareTargetData,
    },
  } = useStoreContext();

  const [instanceOptions, setInstanceOptions] = useState(null);
  const [canAddNewTarget, setCanAddNewTarget] = useState(false);

  useEffect(() => {
    if (hardwareTargetSelections.length === 0) {
      setCanAddNewTarget(true);
    }
  }, [hardwareTargetSelections, hardwareTargetSelections]);

  const handleSelectProvider = (
    selection: any,
    index: number,
    selectionIndex: number
  ) => {
    updateData(
      selection,
      "provider",
      "hardwareTargetCurrent",
      "hardwareTargetSelections",
      selectionIndex
    );
    const selected = hardwareTargetSelections[selectionIndex];
    setAggregateHardwareTargetData(selected, null);
    const options = hardwareTargetApiData[selection];
    const instanceOpts = options.map(function (item: { [x: string]: any }) {
      return item["instance"];
    });
    setInstanceOptions(instanceOpts);
  };

  const handleSelectInstance = (
    selection: any,
    menuIndex: number,
    selectionIndex: number
  ) => {
    setHardwareTargetInstance(selection, menuIndex, selectionIndex);
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

  const handleUpdateInstanceOptions = (selectionIndex: number) => {
    const selectedTarget = hardwareTargetSelections[selectionIndex];
    const selectedTargetProvider = selectedTarget.provider;
    const instanceOptionsForProvider =
      hardwareTargetApiData[selectedTargetProvider];
    const instanceOpts = instanceOptionsForProvider.map(function (item: {
      [x: string]: any;
    }) {
      return item["instance"];
    });
    setInstanceOptions(instanceOpts);
  };

  return (
    <div aria-label="harware-targets-pane">
      <PaneHeader options={TARGET_OPTS} title="hardwareTargetsTitle">
        <Button
          color={"#0180ff"}
          onClick={handleAddTarget}
          padding={"0 16px"}
          isActive={canAddNewTarget}
        >
          Add
        </Button>
      </PaneHeader>
      <Rule />
      <OptionsContainer>
        {hardwareTargetSelections.map((provider: any, i: number) => {
          return (
            <OptionsInnerContainer key={i}>
              <OptionSpacing className={classNames({ "is-active": true })}>
                <Dropdown
                  displayData={{ title: `${provider.provider}` }}
                  handleSelect={handleSelectProvider}
                  selectionIndex={i}
                  menuData={engineTypes}
                  modalWidth={"18%"}
                />
              </OptionSpacing>
              <OptionSpacing
                className={classNames({
                  "is-active":
                    hardwareTargetSelections[i].provider !==
                    NEW_SELECTION.provider,
                })}
              >
                <div onClick={() => handleUpdateInstanceOptions(i)}>
                  <Dropdown
                    displayData={{ title: `${provider.instance}` }}
                    handleSelect={handleSelectInstance}
                    selectionIndex={i}
                    menuData={instanceOptions}
                    modalWidth={"18%"}
                    isDisabled={
                      hardwareTargetSelections[i].provider ===
                      NEW_SELECTION.provider
                    }
                  />
                </div>
              </OptionSpacing>
              <StyledCalculations
                className={classNames({
                  "is-active":
                    hardwareTargetSelections[i].provider !==
                    NEW_SELECTION.provider,
                })}
              >
                {provider.cpu}
              </StyledCalculations>
              <StyledCalculations
                className={classNames({
                  "is-active":
                    hardwareTargetSelections[i].provider !==
                    NEW_SELECTION.provider,
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

const OptionsContainer = styled.div`
  color: #7b818a;
`;

const OptionsInnerContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export default HardwareTargetsPane;
