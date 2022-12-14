import { useRef, useState } from "react";
import Button from "../Button/Button";
import DropdownButton from "../Dropdown/DropdownButton";
import Dropdown from "../Dropdown/Dropdown";
import Overlay from "../Overlay/Overlay";
import PaneHeader from "../PaneHeader/PaneHeader";
import { OptionSpacing, Rule } from "../../styles/shared";
import { NEW_ACCELERATE_SELECTION } from "../../configs/config";
import { COLORS } from "../../styles/colors";
import { Engine } from "../../types/types";

import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";
import { useStoreContext } from "../../stores/Store";
import Modal from "../Modal/Modal";
import { DROPDOWN_PANES } from "../../configs/config";

export const ACCELERATE_OPTS = [
  {
    title: "ENGINE",
    styles: { width: "30%" },
  },
];

export function AcceleratePane() {
  const {
    state: {
      allData: { accelerateData, accelerateSelection },
    },
    actions: { setAllData },
  } = useStoreContext();

  const [isOpen, setIsOpen] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [engine, setEngine] = useState<Engine>();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, setIsOpen);

  const handleSelectEngine = (selection: Engine) => {
    setEngine(selection);
    setCanSave(true);
  };

  const handleSave = () => {
    setAllData(engine, "accelerateSelection");
    setIsOpen(false);
    setIsChecked(true);
  };

  const handleCheckmark = () => {
    if (isChecked === true) {
      setAllData(NEW_ACCELERATE_SELECTION, "accelerateSelection");
      setIsChecked(false);
      setIsOpen(false);
    }
  };

  const displayTitle = engine ?? accelerateSelection;

  return (
    <div aria-label="accelerate-pane" data-alt="Accelerate Pane">
      <Overlay isOpen={isOpen} />
      <div ref={wrapperRef}>
        <DropdownButton
          displayData={DROPDOWN_PANES[1]}
          hasCheckbox
          toggleDropdown={toggleDropdown}
          isOpen={isOpen}
          isChecked={isChecked}
          handleCheckmark={handleCheckmark}
        />
        <Modal isOpen={isOpen} styles={{ width: "63.5%" }}>
          <ModalContent>
            <PaneHeader options={ACCELERATE_OPTS} title="accelerateTitle" />
            <Rule />
            <OptionsContainer>
              <OptionSpacing paddingBottom="0px">
                <Dropdown
                  displayData={{ title: `${displayTitle}` }}
                  handleSelect={handleSelectEngine}
                  menuData={accelerateData}
                  modalWidth={"29%"}
                  stopPropagation
                />
              </OptionSpacing>
              <Button
                color={COLORS.primary500}
                onClick={() => handleSave()}
                isActive={canSave}
              >
                Save
              </Button>
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
  display: flex;
  justify-content: space-between;
`;

export default AcceleratePane;
