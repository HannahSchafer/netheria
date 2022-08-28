import { useRef, useState } from "react";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import DropdownButton from "../Dropdown/DropdownButton";
import Overlay from "../Overlay/Overlay";
import { OptionSpacing, Rule } from "../../styles/shared";

import styled from "styled-components";
import { useStoreContext } from "../../stores/Store";
import { DROPDOWN_PANES } from "../../config";
import Modal from "../Modal/Modal";
import PaneHeader from "../PaneHeader/PaneHeader";
import useClickOutside from "../../hooks/useClickOutside";

const OPTION_SPACE_WIDTH = "25%";
const BENCHMARK_OPTS = [
  {
    title: "Engine",
    styles: { width: "30%" },
  },
  {
    title: "Num Trials",
    styles: { width: "30%" },
  },
  {
    title: "Runs Per Trial",
    styles: { width: "20%" },
  },
];

export function BenchmarkPane() {
  const {
    state: {
      allData: { benchmarkCurrent, benchmarkData, benchmarkDataSelections },
    },
    actions: { updateData },
  } = useStoreContext();

  const [numTrialsOptions, setNumTrialsOptions] = useState(null);
  const [runsPerTrialsOptions, setRunsPerTrialsOptions] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [canSave, setCanSave] = useState(false);

  const handleSelectEngine = (selection: any) => {
    updateData(
      selection,
      "engine",
      "benchmarkCurrent",
      "benchmarkDataSelections"
    );
    const trialOptions: any = Object.keys(benchmarkData[selection]);
    setNumTrialsOptions(trialOptions);
  };

  const handleSelectNumTrials = (selection: any, index: number) => {
    updateData(
      selection,
      "numTrials",
      "benchmarkCurrent",
      "benchmarkDataSelections"
    );
    const optsArray = benchmarkData[benchmarkCurrent.engine][selection];
    setRunsPerTrialsOptions(optsArray);
  };

  const handleSelectRunsPerTrial = (selection: any, index: number) => {
    updateData(
      selection,
      "runsPerTrial",
      "benchmarkCurrent",
      "benchmarkDataSelections"
    );
    setCanSave(true);
  };

  const engineTypes = benchmarkData ? Object.keys(benchmarkData) : null;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, setIsOpen);

  const handleSave = () => {
    if (benchmarkCurrent.runsPerTrial === 0) {
      return;
    }
    // TODO: api call to persistently save option
    setIsOpen(false);
    setIsChecked(true);
  };

  return (
    <div aria-label="benchmark-pane">
      <Overlay isOpen={isOpen} />
      <div ref={wrapperRef}>
        <DropdownButton
          displayData={DROPDOWN_PANES[0]}
          hasCheckbox
          toggleDropdown={toggleDropdown}
          isOpen={isOpen}
          isChecked={isChecked}
        />
        <Modal isOpen={isOpen} styles={{ width: "63.5%" }}>
          <ModalContent>
            <PaneHeader options={BENCHMARK_OPTS} title="benchmarkTitle" />
            <Rule />
            <OptionsContainer>
              {benchmarkDataSelections.map((benchmark: any, i: number) => {
                return (
                  <OptionsInnerContainer key={i}>
                    <OptionSpacing width={OPTION_SPACE_WIDTH}>
                      <Dropdown
                        displayData={{ title: `${benchmark.engine}` }}
                        handleSelect={handleSelectEngine}
                        menuData={engineTypes}
                        modalWidth={"29%"}
                        stopPropagation
                      />
                    </OptionSpacing>
                    <OptionSpacing width={OPTION_SPACE_WIDTH}>
                      <Dropdown
                        displayData={{ title: `${benchmark.numTrials}` }}
                        handleSelect={handleSelectNumTrials}
                        menuData={numTrialsOptions}
                        modalWidth={"29%"}
                        stopPropagation
                      />
                    </OptionSpacing>
                    <OptionSpacing width={OPTION_SPACE_WIDTH}>
                      <Dropdown
                        displayData={{ title: `${benchmark.runsPerTrial}` }}
                        handleSelect={handleSelectRunsPerTrial}
                        menuData={runsPerTrialsOptions}
                        modalWidth={"29%"}
                        stopPropagation
                      />
                    </OptionSpacing>
                    <Button
                      color={"#0180ff"}
                      onClick={handleSave}
                      isActive={canSave}
                    >
                      Save
                    </Button>
                  </OptionsInnerContainer>
                );
              })}
            </OptionsContainer>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

const ModalContent = styled.div`
  padding: 16px;
`;

const OptionsContainer = styled.div`
  color: #7b818a;
`;

const OptionsInnerContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export default BenchmarkPane;
