import { useRef, useState } from "react";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import DropdownButton from "../Dropdown/DropdownButton";
import Overlay from "../Overlay/Overlay";
import { OptionSpacing, Rule } from "../../styles/shared";
import { Engine, IBenchmark } from "../../types/types";
import { COLORS } from "../../styles/colors";

import styled from "styled-components";
import { useStoreContext } from "../../stores/Store";
import { NEW_BENCHMARK_SELECTION, DROPDOWN_PANES } from "../../configs/config";
import Modal from "../Modal/Modal";
import PaneHeader from "../PaneHeader/PaneHeader";
import useClickOutside from "../../hooks/useClickOutside";

const OPTION_SPACE_WIDTH = "25%";
const BENCHMARK_OPTS = [
  {
    title: "ENGINE",
    styles: { width: "30%" },
  },
  {
    title: "NUM TRIALS",
    styles: { width: "30%" },
  },
  {
    title: "RUNS PER TRIAL",
    styles: { width: "30%" },
  },
];

export function BenchmarkPane() {
  const {
    state: {
      allData: { benchmarkCurrent, benchmarkData, benchmarkDataSelections },
    },
    actions: { setAllData, updateData },
  } = useStoreContext();

  const [numTrialsOptions, setNumTrialsOptions] = useState([]);
  const [runsPerTrialsOptions, setRunsPerTrialsOptions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [runsPerTrial, setRunsPerTrial] = useState(0);

  const handleSelectEngine = (selection: Engine) => {
    if (benchmarkCurrent.engine !== NEW_BENCHMARK_SELECTION.engine) {
      handleSelectNumTrials(0);
      handleSelectRunsPerTrial(0);
    }
    updateData(
      selection,
      "engine",
      "benchmarkCurrent",
      "benchmarkDataSelections"
    );
    const trialOptions: any = Object.keys(benchmarkData[selection]);
    setNumTrialsOptions(trialOptions);
  };

  const handleSelectNumTrials = (selection: number) => {
    updateData(
      selection,
      "numTrials",
      "benchmarkCurrent",
      "benchmarkDataSelections"
    );
    const optsArray = benchmarkData[benchmarkCurrent.engine][selection];
    setRunsPerTrialsOptions(optsArray);
  };

  const handleSelectRunsPerTrial = (selection: number) => {
    updateData(
      selection,
      "runsPerTrial",
      "benchmarkCurrent",
      "benchmarkDataSelections"
    );
    setRunsPerTrial(selection);
    setCanSave(true);
  };

  const engineTypes = benchmarkData && Object.keys(benchmarkData);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, setIsOpen);

  const handleSave = () => {
    updateData(
      runsPerTrial,
      "runsPerTrial",
      "benchmarkCurrent",
      "benchmarkDataSelections"
    );
    setIsOpen(false);
    setIsChecked(true);
  };

  const handleCheckmark = () => {
    if (isChecked === true) {
      setAllData(NEW_BENCHMARK_SELECTION, "benchmarkCurrent");
      setAllData([NEW_BENCHMARK_SELECTION], "benchmarkDataSelections");
      setIsChecked(false);
      setIsOpen(false);
    }
  };

  return (
    <div aria-label="benchmark-pane" data-alt="Benchmark Pane">
      <Overlay isOpen={isOpen} />
      <div ref={wrapperRef}>
        <DropdownButton
          displayData={DROPDOWN_PANES[0]}
          hasCheckbox
          toggleDropdown={toggleDropdown}
          isOpen={isOpen}
          isChecked={isChecked}
          handleCheckmark={handleCheckmark}
        />
        <Modal isOpen={isOpen} styles={{ width: "63.5%" }}>
          <ModalContent>
            <PaneHeader options={BENCHMARK_OPTS} title="benchmarkTitle" />
            <Rule />
            {benchmarkDataSelections.map((benchmark: IBenchmark, i: number) => {
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
                      isDisabled={
                        benchmarkDataSelections[i].engine ===
                        NEW_BENCHMARK_SELECTION.engine
                      }
                      menuData={numTrialsOptions}
                      modalWidth={"29%"}
                      stopPropagation
                    />
                  </OptionSpacing>
                  <OptionSpacing width={OPTION_SPACE_WIDTH}>
                    <Dropdown
                      displayData={{ title: `${benchmark.runsPerTrial}` }}
                      handleSelect={handleSelectRunsPerTrial}
                      isDisabled={
                        benchmarkDataSelections[i].numTrials ===
                        NEW_BENCHMARK_SELECTION.numTrials
                      }
                      menuData={runsPerTrialsOptions}
                      modalWidth={"29%"}
                      stopPropagation
                    />
                  </OptionSpacing>
                  <Button
                    color={COLORS.primary500}
                    onClick={handleSave}
                    isActive={canSave}
                  >
                    Save
                  </Button>
                </OptionsInnerContainer>
              );
            })}
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

const ModalContent = styled.div`
  padding: 16px;
`;

const OptionsInnerContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

export default BenchmarkPane;
