import ReactDOM from "react-dom";
import styled from "styled-components";
import { COLORS } from "../../styles/colors";

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
  setBottomPosition?: boolean;
}

export function DropdownModal({
  buttonRef,
  handleSelectMenuItem,
  menuData,
  isOpen,
  modalWidth,
  setBottomPosition,
}: DropdownModalProps) {
  if (!isOpen || !buttonRef?.current) {
    return null;
  }

  let bottomPosition = "initial";
  if (setBottomPosition) {
    const offset = document.body.scrollHeight - window.innerHeight;
    const position =
      document.body.scrollHeight -
      buttonRef?.current?.getBoundingClientRect().bottom +
      45 -
      offset;
    bottomPosition = `${position}px`;
  }

  return ReactDOM.createPortal(
    <DropdownModalContainer
      bottom={bottomPosition}
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

const DropdownModalContainer: any = styled.div.attrs(
  (props: { bottom?: string }) => props
)`
  color: ${COLORS.black};
  background-color: ${COLORS.white};
  position: absolute;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1),
    0px 4px 6px -2px rgba(0, 0, 0, 0.05), 0px 0px 0px 1px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  bottom: ${(props) => `${props.bottom}`};
`;

const MenuItem = styled.div`
  cursor: pointer;
  padding: 12px;
  &:hover {
    background-color: ${COLORS.gray100};
  }
`;

export default DropdownModal;
