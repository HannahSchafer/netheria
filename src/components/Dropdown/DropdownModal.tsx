import ReactDOM from "react-dom";
import styled from "styled-components";

interface DropdownModalProps {
  buttonRef: any;
  menuData?: any;
  handleSelectMenuItem?: any;
  isOpen: boolean;
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
    <DropdownModalContainer style={{ width: `${modalWidth}` }}>
      {menuData?.map((menuItem: any, i: number) => {
        return (
          <MenuItem key={i} onClick={() => handleSelectMenuItem(menuItem, i)}>
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
