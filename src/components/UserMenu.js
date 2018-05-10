import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

const UserMenu = ({ username, id, closeMenu }) => (
  <UserMenuContainer id={ id }>

    <DropDownItem>{`Signed in as ${ username }`}</DropDownItem>
    <DropDownDivider />

    <NavLink to='/' onClick={ closeMenu }>
      <DropDownItem>Your Profile</DropDownItem>
    </NavLink>

    <NavLink to='/followers' onClick={ closeMenu }>
      <DropDownItem>Your Followers</DropDownItem>
    </NavLink>

    <NavLink to='/stars' onClick={ closeMenu }>
      <DropDownItem>Your Stars</DropDownItem>
    </NavLink>
    <DropDownDivider />
    <NavLink to='https://help.github.com/'>
      <DropDownItem>Help</DropDownItem>
    </NavLink>
    <DropDownItem>Settings</DropDownItem>
    <DropDownItem>Sign Out</DropDownItem>
    
  </UserMenuContainer>
)

const UserMenuContainer = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 100;
  width: 160px;
  padding-top: 5px;
  padding-bottom: 5px;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(27,31,35,0.15);
  border-radius: 4px;
  box-shadow: 0 3px 12px rgba(27,31,35,0.15);
  width: 180px;
  margin-top: 8px;
`

const DropDownItem = styled.li`
  cursor: pointer;
  display: block;
  padding: 4px 10px 4px 15px;
  overflow: hidden;
  color: #24292e;
  text-overflow: ellipsis;
  white-space: nowrap;
  &:hover {
    color: #fff;
    background-color: #0366d6;
  }
`

const DropDownDivider = styled.li`
  height: 1px;
  margin: 8px 1px;
  background-color: #e1e4e8;
`

export default withRouter(UserMenu)
