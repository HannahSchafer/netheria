import { useRef, useState } from "react";
import DropdownButton from "../Dropdown/DropdownButton";
import Dropdown from "../Dropdown/Dropdown";
import Overlay from "../Overlay/Overlay";
import PaneHeader from "../PaneHeader/PaneHeader";
import { OptionSpacing, Rule } from "../../styles/shared";

import styled from "styled-components";
import useClickOutside from "../../hooks/useClickOutside";
import { useStoreContext, NEW_ACCELERATE_SELECTION } from "../../Store";
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
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(wrapperRef, setIsOpen);

  const handleSelectEngine = (selection: any, index: number) => {
    setAllData(selection, "accelerateSelection");
    toggleDropdown();
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
          isChecked={accelerateSelection !== NEW_ACCELERATE_SELECTION}
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
                />
              </OptionSpacing>
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

export default AcceleratePane;
