import { Icon } from "semantic-ui-react";
import styled from "styled-components";
import classNames from "classnames";
import { DisplayDdata } from "../../types/types";

interface DropdownButtonProps {
  displayData?: DisplayDdata;
  hasCheckbox?: boolean;
  isChecked?: boolean;
  isOpen: boolean;
  isDisabled?: boolean;
  toggleDropdown: () => void;
}

export function DropdownButton({
  displayData,
  hasCheckbox,
  isChecked,
  isOpen,
  isDisabled,
  toggleDropdown,
}: DropdownButtonProps) {
  const handleClickCheckmark = (event: any) => {
    event.stopPropagation();
  };

  return (
    <DropdownButtonContainer
      aria-label="dropdown-button"
      className={classNames({ "is-disabled": isDisabled })}
      onClick={() => toggleDropdown()}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
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
          </div>
        </div>
        <div>
          {isOpen ? <Icon name="chevron up" /> : <Icon name="chevron down" />}
        </div>
      </div>
    </DropdownButtonContainer>
  );
}

const Checkbox = styled.div`
  padding-left: 16px;
`;

const DropdownButtonContainer = styled.div`
  cursor: pointer;
  border: 1px solid #d1d5db;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
  padding: 8px;

  &.is-disabled {
    cursor: not-allowed;
  }
`;

export default DropdownButton;
