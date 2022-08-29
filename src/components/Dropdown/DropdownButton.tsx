import Icon from "@mui/material/Icon";

import { DisplayDdata } from "../../types/types";
import { COLORS } from "../../styles/colors";
import styled from "styled-components";
import classNames from "classnames";

interface DropdownButtonProps {
  displayData?: DisplayDdata;
  hasCheckbox?: boolean;
  handleCheckmark?: () => void;
  isChecked?: boolean;
  isOpen: boolean;
  isDisabled?: boolean;
  toggleDropdown: () => void;
}

export function DropdownButton({
  displayData,
  hasCheckbox,
  handleCheckmark,
  isChecked,
  isOpen,
  isDisabled,
  toggleDropdown,
}: DropdownButtonProps) {
  const handleClickCheckmark = (event: any) => {
    handleCheckmark?.();
    event.stopPropagation();
  };

  return (
    <DropdownButtonContainer
      aria-label="dropdown-button"
      className={classNames({ "is-disabled": isDisabled })}
      data-alt="Dropdown Button"
      onClick={() => toggleDropdown()}
    >
      <DropdownButtonInnerContainer>
        <div>
          <LeftInnerContainer>
            {hasCheckbox && (
              <Checkbox>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => handleClickCheckmark(e)}
                />{" "}
              </Checkbox>
            )}
            <div style={displayData?.styles}>
              <div>{displayData?.title}</div>
              <div>{displayData?.description}</div>
            </div>
          </LeftInnerContainer>
        </div>
        <IconContainer>
          {isOpen ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
        </IconContainer>
      </DropdownButtonInnerContainer>
    </DropdownButtonContainer>
  );
}

const Checkbox = styled.div`
  padding-left: 16px;
`;

const DropdownButtonContainer = styled.div`
  border: 1px solid ${COLORS.gray300};
  border-radius: 6px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  padding: 8px;

  &.is-disabled {
    color: ${COLORS.gray400};
    cursor: not-allowed;
  }
`;

const DropdownButtonInnerContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  align-items: center;
  display: flex;
`;

const LeftInnerContainer = styled.div`
  align-items: center;
  display: flex;
`;

export default DropdownButton;
