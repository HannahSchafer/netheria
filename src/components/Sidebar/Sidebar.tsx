import React from 'react';
import "./Sidebar.css"
import { Icon } from 'semantic-ui-react'
import { SIDEBAR_ICONS } from '../../config';

export function Sidebar() {
  return (
    <div className="sidebar">
      {
        SIDEBAR_ICONS.map((icon) => {
          return (
            <Icon name={icon as any} color="grey" />
          )
        })
      }
    </div>
  )
}

export default Sidebar