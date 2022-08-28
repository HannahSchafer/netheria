import { useRef, useState } from "react";
import styled from "styled-components";
import DropdownButton from "./DropdownButton";
import DropdownModal from "./DropdownModal";

interface DropdownProps {
  displayData?: any;
  hasCheckbox?: boolean;
  isDisabled?: boolean;
  menuData?: any;
  styles?: any;
  handleSelect?: any;
  modalWidth?: string;
}

export function Dropdown({
  modalWidth,
  displayData,
  handleSelect,
  hasCheckbox,
  isDisabled,
  menuData,
  styles,
}: DropdownProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    if (isDisabled) {
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleSelectMenuItem = (menuItem: any, i: any) => {
    handleSelect(menuItem, i);
    toggleDropdown();
  };

  return (
    <DropdownContainer style={styles}>
      <div ref={buttonRef}>
        <DropdownButton
          displayData={displayData}
          hasCheckbox={hasCheckbox}
          isDisabled={isDisabled}
          isOpen={isOpen}
          toggleDropdown={toggleDropdown}
        />
      </div>
      <DropdownModal
        buttonRef={buttonRef}
        handleSelectMenuItem={handleSelectMenuItem}
        isOpen={isOpen}
        menuData={menuData}
        modalWidth={modalWidth}
      />
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  padding-bottom: 16px;
`;

export default Dropdown;
