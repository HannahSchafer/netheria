import { useRef, useState } from "react";
import Button from "../Button/Button";
import DropdownButton from "../Dropdown/DropdownButton";
import Dropdown from "../Dropdown/Dropdown";
import Overlay from "../Overlay/Overlay";
import PaneHeader from "../PaneHeader/PaneHeader";
import { OptionSpacing, Rule } from "../../styles/shared";

import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";
import { useStoreContext, NEW_ACCELERATE_SELECTION } from "../../stores/Store";
import Modal from "../Modal/Modal";
import { DROPDOWN_PANES } from "../../config";

export const ACCELERATE_OPTS = [
  {
    title: "Engine",
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

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, setIsOpen);

  const handleSelectEngine = (selection: any, index: number) => {
    setAllData(selection, "accelerateSelection");
    setCanSave(true);
  };

  const handleSave = () => {
    if (accelerateSelection === NEW_ACCELERATE_SELECTION) {
      return;
    }
    // TODO: api call to persistently save option
    setIsOpen(false);
    setIsChecked(true);
  };

  return (
    <div aria-label="accelerate-pane">
      <Overlay isOpen={isOpen} />
      <div ref={wrapperRef}>
        <DropdownButton
          displayData={DROPDOWN_PANES[1]}
          hasCheckbox
          toggleDropdown={toggleDropdown}
          isOpen={isOpen}
          isChecked={isChecked}
        />
        <Modal isOpen={isOpen} styles={{ width: "63.5%" }}>
          <ModalContent>
            <PaneHeader options={ACCELERATE_OPTS} title="accelerateTitle" />
            <Rule />
            <OptionsContainer>
              <OptionSpacing>
                <Dropdown
                  displayData={{ title: `${accelerateSelection}` }}
                  handleSelect={handleSelectEngine}
                  menuData={accelerateData}
                  modalWidth={"29%"}
                  stopPropagation
                />
              </OptionSpacing>
              <Button color={"#0180ff"} onClick={handleSave} isActive={canSave}>
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
  color: #7b818a;
  display: flex;
  justify-content: space-between;
`;

export default AcceleratePane;
