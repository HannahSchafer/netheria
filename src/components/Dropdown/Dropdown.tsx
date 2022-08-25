import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react'
import styled from "styled-components";

interface DropdownProps {
  displayData?: any;
  hasCheckbox?: boolean;
  menuData?: any;
  styles?: any;
  menuKey?: any;
  handleSelect?: any;
}

export function Dropdown({
  displayData,
  handleSelect,
  hasCheckbox,
  menuKey,
  menuData,
  styles,
}: DropdownProps) {
  // const disabled = !menuData;

  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => {
    // if (disabled) {
    //   return;
    // }
    setIsOpen(!isOpen)
  }

  const handleSelectMenuItem = (menuItem: any, i: any) => {
    handleSelect(menuItem, i);
    toggleDropdown();
  }
  return (
    <DropdownContainer style={styles}>
      <DropdownButton onClick={() => toggleDropdown()}>
        {hasCheckbox && <Checkbox><input type="checkbox" /> </Checkbox>}
        <div style={displayData?.styles}>
          <div>{displayData?.title}</div>
          <div>{displayData?.description}</div>
        </div> 
        <div>
        {isOpen ? <Icon name='chevron up' /> :  <Icon name='chevron down' /> }  
        </div>
      </DropdownButton>
      {isOpen &&
      <DropdownModal>
        {menuData?.map((menuItem: any, i: any) => {
          return (
            <MenuItem key={i} onClick={() => handleSelectMenuItem(menuItem, i)}>{menuItem}</MenuItem>
          )
        })}
      </DropdownModal>
      }
    </DropdownContainer>
  );
}

const Checkbox = styled.div`
padding-left: 16px;
`;

const DropdownContainer = styled.div`
padding-bottom: 16px;
`;

const DropdownButton = styled.div`
  align-items: center;
  display: flex;
  border: 1px solid #D1D5DB;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 6px;
`;

const DropdownModal = styled.div`
  background-color: white;
  position: absolute;
  height: 20px;
`;

const MenuItem = styled.div`
  cursor: pointer;
`;

export default Dropdown;
