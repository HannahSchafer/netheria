import { useState } from "react";
import DropdownButton from "../Dropdown/DropdownButton";
import Dropdown from "../Dropdown/Dropdown";
import PaneHeader from "../PaneHeader/PaneHeader";

import styled from "styled-components";
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

  const handleSelectEngine = (selection: any, index: number) => {
    setAllData(selection, "accelerateSelection");
    toggleDropdown();
  };

  return (
    <div aria-label="accelerate-pane">
      <DropdownButton
        displayData={DROPDOWN_PANES[1]}
        hasCheckbox
        toggleDropdown={toggleDropdown}
        isOpen={isOpen}
        isChecked={accelerateSelection !== NEW_ACCELERATE_SELECTION}
      />
      <Modal isOpen={isOpen} styles={{ width: "65%" }}>
        <ModalContent>
          <PaneHeader options={ACCELERATE_OPTS} title="accelerateTitle" />
          <Rule />
          <OptionsContainer>
            <Spacing>
              <Dropdown
                displayData={{ title: `${accelerateSelection}` }}
                handleSelect={handleSelectEngine}
                menuData={accelerateData}
              />
            </Spacing>
          </OptionsContainer>
        </ModalContent>
      </Modal>
    </div>
  );
}

const ModalContent = styled.div`
  padding: 16px;
`;

const Spacing = styled.div`
  margin-left: 8px;
  width: 30%;
  cursor: pointer;

  &.is-active {
    color: black;
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

export default AcceleratePane;
