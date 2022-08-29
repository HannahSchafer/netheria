import ReactDOM from "react-dom";
import styled from "styled-components";

interface DropdownModalProps {
  buttonRef: any;
  handleSelectMenuItem: (
    e: React.SyntheticEvent,
    menuItem: string | number,
    index: number
  ) => void;
  isOpen: boolean;
  menuData: string[] | number[];
  modalWidth?: string;
}

export function DropdownModal({
  buttonRef,
  handleSelectMenuItem,
  menuData,
  isOpen,
  modalWidth,
}: DropdownModalProps) {
  if (!isOpen || !buttonRef?.current) {
    return null;
  }

  return ReactDOM.createPortal(
    <DropdownModalContainer
      aria-label="dropdown-modal"
      style={{ width: `${modalWidth}` }}
    >
      {menuData.map((menuItem: string | number, i: number) => {
        return (
          <MenuItem
            key={i}
            onClick={(e) => handleSelectMenuItem(e, menuItem, i)}
          >
            {menuItem}
          </MenuItem>
        );
      })}
    </DropdownModalContainer>,
    buttonRef.current
  );
}

const DropdownModalContainer = styled.div`
  color: black;
  background-color: white;
  position: absolute;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 12px;
  &:hover {
    background-color: #f3f3f3;
  }
`;

export default DropdownModal;
