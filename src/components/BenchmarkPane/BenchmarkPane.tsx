import { useRef, useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import DropdownButton from "../Dropdown/DropdownButton";
import Overlay from "../Overlay/Overlay";
import { OptionSpacing, Rule } from "../../styles/shared";

import styled from "styled-components";
import { useStoreContext } from "../../Store";
import { DROPDOWN_PANES } from "../../config";
import Modal from "../Modal/Modal";
import PaneHeader from "../PaneHeader/PaneHeader";
import useClickOutside from "../../hooks/useClickOutside";

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
  };

  const engineTypes = benchmarkData ? Object.keys(benchmarkData) : null;

  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, setIsOpen);

  return (
    <div aria-label="benchmark-pane">
      <Overlay isOpen={isOpen} />
      <div ref={wrapperRef}>
        <DropdownButton
          displayData={DROPDOWN_PANES[0]}
          hasCheckbox
          toggleDropdown={toggleDropdown}
          isOpen={isOpen}
          isChecked={benchmarkCurrent.runsPerTrial > 0}
        />
        <Modal isOpen={isOpen} styles={{ width: "63.5%" }}>
          <ModalContent>
            <PaneHeader options={BENCHMARK_OPTS} title="benchmarkTitle" />
            <Rule />
            <OptionsContainer>
              {benchmarkDataSelections.map((benchmark: any, i: number) => {
                return (
                  <OptionsInnerContainer key={i}>
                    <OptionSpacing>
                      <Dropdown
                        displayData={{ title: `${benchmark.engine}` }}
                        handleSelect={handleSelectEngine}
                        menuData={engineTypes}
                        modalWidth={"29%"}
                        stopPropagation
                      />
                    </OptionSpacing>
                    <OptionSpacing>
                      <Dropdown
                        displayData={{ title: `${benchmark.numTrials}` }}
                        handleSelect={handleSelectNumTrials}
                        menuData={numTrialsOptions}
                        modalWidth={"29%"}
                        stopPropagation
                      />
                    </OptionSpacing>
                    <OptionSpacing>
                      <Dropdown
                        displayData={{ title: `${benchmark.runsPerTrial}` }}
                        handleSelect={handleSelectRunsPerTrial}
                        menuData={runsPerTrialsOptions}
                        modalWidth={"29%"}
                      />
                    </OptionSpacing>
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
`;

export default BenchmarkPane;
