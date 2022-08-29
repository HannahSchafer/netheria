import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import PaneHeader from "../PaneHeader/PaneHeader";
import RemoveButton from "../RemoveButton/RemoveButton";
import { OptionSpacing, Rule } from "../../styles/shared";
import { Engine, IHardwareTarget } from "../../types/types";

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

  const [instanceOptions, setInstanceOptions] = useState([]);
  const [canAddNewTarget, setCanAddNewTarget] = useState(false);

  useEffect(() => {
    if (hardwareTargetSelections.length === 0) {
      setCanAddNewTarget(true);
    }
  }, [hardwareTargetSelections, hardwareTargetSelections]);

  const handleSelectProvider = (
    selection: Engine,
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
    selection: string,
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

  const engineTypes = Object.keys(hardwareTargetApiData);

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
        {hardwareTargetSelections.map((target: IHardwareTarget, i: number) => {
          return (
            <OptionsInnerContainer key={i}>
              <OptionSpacing className={classNames({ "is-active": true })}>
                <Dropdown
                  displayData={{ title: `${target.provider}` }}
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
                    displayData={{ title: `${target.instance}` }}
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
                {target.cpu}
              </StyledCalculations>
              <StyledCalculations
                className={classNames({
                  "is-active":
                    hardwareTargetSelections[i].provider !==
                    NEW_SELECTION.provider,
                })}
              >
                {target.memory}
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

const OptionsContainer = styled.div`
  color: #7b818a;
  max-height: 170px;
  overflow: auto;
  scrollbar-width: thin;
`;

const OptionsInnerContainer = styled.div`
  display: flex;
  align-items: baseline;
`;

export default HardwareTargetsPane;
