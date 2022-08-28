import { useRef, useState } from "react";
import DropdownButton from "./DropdownButton";
import DropdownModal from "./DropdownModal";
import useClickOutside from "../../hooks/useClickOutside";
import { DisplayDdata } from "../../types/types";

interface DropdownProps {
  displayData?: DisplayDdata;
  hasCheckbox?: boolean;
  isDisabled?: boolean;
  menuData: string[] | number[];
  styles?: any;
  handleSelect?: any;
  modalWidth?: string;
  stopPropagation?: boolean;
  selectionIndex?: number;
}

export function Dropdown({
  modalWidth,
  displayData,
  handleSelect,
  hasCheckbox,
  isDisabled,
  menuData,
  styles,
  stopPropagation,
  selectionIndex,
}: DropdownProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  useClickOutside(wrapperRef, setIsOpen);
  const toggleDropdown = () => {
    if (isDisabled) {
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleSelectMenuItem = (
    event: any,
    menuItem: any,
    menuItemIndex: any
  ) => {
    handleSelect(menuItem, menuItemIndex, selectionIndex);
    toggleDropdown();
    if (stopPropagation) {
      event.stopPropagation();
    }
  };

  return (
    <div aria-label="dropdown" ref={wrapperRef}>
      <div style={styles}>
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
      </div>
    </div>
  );
}

export default Dropdown;
